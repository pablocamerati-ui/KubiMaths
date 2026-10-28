import { entre, fraccion, Generador, n, p, sup, uno } from './base';

/** Generadores de variantes para 2.º medio. */

const mas = (v: number) => (v < 0 ? `− ${-v}` : `+ ${v}`);
const raiz = (k: number, r: number) => (k === 1 ? `√${r}` : `${k}√${r}`);
const factorial = (x: number): number => (x <= 1 ? 1 : x * factorial(x - 1));
const comb = (a: number, b: number) => factorial(a) / (factorial(b) * factorial(a - b));
const sub = (x: number) => String(x).split('').map((c) => '₀₁₂₃₄₅₆₇₈₉'[Number(c)]).join('');

// ── Raíces ──────────────────────────────────────────────────────────────
const simplificarRaiz: Generador = {
  id: 'g2-rai-simp',
  crear: (rnd) => {
    const k = entre(rnd, 2, 7);
    const r = uno(rnd, [2, 3, 5, 6, 7] as const);
    const rad = k * k * r;
    return {
      habilidad: 'Simplificar raíces',
      enunciado: 'Simplifica la raíz:',
      expresion: `√${rad}`,
      calcular: () => Math.sqrt(rad),
      correcta: { valor: k * Math.sqrt(r), texto: raiz(k, r) },
      distractores: [
        { valor: k * k * Math.sqrt(r), texto: raiz(k * k, r), porQue: `√${k * k} = ${k}, no ${k * k}.` },
        { valor: rad / 2, texto: n(rad / 2), porQue: 'La raíz cuadrada no es la mitad del número.' },
        { valor: r * Math.sqrt(k * k), texto: `${r}√${k * k}`, porQue: `El cuadrado perfecto (${k * k}) es el que sale de la raíz.` },
      ],
      pasos: [
        `Buscamos un cuadrado perfecto que divida a ${rad}: ${rad} = ${k * k} · ${r}.`,
        `√${rad} = √${k * k} · √${r}.`,
        `= ${raiz(k, r)}.`,
      ],
      pista: 'Escribe el radicando como un cuadrado perfecto por otro número.',
    };
  },
};

const sumaRaices: Generador = {
  id: 'g2-rai-suma',
  crear: (rnd) => {
    const r = uno(rnd, [2, 3, 5, 7] as const);
    const a = entre(rnd, 2, 9);
    const b = entre(rnd, 1, 9) * uno(rnd, [-1, 1] as const);
    const s = a + b;
    if (s <= 1 || a * b === s) return null;
    return {
      habilidad: 'Suma de raíces semejantes',
      enunciado: 'Reduce la expresión:',
      expresion: `${a}√${r} ${b < 0 ? '−' : '+'} ${raiz(Math.abs(b), r)}`,
      calcular: () => a * Math.sqrt(r) + b * Math.sqrt(r),
      correcta: { valor: s * Math.sqrt(r), texto: raiz(s, r) },
      distractores: [
        { valor: s * Math.sqrt(2 * r), texto: raiz(s, 2 * r), porQue: 'Los radicandos no se suman: la raíz se mantiene.' },
        { valor: a * b * Math.sqrt(r), texto: n(a * b) + `√${r}`, porQue: 'En una suma, los coeficientes se suman, no se multiplican.' },
        { valor: (a - b) * Math.sqrt(r), texto: (a - b === 1 ? '' : n(a - b)) + `√${r}`, porQue: 'Revisa el signo del segundo término.' },
      ],
      pasos: [
        `Los términos tienen la misma raíz, √${r}: son semejantes.`,
        `Operamos los coeficientes: ${a} ${mas(b)} = ${s}.`,
        `Resultado: ${raiz(s, r)}.`,
      ],
      pista: 'Trata la raíz como si fuera una letra y opera los coeficientes.',
    };
  },
};

