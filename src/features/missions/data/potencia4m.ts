import { Mission } from '../types';

/**
 * Misión 4.º medio — Función potencia.
 * f(x) = a · xⁿ: evaluar, paridad, comportamiento entre 0 y 1, despejes y
 * modelos de área, volumen y potencia.
 */
export const misionPotencia4m: Mission = {
  id: 'potencia-4m',
  titulo: 'Función potencia',
  nivel: '4.º medio',
  unidad: 'Unidad 2 · Álgebra y funciones',
  corazonesIniciales: 3,
  xpPorCorrecta: 10,
  xpBonoCompletar: 20,
  preguntas: [
    {
      id: 'p4-01',
      habilidad: 'Evaluar una función potencia',
      enunciado: 'Si f(x) = 2x³, ¿cuánto vale f(−2)?',
      opciones: [
        { id: 'a', valor: 16, porQue: 'Con exponente impar el signo se conserva: (−2)³ = −8.' },
        { id: 'b', valor: -64, porQue: 'Primero se eleva x y después se multiplica por 2: no es (2 · (−2))³.' },
        { id: 'c', valor: -16 },
        { id: 'd', valor: -12, porQue: 'x³ no es 3x: (−2)³ = −8.' },
      ],
      correcta: 'c',
      calcular: () => 2 * (-2) ** 3,
      pasos: [
        'Reemplazamos: f(−2) = 2 · (−2)³.',
        '(−2)³ = −8.',
        '2 · (−8) = −16.',
      ],
      pista: 'Calcula primero la potencia y después multiplica por el coeficiente.',
    },
    {
      // valor: exponente de la función
      id: 'p4-02',
      habilidad: 'Funciones pares e impares',
      enunciado: '¿Cuál de estas funciones es par, es decir, simétrica respecto del eje y?',
      opciones: [
        { id: 'a', valor: 3, texto: 'f(x) = x³', porQue: 'Con exponente impar, f(−x) = −f(x): es impar.' },
        { id: 'b', valor: 5, texto: 'f(x) = x⁵', porQue: 'Con exponente impar la función es impar.' },
        { id: 'c', valor: 1, texto: 'f(x) = 2x', porQue: 'Es una recta por el origen: f(−x) = −f(x), es impar.' },
        { id: 'd', valor: 4, texto: 'f(x) = x⁴' },
      ],
      correcta: 'd',
      calcular: () => [3, 5, 1, 4].find((e) => (-2) ** e === 2 ** e)!,
      pasos: [
        'Una función es par si f(−x) = f(x).',
        'Con exponente par, (−x)⁴ = x⁴.',
        'La función par es f(x) = x⁴.',
      ],
      pista: 'Una función es par si al cambiar x por −x se obtiene lo mismo.',
    },
    {
      // valor: exponente de la expresión
      id: 'p4-03',
      habilidad: 'Potencias entre 0 y 1',
      enunciado: 'Si 0 < x < 1, ¿cuál de estas expresiones tiene el mayor valor?',
      opciones: [
        { id: 'a', valor: 1, texto: 'x' },
        { id: 'b', valor: 2, texto: 'x²', porQue: 'Entre 0 y 1, al elevar a una potencia mayor el número se achica.' },
        { id: 'c', valor: 3, texto: 'x³', porQue: 'Para números entre 0 y 1, mientras mayor el exponente, menor el resultado.' },
        { id: 'd', valor: 4, texto: 'x⁴', porQue: 'Es la menor de las cuatro: multiplicar por un número menor que 1 achica.' },
      ],
      correcta: 'a',
      calcular: () => {
        const prueba = 0.5;
        return [1, 2, 3, 4].reduce((mejor, e) => (prueba ** e > prueba ** mejor ? e : mejor), 4);
      },
      pasos: [
        'Probemos con un medio: 0,5; 0,25; 0,125; 0,0625.',
        'Multiplicar por un número menor que 1 achica el resultado.',
        'El mayor es x.',
      ],
      pista: 'Prueba con un número entre 0 y 1, por ejemplo un medio, y compara.',
    },
    {
      id: 'p4-04',
      habilidad: 'Función potencia en geometría',
      enunciado: 'El área de un cuadrado es A(l) = l². Si el lado se triplica, ¿por cuánto se multiplica el área?',
      opciones: [
        { id: 'a', valor: 3, porQue: 'El área depende del cuadrado del lado: 3² = 9.' },
        { id: 'b', valor: 9 },
        { id: 'c', valor: 6, porQue: '3² no es 3 · 2.' },
        { id: 'd', valor: 27, porQue: '27 = 3³ corresponde al volumen de un cubo.' },
      ],
      correcta: 'b',
      calcular: () => (3 * 1) ** 2 / 1 ** 2,
      pasos: [
        'Con lado 3l, el área es (3l)² = 9l².',
        'Comparada con l², es 9 veces mayor.',
        'El área se multiplica por 9.',
      ],
      pista: 'Escribe el área con el nuevo lado y compárala con la original.',
    },
    {
      id: 'p4-05',
      habilidad: 'Despejar en una función potencia',
      enunciado: 'El volumen de un cubo es V(a) = a³. Si un cubo tiene 64 cm³, ¿cuánto mide su arista?',
      unidad: 'cm',
      opciones: [
        { id: 'a', valor: 8, porQue: '8 · 8 = 64, pero se busca un número que al cubo dé 64.' },
        { id: 'b', valor: 64 / 3, texto: '≈ 21,3 cm', porQue: 'La raíz cúbica no es dividir por 3.' },
        { id: 'c', valor: 4 },
        { id: 'd', valor: 16, porQue: '16 = 64 : 4; se busca a con a · a · a = 64.' },
      ],
      correcta: 'c',
      calcular: () => Math.cbrt(64),
      pasos: [
        'a³ = 64.',
        'a = ∛64.',
        '4 · 4 · 4 = 64, así que a = 4 cm.',
      ],
      pista: 'Busca el número que multiplicado tres veces por sí mismo da el volumen.',
    },
    {
      id: 'p4-06',
      habilidad: 'Determinar el coeficiente',
      enunciado: 'La función f(x) = a · x² pasa por el punto (2, 12). ¿Cuánto vale a?',
      opciones: [
        { id: 'a', valor: 6, porQue: 'Dividiste 12 por 2, pero x está al cuadrado: 12 : 2².' },
        { id: 'b', valor: 48, porQue: 'Multiplicaste 12 · 4; hay que dividir.' },
        { id: 'c', valor: 24, porQue: 'Multiplicaste 12 · 2; se despeja dividiendo por x².' },
        { id: 'd', valor: 3 },
      ],
      correcta: 'd',
      calcular: () => 12 / 2 ** 2,
      pasos: [
        'Reemplazamos el punto: 12 = a · 2².',
        '12 = 4a.',
        'a = 12 : 4 = 3.',
      ],
      pista: 'Reemplaza las coordenadas del punto en la función y despeja a.',
    },
    {
      id: 'p4-07',
      habilidad: 'Exponente negativo',
      enunciado: 'Si f(x) = 4 · x⁻¹, ¿cuánto vale f(8)?',
      opciones: [
        { id: 'a', valor: 0.5 },
        { id: 'b', valor: 2, porQue: 'Invertiste la división: es 4/8, no 8/4.' },
        { id: 'c', valor: 32, porQue: 'x⁻¹ = 1/x: se divide por 8, no se multiplica.' },
        { id: 'd', valor: -32, porQue: 'El exponente negativo no cambia el signo: indica el inverso.' },
      ],
      correcta: 'a',
      calcular: () => 4 * 8 ** -1,
      pasos: [
        'x⁻¹ = 1/x, así que f(x) = 4/x.',
        'f(8) = 4/8.',
        '= 0,5.',
      ],
      pista: 'Recuerda que un exponente −1 indica el inverso multiplicativo.',
    },
    {
      id: 'p4-08',
      habilidad: 'Modelos con función potencia',
      enunciado: 'La potencia de un aerogenerador es P = k · v³, donde v es la velocidad del viento. Si v se duplica, ¿por cuánto se multiplica P?',
      opciones: [
        { id: 'a', valor: 2, porQue: 'P no es proporcional a v: depende de v³.' },
        { id: 'b', valor: 8 },
        { id: 'c', valor: 4, porQue: '4 = 2² correspondería a una función de v².' },
        { id: 'd', valor: 6, porQue: '2³ no es 2 · 3.' },
      ],
      correcta: 'b',
      calcular: () => (2 * 1) ** 3 / 1 ** 3,
      pasos: [
        'Con velocidad 2v: P = k · (2v)³ = k · 8v³.',
        'Comparado con k · v³, es 8 veces mayor.',
        'La potencia se multiplica por 8.',
      ],
      pista: 'Reemplaza v por el doble y mira qué factor aparece.',
    },
  ],
};
