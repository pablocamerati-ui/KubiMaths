import { Mission } from '../types';

/**
 * Misión 8.º básico — Potencias y raíces.
 * Potencias de base y exponente natural, propiedades, raíz cuadrada y
 * estimación de raíces.
 */
export const misionPotencias8b: Mission = {
  id: 'potencias-8b',
  titulo: 'Potencias y raíces',
  nivel: '8.º básico',
  unidad: 'Unidad 1 · Números',
  corazonesIniciales: 3,
  xpPorCorrecta: 10,
  xpBonoCompletar: 20,
  preguntas: [
    {
      id: 'w8-01',
      habilidad: 'Valor de una potencia',
      enunciado: 'Calcula el valor de la potencia:',
      expresion: '2⁵',
      opciones: [
        { id: 'a', valor: 10, porQue: 'Multiplicaste la base por el exponente (2 · 5). La potencia es 2 · 2 · 2 · 2 · 2.' },
        { id: 'b', valor: 32 },
        { id: 'c', valor: 25, porQue: '25 es 5². Aquí la base es 2 y el exponente es 5.' },
        { id: 'd', valor: 7, porQue: 'Sumaste base y exponente. La potencia es una multiplicación repetida.' },
      ],
      correcta: 'b',
      calcular: () => 2 ** 5,
      pasos: [
        '2⁵ significa multiplicar el 2 por sí mismo cinco veces.',
        '2 · 2 · 2 · 2 · 2.',
        '= 32.',
      ],
      pista: 'Multiplica el 2 por sí mismo cinco veces.',
    },
    {
      id: 'w8-02',
      habilidad: 'Multiplicación de potencias',
      enunciado: 'Escribe como una sola potencia:',
      expresion: '3² · 3³',
      opciones: [
        { id: 'a', valor: 3 ** 5, texto: '3⁵' },
        { id: 'b', valor: 3 ** 6, texto: '3⁶', porQue: 'Multiplicaste los exponentes. Al multiplicar potencias de igual base, los exponentes se suman.' },
        { id: 'c', valor: 9 ** 5, texto: '9⁵', porQue: 'La base se conserva: no se multiplican las bases.' },
        { id: 'd', valor: 9 ** 6, texto: '9⁶', porQue: 'La base se conserva y los exponentes se suman: 2 + 3.' },
      ],
      correcta: 'a',
      calcular: () => 3 ** 2 * 3 ** 3,
      pasos: [
        'Las dos potencias tienen la misma base: 3.',
        'Al multiplicarlas, se conserva la base y se suman los exponentes: 2 + 3 = 5.',
        '3² · 3³ = 3⁵.',
      ],
      pista: 'Al multiplicar potencias de igual base, ¿qué se hace con los exponentes?',
    },
    {
      id: 'w8-03',
      habilidad: 'División de potencias',
      enunciado: 'Escribe como una sola potencia:',
      expresion: '5⁶ : 5⁴',
      opciones: [
        { id: 'a', valor: 5 ** 10, texto: '5¹⁰', porQue: 'Sumaste los exponentes. Al dividir potencias de igual base, los exponentes se restan.' },
        { id: 'b', valor: 1, texto: '1²', porQue: 'Dividiste las bases. La base se conserva: 5.' },
        { id: 'c', valor: 5 ** 2, texto: '5²' },
        { id: 'd', valor: 5 ** -2, texto: '5⁻²', porQue: 'Restaste al revés. Es el exponente del dividendo menos el del divisor: 6 − 4.' },
      ],
      correcta: 'c',
      calcular: () => 5 ** 6 / 5 ** 4,
      pasos: [
        'Las dos potencias tienen base 5.',
        'Al dividirlas, se conserva la base y se restan los exponentes: 6 − 4 = 2.',
        '5⁶ : 5⁴ = 5².',
      ],
      pista: 'Al dividir potencias de igual base, ¿qué se hace con los exponentes?',
    },
    {
      id: 'w8-04',
      habilidad: 'Raíz cuadrada',
      enunciado: 'Calcula la raíz cuadrada:',
      expresion: '√81',
      opciones: [
        { id: 'a', valor: 40.5, porQue: 'La raíz cuadrada no es la mitad del número.' },
        { id: 'b', valor: 3, porQue: '3 · 3 = 9, no 81.' },
        { id: 'c', valor: 6561, porQue: 'Elevaste al cuadrado. La raíz es la operación inversa.' },
        { id: 'd', valor: 9 },
      ],
      correcta: 'd',
      calcular: () => Math.sqrt(81),
      pasos: [
        'Buscamos un número que, multiplicado por sí mismo, dé 81.',
        '9 · 9 = 81.',
        'Por lo tanto, √81 = 9.',
      ],
      pista: '¿Qué número multiplicado por sí mismo da 81?',
    },
    {
      // valor: el entero menor del intervalo
      id: 'w8-05',
      habilidad: 'Estimación de raíces',
      enunciado: '¿Entre qué números enteros consecutivos está √50?',
      expresion: '√50',
      opciones: [
        { id: 'a', valor: 6, texto: '6 y 7', porQue: '6² = 36 y 7² = 49: ambos son menores que 50.' },
        { id: 'b', valor: 7, texto: '7 y 8' },
        { id: 'c', valor: 24, texto: '24 y 26', porQue: 'Tomaste la mitad de 50. La raíz cuadrada no es la mitad.' },
        { id: 'd', valor: 49, texto: '49 y 51', porQue: 'Esos números rodean a 50, pero se pide entre qué enteros está su raíz.' },
      ],
      correcta: 'b',
      calcular: () => Math.floor(Math.sqrt(50)),
      pasos: [
        'Buscamos los cuadrados perfectos más cercanos a 50.',
        '7² = 49 y 8² = 64, y 49 < 50 < 64.',
        'Entonces √50 está entre 7 y 8 (muy cerca de 7).',
      ],
      pista: 'Busca los cuadrados perfectos más cercanos a 50.',
    },
    {
      id: 'w8-06',
      habilidad: 'Potencias en geometría',
      enunciado: '¿Cuál es el área de un cuadrado de 12 cm de lado?',
      unidad: 'cm²',
      opciones: [
        { id: 'a', valor: 144 },
        { id: 'b', valor: 48, porQue: '48 cm es el perímetro (4 · 12). El área es lado al cuadrado.' },
        { id: 'c', valor: 24, porQue: 'Multiplicaste por 2. El área es 12 · 12 = 12².' },
        { id: 'd', valor: 1728, porQue: 'Calculaste 12³, que es el volumen de un cubo. El área del cuadrado es 12².' },
      ],
      correcta: 'a',
      calcular: () => 12 ** 2,
      pasos: [
        'Área del cuadrado = lado · lado = lado².',
        '12² = 12 · 12.',
        '= 144 cm².',
      ],
      pista: 'El área de un cuadrado es su lado elevado al cuadrado.',
    },
    {
      id: 'w8-07',
      habilidad: 'Raíz cuadrada en contexto',
      enunciado: 'Un terreno cuadrado tiene un área de 225 m². ¿Cuánto mide su lado?',
      unidad: 'm',
      opciones: [
        { id: 'a', valor: 112.5, porQue: 'La raíz cuadrada no es la mitad. Busca un número que multiplicado por sí mismo dé 225.' },
        { id: 'b', valor: 56.25, porQue: 'Dividiste por 4, como si 225 fuera el perímetro. Es el área.' },
        { id: 'c', valor: 15 },
        { id: 'd', valor: 50625, porQue: 'Elevaste al cuadrado. Para obtener el lado desde el área se saca la raíz.' },
      ],
      correcta: 'c',
      calcular: () => Math.sqrt(225),
      pasos: [
        'Si el área es lado², el lado es la raíz cuadrada del área.',
        'Buscamos √225: 15 · 15 = 225.',
        'El lado mide 15 m.',
      ],
      pista: '¿Qué número multiplicado por sí mismo da 225?',
    },
    {
      id: 'w8-08',
      habilidad: 'Potencia de una potencia',
      enunciado: 'Escribe como una sola potencia:',
      expresion: '(2³)²',
      opciones: [
        { id: 'a', valor: 2 ** 5, texto: '2⁵', porQue: 'Sumaste los exponentes. En una potencia de potencia, los exponentes se multiplican.' },
        { id: 'b', valor: 2 ** 9, texto: '2⁹', porQue: 'Elevaste el 3 al cuadrado. Los exponentes se multiplican: 3 · 2.' },
        { id: 'c', valor: 4 ** 6, texto: '4⁶', porQue: 'La base se conserva: solo cambian los exponentes.' },
        { id: 'd', valor: 2 ** 6, texto: '2⁶' },
      ],
      correcta: 'd',
      calcular: () => (2 ** 3) ** 2,
      pasos: [
        '(2³)² = 2³ · 2³.',
        'Se conserva la base y se multiplican los exponentes: 3 · 2 = 6.',
        '(2³)² = 2⁶.',
      ],
      pista: 'En una potencia de una potencia, ¿qué pasa con los exponentes?',
    },
  ],
};