const racionalizar: Generador = {
  id: 'g2-rai-rac',
  crear: (rnd) => {
    const r = uno(rnd, [2, 3, 5, 6, 7] as const);
    const k = entre(rnd, 1, 4);
    const num = k * r;
    return {
      habilidad: 'Racionalización',
      enunciado: 'Racionaliza el denominador:',
      expresion: `${num} / √${r}`,
      calcular: () => num / Math.sqrt(r),
      correcta: { valor: k * Math.sqrt(r), texto: raiz(k, r) },
      distractores: [
        { valor: num * Math.sqrt(r), texto: raiz(num, r), porQue: `Falta dividir por ${r}: √${r} · √${r} = ${r}.` },
        { valor: k, texto: n(k), porQue: 'La raíz del numerador no desaparece.' },
        { valor: Math.sqrt(num), texto: `√${num}`, porQue: `No se mete el numerador en la raíz: se amplifica por √${r}.` },
      ],
      pasos: [
        `Multiplicamos numerador y denominador por √${r}.`,
        `(${num} · √${r}) / (√${r} · √${r}) = ${num}√${r} / ${r}.`,
        `= ${raiz(k, r)}.`,
      ],
      pista: 'Amplifica la fracción por la raíz del denominador.',
    };
  },
};

// ── Logaritmos ──────────────────────────────────────────────────────────
const definicionLog: Generador = {
  id: 'g2-log-def',
  crear: (rnd) => {
    const b = uno(rnd, [2, 3, 4, 5, 10] as const);
    const e = entre(rnd, 2, b === 2 ? 7 : b === 10 ? 6 : 4);
    const arg = b ** e;
    return {
      habilidad: 'Definición de logaritmo',
      enunciado: '¿Cuál es el valor del logaritmo?',
      expresion: `log${b === 10 ? '' : sub(b)} ${n(arg)}`,
      calcular: () => Math.log(arg) / Math.log(b),
      correcta: { valor: e },
      distractores: [
        { valor: arg / b, porQue: 'El logaritmo no es una división: es el exponente al que se eleva la base.' },
        { valor: e - 1, porQue: `Revisa: ${b} elevado a ${e - 1} es ${n(b ** (e - 1))}.` },
        { valor: e + 1, porQue: `Revisa: ${b} elevado a ${e + 1} es ${n(b ** (e + 1))}.` },
      ],
      pasos: [
        `Buscamos el exponente x tal que ${b}ˣ = ${n(arg)}.`,
        `${b} multiplicado ${e} veces por sí mismo da ${n(arg)}.`,
        `El logaritmo vale ${e}.`,
      ],
      pista: 'El logaritmo es el exponente al que hay que elevar la base para obtener el número.',
    };
  },
};

const logProducto: Generador = {
  id: 'g2-log-prod',
  crear: (rnd) => {
    const a = entre(rnd, 1, 4);
    const b = entre(rnd, 1, 4);
    const x = 10 ** a;
    const y = 10 ** b;
    if (a === b) return null;
    return {
      habilidad: 'Logaritmo de un producto',
      enunciado: 'Calcula usando propiedades:',
      expresion: `log ${n(x)} + log ${n(y)}`,
      calcular: () => Math.log10(x * y),
      correcta: { valor: a + b },
      distractores: [
        { valor: a * b, porQue: 'La suma de logaritmos es el logaritmo del producto: los exponentes se suman.' },
        { valor: x + y, porQue: 'Sumaste los números, no sus logaritmos.' },
        { valor: Math.round(Math.log10(x + y) * 100) / 100, porQue: 'log a + log b = log(a · b), no log(a + b).' },
      ],
      pasos: [
        `log ${n(x)} = ${a} y log ${n(y)} = ${b}.`,
        `${a} + ${b}.`,
        `= ${a + b} (también: log ${n(x * y)}).`,
      ],
      pista: 'Calcula cada logaritmo en base 10 por separado, o usa log a + log b = log(a · b).',
    };
  },
};

