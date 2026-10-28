import { Mission } from '../types';

/**
 * Misión 3.º medio — Probabilidad condicional.
 * Tablas de doble entrada, árboles, extracciones sin reposición,
 * independencia, probabilidad total y teorema de Bayes.
 *
 * Tabla usada en las preguntas 1 y 2 (200 estudiantes):
 *                  Mujeres  Hombres  Total
 *   Hace deporte      45       35      80
 *   No hace deporte   55       65     120
 *   Total            100      100     200
 */
const TABLA = 'En un colegio hay 200 estudiantes: 100 mujeres y 100 hombres. Hacen deporte 45 mujeres y 35 hombres.';

export const misionCondicional3m: Mission = {
  id: 'condicional-3m',
  titulo: 'Probabilidad condicional',
  nivel: '3.º medio',
  unidad: 'Unidad 4 · Probabilidad y estadística',
  corazonesIniciales: 3,
  xpPorCorrecta: 10,
  xpBonoCompletar: 20,
  preguntas: [
    {
      id: 'c3-01',
      habilidad: 'Tabla de doble entrada',
      enunciado: `${TABLA} Si eliges al azar a una mujer, ¿cuál es la probabilidad de que haga deporte?`,
      opciones: [
        { id: 'a', valor: 45 / 200, texto: '9/40', porQue: 'Ya sabes que es mujer: el total son las 100 mujeres, no los 200 estudiantes.' },
        { id: 'b', valor: 45 / 100, texto: '9/20' },
        { id: 'c', valor: 45 / 80, texto: '9/16', porQue: 'Esa es la probabilidad de ser mujer sabiendo que hace deporte: la condición está al revés.' },
        { id: 'd', valor: 80 / 200, texto: '2/5', porQue: 'Esa es la probabilidad de hacer deporte en todo el colegio, sin la condición.' },
      ],
      correcta: 'b',
      calcular: () => 45 / 100,
      pasos: [
        'La condición «es mujer» reduce el total a 100.',
        'De ellas, 45 hacen deporte.',
        'P(deporte | mujer) = 45/100 = 9/20.',
      ],
      pista: 'La condición cambia el total de casos posibles.',
    },
    {
      id: 'c3-02',
      habilidad: 'Tabla de doble entrada',
      enunciado: `${TABLA} Si eliges al azar a alguien que hace deporte, ¿cuál es la probabilidad de que sea mujer?`,
      opciones: [
        { id: 'a', valor: 45 / 100, texto: '9/20', porQue: 'Esa es P(deporte | mujer). Aquí la condición es hacer deporte.' },
        { id: 'b', valor: 45 / 200, texto: '9/40', porQue: 'El total no son los 200: solo los 80 que hacen deporte.' },
        { id: 'c', valor: 100 / 200, texto: '1/2', porQue: 'Esa es la proporción de mujeres en el colegio, sin la condición.' },
        { id: 'd', valor: 45 / 80, texto: '9/16' },
      ],
      correcta: 'd',
      calcular: () => 45 / (45 + 35),
      pasos: [
        'Hacen deporte 45 + 35 = 80 estudiantes.',
        'De ellos, 45 son mujeres.',
        'P(mujer | deporte) = 45/80 = 9/16.',
      ],
      pista: 'Primero cuenta cuántos estudiantes cumplen la condición.',
    },
    {
      id: 'c3-03',
      habilidad: 'Extracciones sin reposición',
      enunciado: 'Una bolsa tiene 3 bolitas rojas y 2 azules. Sacas una roja y no la devuelves. ¿Cuál es la probabilidad de que la segunda también sea roja?',
      opciones: [
        { id: 'a', valor: 3 / 5, texto: '3/5', porQue: 'Así sería si devolvieras la bolita. Ahora quedan 2 rojas de 4.' },
        { id: 'b', valor: 1 / 2, texto: '1/2' },
        { id: 'c', valor: 3 / 10, texto: '3/10', porQue: 'Esa es la probabilidad de sacar dos rojas seguidas. Aquí ya sabes que la primera fue roja.' },
        { id: 'd', valor: 2 / 5, texto: '2/5', porQue: 'Quedan 4 bolitas, no 5.' },
      ],
      correcta: 'b',
      calcular: () => (3 - 1) / (5 - 1),
      pasos: [
        'Después de sacar una roja quedan 2 rojas y 2 azules.',
        'Son 4 bolitas en total.',
        'P(roja | primera roja) = 2/4 = 1/2.',
      ],
      pista: 'Cuenta cuántas bolitas quedan después de la primera extracción.',
    },
    {
      id: 'c3-04',
      habilidad: 'Árbol de probabilidades',
      enunciado: 'En la misma bolsa (3 rojas y 2 azules) sacas dos bolitas sin devolverlas. ¿Cuál es la probabilidad de que ambas sean rojas?',
      opciones: [
        { id: 'a', valor: 3 / 10, texto: '3/10' },
        { id: 'b', valor: 9 / 25, texto: '9/25', porQue: 'Así sería con reposición. Sin reposición, la segunda es 2/4.' },
        { id: 'c', valor: 11 / 10, texto: '11/10', porQue: 'Sumaste las probabilidades: en un camino del árbol se multiplican. Además, una probabilidad no supera 1.' },
        { id: 'd', valor: 1 / 2, texto: '1/2', porQue: 'Esa es solo la probabilidad de la segunda roja dado que la primera fue roja.' },
      ],
      correcta: 'a',
      calcular: () => (3 / 5) * (2 / 4),
      pasos: [
        'P(primera roja) = 3/5.',
        'P(segunda roja | primera roja) = 2/4.',
        'P(ambas rojas) = 3/5 · 2/4 = 6/20 = 3/10.',
      ],
      pista: 'Multiplica las probabilidades a lo largo de una rama del árbol.',
    },
    {
      // valor: 1 = sí son independientes; 2, 3 y 4 = otras respuestas
      id: 'c3-05',
      habilidad: 'Eventos independientes',
      enunciado: 'Se sabe que P(A) = 0,4; P(B) = 0,5 y P(A ∩ B) = 0,2. ¿Los eventos A y B son independientes?',
      opciones: [
        { id: 'a', valor: 2, texto: 'No, porque P(A ∩ B) no es 0', porQue: 'Eso indica que no son excluyentes, que es otra cosa. Para independencia se compara con P(A) · P(B).' },
        { id: 'b', valor: 3, texto: 'No, porque P(A) + P(B) no es 1', porQue: 'La suma no dice nada sobre independencia. Se compara P(A ∩ B) con P(A) · P(B).' },
        { id: 'c', valor: 1, texto: 'Sí, porque P(A) · P(B) = P(A ∩ B)' },
        { id: 'd', valor: 4, texto: 'No se puede saber', porQue: 'Con estos tres datos basta: se compara P(A) · P(B) con P(A ∩ B).' },
      ],
      correcta: 'c',
      calcular: () => (Math.abs(0.4 * 0.5 - 0.2) < 1e-12 ? 1 : 2),
      pasos: [
        'A y B son independientes si P(A ∩ B) = P(A) · P(B).',
        'P(A) · P(B) = 0,4 · 0,5 = 0,2.',
        'Coincide con P(A ∩ B): son independientes.',
      ],
      pista: 'Compara la probabilidad de que ocurran ambos con el producto de sus probabilidades.',
    },
    {
      id: 'c3-06',
      habilidad: 'Fórmula de la probabilidad condicional',
      enunciado: 'Si P(A ∩ B) = 0,12 y P(A) = 0,4, ¿cuánto vale P(B | A)?',
      opciones: [
        { id: 'a', valor: 0.048, porQue: 'Multiplicaste. P(B | A) = P(A ∩ B) / P(A).' },
        { id: 'b', valor: 0.52, porQue: 'Sumaste. Se divide P(A ∩ B) por P(A).' },
        { id: 'c', valor: 0.3 },
        { id: 'd', valor: 0.28, porQue: 'Restaste. Se divide P(A ∩ B) por P(A).' },
      ],
      correcta: 'c',
      calcular: () => 0.12 / 0.4,
      pasos: [
        'P(B | A) = P(A ∩ B) / P(A).',
        '= 0,12 / 0,4.',
        '= 0,3.',
      ],
      pista: 'Divide la probabilidad de la intersección por la probabilidad de la condición.',
    },
    {
      id: 'c3-07',
      habilidad: 'Teorema de Bayes',
      enunciado: 'Una fábrica hace el 60 % de sus piezas con la máquina A y el 40 % con la B. La A produce 2 % de piezas defectuosas y la B, 5 %. Si una pieza salió defectuosa, ¿cuál es la probabilidad de que venga de la máquina B?',
      opciones: [
        { id: 'a', valor: 2 / 5, texto: '2/5', porQue: 'Esa es la probabilidad de venir de B sin saber nada más. Saber que es defectuosa cambia la probabilidad.' },
        { id: 'b', valor: 1 / 20, texto: '1/20', porQue: 'Esa es la probabilidad de que B produzca una defectuosa, no la inversa.' },
        { id: 'c', valor: 3 / 8, texto: '3/8', porQue: 'Esa es la probabilidad de que venga de A.' },
        { id: 'd', valor: 5 / 8, texto: '5/8' },
      ],
      correcta: 'd',
      calcular: () => (0.4 * 0.05) / (0.6 * 0.02 + 0.4 * 0.05),
      pasos: [
        'Defectuosas de A: 0,6 · 0,02 = 0,012. Defectuosas de B: 0,4 · 0,05 = 0,02.',
        'Total de defectuosas: 0,032.',
        'P(B | defectuosa) = 0,02 / 0,032 = 5/8.',
      ],
      pista: 'Calcula cuántas defectuosas aporta cada máquina y qué parte de ellas viene de la que te piden.',
    },
    {
      id: 'c3-08',
      habilidad: 'Probabilidad total',
      enunciado: 'En la misma fábrica (A: 60 % de las piezas con 2 % defectuosas; B: 40 % con 5 % defectuosas), ¿qué porcentaje del total de piezas sale defectuoso?',
      unidad: '%',
      opciones: [
        { id: 'a', valor: 7, porQue: 'Sumaste 2 % y 5 %. Cada porcentaje se aplica solo a lo que produce su máquina.' },
        { id: 'b', valor: 3.5, porQue: 'Ese es el promedio simple. Las máquinas no producen la misma cantidad: hay que ponderar.' },
        { id: 'c', valor: 3.2 },
        { id: 'd', valor: 1.2, porQue: 'Ese es solo el aporte de la máquina A. Falta sumar el de la B.' },
      ],
      correcta: 'c',
      calcular: () => (0.6 * 0.02 + 0.4 * 0.05) * 100,
      pasos: [
        'Aporte de A: 60 % de 2 % = 1,2 %.',
        'Aporte de B: 40 % de 5 % = 2 %.',
        'Total: 1,2 % + 2 % = 3,2 %.',
      ],
      pista: 'Suma lo que aporta cada máquina, ponderado por cuánto produce.',
    },
  ],
};
