import { Mission } from '../types';

/**
 * Misión 2.º medio — Ecuación de segundo grado.
 * Ecuaciones incompletas, factorización, fórmula general, discriminante,
 * problemas y relación entre coeficientes y soluciones.
 *
 * Cuando las alternativas son conjuntos de soluciones, `valor` es un
 * código: suma de las soluciones + 1.000 × cantidad de soluciones, salvo
 * donde la pregunta indica otro.
 */
const codigo = (...soluciones: number[]) => soluciones.reduce((s, x) => s + x, 0) + 1000 * soluciones.length;

export const misionEcuacion2m: Mission = {
  id: 'ecuacion-2m',
  titulo: 'Ecuación de segundo grado',
  nivel: '2.º medio',
  unidad: 'Unidad 2 · Álgebra',
  corazonesIniciales: 3,
  xpPorCorrecta: 10,
  xpBonoCompletar: 20,
  preguntas: [
    {
      // valor: producto de las soluciones
      id: 'e2-01',
      habilidad: 'Ecuación incompleta',
      enunciado: 'Resuelve la ecuación:',
      expresion: 'x² = 49',
      opciones: [
        { id: 'a', valor: 7, texto: 'Solo x = 7', porQue: '(−7)² también es 49: hay dos soluciones.' },
        { id: 'b', valor: 7 * -7, texto: 'x = 7 y x = −7' },
        { id: 'c', valor: 24.5, texto: 'x = 24,5', porQue: 'Dividiste 49 por 2. Para despejar x² se saca raíz.' },
        { id: 'd', valor: 49 * -49, texto: 'x = 49 y x = −49', porQue: '49² no es 49. Hay que sacar la raíz: √49 = 7.' },
      ],
      correcta: 'b',
      calcular: () => 7 * -7,
      pasos: [
        'Sacamos raíz cuadrada a ambos lados.',
        'x = √49 o x = −√49.',
        'x = 7 o x = −7.',
      ],
      pista: 'Un número al cuadrado da lo mismo si es positivo o negativo.',
    },
    {
      id: 'e2-02',
      habilidad: 'Factor común',
      enunciado: 'Resuelve la ecuación:',
      expresion: 'x² − 5x = 0',
      opciones: [
        { id: 'a', valor: codigo(0, 5), texto: 'x = 0 y x = 5' },
        { id: 'b', valor: codigo(5), texto: 'Solo x = 5', porQue: 'Si divides por x pierdes la solución x = 0. Factoriza: x(x − 5) = 0.' },
        { id: 'c', valor: codigo(0, -5), texto: 'x = 0 y x = −5', porQue: 'x − 5 = 0 da x = 5, positivo.' },
        { id: 'd', valor: codigo(5, -5), texto: 'x = 5 y x = −5', porQue: 'La ecuación no es x² = 25. Factoriza: x(x − 5) = 0.' },
      ],
      correcta: 'a',
      calcular: () => codigo(0, 5),
      pasos: [
        'Factorizamos: x(x − 5) = 0.',
        'Un producto es cero si algún factor es cero.',
        'x = 0 o x − 5 = 0, es decir, x = 5.',
      ],
      pista: 'Saca x como factor común.',
    },
    {
      id: 'e2-03',
      habilidad: 'Factorización',
      enunciado: 'Resuelve la ecuación:',
      expresion: 'x² − 7x + 12 = 0',
      opciones: [
        { id: 'a', valor: codigo(-3, -4), texto: 'x = −3 y x = −4', porQue: 'Los factores son (x − 3)(x − 4), así que las soluciones son positivas.' },
        { id: 'b', valor: codigo(2, 6), texto: 'x = 2 y x = 6', porQue: '2 · 6 = 12, pero 2 + 6 = 8, no 7.' },
        { id: 'c', valor: codigo(3, 4), texto: 'x = 3 y x = 4' },
        { id: 'd', valor: codigo(1, 12), texto: 'x = 1 y x = 12', porQue: '1 · 12 = 12, pero 1 + 12 = 13, no 7.' },
      ],
      correcta: 'c',
      calcular: () => {
        const d = Math.sqrt(49 - 48);
        return codigo((7 - d) / 2, (7 + d) / 2);
      },
      pasos: [
        'Buscamos dos números que multipliquen 12 y sumen 7: 3 y 4.',
        'x² − 7x + 12 = (x − 3)(x − 4) = 0.',
        'x = 3 o x = 4.',
      ],
      pista: 'Busca dos números que multipliquen 12 y sumen 7.',
    },
    {
      id: 'e2-04',
      habilidad: 'Fórmula general',
      enunciado: 'Resuelve la ecuación:',
      expresion: 'x² + 2x − 8 = 0',
      opciones: [
        { id: 'a', valor: codigo(-2, 4), texto: 'x = −2 y x = 4', porQue: 'Los signos quedaron al revés: −b = −2, así que x = (−2 ± 6) / 2.' },
        { id: 'b', valor: codigo(2, 4), texto: 'x = 2 y x = 4', porQue: '2 · 4 = 8, pero el producto de las soluciones debe ser −8.' },
        { id: 'c', valor: codigo(8, -1), texto: 'x = 8 y x = −1', porQue: '8 · (−1) = −8, pero su suma es 7 y debería ser −2.' },
        { id: 'd', valor: codigo(2, -4), texto: 'x = 2 y x = −4' },
      ],
      correcta: 'd',
      calcular: () => {
        const d = Math.sqrt(2 ** 2 - 4 * 1 * -8);
        return codigo((-2 + d) / 2, (-2 - d) / 2);
      },
      pasos: [
        'Fórmula: x = (−b ± √(b² − 4ac)) / (2a), con a = 1, b = 2, c = −8.',
        'b² − 4ac = 4 + 32 = 36, y √36 = 6.',
        'x = (−2 + 6) / 2 = 2 o x = (−2 − 6) / 2 = −4.',
      ],
      pista: 'Usa la fórmula general con a = 1, b = 2 y c = −8.',
    },
    {
      // valor: cantidad de soluciones reales
      id: 'e2-05',
      habilidad: 'Discriminante',
      enunciado: '¿Cuántas soluciones reales tiene la ecuación?',
      expresion: 'x² − 6x + 9 = 0',
      opciones: [
        { id: 'a', valor: 1, texto: 'Una' },
        { id: 'b', valor: 2, texto: 'Dos', porQue: 'Δ = 36 − 36 = 0: hay una sola solución (x = 3).' },
        { id: 'c', valor: 0, texto: 'Ninguna', porQue: 'Δ no es negativo: es 0.' },
        { id: 'd', valor: 3, texto: 'Tres', porQue: 'Una ecuación de segundo grado tiene a lo más dos soluciones.' },
      ],
      correcta: 'a',
      calcular: () => {
        const disc = (-6) ** 2 - 4 * 1 * 9;
        return disc < 0 ? 0 : disc === 0 ? 1 : 2;
      },
      pasos: [
        'Δ = b² − 4ac = (−6)² − 4 · 1 · 9.',
        'Δ = 36 − 36 = 0.',
        'Con Δ = 0 hay una sola solución: x² − 6x + 9 = (x − 3)².',
      ],
      pista: 'Calcula el discriminante b² − 4ac.',
    },
    {
      id: 'e2-06',
      habilidad: 'Problemas de área',
      enunciado: 'Un rectángulo tiene un largo 3 cm mayor que su ancho y un área de 40 cm². ¿Cuánto mide el ancho?',
      unidad: 'cm',
      opciones: [
        { id: 'a', valor: 8, porQue: '8 cm es el largo (5 + 3). Se pregunta el ancho.' },
        { id: 'b', valor: 5 },
        { id: 'c', valor: 40 / 3, texto: '≈ 13,3 cm', porQue: 'Dividiste 40 por 3. Plantea x(x + 3) = 40.' },
        { id: 'd', valor: 20, porQue: 'Dividiste el área por 2. Plantea x(x + 3) = 40.' },
      ],
      correcta: 'b',
      calcular: () => (-3 + Math.sqrt(9 + 160)) / 2,
      pasos: [
        'Ancho x, largo x + 3: x(x + 3) = 40, es decir, x² + 3x − 40 = 0.',
        'Factorizamos: (x + 8)(x − 5) = 0.',
        'Como es una medida, x = 5 cm (el largo mide 8 cm).',
      ],
      pista: 'Plantea ancho · largo = 40 con largo = ancho + 3.',
    },
    {
      id: 'e2-07',
      habilidad: 'Plantear una ecuación cuadrática',
      enunciado: 'El cuadrado de un número positivo, menos el doble del número, es 15. ¿Cuál es el número?',
      opciones: [
        { id: 'a', valor: -3, porQue: '−3 cumple la ecuación, pero el número debe ser positivo.' },
        { id: 'b', valor: 15, porQue: 'Revisa: 15² − 2 · 15 = 195, no 15.' },
        { id: 'c', valor: 5 },
        { id: 'd', valor: 3, porQue: 'Revisa los signos: x² − 2x − 15 = (x − 5)(x + 3).' },
      ],
      correcta: 'c',
      calcular: () => (2 + Math.sqrt(4 + 60)) / 2,
      pasos: [
        'Planteamos: x² − 2x = 15, es decir, x² − 2x − 15 = 0.',
        'Factorizamos: (x − 5)(x + 3) = 0.',
        'Como el número es positivo, x = 5.',
      ],
      pista: 'Plantea x² − 2x = 15 y ordena todo a un lado.',
    },
    {
      id: 'e2-08',
      habilidad: 'Suma de las soluciones',
      enunciado: 'Si a y b son las soluciones de x² − 10x + 21 = 0, ¿cuánto es a + b?',
      opciones: [
        { id: 'a', valor: 21, porQue: '21 es el producto de las soluciones (c/a), no la suma.' },
        { id: 'b', valor: -10, porQue: 'La suma es −b/a = −(−10)/1, positiva.' },
        { id: 'c', valor: 7, porQue: '7 es una sola de las soluciones (la otra es 3).' },
        { id: 'd', valor: 10 },
      ],
      correcta: 'd',
      calcular: () => {
        const d = Math.sqrt(100 - 84);
        return (10 + d) / 2 + (10 - d) / 2;
      },
      pasos: [
        'Factorizamos: (x − 3)(x − 7) = 0, así que las soluciones son 3 y 7.',
        'a + b = 3 + 7.',
        '= 10 (también se obtiene como −b/a).',
      ],
      pista: 'Encuentra las dos soluciones y súmalas, o usa la relación −b/a.',
    },
  ],
};
