import { Mission } from '../types';

/**
 * Misión 4.º medio — Función logarítmica.
 * Evaluar, dominio, inversa de la exponencial, propiedades, ecuaciones y
 * escalas logarítmicas (pH, Richter).
 */
export const misionLogaritmica4m: Mission = {
  id: 'logaritmica-4m',
  titulo: 'Función logarítmica',
  nivel: '4.º medio',
  unidad: 'Unidad 2 · Álgebra y funciones',
  corazonesIniciales: 3,
  xpPorCorrecta: 10,
  xpBonoCompletar: 20,
  preguntas: [
    {
      id: 'l4-01',
      habilidad: 'Evaluar un logaritmo',
      enunciado: 'Si f(x) = log₂ x, ¿cuánto vale f(32)?',
      opciones: [
        { id: 'a', valor: 16, porQue: '32 : 2 = 16, pero el logaritmo es un exponente.' },
        { id: 'b', valor: 5 },
        { id: 'c', valor: 6, porQue: '2⁶ = 64, no 32.' },
        { id: 'd', valor: 4, porQue: '2⁴ = 16, no 32.' },
      ],
      correcta: 'b',
      calcular: () => Math.log2(32),
      pasos: [
        'Buscamos el exponente y tal que 2ʸ = 32.',
        '2 · 2 · 2 · 2 · 2 = 32.',
        'f(32) = 5.',
      ],
      pista: 'Pregúntate a qué exponente hay que elevar la base para obtener el número.',
    },
    {
      // valor: límite del dominio (3,5 marca «x ≥ 3»)
      id: 'l4-02',
      habilidad: 'Dominio',
      enunciado: '¿Cuál es el dominio de f(x) = log(x − 3)?',
      opciones: [
        { id: 'a', valor: 0, texto: 'x > 0', porQue: 'Debe ser positivo el argumento x − 3, no solo x.' },
        { id: 'b', valor: 3.5, texto: 'x ≥ 3', porQue: 'En x = 3 el argumento vale 0, y log 0 no existe.' },
        { id: 'c', valor: 3, texto: 'x > 3' },
        { id: 'd', valor: -3, texto: 'x > −3', porQue: 'Despeja bien: x − 3 > 0 da x > 3.' },
      ],
      correcta: 'c',
      calcular: () => 0 + 3,
      pasos: [
        'Solo existe el logaritmo de números positivos.',
        'x − 3 > 0.',
        'Dominio: x > 3.',
      ],
      pista: 'El argumento de un logaritmo debe ser mayor que cero.',
    },
    {
      // valor: 1 = log₂ x; los demás marcan otras funciones
      id: 'l4-03',
      habilidad: 'Inversa de la exponencial',
      enunciado: '¿Cuál es la función inversa de f(x) = 2ˣ?',
      opciones: [
        { id: 'a', valor: 1, texto: 'log₂ x' },
        { id: 'b', valor: 2, texto: 'x²', porQue: 'x² es la inversa de √x (para x ≥ 0), no de 2ˣ.' },
        { id: 'c', valor: 3, texto: '1/2ˣ', porQue: 'Ese es el recíproco, no la función inversa.' },
        { id: 'd', valor: 4, texto: 'x/2', porQue: 'Dividir por 2 deshace multiplicar por 2, no elevar 2 a x.' },
      ],
      correcta: 'a',
      calcular: () => (Math.log2(2 ** 5) === 5 ? 1 : 0),
      pasos: [
        'Si y = 2ˣ, para despejar x se aplica logaritmo en base 2.',
        'x = log₂ y.',
        'La inversa es f⁻¹(x) = log₂ x.',
      ],
      pista: 'La inversa deshace lo que hace la función: ¿qué operación recupera el exponente?',
    },
    {
      id: 'l4-04',
      habilidad: 'Propiedades de los logaritmos',
      enunciado: 'Calcula usando propiedades:',
      expresion: 'log 4 + log 25',
      opciones: [
        { id: 'a', valor: 29, porQue: 'Se suman los logaritmos, no los números.' },
        { id: 'b', valor: Math.log10(29), texto: 'log 29', porQue: 'log a + log b = log(a · b), no log(a + b).' },
        { id: 'c', valor: 100, porQue: '100 es el argumento; falta calcular su logaritmo.' },
        { id: 'd', valor: 2 },
      ],
      correcta: 'd',
      calcular: () => Math.log10(4) + Math.log10(25),
      pasos: [
        'log a + log b = log(a · b).',
        'log 4 + log 25 = log 100.',
        'log 100 = 2, porque 10² = 100.',
      ],
      pista: 'Usa la propiedad del logaritmo de un producto.',
    },
    {
      id: 'l4-05',
      habilidad: 'Ecuación logarítmica',
      enunciado: 'Resuelve: log₃ x = 4.',
      opciones: [
        { id: 'a', valor: 12, porQue: '3 · 4 = 12; la definición dice 3⁴ = x.' },
        { id: 'b', valor: 81 },
        { id: 'c', valor: 64, porQue: '4³ = 64, pero la base es 3 y el exponente 4.' },
        { id: 'd', valor: 7, porQue: 'Sumaste 3 + 4; hay que elevar la base al exponente.' },
      ],
      correcta: 'b',
      calcular: () => 3 ** 4,
      pasos: [
        'log₃ x = 4 significa 3⁴ = x.',
        '3 · 3 · 3 · 3.',
        'x = 81.',
      ],
      pista: 'Escribe la igualdad en forma de potencia.',
    },
    {
      id: 'l4-06',
      habilidad: 'Ecuación con dos logaritmos',
      enunciado: 'Resuelve: log x + log(x − 3) = 1.',
      opciones: [
        { id: 'a', valor: -2, texto: 'x = −2', porQue: 'Con x = −2 el argumento es negativo y el logaritmo no existe.' },
        { id: 'b', valor: 3, texto: 'x = 5 y x = −2', porQue: 'x = −2 se descarta: log(−2) no existe.' },
        { id: 'c', valor: 5, texto: 'x = 5' },
        { id: 'd', valor: 10, texto: 'x = 10', porQue: 'x(x − 3) = 10 no significa que x valga 10.' },
      ],
      correcta: 'c',
      calcular: () => (3 + Math.sqrt(9 + 40)) / 2,
      pasos: [
        'log[x(x − 3)] = 1, así que x(x − 3) = 10.',
        'x² − 3x − 10 = 0 → (x − 5)(x + 2) = 0.',
        'x = −2 no sirve (argumento negativo): x = 5.',
      ],
      pista: 'Junta los logaritmos en uno solo y revisa que los argumentos sean positivos.',
    },
    {
      id: 'l4-07',
      habilidad: 'Escala de pH',
      enunciado: 'El pH se calcula como pH = −log[H⁺]. Si la concentración de iones es [H⁺] = 10⁻⁴, ¿cuál es el pH?',
      opciones: [
        { id: 'a', valor: 4 },
        { id: 'b', valor: -4, porQue: 'El signo menos de la fórmula vuelve positivo el resultado.' },
        { id: 'c', valor: 10, porQue: '10 es la base del logaritmo, no el pH.' },
        { id: 'd', valor: 0.0001, porQue: 'Esa es la concentración, no el pH.' },
      ],
      correcta: 'a',
      calcular: () => -Math.log10(1e-4),
      pasos: [
        'log 10⁻⁴ = −4.',
        'pH = −(−4).',
        'pH = 4 (una solución ácida).',
      ],
      pista: 'Reemplaza la concentración en la fórmula y aplica la definición de logaritmo.',
    },
    {
      id: 'l4-08',
      habilidad: 'Escala de Richter',
      enunciado: 'En la escala de Richter, cada punto multiplica la amplitud de la onda por 10. ¿Cuántas veces mayor es la amplitud de un sismo de magnitud 8 que la de uno de magnitud 6?',
      opciones: [
        { id: 'a', valor: 2, porQue: 'La escala es logarítmica: no se restan las magnitudes directamente.' },
        { id: 'b', valor: 20, porQue: 'Dos puntos son 10 · 10, no 10 · 2.' },
        { id: 'c', valor: 8 / 6, texto: '≈ 1,33', porQue: 'No se dividen las magnitudes: se compara 10⁸ con 10⁶.' },
        { id: 'd', valor: 100 },
      ],
      correcta: 'd',
      calcular: () => 10 ** 8 / 10 ** 6,
      pasos: [
        'La diferencia es de 8 − 6 = 2 puntos.',
        'Cada punto multiplica por 10: 10 · 10.',
        'La amplitud es 100 veces mayor.',
      ],
      pista: 'Cuenta cuántos puntos de diferencia hay y multiplica por diez esa cantidad de veces.',
    },
  ],
};
