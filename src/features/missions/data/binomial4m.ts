import { Mission } from '../types';

/**
 * Misión 4.º medio — Distribución binomial.
 * Ensayos de Bernoulli, P(X = k) con combinatoria, esperanza, varianza y
 * probabilidad de «al menos uno».
 */
const factorial = (n: number): number => (n <= 1 ? 1 : n * factorial(n - 1));
const comb = (n: number, k: number) => factorial(n) / (factorial(k) * factorial(n - k));
const binomial = (n: number, k: number, p: number) => comb(n, k) * p ** k * (1 - p) ** (n - k);

export const misionBinomial4m: Mission = {
  id: 'binomial-4m',
  titulo: 'Distribución binomial',
  nivel: '4.º medio',
  unidad: 'Unidad 4 · Probabilidad y estadística',
  corazonesIniciales: 3,
  xpPorCorrecta: 10,
  xpBonoCompletar: 20,
  preguntas: [
    {
      // valor: 1 = experimento binomial; los demás marcan las otras situaciones
      id: 'b4-01',
      habilidad: 'Experimento binomial',
      enunciado: '¿Cuál de estas situaciones se modela con una distribución binomial?',
      opciones: [
        { id: 'a', valor: 2, texto: 'Sacar 5 cartas sin devolverlas y contar los ases', porQue: 'Sin reposición la probabilidad cambia en cada extracción: los ensayos no son independientes.' },
        { id: 'b', valor: 1, texto: 'Lanzar una moneda 10 veces y contar las caras' },
        { id: 'c', valor: 3, texto: 'Medir la estatura de 10 personas', porQue: 'La estatura no es éxito o fracaso: no son ensayos de Bernoulli.' },
        { id: 'd', valor: 4, texto: 'Lanzar un dado hasta que salga un 6', porQue: 'La cantidad de lanzamientos no está fijada de antemano.' },
      ],
      correcta: 'b',
      calcular: () => 1,
      pasos: [
        'Binomial: n ensayos fijos, independientes, con dos resultados y la misma probabilidad de éxito.',
        'La moneda se lanza 10 veces, cada lanzamiento es independiente y P(cara) = 1/2 siempre.',
        'Contar caras en 10 lanzamientos es binomial.',
      ],
      pista: 'Revisa cuatro cosas: número fijo de ensayos, independencia, dos resultados y probabilidad constante.',
    },
    {
      id: 'b4-02',
      habilidad: 'Probabilidad binomial',
      enunciado: 'Se lanza una moneda 4 veces. ¿Cuál es la probabilidad de obtener exactamente 2 caras?',
      opciones: [
        { id: 'a', valor: 1 / 2, texto: '1/2', porQue: 'No basta con 2 de 4: hay que contar las secuencias posibles.' },
        { id: 'b', valor: 1 / 16, texto: '1/16', porQue: 'Esa es la probabilidad de una sola secuencia; hay 6 con dos caras.' },
        { id: 'c', valor: 3 / 8, texto: '3/8' },
        { id: 'd', valor: 1 / 4, texto: '1/4', porQue: '(1/2)² olvida los otros dos lanzamientos y las combinaciones.' },
      ],
      correcta: 'c',
      calcular: () => binomial(4, 2, 1 / 2),
      pasos: [
        'Secuencias con 2 caras en 4 lanzamientos: C(4, 2) = 6.',
        'Cada secuencia tiene probabilidad (1/2)⁴ = 1/16.',
        'P = 6/16 = 3/8.',
      ],
      pista: 'Cuenta cuántas secuencias tienen exactamente dos caras y multiplica por la probabilidad de cada una.',
    },
    {
      id: 'b4-03',
      habilidad: 'Todos los ensayos con éxito',
      enunciado: 'Una prueba tiene 3 preguntas de verdadero o falso. Si respondes al azar, ¿cuál es la probabilidad de acertar las 3?',
      opciones: [
        { id: 'a', valor: 1 / 8, texto: '1/8' },
        { id: 'b', valor: 1 / 2, texto: '1/2', porQue: 'Esa es la probabilidad de acertar una sola pregunta.' },
        { id: 'c', valor: 3 / 8, texto: '3/8', porQue: 'Esa es la probabilidad de acertar exactamente una (o exactamente dos).' },
        { id: 'd', valor: 1 / 6, texto: '1/6', porQue: 'Las probabilidades se multiplican: 1/2 · 1/2 · 1/2.' },
      ],
      correcta: 'a',
      calcular: () => binomial(3, 3, 1 / 2),
      pasos: [
        'Cada pregunta se acierta con probabilidad 1/2.',
        'Son independientes: se multiplican.',
        'P = (1/2)³ = 1/8.',
      ],
      pista: 'Multiplica la probabilidad de acertar cada pregunta.',
    },
    {
      id: 'b4-04',
      habilidad: 'Esperanza',
      enunciado: 'Un 30 % de los clientes de una tienda compra con tarjeta. Si llegan 20 clientes, ¿cuántos se espera que paguen con tarjeta?',
      opciones: [
        { id: 'a', valor: 0.3, porQue: 'Esa es la probabilidad de un cliente, no la cantidad esperada.' },
        { id: 'b', valor: 14, porQue: 'n · q = 14 es la cantidad esperada que NO paga con tarjeta.' },
        { id: 'c', valor: 4.2, porQue: 'Esa es la varianza n · p · q.' },
        { id: 'd', valor: 6 },
      ],
      correcta: 'd',
      calcular: () => 20 * 0.3,
      pasos: [
        'En una binomial, la esperanza es E(X) = n · p.',
        'n = 20 y p = 0,3.',
        'E(X) = 20 · 0,3 = 6 clientes.',
      ],
      pista: 'Multiplica la cantidad de ensayos por la probabilidad de éxito.',
    },
    {
      id: 'b4-05',
      habilidad: 'Varianza',
      enunciado: 'X sigue una distribución binomial con n = 50 y p = 0,2. ¿Cuál es su varianza?',
      opciones: [
        { id: 'a', valor: 10, porQue: 'Esa es la esperanza n · p.' },
        { id: 'b', valor: 8 },
        { id: 'c', valor: 40, porQue: 'n · q es la cantidad esperada de fracasos.' },
        { id: 'd', valor: Math.sqrt(8), texto: '≈ 2,83', porQue: 'Esa es la desviación estándar (la raíz de la varianza).' },
      ],
      correcta: 'b',
      calcular: () => 50 * 0.2 * (1 - 0.2),
      pasos: [
        'Var(X) = n · p · q, con q = 1 − p = 0,8.',
        '50 · 0,2 · 0,8.',
        'Var(X) = 8.',
      ],
      pista: 'La varianza binomial es n · p · q, con q = 1 − p.',
    },
    {
      id: 'b4-06',
      habilidad: 'Al menos un éxito',
      enunciado: 'Se lanza un dado 3 veces. ¿Cuál es la probabilidad de obtener al menos un 6?',
      opciones: [
        { id: 'a', valor: 1 / 2, texto: '1/2', porQue: 'Sumar 1/6 tres veces cuenta de más; se calcula 1 − P(ningún 6).' },
        { id: 'b', valor: 1 / 216, texto: '1/216', porQue: 'Esa es la probabilidad de obtener tres 6.' },
        { id: 'c', valor: 91 / 216, texto: '91/216' },
        { id: 'd', valor: 125 / 216, texto: '125/216', porQue: 'Esa es la probabilidad de no obtener ningún 6.' },
      ],
      correcta: 'c',
      calcular: () => 1 - binomial(3, 0, 1 / 6),
      pasos: [
        'Lo contrario de «al menos un 6» es «ningún 6».',
        'P(ningún 6) = (5/6)³ = 125/216.',
        'P(al menos uno) = 1 − 125/216 = 91/216.',
      ],
      pista: 'Calcula la probabilidad de lo contrario y réstala de 1.',
    },
    {
      id: 'b4-07',
      habilidad: 'Cero éxitos',
      enunciado: 'Un 10 % de las ampolletas de una caja viene fallada. Si eliges 5 al azar (con reposición), ¿cuál es la probabilidad de que ninguna esté fallada?',
      opciones: [
        { id: 'a', valor: 0.9 ** 5, texto: '≈ 0,59' },
        { id: 'b', valor: 0.9, texto: '0,9', porQue: 'Esa es la probabilidad para una sola ampolleta.' },
        { id: 'c', valor: 0.5, texto: '0,5', porQue: 'No se resta 5 · 0,1 de 1: se multiplica 0,9 cinco veces.' },
        { id: 'd', valor: 0.1 ** 5, texto: '0,00001', porQue: 'Esa es la probabilidad de que las 5 estén falladas.' },
      ],
      correcta: 'a',
      calcular: () => binomial(5, 0, 0.1),
      pasos: [
        'Cada ampolleta está buena con probabilidad 0,9.',
        'P(X = 0) = 0,9⁵.',
        '0,9⁵ = 0,59049 ≈ 0,59.',
      ],
      pista: 'Multiplica la probabilidad de que cada una esté buena.',
    },
    {
      id: 'b4-08',
      habilidad: 'Probabilidad binomial en contexto',
      enunciado: 'Una basquetbolista encesta el 80 % de sus tiros libres. Si lanza 2, ¿cuál es la probabilidad de que enceste exactamente 1?',
      opciones: [
        { id: 'a', valor: 0.16, porQue: 'Falta multiplicar por 2: puede acertar el primero o el segundo.' },
        { id: 'b', valor: 0.64, porQue: 'Esa es la probabilidad de encestar ambos.' },
        { id: 'c', valor: 0.8, porQue: 'Esa es la probabilidad de un solo tiro.' },
        { id: 'd', valor: 0.32 },
      ],
      correcta: 'd',
      calcular: () => binomial(2, 1, 0.8),
      pasos: [
        'Hay 2 órdenes posibles: acierta-falla o falla-acierta.',
        'Cada uno: 0,8 · 0,2 = 0,16.',
        'P = 2 · 0,16 = 0,32.',
      ],
      pista: 'Considera los dos órdenes posibles: acierta y falla, o falla y acierta.',
    },
  ],
};
