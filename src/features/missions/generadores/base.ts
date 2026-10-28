import { formatNumero } from '../format';
import { OptionId, Question, QuestionOption } from '../types';

/**
 * Herramientas para generar variantes de preguntas.
 *
 * Un generador elige números al azar (con una semilla), calcula la
 * respuesta correcta y los errores típicos, y arma una pregunta con el
 * mismo formato que las preguntas escritas a mano. Las pruebas validan
 * cientos de variantes de cada generador con las mismas reglas que las
 * preguntas fijas.
 */

export type Rnd = () => number;

/** Generador pseudoaleatorio con semilla (mulberry32). */
export function aleatorio(semilla: number): Rnd {
  let a = semilla >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function barajar<T>(lista: T[], rnd: Rnd): T[] {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

/** Entero al azar entre min y max, ambos incluidos. */
export const entre = (rnd: Rnd, min: number, max: number) => min + Math.floor(rnd() * (max - min + 1));

/** Un elemento al azar de la lista. */
export const uno = <T>(rnd: Rnd, lista: readonly T[]): T => lista[Math.floor(rnd() * lista.length)];

/** Número en formato chileno (coma decimal, signo menos tipográfico). */
export const n = formatNumero;

/** Número entre paréntesis si es negativo: (−8). */
export const p = (x: number) => (x < 0 ? `(${formatNumero(x)})` : formatNumero(x));

export const mcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : mcd(b, a % b));

/** Fracción irreducible como texto: 6/8 → "3/4", −4/2 → "−2". */
export function fraccion(num: number, den: number): string {
  if (den < 0) {
    num = -num;
    den = -den;
  }
  const g = mcd(num, den) || 1;
  const a = num / g;
  const b = den / g;
  return b === 1 ? formatNumero(a) : `${a < 0 ? '−' : ''}${Math.abs(a)}/${b}`;
}

const SUP: Record<string, string> = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻' };

/** Exponente en superíndice: sup(12) → "¹²", sup(−2) → "⁻²". */
export const sup = (x: number) =>
  String(x)
    .split('')
    .map((c) => SUP[c] ?? c)
    .join('');

/** Una alternativa antes de asignarle letra. */
export type Alternativa = { valor: number; texto?: string; porQue?: string };

export type PreguntaGenerada = Omit<Question, 'id' | 'opciones' | 'correcta'> & {
  correcta: Alternativa;
  /** Tres errores típicos, cada uno con su explicación. */
  distractores: [Alternativa, Alternativa, Alternativa];
};

export type Generador = {
  id: string;
  /** Devuelve una variante, o null si los números elegidos no sirven (se reintenta). */
  crear: (rnd: Rnd) => PreguntaGenerada | null;
};

const EPS = 1e-9;
const LETRAS: OptionId[] = ['a', 'b', 'c', 'd'];

function textoVisible(q: PreguntaGenerada, alt: Alternativa): string {
  if (alt.texto) return alt.texto;
  const base = `${q.prefijo ?? ''}${formatNumero(alt.valor)}`;
  if (!q.unidad) return base;
  return q.unidad === '°' ? `${base}°` : `${base} ${q.unidad}`;
}

/** Revisa que la variante sea válida: respuesta = cálculo y cuatro alternativas distintas. */
function esValida(q: PreguntaGenerada): boolean {
  const todas = [q.correcta, ...q.distractores];
  if (!todas.every((a) => Number.isFinite(a.valor))) return false;
  if (Math.abs(q.correcta.valor - q.calcular()) > EPS) return false;
  for (let i = 0; i < todas.length; i++) {
    for (let j = i + 1; j < todas.length; j++) {
      if (Math.abs(todas[i].valor - todas[j].valor) <= EPS) return false;
    }
  }
  const textos = todas.map((a) => textoVisible(q, a));
  return new Set(textos).size === 4;
}

/** Crea una variante válida del generador y le asigna id y letras al azar. */
export function generar(gen: Generador, rnd: Rnd, id: string): Question {
  for (let intento = 0; intento < 200; intento++) {
    const q = gen.crear(rnd);
    if (!q || !esValida(q)) continue;
    const orden = barajar([q.correcta, ...q.distractores], rnd);
    const opciones = orden.map((alt, i) => ({
      id: LETRAS[i],
      valor: alt.valor,
      ...(alt.texto ? { texto: alt.texto } : {}),
      ...(alt === q.correcta ? {} : { porQue: alt.porQue }),
    })) as [QuestionOption, QuestionOption, QuestionOption, QuestionOption];
    const { correcta, distractores, ...resto } = q;
    void distractores;
    return { ...resto, id, opciones, correcta: LETRAS[orden.indexOf(correcta)] };
  }
  throw new Error(`El generador ${gen.id} no logró una variante válida`);
}
