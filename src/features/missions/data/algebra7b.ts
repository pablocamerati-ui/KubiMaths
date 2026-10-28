import { Mission } from '../types';

/**
 * Misión 4 — Expresiones algebraicas (7.º básico).
 * Lenguaje algebraico, reducción de términos semejantes y valorización.
 *
 * Cuando las alternativas son expresiones, `valor` es el resultado de
 * evaluarlas en el punto indicado en cada pregunta; así las pruebas
 * verifican que la expresión correcta sea realmente equivalente.
 */
export const misionAlgebra7b: Mission = {
  id: 'algebra-7b',
  titulo: 'Expresiones algebraicas',
  nivel: '7.º básico',
  unidad: 'Unidad 2 · Álgebra',
  corazonesIniciales: 3,
  xpPorCorrecta: 10,
  xpBonoCompletar: 20,
  preguntas: [
    {
      // Evaluado en x = 3
      id: 'a7-01',
      habilidad: 'Lenguaje algebraico',
      enunciado: '¿Qué expresión representa «el doble de un número, aumentado en 5»?',
      opciones: [
        { id: 'a', valor: 2 * 3 + 5, texto: '2x + 5' },
        { id: 'b', valor: 2 * (3 + 5), texto: '2(x + 5)', porQue: '2(x + 5) es el doble de «un número más 5». Aquí primero se duplica el número y después se suma 5.' },
        { id: 'c', valor: 3 ** 2 + 5, texto: 'x² + 5', porQue: 'x² es el cuadrado de un número, no su doble. El doble se escribe 2x.' },
        { id: 'd', valor: 2 + 5 * 3, texto: '2 + 5x', porQue: 'Se intercambiaron los números: el 2 multiplica a x y el 5 se suma.' },
      ],
      correcta: 'a',
      calcular: () => 2 * 3 + 5,
      pasos: [
        'Llamamos x al número.',
        'El doble del número es 2x.',
        'Aumentado en 5: 2x + 5.',
      ],
      pista: 'El doble de x se escribe 2x.',
    },
    {
      // Evaluado en x = 3
      id: 'a7-02',
      habilidad: 'Términos semejantes',
      enunciado: 'Reduce la expresión:',
      expresion: '3x + 5x − 2x',
      opciones: [
        { id: 'a', valor: 10 * 3, texto: '10x', porQue: 'Sumaste todos los coeficientes, pero el 2x se resta: 3 + 5 − 2 = 6.' },
        { id: 'b', valor: 6, texto: '6', porQue: 'El resultado debe conservar la variable: son 6 veces x.' },
        { id: 'c', valor: 6 * 3, texto: '6x' },
        { id: 'd', valor: 6 * 3 ** 2, texto: '6x²', porQue: 'Al sumar términos semejantes el exponente no cambia: x + x = 2x, no x².' },
      ],
      correcta: 'c',
      calcular: () => 3 * 3 + 5 * 3 - 2 * 3,
      pasos: [
        'Los tres términos tienen x, así que son semejantes.',
        'Operamos los coeficientes: 3 + 5 − 2 = 6.',
        'Resultado: 6x.',
      ],
      pista: 'Opera solo los números que acompañan a la x.',
    },
    {
      id: 'a7-03',
      habilidad: 'Valorización',
      enunciado: 'Calcula el valor de 4a − 3 cuando a = 5.',
      expresion: '4a − 3',
      opciones: [
        { id: 'a', valor: 42, porQue: '4a significa 4 · a, no el número 45. Calcula 4 · 5 − 3.' },
        { id: 'b', valor: 17 },
        { id: 'c', valor: 6, porQue: 'Sumaste 4 + 5. Entre el número y la letra hay una multiplicación.' },
        { id: 'd', valor: 23, porQue: 'Revisa el signo: es menos 3, no más 3.' },
      ],
      correcta: 'b',
      calcular: () => 4 * 5 - 3,
      pasos: [
        'Reemplazamos a por 5: 4 · 5 − 3.',
        'Primero multiplicamos: 4 · 5 = 20.',
        'Luego restamos: 20 − 3 = 17.',
      ],
      pista: 'Reemplaza la letra y recuerda que 4a es 4 por a.',
    },
    {
      // Evaluado en x = 2, y = 5
      id: 'a7-04',
      habilidad: 'Términos semejantes con dos variables',
      enunciado: 'Reduce la expresión:',
      expresion: '2x + 3y + 4x − y',
      opciones: [
        { id: 'a', valor: 6 * 2 + 4 * 5, texto: '6x + 4y', porQue: 'El último término es −y: 3y − y = 2y, no 4y.' },
        { id: 'b', valor: 8 * 2 * 5, texto: '8xy', porQue: 'Solo se pueden juntar términos con la misma letra: las x por un lado y las y por otro.' },
        { id: 'c', valor: 6 * 2 + 3 * 5, texto: '6x + 3y', porQue: 'Faltó restar la y del final: 3y − y = 2y.' },
        { id: 'd', valor: 6 * 2 + 2 * 5, texto: '6x + 2y' },
      ],
      correcta: 'd',
      calcular: () => 2 * 2 + 3 * 5 + 4 * 2 - 5,
      pasos: [
        'Agrupamos las x: 2x + 4x = 6x.',
        'Agrupamos las y: 3y − y = 2y.',
        'Resultado: 6x + 2y.',
      ],
      pista: 'Junta las x con las x y las y con las y.',
    },
    {
      // Evaluado en x = 4
      id: 'a7-05',
      habilidad: 'Expresiones en geometría',
      enunciado: 'Un rectángulo mide x cm de largo y 3 cm de ancho. ¿Qué expresión representa su perímetro?',
      opciones: [
        { id: 'a', valor: 2 * 4 + 6, texto: '2x + 6' },
        { id: 'b', valor: 4 + 3, texto: 'x + 3', porQue: 'x + 3 suma solo dos lados. El rectángulo tiene cuatro: dos largos y dos anchos.' },
        { id: 'c', valor: 3 * 4, texto: '3x', porQue: '3x es el área (largo por ancho). El perímetro es la suma de los lados.' },
        { id: 'd', valor: 2 * 4 + 3, texto: '2x + 3', porQue: 'Contaste los dos largos, pero solo un ancho. Son dos anchos: 3 + 3 = 6.' },
      ],
      correcta: 'a',
      calcular: () => 4 + 3 + 4 + 3,
      pasos: [
        'El perímetro es la suma de los cuatro lados: x + 3 + x + 3.',
        'Juntamos términos semejantes: x + x = 2x y 3 + 3 = 6.',
        'Perímetro: 2x + 6.',
      ],
      pista: 'Suma los cuatro lados del rectángulo.',
    },
    {
      id: 'a7-06',
      habilidad: 'Valorización con potencias',
      enunciado: 'Calcula el valor de 2x² cuando x = 3.',
      expresion: '2x²',
      opciones: [
        { id: 'a', valor: 36, porQue: 'Elevaste (2 · 3)². En 2x² solo la x está al cuadrado.' },
        { id: 'b', valor: 12, porQue: 'x² no es x · 2. Es x · x: 3 · 3 = 9.' },
        { id: 'c', valor: 18 },
        { id: 'd', valor: 9, porQue: 'Calculaste x² = 9, pero faltó multiplicar por 2.' },
      ],
      correcta: 'c',
      calcular: () => 2 * 3 ** 2,
      pasos: [
        'Reemplazamos: 2 · 3².',
        'Primero la potencia: 3² = 9.',
        'Luego multiplicamos: 2 · 9 = 18.',
      ],
      pista: 'Primero calcula la potencia y después multiplica.',
    },
    {
      // Evaluado en x = 3
      id: 'a7-07',
      habilidad: 'Lenguaje algebraico',
      enunciado: '¿Qué expresión reducida representa «un número aumentado en su triple»?',
      opciones: [
        { id: 'a', valor: 3 * 3, texto: '3x', porQue: '3x es solo el triple. Falta sumarle el número: x + 3x.' },
        { id: 'b', valor: 4 * 3, texto: '4x' },
        { id: 'c', valor: 3 + 3, texto: 'x + 3', porQue: 'x + 3 es el número aumentado en 3, no en su triple.' },
        { id: 'd', valor: 3 ** 3, texto: 'x³', porQue: 'x³ es el cubo (x · x · x). El triple es 3x.' },
      ],
      correcta: 'b',
      calcular: () => 3 + 3 * 3,
      pasos: [
        'El número es x y su triple es 3x.',
        'Aumentado en su triple: x + 3x.',
        'Reducimos: x + 3x = 4x.',
      ],
      pista: 'Escribe primero «el número» y «su triple» por separado.',
    },
    {
      // Evaluado en p = 4.000
      id: 'a7-08',
      habilidad: 'Expresiones en contexto',
      enunciado:
        'Una entrada al cine cuesta $p. Tres amigos compran una entrada cada uno y, además, unas cabritas de $2.500 para compartir. ¿Qué expresión representa el total?',
      opciones: [
        { id: 'a', valor: 3 * (4000 + 2500), texto: '3(p + 2.500)', porQue: 'Así se pagarían tres cabritas. Compraron solo una para compartir.' },
        { id: 'b', valor: 3 * 4000 + 2500, texto: '3p + 2.500' },
        { id: 'c', valor: 4000 + 7500, texto: 'p + 7.500', porQue: 'Se multiplicó por 3 el precio de las cabritas en vez de las entradas.' },
        { id: 'd', valor: 3 + 4000 + 2500, texto: '3 + p + 2.500', porQue: 'Tres entradas son 3 · p, no 3 + p.' },
      ],
      correcta: 'b',
      calcular: () => 3 * 4000 + 2500,
      pasos: [
        'Tres entradas cuestan 3 · p = 3p.',
        'Se agrega una sola cabrita: + 2.500.',
        'Total: 3p + 2.500.',
      ],
      pista: 'Primero el total de las entradas y luego suma las cabritas.',
    },
  ],
};
