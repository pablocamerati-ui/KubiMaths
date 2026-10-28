import { ALL_MISSIONS, courseOfMission } from '../missions/catalog';
import { Mission, Question } from '../missions/types';

/**
 * Práctica estilo PAES: preguntas mezcladas, agrupadas por los cuatro ejes de
 * la prueba. M1 usa 7.º básico a 2.º medio; M2, 3.º y 4.º medio.
 * No es un ensayo oficial ni entrega un puntaje PAES: muestra el logro por eje.
 */

export type Prueba = 'M1' | 'M2';

export const PRACTICA_ID = 'practica-paes';
export const PRACTICA_M2_ID = 'practica-paes-m2';

export const PRACTICAS: Record<Prueba, { id: string; nombre: string; cursos: string[]; cantidades: Record<Eje, number> }> = {
  M1: {
    id: PRACTICA_ID,
    nombre: 'Práctica PAES M1',
    cursos: ['7b', '8b', '1m', '2m'],
    cantidades: { numeros: 5, algebra: 5, geometria: 3, probabilidad: 2 },
  },
  M2: {
    id: PRACTICA_M2_ID,
    nombre: 'Práctica PAES M2',
    cursos: ['3m', '4m'],
    cantidades: { numeros: 3, algebra: 5, geometria: 3, probabilidad: 4 },
  },
};

/** ¿Este id es una práctica PAES (M1 o M2)? */
export const esPractica = (id: string | undefined) => id === PRACTICA_ID || id === PRACTICA_M2_ID;

export const pruebaDe = (id: string | undefined): Prueba => (id === PRACTICA_M2_ID ? 'M2' : 'M1');

export type Eje = 'numeros' | 'algebra' | 'geometria' | 'probabilidad';

export const EJES: { id: Eje; nombre: string; cantidad: number }[] = [
  { id: 'numeros', nombre: 'Números', cantidad: 5 },
  { id: 'algebra', nombre: 'Álgebra y funciones', cantidad: 5 },
  { id: 'geometria', nombre: 'Geometría', cantidad: 3 },
  { id: 'probabilidad', nombre: 'Probabilidad y estadística', cantidad: 2 },
];

export const PREGUNTAS_POR_PRACTICA = EJES.reduce((n, e) => n + e.cantidad, 0);

/** Eje PAES de una misión según su unidad. */
export function ejeDeMision(m: Mission): Eje {
  if (m.unidad.includes('Álgebra')) return 'algebra';
  if (m.unidad.includes('Geometría')) return 'geometria';
  if (m.unidad.includes('Probabilidad')) return 'probabilidad';
  return 'numeros';
}

/** Generador pseudoaleatorio con semilla (mulberry32): la misma semilla da la misma práctica. */
function aleatorio(semilla: number): () => number {
  let a = semilla >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function barajar<T>(lista: T[], rnd: () => number): T[] {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

export type Practica = {
  mision: Mission;
  /** Eje de cada pregunta, por id de pregunta. */
  ejes: Record<string, Eje>;
  /** Curso de origen de cada pregunta (por ejemplo "8.º básico"). */
  cursos: Record<string, string>;
};

/** Arma una práctica de 15 preguntas, balanceada por eje y en orden aleatorio. */
export function crearPractica(semilla: number, prueba: Prueba = 'M1'): Practica {
  const config = PRACTICAS[prueba];
  const rnd = aleatorio(semilla);
  const ejes: Record<string, Eje> = {};
  const cursos: Record<string, string> = {};
  const elegidas: Question[] = [];

  for (const eje of EJES) {
    const candidatas = ALL_MISSIONS.filter(
      (m) => ejeDeMision(m) === eje.id && config.cursos.includes(courseOfMission(m.id)?.id ?? '')
    ).flatMap((m) => m.preguntas.map((q) => ({ q, curso: courseOfMission(m.id)?.nombre ?? m.nivel })));
    for (const { q, curso } of barajar(candidatas, rnd).slice(0, config.cantidades[eje.id])) {
      elegidas.push(q);
      ejes[q.id] = eje.id;
      cursos[q.id] = curso;
    }
  }

  return {
    mision: {
      id: config.id,
      titulo: config.nombre,
      nivel: `PAES ${prueba}`,
      unidad: 'Repaso',
      preguntas: barajar(elegidas, rnd),
      corazonesIniciales: 0,
      xpPorCorrecta: 5,
      xpBonoCompletar: 10,
      sinCorazones: true,
    },
    ejes,
    cursos,
  };
}

export type ResultadoEje = { eje: Eje; nombre: string; correctas: number; total: number };

/** Correctas por eje a partir de las respuestas. */
export function resumenPorEje(
  practica: Practica,
  respuestas: { questionId: string; correct: boolean }[]
): ResultadoEje[] {
  return EJES.map((e) => {
    const delEje = respuestas.filter((r) => practica.ejes[r.questionId] === e.id);
    return { eje: e.id, nombre: e.nombre, correctas: delEje.filter((r) => r.correct).length, total: delEje.length };
  });
}

/** Codifica el resumen para pasarlo entre pantallas: "numeros:4/5,algebra:3/5,…". */
export function codificarResumen(resumen: ResultadoEje[]): string {
  return resumen.map((r) => `${r.eje}:${r.correctas}/${r.total}`).join(',');
}

export function decodificarResumen(texto: string | undefined): ResultadoEje[] {
  if (!texto) return [];
  return texto
    .split(',')
    .map((parte) => {
      const m = /^(\w+):(\d+)\/(\d+)$/.exec(parte);
      const eje = EJES.find((e) => e.id === m?.[1]);
      if (!m || !eje) return null;
      return { eje: eje.id, nombre: eje.nombre, correctas: Number(m[2]), total: Number(m[3]) };
    })
    .filter((r): r is ResultadoEje => r !== null);
}
