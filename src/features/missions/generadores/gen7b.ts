import { entre, fraccion, Generador, mcd, n, p, uno } from './base';

/** Generadores de variantes para 7.º básico. */

// ── Enteros ──────────────────────────────────────────────────────────────
const sumaEnteros: Generador = {
  id: 'g7-ent-suma',
  crear: (rnd) => {
    const a = -entre(rnd, 3, 19);
    const b = entre(rnd, 2, 19);
    if (a + b === 0) return null;
    const r = a + b;
    return {
      habilidad: 'Adición de enteros de distinto signo',
      enunciado: 'Calcula el resultado:',
      expresion: `${n(a)} + ${n(b)}`,
      calcular: () => a + b,
      correcta: { valor: r },
      distractores: [
        { valor: -r, porQue: 'El signo quedó al revés: gana el número con mayor valor absoluto.' },
        { valor: a - b, porQue: 'Restaste el segundo número en vez de sumarlo.' },
        { valor: Math.abs(a) + b, porQue: 'Sumaste los valores absolutos. Con signos distintos se restan.' },
      ],
      pasos: [
        'Los números tienen distinto signo: se restan sus valores absolutos.',
        `|${n(a)}| = ${-a} y |${b}| = ${b}; la diferencia es ${Math.abs(-a - b)}.`,
        `El resultado lleva el signo del número con mayor valor absoluto: ${n(r)}.`,
      ],
      pista: 'Con signos distintos, resta los valores absolutos y conserva el signo del mayor.',
    };
  },
};

const temperatura: Generador = {
  id: 'g7-ent-temp',
  crear: (rnd) => {
    const ini = entre(rnd, -8, 6);
    const baja = entre(rnd, 4, 14);
    const r = ini - baja;
    return {
      habilidad: 'Sustracción de enteros en contexto',
      enunciado: `En Punta Arenas el termómetro marcaba ${n(ini)} °C y durante la noche bajó ${baja} °C. ¿Qué temperatura marcó?`,
      unidad: '°C',
      calcular: () => ini - baja,
      correcta: { valor: r },
      distractores: [
        { valor: ini + baja, porQue: 'Si la temperatura baja, se resta.' },
        { valor: -(ini + baja), porQue: 'Revisa el signo: parte de la temperatura inicial y resta lo que bajó.' },
        { valor: baja - ini, porQue: 'Restaste en el orden contrario. Se parte de la temperatura inicial.' },
      ],
      pasos: [
        'Bajar significa restar.',
        `${n(ini)} − ${baja}.`,
        `= ${n(r)} °C.`,
      ],
      pista: 'Ubícate en la recta numérica y avanza hacia la izquierda lo que bajó.',
    };
  },
};

const restaEnteros: Generador = {
  id: 'g7-ent-resta',
  crear: (rnd) => {
    const a = entre(rnd, -12, 12);
    const b = -entre(rnd, 2, 15);
    const r = a - b;
    return {
      habilidad: 'Sustracción de enteros',
      enunciado: 'Calcula el resultado:',
      expresion: `${n(a)} − ${p(b)}`,
      calcular: () => a - b,
      correcta: { valor: r },
      distractores: [
        { valor: a + b, porQue: 'Restar un negativo equivale a sumar su opuesto: − (−x) = + x.' },
        { valor: -r, porQue: 'Revisa el signo final del resultado.' },
        { valor: -a - b, porQue: 'Cambiaste el signo del primer número; ese se mantiene.' },
      ],
      pasos: [
        'Restar un número es sumar su opuesto.',
        `${n(a)} − ${p(b)} = ${n(a)} + ${-b}.`,
        `= ${n(r)}.`,
      ],
      pista: 'Restar un negativo es lo mismo que sumar su opuesto.',
    };
  },
};

