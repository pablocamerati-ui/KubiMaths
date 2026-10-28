import { COURSES } from '../missions/catalog';
import { MissionResult } from '../missions/engine';
import { PRACTICA_ID, PREGUNTAS_POR_PRACTICA } from '../practice/practica';
import { applyResult } from './applyResult';
import { Racha, StudentProgress } from './types';

/**
 * Racha diaria y logros.
 *
 * Funciones puras: reciben la fecha como parámetro para poder probarlas.
 * Los días se cuentan en la hora local del teléfono.
 */

/** Día local en formato AAAA-MM-DD. */
export function diaLocal(fecha: Date): string {
  const y = fecha.getFullYear();
  const m = String(fecha.getMonth() + 1).padStart(2, '0');
  const d = String(fecha.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function diaAnterior(dia: string): string {
  const [y, m, d] = dia.split('-').map(Number);
  return diaLocal(new Date(y, m - 1, d - 1));
}

/** Suma el día de hoy a la racha: sigue si jugó ayer, se mantiene si ya jugó hoy, si no parte de 1. */
export function actualizarRacha(racha: Racha | undefined, hoy: string): Racha {
  if (!racha) return { actual: 1, mejor: 1, ultimoDia: hoy };
  if (racha.ultimoDia === hoy) return racha;
  const actual = racha.ultimoDia === diaAnterior(hoy) ? racha.actual + 1 : 1;
  return { actual, mejor: Math.max(racha.mejor, actual), ultimoDia: hoy };
}

/** Racha que se muestra hoy: si el último día jugado fue antes de ayer, la racha ya se cortó. */
export function rachaVigente(racha: Racha | undefined, hoy: string): number {
  if (!racha) return 0;
  return racha.ultimoDia === hoy || racha.ultimoDia === diaAnterior(hoy) ? racha.actual : 0;
}

export type Logro = {
  id: string;
  titulo: string;
  descripcion: string;
  cumple: (p: StudentProgress) => boolean;
};

const completada = (p: StudentProgress, id: string) => p.misiones[id]?.completada === true;

export const LOGROS: Logro[] = [
  {
    id: 'primera-mision',
    titulo: 'Primera misión',
    descripcion: 'Completa tu primera misión.',
    cumple: (p) => Object.entries(p.misiones).some(([id, m]) => id !== PRACTICA_ID && m.completada),
  },
  {
    id: 'mision-perfecta',
    titulo: 'Misión perfecta',
    descripcion: 'Responde bien las 8 preguntas de una misión.',
    cumple: (p) => Object.entries(p.misiones).some(([id, m]) => id !== PRACTICA_ID && m.mejorCorrectas >= 8),
  },
  {
    id: 'racha-3',
    titulo: 'Racha de 3 días',
    descripcion: 'Juega 3 días seguidos.',
    cumple: (p) => (p.racha?.mejor ?? 0) >= 3,
  },
  {
    id: 'racha-7',
    titulo: 'Racha de 7 días',
    descripcion: 'Juega 7 días seguidos.',
    cumple: (p) => (p.racha?.mejor ?? 0) >= 7,
  },
  ...COURSES.map<Logro>((c) => ({
    id: `curso-${c.id}`,
    titulo: `${c.nombre} completo`,
    descripcion: `Completa las ${c.levels.length} misiones de ${c.nombre}.`,
    cumple: (p) => c.levels.every((l) => l.missionId !== null && completada(p, l.missionId)),
  })),
  {
    id: 'practica-80',
    titulo: 'PAES sobre 80 %',
    descripcion: `Logra ${Math.ceil(PREGUNTAS_POR_PRACTICA * 0.8)} de ${PREGUNTAS_POR_PRACTICA} en una práctica PAES.`,
    cumple: (p) => (p.misiones[PRACTICA_ID]?.mejorCorrectas ?? 0) >= PREGUNTAS_POR_PRACTICA * 0.8,
  },
];

export const getLogro = (id: string) => LOGROS.find((l) => l.id === id);

/** Agrega los logros que se acaban de cumplir, con su día. Devuelve el progreso y los ids nuevos. */
export function evaluarLogros(p: StudentProgress, hoy: string): { progreso: StudentProgress; nuevos: string[] } {
  const ya = p.logros ?? {};
  const nuevos = LOGROS.filter((l) => !ya[l.id] && l.cumple(p)).map((l) => l.id);
  if (nuevos.length === 0) return { progreso: p, nuevos };
  const logros = { ...ya };
  for (const id of nuevos) logros[id] = hoy;
  return { progreso: { ...p, logros }, nuevos };
}

/** Registra un intento: suma XP y resultado, extiende la racha y desbloquea logros. */
export function registrarIntento(
  p: StudentProgress,
  result: MissionResult,
  ahora: Date
): { progreso: StudentProgress; nuevos: string[] } {
  const hoy = diaLocal(ahora);
  const conResultado = applyResult(p, result);
  const conRacha = { ...conResultado, racha: actualizarRacha(p.racha, hoy) };
  return evaluarLogros(conRacha, hoy);
}

/** Apodo: 2 a 16 letras, números, espacios, guion o guion bajo. Devuelve el apodo limpio o un mensaje de error. */
export function validarAlias(texto: string): { ok: true; alias: string } | { ok: false; error: string } {
  const alias = texto.trim().replace(/\s+/g, ' ');
  if (alias.length < 2) return { ok: false, error: 'Escribe al menos 2 caracteres.' };
  if (alias.length > 16) return { ok: false, error: 'Usa como máximo 16 caracteres.' };
  if (!/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9 _-]+$/.test(alias)) return { ok: false, error: 'Usa solo letras, números, espacios, - o _.' };
  if (/@|\d{7,}/.test(alias)) return { ok: false, error: 'No uses correos ni números de teléfono o RUT.' };
  return { ok: true, alias };
}
