import { Mission } from '../types';

/**
 * Misión 1.º medio — Sistemas de ecuaciones lineales.
 * Métodos de resolución, comprobación de soluciones y problemas.
 */
export const misionSistemas1m: Mission = {
  id: 'sistemas-1m',
  titulo: 'Sistemas de ecuaciones',
  nivel: '1.º medio',
  unidad: 'Unidad 2 · Álgebra',
  corazonesIniciales: 3,
  xpPorCorrecta: 10,
  xpBonoCompletar: 20,
  preguntas: [
    {
      id: 's1-01',
      habilidad: 'Método de reducción',
      enunciado: 'Resuelve el sistema x + y = 10 y x − y = 4. ¿Cuánto vale x?',
      opciones: [
        { id: 'a', valor: 7 },
        { id: 'b', valor: 3, porQue: '3 es el valor de y. Se pregunta por x.' },
        { id: 'c', valor: 14, porQue: '14 es 2x (la suma de las ecuaciones). Falta dividir por 2.' },
        { id: 'd', valor: 6, porQue: '10 − 4 = 6 es 2y, no x.' },
      ],
      correcta: 'a',
      calcular: () => (10 + 4) / 2,
      pasos: [
        'Sumamos las dos ecuaciones: (x + y) + (x − y) = 10 + 4.',
        'Las y se anulan: 2x = 14.',
        'x = 7 (y entonces y = 3).',
      ],
      pista: 'Suma las dos ecuaciones: ¿qué pasa con la y?',
    },
    {
      id: 's1-02',
      habilidad: 'Sustitución directa',
      enunciado: 'Si x = 3 y 2x + y = 11, ¿cuánto vale y?',
      opciones: [
        { id: 'a', valor: 8, porQue: 'Restaste 11 − 3, pero en la ecuación aparece 2x = 6.' },
        { id: 'b', valor: 5 },
        { id: 'c', valor: 17, porQue: 'Sumaste 6. Hay que despejar: y = 11 − 6.' },
        { id: 'd', valor: 3, porQue: '3 es el valor de x. Se pregunta por y.' },
      ],
      correcta: 'b',
      calcular: () => 11 - 2 * 3,
      pasos: [
        'Reemplazamos x = 3: 2 · 3 + y = 11.',
        '6 + y = 11.',
        'y = 11 − 6 = 5.',
      ],
      pista: 'Reemplaza x por 3 y despeja y.',
    },
    {
      id: 's1-03',
      habilidad: 'Método de sustitución',
      enunciado: 'Resuelve el sistema y = 2x y x + y = 15. ¿Cuánto vale y?',
      opciones: [
        { id: 'a', valor: 5, porQue: '5 es el valor de x. Se pregunta por y.' },
        { id: 'b', valor: 7.5, porQue: 'y no es la mitad de 15: es el doble de x.' },
        { id: 'c', valor: 10 },
        { id: 'd', valor: 30, porQue: 'Multiplicaste 15 · 2. Reemplaza y = 2x en la segunda ecuación.' },
      ],
      correcta: 'c',
      calcular: () => 2 * (15 / 3),
      pasos: [
        'Reemplazamos y = 2x en x + y = 15: x + 2x = 15.',
        '3x = 15, entonces x = 5.',
        'y = 2 · 5 = 10.',
      ],
      pista: 'Reemplaza y = 2x en la segunda ecuación.',
    },
    {
      // valor: suma de los errores |x + 2y − 8| + |3x − y − 3| (0 = es solución)
      id: 's1-04',
      habilidad: 'Comprobar soluciones',
      enunciado: '¿Qué par (x, y) es solución del sistema x + 2y = 8 y 3x − y = 3?',
      opciones: [
        { id: 'a', valor: Math.abs(3 + 4 - 8) + Math.abs(9 - 2 - 3), texto: '(3, 2)', porQue: 'No cumple la primera ecuación: 3 + 2 · 2 = 7, no 8.' },
        { id: 'b', valor: Math.abs(4 + 4 - 8) + Math.abs(12 - 2 - 3), texto: '(4, 2)', porQue: 'Cumple la primera (4 + 4 = 8), pero no la segunda: 12 − 2 = 10, no 3.' },
        { id: 'c', valor: Math.abs(2 + 2 - 8) + Math.abs(6 - 1 - 3), texto: '(2, 1)', porQue: 'No cumple la primera ecuación: 2 + 2 · 1 = 4, no 8.' },
        { id: 'd', valor: 0, texto: '(2, 3)' },
      ],
      correcta: 'd',
      calcular: () => Math.abs(2 + 2 * 3 - 8) + Math.abs(3 * 2 - 3 - 3),
      pasos: [
        'Una solución debe cumplir las dos ecuaciones a la vez.',
        'Con (2, 3): 2 + 2 · 3 = 8 ✓.',
        'Y 3 · 2 − 3 = 3 ✓. Es la solución.',
      ],
      pista: 'Reemplaza cada par en las dos ecuaciones.',
    },
    {
      id: 's1-05',
      habilidad: 'Plantear un sistema',
      enunciado: 'En un curso hay 32 estudiantes y hay 6 mujeres más que hombres. ¿Cuántas mujeres hay?',
      opciones: [
        { id: 'a', valor: 13, porQue: '13 es la cantidad de hombres.' },
        { id: 'b', valor: 19 },
        { id: 'c', valor: 16, porQue: 'Repartiste en partes iguales, pero hay 6 mujeres más.' },
        { id: 'd', valor: 26, porQue: '32 − 6 = 26 es el doble de los hombres. Falta dividir y sumar 6.' },
      ],
      correcta: 'b',
      calcular: () => (32 + 6) / 2,
      pasos: [
        'Planteamos: m + h = 32 y m − h = 6.',
        'Sumando: 2m = 38.',
        'm = 19 mujeres (y 13 hombres).',
      ],
      pista: 'Plantea una ecuación para el total y otra para la diferencia.',
    },
    {
      id: 's1-06',
      habilidad: 'Problemas con sistemas',
      enunciado: 'En una granja hay gallinas y conejos. En total hay 10 cabezas y 32 patas. ¿Cuántos conejos hay?',
      opciones: [
        { id: 'a', valor: 4, porQue: '4 es la cantidad de gallinas.' },
        { id: 'b', valor: 8, porQue: '32 : 4 = 8 supone que todos son conejos. Hay que usar también las cabezas.' },
        { id: 'c', valor: 6 },
        { id: 'd', valor: 16, porQue: '32 : 2 = 16 supone que todos son gallinas.' },
      ],
      correcta: 'c',
      calcular: () => (32 - 2 * 10) / 2,
      pasos: [
        'Planteamos: g + c = 10 y 2g + 4c = 32.',
        'Multiplicamos la primera por 2 y restamos: 2c = 12.',
        'c = 6 conejos (y 4 gallinas).',
      ],
      pista: 'Plantea una ecuación para las cabezas y otra para las patas.',
    },
    {
      id: 's1-07',
      habilidad: 'Sistemas en contexto',
      enunciado: '2 cuadernos y 1 lápiz cuestan $2.500. 1 cuaderno y 1 lápiz cuestan $1.600. ¿Cuánto cuesta un cuaderno?',
      prefijo: '$',
      opciones: [
        { id: 'a', valor: 900 },
        { id: 'b', valor: 700, porQue: '$700 es el precio del lápiz.' },
        { id: 'c', valor: 1250, porQue: 'Dividiste $2.500 en 2, pero ese total incluye un lápiz.' },
        { id: 'd', valor: 4100, porQue: 'Sumaste las compras. Restándolas se elimina el lápiz.' },
      ],
      correcta: 'a',
      calcular: () => 2500 - 1600,
      pasos: [
        'Restamos las compras: (2c + l) − (c + l) = 2.500 − 1.600.',
        'El lápiz se elimina: c = 900.',
        'Un cuaderno cuesta $900 (y el lápiz $700).',
      ],
      pista: 'Compara las dos compras: ¿en qué se diferencian?',
    },
    {
      id: 's1-08',
      habilidad: 'Intersección de rectas',
      enunciado: 'Las rectas y = 2x + 1 e y = −x + 7 se cortan en un punto. ¿Cuál es su coordenada x?',
      opciones: [
        { id: 'a', valor: 6, porQue: '6 es 3x. Falta dividir por 3.' },
        { id: 'b', valor: 5, porQue: '5 es la coordenada y del punto de corte.' },
        { id: 'c', valor: 8 / 3, texto: '8/3', porQue: 'Al pasar el 1 al otro lado se resta: 7 − 1 = 6.' },
        { id: 'd', valor: 2 },
      ],
      correcta: 'd',
      calcular: () => (7 - 1) / (2 + 1),
      pasos: [
        'En el punto de corte, las y son iguales: 2x + 1 = −x + 7.',
        '3x = 6.',
        'x = 2 (y y = 5).',
      ],
      pista: 'Iguala las dos expresiones de y.',
    },
  ],
};