// ── Fracciones y decimales ──────────────────────────────────────────────
const sumaFracciones: Generador = {
  id: 'g7-frac-suma',
  crear: (rnd) => {
    const b = uno(rnd, [2, 3, 4, 5, 6] as const);
    let d = uno(rnd, [3, 4, 6, 8, 10] as const);
    if (b === d) d = (d * 2) as typeof d;
    const a = entre(rnd, 1, b - 1);
    const c = entre(rnd, 1, d - 1);
    if (mcd(a, b) !== 1 || mcd(c, d) !== 1) return null;
    const num = a * d + c * b;
    const den = b * d;
    return {
      habilidad: 'Adición de fracciones',
      enunciado: 'Calcula la suma:',
      expresion: `${a}/${b} + ${c}/${d}`,
      calcular: () => a / b + c / d,
      correcta: { valor: num / den, texto: fraccion(num, den) },
      distractores: [
        { valor: (a + c) / (b + d), texto: fraccion(a + c, b + d), porQue: 'Sumaste numeradores y denominadores. Primero iguala los denominadores.' },
        { valor: (a + c) / (b * d), texto: fraccion(a + c, b * d), porQue: 'Al amplificar, también hay que multiplicar los numeradores.' },
        { valor: (a * c) / (b * d), texto: fraccion(a * c, b * d), porQue: 'Multiplicaste las fracciones. Se pedía sumarlas.' },
      ],
      pasos: [
        `Amplificamos a denominador común ${den}: ${a * d}/${den} + ${c * b}/${den}.`,
        `Sumamos los numeradores: ${num}/${den}.`,
        `Simplificamos: ${fraccion(num, den)}.`,
      ],
      pista: 'Antes de sumar, las fracciones deben tener el mismo denominador.',
    };
  },
};

const fraccionDeCantidad: Generador = {
  id: 'g7-frac-cantidad',
  crear: (rnd) => {
    const b = uno(rnd, [3, 4, 5, 6, 8] as const);
    const a = entre(rnd, 2, b - 1);
    if (mcd(a, b) !== 1) return null;
    const total = b * entre(rnd, 3, 12);
    const r = (total / b) * a;
    return {
      habilidad: 'Fracción de una cantidad',
      enunciado: `En un curso de ${total} estudiantes, ${a}/${b} prefiere el fútbol. ¿Cuántos estudiantes prefieren el fútbol?`,
      calcular: () => (total * a) / b,
      correcta: { valor: r },
      distractores: [
        { valor: total / b, porQue: `Eso es solo 1/${b}. Falta multiplicar por ${a}.` },
        { valor: total - r, porQue: 'Esos son los que no prefieren el fútbol.' },
        { valor: total * a, porQue: `Falta dividir por ${b}.` },
      ],
      pasos: [
        `Dividimos el total en ${b} partes: ${total} : ${b} = ${total / b}.`,
        `Tomamos ${a} de esas partes: ${total / b} · ${a}.`,
        `= ${r} estudiantes.`,
      ],
      pista: 'Divide por el denominador y multiplica por el numerador.',
    };
  },
};

const multDecimales: Generador = {
  id: 'g7-dec-mult',
  crear: (rnd) => {
    const a = entre(rnd, 2, 9) / 10;
    const b = entre(rnd, 11, 49) / 10;
    if ((a * 10) % 10 === 0 || (b * 10) % 10 === 0) return null;
    const r = Math.round(a * b * 100) / 100;
    return {
      habilidad: 'Multiplicación de decimales',
      enunciado: 'Calcula el producto:',
      expresion: `${n(a)} · ${n(b)}`,
      calcular: () => a * b,
      correcta: { valor: r },
      distractores: [
        { valor: r * 10, porQue: 'La coma va dos lugares a la izquierda: hay dos decimales en total.' },
        { valor: r / 10, porQue: 'Corriste la coma un lugar de más.' },
        { valor: Math.round((a + b) * 10) / 10, porQue: 'Sumaste los números. Se pedía multiplicarlos.' },
      ],
      pasos: [
        `Multiplicamos sin coma: ${a * 10} · ${b * 10} = ${Math.round(a * b * 100)}.`,
        'Entre los dos factores hay dos decimales.',
        `Resultado: ${n(r)}.`,
      ],
      pista: 'Multiplica como enteros y cuenta cuántos decimales hay en total.',
    };
  },
};

