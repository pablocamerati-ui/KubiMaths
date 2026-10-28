import { misionEnteros7b as m } from '@/features/missions/data/enteros7b';
import { createMissionState, MissionState, missionReducer, summarize } from '@/features/missions/engine';
import { OptionId } from '@/features/missions/types';
import { applyResult } from '@/features/progress/applyResult';
import { EMPTY_PROGRESS } from '@/features/progress/types';
import { ALL_MISSIONS } from '@/features/missions/catalog';
import { formatNumero } from '@/features/missions/format';
import { localTutor } from '@/features/tutor/localTutor';

const reduce = missionReducer(m);
const wrongOf = (c: OptionId): OptionId => (c === 'a' ? 'b' : 'a');

function play(pattern: boolean[]): MissionState {
  let s = createMissionState(m);
  for (let i = 0; i < pattern.length && s.phase !== 'terminada'; i++) {
    const q = m.preguntas[s.index];
    s = reduce(s, { type: 'responder', option: pattern[i] ? q.correcta : wrongOf(q.correcta) });
    s = reduce(s, { type: 'continuar' });
  }
  return s;
}

describe('Motor de misión', () => {
  test('estado inicial', () => {
    const s = createMissionState(m);
    expect(s).toMatchObject({ index: 0, hearts: 3, phase: 'respondiendo', answers: [] });
  });

  test('responder bien mantiene corazones; mal resta uno', () => {
    let s = createMissionState(m);
    s = reduce(s, { type: 'responder', option: m.preguntas[0].correcta });
    expect(s.hearts).toBe(3);
    expect(s.phase).toBe('retroalimentacion');
    s = reduce(s, { type: 'continuar' });
    s = reduce(s, { type: 'responder', option: wrongOf(m.preguntas[1].correcta) });
    expect(s.hearts).toBe(2);
  });

  test('no se puede responder dos veces la misma pregunta', () => {
    let s = createMissionState(m);
    s = reduce(s, { type: 'responder', option: wrongOf(m.preguntas[0].correcta) });
    const again = reduce(s, { type: 'responder', option: m.preguntas[0].correcta });
    expect(again).toBe(s);
  });

  test('misión perfecta: 8/8 y 100 XP (8×10 + 20 de bono)', () => {
    const s = play(Array(8).fill(true));
    expect(s.phase).toBe('terminada');
    expect(summarize(m, s)).toEqual({
      missionId: m.id,
      correctas: 8,
      total: 8,
      corazones: 3,
      xp: 100,
      completada: true,
    });
  });

  test('con dos errores igual se completa: 6/8 y 80 XP', () => {
    const s = play([true, false, true, true, false, true, true, true]);
    const r = summarize(m, s);
    expect(r).toMatchObject({ correctas: 6, corazones: 1, xp: 80, completada: true });
  });

  test('tres errores terminan la misión sin completarla y sin bono', () => {
    const s = play([true, false, false, true, false, true, true, true]);
    expect(s.phase).toBe('terminada');
    expect(s.answers).toHaveLength(5);
    expect(summarize(m, s)).toMatchObject({ correctas: 2, corazones: 0, xp: 20, completada: false });
  });

  test('perder el último corazón en la pregunta 8 no completa la misión', () => {
    const s = play([false, false, true, true, true, true, true, false]);
    expect(summarize(m, s)).toMatchObject({ correctas: 5, corazones: 0, completada: false, xp: 50 });
  });
});

describe('Progreso del estudiante', () => {
  test('acumula XP, intentos y mejor resultado; la misión queda completada', () => {
    const p1 = applyResult(EMPTY_PROGRESS, { missionId: m.id, correctas: 2, total: 8, corazones: 0, xp: 20, completada: false });
    const p2 = applyResult(p1, { missionId: m.id, correctas: 7, total: 8, corazones: 2, xp: 90, completada: true });
    const p3 = applyResult(p2, { missionId: m.id, correctas: 5, total: 8, corazones: 0, xp: 50, completada: false });
    expect(p3.xpTotal).toBe(160);
    expect(p3.misiones[m.id]).toEqual({ completada: true, mejorCorrectas: 7, intentos: 3 });
  });
  test('registrar un resultado conserva el curso elegido', () => {
    const p = applyResult({ ...EMPTY_PROGRESS, curso: '8b' }, { missionId: m.id, correctas: 8, total: 8, corazones: 3, xp: 100, completada: true });
    expect(p.curso).toBe('8b');
  });
});

describe('Tutor local', () => {
  const q = m.preguntas[0];
  test('acierto: título positivo y pasos', () => {
    const f = localTutor.retroalimentar(q, q.correcta);
    expect(f.correcto).toBe(true);
    expect(f.pasos).toEqual(q.pasos);
    expect(f.porQue).toBeUndefined();
  });
  test('error: muestra la respuesta correcta y explica el error típico', () => {
    const f = localTutor.retroalimentar(q, 'c');
    expect(f.correcto).toBe(false);
    expect(f.titulo).toBe('¡Casi! Era −3');
    expect(f.porQue).toContain('signos son distintos');
  });
  test('cuando la respuesta es una frase, el título se redacta distinto', () => {
    const q8 = ALL_MISSIONS.find((x) => x.id === 'semejanza-1m')!.preguntas[6];
    expect(localTutor.retroalimentar(q8, 'a').titulo).toBe('¡Casi! La correcta es: Sí, por el criterio AA');
  });
  test('incluye unidad en contextos', () => {
    const temp = m.preguntas[4];
    expect(localTutor.retroalimentar(temp, 'b').titulo).toBe('¡Casi! Era 5 °C');
  });
  test('fracciones: muestra la fracción correcta', () => {
    const f = ALL_MISSIONS.find((x) => x.id === 'fracciones-7b')!.preguntas[2];
    expect(localTutor.retroalimentar(f, 'a').titulo).toBe('¡Casi! Era 5/6');
  });
  test('ninguna pista revela el texto de la respuesta', () => {
    for (const p of ALL_MISSIONS.flatMap((x) => x.preguntas)) {
      const op = p.opciones.find((o) => o.id === p.correcta)!;
      if (op.texto) expect(localTutor.pista(p)).not.toContain(op.texto);
    }
  });
  test('la pista no revela el resultado', () => {
    for (const p of ALL_MISSIONS.flatMap((x) => x.preguntas)) {
      const op = p.opciones.find((o) => o.id === p.correcta)!;
      if (op.texto) continue; // las respuestas con texto propio se revisan en la prueba anterior
      // El valor con su signo exacto, en formato chileno ("9" no debe confundirse con "−9").
      const visible = formatNumero(Math.abs(op.valor)).replace(/[.,]/g, (c) => `\\${c}`);
      const patron =
        op.valor < 0
          ? new RegExp(`[−-]${visible}([^0-9]|$)`)
          : new RegExp(`(^|[^0-9,.−-])${visible}([^0-9]|[.,](?![0-9])|$)`);
      expect(localTutor.pista(p)).not.toMatch(patron);
    }
  });
});
