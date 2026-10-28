import { Mission } from '../types';

/**
 * Misión 4.º medio — Números complejos.
 * Potencias de i, operaciones, conjugado, módulo y ecuaciones cuadráticas
 * con discriminante negativo.
 *
 * Cuando las alternativas son números complejos, `valor` es un código:
 * parte real · 1.000 + parte imaginaria (por ejemplo 4 − 3i → 3.997),
 * salvo donde la pregunta indica otro.
 */
type C = [number, number];
const cod = ([re, im]: C) => re * 1000 + im;
const mul = ([a, b]: C, [c, d]: C): C => [a * c - b * d, a * d + b * c];
const potI = (n: number): C => {
  let r: C = [1, 0];
  for (let k = 0; k < n; k++) r = mul(r, [0, 1]);
  return r;
};

export const misionComplejos4m: Mission = {
  id: 'complejos-4m',
  titulo: 'Números complejos',
  nivel: '4.º medio',
  unidad: 'Unidad 1 · Números',
  corazonesIniciales: 3,
  xpPorCorrecta: 10,
  xpBonoCompletar: 20,
  preguntas: [
    {
      id: 'z4-01',
      habilidad: 'Unidad imaginaria',
      enunciado: '¿Cuánto vale i²?',
      expresion: 'i²',
      opciones: [
        { id: 'a', valor: cod([1, 0]), texto: '1', porQue: 'Por definición, i² = −1, no 1.' },
        { id: 'b', valor: cod([-1, 0]), texto: '−1' },
        { id: 'c', valor: cod([0, 1]), texto: 'i', porQue: 'i² es i · i, que no vuelve a dar i.' },
        { id: 'd', valor: cod([0, 2]), texto: '2i', porQue: 'Elevar al cuadrado es multiplicar, no sumar: i · i ≠ i + i.' },
      ],
      correcta: 'b',
      calcular: () => cod(potI(2)),
      pasos: [
        'La unidad imaginaria i se define como el número que cumple i² = −1.',
        'Por eso i = √(−1).',
        'i² = −1.',
      ],
      pista: 'Recuerda cómo se define la unidad imaginaria.',
    },
    {
      id: 'z4-02',
      habilidad: 'Potencias de i',
      enunciado: 'Calcula la potencia:',
      expresion: 'i⁷',
      opciones: [
        { id: 'a', valor: cod([0, 1]), texto: 'i', porQue: 'Revisa el resto: 7 = 4 + 3, así que i⁷ = i³.' },
        { id: 'b', valor: cod([0, -1]), texto: '−i' },
        { id: 'c', valor: cod([1, 0]), texto: '1', porQue: 'i⁴ = 1, pero 7 no es múltiplo de 4.' },
        { id: 'd', valor: cod([-1, 0]), texto: '−1', porQue: '−1 es i² (o i⁶); a i⁷ le falta otro factor i.' },
      ],
      correcta: 'b',
      calcular: () => cod(potI(7)),
      pasos: [
        'Las potencias de i se repiten cada 4: i, −1, −i, 1.',
        '7 = 4 · 1 + 3, así que i⁷ = i³.',
        'i³ = i² · i = −i.',
      ],
      pista: 'Las potencias de i se repiten cada cuatro: divide el exponente por cuatro y mira el resto.',
    },
    {
      id: 'z4-03',
      habilidad: 'Adición de complejos',
      enunciado: 'Calcula la suma:',
      expresion: '(3 + 2i) + (1 − 5i)',
      opciones: [
        { id: 'a', valor: cod([4, 7]), texto: '4 + 7i', porQue: 'Revisa el signo: 2i + (−5i) = −3i.' },
        { id: 'b', valor: cod([2, 7]), texto: '2 + 7i', porQue: 'Se suman reales con reales (3 + 1) e imaginarias con imaginarias (2i − 5i).' },
        { id: 'c', valor: cod([4, -3]), texto: '4 − 3i' },
        { id: 'd', valor: cod([4, -5]), texto: '4 − 5i', porQue: 'Olvidaste sumar 2i a la parte imaginaria.' },
      ],
      correcta: 'c',
      calcular: () => cod([3 + 1, 2 - 5]),
      pasos: [
        'Parte real: 3 + 1 = 4.',
        'Parte imaginaria: 2i − 5i = −3i.',
        'Resultado: 4 − 3i.',
      ],
      pista: 'Suma por separado las partes reales y las partes imaginarias.',
    },
    {
      id: 'z4-04',
      habilidad: 'Multiplicación de complejos',
      enunciado: 'Calcula el producto:',
      expresion: '(2 + i)(3 − i)',
      opciones: [
        { id: 'a', valor: cod([7, 1]), texto: '7 + i' },
        { id: 'b', valor: cod([5, 1]), texto: '5 + i', porQue: 'Aparece −i², que vale +1, no −1.' },
        { id: 'c', valor: cod([6, 1]), texto: '6 + i', porQue: 'Falta el término i · (−i) = −i² = 1.' },
        { id: 'd', valor: cod([7, 5]), texto: '7 + 5i', porQue: 'Revisa los términos con i: −2i + 3i = i.' },
      ],
      correcta: 'a',
      calcular: () => cod(mul([2, 1], [3, -1])),
      pasos: [
        'Distribuimos: 2 · 3 + 2 · (−i) + i · 3 + i · (−i) = 6 − 2i + 3i − i².',
        'Como i² = −1, −i² = +1.',
        '6 + 1 + i = 7 + i.',
      ],
      pista: 'Multiplica cada término por cada término y reemplaza i² por −1.',
    },
    {
      id: 'z4-05',
      habilidad: 'Conjugado',
      enunciado: '¿Cuál es el conjugado de 4 − 7i?',
      opciones: [
        { id: 'a', valor: cod([-4, 7]), texto: '−4 + 7i', porQue: 'Ese es el opuesto; el conjugado conserva la parte real.' },
        { id: 'b', valor: cod([4, 7]), texto: '4 + 7i' },
        { id: 'c', valor: cod([-4, -7]), texto: '−4 − 7i', porQue: 'El conjugado solo cambia el signo de la parte imaginaria.' },
        { id: 'd', valor: cod([7, -4]), texto: '7 − 4i', porQue: 'No se intercambian las partes: solo cambia el signo de la imaginaria.' },
      ],
      correcta: 'b',
      calcular: () => cod([4, -(-7)]),
      pasos: [
        'El conjugado de a + bi es a − bi.',
        'Se mantiene la parte real (4) y cambia el signo de la imaginaria.',
        'Conjugado: 4 + 7i.',
      ],
      pista: 'El conjugado mantiene la parte real y cambia el signo de la parte imaginaria.',
    },
    {
      // valor: el módulo
      id: 'z4-06',
      habilidad: 'Módulo',
      enunciado: '¿Cuál es el módulo del número complejo 6 + 8i?',
      opciones: [
        { id: 'a', valor: 14, porQue: 'Sumaste 6 + 8; el módulo es √(6² + 8²).' },
        { id: 'b', valor: 100, porQue: 'Ese es el módulo al cuadrado; falta sacar la raíz.' },
        { id: 'c', valor: 2, porQue: 'No se restan las partes: el módulo se calcula con Pitágoras.' },
        { id: 'd', valor: 10 },
      ],
      correcta: 'd',
      calcular: () => Math.hypot(6, 8),
      pasos: [
        '|a + bi| = √(a² + b²).',
        '√(6² + 8²) = √(36 + 64) = √100.',
        '|6 + 8i| = 10.',
      ],
      pista: 'Usa Pitágoras con la parte real y la parte imaginaria.',
    },
    {
      // valor: parte imaginaria de la solución con signo positivo (30 y 0 marcan otras respuestas)
      id: 'z4-07',
      habilidad: 'Ecuaciones con soluciones complejas',
      enunciado: 'Resuelve en los números complejos:',
      expresion: 'x² + 9 = 0',
      opciones: [
        { id: 'a', valor: 30, texto: 'x = 3 y x = −3', porQue: 'Esos números al cuadrado dan 9, no −9.' },
        { id: 'b', valor: 9, texto: 'x = 9i y x = −9i', porQue: 'Falta la raíz: √(−9) = 3i.' },
        { id: 'c', valor: 3, texto: 'x = 3i y x = −3i' },
        { id: 'd', valor: 0, texto: 'No tiene solución', porQue: 'No tiene soluciones reales, pero sí dos complejas.' },
      ],
      correcta: 'c',
      calcular: () => Math.sqrt(9),
      pasos: [
        'Despejamos: x² = −9.',
        'x = ±√(−9) = ±√9 · √(−1).',
        'x = 3i o x = −3i.',
      ],
      pista: 'Despeja x² y recuerda que √(−1) = i.',
    },
    {
      id: 'z4-08',
      habilidad: 'Fórmula general con Δ < 0',
      enunciado: 'Resuelve con la fórmula general:',
      expresion: 'x² − 4x + 13 = 0',
      opciones: [
        { id: 'a', valor: cod([-2, 3]), texto: 'x = −2 ± 3i', porQue: 'La fórmula usa −b = −(−4) = 4, así que la parte real es positiva.' },
        { id: 'b', valor: cod([2, 3]), texto: 'x = 2 ± 3i' },
        { id: 'c', valor: cod([2, 6]), texto: 'x = 2 ± 6i', porQue: 'Falta dividir √(−36) = 6i por 2a = 2.' },
        { id: 'd', valor: cod([4, 6]), texto: 'x = 4 ± 6i', porQue: 'Falta dividir todo por 2a = 2.' },
      ],
      correcta: 'b',
      calcular: () => {
        const disc = (-4) ** 2 - 4 * 1 * 13;
        return cod([4 / 2, Math.sqrt(-disc) / 2]);
      },
      pasos: [
        'Δ = (−4)² − 4 · 1 · 13 = 16 − 52 = −36, y √(−36) = 6i.',
        'x = (4 ± 6i) / 2.',
        'x = 2 ± 3i.',
      ],
      pista: 'Calcula el discriminante; si es negativo, su raíz es un número imaginario.',
    },
  ],
};
