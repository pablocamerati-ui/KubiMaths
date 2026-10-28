import { Mission } from '../types';

/**
 * Misión 1.º medio — Potencias de exponente entero.
 * Exponentes negativos, base fraccionaria, propiedades, notación
 * científica y crecimiento exponencial.
 */
export const misionPotencias1m: Mission = {
  id: 'potencias-1m',
  titulo: 'Potencias de exponente entero',
  nivel: '1.º medio',
  unidad: 'Unidad 1 · Números',
  corazonesIniciales: 3,
  xpPorCorrecta: 10,
  xpBonoCompletar: 20,
  preguntas: [
    {
      id: 'p1-01',
      habilidad: 'Exponente negativo',
      enunciado: 'Calcula el valor de la potencia:',
      expresion: '2⁻³',
      opciones: [
        { id: 'a', valor: -8, texto: '−8', porQue: 'Un exponente negativo no hace negativo el resultado: indica que se invierte la base.' },
        { id: 'b', valor: 1 / 8, texto: '1/8' },
        { id: 'c', valor: -6, texto: '−6', porQue: 'Multiplicaste base por exponente. La potencia no es una multiplicación simple.' },
        { id: 'd', valor: 8, texto: '8', porQue: '8 es 2³. El exponente negativo indica que hay que invertir: 1/2³.' },
      ],
      correcta: 'b',
      calcular: () => 2 ** -3,
      pasos: [
        'Un exponente negativo significa invertir: 2⁻³ = 1/2³.',
        '2³ = 8.',
        '2⁻³ = 1/8.',
      ],
      pista: 'Un exponente negativo significa invertir la base.',
    },
    {
      id: 'p1-02',
      habilidad: 'Potencia de una fracción',
      enunciado: 'Calcula el valor de la potencia:',
      expresion: '(2/3)²',
      opciones: [
        { id: 'a', valor: 4 / 9, texto: '4/9' },
        { id: 'b', valor: 4 / 3, texto: '4/3', porQue: 'Elevaste solo el numerador. También se eleva el denominador.' },
        { id: 'c', valor: 2 / 9, texto: '2/9', porQue: 'Elevaste solo el denominador. También se eleva el numerador.' },
        { id: 'd', valor: 4 / 6, texto: '4/6', porQue: 'Multiplicaste por 2 en vez de elevar al cuadrado: 4/6 = 2/3, la misma fracción.' },
      ],
      correcta: 'a',
      calcular: () => (2 / 3) ** 2,
      pasos: [
        'Se eleva numerador y denominador.',
        '2² = 4 y 3² = 9.',
        '(2/3)² = 4/9.',
      ],
      pista: 'Eleva el numerador y también el denominador.',
    },
    {
      id: 'p1-03',
      habilidad: 'Inverso multiplicativo',
      enunciado: 'Calcula el valor de la potencia:',
      expresion: '(3/5)⁻¹',
      opciones: [
        { id: 'a', valor: -3 / 5, texto: '−3/5', porQue: 'El exponente −1 no cambia el signo: invierte la fracción.' },
        { id: 'b', valor: -5 / 3, texto: '−5/3', porQue: 'Invertiste bien, pero el signo no cambia: la base es positiva.' },
        { id: 'c', valor: 5 / 3, texto: '5/3' },
        { id: 'd', valor: 3 / 5, texto: '3/5', porQue: 'Faltó invertir. Una potencia con exponente −1 es el inverso.' },
      ],
      correcta: 'c',
      calcular: () => (3 / 5) ** -1,
      pasos: [
        'El exponente −1 indica el inverso multiplicativo.',
        'Se intercambian numerador y denominador.',
        '(3/5)⁻¹ = 5/3.',
      ],
      pista: 'El exponente −1 da vuelta la fracción.',
    },
    {
      id: 'p1-04',
      habilidad: 'Potencias de 10',
      enunciado: 'Calcula el valor de la potencia:',
      expresion: '10⁻²',
      opciones: [
        { id: 'a', valor: -20, porQue: 'Multiplicaste base por exponente. 10⁻² = 1/10².' },
        { id: 'b', valor: -100, porQue: 'El exponente negativo no hace negativo el resultado: invierte la base.' },
        { id: 'c', valor: 0.1, porQue: '0,1 es 10⁻¹. Con exponente −2 son dos lugares decimales.' },
        { id: 'd', valor: 0.01 },
      ],
      correcta: 'd',
      calcular: () => 1 / 10 ** 2,
      pasos: [
        '10⁻² = 1/10².',
        '10² = 100.',
        '1/100 = 0,01.',
      ],
      pista: '10⁻² es 1 dividido por 10².',
    },
    {
      // valor: expresión evaluada en a = 2
      id: 'p1-05',
      habilidad: 'Propiedades con exponentes negativos',
      enunciado: 'Escribe como una sola potencia:',
      expresion: 'a⁵ · a⁻³',
      opciones: [
        { id: 'a', valor: 2 ** 8, texto: 'a⁸', porQue: 'Restaste mal los signos: 5 + (−3) = 2, no 8.' },
        { id: 'b', valor: 2 ** 2, texto: 'a²' },
        { id: 'c', valor: 2 ** -15, texto: 'a⁻¹⁵', porQue: 'Multiplicaste los exponentes. Al multiplicar potencias de igual base se suman.' },
        { id: 'd', valor: 2 ** -2, texto: 'a⁻²', porQue: 'Revisa el signo: 5 + (−3) = 2, positivo.' },
      ],
      correcta: 'b',
      calcular: () => 2 ** 5 * 2 ** -3,
      pasos: [
        'Misma base: se suman los exponentes.',
        '5 + (−3) = 2.',
        'a⁵ · a⁻³ = a².',
      ],
      pista: 'Al multiplicar potencias de igual base, se suman los exponentes (con su signo).',
    },
    {
      // valor: el número que representa cada escritura
      id: 'p1-06',
      habilidad: 'Notación científica',
      enunciado: '¿Cómo se escribe 0,00042 en notación científica?',
      opciones: [
        { id: 'a', valor: 42000, texto: '4,2 · 10⁴', porQue: 'Un exponente positivo agranda el número. Aquí el número es menor que 1.' },
        { id: 'b', valor: 0.0042, texto: '4,2 · 10⁻³', porQue: 'Corriste la coma tres lugares; son cuatro: 0,00042 → 4,2.' },
        { id: 'c', valor: 0.00042, texto: '4,2 · 10⁻⁴' },
        { id: 'd', valor: 0.000042, texto: '4,2 · 10⁻⁵', porQue: 'Corriste la coma cinco lugares; son cuatro.' },
      ],
      correcta: 'c',
      calcular: () => 0.00042,
      pasos: [
        'Movemos la coma hasta dejar una cifra entera: 4,2.',
        'La coma se movió 4 lugares a la derecha.',
        '0,00042 = 4,2 · 10⁻⁴.',
      ],
      pista: 'Cuenta cuántos lugares mueves la coma para obtener 4,2.',
    },
    {
      id: 'p1-07',
      habilidad: 'Crecimiento exponencial',
      enunciado: 'Una población de bacterias se duplica cada hora. Si al inicio hay 1, ¿cuántas habrá después de 10 horas?',
      opciones: [
        { id: 'a', valor: 20, porQue: 'Multiplicaste 2 · 10. La población se duplica cada hora: es 2 multiplicado diez veces.' },
        { id: 'b', valor: 1024 },
        { id: 'c', valor: 100, porQue: '100 es 10². Aquí la base es 2 y el exponente es 10.' },
        { id: 'd', valor: 512, porQue: '512 es 2⁹: contaste una hora menos.' },
      ],
      correcta: 'b',
      calcular: () => 2 ** 10,
      pasos: [
        'Cada hora se multiplica por 2.',
        'Después de 10 horas: 2¹⁰.',
        '2¹⁰ = 1.024 bacterias.',
      ],
      pista: 'Se multiplica por 2 una vez por cada hora.',
    },
    {
      id: 'p1-08',
      habilidad: 'Base negativa',
      enunciado: 'Calcula el valor de la potencia:',
      expresion: '(−2)⁴',
      opciones: [
        { id: 'a', valor: -16, porQue: 'Con base negativa y exponente par, el resultado es positivo.' },
        { id: 'b', valor: 8, porQue: 'Multiplicaste base por exponente. Es (−2) multiplicado cuatro veces.' },
        { id: 'c', valor: -8, porQue: 'Multiplicaste base por exponente y el signo también falla.' },
        { id: 'd', valor: 16 },
      ],
      correcta: 'd',
      calcular: () => (-2) ** 4,
      pasos: [
        '(−2)⁴ = (−2) · (−2) · (−2) · (−2).',
        'Hay cuatro factores negativos: una cantidad par, el resultado es positivo.',
        '(−2)⁴ = 16.',
      ],
      pista: 'Cuenta los factores negativos: ¿es una cantidad par o impar?',
    },
  ],
};
