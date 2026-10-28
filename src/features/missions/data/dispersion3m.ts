import { Mission } from '../types';

/**
 * Misión 3.º medio — Medidas de dispersión.
 * Rango, desviación media, varianza, desviación estándar, rango
 * intercuartil y comparación de la dispersión de dos grupos.
 * Se usan la varianza y la desviación estándar poblacionales (se divide por n).
 */
const media = (xs: number[]) => xs.reduce((s, x) => s + x, 0) / xs.length;
const varianza = (xs: number[]) => {
  const m = media(xs);
  return xs.reduce((s, x) => s + (x - m) ** 2, 0) / xs.length;
};

export const misionDispersion3m: Mission = {
  id: 'dispersion-3m',
  titulo: 'Medidas de dispersión',
  nivel: '3.º medio',
  unidad: 'Unidad 4 · Probabilidad y estadística',
  corazonesIniciales: 3,
  xpPorCorrecta: 10,
  xpBonoCompletar: 20,
  preguntas: [
    {
      id: 'd3-01',
      habilidad: 'Rango',
      enunciado: 'Las notas de Matías fueron 4,5; 6,2; 3,8; 5,9 y 6,8. ¿Cuál es el rango?',
      opciones: [
        { id: 'a', valor: 6.8, porQue: 'Esa es la nota más alta. Falta restarle la más baja.' },
        { id: 'b', valor: 3 },
        { id: 'c', valor: 5.44, porQue: 'Ese es el promedio, no el rango.' },
        { id: 'd', valor: 0.6, porQue: 'Restaste las dos notas más altas. El rango es la mayor menos la menor.' },
      ],
      correcta: 'b',
      calcular: () => Math.max(4.5, 6.2, 3.8, 5.9, 6.8) - Math.min(4.5, 6.2, 3.8, 5.9, 6.8),
      pasos: [
        'Rango = dato mayor − dato menor.',
        'Mayor: 6,8. Menor: 3,8.',
        '6,8 − 3,8 = 3.',
      ],
      pista: 'Busca la nota más alta y la más baja.',
    },
    {
      id: 'd3-02',
      habilidad: 'Desviación media',
      enunciado: '¿Cuál es la desviación media de los datos 2, 4, 6 y 8?',
      opciones: [
        { id: 'a', valor: 5, porQue: 'Ese es el promedio. La desviación media es el promedio de las distancias al promedio.' },
        { id: 'b', valor: 0, porQue: 'Las desviaciones con signo siempre suman 0: hay que usar valor absoluto.' },
        { id: 'c', valor: 8, porQue: 'Esa es la suma de las distancias. Falta dividir por 4.' },
        { id: 'd', valor: 2 },
      ],
      correcta: 'd',
      calcular: () => [2, 4, 6, 8].reduce((s, x) => s + Math.abs(x - 5), 0) / 4,
      pasos: [
        'Promedio: (2 + 4 + 6 + 8) / 4 = 5.',
        'Distancias al promedio: 3, 1, 1 y 3; suman 8.',
        'Desviación media: 8 / 4 = 2.',
      ],
      pista: 'Calcula cuánto se aleja cada dato del promedio, sin signo, y promedia esas distancias.',
    },
    {
      id: 'd3-03',
      habilidad: 'Varianza',
      enunciado: '¿Cuál es la varianza de los datos 1, 3, 5 y 7?',
      opciones: [
        { id: 'a', valor: 5 },
        { id: 'b', valor: 20, porQue: 'Esa es la suma de los cuadrados. Falta dividir por la cantidad de datos.' },
        { id: 'c', valor: 2, porQue: 'Esa es la desviación media. La varianza usa los cuadrados de las distancias.' },
        { id: 'd', valor: Math.sqrt(5), texto: '≈ 2,24', porQue: 'Esa es la desviación estándar, que es la raíz de la varianza.' },
      ],
      correcta: 'a',
      calcular: () => varianza([1, 3, 5, 7]),
      pasos: [
        'Promedio: 16 / 4 = 4.',
        'Cuadrados de las distancias: 9, 1, 1 y 9; suman 20.',
        'Varianza: 20 / 4 = 5.',
      ],
      pista: 'Eleva al cuadrado la distancia de cada dato al promedio y promédialas.',
    },
    {
      id: 'd3-04',
      habilidad: 'Desviación estándar',
      enunciado: 'La varianza de los tiempos de un grupo de corredores es 16 s². ¿Cuál es la desviación estándar?',
      unidad: 's',
      opciones: [
        { id: 'a', valor: 8, porQue: 'Dividiste por 2. La desviación estándar es la raíz cuadrada de la varianza.' },
        { id: 'b', valor: 4 },
        { id: 'c', valor: 256, porQue: 'Elevaste al cuadrado. Se saca la raíz.' },
        { id: 'd', valor: 16, porQue: 'Esa es la varianza. Falta sacar la raíz cuadrada.' },
      ],
      correcta: 'b',
      calcular: () => Math.sqrt(16),
      pasos: [
        'Desviación estándar = √varianza.',
        '√16.',
        '= 4 s.',
      ],
      pista: 'La desviación estándar vuelve a las unidades de los datos.',
    },
    {
      id: 'd3-05',
      habilidad: 'Desviación estándar',
      enunciado: '¿Cuál es la desviación estándar de los datos 2, 4, 4, 4, 5, 5, 7 y 9?',
      opciones: [
        { id: 'a', valor: 4, porQue: 'Esa es la varianza. Falta sacar la raíz.' },
        { id: 'b', valor: 5, porQue: 'Ese es el promedio.' },
        { id: 'c', valor: 2 },
        { id: 'd', valor: 7, porQue: 'Ese es el rango (9 − 2).' },
      ],
      correcta: 'c',
      calcular: () => Math.sqrt(varianza([2, 4, 4, 4, 5, 5, 7, 9])),
      pasos: [
        'Promedio: 40 / 8 = 5.',
        'Cuadrados de las distancias: 9, 1, 1, 1, 0, 0, 4 y 16; suman 32. Varianza: 32 / 8 = 4.',
        'Desviación estándar: √4 = 2.',
      ],
      pista: 'Primero calcula la varianza y después saca su raíz cuadrada.',
    },
    {
      id: 'd3-06',
      habilidad: 'Rango intercuartil',
      enunciado: 'Datos ordenados: 3, 5, 7, 8, 10, 12, 14, 15. Usando la mediana de cada mitad como cuartil, ¿cuál es el rango intercuartil?',
      opciones: [
        { id: 'a', valor: 12, porQue: 'Ese es el rango (15 − 3), no el rango intercuartil.' },
        { id: 'b', valor: 9, porQue: 'Esa es la mediana de todos los datos.' },
        { id: 'c', valor: 13, porQue: 'Ese es el tercer cuartil. Falta restarle el primero.' },
        { id: 'd', valor: 7 },
      ],
      correcta: 'd',
      calcular: () => (12 + 14) / 2 - (5 + 7) / 2,
      pasos: [
        'Mitad inferior: 3, 5, 7, 8 → Q₁ = (5 + 7) / 2 = 6.',
        'Mitad superior: 10, 12, 14, 15 → Q₃ = (12 + 14) / 2 = 13.',
        'Rango intercuartil: Q₃ − Q₁ = 13 − 6 = 7.',
      ],
      pista: 'Separa los datos en dos mitades y busca la mediana de cada una.',
    },
    {
      // valor: 1 = curso A, 2 = curso B, 3 = iguales, 4 = no se puede saber
      id: 'd3-07',
      habilidad: 'Comparar la dispersión',
      enunciado: 'Dos cursos tienen el mismo promedio, 5,5. La desviación estándar del curso A es 0,8 y la del curso B es 1,5. ¿Qué curso tiene notas más parejas?',
      opciones: [
        { id: 'a', valor: 1, texto: 'El curso A' },
        { id: 'b', valor: 2, texto: 'El curso B', porQue: 'Una desviación estándar mayor indica notas más dispersas, no más parejas.' },
        { id: 'c', valor: 3, texto: 'Son igual de parejos', porQue: 'Tienen el mismo promedio, pero distinta dispersión.' },
        { id: 'd', valor: 4, texto: 'No se puede saber', porQue: 'La desviación estándar mide justamente qué tan parejos son los datos.' },
      ],
      correcta: 'a',
      calcular: () => (0.8 < 1.5 ? 1 : 2),
      pasos: [
        'La desviación estándar mide cuánto se alejan los datos del promedio.',
        'Menor desviación estándar: datos más cercanos al promedio.',
        '0,8 < 1,5, así que el curso A tiene notas más parejas.',
      ],
      pista: 'Piensa qué significa que la desviación estándar sea pequeña.',
    },
    {
      id: 'd3-08',
      habilidad: 'Propiedades de la dispersión',
      enunciado: 'La desviación estándar de las notas de una prueba es 1,2. Si el profesor le suma 0,5 a todas las notas, ¿cuál es la nueva desviación estándar?',
      opciones: [
        { id: 'a', valor: 1.7, porQue: 'Sumar lo mismo a todos mueve los datos, pero no cambia qué tan separados están.' },
        { id: 'b', valor: 1.2 },
        { id: 'c', valor: 0.6, porQue: 'Multiplicaste por 0,5. A las notas se les suma, no se les multiplica.' },
        { id: 'd', valor: 0.7, porQue: 'Restaste 0,5. Sumar lo mismo a todos no cambia la dispersión.' },
      ],
      correcta: 'b',
      calcular: () => Math.sqrt(varianza([4, 5, 6].map((x) => x * 1.2 * Math.sqrt(1.5) + 0.5))),
      pasos: [
        'Al sumar 0,5 a todas las notas, el promedio también sube 0,5.',
        'Las distancias de cada nota al promedio no cambian.',
        'La desviación estándar sigue siendo 1,2.',
      ],
      pista: 'Piensa en qué pasa con las distancias al promedio si todos suben lo mismo.',
    },
  ],
};