const ecExponencial: Generador = {
  id: 'g2-log-expo',
  crear: (rnd) => {
    const b = uno(rnd, [2, 3, 5] as const);
    const x = entre(rnd, 2, b === 2 ? 7 : 4);
    const k = entre(rnd, 0, 3);
    const total = b ** (x + k);
    return {
      habilidad: 'Ecuaciones exponenciales',
      enunciado: 'Resuelve la ecuación:',
      expresion: `${b}ˣ${k ? `⁺${sup(k)}` : ''} = ${n(total)}`,
      calcular: () => Math.round(Math.log(total) / Math.log(b)) - k,
      correcta: { valor: x, texto: `x = ${x}` },
      distractores: [
        { valor: x + k === x ? x + 2 : x + k, texto: `x = ${x + k === x ? x + 2 : x + k}`, porQue: k ? `Ese es el exponente completo, x + ${k}. Falta restar ${k}.` : 'Revisa la potencia: cuenta cuántas veces se multiplica la base.' },
        { valor: total / b, texto: `x = ${n(total / b)}`, porQue: 'Se igualan los exponentes, no se divide por la base.' },
        { valor: x - 1, texto: `x = ${x - 1}`, porQue: `Revisa: ${b} elevado a ${x - 1 + k} no es ${n(total)}.` },
      ],
      pasos: [
        `Escribimos ${n(total)} como potencia de ${b}: ${n(total)} = ${b}${sup(x + k)}.`,
        `Igualamos exponentes: x${k ? ` + ${k}` : ''} = ${x + k}.`,
        `x = ${x}.`,
      ],
      pista: 'Escribe ambos lados como potencias de la misma base e iguala los exponentes.',
    };
  },
};

// ── Función cuadrática ──────────────────────────────────────────────────
const vertice: Generador = {
  id: 'g2-cua-vert',
  crear: (rnd) => {
    const h = entre(rnd, -5, 5);
    const k = entre(rnd, -9, 9);
    if (h === 0) return null;
    const b = -2 * h;
    const c = h * h + k;
    // valor: código = 100·h + k
    return {
      habilidad: 'Vértice',
      enunciado: `¿Cuál es el vértice de la parábola f(x) = x² ${mas(b)}x ${mas(c)}?`.replace(' + 0', '').replace(' − 0', ''),
      calcular: () => 100 * (-b / 2) + (c - (b * b) / 4),
      correcta: { valor: 100 * h + k, texto: `(${n(h)}, ${n(k)})` },
      distractores: [
        { valor: -100 * h + 3 * h * h + k + 0.125, texto: `(${n(-h)}, ${n(3 * h * h + k)})`, porQue: 'La coordenada x del vértice es −b/(2a): revisa el signo.' },
        { valor: 100 * h + c + 0.5, texto: `(${n(h)}, ${n(c)})`, porQue: `${n(c)} es el corte con el eje y. Evalúa f en x = ${n(h)}.` },
        { valor: 100 * b + c, texto: `(${n(b)}, ${n(c)})`, porQue: 'Las coordenadas del vértice no son los coeficientes: x = −b/(2a).' },
      ],
      pasos: [
        `x del vértice = −b/(2a) = ${n(-b)}/2 = ${n(h)}.`,
        `f(${n(h)}) = ${p(h)}² ${mas(b)} · ${p(h)} ${mas(c)} = ${n(k)}.`,
        `Vértice: (${n(h)}, ${n(k)}).`,
      ],
      pista: 'La coordenada x del vértice es −b/(2a); luego evalúa la función en ese valor.',
    };
  },
};

const evaluarCuadratica: Generador = {
  id: 'g2-cua-eval',
  crear: (rnd) => {
    const a = entre(rnd, 1, 3) * uno(rnd, [-1, 1] as const);
    const b = entre(rnd, -6, 6);
    const c = entre(rnd, -9, 9);
    const x = -entre(rnd, 1, 4);
    if (b === 0 || c === 0) return null;
    const r = a * x * x + b * x + c;
    const ax = a === 1 ? '' : a === -1 ? '−' : n(a);
    return {
      habilidad: 'Evaluar una función cuadrática',
      enunciado: `Si f(x) = ${ax}x² ${mas(b)}x ${mas(c)}, ¿cuánto vale f(${n(x)})?`,
      calcular: () => a * x ** 2 + b * x + c,
      correcta: { valor: r },
      distractores: [
        { valor: -a * x * x + b * x + c, porQue: `${p(x)}² es positivo: el cuadrado de un negativo es positivo.` },
        { valor: a * 2 * x + b * x + c, porQue: 'x² es x · x, no 2 · x.' },
        { valor: a * x * x - b * x + c, porQue: `Revisa el signo de ${n(b)} · ${p(x)}.` },
      ],
      pasos: [
        `Reemplazamos x por ${p(x)}: ${n(a)} · ${p(x)}² ${mas(b)} · ${p(x)} ${mas(c)}.`,
        `${n(a)} · ${x * x} ${mas(b * x)} ${mas(c)}.`,
        `f(${n(x)}) = ${n(r)}.`,
      ],
      pista: 'Reemplaza x entre paréntesis y calcula primero la potencia.',
    };
  },
};