// ── Porcentajes ─────────────────────────────────────────────────────────
const porcentajeDe: Generador = {
  id: 'g7-pct-de',
  crear: (rnd) => {
    const pct = uno(rnd, [5, 10, 15, 20, 25, 30, 40, 75] as const);
    const total = 20 * entre(rnd, 2, 30);
    const r = (total * pct) / 100;
    return {
      habilidad: 'Porcentaje de una cantidad',
      enunciado: `¿Cuánto es el ${pct} % de ${n(total)}?`,
      calcular: () => (pct / 100) * total,
      correcta: { valor: r },
      distractores: [
        { valor: total / pct, porQue: `Dividiste por ${pct}. El ${pct} % es ${pct}/100 del total.` },
        { valor: total - r, porQue: `Eso es lo que queda al quitar el ${pct} %.` },
        { valor: (total * pct) / 10, porQue: 'Se divide por 100, no por 10.' },
      ],
      pasos: [
        `${pct} % = ${pct}/100.`,
        `${n(total)} · ${pct} : 100.`,
        `= ${n(r)}.`,
      ],
      pista: 'Un porcentaje indica cuántas partes se toman de cada cien.',
    };
  },
};

const descuento: Generador = {
  id: 'g7-pct-desc',
  crear: (rnd) => {
    const pct = uno(rnd, [10, 15, 20, 25, 30, 40, 50] as const);
    const precio = 1000 * entre(rnd, 4, 40);
    const desc = (precio * pct) / 100;
    const r = precio - desc;
    return {
      habilidad: 'Descuentos',
      enunciado: `Unas zapatillas cuestan $${n(precio)} y tienen un ${pct} % de descuento. ¿Cuánto se paga?`,
      prefijo: '$',
      calcular: () => precio * (1 - pct / 100),
      correcta: { valor: r },
      distractores: [
        { valor: desc, porQue: 'Ese es el descuento. Falta restarlo del precio.' },
        { valor: precio + desc, porQue: 'Un descuento se resta, no se suma.' },
        { valor: precio - pct, porQue: `Restaste ${pct} pesos, no el ${pct} %.` },
      ],
      pasos: [
        `Descuento: ${pct} % de $${n(precio)} = $${n(desc)}.`,
        `Precio final: $${n(precio)} − $${n(desc)}.`,
        `= $${n(r)}.`,
      ],
      pista: 'Calcula cuánto es el descuento y réstalo del precio.',
    };
  },
};

const quePorcentaje: Generador = {
  id: 'g7-pct-que',
  crear: (rnd) => {
    const total = uno(rnd, [20, 25, 40, 50, 200] as const);
    const pct = uno(rnd, [10, 20, 30, 40, 60, 80] as const);
    const parte = (total * pct) / 100;
    if (!Number.isInteger(parte)) return null;
    return {
      habilidad: 'Qué porcentaje representa',
      enunciado: `En una prueba de ${total} preguntas, Sofía contestó bien ${parte}. ¿Qué porcentaje contestó bien?`,
      unidad: '%',
      calcular: () => (parte / total) * 100,
      correcta: { valor: pct },
      distractores: [
        { valor: parte, porQue: `${parte} es la cantidad de preguntas, no el porcentaje.` },
        { valor: 100 - pct, porQue: 'Ese es el porcentaje que no contestó bien.' },
        { valor: Math.round((total / parte) * 100) / 100, porQue: 'Dividiste al revés: es parte / total · 100.' },
      ],
      pasos: [
        `Fracción contestada: ${parte}/${total}.`,
        `${parte} : ${total} = ${n(parte / total)}.`,
        `${n(parte / total)} · 100 = ${pct} %.`,
      ],
      pista: 'Divide la parte por el total y multiplica por 100.',
    };
  },
};

// ── Álgebra y ecuaciones ────────────────────────────────────────────────
const valorizar: Generador = {
  id: 'g7-alg-valor',
  crear: (rnd) => {
    const a = entre(rnd, 2, 9);
    const b = entre(rnd, 1, 15);
    const x = -entre(rnd, 1, 6);
    const r = a * x + b;
    return {
      habilidad: 'Valorización',
      enunciado: `Si x = ${n(x)}, ¿cuál es el valor de la expresión?`,
      expresion: `${a}x + ${b}`,
      calcular: () => a * x + b,
      correcta: { valor: r },
      distractores: [
        { valor: a * -x + b, porQue: 'x es negativo: el producto también es negativo.' },
        { valor: a * x - b, porQue: `El término ${b} se suma, no se resta.` },
        { valor: a + x + b, porQue: `${a}x es una multiplicación: ${a} · x.` },
      ],
      pasos: [
        `Reemplazamos x por ${p(x)}: ${a} · ${p(x)} + ${b}.`,
        `${a} · ${p(x)} = ${n(a * x)}.`,
        `${n(a * x)} + ${b} = ${n(r)}.`,
      ],
      pista: 'Reemplaza x por su valor, entre paréntesis, y respeta el orden de las operaciones.',
    };
  },
};

