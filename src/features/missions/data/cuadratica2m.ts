import { Mission } from '../types';

/**
 * Misión 2.º medio — Función cuadrática.
 * Evaluación, concavidad, vértice, intersecciones, traslaciones y
 * discriminante. Cuando las alternativas son descripciones, `valor` es
 * un código que la pregunta explica en su comentario.
 */
export const misionCuadratica2m: Mission = {
  id: 'cuadratica-2m',
  titulo: 'Función cuadrática',
  nivel: '2.º medio',
  unidad: 'Unidad 2 · Álgebra',
  corazonesIniciales: 3,
  xpPorCorrecta: 10,
  xpBonoCompletar: 20,
  preguntas: [
    {
      id: 'c2-01',
      habilidad: 'Evaluar una función cuadrática',
      enunciado: 'Si f(x) = x² − 3x + 2, ¿cuánto vale f(4)?',
      expresion: 'f(x) = x² − 3x + 2',
      opciones: [
        { id: 'a', valor: 6 },
        { id: 'b', valor: -2, porQue: 'x² no es 2x: 4² = 16, no 8.' },
        { id: 'c', valor: 30, porQue: 'El término −3x se resta: 16 − 12 + 2.' },
        { id: 'd', valor: 18, porQue: 'Faltó el término −3x: 3 · 4 = 12 se resta.' },
      ],
      correcta: 'a',
      calcular: () => 4 ** 2 - 3 * 4 + 2,
      pasos: [
        'Reemplazamos x por 4: 4² − 3 · 4 + 2.',
        '16 − 12 + 2.',
        '= 6.',
      ],
      pista: 'Reemplaza x por 4 y respeta el orden de las operaciones.',
    },
    {
      // valor: 1 abre hacia arriba, −1 hacia abajo; otras descripciones usan otros códigos
      id: 'c2-02',
      habilidad: 'Concavidad',
      enunciado: '¿Hacia dónde abre la parábola de y = −2x² + 3x − 1?',
      opciones: [
        { id: 'a', valor: 1, texto: 'Hacia arriba', porQue: 'El coeficiente de x² es negativo (−2): abre hacia abajo.' },
        { id: 'b', valor: -1, texto: 'Hacia abajo' },
        { id: 'c', valor: 2, texto: 'Hacia la derecha', porQue: 'Una función cuadrática solo abre hacia arriba o hacia abajo.' },
        { id: 'd', valor: 3, texto: 'Depende del −1', porQue: 'La concavidad la decide el coeficiente de x², no el término libre.' },
      ],
      correcta: 'b',
      calcular: () => Math.sign(-2),
      pasos: [
        'En y = ax² + bx + c, el signo de a decide la concavidad.',
        'Aquí a = −2, negativo.',
        'La parábola abre hacia abajo.',
      ],
      pista: 'Mira el signo del número que acompaña a x².',
    },
    {
      id: 'c2-03',
      habilidad: 'Vértice',
      enunciado: '¿Cuál es la coordenada x del vértice de y = x² − 6x + 5?',
      opciones: [
        { id: 'a', valor: -3, porQue: 'Cuida el signo: −b/(2a) = −(−6)/2 = 3.' },
        { id: 'b', valor: 6, porQue: 'Faltó dividir por 2a = 2.' },
        { id: 'c', valor: 3 },
        { id: 'd', valor: 5, porQue: '5 es c: indica dónde la parábola corta al eje y.' },
      ],
      correcta: 'c',
      calcular: () => -(-6) / (2 * 1),
      pasos: [
        'La coordenada x del vértice es −b / (2a).',
        'Aquí a = 1 y b = −6.',
        'x = 6 / 2 = 3.',
      ],
      pista: 'Usa x = −b / (2a).',
    },
    {
      id: 'c2-04',
      habilidad: 'Intersección con el eje y',
      enunciado: '¿En qué valor corta al eje y la parábola y = 2x² − 4x + 7?',
      opciones: [
        { id: 'a', valor: 2, porQue: '2 es el coeficiente de x²: decide la abertura, no el corte con el eje y.' },
        { id: 'b', valor: -4, porQue: '−4 es el coeficiente de x, no el corte con el eje y.' },
        { id: 'c', valor: 0, porQue: 'El corte con el eje y ocurre en x = 0; el valor de y no es necesariamente 0.' },
        { id: 'd', valor: 7 },
      ],
      correcta: 'd',
      calcular: () => 2 * 0 ** 2 - 4 * 0 + 7,
      pasos: [
        'El eje y corresponde a x = 0.',
        'y = 2 · 0² − 4 · 0 + 7.',
        'y = 7.',
      ],
      pista: '¿Cuánto vale y cuando x = 0?',
    },
    {
      // valor: producto de los ceros (o el cero, si se indica uno solo)
      id: 'c2-05',
      habilidad: 'Ceros de la función',
      enunciado: '¿Dónde corta al eje x la parábola y = x² − 9?',
      opciones: [
        { id: 'a', valor: 3 * -3, texto: 'En 3 y −3' },
        { id: 'b', valor: 9 * -9, texto: 'En 9 y −9', porQue: 'x² = 9 tiene soluciones ±3, no ±9.' },
        { id: 'c', valor: 3, texto: 'Solo en 3', porQue: '(−3)² también es 9: hay dos ceros.' },
        { id: 'd', valor: 0 * 9, texto: 'En 0 y 9', porQue: 'x² − 9 no es x(x − 9). Es una diferencia de cuadrados.' },
      ],
      correcta: 'a',
      calcular: () => 3 * -3,
      pasos: [
        'Igualamos a cero: x² − 9 = 0.',
        'x² = 9.',
        'x = 3 o x = −3.',
      ],
      pista: 'Iguala a cero y despeja x².',
    },
    {
      // valor: 10 · (x del vértice) + (y del vértice)
      id: 'c2-06',
      habilidad: 'Traslación de la parábola',
      enunciado: '¿Cuál es el vértice de y = (x − 2)² + 1?',
      opciones: [
        { id: 'a', valor: 10 * -2 + 1, texto: '(−2, 1)', porQue: '(x − 2) traslada la parábola 2 unidades a la derecha: x = 2.' },
        { id: 'b', valor: 10 * 2 + 1, texto: '(2, 1)' },
        { id: 'c', valor: 10 * 1 + 2, texto: '(1, 2)', porQue: 'En un punto va primero la x: el vértice es (2, 1).' },
        { id: 'd', valor: 10 * 2 - 1, texto: '(2, −1)', porQue: 'El +1 sube la parábola: y = 1.' },
      ],
      correcta: 'b',
      calcular: () => 10 * 2 + 1,
      pasos: [
        'En y = (x − h)² + k, el vértice es (h, k).',
        'Aquí h = 2 y k = 1.',
        'El vértice es (2, 1).',
      ],
      pista: 'Compara con la forma y = (x − h)² + k.',
    },
    {
      id: 'c2-07',
      habilidad: 'Máximo en contexto',
      enunciado: 'La altura de una pelota es h(t) = −5t² + 20t metros, con t en segundos. ¿Cuál es la altura máxima?',
      unidad: 'm',
      opciones: [
        { id: 'a', valor: 2, porQue: 'En t = 2 s se alcanza el máximo, pero se pregunta la altura h(2).' },
        { id: 'b', valor: 40, porQue: 'Revisa: −5 · 2² = −20, entonces h(2) = −20 + 40.' },
        { id: 'c', valor: 20 },
        { id: 'd', valor: 4, porQue: 'En t = 4 s la pelota vuelve al suelo. Se pregunta la altura máxima.' },
      ],
      correcta: 'c',
      calcular: () => {
        const t = -20 / (2 * -5);
        return -5 * t ** 2 + 20 * t;
      },
      pasos: [
        'El máximo está en el vértice: t = −20 / (2 · −5) = 2 s.',
        'h(2) = −5 · 4 + 20 · 2.',
        'h(2) = −20 + 40 = 20 m.',
      ],
      pista: 'Busca el tiempo del vértice y reemplázalo en h(t).',
    },
    {
      // valor: cantidad de cortes con el eje x
      id: 'c2-08',
      habilidad: 'Discriminante',
      enunciado: '¿Cuántas veces corta al eje x la parábola y = x² + 2x + 5?',
      opciones: [
        { id: 'a', valor: 2, texto: 'Dos veces', porQue: 'El discriminante es 4 − 20 = −16, negativo: no hay cortes.' },
        { id: 'b', valor: 1, texto: 'Una vez', porQue: 'Habría un solo corte si el discriminante fuera 0. Aquí es −16.' },
        { id: 'c', valor: 3, texto: 'Tres veces', porQue: 'Una parábola corta al eje x a lo más dos veces.' },
        { id: 'd', valor: 0, texto: 'No lo corta' },
      ],
      correcta: 'd',
      calcular: () => {
        const disc = 2 ** 2 - 4 * 1 * 5;
        return disc < 0 ? 0 : disc === 0 ? 1 : 2;
      },
      pasos: [
        'El discriminante es Δ = b² − 4ac.',
        'Δ = 2² − 4 · 1 · 5 = 4 − 20 = −16.',
        'Como Δ < 0, la parábola no corta al eje x.',
      ],
      pista: 'Calcula el discriminante b² − 4ac.',
    },
  ],
};
