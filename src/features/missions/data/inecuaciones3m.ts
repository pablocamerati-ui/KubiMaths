import { Mission } from '../types';

/**
 * Misión 3.º medio — Inecuaciones y sistemas.
 * Inecuaciones lineales, cambio de sentido al dividir por un negativo,
 * intervalos, sistemas de inecuaciones, valor absoluto y problemas.
 *
 * Códigos de `valor` cuando la alternativa es una desigualdad:
 *   «x < a» = −1000 + a, «x > a» = 1000 + a, «x ≤ a» = −2000 + a, «x ≥ a» = 2000 + a.
 * Cuando la alternativa es un intervalo, el código se indica en cada pregunta.
 */
const menor = (a: number) => -1000 + a;
const mayor = (a: number) => 1000 + a;
const menorIgual = (a: number) => -2000 + a;
const mayorIgual = (a: number) => 2000 + a;

export const misionInecuaciones3m: Mission = {
  id: 'inecuaciones-3m',
  titulo: 'Inecuaciones y sistemas',
  nivel: '3.º medio',
  unidad: 'Unidad 2 · Álgebra y funciones',
  corazonesIniciales: 3,
  xpPorCorrecta: 10,
  xpBonoCompletar: 20,
  preguntas: [
    {
      id: 'i3-01',
      habilidad: 'Inecuaciones lineales',
      enunciado: 'Resuelve la inecuación:',
      expresion: '3x − 5 > 7',
      opciones: [
        { id: 'a', valor: menor(4), texto: 'x < 4', porQue: 'Dividiste por 3, que es positivo: el sentido no cambia.' },
        { id: 'b', valor: mayor(4), texto: 'x > 4' },
        { id: 'c', valor: mayor(2 / 3), texto: 'x > 2/3', porQue: 'Restaste 5 en vez de sumarlo: 3x > 12.' },
        { id: 'd', valor: mayor(12), texto: 'x > 12', porQue: 'Falta dividir por 3.' },
      ],
      correcta: 'b',
      calcular: () => mayor((7 + 5) / 3),
      pasos: [
        'Sumamos 5 a ambos lados: 3x > 12.',
        'Dividimos por 3 (positivo, el sentido se mantiene).',
        'x > 4.',
      ],
      pista: 'Despeja como en una ecuación y fíjate si divides por un número negativo.',
    },
    {
      id: 'i3-02',
      habilidad: 'Inecuaciones con negativos',
      enunciado: 'Resuelve la inecuación:',
      expresion: '−2x + 1 ≤ 9',
      opciones: [
        { id: 'a', valor: menorIgual(-4), texto: 'x ≤ −4', porQue: 'Al dividir por −2 el sentido de la desigualdad se invierte.' },
        { id: 'b', valor: mayorIgual(4), texto: 'x ≥ 4', porQue: 'Revisa el signo: 8 / (−2) = −4.' },
        { id: 'c', valor: mayorIgual(-4), texto: 'x ≥ −4' },
        { id: 'd', valor: mayorIgual(-5), texto: 'x ≥ −5', porQue: 'El 1 se resta: −2x ≤ 8, no −2x ≤ 10.' },
      ],
      correcta: 'c',
      calcular: () => mayorIgual((9 - 1) / -2),
      pasos: [
        'Restamos 1: −2x ≤ 8.',
        'Dividimos por −2 e invertimos el sentido: x ≥ −4.',
        'Solución: x ≥ −4.',
      ],
      pista: 'Si divides por un número negativo, el sentido de la desigualdad cambia.',
    },
    {
      // valor: 1 = [−2, 5[, 2 = ]−2, 5], 3 = [−2, 5], 4 = ]−2, 5[
      id: 'i3-03',
      habilidad: 'Intervalos',
      enunciado: '¿Qué intervalo representa los números que cumplen −2 ≤ x < 5?',
      opciones: [
        { id: 'a', valor: 2, texto: ']−2, 5]', porQue: 'Los corchetes están al revés: −2 se incluye y 5 no.' },
        { id: 'b', valor: 1, texto: '[−2, 5[' },
        { id: 'c', valor: 3, texto: '[−2, 5]', porQue: 'El 5 no se incluye, porque la desigualdad es estricta (<).' },
        { id: 'd', valor: 4, texto: ']−2, 5[', porQue: 'El −2 sí se incluye, porque la desigualdad es ≤.' },
      ],
      correcta: 'b',
      calcular: () => 1,
      pasos: [
        '≤ incluye el extremo: corchete cerrado hacia adentro, [−2.',
        '< no incluye el extremo: corchete abierto hacia afuera, 5[.',
        'Intervalo: [−2, 5[.',
      ],
      pista: 'Revisa en cada extremo si el número se incluye o no.',
    },
    {
      // valor: 1 = ]2, 6], 2 = [2, 6], 3 = ]2, 6[, 4 = ]−∞, 6]
      id: 'i3-04',
      habilidad: 'Sistemas de inecuaciones',
      enunciado: 'Resuelve el sistema: x + 3 > 5 y 2x ≤ 12.',
      opciones: [
        { id: 'a', valor: 2, texto: '[2, 6]', porQue: 'x > 2 es estricta: el 2 no se incluye.' },
        { id: 'b', valor: 3, texto: ']2, 6[', porQue: '2x ≤ 12 incluye x = 6.' },
        { id: 'c', valor: 4, texto: ']−∞, 6]', porQue: 'Falta la otra condición: x debe ser mayor que 2.' },
        { id: 'd', valor: 1, texto: ']2, 6]' },
      ],
      correcta: 'd',
      calcular: () => ((5 - 3) === 2 && 12 / 2 === 6 ? 1 : 0),
      pasos: [
        'Primera: x > 5 − 3, es decir, x > 2.',
        'Segunda: x ≤ 12 / 2, es decir, x ≤ 6.',
        'Ambas a la vez: 2 < x ≤ 6, el intervalo ]2, 6].',
      ],
      pista: 'Resuelve cada inecuación por separado y busca los números que cumplen ambas.',
    },
    {
      id: 'i3-05',
      habilidad: 'Soluciones enteras',
      enunciado: '¿Cuántos números enteros cumplen −3 < x ≤ 4?',
      opciones: [
        { id: 'a', valor: 8, porQue: 'Contaste el −3, pero la desigualdad es estricta en ese extremo.' },
        { id: 'b', valor: 7 },
        { id: 'c', valor: 6, porQue: 'Dejaste fuera el 4, pero x ≤ 4 lo incluye.' },
        { id: 'd', valor: 9, porQue: 'Revisa la lista: −2, −1, 0, 1, 2, 3 y 4.' },
      ],
      correcta: 'b',
      calcular: () => {
        let c = 0;
        for (let x = -10; x <= 10; x++) if (-3 < x && x <= 4) c++;
        return c;
      },
      pasos: [
        'El −3 no se incluye y el 4 sí.',
        'Los enteros son −2, −1, 0, 1, 2, 3 y 4.',
        'Son 7 números.',
      ],
      pista: 'Escribe la lista de enteros, cuidando qué extremos se incluyen.',
    },
    {
      // valor: 1 = ]1, 5[, 2 = ]−1, 5[, 3 = ]−∞, 5[, 4 = [1, 5]
      id: 'i3-06',
      habilidad: 'Valor absoluto',
      enunciado: '¿Qué números cumplen |x − 3| < 2?',
      opciones: [
        { id: 'a', valor: 2, texto: ']−1, 5[', porQue: 'El extremo izquierdo es 3 − 2 = 1, no −1.' },
        { id: 'b', valor: 3, texto: ']−∞, 5[', porQue: 'El valor absoluto pone un límite por ambos lados: x también debe ser mayor que 1.' },
        { id: 'c', valor: 1, texto: ']1, 5[' },
        { id: 'd', valor: 4, texto: '[1, 5]', porQue: 'La desigualdad es estricta (<): los extremos no se incluyen.' },
      ],
      correcta: 'c',
      calcular: () => (3 - 2 === 1 && 3 + 2 === 5 ? 1 : 0),
      pasos: [
        '|x − 3| < 2 significa que x está a menos de 2 unidades del 3.',
        '−2 < x − 3 < 2, es decir, 1 < x < 5.',
        'Intervalo: ]1, 5[.',
      ],
      pista: 'El valor absoluto mide la distancia al número que se resta.',
    },
    {
      id: 'i3-07',
      habilidad: 'Inecuaciones en contexto',
      enunciado: 'Un plan de celular cobra $8.000 fijos más $50 por cada MB extra. Si quieres gastar como máximo $13.000, ¿cuántos MB extra puedes usar como máximo?',
      unidad: 'MB',
      opciones: [
        { id: 'a', valor: 260, porQue: 'Dividiste los $13.000 completos. Primero resta el cargo fijo.' },
        { id: 'b', valor: 160, porQue: 'Dividiste el cargo fijo por 50. Se divide lo que queda después del cargo fijo.' },
        { id: 'c', valor: 99, porQue: 'Con 100 MB gastas exactamente $13.000, y eso está permitido (como máximo).' },
        { id: 'd', valor: 100 },
      ],
      correcta: 'd',
      calcular: () => Math.floor((13000 - 8000) / 50),
      pasos: [
        'Planteamos: 8.000 + 50x ≤ 13.000.',
        '50x ≤ 5.000.',
        'x ≤ 100: como máximo 100 MB.',
      ],
      pista: 'Plantea una inecuación con el cargo fijo más el costo por MB.',
    },
    {
      id: 'i3-08',
      habilidad: 'Inecuaciones en contexto',
      enunciado: 'Catalina tiene notas 5,0 y 4,5. ¿Qué nota mínima necesita en la tercera para que su promedio sea al menos 5,0?',
      opciones: [
        { id: 'a', valor: 5, porQue: 'Con un 5,0 el promedio es 4,83. La tercera nota debe compensar el 4,5.' },
        { id: 'b', valor: 5.5 },
        { id: 'c', valor: 4.75, porQue: 'Ese es el promedio de las dos primeras notas.' },
        { id: 'd', valor: 6, porQue: 'Con un 6,0 lo logra, pero no es la nota mínima.' },
      ],
      correcta: 'b',
      calcular: () => 3 * 5 - (5 + 4.5),
      pasos: [
        'Planteamos: (5,0 + 4,5 + x) / 3 ≥ 5,0.',
        '9,5 + x ≥ 15.',
        'x ≥ 5,5: necesita al menos un 5,5.',
      ],
      pista: 'Plantea el promedio de las tres notas mayor o igual que la meta.',
    },
  ],
};
