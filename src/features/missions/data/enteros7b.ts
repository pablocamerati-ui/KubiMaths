import { Mission } from '../types';

/**
 * Misión 1 — Números enteros (7.º básico).
 * Basada en los objetivos de 7.º básico: orden, valor absoluto, adición y
 * sustracción de números enteros, y su uso en contextos cotidianos.
 */
export const misionEnteros7b: Mission = {
  id: 'enteros-7b',
  titulo: 'Números enteros',
  nivel: '7.º básico',
  unidad: 'Unidad 1 · Números',
  corazonesIniciales: 3,
  xpPorCorrecta: 10,
  xpBonoCompletar: 20,
  preguntas: [
    {
      id: 'e7-01',
      habilidad: 'Adición de enteros de distinto signo',
      enunciado: 'Calcula el resultado:',
      expresion: '−7 + 4',
      opciones: [
        { id: 'a', valor: -3 },
        { id: 'b', valor: 3, porQue: 'El resultado lleva el signo del número con mayor valor absoluto, que es −7.' },
        { id: 'c', valor: -11, porQue: 'Sumaste los valores absolutos, pero los signos son distintos: hay que restarlos.' },
        { id: 'd', valor: 11, porQue: 'Sumaste 7 y 4 sin considerar que −7 es negativo.' },
      ],
      correcta: 'a',
      calcular: () => -7 + 4,
      pasos: [
        'Los signos son distintos, así que restamos los valores absolutos: 7 − 4 = 3.',
        'El resultado lleva el signo del número con mayor valor absoluto: −7.',
        'Por lo tanto, −7 + 4 = −3.',
      ],
      pista: 'Imagina que debes 7 y pagas 4. ¿Cuánto sigues debiendo?',
    },
    {
      id: 'e7-02',
      habilidad: 'Sustracción de enteros',
      enunciado: 'Calcula el resultado:',
      expresion: '−5 − (−8)',
      opciones: [
        { id: 'a', valor: -13, porQue: 'Restar un negativo equivale a sumar su opuesto: −5 − (−8) = −5 + 8.' },
        { id: 'b', valor: 3 },
        { id: 'c', valor: -3, porQue: 'Cuidado con el signo final: 8 tiene mayor valor absoluto que 5, así que el resultado es positivo.' },
        { id: 'd', valor: 13, porQue: 'Sumaste 5 y 8, pero −5 es negativo: el cálculo es −5 + 8.' },
      ],
      correcta: 'b',
      calcular: () => -5 - -8,
      pasos: [
        'Restar un número es sumar su opuesto: −5 − (−8) = −5 + 8.',
        'Signos distintos: 8 − 5 = 3, con el signo de 8 (positivo).',
        'Por lo tanto, −5 − (−8) = 3.',
      ],
      pista: 'Restar un número negativo es lo mismo que sumar su opuesto.',
    },
    {
      id: 'e7-03',
      habilidad: 'Orden en los números enteros',
      enunciado: '¿Cuál de estos números es el mayor?',
      opciones: [
        { id: 'a', valor: -12, porQue: 'Entre negativos, el mayor es el más cercano al cero. −12 está lejos del cero.' },
        { id: 'b', valor: -15, porQue: '−15 es el menor de todos: es el que está más a la izquierda en la recta numérica.' },
        { id: 'c', valor: -3 },
        { id: 'd', valor: -8, porQue: '−8 está más a la izquierda que −3 en la recta numérica, por lo que es menor.' },
      ],
      correcta: 'c',
      calcular: () => Math.max(-12, -15, -3, -8),
      pasos: [
        'En la recta numérica, un número es mayor mientras más a la derecha esté.',
        'Entre los negativos, el más cercano al cero es el mayor.',
        'De −12, −15, −3 y −8, el más cercano al cero es −3.',
      ],
      pista: 'Ubica los números en la recta numérica: el mayor es el que queda más a la derecha.',
    },
    {
      id: 'e7-04',
      habilidad: 'Valor absoluto',
      enunciado: '¿Cuál es el valor absoluto de −9?',
      expresion: '|−9|',
      opciones: [
        { id: 'a', valor: -9, porQue: 'El valor absoluto es una distancia, y las distancias nunca son negativas.' },
        { id: 'b', valor: 0, porQue: 'El valor absoluto de un número solo es 0 cuando el número es 0.' },
        { id: 'c', valor: 1, porQue: 'El valor absoluto mide la distancia al cero, no el inverso del número.' },
        { id: 'd', valor: 9 },
      ],
      correcta: 'd',
      calcular: () => Math.abs(-9),
      pasos: [
        'El valor absoluto es la distancia entre un número y el cero en la recta numérica.',
        '−9 está a 9 unidades del cero.',
        'Por lo tanto, |−9| = 9.',
      ],
      pista: '¿A cuántos pasos del cero está el −9?',
    },
    {
      id: 'e7-05',
      habilidad: 'Adición de enteros en contexto',
      enunciado:
        'A las 6:00 la temperatura en Punta Arenas era de −4 °C. Al mediodía había subido 9 °C. ¿Qué temperatura marcaba al mediodía?',
      unidad: '°C',
      opciones: [
        { id: 'a', valor: 5 },
        { id: 'b', valor: -13, porQue: 'La temperatura subió, así que hay que sumar 9: −4 + 9.' },
        { id: 'c', valor: 13, porQue: 'Sumaste 4 y 9, pero la temperatura inicial era −4, no 4.' },
        { id: 'd', valor: -5, porQue: 'Revisa el signo: al subir 9 grados desde −4 se pasa por el cero y se llega a un positivo.' },
      ],
      correcta: 'a',
      calcular: () => -4 + 9,
      pasos: [
        'Subir 9 °C significa sumar 9: −4 + 9.',
        'Signos distintos: 9 − 4 = 5, con el signo de 9 (positivo).',
        'Al mediodía marcaba 5 °C.',
      ],
      pista: 'Desde −4, cuenta 4 grados para llegar a 0. ¿Cuántos grados te quedan por subir?',
    },
    {
      id: 'e7-06',
      habilidad: 'Sustracción de enteros en contexto',
      enunciado:
        'Un día de invierno en Calama, la temperatura máxima fue 12 °C y la mínima −5 °C. ¿Cuál fue la diferencia entre ambas?',
      unidad: '°C',
      opciones: [
        { id: 'a', valor: 7, porQue: 'Restaste 12 − 5, pero la mínima es −5: la diferencia es 12 − (−5).' },
        { id: 'b', valor: -17, porQue: 'Una diferencia de temperatura entre la máxima y la mínima se expresa como positiva.' },
        { id: 'c', valor: 17 },
        { id: 'd', valor: -7, porQue: 'Calcula 12 − (−5): restar un negativo es sumar su opuesto.' },
      ],
      correcta: 'c',
      calcular: () => 12 - -5,
      pasos: [
        'La diferencia es la máxima menos la mínima: 12 − (−5).',
        'Restar −5 es sumar 5: 12 + 5 = 17.',
        'La diferencia fue de 17 °C.',
      ],
      pista: 'Cuenta cuántos grados hay desde −5 hasta 0, y luego desde 0 hasta 12.',
    },
    {
      id: 'e7-07',
      habilidad: 'Recta numérica',
      enunciado: 'En la recta numérica, ¿qué número está 6 unidades a la izquierda del 2?',
      opciones: [
        { id: 'a', valor: 8, porQue: 'Moverse a la izquierda es restar. Sumar 6 te lleva hacia la derecha.' },
        { id: 'b', valor: -4 },
        { id: 'c', valor: 4, porQue: 'Desde el 2, al avanzar 6 unidades a la izquierda se pasa el cero.' },
        { id: 'd', valor: -6, porQue: 'Partimos desde el 2, no desde el 0: 2 − 6.' },
      ],
      correcta: 'b',
      calcular: () => 2 - 6,
      pasos: [
        'Moverse hacia la izquierda en la recta numérica es restar.',
        '2 − 6: con 2 pasos llegamos al 0 y nos faltan 4 más.',
        'Llegamos a −4.',
      ],
      pista: 'Avanza desde el 2 hasta el 0. ¿Cuántos pasos te faltan?',
    },
    {
      id: 'e7-08',
      habilidad: 'Operaciones combinadas en contexto',
      enunciado:
        'Un buzo está a 18 m bajo el nivel del mar (−18 m). Sube 7 m y luego baja 5 m. ¿En qué posición queda?',
      unidad: 'm',
      opciones: [
        { id: 'a', valor: -6, porQue: 'Al bajar 5 m hay que restar: −18 + 7 − 5.' },
        { id: 'b', valor: -20, porQue: 'Subir 7 m es sumar 7, no restar: −18 + 7 − 5.' },
        { id: 'c', valor: -30, porQue: 'Restaste los dos movimientos, pero subir 7 m significa sumar.' },
        { id: 'd', valor: -16 },
      ],
      correcta: 'd',
      calcular: () => -18 + 7 - 5,
      pasos: [
        'Subir es sumar y bajar es restar: −18 + 7 − 5.',
        'Primero −18 + 7 = −11.',
        'Luego −11 − 5 = −16. El buzo queda a −16 m.',
      ],
      pista: 'Haz los movimientos de a uno: primero sube y después baja.',
    },
  ],
};