const ceros: Generador = {
  id: 'g2-cua-ceros',
  crear: (rnd) => {
    const r1 = entre(rnd, -7, 7);
    const r2 = entre(rnd, -7, 7);
    if (r1 >= r2 || r1 === -r2) return null;
    const b = -(r1 + r2);
    const c = r1 * r2;
    if (b === 0 || c === 0) return null;
    // valor: código = 100·menor + mayor
    return {
      habilidad: 'Ceros de la función',
      enunciado: `¿En qué valores de x la parábola f(x) = x² ${mas(b)}x ${mas(c)} corta el eje x?`,
      calcular: () => {
        const d = Math.sqrt(b * b - 4 * c);
        return 100 * ((-b - d) / 2) + (-b + d) / 2;
      },
      correcta: { valor: 100 * r1 + r2, texto: `x = ${n(r1)} y x = ${n(r2)}` },
      distractores: [
        { valor: 100 * -r2 + -r1, texto: `x = ${n(-r2)} y x = ${n(-r1)}`, porQue: `Si (x ${mas(-r1)}) = 0, entonces x = ${n(r1)}: el signo cambia.` },
        { valor: 100 * 0 + c + 0.5, texto: `x = 0 y x = ${n(c)}`, porQue: `${n(c)} es el corte con el eje y, no con el eje x.` },
        { valor: 100 * r1 * 2 + r2 + 0.25, texto: `x = ${n(r1 * 2)} y x = ${n(r2 * 2)}`, porQue: 'Revisa: los números buscados deben sumar −b y multiplicar c.' },
      ],
      pasos: [
        `Buscamos dos números que sumen ${n(-b)} y multipliquen ${n(c)}: ${n(r1)} y ${n(r2)}.`,
        `f(x) = (x ${mas(-r1)})(x ${mas(-r2)}).`,
        `Los ceros son x = ${n(r1)} y x = ${n(r2)}.`,
      ],
      pista: 'Iguala la función a cero y factoriza.',
    };
  },
};

// ── Ecuación de segundo grado ───────────────────────────────────────────
const discriminante: Generador = {
  id: 'g2-ec-disc',
  crear: (rnd) => {
    const b = entre(rnd, -8, 8);
    const c = entre(rnd, -10, 16);
    if (b === 0 || c === 0) return null;
    const d = b * b - 4 * c;
    const cant = d < 0 ? 0 : d === 0 ? 1 : 2;
    const nombres = ['Ninguna', 'Una', 'Dos'];
    const otros = [0, 1, 2].filter((v) => v !== cant);
    const motivo = () =>
      `Δ = ${n(b * b)} − ${p(4 * c)} = ${n(d)}, ${d < 0 ? 'negativo: no hay soluciones reales' : d === 0 ? 'cero: hay una sola solución' : 'positivo: hay dos soluciones'}`;
    return {
      habilidad: 'Discriminante',
      enunciado: '¿Cuántas soluciones reales tiene la ecuación?',
      expresion: `x² ${mas(b)}x ${mas(c)} = 0`,
      calcular: () => cant,
      correcta: { valor: cant, texto: nombres[cant] },
      distractores: [
        { valor: otros[0], texto: nombres[otros[0]], porQue: motivo() },
        { valor: otros[1], texto: nombres[otros[1]], porQue: motivo() },
        { valor: 3, texto: 'Tres', porQue: 'Una ecuación de segundo grado tiene a lo más dos soluciones.' },
      ],
      pasos: [
        `Δ = b² − 4ac = ${p(b)}² − 4 · 1 · ${p(c)}.`,
        `Δ = ${n(d)}.`,
        d < 0 ? 'Δ < 0: no hay soluciones reales.' : d === 0 ? 'Δ = 0: hay una sola solución.' : 'Δ > 0: hay dos soluciones reales.',
      ],
      pista: 'Calcula el discriminante b² − 4ac y fíjate en su signo.',
    };
  },
};

