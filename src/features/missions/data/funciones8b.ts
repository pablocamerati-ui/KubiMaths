import { Mission } from '../types';

/**
 * Misión 8.º básico — Función lineal y afín.
 * Evaluación, pendiente, proporcionalidad directa y modelos en contexto.
 */
export const misionFunciones8b: Mission = {
  id: 'funciones-8b',
  titulo: 'Función lineal y afín',
  nivel: '8.º básico',
  unidad: 'Unidad 2 · Álgebra',
  corazonesIniciales: 3,
  xpPorCorrecta: 10,
  xpBonoCompletar: 20,
  preguntas: [
    {
      id: 'l8-01',
      habilidad: 'Evaluar una función',
      enunciado: 'Si f(x) = 3x − 2, ¿cuánto vale f(4)?',
      expresion: 'f(x) = 3x − 2',
      opciones: [
        { id: 'a', valor: 10 },
        { id: 'b', valor: 12, porQue: 'Calculaste 3 · 4, pero faltó restar 2.' },
        { id: 'c', valor: 14, porQue: 'El término independiente es −2: hay que restarlo, no sumarlo.' },
        { id: 'd', valor: 32, porQue: '3x significa 3 por x, no el número 34.' },
      ],
      correcta: 'a',
      calcular: () => 3 * 4 - 2,
      pasos: [
        'Reemplazamos x por 4: f(4) = 3 · 4 − 2.',
        '3 · 4 = 12.',
        '12 − 2 = 10.',
      ],
      pista: 'Reemplaza x por 4 en la fórmula.',
    },
    {
      id: 'l8-02',
      habilidad: 'Pendiente',
      enunciado: '¿Cuál es la pendiente de la recta?',
      expresion: 'y = −2x + 5',
      opciones: [
        { id: 'a', valor: 5, porQue: '5 es el coeficiente de posición (donde la recta corta al eje y).' },
        { id: 'b', valor: 2, porQue: 'Cuida el signo: la x está multiplicada por −2.' },
        { id: 'c', valor: -2 },
        { id: 'd', valor: -5, porQue: 'La pendiente es el número que multiplica a x.' },
      ],
      correcta: 'c',
      calcular: () => -2,
      pasos: [
        'En y = mx + n, la pendiente es m.',
        'Aquí m = −2 y n = 5.',
        'La pendiente es −2: la recta baja 2 unidades por cada unidad que avanza.',
      ],
      pista: 'La pendiente es el número que multiplica a x.',
    },
    {
      // valor: f(0) de cada función
      id: 'l8-03',
      habilidad: 'Función lineal',
      enunciado: '¿Cuál de estas funciones es lineal, es decir, pasa por el origen (0, 0)?',
      opciones: [
        { id: 'a', valor: 1, texto: 'y = x + 1', porQue: 'Si x = 0, y = 1: no pasa por el origen.' },
        { id: 'b', valor: 0, texto: 'y = 4x' },
        { id: 'c', valor: -3, texto: 'y = 2x − 3', porQue: 'Si x = 0, y = −3: es una función afín, no lineal.' },
        { id: 'd', valor: 5, texto: 'y = 5', porQue: 'Es una función constante: siempre vale 5.' },
      ],
      correcta: 'b',
      calcular: () => 4 * 0,
      pasos: [
        'Una función lineal tiene la forma y = mx.',
        'Al reemplazar x = 0 debe dar y = 0.',
        'Solo y = 4x cumple: 4 · 0 = 0.',
      ],
      pista: 'Reemplaza x = 0 en cada función: ¿cuál da y = 0?',
    },
    {
      id: 'l8-04',
      habilidad: 'Proporcionalidad directa',
      enunciado: 'y es directamente proporcional a x. Cuando x = 3, y = 12. ¿Cuánto vale y cuando x = 5?',
      opciones: [
        { id: 'a', valor: 14, porQue: 'Sumaste 2 a y porque x aumentó en 2. En la proporción directa se multiplica por la constante.' },
        { id: 'b', valor: 15, porQue: 'La constante de proporcionalidad es 12 : 3 = 4, no 3.' },
        { id: 'c', valor: 60, porQue: 'Multiplicaste 12 · 5 sin dividir por 3.' },
        { id: 'd', valor: 20 },
      ],
      correcta: 'd',
      calcular: () => (12 / 3) * 5,
      pasos: [
        'Constante de proporcionalidad: k = 12 : 3 = 4.',
        'La función es y = 4x.',
        'Para x = 5: y = 4 · 5 = 20.',
      ],
      pista: 'Calcula primero cuánto vale y por cada unidad de x.',
    },
    {
      id: 'l8-05',
      habilidad: 'Pendiente entre dos puntos',
      enunciado: 'Una recta pasa por los puntos (1, 3) y (3, 7). ¿Cuál es su pendiente?',
      opciones: [
        { id: 'a', valor: 2 },
        { id: 'b', valor: 1 / 2, texto: '1/2', porQue: 'Invertiste la división. La pendiente es el cambio en y dividido por el cambio en x.' },
        { id: 'c', valor: 4, porQue: '4 es el cambio en y. Falta dividirlo por el cambio en x.' },
        { id: 'd', valor: 5, porQue: '5 es el promedio de 3 y 7, no la pendiente.' },
      ],
      correcta: 'a',
      calcular: () => (7 - 3) / (3 - 1),
      pasos: [
        'Cambio en y: 7 − 3 = 4.',
        'Cambio en x: 3 − 1 = 2.',
        'Pendiente: 4 : 2 = 2.',
      ],
      pista: 'Divide cuánto cambia y por cuánto cambia x.',
    },
    {
      // valor: costo para n = 10 tramos
      id: 'l8-06',
      habilidad: 'Función afín en contexto',
      enunciado: 'Un taxi cobra $400 fijos más $150 por cada tramo de 200 m. ¿Qué función representa el costo C según la cantidad n de tramos?',
      opciones: [
        { id: 'a', valor: 400 * 10 + 150, texto: 'C = 400n + 150', porQue: 'Se intercambiaron los valores: lo que cambia con cada tramo son $150.' },
        { id: 'b', valor: 150 * 10 + 400, texto: 'C = 150n + 400' },
        { id: 'c', valor: 550 * 10, texto: 'C = 550n', porQue: 'El cobro fijo se paga una sola vez, no en cada tramo.' },
        { id: 'd', valor: 150 * 10, texto: 'C = 150n', porQue: 'Faltó el cobro fijo de $400.' },
      ],
      correcta: 'b',
      calcular: () => 400 + 150 * 10,
      pasos: [
        'Cada tramo suma $150: eso es 150n.',
        'El cobro fijo de $400 se suma una vez.',
        'C = 150n + 400.',
      ],
      pista: 'Separa lo que se paga una vez de lo que se paga por cada tramo.',
    },
    {
      id: 'l8-07',
      habilidad: 'Modelos lineales',
      enunciado: 'Un estanque tiene 500 L y se vacía a razón de 25 L por minuto. ¿Cuántos litros quedan después de 12 minutos?',
      unidad: 'L',
      opciones: [
        { id: 'a', valor: 300, porQue: '300 L es lo que salió. Se pregunta cuánto queda.' },
        { id: 'b', valor: 800, porQue: 'Sumaste. El estanque se vacía: hay que restar.' },
        { id: 'c', valor: 200 },
        { id: 'd', valor: 475, porQue: 'Restaste solo un minuto. Son 12 minutos.' },
      ],
      correcta: 'c',
      calcular: () => 500 - 25 * 12,
      pasos: [
        'La función es V(t) = 500 − 25t.',
        'Para t = 12: 25 · 12 = 300.',
        'V(12) = 500 − 300 = 200 L.',
      ],
      pista: 'Calcula cuánto sale en 12 minutos y réstalo de 500.',
    },
    {
      id: 'l8-08',
      habilidad: 'Ceros de una función',
      enunciado: 'Un estanque de 500 L se vacía a razón de 25 L por minuto. ¿En cuántos minutos queda vacío?',
      unidad: 'min',
      opciones: [
        { id: 'a', valor: 475, porQue: 'Restaste 500 − 25. Hay que ver cuántas veces caben 25 L en 500 L.' },
        { id: 'b', valor: 25, porQue: '25 L es lo que sale cada minuto, no el tiempo.' },
        { id: 'c', valor: 12500, porQue: 'Multiplicaste. Hay que dividir 500 por 25.' },
        { id: 'd', valor: 20 },
      ],
      correcta: 'd',
      calcular: () => 500 / 25,
      pasos: [
        'Queda vacío cuando V(t) = 0: 500 − 25t = 0.',
        '25t = 500.',
        't = 500 : 25 = 20 minutos.',
      ],
      pista: 'Plantea 500 − 25t = 0.',
    },
  ],
};
