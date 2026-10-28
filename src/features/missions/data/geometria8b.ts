import { Mission } from '../types';

/** Valor de π que se usa en 8.º básico. */
const PI = 3.14;

/**
 * Misión 8.º básico — Teorema de Pitágoras y volumen.
 * Hipotenusa y catetos, tríos pitagóricos, problemas y volumen de
 * prismas, cilindros y cubos.
 */
export const misionGeometria8b: Mission = {
  id: 'geometria-8b',
  titulo: 'Pitágoras y volumen',
  nivel: '8.º básico',
  unidad: 'Unidad 3 · Geometría',
  corazonesIniciales: 3,
  xpPorCorrecta: 10,
  xpBonoCompletar: 20,
  preguntas: [
    {
      id: 't8-01',
      habilidad: 'Hipotenusa',
      enunciado: 'Los catetos de un triángulo rectángulo miden 6 cm y 8 cm. ¿Cuánto mide la hipotenusa?',
      unidad: 'cm',
      opciones: [
        { id: 'a', valor: 14, porQue: 'Sumaste los catetos. Hay que sumar sus cuadrados y sacar la raíz.' },
        { id: 'b', valor: 10 },
        { id: 'c', valor: 100, porQue: '100 es la hipotenusa al cuadrado. Falta sacar la raíz.' },
        { id: 'd', valor: 48, porQue: 'Multiplicaste los catetos. Usa a² + b² = c².' },
      ],
      correcta: 'b',
      calcular: () => Math.sqrt(6 ** 2 + 8 ** 2),
      pasos: [
        'Teorema de Pitágoras: c² = a² + b².',
        'c² = 6² + 8² = 36 + 64 = 100.',
        'c = √100 = 10 cm.',
      ],
      pista: 'Usa a² + b² = c² y luego saca la raíz.',
    },
    {
      id: 't8-02',
      habilidad: 'Cateto',
      enunciado: 'La hipotenusa de un triángulo rectángulo mide 13 cm y un cateto 5 cm. ¿Cuánto mide el otro cateto?',
      unidad: 'cm',
      opciones: [
        { id: 'a', valor: 12 },
        { id: 'b', valor: 8, porQue: 'Restaste 13 − 5. Hay que restar los cuadrados: 169 − 25.' },
        { id: 'c', valor: 18, porQue: 'Sumaste. Para un cateto se resta: b² = c² − a².' },
        { id: 'd', valor: 144, porQue: '144 es el cateto al cuadrado. Falta sacar la raíz.' },
      ],
      correcta: 'a',
      calcular: () => Math.sqrt(13 ** 2 - 5 ** 2),
      pasos: [
        'Para un cateto: b² = c² − a².',
        'b² = 13² − 5² = 169 − 25 = 144.',
        'b = √144 = 12 cm.',
      ],
      pista: 'Despeja el cateto: al cuadrado de la hipotenusa réstale el cuadrado del otro cateto.',
    },
    {
      // valor: a² + b² − c² (vale 0 solo si el triángulo es rectángulo)
      id: 't8-03',
      habilidad: 'Tríos pitagóricos',
      enunciado: '¿Con cuál de estas medidas se forma un triángulo rectángulo?',
      opciones: [
        { id: 'a', valor: 3 ** 2 + 4 ** 2 - 6 ** 2, texto: '3, 4 y 6', porQue: '3² + 4² = 25 y 6² = 36: no son iguales.' },
        { id: 'b', valor: 5 ** 2 + 12 ** 2 - 13 ** 2, texto: '5, 12 y 13' },
        { id: 'c', valor: 2 ** 2 + 3 ** 2 - 4 ** 2, texto: '2, 3 y 4', porQue: '2² + 3² = 13 y 4² = 16: no son iguales.' },
        { id: 'd', valor: 6 ** 2 + 7 ** 2 - 9 ** 2, texto: '6, 7 y 9', porQue: '6² + 7² = 85 y 9² = 81: no son iguales.' },
      ],
      correcta: 'b',
      calcular: () => 5 ** 2 + 12 ** 2 - 13 ** 2,
      pasos: [
        'Es rectángulo si la suma de los cuadrados de los lados menores es igual al cuadrado del mayor.',
        '5² + 12² = 25 + 144 = 169.',
        '13² = 169. Se cumple: forman un triángulo rectángulo.',
      ],
      pista: 'Revisa si la suma de los cuadrados de los dos lados menores da el cuadrado del mayor.',
    },
    {
      id: 't8-04',
      habilidad: 'Pitágoras en contexto',
      enunciado: 'Una escalera de 5 m está apoyada en una pared. Su pie está a 3 m de la pared. ¿A qué altura toca la pared?',
      unidad: 'm',
      opciones: [
        { id: 'a', valor: 2, porQue: 'Restaste 5 − 3. Hay que restar los cuadrados: 25 − 9.' },
        { id: 'b', valor: 8, porQue: 'Sumaste. La escalera es la hipotenusa: se resta.' },
        { id: 'c', valor: 4 },
        { id: 'd', valor: 16, porQue: '16 es la altura al cuadrado. Falta sacar la raíz.' },
      ],
      correcta: 'c',
      calcular: () => Math.sqrt(5 ** 2 - 3 ** 2),
      pasos: [
        'La escalera es la hipotenusa (5 m); la distancia al muro es un cateto (3 m).',
        'altura² = 5² − 3² = 25 − 9 = 16.',
        'altura = √16 = 4 m.',
      ],
      pista: 'La escalera es la hipotenusa del triángulo que forma con la pared y el suelo.',
    },
    {
      id: 't8-05',
      habilidad: 'Volumen del prisma',
      enunciado: 'Una caja tiene forma de prisma rectangular de 4 cm de largo, 3 cm de ancho y 5 cm de alto. ¿Cuál es su volumen?',
      unidad: 'cm³',
      opciones: [
        { id: 'a', valor: 12, porQue: '12 cm² es el área de la base. Falta multiplicar por la altura.' },
        { id: 'b', valor: 94, porQue: '94 cm² es el área total de la caja, no su volumen.' },
        { id: 'c', valor: 20, porQue: 'Multiplicaste solo dos medidas. El volumen usa las tres.' },
        { id: 'd', valor: 60 },
      ],
      correcta: 'd',
      calcular: () => 4 * 3 * 5,
      pasos: [
        'Volumen del prisma = área de la base · altura.',
        'Área de la base: 4 · 3 = 12 cm².',
        'Volumen: 12 · 5 = 60 cm³.',
      ],
      pista: 'Multiplica largo, ancho y alto.',
    },
    {
      id: 't8-06',
      habilidad: 'Volumen del cilindro',
      enunciado: 'Un cilindro tiene 2 cm de radio y 10 cm de altura. ¿Cuál es su volumen? Usa π ≈ 3,14.',
      unidad: 'cm³',
      opciones: [
        { id: 'a', valor: 125.6 },
        { id: 'b', valor: 62.8, porQue: 'No elevaste el radio al cuadrado: el área de la base es π · r².' },
        { id: 'c', valor: 502.4, porQue: 'Usaste el diámetro (4 cm) en vez del radio.' },
        { id: 'd', valor: 40, porQue: 'Faltó multiplicar por π: la base es un círculo.' },
      ],
      correcta: 'a',
      calcular: () => PI * 2 ** 2 * 10,
      pasos: [
        'Volumen del cilindro = π · r² · h.',
        'Área de la base: 3,14 · 2² = 3,14 · 4 = 12,56 cm².',
        'Volumen: 12,56 · 10 = 125,6 cm³.',
      ],
      pista: 'Calcula el área del círculo de la base y multiplícala por la altura.',
    },
    {
      id: 't8-07',
      habilidad: 'Arista de un cubo',
      enunciado: 'Un cubo tiene un volumen de 27 cm³. ¿Cuánto mide su arista?',
      unidad: 'cm',
      opciones: [
        { id: 'a', valor: 9, porQue: '9 · 9 · 9 = 729, no 27. La arista se multiplica tres veces por sí misma.' },
        { id: 'b', valor: 3 },
        { id: 'c', valor: 13.5, porQue: 'Tomaste la mitad de 27. El volumen del cubo es arista · arista · arista.' },
        { id: 'd', valor: Math.sqrt(27), texto: '≈ 5,2 cm', porQue: 'Sacaste la raíz cuadrada, que sirve para el área de un cuadrado. El cubo necesita raíz cúbica.' },
      ],
      correcta: 'b',
      calcular: () => Math.cbrt(27),
      pasos: [
        'Volumen del cubo = arista³.',
        'Buscamos un número que multiplicado tres veces por sí mismo dé 27.',
        '3 · 3 · 3 = 27, así que la arista mide 3 cm.',
      ],
      pista: '¿Qué número multiplicado tres veces por sí mismo da 27?',
    },
    {
      id: 't8-08',
      habilidad: 'Volumen y capacidad',
      enunciado: 'Un acuario mide 50 cm de largo, 30 cm de ancho y 40 cm de alto. ¿Cuántos litros de agua caben? (1 L = 1.000 cm³)',
      unidad: 'L',
      opciones: [
        { id: 'a', valor: 60000, porQue: '60.000 es el volumen en cm³. Falta convertir a litros dividiendo por 1.000.' },
        { id: 'b', valor: 600, porQue: 'Dividiste por 100. Un litro son 1.000 cm³.' },
        { id: 'c', valor: 60 },
        { id: 'd', valor: 120, porQue: 'Sumaste las medidas. El volumen se obtiene multiplicándolas.' },
      ],
      correcta: 'c',
      calcular: () => (50 * 30 * 40) / 1000,
      pasos: [
        'Volumen: 50 · 30 · 40 = 60.000 cm³.',
        'Como 1 L = 1.000 cm³, dividimos por 1.000.',
        'Caben 60 L.',
      ],
      pista: 'Calcula el volumen en cm³ y conviértelo a litros.',
    },
  ],
};
