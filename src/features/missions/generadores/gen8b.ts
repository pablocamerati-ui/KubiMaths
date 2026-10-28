import { entre, Generador, n, p, sup, uno } from './base';

/** Generadores de variantes para 8.º básico. */

// ── Enteros: multiplicación y división ──────────────────────────────────
const multEnteros: Generador = {
  id: 'g8-ent-mult',
  crear: (rnd) => {
    const a = entre(rnd, 2, 12) * uno(rnd, [-1, 1] as const);
    const b = -entre(rnd, 2, 12);
    const r = a * b;
    return {
      habilidad: 'Regla de los signos',
      enunciado: 'Calcula el producto:',
      expresion: `${p(a)} · ${p(b)}`,
      calcular: () => a * b,
      correcta: { valor: r },
      distractores: [
        { valor: -r, porQue: a < 0 ? 'Negativo por negativo da positivo.' : 'Positivo por negativo da negativo.' },
        { valor: a + b, porQue: 'Sumaste los números. Se pedía multiplicarlos.' },
        { valor: a - b, porQue: 'Restaste los números. Se pedía multiplicarlos.' },
      ],
      pasos: [
        `Multiplicamos los valores absolutos: ${Math.abs(a)} · ${Math.abs(b)} = ${Math.abs(r)}.`,
        a < 0 ? 'Negativo por negativo: el resultado es positivo.' : 'Positivo por negativo: el resultado es negativo.',
        `Resultado: ${n(r)}.`,
      ],
      pista: 'Multiplica los valores absolutos y después aplica la regla de los signos.',
    };
  },
};

const divEnteros: Generador = {
  id: 'g8-ent-div',
  crear: (rnd) => {
    const q = entre(rnd, 2, 12) * uno(rnd, [-1, 1] as const);
    const b = entre(rnd, 2, 9) * uno(rnd, [-1, 1] as const);
    const a = q * b;
    if (a > 0 && b > 0) return null;
    return {
      habilidad: 'División de enteros',
      enunciado: 'Calcula el cociente:',
      expresion: `${n(a)} : ${p(b)}`,
      calcular: () => a / b,
      correcta: { valor: q },
      distractores: [
        { valor: -q, porQue: 'Revisa el signo: signos iguales dan positivo y distintos, negativo.' },
        { valor: a * b, porQue: 'Multiplicaste. Se pedía dividir.' },
        { valor: a - b, porQue: 'Restaste. Se pedía dividir.' },
      ],
      pasos: [
        `Dividimos los valores absolutos: ${Math.abs(a)} : ${Math.abs(b)} = ${Math.abs(q)}.`,
        (a < 0) === (b < 0) ? 'Los signos son iguales: el resultado es positivo.' : 'Los signos son distintos: el resultado es negativo.',
        `Resultado: ${n(q)}.`,
      ],
      pista: 'La regla de los signos de la división es la misma que la de la multiplicación.',
    };
  },
};

const deudas: Generador = {
  id: 'g8-ent-ctx',
  crear: (rnd) => {
    const meses = entre(rnd, 3, 8);
    const baja = 500 * entre(rnd, 2, 9);
    const r = -meses * baja;
    return {
      habilidad: 'Multiplicación en contexto',
      enunciado: `Durante ${meses} meses, el saldo de una tarjeta Bip! cambió en −$${n(baja)} cada mes. ¿Cuál fue la variación total?`,
      calcular: () => meses * -baja,
      correcta: { valor: r, texto: `−$${n(-r)}` },
      distractores: [
        { valor: -r, texto: `$${n(-r)}`, porQue: 'El saldo bajó: la variación es negativa.' },
        { valor: -(meses + baja), texto: `−$${n(meses + baja)}`, porQue: 'Sumaste los meses al monto. Se multiplica.' },
        { valor: -baja, texto: `−$${n(baja)}`, porQue: 'Esa es la variación de un solo mes.' },
      ],
      pasos: [
        `Cada mes la variación es −$${n(baja)}.`,
        `${meses} · (−${n(baja)}).`,
        `= −$${n(-r)}.`,
      ],
      pista: 'Multiplica la variación mensual por la cantidad de meses, cuidando el signo.',
    };
  },
};

