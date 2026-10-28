import { Mission } from '../types';

/**
 * Misión 4.º medio — Distribución normal.
 * Regla 68-95-99,7, puntaje z, comparación de posiciones y simetría.
 */
export const misionNormal4m: Mission = {
  id: 'normal-4m',
  titulo: 'Distribución normal',
  nivel: '4.º medio',
  unidad: 'Unidad 4 · Probabilidad y estadística',
  corazonesIniciales: 3,
  xpPorCorrecta: 10,
  xpBonoCompletar: 20,
  preguntas: [
    {
      id: 'n4-01',
      habilidad: 'Regla 68-95-99,7',
      enunciado: 'Los puntajes de una prueba siguen una distribución normal con media 500 y desviación estándar 100. ¿Qué porcentaje de estudiantes obtiene entre 400 y 600 puntos?',
      unidad: '%',
      opciones: [
        { id: 'a', valor: 68 },
        { id: 'b', valor: 95, porQue: 'El 95 % corresponde a ±2 desviaciones (entre 300 y 700).' },
        { id: 'c', valor: 50, porQue: 'El 50 % es el que queda bajo la media.' },
        { id: 'd', valor: 34, porQue: '34 % es solo un lado: entre 500 y 600.' },
      ],
      correcta: 'a',
      calcular: () => 34 + 34,
      pasos: [
        '400 y 600 están a una desviación estándar de la media (500 ± 100).',
        'Entre μ − σ y μ + σ queda aproximadamente el 68 % de los datos.',
        'Respuesta: 68 %.',
      ],
      pista: 'Fíjate a cuántas desviaciones estándar de la media están los extremos del intervalo.',
    },
    {
      id: 'n4-02',
      habilidad: 'Puntaje z',
      enunciado: 'Con media 500 y desviación estándar 100, ¿cuál es el puntaje z de un estudiante que obtuvo 650?',
      opciones: [
        { id: 'a', valor: 150, porQue: 'Falta dividir por la desviación estándar.' },
        { id: 'b', valor: 1.5 },
        { id: 'c', valor: 6.5, porQue: 'Dividiste el puntaje por 100; primero se resta la media.' },
        { id: 'd', valor: -1.5, porQue: 'El puntaje está sobre la media: z es positivo.' },
      ],
      correcta: 'b',
      calcular: () => (650 - 500) / 100,
      pasos: [
        'z = (x − μ) / σ.',
        'z = (650 − 500) / 100 = 150 / 100.',
        'z = 1,5.',
      ],
      pista: 'Resta la media al puntaje y divide por la desviación estándar.',
    },
    {
      id: 'n4-03',
      habilidad: 'Colas de la distribución',
      enunciado: 'Con media 500 y desviación estándar 100, ¿qué porcentaje aproximado de estudiantes supera los 700 puntos?',
      unidad: '%',
      opciones: [
        { id: 'a', valor: 5, porQue: 'El 5 % queda fuera de ±2σ sumando ambos lados; sobre 700 está solo la mitad.' },
        { id: 'b', valor: 95, porQue: 'El 95 % es el que está entre 300 y 700.' },
        { id: 'c', valor: 2.5 },
        { id: 'd', valor: 97.5, porQue: 'Ese es el porcentaje bajo 700.' },
      ],
      correcta: 'c',
      calcular: () => (100 - 95) / 2,
      pasos: [
        '700 = 500 + 2 · 100: está a 2 desviaciones sobre la media.',
        'Entre 300 y 700 queda el 95 %; fuera queda el 5 %, repartido en dos colas iguales.',
        'Sobre 700: 5 % : 2 = 2,5 %.',
      ],
      pista: 'Usa la regla del 95 % y la simetría de la curva.',
    },
    {
      // valor: puntaje z del mejor (0 y −1 marcan las otras respuestas)
      id: 'n4-04',
      habilidad: 'Comparar posiciones relativas',
      enunciado: 'Ana sacó 70 en una prueba con media 60 y desviación estándar 5. Bruno sacó 85 en otra con media 75 y desviación estándar 10. ¿Quién tuvo mejor posición relativa?',
      opciones: [
        { id: 'a', valor: 1, texto: 'Bruno', porQue: 'Su puntaje es mayor, pero está a solo 1 desviación sobre su media.' },
        { id: 'b', valor: 0, texto: 'Están igual', porQue: 'Ambos superan su media por 10 puntos, pero las desviaciones son distintas.' },
        { id: 'c', valor: -1, texto: 'No se puede saber', porQue: 'Con el puntaje z sí se pueden comparar.' },
        { id: 'd', valor: 2, texto: 'Ana' },
      ],
      correcta: 'd',
      calcular: () => Math.max((70 - 60) / 5, (85 - 75) / 10),
      pasos: [
        'z de Ana = (70 − 60) / 5 = 2.',
        'z de Bruno = (85 − 75) / 10 = 1.',
        'Ana está más lejos sobre su media: mejor posición relativa.',
      ],
      pista: 'Calcula el puntaje z de cada uno y compáralos.',
    },
    {
      id: 'n4-05',
      habilidad: 'Simetría',
      enunciado: 'En la normal estándar, P(Z < 1) = 0,8413. ¿Cuánto vale P(Z < −1)?',
      opciones: [
        { id: 'a', valor: 0.1587 },
        { id: 'b', valor: 0.8413, porQue: 'Por simetría, P(Z < −1) = P(Z > 1) = 1 − P(Z < 1).' },
        { id: 'c', valor: -0.8413, porQue: 'Una probabilidad nunca es negativa.' },
        { id: 'd', valor: 0.3413, porQue: 'Esa es el área entre 0 y 1.' },
      ],
      correcta: 'a',
      calcular: () => 1 - 0.8413,
      pasos: [
        'La curva es simétrica respecto de 0: P(Z < −1) = P(Z > 1).',
        'P(Z > 1) = 1 − P(Z < 1) = 1 − 0,8413.',
        'P(Z < −1) = 0,1587.',
      ],
      pista: 'El área total bajo la curva es 1 y la curva es simétrica.',
    },
    {
      // valor: extremo inferior del intervalo
      id: 'n4-06',
      habilidad: 'Intervalos de la regla empírica',
      enunciado: 'La estatura de un grupo sigue una normal con media 170 cm y desviación estándar 8 cm. ¿Entre qué valores está aproximadamente el 95 % de las estaturas?',
      opciones: [
        { id: 'a', valor: 162, texto: 'Entre 162 y 178 cm', porQue: 'Ese intervalo (±1σ) contiene cerca del 68 %.' },
        { id: 'b', valor: 154, texto: 'Entre 154 y 186 cm' },
        { id: 'c', valor: 146, texto: 'Entre 146 y 194 cm', porQue: 'Ese intervalo (±3σ) contiene cerca del 99,7 %.' },
        { id: 'd', valor: 165, texto: 'Entre 165 y 175 cm', porQue: 'No se suma un número fijo: se usan 2 desviaciones estándar.' },
      ],
      correcta: 'b',
      calcular: () => 170 - 2 * 8,
      pasos: [
        'El 95 % está entre μ − 2σ y μ + 2σ.',
        '170 − 16 = 154 y 170 + 16 = 186.',
        'Entre 154 y 186 cm.',
      ],
      pista: 'El 95 % de los datos está a dos desviaciones estándar de la media.',
    },
    {
      id: 'n4-07',
      habilidad: 'Media y simetría',
      enunciado: 'En una distribución normal, ¿qué porcentaje de los datos queda bajo la media?',
      unidad: '%',
      opciones: [
        { id: 'a', valor: 68, porQue: 'El 68 % es el que está a una desviación de la media, a ambos lados.' },
        { id: 'b', valor: 34, porQue: '34 % es solo entre la media y una desviación bajo ella.' },
        { id: 'c', valor: 50 },
        { id: 'd', valor: 100, porQue: 'También hay datos sobre la media.' },
      ],
      correcta: 'c',
      calcular: () => 100 / 2,
      pasos: [
        'La curva normal es simétrica respecto de la media.',
        'Por eso divide los datos en dos mitades iguales.',
        'Bajo la media queda el 50 %.',
      ],
      pista: 'La curva normal es simétrica respecto de la media.',
    },
    {
      id: 'n4-08',
      habilidad: 'Puntaje z negativo',
      enunciado: 'En una prueba con media 500 y desviación estándar 40, ¿cuál es el puntaje z de un estudiante que obtuvo 420?',
      opciones: [
        { id: 'a', valor: 2, porQue: 'El puntaje está bajo la media: z es negativo.' },
        { id: 'b', valor: -80, porQue: 'Falta dividir por la desviación estándar.' },
        { id: 'c', valor: 10.5, porQue: 'Dividiste el puntaje por 40; primero se resta la media.' },
        { id: 'd', valor: -2 },
      ],
      correcta: 'd',
      calcular: () => (420 - 500) / 40,
      pasos: [
        'z = (x − μ) / σ.',
        'z = (420 − 500) / 40 = −80 / 40.',
        'z = −2: está 2 desviaciones bajo la media.',
      ],
      pista: 'Resta la media al puntaje y divide por la desviación estándar; fíjate en el signo.',
    },
  ],
};
