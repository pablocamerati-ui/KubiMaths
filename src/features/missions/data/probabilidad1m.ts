import { Mission } from '../types';

/**
 * Misión 1.º medio — Probabilidades.
 * Regla de Laplace, complemento, espacio muestral, conteo, frecuencia
 * relativa y extracciones sin reposición.
 */
export const misionProbabilidad1m: Mission = {
  id: 'probabilidad-1m',
  titulo: 'Probabilidades',
  nivel: '1.º medio',
  unidad: 'Unidad 4 · Probabilidad',
  corazonesIniciales: 3,
  xpPorCorrecta: 10,
  xpBonoCompletar: 20,
  preguntas: [
    {
      id: 'b1-01',
      habilidad: 'Regla de Laplace',
      enunciado: 'Al lanzar un dado común, ¿cuál es la probabilidad de obtener un número par?',
      opciones: [
        { id: 'a', valor: 1 / 6, texto: '1/6', porQue: '1/6 es la probabilidad de un número específico. Hay tres pares: 2, 4 y 6.' },
        { id: 'b', valor: 1 / 2, texto: '1/2' },
        { id: 'c', valor: 3 / 2, texto: '3/2', porQue: 'Una probabilidad nunca es mayor que 1. Los casos favorables van arriba.' },
        { id: 'd', valor: 1 / 3, texto: '2/6', porQue: 'Los pares del dado son tres: 2, 4 y 6.' },
      ],
      correcta: 'b',
      calcular: () => 3 / 6,
      pasos: [
        'Casos posibles: 1, 2, 3, 4, 5 y 6 (seis casos).',
        'Casos favorables: 2, 4 y 6 (tres casos).',
        'P = 3/6 = 1/2.',
      ],
      pista: 'Divide los casos favorables por los casos posibles.',
    },
    {
      id: 'b1-02',
      habilidad: 'Probabilidad con extracciones',
      enunciado: 'Una bolsa tiene 3 bolitas rojas, 4 azules y 1 verde. Si sacas una al azar, ¿cuál es la probabilidad de que sea roja?',
      opciones: [
        { id: 'a', valor: 3 / 8, texto: '3/8' },
        { id: 'b', valor: 3 / 5, texto: '3/5', porQue: 'Dividiste por las bolitas que no son rojas. Se divide por el total: 8.' },
        { id: 'c', valor: 1 / 3, texto: '1/3', porQue: 'Hay 3 colores, pero no la misma cantidad de bolitas de cada uno.' },
        { id: 'd', valor: 3 / 4, texto: '3/4', porQue: 'Dividiste por las azules. Se divide por el total de bolitas.' },
      ],
      correcta: 'a',
      calcular: () => 3 / (3 + 4 + 1),
      pasos: [
        'Total de bolitas: 3 + 4 + 1 = 8.',
        'Bolitas rojas: 3.',
        'P(roja) = 3/8.',
      ],
      pista: 'Cuenta primero cuántas bolitas hay en total.',
    },
    {
      id: 'b1-03',
      habilidad: 'Evento complementario',
      enunciado: 'La probabilidad de que llueva mañana es 0,35. ¿Cuál es la probabilidad de que NO llueva?',
      opciones: [
        { id: 'a', valor: 0.35, porQue: 'Esa es la probabilidad de que llueva.' },
        { id: 'b', valor: 0.5, porQue: 'Que haya dos opciones no significa que tengan igual probabilidad.' },
        { id: 'c', valor: 0.65 },
        { id: 'd', valor: 1.35, porQue: 'Sumaste 1. Una probabilidad no puede ser mayor que 1.' },
      ],
      correcta: 'c',
      calcular: () => (100 - 35) / 100,
      pasos: [
        'Un evento y su complemento suman 1.',
        'P(no llueva) = 1 − 0,35.',
        '= 0,65.',
      ],
      pista: 'Un evento y su complemento suman 1.',
    },
    {
      id: 'b1-04',
      habilidad: 'Espacio muestral',
      enunciado: 'Se lanzan dos monedas. ¿Cuál es la probabilidad de obtener dos caras?',
      opciones: [
        { id: 'a', valor: 1 / 2, texto: '1/2', porQue: '1/2 es la probabilidad de cara en una sola moneda.' },
        { id: 'b', valor: 1 / 3, texto: '1/3', porQue: 'Los resultados no son solo «dos caras, una y una, dos sellos»: cara-sello y sello-cara son distintos.' },
        { id: 'c', valor: 1 / 8, texto: '1/8', porQue: '1/8 corresponde a tres monedas. Aquí son dos.' },
        { id: 'd', valor: 1 / 4, texto: '1/4' },
      ],
      correcta: 'd',
      calcular: () => 1 / 4,
      pasos: [
        'Resultados posibles: CC, CS, SC y SS (cuatro casos).',
        'Solo uno es favorable: CC.',
        'P = 1/4.',
      ],
      pista: 'Escribe todos los resultados posibles: CC, CS, SC, SS.',
    },
    {
      id: 'b1-05',
      habilidad: 'Principio multiplicativo',
      enunciado: 'Tienes 3 poleras y 4 pantalones. ¿Cuántas combinaciones distintas de polera y pantalón puedes formar?',
      opciones: [
        { id: 'a', valor: 7, porQue: 'Sumaste. Cada polera se combina con cada pantalón: se multiplica.' },
        { id: 'b', valor: 12 },
        { id: 'c', valor: 81, porQue: 'Calculaste 3⁴. Para combinar se multiplica 3 · 4.' },
        { id: 'd', valor: 24, porQue: 'Contaste el doble. Cada combinación es una polera con un pantalón.' },
      ],
      correcta: 'b',
      calcular: () => 3 * 4,
      pasos: [
        'Cada polera se puede usar con 4 pantalones.',
        'Hay 3 poleras: 3 · 4.',
        '= 12 combinaciones.',
      ],
      pista: 'Cada polera se combina con cada uno de los pantalones.',
    },
    {
      id: 'b1-06',
      habilidad: 'Dos dados',
      enunciado: 'Se lanzan dos dados. ¿Cuál es la probabilidad de que la suma sea 7?',
      opciones: [
        { id: 'a', valor: 7 / 36, texto: '7/36', porQue: 'Las formas de sumar 7 son seis, no siete: (1,6), (2,5), (3,4), (4,3), (5,2) y (6,1).' },
        { id: 'b', valor: 1 / 11, texto: '1/11', porQue: 'Las sumas posibles (2 a 12) no son igualmente probables. Hay que contar los 36 pares.' },
        { id: 'c', valor: 1 / 6, texto: '1/6' },
        { id: 'd', valor: 1 / 12, texto: '1/12', porQue: 'Contaste solo tres pares. El orden importa: (1,6) y (6,1) son distintos.' },
      ],
      correcta: 'c',
      calcular: () => {
        let favorables = 0;
        for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) if (a + b === 7) favorables++;
        return favorables / 36;
      },
      pasos: [
        'Hay 6 · 6 = 36 resultados posibles.',
        'Suman 7: (1,6), (2,5), (3,4), (4,3), (5,2) y (6,1). Son 6.',
        'P = 6/36 = 1/6.',
      ],
      pista: 'Hay 36 resultados posibles: cuenta los pares que suman 7.',
    },
    {
      id: 'b1-07',
      habilidad: 'Frecuencia relativa',
      enunciado: 'Se lanza una moneda 200 veces y salen 112 caras. ¿Cuál es la frecuencia relativa de caras?',
      opciones: [
        { id: 'a', valor: 112, porQue: '112 es la frecuencia absoluta. La relativa se divide por el total de lanzamientos.' },
        { id: 'b', valor: 0.56 },
        { id: 'c', valor: 0.44, porQue: '0,44 es la frecuencia relativa de sellos.' },
        { id: 'd', valor: 0.5, porQue: '0,5 es la probabilidad teórica. La frecuencia relativa sale de los resultados del experimento.' },
      ],
      correcta: 'b',
      calcular: () => 112 / 200,
      pasos: [
        'Frecuencia relativa = veces que ocurre : total de repeticiones.',
        '112 : 200.',
        '= 0,56.',
      ],
      pista: 'Divide la cantidad de caras por el total de lanzamientos.',
    },
    {
      id: 'b1-08',
      habilidad: 'Extracciones sin reposición',
      enunciado: 'Una bolsa tiene 2 bolitas rojas y 3 azules. Sacas dos, una tras otra, sin devolverlas. ¿Cuál es la probabilidad de que ambas sean rojas?',
      opciones: [
        { id: 'a', valor: 4 / 25, texto: '4/25', porQue: 'Así sería devolviendo la bolita. Sin reposición, para la segunda quedan 1 roja de 4.' },
        { id: 'b', valor: 2 / 5, texto: '2/5', porQue: 'Esa es solo la probabilidad de la primera extracción.' },
        { id: 'c', valor: 3 / 10, texto: '3/10', porQue: 'Calculaste roja y luego azul. Se piden dos rojas.' },
        { id: 'd', valor: 1 / 10, texto: '1/10' },
      ],
      correcta: 'd',
      calcular: () => (2 / 5) * (1 / 4),
      pasos: [
        'Primera roja: 2/5.',
        'Queda 1 roja de 4 bolitas: 1/4.',
        'P = 2/5 · 1/4 = 2/20 = 1/10.',
      ],
      pista: 'Después de sacar la primera roja, ¿cuántas bolitas y cuántas rojas quedan?',
    },
  ],
};