// ── Potencias y raíces ──────────────────────────────────────────────────
const multPotencias: Generador = {
  id: 'g8-pot-mult',
  crear: (rnd) => {
    const b = entre(rnd, 2, 7);
    const m = entre(rnd, 2, 9);
    const k = entre(rnd, 2, 9);
    return {
      habilidad: 'Multiplicación de potencias',
      enunciado: 'Escribe como una sola potencia:',
      expresion: `${b}${sup(m)} · ${b}${sup(k)}`,
      calcular: () => m + k,
      correcta: { valor: m + k, texto: `${b}${sup(m + k)}` },
      distractores: [
        { valor: 1000 + m * k, texto: `${b}${sup(m * k)}`, porQue: 'Al multiplicar potencias de igual base, los exponentes se suman.' },
        { valor: 2000 + m + k, texto: `${b * b}${sup(m + k)}`, porQue: 'La base se mantiene: no se multiplica.' },
        { valor: 3000 + m * k, texto: `${b * b}${sup(m * k)}`, porQue: 'La base se mantiene y los exponentes se suman.' },
      ],
      pasos: [
        'Potencias de igual base que se multiplican: se conserva la base.',
        `Se suman los exponentes: ${m} + ${k} = ${m + k}.`,
        `Resultado: ${b}${sup(m + k)}.`,
      ],
      pista: 'Con igual base, ¿qué se hace con los exponentes al multiplicar?',
    };
  },
};

const divPotencias: Generador = {
  id: 'g8-pot-div',
  crear: (rnd) => {
    const b = entre(rnd, 2, 9);
    const k = entre(rnd, 2, 6);
    const m = k + entre(rnd, 2, 8);
    return {
      habilidad: 'División de potencias',
      enunciado: 'Escribe como una sola potencia:',
      expresion: `${b}${sup(m)} : ${b}${sup(k)}`,
      calcular: () => m - k,
      correcta: { valor: m - k, texto: `${b}${sup(m - k)}` },
      distractores: [
        { valor: 1000 + m + k, texto: `${b}${sup(m + k)}`, porQue: 'Al dividir potencias de igual base, los exponentes se restan.' },
        { valor: 2000 + m * k, texto: `${b}${sup(m * k)}`, porQue: 'Los exponentes se restan, no se multiplican.' },
        { valor: 3000 + m - k, texto: `1${sup(m - k)}`, porQue: 'La base se mantiene: no se divide.' },
      ],
      pasos: [
        'Potencias de igual base que se dividen: se conserva la base.',
        `Se restan los exponentes: ${m} − ${k} = ${m - k}.`,
        `Resultado: ${b}${sup(m - k)}.`,
      ],
      pista: 'Con igual base, al dividir se restan los exponentes.',
    };
  },
};

const raizCuadrada: Generador = {
  id: 'g8-pot-raiz',
  crear: (rnd) => {
    const lado = entre(rnd, 4, 15);
    const area = lado * lado;
    return {
      habilidad: 'Raíz cuadrada en contexto',
      enunciado: `Un huerto cuadrado tiene un área de ${area} m². ¿Cuánto mide su lado?`,
      unidad: 'm',
      calcular: () => Math.sqrt(area),
      correcta: { valor: lado },
      distractores: [
        { valor: area / 2, porQue: 'La raíz cuadrada no es la mitad del número.' },
        { valor: area / 4, porQue: 'Dividiste por 4 (como en el perímetro). El lado es la raíz del área.' },
        { valor: lado + 2, porQue: `Revisa: ${lado + 2} · ${lado + 2} = ${(lado + 2) ** 2}.` },
      ],
      pasos: [
        'Área del cuadrado = lado · lado.',
        `Buscamos un número que multiplicado por sí mismo dé ${area}.`,
        `${lado} · ${lado} = ${area}, así que el lado mide ${lado} m.`,
      ],
      pista: 'Busca el número que multiplicado por sí mismo da el área.',
    };
  },
};

const valorPotencia: Generador = {
  id: 'g8-pot-valor',
  crear: (rnd) => {
    const b = entre(rnd, 2, 6);
    const e = entre(rnd, 2, b <= 3 ? 6 : 4);
    const r = b ** e;
    return {
      habilidad: 'Valor de una potencia',
      enunciado: '¿Cuál es el valor de la potencia?',
      expresion: `${b}${sup(e)}`,
      calcular: () => b ** e,
      correcta: { valor: r },
      distractores: [
        { valor: b * e, porQue: `Multiplicaste ${b} · ${e}. La potencia multiplica la base ${e} veces por sí misma.` },
        { valor: e ** b, porQue: 'Intercambiaste la base y el exponente.' },
        { valor: b + e, porQue: 'Sumaste base y exponente.' },
      ],
      pasos: [
        `${b}${sup(e)} significa multiplicar ${b} por sí mismo ${e} veces.`,
        `${Array(e).fill(b).join(' · ')}.`,
        `= ${n(r)}.`,
      ],
      pista: 'El exponente indica cuántas veces se multiplica la base por sí misma.',
    };
  },
};

