import { Question, QuestionOption } from './types';

/** Formatea un entero con el signo menos tipográfico (−) en lugar del guion. */
export function formatEntero(n: number): string {
  return formatNumero(n);
}

/**
 * Formato chileno: coma decimal, punto de miles y signo menos tipográfico.
 * Ej.: -3 → "−3", 0.75 → "0,75", 9600 → "9.600".
 */
export function formatNumero(n: number): string {
  if (Object.is(n, -0) || n === 0) return '0';
  const neg = n < 0;
  const abs = Math.abs(n);
  const redondeado = Math.round(abs * 10000) / 10000;
  const [entera, decimal] = String(redondeado).split('.');
  const conMiles = entera.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${neg ? '−' : ''}${conMiles}${decimal ? `,${decimal}` : ''}`;
}

/** Texto visible de una alternativa: su texto propio o el valor con prefijo y unidad. */
export function textoOpcion(q: Question, op: QuestionOption): string {
  if (op.texto) return op.texto;
  const base = `${q.prefijo ?? ''}${formatNumero(op.valor)}`;
  if (!q.unidad) return base;
  // Los grados van pegados al número (60°); las demás unidades, con espacio (5 cm).
  return q.unidad === '°' ? `${base}°` : `${base} ${q.unidad}`;
}
