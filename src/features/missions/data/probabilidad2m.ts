import { Mission } from '../types';

/**
 * Misión 2.º medio — Combinatoria y probabilidad.
 * Permutaciones, combinaciones, probabilidad condicional, eventos
 * independientes, regla aditiva, complemento y valor esperado.
 */
const factorial = (n: number): number => (n <= 1 ? 1 : n * factorial(n - 1));
const combinaciones = (n: number, k: number) => factorial(n) / (factorial(k) * factorial(n - k));

export const misionProbabilidad2m: Mission = {
  id: 'probabilidad-2m',
  titulo: 'Combinatoria y probabilidad',
  nivel: '2.º medio',
  unidad: 'Unidad 4 · Probabilidad',
  corazonesIniciales: 3,
  xpPorCorrecta: 10,
  xpBonoCompletar: 20,
  preguntas: [
    {
      id: 'k2-01',
      habilidad: 'Permutaciones',
      enunciado: '¿De cuántas formas distintas se pueden ordenar 4 libros en un estante?',
      opciones: [
        { id: 'a', valor: 16, porQue: 'Calculaste 4². El primer lugar tiene 4 opciones, el segundo 3, y así.' },
        { id: 'b', valor: 24 },
        { id: 'c', valor: 10, porQue: 'Sumaste 4 + 3 + 2 + 1. Las opciones se multiplican.' },
        { id: 'd', valor: 4, porQue: 'Hay 4 libros, pero muchas más formas de ordenarlos.' },
      ],
      correcta: 'b',
      calcular: () => factorial(4),
      pasos: [
        'Primer lugar: 4 opciones; segundo: 3; tercero: 2; cuarto: 1.',
        '4 · 3 · 2 · 1 = 4! = 24.',
        'Hay 24 formas.',
      ],
      pista: 'Cuenta las opciones para cada lugar y multiplícalas.',
    },
    {
      id: 'k2-02',
      habilidad: 'Combinaciones',
      enunciado: 'Debes elegir a 2 de tus 5 amigos para un equipo (el orden no importa). ¿Cuántas parejas distintas puedes formar?',
      opciones: [
        { id: 'a', valor: 10 },
        { id: 'b', valor: 20, porQue: '5 · 4 = 20 cuenta cada pareja dos veces (Ana-Beto y Beto-Ana). Divide por 2.' },
        { id: 'c', valor: 25, porQue: 'Calculaste 5². Una persona no puede formar pareja consigo misma.' },
        { id: 'd', valor: 7, porQue: 'Sumaste 5 + 2. Hay que contar las parejas posibles.' },
      ],
      correcta: 'a',
      calcular: () => combinaciones(5, 2),
      pasos: [
        'Si el orden importara: 5 · 4 = 20.',
        'Cada pareja se contó dos veces, porque el orden no importa.',
        '20 : 2 = 10 parejas.',
      ],
      pista: 'Cuenta como si importara el orden y luego corrige las parejas repetidas.',
    },
    {
      id: 'k2-03',
      habilidad: 'Probabilidad condicional',
      enunciado: 'En un curso de 30 estudiantes, 12 juegan fútbol y, de ellos, 4 también juegan básquetbol. Si eliges al azar a alguien que juega fútbol, ¿cuál es la probabilidad de que juegue básquetbol?',
      opciones: [
        { id: 'a', valor: 4 / 30, texto: '4/30', porQue: 'Ya sabes que juega fútbol: el total son los 12 futbolistas, no los 30.' },
        { id: 'b', valor: 12 / 30, texto: '12/30', porQue: 'Esa es la probabilidad de jugar fútbol.' },
        { id: 'c', valor: 1 / 3, texto: '1/3' },
        { id: 'd', valor: 8 / 12, texto: '8/12', porQue: '8 son los futbolistas que no juegan básquetbol.' },
      ],
      correcta: 'c',
      calcular: () => 4 / 12,
      pasos: [
        'La condición «juega fútbol» reduce el total a 12 estudiantes.',
        'De ellos, 4 juegan básquetbol.',
        'P = 4/12 = 1/3.',
      ],
      pista: 'La condición cambia el total de casos posibles.',
    },
    {
      id: 'k2-04',
      habilidad: 'Eventos independientes',
      enunciado: 'Se lanza un dado y una moneda. ¿Cuál es la probabilidad de obtener un 6 y cara?',
      opciones: [
        { id: 'a', valor: 1 / 4, texto: '1/4', porQue: 'Revisa: 1/6 · 1/2 = 1/12.' },
        { id: 'b', valor: 2 / 3, texto: '2/3', porQue: 'Sumaste 1/6 + 1/2. Para que ocurran ambos se multiplica.' },
        { id: 'c', valor: 1 / 8, texto: '1/8', porQue: 'Sumaste los resultados (6 + 2). Los casos posibles son 6 · 2 = 12.' },
        { id: 'd', valor: 1 / 12, texto: '1/12' },
      ],
      correcta: 'd',
      calcular: () => (1 / 6) * (1 / 2),
      pasos: [
        'P(6) = 1/6 y P(cara) = 1/2.',
        'Son independientes: se multiplican.',
        'P = 1/6 · 1/2 = 1/12.',
      ],
      pista: 'Para que ocurran dos eventos independientes, se multiplican sus probabilidades.',
    },
    {
      id: 'k2-05',
      habilidad: 'Regla aditiva',
      enunciado: 'Se saca una carta de un naipe inglés de 52 cartas. ¿Cuál es la probabilidad de que sea un rey o un corazón?',
      opciones: [
        { id: 'a', valor: 16 / 52, texto: '4/13' },
        { id: 'b', valor: 17 / 52, texto: '17/52', porQue: 'Contaste dos veces el rey de corazones. Hay que restarlo una vez.' },
        { id: 'c', valor: 1 / 52, texto: '1/52', porQue: '1/52 es la probabilidad de rey Y corazón (el rey de corazones).' },
        { id: 'd', valor: 1 / 4, texto: '1/4', porQue: '1/4 es solo la probabilidad de corazón. Faltan los otros tres reyes.' },
      ],
      correcta: 'a',
      calcular: () => 4 / 52 + 13 / 52 - 1 / 52,
      pasos: [
        'P(rey) = 4/52 y P(corazón) = 13/52.',
        'El rey de corazones está en ambos: se resta una vez (1/52).',
        'P = 16/52 = 4/13.',
      ],
      pista: 'Suma las dos probabilidades y resta lo que contaste dos veces.',
    },
    {
      id: 'k2-06',
      habilidad: 'Evento complementario',
      enunciado: 'Se lanza una moneda 3 veces. ¿Cuál es la probabilidad de obtener al menos una cara?',
      opciones: [
        { id: 'a', valor: 3 / 8, texto: '3/8', porQue: '3/8 es la probabilidad de exactamente una cara.' },
        { id: 'b', valor: 7 / 8, texto: '7/8' },
        { id: 'c', valor: 1 / 2, texto: '1/2', porQue: '1/2 es la probabilidad de cara en un solo lanzamiento.' },
        { id: 'd', valor: 1 / 8, texto: '1/8', porQue: '1/8 es la probabilidad de ninguna cara: es el complemento.' },
      ],
      correcta: 'b',
      calcular: () => 1 - (1 / 2) ** 3,
      pasos: [
        'Lo contrario de «al menos una cara» es «ninguna cara» (sello-sello-sello).',
        'P(ninguna cara) = (1/2)³ = 1/8.',
        'P(al menos una) = 1 − 1/8 = 7/8.',
      ],
      pista: 'Calcula la probabilidad de lo contrario y réstala de 1.',
    },
    {
      id: 'k2-07',
      habilidad: 'Valor esperado',
      enunciado: 'Un juego paga $600 si al lanzar un dado sale 6, y nada en otro caso. ¿Cuál es la ganancia esperada por jugada?',
      prefijo: '$',
      opciones: [
        { id: 'a', valor: 600, porQue: '$600 es lo que pagan si ganas, pero ganas solo 1 de cada 6 veces.' },
        { id: 'b', valor: 3600, porQue: 'Multiplicaste por 6. Se multiplica por la probabilidad, 1/6.' },
        { id: 'c', valor: 100 },
        { id: 'd', valor: 0, porQue: 'En promedio sí hay ganancia: $600 · 1/6.' },
      ],
      correcta: 'c',
      calcular: () => 600 * (1 / 6) + 0 * (5 / 6),
      pasos: [
        'Valor esperado = suma de (ganancia · probabilidad).',
        '600 · 1/6 + 0 · 5/6.',
        '= $100 por jugada, en promedio.',
      ],
      pista: 'Multiplica cada ganancia por su probabilidad y suma.',
    },
    {
      id: 'k2-08',
      habilidad: 'Conteo y probabilidad',
      enunciado: 'Una clave tiene 2 dígitos del 0 al 9, que se pueden repetir. Si la adivinas al azar, ¿cuál es la probabilidad de acertar?',
      opciones: [
        { id: 'a', valor: 1 / 20, texto: '1/20', porQue: 'Sumaste 10 + 10. Las claves posibles son 10 · 10.' },
        { id: 'b', valor: 1 / 90, texto: '1/90', porQue: 'Los dígitos se pueden repetir: son 10 · 10 = 100 claves, no 10 · 9.' },
        { id: 'c', valor: 1 / 10, texto: '1/10', porQue: '1/10 es la probabilidad de acertar un solo dígito.' },
        { id: 'd', valor: 1 / 100, texto: '1/100' },
      ],
      correcta: 'd',
      calcular: () => 1 / (10 * 10),
      pasos: [
        'Primer dígito: 10 opciones; segundo: 10 opciones.',
        'Claves posibles: 10 · 10 = 100.',
        'P = 1/100.',
      ],
      pista: 'Cuenta primero cuántas claves distintas existen.',
    },
  ],
};