// ── Variación porcentual ────────────────────────────────────────────────
const aumento: Generador = {
  id: 'g8-var-aum',
  crear: (rnd) => {
    const pct = uno(rnd, [5, 8, 10, 12, 15, 20, 25] as const);
    const base = 1000 * entre(rnd, 5, 60);
    const r = base * (1 + pct / 100);
    return {
      habilidad: 'Porcentaje de aumento',
      enunciado: `Un arriendo de $${n(base)} sube un ${pct} %. ¿Cuál es el nuevo valor?`,
      prefijo: '$',
      calcular: () => base * (1 + pct / 100),
      correcta: { valor: r },
      distractores: [
        { valor: (base * pct) / 100, porQue: 'Ese es solo el aumento. Falta sumarlo al valor inicial.' },
        { valor: base + pct, porQue: `Sumaste ${pct} pesos, no el ${pct} %.` },
        { valor: base * (1 - pct / 100), porQue: 'Restaste el porcentaje. Un aumento se suma.' },
      ],
      pasos: [
        `Factor de variación: 1 + ${pct}/100 = ${n(1 + pct / 100)}.`,
        `$${n(base)} · ${n(1 + pct / 100)}.`,
        `= $${n(r)}.`,
      ],
      pista: 'Multiplica el valor inicial por el factor de aumento.',
    };
  },
};

const iva: Generador = {
  id: 'g8-var-iva',
  crear: (rnd) => {
    const neto = 1000 * entre(rnd, 2, 50);
    const r = neto * 1.19;
    return {
      habilidad: 'IVA',
      enunciado: `Un producto tiene un precio neto de $${n(neto)}. ¿Cuál es su precio con IVA (19 %)?`,
      prefijo: '$',
      calcular: () => Math.round(neto * 1.19 * 100) / 100,
      correcta: { valor: Math.round(r * 100) / 100 },
      distractores: [
        { valor: Math.round(neto * 0.19 * 100) / 100, porQue: 'Ese es solo el IVA. Falta sumarlo al precio neto.' },
        { valor: neto + 19, porQue: 'Sumaste 19 pesos, no el 19 %.' },
        { valor: Math.round(neto * 0.81 * 100) / 100, porQue: 'Restaste el IVA. El IVA se suma al neto.' },
      ],
      pasos: [
        `IVA = 19 % de $${n(neto)} = $${n(Math.round(neto * 0.19 * 100) / 100)}.`,
        `Precio final = neto + IVA, o bien neto · 1,19.`,
        `= $${n(Math.round(r * 100) / 100)}.`,
      ],
      pista: 'El IVA se suma al precio neto: multiplica por el factor correspondiente.',
    };
  },
};

const interesSimple: Generador = {
  id: 'g8-var-interes',
  crear: (rnd) => {
    const capital = 10000 * entre(rnd, 2, 30);
    const tasa = entre(rnd, 2, 8);
    const anos = entre(rnd, 2, 5);
    const interes = (capital * tasa * anos) / 100;
    return {
      habilidad: 'Interés simple',
      enunciado: `Se invierten $${n(capital)} al ${tasa} % anual de interés simple durante ${anos} años. ¿Cuánto interés se gana?`,
      prefijo: '$',
      calcular: () => capital * (tasa / 100) * anos,
      correcta: { valor: interes },
      distractores: [
        { valor: (capital * tasa) / 100, porQue: 'Ese es el interés de un solo año.' },
        { valor: capital + interes, porQue: 'Ese es el monto final (capital + interés). Se pide solo el interés.' },
        { valor: Math.round(capital * (1 + tasa / 100) ** anos - capital), porQue: 'Calculaste interés compuesto. En el simple, el interés es igual todos los años.' },
      ],
      pasos: [
        `Interés de un año: ${tasa} % de $${n(capital)} = $${n((capital * tasa) / 100)}.`,
        `En ${anos} años: $${n((capital * tasa) / 100)} · ${anos}.`,
        `= $${n(interes)}.`,
      ],
      pista: 'En el interés simple se gana lo mismo cada año.',
    };
  },
};

