import { aleatorio, barajar, Generador, generar } from './generadores/base';
import { GENERADORES_1M } from './generadores/gen1m';
import { GENERADORES_2M } from './generadores/gen2m';
import { GENERADORES_7B } from './generadores/gen7b';
import { GENERADORES_8B } from './generadores/gen8b';
import { Mission, Question } from './types';

/**
 * Banco de preguntas por misión.
 *
 * Cada misión tiene sus 8 preguntas escritas a mano y además generadores
 * que crean variantes con otros números. En cada intento se arma un banco
 * de TAMANO_BANCO preguntas y se eligen PREGUNTAS_POR_INTENTO al azar, así
 * repetir una misión no se reduce a memorizar respuestas.
 */
export const TAMANO_BANCO = 20;
export const PREGUNTAS_POR_INTENTO = 8;

export const GENERADORES: Record<string, Generador[]> = {
  ...GENERADORES_7B,
  ...GENERADORES_8B,
  ...GENERADORES_1M,
  ...GENERADORES_2M,
};

export function generadoresDe(missionId: string): Generador[] {
  return GENERADORES[missionId] ?? [];
}

/** Las preguntas fijas más variantes generadas, hasta completar el banco. */
export function bancoDeMision(mission: Mission, semilla: number): Question[] {
  const gens = generadoresDe(mission.id);
  if (gens.length === 0) return [...mission.preguntas];
  const rnd = aleatorio(semilla);
  const variantes: Question[] = [];
  for (let i = 0; mission.preguntas.length + variantes.length < TAMANO_BANCO; i++) {
    const gen = gens[i % gens.length];
    variantes.push(generar(gen, rnd, `${gen.id}-${i + 1}`));
  }
  return [...mission.preguntas, ...variantes];
}

/** Misión lista para jugar: 8 preguntas elegidas al azar del banco. */
export function prepararIntento(mission: Mission, semilla: number): Mission {
  if (mission.sinCorazones) return mission; // la práctica PAES ya viene armada
  const banco = bancoDeMision(mission, semilla);
  if (banco.length <= PREGUNTAS_POR_INTENTO) return mission;
  const rnd = aleatorio(semilla ^ 0x5bd1e995);
  return { ...mission, preguntas: barajar(banco, rnd).slice(0, PREGUNTAS_POR_INTENTO) };
}
