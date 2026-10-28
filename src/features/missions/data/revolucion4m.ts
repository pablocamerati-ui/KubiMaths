import { Mission } from '../types';

/**
 * Misión 4.º medio — Cuerpos de revolución.
 * Volumen y área de cilindro, cono y esfera; cuerpos generados al rotar
 * figuras planas y razones de volumen. `valor` es la medida real (con π).
 */
const PI = Math.PI;

export const misionRevolucion4m: Mission = {
  id: 'revolucion-4m',
  titulo: 'Cuerpos de revolución',
  nivel: '4.º medio',
  unidad: 'Unidad 3 · Geometría',
  corazonesIniciales: 3,
  xpPorCorrecta: 10,
  xpBonoCompletar: 20,
  preguntas: [
    {
      id: 'r4-01',
      habilidad: 'Volumen del cilindro',
      enunciado: '¿Cuál es el volumen de un cilindro de radio 3 cm y altura 5 cm?',
      opciones: [
        { id: 'a', valor: 15 * PI, texto: '15π cm³', porQue: 'Ese sería el volumen de un cono; el cilindro no se divide por 3.' },
        { id: 'b', valor: 30 * PI, texto: '30π cm³', porQue: '2πrh es el área lateral, no el volumen.' },
        { id: 'c', valor: 45 * PI, texto: '45π cm³' },
        { id: 'd', valor: 75 * PI, texto: '75π cm³', porQue: 'Intercambiaste radio y altura: es π · r² · h.' },
      ],
      correcta: 'c',
      calcular: () => PI * 3 ** 2 * 5,
      pasos: [
        'V = π · r² · h.',
        'V = π · 9 · 5.',
        'V = 45π cm³.',
      ],
      pista: 'Multiplica el área de la base circular por la altura.',
    },
    {
      id: 'r4-02',
      habilidad: 'Volumen del cono',
      enunciado: '¿Cuál es el volumen de un cono de radio 4 cm y altura 6 cm?',
      opciones: [
        { id: 'a', valor: 32 * PI, texto: '32π cm³' },
        { id: 'b', valor: 96 * PI, texto: '96π cm³', porQue: 'Falta dividir por 3: el cono es un tercio del cilindro.' },
        { id: 'c', valor: 16 * PI, texto: '16π cm³', porQue: 'Ese es solo el área de la base; falta multiplicar por la altura y dividir por 3.' },
        { id: 'd', valor: 8 * PI, texto: '8π cm³', porQue: 'Falta elevar el radio al cuadrado.' },
      ],
      correcta: 'a',
      calcular: () => (PI * 4 ** 2 * 6) / 3,
      pasos: [
        'V = π · r² · h / 3.',
        'V = π · 16 · 6 / 3.',
        'V = 32π cm³.',
      ],
      pista: 'El cono tiene un tercio del volumen del cilindro con la misma base y altura.',
    },
    {
      id: 'r4-03',
      habilidad: 'Volumen de la esfera',
      enunciado: '¿Cuál es el volumen de una esfera de radio 3 cm?',
      opciones: [
        { id: 'a', valor: 108 * PI, texto: '108π cm³', porQue: 'Falta el 1/3 de la fórmula: V = 4/3 · π · r³.' },
        { id: 'b', valor: 12 * PI, texto: '12π cm³', porQue: 'El radio va al cubo, no al cuadrado.' },
        { id: 'c', valor: 36, texto: '36 cm³', porQue: 'Falta el factor π.' },
        { id: 'd', valor: 36 * PI, texto: '36π cm³' },
      ],
      correcta: 'd',
      calcular: () => (4 / 3) * PI * 3 ** 3,
      pasos: [
        'V = 4/3 · π · r³.',
        'V = 4/3 · π · 27.',
        'V = 36π cm³.',
      ],
      pista: 'Usa la fórmula del volumen de la esfera; el radio va al cubo.',
    },
    {
      id: 'r4-04',
      habilidad: 'Rotar un rectángulo',
      enunciado: 'Un rectángulo de 2 cm × 5 cm gira en torno a su lado de 5 cm. ¿Cuál es el volumen del cuerpo que se forma?',
      opciones: [
        { id: 'a', valor: 50 * PI, texto: '50π cm³', porQue: 'Si gira en torno al lado de 5 cm, ese lado es la altura y el radio es 2 cm.' },
        { id: 'b', valor: 20 * PI, texto: '20π cm³' },
        { id: 'c', valor: 10 * PI, texto: '10π cm³', porQue: 'Falta elevar el radio al cuadrado.' },
        { id: 'd', valor: (20 * PI) / 3, texto: '20π/3 cm³', porQue: 'Al girar un rectángulo se forma un cilindro, no un cono.' },
      ],
      correcta: 'b',
      calcular: () => PI * 2 ** 2 * 5,
      pasos: [
        'Se forma un cilindro: el eje (5 cm) es la altura y el otro lado (2 cm) es el radio.',
        'V = π · 2² · 5.',
        'V = 20π cm³.',
      ],
      pista: 'El lado que hace de eje es la altura; el otro lado es el radio.',
    },
    {
      id: 'r4-05',
      habilidad: 'Rotar un triángulo',
      enunciado: 'Un triángulo rectángulo de catetos 3 cm y 4 cm gira en torno al cateto de 4 cm. ¿Cuál es el volumen del cuerpo que se forma?',
      opciones: [
        { id: 'a', valor: 16 * PI, texto: '16π cm³', porQue: 'El eje es el cateto de 4 cm: esa es la altura y el radio es 3 cm.' },
        { id: 'b', valor: 36 * PI, texto: '36π cm³', porQue: 'Falta dividir por 3: al girar un triángulo se forma un cono.' },
        { id: 'c', valor: 12 * PI, texto: '12π cm³' },
        { id: 'd', valor: 6 * PI, texto: '6π cm³', porQue: 'No se usa el área del triángulo: V = π · r² · h / 3.' },
      ],
      correcta: 'c',
      calcular: () => (PI * 3 ** 2 * 4) / 3,
      pasos: [
        'Se forma un cono de altura 4 cm (el eje) y radio 3 cm.',
        'V = π · 3² · 4 / 3.',
        'V = 12π cm³.',
      ],
      pista: 'Identifica qué figura se forma y cuál cateto es la altura.',
    },
    {
      id: 'r4-06',
      habilidad: 'Área de la esfera',
      enunciado: '¿Cuál es el área de la superficie de una esfera de radio 5 cm?',
      opciones: [
        { id: 'a', valor: 25 * PI, texto: '25π cm²', porQue: 'Ese es el área de un círculo máximo; la esfera tiene 4 veces esa área.' },
        { id: 'b', valor: (500 * PI) / 3, texto: '500π/3 cm³', porQue: 'Esa es la fórmula del volumen, no del área.' },
        { id: 'c', valor: 20 * PI, texto: '20π cm²', porQue: 'El radio va al cuadrado: 4π · 5².' },
        { id: 'd', valor: 100 * PI, texto: '100π cm²' },
      ],
      correcta: 'd',
      calcular: () => 4 * PI * 5 ** 2,
      pasos: [
        'A = 4 · π · r².',
        'A = 4 · π · 25.',
        'A = 100π cm².',
      ],
      pista: 'El área de la esfera equivale a cuatro círculos de su mismo radio.',
    },
    {
      id: 'r4-07',
      habilidad: 'Razón entre volúmenes',
      enunciado: 'Un cono y un cilindro tienen la misma base y la misma altura. ¿Qué fracción del volumen del cilindro es el volumen del cono?',
      opciones: [
        { id: 'a', valor: 1 / 2, texto: '1/2', porQue: 'Compara las fórmulas: el cono tiene el factor 1/3.' },
        { id: 'b', valor: 1 / 3, texto: '1/3' },
        { id: 'c', valor: 2 / 3, texto: '2/3', porQue: '2/3 es la razón entre la esfera y el cilindro que la contiene.' },
        { id: 'd', valor: 3, texto: '3', porQue: 'Invertiste la razón: el cono es más pequeño que el cilindro.' },
      ],
      correcta: 'b',
      calcular: () => (PI * 1 * 1) / 3 / (PI * 1 * 1),
      pasos: [
        'Cilindro: π · r² · h. Cono: π · r² · h / 3.',
        'Dividimos: (π r² h / 3) / (π r² h).',
        'El cono es 1/3 del cilindro.',
      ],
      pista: 'Compara las fórmulas del cono y del cilindro con los mismos r y h.',
    },
    {
      id: 'r4-08',
      habilidad: 'Cambio de escala',
      enunciado: 'Si el radio de una esfera se duplica, ¿por cuánto se multiplica su volumen?',
      opciones: [
        { id: 'a', valor: 8 },
        { id: 'b', valor: 2, porQue: 'El volumen depende del radio al cubo, no del radio.' },
        { id: 'c', valor: 4, porQue: '2² = 4 corresponde al área, no al volumen.' },
        { id: 'd', valor: 6, porQue: '2³ no es 2 · 3.' },
      ],
      correcta: 'a',
      calcular: () => (4 / 3) * PI * 2 ** 3 / ((4 / 3) * PI * 1 ** 3),
      pasos: [
        'Con radio 2r: V = 4/3 · π · (2r)³ = 4/3 · π · 8r³.',
        'Comparado con 4/3 · π · r³, es 8 veces mayor.',
        'El volumen se multiplica por 8.',
      ],
      pista: 'Reemplaza el radio por el doble en la fórmula del volumen.',
    },
  ],
};
