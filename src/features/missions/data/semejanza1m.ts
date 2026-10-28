import { Mission } from '../types';

/**
 * Misión 1.º medio — Semejanza y teorema de Tales.
 * Razón de semejanza, escalas, Tales, homotecia y razón de áreas.
 */
export const misionSemejanza1m: Mission = {
  id: 'semejanza-1m',
  titulo: 'Semejanza y Tales',
  nivel: '1.º medio',
  unidad: 'Unidad 3 · Geometría',
  corazonesIniciales: 3,
  xpPorCorrecta: 10,
  xpBonoCompletar: 20,
  preguntas: [
    {
      id: 'h1-01',
      habilidad: 'Razón de semejanza',
      enunciado: 'Dos triángulos son semejantes con razón 2 : 5 (pequeño : grande). Un lado del pequeño mide 4 cm. ¿Cuánto mide el lado correspondiente del grande?',
      unidad: 'cm',
      opciones: [
        { id: 'a', valor: 10 },
        { id: 'b', valor: 7, porQue: 'Sumaste 3. En la semejanza las medidas se multiplican por una razón.' },
        { id: 'c', valor: 1.6, porQue: 'Invertiste la razón: el triángulo grande debe tener lados mayores.' },
        { id: 'd', valor: 20, porQue: 'Multiplicaste por 5 sin dividir por 2.' },
      ],
      correcta: 'a',
      calcular: () => (4 * 5) / 2,
      pasos: [
        'Planteamos la proporción: 2/5 = 4/x.',
        'x = 4 · 5 : 2.',
        'x = 10 cm.',
      ],
      pista: 'Plantea la proporción 2/5 = 4/x.',
    },
    {
      id: 'h1-02',
      habilidad: 'Escalas',
      enunciado: 'En un mapa a escala 1 : 50.000, dos ciudades están a 8 cm. ¿Cuál es la distancia real en kilómetros?',
      unidad: 'km',
      opciones: [
        { id: 'a', valor: 400, porQue: '8 · 50.000 = 400.000 cm, y eso son 4 km, no 400.' },
        { id: 'b', valor: 4 },
        { id: 'c', valor: 40, porQue: 'Revisa la conversión: 1 km = 100.000 cm.' },
        { id: 'd', valor: 0.4, porQue: 'Revisa la conversión: 400.000 cm son 4 km.' },
      ],
      correcta: 'b',
      calcular: () => (8 * 50000) / 100000,
      pasos: [
        'Distancia real: 8 · 50.000 = 400.000 cm.',
        '1 km = 100.000 cm.',
        '400.000 cm = 4 km.',
      ],
      pista: 'Multiplica por la escala y luego convierte centímetros a kilómetros.',
    },
    {
      id: 'h1-03',
      habilidad: 'Teorema de Tales',
      enunciado: 'Dos rectas paralelas cortan a dos transversales. En una, los segmentos miden 3 cm y 6 cm; en la otra, el primero mide 4 cm. ¿Cuánto mide el segundo?',
      unidad: 'cm',
      opciones: [
        { id: 'a', valor: 7, porQue: 'Sumaste 3. Tales establece una proporción, no una diferencia.' },
        { id: 'b', valor: 2, porQue: 'Invertiste la proporción: el segundo segmento es el doble del primero.' },
        { id: 'c', valor: 8 },
        { id: 'd', valor: 4.5, porQue: 'Revisa la proporción: 3/6 = 4/x, entonces x = 4 · 6 : 3.' },
      ],
      correcta: 'c',
      calcular: () => (4 * 6) / 3,
      pasos: [
        'Por Tales, los segmentos son proporcionales: 3/6 = 4/x.',
        'x = 4 · 6 : 3.',
        'x = 8 cm.',
      ],
      pista: 'Plantea 3/6 = 4/x.',
    },
    {
      id: 'h1-04',
      habilidad: 'Semejanza en contexto',
      enunciado: 'Un poste de 3 m proyecta una sombra de 2 m. A la misma hora, un edificio proyecta una sombra de 12 m. ¿Cuánto mide el edificio?',
      unidad: 'm',
      opciones: [
        { id: 'a', valor: 13, porQue: 'Sumaste 1, como si la diferencia se mantuviera. Lo que se mantiene es la razón.' },
        { id: 'b', valor: 8, porQue: 'Invertiste la razón: el objeto es más alto que su sombra (3 m frente a 2 m).' },
        { id: 'c', valor: 72, porQue: 'Multiplicaste los tres datos. Plantea 3/2 = h/12.' },
        { id: 'd', valor: 18 },
      ],
      correcta: 'd',
      calcular: () => (3 * 12) / 2,
      pasos: [
        'Los triángulos de cada objeto y su sombra son semejantes: 3/2 = h/12.',
        'h = 3 · 12 : 2.',
        'h = 18 m.',
      ],
      pista: 'Altura y sombra mantienen la misma razón en ambos objetos.',
    },
    {
      id: 'h1-05',
      habilidad: 'Razón de áreas',
      enunciado: 'Dos figuras semejantes tienen razón de semejanza 1 : 3. Si el área de la pequeña es 5 cm², ¿cuál es el área de la grande?',
      unidad: 'cm²',
      opciones: [
        { id: 'a', valor: 15, porQue: 'Las áreas no se multiplican por la razón, sino por su cuadrado: 3² = 9.' },
        { id: 'b', valor: 45 },
        { id: 'c', valor: 135, porQue: 'Usaste el cubo de la razón, que corresponde a volúmenes.' },
        { id: 'd', valor: 8, porQue: 'Sumaste 3. Las áreas se multiplican por el cuadrado de la razón.' },
      ],
      correcta: 'b',
      calcular: () => 5 * 3 ** 2,
      pasos: [
        'Si las longitudes se multiplican por 3, las áreas se multiplican por 3² = 9.',
        '5 · 9 = 45.',
        'El área de la grande es 45 cm².',
      ],
      pista: 'Las áreas cambian según el cuadrado de la razón de semejanza.',
    },
    {
      id: 'h1-06',
      habilidad: 'Homotecia',
      enunciado: 'Se aplica una homotecia de razón 3 a un segmento de 4 cm. ¿Cuánto mide el segmento imagen?',
      unidad: 'cm',
      opciones: [
        { id: 'a', valor: 7, porQue: 'Sumaste 3. Una homotecia multiplica las longitudes por su razón.' },
        { id: 'b', valor: 4 / 3, texto: '4/3 cm', porQue: 'Dividiste. Una razón mayor que 1 agranda la figura.' },
        { id: 'c', valor: 12 },
        { id: 'd', valor: 64, porQue: 'Elevaste a 3. La homotecia multiplica por la razón.' },
      ],
      correcta: 'c',
      calcular: () => 4 * 3,
      pasos: [
        'Una homotecia de razón k multiplica las longitudes por k.',
        '4 · 3 = 12.',
        'El segmento imagen mide 12 cm.',
      ],
      pista: 'La homotecia multiplica cada longitud por su razón.',
    },
    {
      // valor: 1 si los ángulos de ambos triángulos coinciden (criterio AA); las demás opciones usan otros códigos
      id: 'h1-07',
      habilidad: 'Criterios de semejanza',
      enunciado: 'Un triángulo tiene ángulos de 40° y 60°. Otro tiene ángulos de 60° y 80°. ¿Son semejantes?',
      opciones: [
        { id: 'a', valor: 0, texto: 'No, sus ángulos son distintos', porQue: 'Calcula el tercer ángulo de cada uno: ambos tienen 40°, 60° y 80°.' },
        { id: 'b', valor: 1, texto: 'Sí, por el criterio AA' },
        { id: 'c', valor: 2, texto: 'Solo si sus lados son iguales', porQue: 'Si los lados fueran iguales serían congruentes. La semejanza no exige lados iguales.' },
        { id: 'd', valor: 3, texto: 'No se puede saber', porQue: 'Con dos ángulos basta: el tercero se obtiene restando de 180°.' },
      ],
      correcta: 'b',
      calcular: () => {
        const t1 = [40, 60, 180 - 40 - 60].sort().join();
        const t2 = [60, 80, 180 - 60 - 80].sort().join();
        return t1 === t2 ? 1 : 0;
      },
      pasos: [
        'Tercer ángulo del primero: 180° − 40° − 60° = 80°.',
        'Tercer ángulo del segundo: 180° − 60° − 80° = 40°.',
        'Ambos tienen 40°, 60° y 80°: son semejantes por el criterio AA.',
      ],
      pista: 'Calcula el tercer ángulo de cada triángulo.',
    },
    {
      id: 'h1-08',
      habilidad: 'Perímetro de figuras semejantes',
      enunciado: 'Un triángulo tiene lados de 6, 8 y 10 cm. Uno semejante tiene su lado mayor de 25 cm. ¿Cuál es su perímetro?',
      unidad: 'cm',
      opciones: [
        { id: 'a', valor: 25, porQue: '25 cm es solo el lado mayor. Faltan los otros dos lados.' },
        { id: 'b', valor: 39, porQue: 'Sumaste 15 al perímetro, pero en la semejanza se multiplica: la razón es 25/10 = 2,5.' },
        { id: 'c', valor: 240, porQue: 'Multiplicaste por 10. La razón es 25 : 10 = 2,5.' },
        { id: 'd', valor: 60 },
      ],
      correcta: 'd',
      calcular: () => (6 + 8 + 10) * (25 / 10),
      pasos: [
        'Razón de semejanza: 25 : 10 = 2,5.',
        'Perímetro del original: 6 + 8 + 10 = 24 cm.',
        'Perímetro del semejante: 24 · 2,5 = 60 cm.',
      ],
      pista: 'Calcula la razón comparando los lados mayores.',
    },
  ],
};
