import { Mission } from '../types';

/**
 * Misión 2.º medio — Raíces y números reales.
 * Simplificación, operaciones y racionalización de raíces, números
 * irracionales y potencias de exponente fraccionario.
 * `valor` es el número real que representa cada alternativa.
 */
export const misionRaices2m: Mission = {
  id: 'raices-2m',
  titulo: 'Raíces y números reales',
  nivel: '2.º medio',
  unidad: 'Unidad 1 · Números',
  corazonesIniciales: 3,
  xpPorCorrecta: 10,
  xpBonoCompletar: 20,
  preguntas: [
    {
      id: 'x2-01',
      habilidad: 'Simplificar raíces',
      enunciado: 'Simplifica la raíz:',
      expresion: '√12',
      opciones: [
        { id: 'a', valor: 2 * Math.sqrt(3), texto: '2√3' },
        { id: 'b', valor: 4 * Math.sqrt(3), texto: '4√3', porQue: '√12 = √(4 · 3) y √4 = 2, no 4.' },
        { id: 'c', valor: 3 * Math.sqrt(2), texto: '3√2', porQue: '3√2 = √18. Busca un cuadrado perfecto que divida a 12: el 4.' },
        { id: 'd', valor: 6, texto: '6', porQue: 'La raíz no es la mitad del número: 6² = 36, no 12.' },
      ],
      correcta: 'a',
      calcular: () => Math.sqrt(12),
      pasos: [
        'Buscamos un cuadrado perfecto que divida a 12: 12 = 4 · 3.',
        '√12 = √4 · √3.',
        '√12 = 2√3.',
      ],
      pista: 'Escribe 12 como el producto de un cuadrado perfecto por otro número.',
    },
    {
      id: 'x2-02',
      habilidad: 'Multiplicación de raíces',
      enunciado: 'Calcula el resultado:',
      expresion: '√2 · √8',
      opciones: [
        { id: 'a', valor: Math.sqrt(10), texto: '√10', porQue: 'Al multiplicar raíces se multiplican los radicandos: 2 · 8, no 2 + 8.' },
        { id: 'b', valor: 4, texto: '4' },
        { id: 'c', valor: 16, texto: '16', porQue: '16 es el radicando. Falta sacar la raíz: √16 = 4.' },
        { id: 'd', valor: 2 * Math.sqrt(2), texto: '2√2', porQue: 'Simplificaste √8, pero faltó multiplicar por √2.' },
      ],
      correcta: 'b',
      calcular: () => Math.sqrt(2) * Math.sqrt(8),
      pasos: [
        '√a · √b = √(a · b).',
        '√2 · √8 = √16.',
        '√16 = 4.',
      ],
      pista: 'Junta todo bajo una sola raíz.',
    },
    {
      id: 'x2-03',
      habilidad: 'Suma de raíces semejantes',
      enunciado: 'Calcula el resultado:',
      expresion: '3√5 + 2√5',
      opciones: [
        { id: 'a', valor: 5 * Math.sqrt(10), texto: '5√10', porQue: 'Los radicandos no se suman: √5 se mantiene, como una x en 3x + 2x.' },
        { id: 'b', valor: 6 * Math.sqrt(5), texto: '6√5', porQue: 'Multiplicaste los coeficientes. En una suma se suman: 3 + 2.' },
        { id: 'c', valor: 5 * Math.sqrt(5), texto: '5√5' },
        { id: 'd', valor: 30, texto: '6√25', porQue: 'Multiplicaste coeficientes y radicandos. Es una suma de términos semejantes.' },
      ],
      correcta: 'c',
      calcular: () => 3 * Math.sqrt(5) + 2 * Math.sqrt(5),
      pasos: [
        '3√5 y 2√5 son términos semejantes: tienen la misma raíz.',
        'Se suman los coeficientes: 3 + 2 = 5.',
        '3√5 + 2√5 = 5√5.',
      ],
      pista: 'Trata √5 como si fuera una letra.',
    },
    {
      id: 'x2-04',
      habilidad: 'Racionalización',
      enunciado: 'Racionaliza el denominador:',
      expresion: '6 / √3',
      opciones: [
        { id: 'a', valor: 6 * Math.sqrt(3), texto: '6√3', porQue: 'Multiplicaste arriba por √3, pero abajo √3 · √3 = 3: falta dividir por 3.' },
        { id: 'b', valor: 2, texto: '2', porQue: 'El numerador queda 6√3, no 6: la raíz no desaparece de arriba.' },
        { id: 'c', valor: Math.sqrt(3), texto: '√3', porQue: '6√3 : 3 = 2√3, no √3.' },
        { id: 'd', valor: 2 * Math.sqrt(3), texto: '2√3' },
      ],
      correcta: 'd',
      calcular: () => 6 / Math.sqrt(3),
      pasos: [
        'Multiplicamos numerador y denominador por √3.',
        '(6 · √3) / (√3 · √3) = 6√3 / 3.',
        '= 2√3.',
      ],
      pista: 'Amplifica la fracción por √3.',
    },
    {
      id: 'x2-05',
      habilidad: 'Números irracionales',
      enunciado: '¿Cuál de estos números es irracional?',
      opciones: [
        { id: 'a', valor: 4, texto: '√16', porQue: '√16 = 4, un número entero.' },
        { id: 'b', valor: 0.25, texto: '0,25', porQue: '0,25 es un decimal finito: es igual a 1/4.' },
        { id: 'c', valor: Math.PI, texto: 'π' },
        { id: 'd', valor: 2 / 3, texto: '2/3', porQue: '2/3 es un cociente de enteros: es racional.' },
      ],
      correcta: 'c',
      calcular: () => Math.PI,
      pasos: [
        'Un número es racional si se puede escribir como cociente de dos enteros.',
        '√16, 0,25 y 2/3 se pueden escribir así.',
        'π tiene infinitos decimales sin período: es irracional.',
      ],
      pista: '¿Cuál no se puede escribir como una fracción de enteros?',
    },
    {
      id: 'x2-06',
      habilidad: 'Exponente fraccionario',
      enunciado: 'Calcula 27 elevado a 1/3.',
      opciones: [
        { id: 'a', valor: 9, porQue: 'Dividiste 27 por 3. El exponente 1/3 indica raíz cúbica.' },
        { id: 'b', valor: 3 },
        { id: 'c', valor: 81, porQue: 'Multiplicaste por 3. El exponente 1/3 indica raíz cúbica.' },
        { id: 'd', valor: Math.sqrt(27), texto: '≈ 5,2', porQue: 'Sacaste la raíz cuadrada. El exponente 1/3 es raíz cúbica.' },
      ],
      correcta: 'b',
      calcular: () => Math.cbrt(27),
      pasos: [
        'Un exponente 1/3 equivale a la raíz cúbica.',
        'Buscamos un número que multiplicado tres veces por sí mismo dé 27.',
        '3 · 3 · 3 = 27, así que el resultado es 3.',
      ],
      pista: 'Un exponente fraccionario con denominador tres indica una raíz cúbica.',
    },
    {
      id: 'x2-07',
      habilidad: 'Raíces en geometría',
      enunciado: '¿Cuánto mide la diagonal de un cuadrado de 5 cm de lado?',
      opciones: [
        { id: 'a', valor: 5 * Math.sqrt(2), texto: '5√2 cm' },
        { id: 'b', valor: 10, texto: '10 cm', porQue: 'Sumaste dos lados. La diagonal se calcula con Pitágoras.' },
        { id: 'c', valor: 25, texto: '25 cm', porQue: '25 es el área en cm². La diagonal es √(5² + 5²).' },
        { id: 'd', valor: Math.sqrt(10), texto: '√10 cm', porQue: 'Se suman los cuadrados de los lados: 25 + 25, no 5 + 5.' },
      ],
      correcta: 'a',
      calcular: () => Math.hypot(5, 5),
      pasos: [
        'La diagonal es la hipotenusa de un triángulo con catetos de 5 cm.',
        'd² = 5² + 5² = 50.',
        'd = √50 = √(25 · 2) = 5√2 cm.',
      ],
      pista: 'Usa el teorema de Pitágoras con los dos lados.',
    },
    {
      id: 'x2-08',
      habilidad: 'Orden de números reales',
      enunciado: '¿Cuál de estos números es el mayor?',
      opciones: [
        { id: 'a', valor: 2 * Math.sqrt(3), texto: '2√3', porQue: '2√3 = √12 ≈ 3,46.' },
        { id: 'b', valor: Math.sqrt(15), texto: '√15', porQue: '√15 ≈ 3,87.' },
        { id: 'c', valor: 4, texto: '4', porQue: '4 = √16, que es menor que √18.' },
        { id: 'd', valor: 3 * Math.sqrt(2), texto: '3√2' },
      ],
      correcta: 'd',
      calcular: () => Math.max(2 * Math.sqrt(3), Math.sqrt(15), 4, 3 * Math.sqrt(2)),
      pasos: [
        'Escribimos todo como una sola raíz: 2√3 = √12, 4 = √16 y 3√2 = √18.',
        'Comparamos los radicandos: 12, 15, 16 y 18.',
        'El mayor es √18 = 3√2.',
      ],
      pista: 'Mete el coeficiente dentro de la raíz y compara los radicandos.',
    },
  ],
};