const incompleta: Generador = {
  id: 'g2-ec-inc',
  crear: (rnd) => {
    const r = entre(rnd, 2, 12);
    const a = entre(rnd, 1, 3);
    const c = a * r * r;
    if (c / (2 * a) === r) return null;
    // valor: producto de las soluciones
    return {
      habilidad: 'Ecuación incompleta',
      enunciado: 'Resuelve la ecuación:',
      expresion: `${a === 1 ? '' : a}x² = ${c}`,
      calcular: () => -(c / a),
      correcta: { valor: -r * r, texto: `x = ${r} y x = −${r}` },
      distractores: [
        { valor: r + 0.5, texto: `Solo x = ${r}`, porQue: `(−${r})² también es ${r * r}: hay dos soluciones.` },
        { valor: c / (2 * a) + 0.25, texto: `x = ${n(c / (2 * a))}`, porQue: 'Para despejar x² se saca raíz, no se divide por 2.' },
        { valor: -(c * c), texto: `x = ${c} y x = −${c}`, porQue: a === 1 ? `Falta sacar la raíz: √${c} = ${r}.` : `Divide por ${a} y luego saca la raíz.` },
      ],
      pasos: [
        a === 1 ? `x² = ${c}.` : `Dividimos por ${a}: x² = ${r * r}.`,
        `x = √${r * r} o x = −√${r * r}.`,
        `x = ${r} o x = −${r}.`,
      ],
      pista: 'Despeja x² y saca raíz; recuerda que hay dos signos posibles.',
    };
  },
};

const sumaProducto: Generador = {
  id: 'g2-ec-sp',
  crear: (rnd) => {
    const r1 = entre(rnd, 1, 9);
    const r2 = entre(rnd, 1, 9);
    if (r1 === r2) return null;
    const s = r1 + r2;
    const pr = r1 * r2;
    const pideSuma = rnd() < 0.5;
    return {
      habilidad: pideSuma ? 'Suma de las soluciones' : 'Producto de las soluciones',
      enunciado: `Si a y b son las soluciones de x² − ${s}x + ${pr} = 0, ¿cuánto es ${pideSuma ? 'a + b' : 'a · b'}?`,
      calcular: () => {
        const d = Math.sqrt(s * s - 4 * pr);
        const x1 = (s + d) / 2;
        const x2 = (s - d) / 2;
        return pideSuma ? x1 + x2 : x1 * x2;
      },
      correcta: { valor: pideSuma ? s : pr },
      distractores: [
        { valor: pideSuma ? pr : s, porQue: pideSuma ? 'Ese es el producto (c/a), no la suma.' : 'Esa es la suma (−b/a), no el producto.' },
        { valor: pideSuma ? -s : -pr, porQue: pideSuma ? 'La suma es −b/a = −(−' + s + '), positiva.' : 'El producto es c/a, positivo aquí.' },
        { valor: Math.max(r1, r2), porQue: 'Ese es solo una de las soluciones.' },
      ],
      pasos: [
        `Factorizamos: (x − ${Math.min(r1, r2)})(x − ${Math.max(r1, r2)}) = 0.`,
        `Las soluciones son ${Math.min(r1, r2)} y ${Math.max(r1, r2)}.`,
        pideSuma ? `a + b = ${s} (también −b/a).` : `a · b = ${pr} (también c/a).`,
      ],
      pista: pideSuma ? 'Usa la relación −b/a o encuentra ambas soluciones.' : 'Usa la relación c/a o encuentra ambas soluciones.',
    };
  },
};