// ── Ecuaciones e inecuaciones ───────────────────────────────────────────
const ecParentesis: Generador = {
  id: 'g8-ec-par',
  crear: (rnd) => {
    const a = entre(rnd, 2, 6);
    const x = entre(rnd, -6, 10);
    const b = entre(rnd, 1, 9);
    const c = a * (x + b);
    return {
      habilidad: 'Ecuaciones con paréntesis',
      enunciado: 'Resuelve la ecuación:',
      expresion: `${a}(x + ${b}) = ${n(c)}`,
      calcular: () => c / a - b,
      correcta: { valor: x, texto: `x = ${n(x)}` },
      distractores: [
        { valor: c - b, texto: `x = ${n(c - b)}`, porQue: `Olvidaste dividir por ${a}.` },
        { valor: (c - b) / a, texto: `x = ${n((c - b) / a)}`, porQue: `Al distribuir, ${a} también multiplica a ${b}: ${a}x + ${a * b}.` },
        { valor: c / a + b, texto: `x = ${n(c / a + b)}`, porQue: `${b} está sumando: al despejar se resta.` },
      ],
      pasos: [
        `Dividimos ambos lados por ${a}: x + ${b} = ${n(c / a)}.`,
        `Restamos ${b}: x = ${n(c / a)} − ${b}.`,
        `x = ${n(x)}.`,
      ],
      pista: 'Puedes distribuir o dividir primero ambos lados por el número fuera del paréntesis.',
    };
  },
};

const inecuacion: Generador = {
  id: 'g8-ec-inec',
  crear: (rnd) => {
    const a = entre(rnd, 2, 7);
    const lim = entre(rnd, -5, 8);
    const b = entre(rnd, 1, 15);
    const c = -a * lim + b;
    // valor: código = 1000 · sentido (−1: «<», +1: «>») + límite.
    return {
      habilidad: 'Inecuaciones',
      enunciado: 'Resuelve la inecuación:',
      expresion: `−${a}x + ${b} > ${n(c)}`,
      calcular: () => -1000 + lim,
      correcta: { valor: -1000 + lim, texto: `x < ${n(lim)}` },
      distractores: [
        { valor: 1000 + lim, texto: `x > ${n(lim)}`, porQue: 'Al dividir por un número negativo, el signo de la desigualdad se invierte.' },
        { valor: -1000 - lim, texto: `x < ${n(-lim)}`, porQue: 'Revisa los signos al despejar.' },
        { valor: 3000 - lim, texto: `x > ${n(-lim)}`, porQue: 'Revisa los signos y recuerda invertir la desigualdad al dividir por un negativo.' },
      ],
      pasos: [
        `Restamos ${b} a ambos lados: −${a}x > ${n(-a * lim)}.`,
        `Dividimos por −${a} e invertimos la desigualdad: x < ${n(lim)}.`,
        `Solución: x < ${n(lim)}.`,
      ],
      pista: 'Si divides por un número negativo, invierte el sentido de la desigualdad.',
    };
  },
};

const ecAmbosLados: Generador = {
  id: 'g8-ec-ambos',
  crear: (rnd) => {
    const a = entre(rnd, 3, 9);
    const c = entre(rnd, 1, a - 1);
    const x = entre(rnd, -5, 9);
    const b = entre(rnd, -10, 10);
    const d = (a - c) * x + b;
    if (b === 0 || d === 0) return null;
    const signo = (v: number) => (v < 0 ? `− ${-v}` : `+ ${v}`);
    return {
      habilidad: 'Incógnita en ambos lados',
      enunciado: 'Resuelve la ecuación:',
      expresion: `${a}x ${signo(b)} = ${c === 1 ? '' : c}x ${signo(d)}`,
      calcular: () => (d - b) / (a - c),
      correcta: { valor: x, texto: `x = ${n(x)}` },
      distractores: [
        { valor: (d + b) / (a - c), texto: `x = ${n((d + b) / (a - c))}`, porQue: 'Al pasar un término al otro lado cambia su signo.' },
        { valor: (d - b) / (a + c), texto: `x = ${n(Math.round(((d - b) / (a + c)) * 100) / 100)}`, porQue: `${c}x se resta al pasar al otro lado: ${a} − ${c}.` },
        { valor: d - b, texto: `x = ${n(d - b)}`, porQue: `Falta dividir por ${a - c}.` },
      ],
      pasos: [
        `Juntamos las x a la izquierda: ${a}x − ${c === 1 ? '' : c}x = ${a - c === 1 ? '' : a - c}x.`,
        `Juntamos los números a la derecha: ${n(d)} − ${p(b)} = ${n(d - b)}.`,
        `${a - c === 1 ? '' : a - c}x = ${n(d - b)}, así que x = ${n(x)}.`,
      ],
      pista: 'Junta los términos con x a un lado y los números al otro.',
    };
  },
};

