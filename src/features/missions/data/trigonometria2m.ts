import { Mission } from '../types';

const RAD = Math.PI / 180;

/**
 * Misión 2.º medio — Trigonometría en el triángulo rectángulo.
 * Razones seno, coseno y tangente, ángulos notables, cálculo de lados y
 * problemas de altura e inclinación.
 */
export const misionTrigonometria2m: Mission = {
  id: 'trigonometria-2m',
  titulo: 'Trigonometría',
  nivel: '2.º medio',
  unidad: 'Unidad 3 · Geometría',
  corazonesIniciales: 3,
  xpPorCorrecta: 10,
  xpBonoCompletar: 20,
  preguntas: [
    {
      id: 't2-01',
      habilidad: 'Seno',
      enunciado: 'Un triángulo rectángulo tiene catetos de 3 y 4 cm, e hipotenusa de 5 cm. ¿Cuál es el seno del ángulo opuesto al cateto de 3 cm?',
      opciones: [
        { id: 'a', valor: 3 / 5, texto: '3/5' },
        { id: 'b', valor: 4 / 5, texto: '4/5', porQue: '4/5 es el coseno: cateto adyacente sobre hipotenusa.' },
        { id: 'c', valor: 3 / 4, texto: '3/4', porQue: '3/4 es la tangente: opuesto sobre adyacente.' },
        { id: 'd', valor: 5 / 3, texto: '5/3', porQue: 'Invertiste la razón. El seno nunca es mayor que 1.' },
      ],
      correcta: 'a',
      calcular: () => 3 / Math.hypot(3, 4),
      pasos: [
        'Seno = cateto opuesto / hipotenusa.',
        'El cateto opuesto mide 3 cm y la hipotenusa 5 cm.',
        'sen α = 3/5.',
      ],
      pista: 'Seno = cateto opuesto dividido por la hipotenusa.',
    },
    {
      id: 't2-02',
      habilidad: 'Coseno',
      enunciado: 'En el mismo triángulo (catetos 3 y 4 cm, hipotenusa 5 cm), ¿cuál es el coseno del ángulo opuesto al cateto de 3 cm?',
      opciones: [
        { id: 'a', valor: 3 / 5, texto: '3/5', porQue: '3/5 es el seno: usa el cateto opuesto.' },
        { id: 'b', valor: 4 / 5, texto: '4/5' },
        { id: 'c', valor: 4 / 3, texto: '4/3', porQue: '4/3 es adyacente sobre opuesto. El coseno usa la hipotenusa.' },
        { id: 'd', valor: 5 / 4, texto: '5/4', porQue: 'Invertiste la razón. El coseno nunca es mayor que 1.' },
      ],
      correcta: 'b',
      calcular: () => 4 / Math.hypot(3, 4),
      pasos: [
        'Coseno = cateto adyacente / hipotenusa.',
        'El cateto adyacente mide 4 cm y la hipotenusa 5 cm.',
        'cos α = 4/5.',
      ],
      pista: 'Coseno = cateto adyacente dividido por la hipotenusa.',
    },
    {
      id: 't2-03',
      habilidad: 'Ángulos notables',
      enunciado: '¿Cuánto vale la tangente de 45°?',
      expresion: 'tan 45°',
      opciones: [
        { id: 'a', valor: Math.SQRT2 / 2, texto: '√2/2', porQue: '√2/2 es el seno (y el coseno) de 45°.' },
        { id: 'b', valor: 0, texto: '0', porQue: 'tan 0° = 0. En 45° los catetos son iguales.' },
        { id: 'c', valor: 1, texto: '1' },
        { id: 'd', valor: Math.sqrt(3), texto: '√3', porQue: '√3 es la tangente de 60°.' },
      ],
      correcta: 'c',
      calcular: () => Math.tan(45 * RAD),
      pasos: [
        'En un triángulo rectángulo con un ángulo de 45°, los dos catetos son iguales.',
        'Tangente = opuesto / adyacente = a / a.',
        'tan 45° = 1.',
      ],
      pista: 'Con un ángulo de 45°, ¿cómo son los dos catetos?',
    },
    {
      id: 't2-04',
      habilidad: 'Ángulos notables',
      enunciado: '¿Cuánto vale el seno de 30°?',
      expresion: 'sen 30°',
      opciones: [
        { id: 'a', valor: Math.sqrt(3) / 2, texto: '√3/2', porQue: '√3/2 es el coseno de 30° (o el seno de 60°).' },
        { id: 'b', valor: 1, texto: '1', porQue: 'sen 90° = 1. El seno de 30° es menor.' },
        { id: 'c', valor: Math.SQRT2 / 2, texto: '√2/2', porQue: '√2/2 corresponde a 45°.' },
        { id: 'd', valor: 1 / 2, texto: '1/2' },
      ],
      correcta: 'd',
      calcular: () => Math.sin(30 * RAD),
      pasos: [
        'Un triángulo equilátero partido por la mitad tiene ángulos de 30°, 60° y 90°.',
        'El lado opuesto a 30° mide la mitad de la hipotenusa.',
        'sen 30° = 1/2.',
      ],
      pista: 'Piensa en la mitad de un triángulo equilátero.',
    },
    {
      id: 't2-05',
      habilidad: 'Calcular un cateto',
      enunciado: 'La hipotenusa de un triángulo rectángulo mide 10 cm y uno de sus ángulos agudos es de 30°. ¿Cuánto mide el cateto opuesto a ese ángulo?',
      unidad: 'cm',
      opciones: [
        { id: 'a', valor: 5 },
        { id: 'b', valor: 10 * Math.cos(30 * RAD), texto: '≈ 8,66 cm', porQue: 'Ese es el cateto adyacente (10 · cos 30°). El opuesto usa el seno.' },
        { id: 'c', valor: 20, porQue: 'Dividiste por sen 30°. El cateto se obtiene multiplicando: 10 · sen 30°.' },
        { id: 'd', valor: 10, porQue: '10 cm es la hipotenusa. Un cateto siempre es menor.' },
      ],
      correcta: 'a',
      calcular: () => 10 * Math.sin(30 * RAD),
      pasos: [
        'sen 30° = cateto opuesto / hipotenusa.',
        'Cateto opuesto = 10 · sen 30° = 10 · 1/2.',
        '= 5 cm.',
      ],
      pista: 'Despeja el cateto opuesto desde la definición de seno.',
    },
    {
      id: 't2-06',
      habilidad: 'Ángulo de elevación',
      enunciado: 'Desde un punto a 20 m de un edificio se ve su parte más alta con un ángulo de elevación de 45°. ¿Cuánto mide el edificio?',
      unidad: 'm',
      opciones: [
        { id: 'a', valor: 10, porQue: 'Dividiste por 2. Con 45°, la altura es igual a la distancia.' },
        { id: 'b', valor: 20 },
        { id: 'c', valor: 20 * Math.SQRT2, texto: '≈ 28,3 m', porQue: 'Calculaste la hipotenusa (la línea de visión), no la altura.' },
        { id: 'd', valor: 45, porQue: '45 son los grados del ángulo, no metros.' },
      ],
      correcta: 'b',
      calcular: () => 20 * Math.tan(45 * RAD),
      pasos: [
        'tan 45° = altura / distancia.',
        'Altura = 20 · tan 45° = 20 · 1.',
        'El edificio mide 20 m.',
      ],
      pista: 'Usa la tangente: relaciona la altura con la distancia al edificio.',
    },
    {
      id: 't2-07',
      habilidad: 'Identidad fundamental',
      enunciado: 'Si sen α = 0,6 y α es agudo, ¿cuánto vale cos α?',
      opciones: [
        { id: 'a', valor: 0.4, porQue: 'La identidad usa cuadrados: sen² α + cos² α = 1, no sen α + cos α = 1.' },
        { id: 'b', valor: 0.64, porQue: '0,64 es cos² α. Falta sacar la raíz.' },
        { id: 'c', valor: 0.8 },
        { id: 'd', valor: 1.6, porQue: 'El coseno de un ángulo agudo es menor que 1.' },
      ],
      correcta: 'c',
      calcular: () => Math.sqrt(1 - 0.6 ** 2),
      pasos: [
        'sen² α + cos² α = 1.',
        'cos² α = 1 − 0,36 = 0,64.',
        'cos α = √0,64 = 0,8.',
      ],
      pista: 'Usa la identidad sen² α + cos² α = 1.',
    },
    {
      id: 't2-08',
      habilidad: 'Inclinación en contexto',
      enunciado: 'Una rampa de 4 m de largo sube 1 m de altura. ¿Cuál es el seno de su ángulo de inclinación?',
      opciones: [
        { id: 'a', valor: 4, porQue: 'Invertiste la razón. El seno nunca es mayor que 1.' },
        { id: 'b', valor: 1, porQue: '1 m es la altura. Falta dividirla por el largo de la rampa.' },
        { id: 'c', valor: 1 / Math.sqrt(15), texto: '≈ 0,26', porQue: 'Calculaste la tangente (altura / base). El seno usa la rampa, que es la hipotenusa.' },
        { id: 'd', valor: 0.25 },
      ],
      correcta: 'd',
      calcular: () => 1 / 4,
      pasos: [
        'La rampa es la hipotenusa y la altura es el cateto opuesto al ángulo.',
        'sen α = altura / rampa = 1 / 4.',
        'sen α = 0,25.',
      ],
      pista: 'La rampa es la hipotenusa del triángulo.',
    },
  ],
};