const semejantes: Generador = {
  id: 'g7-alg-semej',
  crear: (rnd) => {
    const a = entre(rnd, 2, 9);
    const b = entre(rnd, 2, 9);
    const c = entre(rnd, 1, a + b - 1);
    const r = a + b - c;
    if (r === 1) return null;
    return {
      habilidad: 'Términos semejantes',
      enunciado: 'Reduce la expresión:',
      expresion: `${a}x + ${b}x − ${c}x`,
      calcular: () => r,
      correcta: { valor: r, texto: `${r}x` },
      distractores: [
        { valor: a + b + c, texto: `${a + b + c}x`, porQue: `El último término se resta: − ${c}x.` },
        { valor: 1000 + r, texto: `${r}x³`, porQue: 'Al sumar términos semejantes el exponente no cambia.' },
        { valor: a - b - c === r ? -999 : a - b - c, texto: `${a - b - c === 1 ? '' : a - b - c === -1 ? '−' : n(a - b - c)}x`, porQue: `${b}x se suma: solo ${c}x se resta.` },
      ],
      pasos: [
        'Los tres términos tienen x: son semejantes.',
        `Operamos los coeficientes: ${a} + ${b} − ${c} = ${r}.`,
        `Resultado: ${r}x.`,
      ],
      pista: 'Opera solo los coeficientes; la parte literal se mantiene.',
    };
  },
};

const ecuacionDosPasos: Generador = {
  id: 'g7-ec-dos',
  crear: (rnd) => {
    const a = entre(rnd, 2, 9);
    const x = entre(rnd, 2, 12);
    const b = entre(rnd, 1, 20);
    const c = a * x + b;
    return {
      habilidad: 'Ecuaciones de dos pasos',
      enunciado: 'Resuelve la ecuación:',
      expresion: `${a}x + ${b} = ${c}`,
      calcular: () => (c - b) / a,
      correcta: { valor: x, texto: `x = ${x}` },
      distractores: [
        { valor: (c + b) / a, texto: `x = ${n((c + b) / a)}`, porQue: `Al pasar ${b} al otro lado se resta, no se suma.` },
        { valor: c - b, texto: `x = ${c - b}`, porQue: `Falta dividir por ${a}.` },
        { valor: c / a - b, texto: `x = ${n(c / a - b)}`, porQue: `Primero se resta ${b} y después se divide por ${a}.` },
      ],
      pasos: [
        `Restamos ${b} a ambos lados: ${a}x = ${c - b}.`,
        `Dividimos por ${a}: x = ${c - b} : ${a}.`,
        `x = ${x}.`,
      ],
      pista: 'Primero deja sola la parte con x y luego divide por el coeficiente.',
    };
  },
};

const plantearEcuacion: Generador = {
  id: 'g7-ec-plantear',
  crear: (rnd) => {
    const x = entre(rnd, 3, 25);
    const k = entre(rnd, 2, 4);
    const s = entre(rnd, 2, 20);
    const total = k * x + s;
    const veces = ['', '', 'el doble', 'el triple', 'el cuádruple'][k];
    return {
      habilidad: 'Plantear una ecuación',
      enunciado: `${veces[0].toUpperCase()}${veces.slice(1)} de un número, más ${s}, es ${total}. ¿Cuál es el número?`,
      calcular: () => (total - s) / k,
      correcta: { valor: x },
      distractores: [
        { valor: total - s, porQue: `Falta dividir por ${k}: es ${veces} del número.` },
        { valor: (total + s) / k, porQue: `${s} se suma en el enunciado; al despejar se resta.` },
        { valor: total / k - s === x ? -1 : total / k - s, porQue: `Primero se resta ${s} y después se divide.` },
      ],
      pasos: [
        `Planteamos: ${k}x + ${s} = ${total}.`,
        `${k}x = ${total - s}.`,
        `x = ${x}.`,
      ],
      pista: 'Llama x al número y traduce el enunciado a una ecuación.',
    };
  },
};