// ── Funciones ───────────────────────────────────────────────────────────
const evaluarFuncion: Generador = {
  id: 'g8-fun-eval',
  crear: (rnd) => {
    const m = entre(rnd, -5, 6);
    const b = entre(rnd, -9, 9);
    const x = entre(rnd, -4, 6);
    if (m === 0 || b === 0 || x === 0) return null;
    const r = m * x + b;
    const expr = `${m === 1 ? '' : m === -1 ? '−' : n(m)}x ${b < 0 ? `− ${-b}` : `+ ${b}`}`;
    return {
      habilidad: 'Evaluar una función',
      enunciado: `Si f(x) = ${expr}, ¿cuánto vale f(${n(x)})?`,
      calcular: () => m * x + b,
      correcta: { valor: r },
      distractores: [
        { valor: m * x - b, porQue: 'Revisa el signo del término independiente.' },
        { valor: m + x + b, porQue: `${n(m)}x significa ${n(m)} · x.` },
        { valor: -m * x + b, porQue: 'Revisa el signo del producto.' },
      ],
      pasos: [
        `Reemplazamos x por ${p(x)}: ${n(m)} · ${p(x)} ${b < 0 ? `− ${-b}` : `+ ${b}`}.`,
        `${n(m)} · ${p(x)} = ${n(m * x)}.`,
        `f(${n(x)}) = ${n(r)}.`,
      ],
      pista: 'Reemplaza x por el valor indicado y calcula.',
    };
  },
};

const pendiente: Generador = {
  id: 'g8-fun-pend',
  crear: (rnd) => {
    const m = entre(rnd, -4, 5);
    if (m === 0) return null;
    const x1 = entre(rnd, -3, 3);
    const x2 = x1 + entre(rnd, 1, 4);
    const b = entre(rnd, -5, 5);
    const y1 = m * x1 + b;
    const y2 = m * x2 + b;
    return {
      habilidad: 'Pendiente entre dos puntos',
      enunciado: `¿Cuál es la pendiente de la recta que pasa por (${n(x1)}, ${n(y1)}) y (${n(x2)}, ${n(y2)})?`,
      calcular: () => (y2 - y1) / (x2 - x1),
      correcta: { valor: m },
      distractores: [
        { valor: (x2 - x1) / (y2 - y1), porQue: 'Invertiste la razón: es variación en y sobre variación en x.' },
        { valor: -m, porQue: 'Revisa el orden de las restas: debe ser el mismo arriba y abajo.' },
        { valor: y2 - y1, porQue: 'Falta dividir por la variación en x.' },
      ],
      pasos: [
        'Pendiente = (y₂ − y₁) / (x₂ − x₁).',
        `= (${n(y2)} − ${p(y1)}) / (${n(x2)} − ${p(x1)}) = ${n(y2 - y1)} / ${x2 - x1}.`,
        `= ${n(m)}.`,
      ],
      pista: 'Divide cuánto cambia y por cuánto cambia x.',
    };
  },
};

const afinContexto: Generador = {
  id: 'g8-fun-ctx',
  crear: (rnd) => {
    const fijo = 100 * entre(rnd, 5, 15);
    const porKm = 100 * entre(rnd, 3, 9);
    const km = entre(rnd, 2, 15);
    const r = fijo + porKm * km;
    return {
      habilidad: 'Función afín en contexto',
      enunciado: `Un taxi cobra $${n(fijo)} de bajada de bandera más $${n(porKm)} por kilómetro. ¿Cuánto cuesta un viaje de ${km} km?`,
      prefijo: '$',
      calcular: () => fijo + porKm * km,
      correcta: { valor: r },
      distractores: [
        { valor: porKm * km, porQue: 'Falta sumar la bajada de bandera.' },
        { valor: (fijo + porKm) * km, porQue: 'La bajada de bandera se cobra una sola vez.' },
        { valor: fijo + porKm + km, porQue: 'El precio por kilómetro se multiplica por los kilómetros.' },
      ],
      pasos: [
        `Costo = ${n(fijo)} + ${n(porKm)} · km.`,
        `${n(porKm)} · ${km} = ${n(porKm * km)}.`,
        `${n(fijo)} + ${n(porKm * km)} = $${n(r)}.`,
      ],
      pista: 'Suma el cobro fijo y lo que se cobra por todos los kilómetros.',
    };
  },
};

