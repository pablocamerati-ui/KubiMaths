import { ALL_MISSIONS } from '@/features/missions/catalog';
import { createMissionState, missionReducer, summarize } from '@/features/missions/engine';
import {
  codificarResumen,
  crearPractica,
  decodificarResumen,
  EJES,
  ejeDeMision,
  PREGUNTAS_POR_PRACTICA,
  resumenPorEje,
} from '@/features/practice/practica';

const todasLasPreguntas = new Map(ALL_MISSIONS.flatMap((m) => m.preguntas.map((q) => [q.id, q] as const)));

describe('Práctica PAES', () => {
  test('cada eje tiene suficientes preguntas en el catálogo', () => {
    for (const e of EJES) {
      const n = ALL_MISSIONS.filter((m) => ejeDeMision(m) === e.id).reduce((s, m) => s + m.preguntas.length, 0);
      expect(n).toBeGreaterThanOrEqual(e.cantidad);
    }
  });

  test.each([1, 2, 42, 2026, 987654321])('semilla %i: 15 preguntas reales, sin repetir y balanceadas por eje', (semilla) => {
    const p = crearPractica(semilla);
    expect(p.mision.preguntas).toHaveLength(PREGUNTAS_POR_PRACTICA);
    expect(PREGUNTAS_POR_PRACTICA).toBe(15);
    const ids = p.mision.preguntas.map((q) => q.id);
    expect(new Set(ids).size).toBe(15);
    // Son las mismas preguntas verificadas del catálogo, sin modificar.
    for (const q of p.mision.preguntas) expect(todasLasPreguntas.get(q.id)).toBe(q);
    for (const e of EJES) {
      expect(ids.filter((id) => p.ejes[id] === e.id)).toHaveLength(e.cantidad);
    }
    expect(p.mision.sinCorazones).toBe(true);
  });

  test('la misma semilla da la misma práctica; otra semilla, otra distinta', () => {
    const a = crearPractica(7).mision.preguntas.map((q) => q.id);
    const b = crearPractica(7).mision.preguntas.map((q) => q.id);
    const c = crearPractica(8).mision.preguntas.map((q) => q.id);
    expect(a).toEqual(b);
    expect(a).not.toEqual(c);
  });

  test('mezcla preguntas de distintos cursos', () => {
    const cursos = new Set(Object.values(crearPractica(3).cursos));
    expect(cursos.size).toBeGreaterThanOrEqual(2);
  });

  test('sin corazones: los errores no terminan la práctica', () => {
    const p = crearPractica(11);
    const reduce = missionReducer(p.mision);
    let s = createMissionState(p.mision);
    for (const q of p.mision.preguntas) {
      s = reduce(s, { type: 'responder', option: q.correcta === 'a' ? 'b' : 'a' });
      s = reduce(s, { type: 'continuar' });
    }
    expect(s.phase).toBe('terminada');
    expect(s.answers).toHaveLength(15);
    expect(summarize(p.mision, s)).toMatchObject({ correctas: 0, completada: true, xp: 10 });
  });

  test('resumen por eje: cuenta correctas y se codifica para pasar entre pantallas', () => {
    const p = crearPractica(5);
    const respuestas = p.mision.preguntas.map((q, i) => ({ questionId: q.id, correct: i % 2 === 0 }));
    const resumen = resumenPorEje(p, respuestas);
    expect(resumen.map((r) => r.total)).toEqual([5, 5, 3, 2]);
    expect(resumen.reduce((s, r) => s + r.correctas, 0)).toBe(8);
    expect(decodificarResumen(codificarResumen(resumen))).toEqual(resumen);
    expect(decodificarResumen('basura,numeros:x')).toEqual([]);
  });
});

describe('práctica PAES M2', () => {
  const { ALL_MISSIONS: misiones, courseOfMission: cursoDe } = jest.requireActual('@/features/missions/catalog');
  const prac = jest.requireActual('@/features/practice/practica');

  test('usa solo preguntas de 3.º y 4.º medio, 15 en total, con el reparto por eje de M2', () => {
    for (const semilla of [1, 2, 3, 99]) {
      const p = prac.crearPractica(semilla, 'M2');
      expect(p.mision.id).toBe(prac.PRACTICA_M2_ID);
      expect(p.mision.titulo).toBe('Práctica PAES M2');
      expect(p.mision.preguntas).toHaveLength(15);
      const cursosValidos = new Set(['3.º medio', '4.º medio']);
      for (const q of p.mision.preguntas) expect(cursosValidos.has(p.cursos[q.id])).toBe(true);
      const conteo: Record<string, number> = {};
      for (const q of p.mision.preguntas) conteo[p.ejes[q.id]] = (conteo[p.ejes[q.id]] ?? 0) + 1;
      expect(conteo).toEqual({ numeros: 3, algebra: 5, geometria: 3, probabilidad: 4 });
    }
  });

  test('M1 ya no incluye 3.º ni 4.º medio', () => {
    const p = prac.crearPractica(7, 'M1');
    for (const q of p.mision.preguntas) expect(['3.º medio', '4.º medio']).not.toContain(p.cursos[q.id]);
  });

  test('hay suficientes preguntas por eje en 3.º y 4.º medio', () => {
    const porEje: Record<string, number> = {};
    for (const m of misiones) {
      if (!['3m', '4m'].includes(cursoDe(m.id)?.id)) continue;
      const e = prac.ejeDeMision(m);
      porEje[e] = (porEje[e] ?? 0) + m.preguntas.length;
    }
    for (const [eje, n] of Object.entries(prac.PRACTICAS.M2.cantidades)) expect(porEje[eje]).toBeGreaterThanOrEqual((n as number) * 3);
  });

  test('esPractica y pruebaDe', () => {
    expect(prac.esPractica('practica-paes')).toBe(true);
    expect(prac.esPractica('practica-paes-m2')).toBe(true);
    expect(prac.esPractica('enteros-7b')).toBe(false);
    expect(prac.pruebaDe('practica-paes-m2')).toBe('M2');
    expect(prac.pruebaDe('practica-paes')).toBe('M1');
  });
});
