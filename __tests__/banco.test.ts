import { bancoDeMision, GENERADORES, PREGUNTAS_POR_INTENTO, prepararIntento, TAMANO_BANCO } from '@/features/missions/banco';
import { ALL_MISSIONS } from '@/features/missions/catalog';
import { formatNumero, textoOpcion } from '@/features/missions/format';
import { aleatorio, generar } from '@/features/missions/generadores/base';
import { Question } from '@/features/missions/types';
import { localTutor } from '@/features/tutor/localTutor';

const EPS = 1e-9;
const VARIANTES = 300;

/** Las mismas reglas que cumplen las preguntas escritas a mano. */
function revisar(q: Question) {
  const correcta = q.opciones.find((o) => o.id === q.correcta)!;
  expect(Math.abs(correcta.valor - q.calcular())).toBeLessThanOrEqual(EPS);
  expect(q.opciones.map((o) => o.id)).toEqual(['a', 'b', 'c', 'd']);
  const valores = q.opciones.map((o) => o.valor);
  for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) expect(Math.abs(valores[i] - valores[j])).toBeGreaterThan(EPS);
  expect(new Set(q.opciones.map((o) => textoOpcion(q, o))).size).toBe(4);
  for (const o of q.opciones) {
    expect(Number.isFinite(o.valor)).toBe(true);
    if (o.id !== q.correcta) expect(o.porQue?.length).toBeGreaterThan(5);
    else expect(o.porQue).toBeUndefined();
  }
  expect(q.pasos.length).toBeGreaterThanOrEqual(2);
  expect(q.pista.length).toBeGreaterThan(5);
  expect(q.enunciado).not.toMatch(/undefined|NaN|Infinity/);
  for (const t of [q.expresion ?? '', ...q.pasos, ...q.opciones.map((o) => o.texto ?? '')]) {
    expect(t).not.toMatch(/undefined|NaN|Infinity|\+ −|− −/);
  }
  // La pista no revela la respuesta.
  const pista = localTutor.pista(q);
  if (correcta.texto) expect(pista).not.toContain(correcta.texto);
  else {
    const visible = formatNumero(Math.abs(correcta.valor)).replace(/[.,]/g, (c) => `\\${c}`);
    const patron =
      correcta.valor < 0
        ? new RegExp(`[−-]${visible}([^0-9]|$)`)
        : new RegExp(`(^|[^0-9,.−-])${visible}([^0-9]|[.,](?![0-9])|$)`);
    expect(pista).not.toMatch(patron);
  }
}

describe('generadores de variantes', () => {
  test('todas las misiones tienen al menos dos generadores', () => {
    for (const m of ALL_MISSIONS) expect(GENERADORES[m.id]?.length ?? 0).toBeGreaterThanOrEqual(2);
  });

  test('los generadores corresponden a misiones existentes', () => {
    const ids = new Set(ALL_MISSIONS.map((m) => m.id));
    for (const id of Object.keys(GENERADORES)) expect(ids.has(id)).toBe(true);
  });

  for (const [misionId, gens] of Object.entries(GENERADORES)) {
    for (const gen of gens) {
      test(`${misionId} · ${gen.id}: ${VARIANTES} variantes válidas`, () => {
        const rnd = aleatorio(gen.id.length * 7919);
        const enunciados = new Set<string>();
        for (let i = 0; i < VARIANTES; i++) {
          const q = generar(gen, rnd, `${gen.id}-${i}`);
          revisar(q);
          enunciados.add(`${q.enunciado}|${q.expresion ?? ''}`);
        }
        // Un generador debe producir variedad real.
        expect(enunciados.size).toBeGreaterThanOrEqual(8);
      });
    }
  }
});

describe('banco de cada misión', () => {
  test(`el banco tiene ${TAMANO_BANCO} preguntas con id únicos`, () => {
    for (const m of ALL_MISSIONS) {
      const banco = bancoDeMision(m, 99);
      expect(banco).toHaveLength(TAMANO_BANCO);
      expect(new Set(banco.map((q) => q.id)).size).toBe(TAMANO_BANCO);
      expect(banco.slice(0, m.preguntas.length)).toEqual(m.preguntas);
    }
  });

  test(`cada intento tiene ${PREGUNTAS_POR_INTENTO} preguntas distintas y es reproducible con la semilla`, () => {
    for (const m of ALL_MISSIONS) {
      const a = prepararIntento(m, 1234);
      expect(a.preguntas).toHaveLength(PREGUNTAS_POR_INTENTO);
      expect(new Set(a.preguntas.map((q) => q.id)).size).toBe(PREGUNTAS_POR_INTENTO);
      const b = prepararIntento(m, 1234);
      expect(b.preguntas.map((q) => `${q.id}|${q.enunciado}|${q.expresion}`)).toEqual(
        a.preguntas.map((q) => `${q.id}|${q.enunciado}|${q.expresion}`)
      );
      expect({ ...a, preguntas: [] }).toEqual({ ...m, preguntas: [] });
    }
  });

  test('distintos intentos traen preguntas distintas', () => {
    const m = ALL_MISSIONS[0];
    const firmas = new Set<string>();
    for (let s = 1; s <= 20; s++) {
      firmas.add(prepararIntento(m, s).preguntas.map((q) => `${q.enunciado}|${q.expresion}`).join('#'));
    }
    expect(firmas.size).toBe(20);
  });

  test('la práctica sin corazones no se vuelve a sortear', () => {
    const m = { ...ALL_MISSIONS[0], sinCorazones: true };
    expect(prepararIntento(m, 5)).toBe(m);
  });
});
