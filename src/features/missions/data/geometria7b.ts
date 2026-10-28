import { Mission } from '../types';

/** Valor de π que se usa en 7.º básico. */
const PI = 3.14;

/**
 * Misión 6 — Polígonos y áreas (7.º básico).
 * Áreas de rectángulos, triángulos, paralelogramos y trapecios; ángulos
 * interiores; perímetro y área del círculo con π ≈ 3,14.
 */
export const misionGeometria7b: Mission = {
  id: 'geometria-7b',
  titulo: 'Polígonos y áreas',
  nivel: '7.º básico',
  unidad: 'Unidad 3 · Geometría',
  corazonesIniciales: 3,
  xpPorCorrecta: 10,
  xpBonoCompletar: 20,
  preguntas: [
    {
      id: 'g7-01',
      habilidad: 'Área del rectángulo',
      enunciado: 'Un rectángulo mide 8 cm de largo y 5 cm de ancho. ¿Cuál es su área?',
      unidad: 'cm²',
      opciones: [
        { id: 'a', valor: 26, porQue: '26 cm es el perímetro (8 + 5 + 8 + 5). El área es largo por ancho.' },
        { id: 'b', valor: 40 },
        { id: 'c', valor: 13, porQue: 'Sumaste largo y ancho. El área se obtiene multiplicándolos.' },
        { id: 'd', valor: 80, porQue: 'Multiplicaste por 2 de más. El área del rectángulo es 8 · 5.' },
      ],
      correcta: 'b',
      calcular: () => 8 * 5,
      pasos: [
        'Área del rectángulo = largo · ancho.',
        '8 · 5 = 40.',
        'El área es 40 cm².',
      ],
      pista: 'El área del rectángulo es largo por ancho.',
    },
    {
      id: 'g7-02',
      habilidad: 'Área del triángulo',
      enunciado: 'Un triángulo tiene 10 cm de base y 6 cm de altura. ¿Cuál es su área?',
      unidad: 'cm²',
      opciones: [
        { id: 'a', valor: 60, porQue: 'Calculaste base por altura, pero el triángulo es la mitad de ese rectángulo: falta dividir por 2.' },
        { id: 'b', valor: 16, porQue: 'Sumaste base y altura. El área es (base · altura) : 2.' },
        { id: 'c', valor: 30 },
        { id: 'd', valor: 8, porQue: 'Sumaste y dividiste por 2. Hay que multiplicar base por altura antes de dividir.' },
      ],
      correcta: 'c',
      calcular: () => (10 * 6) / 2,
      pasos: [
        'Área del triángulo = (base · altura) : 2.',
        '10 · 6 = 60.',
        '60 : 2 = 30. El área es 30 cm².',
      ],
      pista: 'Un triángulo es la mitad de un rectángulo con la misma base y altura.',
    },
    {
      id: 'g7-03',
      habilidad: 'Ángulos interiores del triángulo',
      enunciado: 'Dos ángulos de un triángulo miden 50° y 70°. ¿Cuánto mide el tercero?',
      unidad: '°',
      opciones: [
        { id: 'a', valor: 120, porQue: '120° es la suma de los dos ángulos que ya conoces. Falta restarla a 180°.' },
        { id: 'b', valor: 60 },
        { id: 'c', valor: 240, porQue: 'Usaste 360°, que es la suma de los ángulos de un cuadrilátero. En un triángulo suman 180°.' },
        { id: 'd', valor: 20, porQue: 'Restaste 70 − 50. Los tres ángulos deben sumar 180°.' },
      ],
      correcta: 'b',
      calcular: () => 180 - (50 + 70),
      pasos: [
        'Los ángulos interiores de un triángulo suman 180°.',
        '50° + 70° = 120°.',
        '180° − 120° = 60°.',
      ],
      pista: 'Los tres ángulos de un triángulo suman 180°.',
    },
    {
      id: 'g7-04',
      habilidad: 'Área del paralelogramo',
      enunciado: 'Un paralelogramo tiene 9 cm de base y 4 cm de altura. ¿Cuál es su área?',
      unidad: 'cm²',
      opciones: [
        { id: 'a', valor: 36 },
        { id: 'b', valor: 26, porQue: '26 es 2 · (9 + 4), una fórmula de perímetro. El área es base por altura.' },
        { id: 'c', valor: 18, porQue: 'Dividiste por 2, pero eso corresponde al triángulo. El paralelogramo es base · altura.' },
        { id: 'd', valor: 13, porQue: 'Sumaste base y altura. Hay que multiplicarlas.' },
      ],
      correcta: 'a',
      calcular: () => 9 * 4,
      pasos: [
        'Un paralelogramo se puede transformar en un rectángulo con la misma base y altura.',
        'Área = base · altura = 9 · 4.',
        'El área es 36 cm².',
      ],
      pista: 'Recorta un triángulo de un lado y muévelo al otro: ¿qué figura queda?',
    },
    {
      id: 'g7-05',
      habilidad: 'Ángulos interiores del cuadrilátero',
      enunciado: '¿Cuánto suman los ángulos interiores de cualquier cuadrilátero?',
      unidad: '°',
      opciones: [
        { id: 'a', valor: 180, porQue: '180° es la suma en un triángulo. Un cuadrilátero se divide en dos triángulos.' },
        { id: 'b', valor: 540, porQue: '540° corresponde a un pentágono (tres triángulos).' },
        { id: 'c', valor: 90, porQue: '90° mide cada ángulo de un rectángulo, pero se pide la suma de los cuatro.' },
        { id: 'd', valor: 360 },
      ],
      correcta: 'd',
      calcular: () => 2 * 180,
      pasos: [
        'Una diagonal divide el cuadrilátero en dos triángulos.',
        'Cada triángulo suma 180°.',
        '2 · 180° = 360°.',
      ],
      pista: 'Traza una diagonal: ¿en cuántos triángulos queda dividido?',
    },
    {
      id: 'g7-06',
      habilidad: 'Área del trapecio',
      enunciado: 'Un trapecio tiene bases de 6 cm y 10 cm, y una altura de 4 cm. ¿Cuál es su área?',
      unidad: 'cm²',
      opciones: [
        { id: 'a', valor: 64, porQue: 'Faltó dividir por 2: el área es (6 + 10) · 4 : 2.' },
        { id: 'b', valor: 20, porQue: 'Sumaste todas las medidas. Hay que sumar las bases, multiplicar por la altura y dividir por 2.' },
        { id: 'c', valor: 32 },
        { id: 'd', valor: 240, porQue: 'Multiplicaste las tres medidas. Las bases se suman antes de multiplicar.' },
      ],
      correcta: 'c',
      calcular: () => ((6 + 10) * 4) / 2,
      pasos: [
        'Área del trapecio = (base mayor + base menor) · altura : 2.',
        '(6 + 10) · 4 = 16 · 4 = 64.',
        '64 : 2 = 32. El área es 32 cm².',
      ],
      pista: 'Promedia las dos bases y multiplica por la altura.',
    },
    {
      id: 'g7-07',
      habilidad: 'Perímetro del círculo',
      enunciado: 'Calcula el perímetro de un círculo de radio 5 cm. Usa π ≈ 3,14.',
      unidad: 'cm',
      opciones: [
        { id: 'a', valor: 78.5, porQue: '78,5 es el área (π · r²). El perímetro es 2 · π · r.' },
        { id: 'b', valor: 15.7, porQue: 'Calculaste π · r. El perímetro usa el diámetro: 2 · π · r.' },
        { id: 'c', valor: 31.4 },
        { id: 'd', valor: 157, porQue: 'Revisa la coma: 2 · 3,14 · 5 = 31,4.' },
      ],
      correcta: 'c',
      calcular: () => 2 * PI * 5,
      pasos: [
        'Perímetro del círculo = 2 · π · r.',
        '2 · 3,14 · 5 = 3,14 · 10.',
        '= 31,4 cm.',
      ],
      pista: 'El perímetro es π por el diámetro (dos veces el radio).',
    },
    {
      id: 'g7-08',
      habilidad: 'Área del círculo',
      enunciado: 'Calcula el área de un círculo de radio 3 cm. Usa π ≈ 3,14.',
      unidad: 'cm²',
      opciones: [
        { id: 'a', valor: 18.84, porQue: '18,84 es el perímetro (2 · π · r). El área es π · r².' },
        { id: 'b', valor: 28.26 },
        { id: 'c', valor: 9.42, porQue: 'Calculaste π · r. En el área el radio va al cuadrado: π · r · r.' },
        { id: 'd', valor: 113.04, porQue: 'Usaste el diámetro al cuadrado. La fórmula usa el radio: π · 3².' },
      ],
      correcta: 'b',
      calcular: () => PI * 3 ** 2,
      pasos: [
        'Área del círculo = π · r².',
        'r² = 3 · 3 = 9.',
        '3,14 · 9 = 28,26 cm².',
      ],
      pista: 'El área es π por el radio al cuadrado.',
    },
  ],
};
