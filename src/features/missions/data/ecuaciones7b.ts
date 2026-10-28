import { Mission } from '../types';

/**
 * Misión 5 — Ecuaciones (7.º básico).
 * Ecuaciones de primer grado con una incógnita y problemas que se
 * resuelven planteando una ecuación.
 */
export const misionEcuaciones7b: Mission = {
  id: 'ecuaciones-7b',
  titulo: 'Ecuaciones',
  nivel: '7.º básico',
  unidad: 'Unidad 2 · Álgebra',
  corazonesIniciales: 3,
  xpPorCorrecta: 10,
  xpBonoCompletar: 20,
  preguntas: [
    {
      id: 'q7-01',
      habilidad: 'Ecuaciones aditivas',
      enunciado: 'Resuelve la ecuación:',
      expresion: 'x + 7 = 12',
      opciones: [
        { id: 'a', valor: 19, porQue: 'Sumaste 7 en vez de restarlo. Para despejar x, se resta 7 a ambos lados.' },
        { id: 'b', valor: -5, porQue: 'Revisa el orden: 12 − 7 = 5, no 7 − 12.' },
        { id: 'c', valor: 5 },
        { id: 'd', valor: 84, porQue: 'Multiplicaste 7 · 12. La operación inversa de sumar 7 es restar 7.' },
      ],
      correcta: 'c',
      calcular: () => 12 - 7,
      pasos: [
        'Para despejar x, restamos 7 a ambos lados.',
        'x + 7 − 7 = 12 − 7.',
        'x = 5. Comprobación: 5 + 7 = 12.',
      ],
      pista: '¿Qué número sumado con 7 da 12?',
    },
    {
      id: 'q7-02',
      habilidad: 'Ecuaciones multiplicativas',
      enunciado: 'Resuelve la ecuación:',
      expresion: '3x = 21',
      opciones: [
        { id: 'a', valor: 7 },
        { id: 'b', valor: 18, porQue: '3x significa 3 por x. La operación inversa es dividir por 3, no restar 3.' },
        { id: 'c', valor: 63, porQue: 'Multiplicaste por 3. Para despejar x hay que dividir por 3.' },
        { id: 'd', valor: 24, porQue: 'Sumaste 3. Como 3 multiplica a x, se divide por 3.' },
      ],
      correcta: 'a',
      calcular: () => 21 / 3,
      pasos: [
        '3x significa 3 · x.',
        'Dividimos ambos lados por 3: x = 21 : 3.',
        'x = 7. Comprobación: 3 · 7 = 21.',
      ],
      pista: '¿Qué número multiplicado por 3 da 21?',
    },
    {
      id: 'q7-03',
      habilidad: 'Ecuaciones de dos pasos',
      enunciado: 'Resuelve la ecuación:',
      expresion: '2x + 5 = 17',
      opciones: [
        { id: 'a', valor: 11, porQue: 'Sumaste 5 en vez de restarlo: (17 + 5) : 2. Primero se resta 5.' },
        { id: 'b', valor: 12, porQue: '12 es 2x. Falta dividir por 2 para encontrar x.' },
        { id: 'c', valor: 8.5, porQue: 'Dividiste 17 por 2 sin restar antes el 5.' },
        { id: 'd', valor: 6 },
      ],
      correcta: 'd',
      calcular: () => (17 - 5) / 2,
      pasos: [
        'Restamos 5 a ambos lados: 2x = 12.',
        'Dividimos por 2: x = 6.',
        'Comprobación: 2 · 6 + 5 = 17.',
      ],
      pista: 'Primero deja sola la parte con x y después divide.',
    },
    {
      id: 'q7-04',
      habilidad: 'Ecuaciones con división',
      enunciado: 'Resuelve la ecuación:',
      expresion: 'x : 4 = 3',
      opciones: [
        { id: 'a', valor: 3 / 4, texto: '3/4', porQue: 'Dividiste otra vez por 4. Lo contrario de dividir por 4 es multiplicar por 4.' },
        { id: 'b', valor: 12 },
        { id: 'c', valor: 7, porQue: 'Sumaste 3 + 4. La operación inversa de dividir es multiplicar.' },
        { id: 'd', valor: -1, porQue: 'Restaste 3 − 4. Para despejar x hay que multiplicar ambos lados por 4.' },
      ],
      correcta: 'b',
      calcular: () => 3 * 4,
      pasos: [
        'x está dividido por 4.',
        'Multiplicamos ambos lados por 4: x = 3 · 4.',
        'x = 12. Comprobación: 12 : 4 = 3.',
      ],
      pista: 'Usa la operación contraria a dividir.',
    },
    {
      id: 'q7-05',
      habilidad: 'Incógnita en ambos lados',
      enunciado: 'Resuelve la ecuación:',
      expresion: '5x − 3 = 2x + 9',
      opciones: [
        { id: 'a', valor: 12, porQue: '12 es 3x. Falta dividir por 3.' },
        { id: 'b', valor: 2, porQue: 'Al pasar el −3 al otro lado se suma: 9 + 3 = 12, no 9 − 3 = 6.' },
        { id: 'c', valor: 4 },
        { id: 'd', valor: -4, porQue: 'Revisa los signos: 5x − 2x = 3x y 9 + 3 = 12, ambos positivos.' },
      ],
      correcta: 'c',
      calcular: () => (9 + 3) / (5 - 2),
      pasos: [
        'Restamos 2x a ambos lados: 3x − 3 = 9.',
        'Sumamos 3 a ambos lados: 3x = 12.',
        'Dividimos por 3: x = 4. Comprobación: 5 · 4 − 3 = 17 y 2 · 4 + 9 = 17.',
      ],
      pista: 'Junta las x a un lado y los números al otro.',
    },
    {
      id: 'q7-06',
      habilidad: 'Plantear una ecuación',
      enunciado: 'Pedro tiene algunas láminas. Si le regalan 8, tendrá 23. ¿Cuántas láminas tiene ahora?',
      opciones: [
        { id: 'a', valor: 31, porQue: 'Sumaste 23 + 8. Si después de recibir 8 tiene 23, antes tenía menos.' },
        { id: 'b', valor: 15 },
        { id: 'c', valor: 23, porQue: '23 es lo que tendrá después del regalo. Se pregunta cuántas tiene ahora.' },
        { id: 'd', valor: 8, porQue: '8 son las láminas que le regalarán, no las que tiene.' },
      ],
      correcta: 'b',
      calcular: () => 23 - 8,
      pasos: [
        'Llamamos x a las láminas que tiene: x + 8 = 23.',
        'Restamos 8 a ambos lados: x = 15.',
        'Pedro tiene 15 láminas.',
      ],
      pista: 'Plantea «láminas actuales + 8 = 23».',
    },
    {
      id: 'q7-07',
      habilidad: 'Plantear una ecuación',
      enunciado: 'El doble de un número, disminuido en 4, es 10. ¿Cuál es el número?',
      opciones: [
        { id: 'a', valor: 3, porQue: 'Restaste 4 en vez de sumarlo: (10 − 4) : 2. La ecuación es 2x − 4 = 10.' },
        { id: 'b', valor: 14, porQue: '14 es el doble del número (2x). Falta dividir por 2.' },
        { id: 'c', valor: 7 },
        { id: 'd', valor: 12, porQue: 'Revisa: 2 · 12 − 4 = 20, no 10. Resuelve 2x − 4 = 10.' },
      ],
      correcta: 'c',
      calcular: () => (10 + 4) / 2,
      pasos: [
        'Planteamos: 2x − 4 = 10.',
        'Sumamos 4: 2x = 14.',
        'Dividimos por 2: x = 7.',
      ],
      pista: 'Escribe la ecuación: 2x − 4 = 10.',
    },
    {
      id: 'q7-08',
      habilidad: 'Ecuaciones en geometría',
      enunciado:
        'Un triángulo isósceles tiene dos lados iguales que miden x cm y un tercer lado de 12 cm. Si su perímetro es 30 cm, ¿cuánto mide x?',
      unidad: 'cm',
      opciones: [
        { id: 'a', valor: 18, porQue: '18 cm es lo que miden juntos los dos lados iguales. Falta dividir por 2.' },
        { id: 'b', valor: 21, porQue: 'Dividiste 30 por 2 y sumaste 6. Plantea 2x + 12 = 30.' },
        { id: 'c', valor: 6, porQue: 'Revisa: 2 · 6 + 12 = 24, no 30.' },
        { id: 'd', valor: 9 },
      ],
      correcta: 'd',
      calcular: () => (30 - 12) / 2,
      pasos: [
        'Perímetro: x + x + 12 = 30, es decir, 2x + 12 = 30.',
        'Restamos 12: 2x = 18.',
        'Dividimos por 2: x = 9 cm.',
      ],
      pista: 'Los dos lados iguales suman 30 − 12.',
    },
  ],
};