// ── Geometría ───────────────────────────────────────────────────────────
const areaTriangulo: Generador = {
  id: 'g7-geo-tri',
  crear: (rnd) => {
    const b = entre(rnd, 3, 20);
    const h = entre(rnd, 2, 15);
    if ((b * h) % 2 !== 0) return null;
    const r = (b * h) / 2;
    return {
      habilidad: 'Área del triángulo',
      enunciado: `Un triángulo tiene base ${b} cm y altura ${h} cm. ¿Cuál es su área?`,
      unidad: 'cm²',
      calcular: () => (b * h) / 2,
      correcta: { valor: r },
      distractores: [
        { valor: b * h, porQue: 'Ese es el área del rectángulo. El triángulo es la mitad.' },
        { valor: b + h, porQue: 'Sumaste base y altura. El área se calcula multiplicando.' },
        { valor: 2 * (b + h), porQue: 'Eso parece un perímetro. Se pide el área: base · altura : 2.' },
      ],
      pasos: [
        'Área del triángulo = base · altura : 2.',
        `${b} · ${h} = ${b * h}.`,
        `${b * h} : 2 = ${r} cm².`,
      ],
      pista: 'Un triángulo es la mitad de un rectángulo con la misma base y altura.',
    };
  },
};

const anguloTriangulo: Generador = {
  id: 'g7-geo-ang',
  crear: (rnd) => {
    const a = entre(rnd, 25, 85);
    const b = entre(rnd, 25, 85);
    const r = 180 - a - b;
    if (r <= 5) return null;
    return {
      habilidad: 'Ángulos interiores del triángulo',
      enunciado: `Dos ángulos interiores de un triángulo miden ${a}° y ${b}°. ¿Cuánto mide el tercero?`,
      unidad: '°',
      calcular: () => 180 - a - b,
      correcta: { valor: r },
      distractores: [
        { valor: 360 - a - b, porQue: 'Los ángulos interiores de un triángulo suman 180°, no 360°.' },
        { valor: a + b, porQue: 'Sumaste los dos ángulos. Falta restar esa suma a 180°.' },
        { valor: 90 - Math.abs(a - b) === r ? 1 : 90 - Math.abs(a - b), porQue: 'Los tres ángulos suman 180°: resta los dos conocidos.' },
      ],
      pasos: [
        'Los ángulos interiores de un triángulo suman 180°.',
        `${a}° + ${b}° = ${a + b}°.`,
        `180° − ${a + b}° = ${r}°.`,
      ],
      pista: '¿Cuánto suman los tres ángulos interiores de un triángulo?',
    };
  },
};

const areaTrapecio: Generador = {
  id: 'g7-geo-trap',
  crear: (rnd) => {
    const B = entre(rnd, 6, 18);
    const b = entre(rnd, 2, B - 2);
    const h = entre(rnd, 2, 10);
    if (((B + b) * h) % 2 !== 0) return null;
    const r = ((B + b) * h) / 2;
    return {
      habilidad: 'Área del trapecio',
      enunciado: `Un trapecio tiene bases de ${B} cm y ${b} cm, y altura ${h} cm. ¿Cuál es su área?`,
      unidad: 'cm²',
      calcular: () => ((B + b) / 2) * h,
      correcta: { valor: r },
      distractores: [
        { valor: (B + b) * h, porQue: 'Falta dividir por 2.' },
        { valor: B * b * h, porQue: 'Las bases se suman, no se multiplican.' },
        { valor: (B * h) / 2, porQue: 'Usaste solo la base mayor. Se suman ambas bases.' },
      ],
      pasos: [
        'Área del trapecio = (base mayor + base menor) · altura : 2.',
        `(${B} + ${b}) · ${h} = ${(B + b) * h}.`,
        `${(B + b) * h} : 2 = ${r} cm².`,
      ],
      pista: 'Suma las dos bases, multiplica por la altura y divide por 2.',
    };
  },
};

export const GENERADORES_7B: Record<string, Generador[]> = {
  'enteros-7b': [sumaEnteros, temperatura, restaEnteros],
  'fracciones-7b': [sumaFracciones, fraccionDeCantidad, multDecimales],
  'porcentajes-7b': [porcentajeDe, descuento, quePorcentaje],
  'algebra-7b': [valorizar, semejantes],
  'ecuaciones-7b': [ecuacionDosPasos, plantearEcuacion],
  'geometria-7b': [areaTriangulo, anguloTriangulo, areaTrapecio],
};