// ── Geometría: Pitágoras y volumen ──────────────────────────────────────
const TRIOS = [
  [3, 4, 5],
  [5, 12, 13],
  [8, 15, 17],
  [7, 24, 25],
  [6, 8, 10],
  [9, 12, 15],
  [12, 16, 20],
  [20, 21, 29],
] as const;

const hipotenusa: Generador = {
  id: 'g8-geo-hip',
  crear: (rnd) => {
    const [a, b, c] = uno(rnd, TRIOS);
    return {
      habilidad: 'Hipotenusa',
      enunciado: `Los catetos de un triángulo rectángulo miden ${a} cm y ${b} cm. ¿Cuánto mide la hipotenusa?`,
      unidad: 'cm',
      calcular: () => Math.hypot(a, b),
      correcta: { valor: c },
      distractores: [
        { valor: a + b, porQue: 'Los catetos no se suman directamente: se suman sus cuadrados.' },
        { valor: a * a + b * b, porQue: 'Falta sacar la raíz cuadrada.' },
        { valor: Math.round(Math.sqrt(b * b - a * a) * 100) / 100, porQue: 'Restaste los cuadrados. Para la hipotenusa se suman.' },
      ],
      pasos: [
        `c² = ${a}² + ${b}² = ${a * a} + ${b * b} = ${a * a + b * b}.`,
        `c = √${a * a + b * b}.`,
        `c = ${c} cm.`,
      ],
      pista: 'Usa el teorema de Pitágoras: suma los cuadrados de los catetos.',
    };
  },
};

const cateto: Generador = {
  id: 'g8-geo-cat',
  crear: (rnd) => {
    const [a, b, c] = uno(rnd, TRIOS);
    return {
      habilidad: 'Cateto',
      enunciado: `En un triángulo rectángulo, la hipotenusa mide ${c} m y un cateto ${b} m. ¿Cuánto mide el otro cateto?`,
      unidad: 'm',
      calcular: () => Math.sqrt(c * c - b * b),
      correcta: { valor: a },
      distractores: [
        { valor: c - b, porQue: 'No se restan las medidas: se restan sus cuadrados.' },
        { valor: Math.round(Math.hypot(b, c) * 100) / 100, porQue: 'Sumaste los cuadrados. Para un cateto se resta.' },
        { valor: c * c - b * b, porQue: 'Falta sacar la raíz cuadrada.' },
      ],
      pasos: [
        `a² = ${c}² − ${b}² = ${c * c} − ${b * b} = ${c * c - b * b}.`,
        `a = √${c * c - b * b}.`,
        `a = ${a} m.`,
      ],
      pista: 'Despeja el cateto: al cuadrado de la hipotenusa réstale el del cateto conocido.',
    };
  },
};

const volumenPrisma: Generador = {
  id: 'g8-geo-vol',
  crear: (rnd) => {
    const l = entre(rnd, 2, 12);
    const a = entre(rnd, 2, 10);
    const h = entre(rnd, 2, 10);
    const r = l * a * h;
    return {
      habilidad: 'Volumen del prisma',
      enunciado: `Una caja tiene ${l} cm de largo, ${a} cm de ancho y ${h} cm de alto. ¿Cuál es su volumen?`,
      unidad: 'cm³',
      calcular: () => l * a * h,
      correcta: { valor: r },
      distractores: [
        { valor: l + a + h, porQue: 'Las tres medidas se multiplican, no se suman.' },
        { valor: 2 * (l * a + l * h + a * h), porQue: 'Ese es el área total de la caja, no su volumen.' },
        { valor: l * a, porQue: 'Ese es el área de la base. Falta multiplicar por la altura.' },
      ],
      pasos: [
        'Volumen = largo · ancho · alto.',
        `${l} · ${a} · ${h}.`,
        `= ${r} cm³.`,
      ],
      pista: 'Calcula el área de la base y multiplícala por la altura.',
    };
  },
};

export const GENERADORES_8B: Record<string, Generador[]> = {
  'enteros-8b': [multEnteros, divEnteros, deudas],
  'potencias-8b': [multPotencias, divPotencias, raizCuadrada, valorPotencia],
  'variacion-8b': [aumento, iva, interesSimple],
  'ecuaciones-8b': [ecParentesis, inecuacion, ecAmbosLados],
  'funciones-8b': [evaluarFuncion, pendiente, afinContexto],
  'geometria-8b': [hipotenusa, cateto, volumenPrisma],
};