// ── Trigonometría ───────────────────────────────────────────────────────
const TRIOS = [
  [3, 4, 5],
  [5, 12, 13],
  [8, 15, 17],
  [7, 24, 25],
  [20, 21, 29],
  [9, 40, 41],
] as const;

const razonTrig: Generador = {
  id: 'g2-tri-razon',
  crear: (rnd) => {
    const [x, y, h] = uno(rnd, TRIOS);
    const [op, ad] = rnd() < 0.5 ? [x, y] : [y, x];
    const cual = uno(rnd, ['seno', 'coseno', 'tangente'] as const);
    const val = { seno: [op, h], coseno: [ad, h], tangente: [op, ad] } as const;
    const [a, b] = val[cual];
    const otras = (['seno', 'coseno', 'tangente'] as const).filter((r) => r !== cual);
    const def = { seno: 'opuesto / hipotenusa', coseno: 'adyacente / hipotenusa', tangente: 'opuesto / adyacente' };
    return {
      habilidad: cual === 'seno' ? 'Seno' : cual === 'coseno' ? 'Coseno' : 'Tangente',
      enunciado: `Un triángulo rectángulo tiene catetos de ${x} y ${y} cm, e hipotenusa de ${h} cm. ¿Cuál es ${cual === 'tangente' ? 'la' : 'el'} ${cual} del ángulo opuesto al cateto de ${op} cm?`,
      calcular: () => a / b,
      correcta: { valor: a / b, texto: `${a}/${b}` },
      distractores: [
        { valor: val[otras[0]][0] / val[otras[0]][1], texto: `${val[otras[0]][0]}/${val[otras[0]][1]}`, porQue: `Esa razón es el ${otras[0]}: ${def[otras[0]]}.` },
        { valor: val[otras[1]][0] / val[otras[1]][1], texto: `${val[otras[1]][0]}/${val[otras[1]][1]}`, porQue: `Esa razón es el ${otras[1]}: ${def[otras[1]]}.` },
        { valor: b / a, texto: `${b}/${a}`, porQue: `Invertiste la razón. El ${cual} es ${def[cual]}.` },
      ],
      pasos: [
        `${cual[0].toUpperCase()}${cual.slice(1)} = ${def[cual]}.`,
        `Opuesto: ${op} cm; adyacente: ${ad} cm; hipotenusa: ${h} cm.`,
        `${cual[0].toUpperCase()}${cual.slice(1)} = ${a}/${b}.`,
      ],
      pista: 'Identifica el cateto opuesto, el adyacente y la hipotenusa respecto del ángulo.',
    };
  },
};

const elevacion: Generador = {
  id: 'g2-tri-elev',
  crear: (rnd) => {
    const ang = uno(rnd, [30, 45, 60] as const);
    const dist = uno(rnd, [6, 10, 12, 15, 20, 30] as const);
    const tan = { 30: 1 / Math.sqrt(3), 45: 1, 60: Math.sqrt(3) }[ang];
    const tanTxt = { 30: '√3/3', 45: '1', 60: '√3' }[ang];
    const altura = dist * tan;
    const fmt = (v: number) => (Number.isInteger(Math.round(v * 1e9) / 1e9) ? n(Math.round(v)) : `≈ ${n(Math.round(v * 10) / 10)}`);
    return {
      habilidad: 'Ángulo de elevación',
      enunciado: `Desde un punto a ${dist} m de una torre se ve su punta con un ángulo de elevación de ${ang}°. ¿Cuánto mide la torre?`,
      unidad: 'm',
      calcular: () => dist * Math.tan((ang * Math.PI) / 180),
      correcta: { valor: altura, texto: `${fmt(altura)} m` },
      distractores: [
        { valor: dist / tan, texto: `${fmt(dist / tan)} m`, porQue: 'Dividiste por la tangente. La altura es distancia · tan del ángulo.' },
        { valor: dist / Math.cos((ang * Math.PI) / 180), texto: `${fmt(dist / Math.cos((ang * Math.PI) / 180))} m`, porQue: 'Calculaste la línea de visión (la hipotenusa), no la altura.' },
        { valor: dist * Math.sin((ang * Math.PI) / 180), texto: `${fmt(dist * Math.sin((ang * Math.PI) / 180))} m`, porQue: 'Usaste el seno. Con la distancia horizontal y la altura se usa la tangente.' },
      ],
      pasos: [
        `tan ${ang}° = altura / distancia.`,
        `Altura = ${dist} · tan ${ang}° = ${dist} · ${tanTxt}.`,
        `Altura ${fmt(altura).startsWith('≈') ? fmt(altura) : `= ${fmt(altura)}`} m.`,
      ],
      pista: 'Relaciona la altura (cateto opuesto) con la distancia (cateto adyacente).',
    };
  },
};

