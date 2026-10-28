import { Mission } from '../types';

/**
 * Misión 3.º medio — Geometría analítica.
 * Distancia entre puntos, punto medio, pendiente, ecuación de la recta,
 * rectas paralelas y perpendiculares, y ecuación de la circunferencia.
 *
 * Cuando las alternativas son puntos, `valor` es 100·x + y.
 * Cuando son ecuaciones, `valor` es un código indicado en cada pregunta.
 */
export const misionAnalitica3m: Mission = {
  id: 'analitica-3m',
  titulo: 'Geometría analítica',
  nivel: '3.º medio',
  unidad: 'Unidad 3 · Geometría',
  corazonesIniciales: 3,
  xpPorCorrecta: 10,
  xpBonoCompletar: 20,
  preguntas: [
    {
      id: 'a3-01',
      habilidad: 'Distancia entre dos puntos',
      enunciado: '¿Cuál es la distancia entre los puntos (1, 2) y (4, 6)?',
      opciones: [
        { id: 'a', valor: 7, porQue: 'Sumaste las diferencias (3 + 4). Se usa Pitágoras: √(3² + 4²).' },
        { id: 'b', valor: 5 },
        { id: 'c', valor: 25, porQue: 'Ese es el cuadrado de la distancia. Falta sacar la raíz.' },
        { id: 'd', valor: Math.sqrt(7), texto: '√7', porQue: 'Las diferencias se elevan al cuadrado antes de sumarlas.' },
      ],
      correcta: 'b',
      calcular: () => Math.hypot(4 - 1, 6 - 2),
      pasos: [
        'Diferencias: Δx = 4 − 1 = 3 y Δy = 6 − 2 = 4.',
        'd = √(3² + 4²) = √25.',
        'd = 5.',
      ],
      pista: 'La distancia es la hipotenusa de un triángulo rectángulo formado por las diferencias.',
    },
    {
      // valor: 100·x + y
      id: 'a3-02',
      habilidad: 'Punto medio',
      enunciado: '¿Cuál es el punto medio del segmento que une (−2, 5) y (6, 1)?',
      opciones: [
        { id: 'a', valor: 100 * 4 + 6, texto: '(4, 6)', porQue: 'Sumaste las coordenadas. Falta dividir por 2.' },
        { id: 'b', valor: 100 * 4 - 2, texto: '(4, −2)', porQue: 'Restaste las coordenadas y dividiste. El punto medio es el promedio.' },
        { id: 'c', valor: 100 * 2 + 3, texto: '(2, 3)' },
        { id: 'd', valor: 100 * 8 - 4, texto: '(8, −4)', porQue: 'Restaste las coordenadas. El punto medio usa la suma dividida por 2.' },
      ],
      correcta: 'c',
      calcular: () => 100 * ((-2 + 6) / 2) + (5 + 1) / 2,
      pasos: [
        'x = (−2 + 6) / 2 = 2.',
        'y = (5 + 1) / 2 = 3.',
        'Punto medio: (2, 3).',
      ],
      pista: 'Promedia las coordenadas x por un lado y las y por otro.',
    },
    {
      id: 'a3-03',
      habilidad: 'Pendiente',
      enunciado: '¿Cuál es la pendiente de la recta que pasa por (1, 3) y (3, 11)?',
      opciones: [
        { id: 'a', valor: 0.25, porQue: 'Invertiste la razón: es Δy / Δx.' },
        { id: 'b', valor: 8, porQue: 'Ese es solo Δy. Falta dividir por Δx.' },
        { id: 'c', valor: -4, porQue: 'Revisa el orden de las restas: debe ser el mismo arriba y abajo.' },
        { id: 'd', valor: 4 },
      ],
      correcta: 'd',
      calcular: () => (11 - 3) / (3 - 1),
      pasos: [
        'm = (y₂ − y₁) / (x₂ − x₁).',
        'm = (11 − 3) / (3 − 1) = 8 / 2.',
        'm = 4.',
      ],
      pista: 'Divide cuánto cambia y por cuánto cambia x.',
    },
    {
      // valor: coeficiente de posición n de y = mx + n; la alternativa con pendiente y punto intercambiados usa 502 (código).
      id: 'a3-04',
      habilidad: 'Ecuación de la recta',
      enunciado: '¿Cuál es la ecuación de la recta de pendiente 2 que pasa por el punto (1, 5)?',
      opciones: [
        { id: 'a', valor: 3, texto: 'y = 2x + 3' },
        { id: 'b', valor: 5, texto: 'y = 2x + 5', porQue: '5 es la coordenada y del punto, no el corte con el eje y. Revisa: 2 · 1 + 5 = 7.' },
        { id: 'c', valor: 7, texto: 'y = 2x + 7', porQue: 'Sumaste en vez de restar: n = 5 − 2 · 1.' },
        { id: 'd', valor: 502, texto: 'y = 5x + 2', porQue: 'Intercambiaste la pendiente con la coordenada del punto.' },
      ],
      correcta: 'a',
      calcular: () => 5 - 2 * 1,
      pasos: [
        'y = 2x + n. Reemplazamos el punto (1, 5): 5 = 2 · 1 + n.',
        'n = 5 − 2 = 3.',
        'La recta es y = 2x + 3.',
      ],
      pista: 'Reemplaza el punto en y = mx + n y despeja n.',
    },
    {
      id: 'a3-05',
      habilidad: 'Rectas perpendiculares',
      enunciado: '¿Cuál es la pendiente de una recta perpendicular a y = 3x − 1?',
      opciones: [
        { id: 'a', valor: 3, texto: '3', porQue: 'Esa es la pendiente de una recta paralela.' },
        { id: 'b', valor: -1 / 3, texto: '−1/3' },
        { id: 'c', valor: -3, texto: '−3', porQue: 'Falta invertir: el producto de las pendientes debe ser −1.' },
        { id: 'd', valor: 1 / 3, texto: '1/3', porQue: 'Falta cambiar el signo: el producto de las pendientes debe ser −1.' },
      ],
      correcta: 'b',
      calcular: () => -1 / 3,
      pasos: [
        'Dos rectas son perpendiculares si el producto de sus pendientes es −1.',
        '3 · m = −1.',
        'm = −1/3.',
      ],
      pista: 'Las pendientes de dos rectas perpendiculares son inversas y de signo contrario.',
    },
    {
      id: 'a3-06',
      habilidad: 'Rectas paralelas',
      enunciado: '¿Cuál es la pendiente de una recta paralela a 2x + y = 7?',
      opciones: [
        { id: 'a', valor: 2, porQue: 'Despeja y: y = −2x + 7. El signo cambia al pasar 2x.' },
        { id: 'b', valor: 7, porQue: '7 es el coeficiente de posición, no la pendiente.' },
        { id: 'c', valor: -2 },
        { id: 'd', valor: 0.5, porQue: 'Esa sería una pendiente inversa. Las paralelas tienen la misma pendiente.' },
      ],
      correcta: 'c',
      calcular: () => -2 / 1,
      pasos: [
        'Despejamos y: y = −2x + 7.',
        'La pendiente de esa recta es −2.',
        'Las paralelas tienen la misma pendiente: −2.',
      ],
      pista: 'Despeja y para ver la pendiente.',
    },
    {
      // valor: 1 = correcta; 2, 3 y 4 = errores típicos
      id: 'a3-07',
      habilidad: 'Ecuación de la circunferencia',
      enunciado: '¿Cuál es la ecuación de la circunferencia de centro (2, −3) y radio 4?',
      opciones: [
        { id: 'a', valor: 2, texto: '(x + 2)² + (y − 3)² = 16', porQue: 'Los signos van al revés: con centro (h, k) se escribe (x − h) y (y − k).' },
        { id: 'b', valor: 3, texto: '(x − 2)² + (y + 3)² = 4', porQue: 'A la derecha va el radio al cuadrado: 4² = 16.' },
        { id: 'c', valor: 4, texto: '(x − 2)² + (y − 3)² = 16', porQue: 'Como k = −3, queda (y − (−3)) = (y + 3).' },
        { id: 'd', valor: 1, texto: '(x − 2)² + (y + 3)² = 16' },
      ],
      correcta: 'd',
      calcular: () => (4 ** 2 === 16 ? 1 : 0),
      pasos: [
        'Forma: (x − h)² + (y − k)² = r², con centro (h, k).',
        'h = 2, k = −3 y r² = 16.',
        '(x − 2)² + (y + 3)² = 16.',
      ],
      pista: 'Usa la forma con el centro restando y el radio al cuadrado.',
    },
    {
      id: 'a3-08',
      habilidad: 'Elementos de la circunferencia',
      enunciado: '¿Cuál es el radio de la circunferencia (x − 1)² + (y + 2)² = 25?',
      opciones: [
        { id: 'a', valor: 25, porQue: '25 es el radio al cuadrado. Falta sacar la raíz.' },
        { id: 'b', valor: 12.5, porQue: 'Dividiste por 2. El radio es la raíz de 25.' },
        { id: 'c', valor: 5 },
        { id: 'd', valor: 1, porQue: '1 es la coordenada x del centro, no el radio.' },
      ],
      correcta: 'c',
      calcular: () => Math.sqrt(25),
      pasos: [
        'La forma es (x − h)² + (y − k)² = r².',
        'Aquí r² = 25.',
        'r = √25 = 5.',
      ],
      pista: 'El número a la derecha es el radio elevado al cuadrado.',
    },
  ],
};
