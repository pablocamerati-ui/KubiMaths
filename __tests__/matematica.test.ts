import {
  ALL_LEVELS,
  ALL_MISSIONS,
  COURSES,
  courseOfMission,
  getCourse,
  getMission,
  levelStatuses,
  MAP_LEVELS,
} from '@/features/missions/catalog';
import { formatEntero, formatNumero, textoOpcion } from '@/features/missions/format';

const EPS = 1e-9;

describe.each(ALL_MISSIONS.map((m) => [m.titulo, m] as const))('Misión «%s»', (_titulo, m) => {
  test('tiene 8 preguntas, 3 corazones y está en el catálogo', () => {
    expect(m.preguntas).toHaveLength(8);
    expect(m.corazonesIniciales).toBe(3);
    expect(getMission(m.id)).toBe(m);
    expect(ALL_LEVELS.filter((l) => l.missionId === m.id)).toHaveLength(1);
    expect(courseOfMission(m.id)?.nombre).toBe(m.nivel);
  });

  test.each(m.preguntas.map((q) => [q.id, q] as const))('%s: la alternativa correcta coincide con el cálculo', (_id, q) => {
    expect(q.opciones).toHaveLength(4);
    const correcta = q.opciones.find((o) => o.id === q.correcta);
    expect(correcta).toBeDefined();
    expect(Math.abs(correcta!.valor - q.calcular())).toBeLessThan(EPS);
  });

  test.each(m.preguntas.map((q) => [q.id, q] as const))('%s: ninguna alternativa incorrecta vale lo mismo que la correcta', (_id, q) => {
    const valores = q.opciones.map((o) => o.valor);
    for (let i = 0; i < valores.length; i++) {
      for (let j = i + 1; j < valores.length; j++) {
        expect(Math.abs(valores[i] - valores[j])).toBeGreaterThan(EPS);
      }
    }
    const textos = q.opciones.map((o) => textoOpcion(q, o));
    expect(new Set(textos).size).toBe(4);
    expect(new Set(q.opciones.map((o) => o.id)).size).toBe(4);
  });

  test.each(m.preguntas.map((q) => [q.id, q] as const))('%s: distractores explicados, pasos y pista', (_id, q) => {
    for (const o of q.opciones) {
      if (o.id === q.correcta) expect(o.porQue).toBeUndefined();
      else expect(o.porQue && o.porQue.length > 10).toBe(true);
    }
    expect(q.pasos.length).toBeGreaterThanOrEqual(2);
    expect(q.pista.length).toBeGreaterThan(10);
  });

  test('las respuestas correctas no siempre están en la misma posición', () => {
    expect(new Set(m.preguntas.map((q) => q.correcta)).size).toBeGreaterThanOrEqual(3);
  });
});

test('ids de misiones y de preguntas únicos en todo el catálogo', () => {
  expect(new Set(ALL_MISSIONS.map((m) => m.id)).size).toBe(ALL_MISSIONS.length);
  const ids = ALL_MISSIONS.flatMap((m) => m.preguntas.map((q) => q.id));
  expect(new Set(ids).size).toBe(ids.length);
});

describe('Formato de números (Chile)', () => {
  test('signo menos tipográfico', () => {
    expect(formatEntero(-3)).toBe('−3');
    expect(formatEntero(17)).toBe('17');
    expect(formatEntero(0)).toBe('0');
    expect(formatEntero(-0)).toBe('0');
  });
  test('coma decimal y punto de miles', () => {
    expect(formatNumero(0.75)).toBe('0,75');
    expect(formatNumero(2.5 * 0.4)).toBe('1');
    expect(formatNumero(9600)).toBe('9.600');
    expect(formatNumero(220000)).toBe('220.000');
    expect(formatNumero(-1234.5)).toBe('−1.234,5');
  });
  test('prefijo, unidad y texto propio', () => {
    const q = getMission('porcentajes-7b')!.preguntas[4];
    expect(textoOpcion(q, q.opciones[1])).toBe('$9.600');
    const f = getMission('fracciones-7b')!.preguntas[0];
    expect(textoOpcion(f, f.opciones[0])).toBe('6/8');
    const l = getMission('fracciones-7b')!.preguntas[6];
    expect(textoOpcion(l, l.opciones[0])).toBe('0,5 L');
    const g = getMission('geometria-7b')!.preguntas[2];
    expect(textoOpcion(g, g.opciones[1])).toBe('60°');
    const c = getMission('geometria-7b')!.preguntas[6];
    expect(textoOpcion(c, c.opciones[2])).toBe('31,4 cm');
    const v = getMission('variacion-8b')!.preguntas[4];
    expect(textoOpcion(v, v.opciones[3])).toBe('0,85');
    const s = getMission('sistemas-1m')!.preguntas[6];
    expect(textoOpcion(s, s.opciones[0])).toBe('$900');
    const h = getMission('ecuaciones-8b')!.preguntas[7];
    expect(textoOpcion(h, h.opciones[2])).toBe('7 horas');
  });
});

describe('Mapa: desbloqueo de niveles', () => {
  test('al inicio solo el primer nivel está disponible', () => {
    const s = levelStatuses(new Set());
    expect(s[0]).toBe('disponible');
    expect(s.slice(1).every((x) => x === 'bloqueada')).toBe(true);
    expect(s).toHaveLength(MAP_LEVELS.length);
  });

  test('cada misión completada desbloquea la siguiente', () => {
    expect(levelStatuses(new Set(['enteros-7b'])).slice(0, 3)).toEqual(['completada', 'disponible', 'bloqueada']);
    expect(levelStatuses(new Set(['enteros-7b', 'fracciones-7b'])).slice(0, 4)).toEqual([
      'completada',
      'completada',
      'disponible',
      'bloqueada',
    ]);
  });

  test('las seis misiones de 7.º básico tienen contenido y se completan en cadena', () => {
    expect(MAP_LEVELS.every((l) => l.missionId != null)).toBe(true);
    const todas = new Set(MAP_LEVELS.map((l) => l.missionId!));
    expect(levelStatuses(todas).every((s) => s === 'completada')).toBe(true);
  });
});

describe('Cursos', () => {
  test('cada curso (7.º básico a 2.º medio) tiene seis misiones, con ids de nivel únicos', () => {
    expect(COURSES.map((c) => c.id)).toEqual(['7b', '8b', '1m', '2m']);
    for (const c of COURSES) {
      expect(c.levels).toHaveLength(6);
      expect(c.levels.every((l) => l.missionId != null)).toBe(true);
    }
    expect(new Set(ALL_LEVELS.map((l) => l.id)).size).toBe(ALL_LEVELS.length);
  });

  test('cada curso tiene su propia cadena: la primera misión de 8.º parte disponible', () => {
    const s8 = levelStatuses(new Set(), getCourse('8b').levels);
    expect(s8[0]).toBe('disponible');
    expect(s8.slice(1).every((x) => x === 'bloqueada')).toBe(true);
    // Completar misiones de 7.º no desbloquea niveles de 8.º
    const todo7 = new Set(MAP_LEVELS.map((l) => l.missionId!));
    expect(levelStatuses(todo7, getCourse('8b').levels)[1]).toBe('bloqueada');
    expect(levelStatuses(new Set(['enteros-8b']), getCourse('8b').levels)[1]).toBe('disponible');
  });

  test('un curso desconocido vuelve a 7.º básico', () => {
    expect(getCourse(undefined).id).toBe('7b');
    expect(getCourse('9z').id).toBe('7b');
  });
});