const identidad: Generador = {
  id: 'g2-tri-ident',
  crear: (rnd) => {
    const [x, y, h] = uno(rnd, TRIOS);
    const [s, c] = rnd() < 0.5 ? [x, y] : [y, x];
    return {
      habilidad: 'Identidad fundamental',
      enunciado: `Si sen α = ${s}/${h} y α es agudo, ¿cuánto vale cos α?`,
      calcular: () => Math.sqrt(1 - (s / h) ** 2),
      correcta: { valor: c / h, texto: `${c}/${h}` },
      distractores: [
        { valor: (h - s) / h, texto: `${h - s}/${h}`, porQue: 'La identidad usa cuadrados: sen² α + cos² α = 1.' },
        { valor: (c * c) / (h * h), texto: `${c * c}/${h * h}`, porQue: 'Ese es cos² α. Falta sacar la raíz.' },
        { valor: h / c, texto: `${h}/${c}`, porQue: 'Invertiste la razón. El coseno de un ángulo agudo es menor que 1.' },
      ],
      pasos: [
        'sen² α + cos² α = 1.',
        `cos² α = 1 − ${s * s}/${h * h} = ${c * c}/${h * h}.`,
        `cos α = ${c}/${h}.`,
      ],
      pista: 'Usa la identidad sen² α + cos² α = 1.',
    };
  },
};

// ── Combinatoria y probabilidad ─────────────────────────────────────────
const permutaciones: Generador = {
  id: 'g2-prob-perm',
  crear: (rnd) => {
    const k = entre(rnd, 3, 6);
    const cosas = uno(rnd, ['libros en un estante', 'personas en una fila', 'fotos en un mural'] as const);
    return {
      habilidad: 'Permutaciones',
      enunciado: `¿De cuántas formas distintas se pueden ordenar ${k} ${cosas}?`,
      calcular: () => factorial(k),
      correcta: { valor: factorial(k) },
      distractores: [
        { valor: k * k, porQue: `Calculaste ${k}². Las opciones bajan en cada lugar: ${k}, ${k - 1}, …` },
        { valor: (k * (k + 1)) / 2, porQue: 'Sumaste las opciones. Se multiplican.' },
        { valor: k, porQue: 'Hay muchas más formas que elementos.' },
      ],
      pasos: [
        `Primer lugar: ${k} opciones; segundo: ${k - 1}; y así hasta 1.`,
        `${Array.from({ length: k }, (_, i) => k - i).join(' · ')} = ${k}!.`,
        `= ${factorial(k)} formas.`,
      ],
      pista: 'Cuenta las opciones para cada lugar y multiplícalas.',
    };
  },
};

const combinaciones: Generador = {
  id: 'g2-prob-comb',
  crear: (rnd) => {
    const total = entre(rnd, 4, 9);
    const k = entre(rnd, 2, 3);
    const r = comb(total, k);
    const v = factorial(total) / factorial(total - k);
    return {
      habilidad: 'Combinaciones',
      enunciado: `Se elige una comisión de ${k} estudiantes entre ${total} (el orden no importa). ¿Cuántas comisiones distintas se pueden formar?`,
      calcular: () => r,
      correcta: { valor: r },
      distractores: [
        { valor: v, porQue: `Así cuentas cada comisión ${factorial(k)} veces, como si el orden importara. Divide por ${k}!.` },
        { valor: total ** k, porQue: 'Una persona no puede estar dos veces en la comisión.' },
        { valor: total * k, porQue: 'No se multiplica el total por el tamaño de la comisión.' },
      ],
      pasos: [
        `Si el orden importara: ${Array.from({ length: k }, (_, i) => total - i).join(' · ')} = ${v}.`,
        `Cada comisión se repite ${k}! = ${factorial(k)} veces.`,
        `${v} : ${factorial(k)} = ${r} comisiones.`,
      ],
      pista: 'Cuenta como si importara el orden y luego divide por las repeticiones.',
    };
  },
};

const complemento: Generador = {
  id: 'g2-prob-comp',
  crear: (rnd) => {
    const veces = entre(rnd, 2, 5);
    const total = 2 ** veces;
    const cara = uno(rnd, ['cara', 'sello'] as const);
    const ning = cara === 'cara' ? 'ninguna' : 'ningún';
    const un = cara === 'cara' ? 'una' : 'un';
    const objeto = uno(rnd, [`Se lanza una moneda ${veces} veces`, `Se lanzan ${veces} monedas a la vez`] as const);
    return {
      habilidad: 'Evento complementario',
      enunciado: `${objeto}. ¿Cuál es la probabilidad de obtener al menos ${un} ${cara}?`,
      calcular: () => 1 - (1 / 2) ** veces,
      correcta: { valor: (total - 1) / total, texto: `${total - 1}/${total}` },
      distractores: [
        { valor: 1 / total, texto: `1/${total}`, porQue: `Esa es la probabilidad de no obtener ${ning} ${cara}: el complemento.` },
        { valor: 1 / 2, texto: '1/2', porQue: `1/2 es la probabilidad de ${cara} en una sola moneda.` },
        { valor: veces / total, texto: fraccion(veces, total), porQue: `Esa es la probabilidad de exactamente ${un} ${cara}.` },
      ],
      pasos: [
        `Lo contrario de «al menos ${un} ${cara}» es «${ning} ${cara}».`,
        `P(${ning} ${cara}) = (1/2)${sup(veces)} = 1/${total}.`,
        `P(al menos ${un} ${cara}) = 1 − 1/${total} = ${total - 1}/${total}.`,
      ],
      pista: 'Calcula la probabilidad de lo contrario y réstala de 1.',
    };
  },
};

const valorEsperado: Generador = {
  id: 'g2-prob-esp',
  crear: (rnd) => {
    const premio = 600 * entre(rnd, 1, 10);
    const caras = uno(rnd, [1, 2, 3] as const);
    const r = (premio * caras) / 6;
    return {
      habilidad: 'Valor esperado',
      enunciado: `Un juego paga $${n(premio)} si al lanzar un dado sale un número menor o igual que ${caras}, y nada en otro caso. ¿Cuál es la ganancia esperada por jugada?`,
      prefijo: '$',
      calcular: () => premio * (caras / 6),
      correcta: { valor: r },
      distractores: [
        { valor: premio, porQue: 'Ese es el premio, pero no se gana siempre.' },
        { valor: premio / 6, porQue: `Hay ${caras} resultados ganadores, no uno.` },
        { valor: premio * caras, porQue: 'Falta multiplicar por la probabilidad de cada resultado (1/6).' },
      ],
      pasos: [
        `P(ganar) = ${caras}/6.`,
        `Valor esperado = ${n(premio)} · ${caras}/6 + 0.`,
        `= $${n(r)} por jugada.`,
      ],
      pista: 'Multiplica cada ganancia por su probabilidad y suma.',
    };
  },
};

export const GENERADORES_2M: Record<string, Generador[]> = {
  'raices-2m': [simplificarRaiz, sumaRaices, racionalizar],
  'logaritmos-2m': [definicionLog, logProducto, ecExponencial],
  'cuadratica-2m': [vertice, evaluarCuadratica, ceros],
  'ecuacion-2m': [discriminante, incompleta, sumaProducto],
  'trigonometria-2m': [razonTrig, elevacion, identidad],
  'probabilidad-2m': [permutaciones, combinaciones, complemento, valorEsperado],
};
