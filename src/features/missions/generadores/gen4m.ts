import { entre, fraccion, Generador, n, p, sup, uno } from './base';

/** Generadores de variantes para 4.º medio. */

const factorial = (x: number): number => (x <= 1 ? 1 : x * factorial(x - 1));
const comb = (a: number, b: number) => factorial(a) / (factorial(b) * factorial(a - b));

// ── Números complejos ───────────────────────────────────────────────────
type C = [number, number];
/** Código de un complejo: parte real · 1.000 + parte imaginaria. */
const cod = ([re, im]: C) => re * 1000 + im;
/** Texto de un complejo en formato chileno: 3 + 2i, 4 − i, −2i, 5. */
function cx([re, im]: C): string {
  const imTxt = (v: number) => (Math.abs(v) === 1 ? 'i' : `${Math.abs(v)}i`);
  if (im === 0) return n(re);
  if (re === 0) return `${im < 0 ? '−' : ''}${imTxt(im)}`;
  return `${n(re)} ${im < 0 ? '−' : '+'} ${imTxt(im)}`;
}
const entreNoCero = (rnd: () => number, min: number, max: number) => {
  const v = entre(rnd, min, max);
  return v === 0 ? 1 : v;
};

const sumaComplejos: Generador = {
  id: 'g4-z-suma',
  crear: (rnd) => {
    const a: C = [entreNoCero(rnd, -6, 8), entreNoCero(rnd, -6, 8)];
    const b: C = [entreNoCero(rnd, -6, 8), entreNoCero(rnd, -6, 8)];
    const resta = rnd() < 0.5;
    const s = resta ? -1 : 1;
    const r: C = [a[0] + s * b[0], a[1] + s * b[1]];
    if (r[0] === 0 || r[1] === 0) return null;
    const op = resta ? '−' : '+';
    return {
      habilidad: resta ? 'Sustracción de complejos' : 'Adición de complejos',
      enunciado: resta ? 'Calcula la resta:' : 'Calcula la suma:',
      expresion: `(${cx(a)}) ${op} (${cx(b)})`,
      calcular: () => cod([a[0] + s * b[0], a[1] + s * b[1]]),
      correcta: { valor: cod(r), texto: cx(r) },
      distractores: [
        { valor: cod([r[0], a[1] - s * b[1]]), texto: cx([r[0], a[1] - s * b[1]]), porQue: 'Revisa el signo de la parte imaginaria.' },
        { valor: cod([a[0] + s * b[1], a[1] + s * b[0]]), texto: cx([a[0] + s * b[1], a[1] + s * b[0]]), porQue: 'Se operan reales con reales e imaginarias con imaginarias, sin mezclarlas.' },
        { valor: cod([a[0] - s * b[0], r[1]]), texto: cx([a[0] - s * b[0], r[1]]), porQue: 'Revisa el signo de la parte real.' },
      ],
      pasos: [
        `Parte real: ${n(a[0])} ${op} ${p(b[0])} = ${n(r[0])}.`,
        `Parte imaginaria: ${n(a[1])} ${op} ${p(b[1])} = ${n(r[1])}.`,
        `Resultado: ${cx(r)}.`,
      ],
      pista: 'Opera por separado las partes reales y las partes imaginarias.',
    };
  },
};

const productoComplejos: Generador = {
  id: 'g4-z-prod',
  crear: (rnd) => {
    const a: C = [entre(rnd, 1, 5), entreNoCero(rnd, -4, 4)];
    const b: C = [entre(rnd, 1, 5), entreNoCero(rnd, -4, 4)];
    const r: C = [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
    if (r[1] === 0) return null;
    return {
      habilidad: 'Multiplicación de complejos',
      enunciado: 'Calcula el producto:',
      expresion: `(${cx(a)})(${cx(b)})`,
      calcular: () => cod([a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]]),
      correcta: { valor: cod(r), texto: cx(r) },
      distractores: [
        { valor: cod([a[0] * b[0] + a[1] * b[1], r[1]]), texto: cx([a[0] * b[0] + a[1] * b[1], r[1]]), porQue: 'i² vale −1: el producto de las partes imaginarias cambia de signo.' },
        { valor: cod([a[0] * b[0], a[1] * b[1]]), texto: cx([a[0] * b[0], a[1] * b[1]]), porQue: 'No basta multiplicar real con real e imaginaria con imaginaria: se distribuye todo.' },
        { valor: cod([a[0] * b[0], r[1]]), texto: cx([a[0] * b[0], r[1]]), porQue: 'Falta el término que viene de i · i = −1.' },
      ],
      pasos: [
        `Distribuimos: ${n(a[0] * b[0])} + ${p(a[0] * b[1])} · i + ${p(a[1] * b[0])} · i + ${p(a[1] * b[1])} · i².`,
        `Como i² = −1: ${n(a[0] * b[0])} − ${p(a[1] * b[1])} = ${n(r[0])}.`,
        `Resultado: ${cx(r)}.`,
      ],
      pista: 'Multiplica cada término por cada término y reemplaza i² por −1.',
    };
  },
};

const potenciasI: Generador = {
  id: 'g4-z-pot',
  crear: (rnd) => {
    const e = entre(rnd, 5, 63);
    const ciclo: C[] = [[1, 0], [0, 1], [-1, 0], [0, -1]];
    // Se omite el caso cuyo resultado es i: la letra aparece en cualquier pista.
    if (e % 4 === 1) return null;
    const r = ciclo[e % 4];
    const otros = ciclo.filter((c) => c !== r);
    const motivo = (c: C) =>
      `Ese es i elevado a ${ciclo.indexOf(c)} (o a un número con ese resto al dividir por 4); revisa el resto de ${e} : 4.`;
    return {
      habilidad: 'Potencias de i',
      enunciado: 'Calcula la potencia:',
      expresion: `i${sup(e)}`,
      calcular: () => {
        let z: C = [1, 0];
        for (let k = 0; k < e; k++) z = [-z[1], z[0]];
        return cod(z);
      },
      correcta: { valor: cod(r), texto: cx(r) },
      distractores: [
        { valor: cod(otros[0]), texto: cx(otros[0]), porQue: motivo(otros[0]) },
        { valor: cod(otros[1]), texto: cx(otros[1]), porQue: motivo(otros[1]) },
        { valor: cod(otros[2]), texto: cx(otros[2]), porQue: motivo(otros[2]) },
      ],
      pasos: [
        'Las potencias de i se repiten cada 4: i, −1, −i, 1.',
        `${e} = 4 · ${Math.floor(e / 4)} + ${e % 4}, así que i${sup(e)} = i${sup(e % 4)}.`,
        `Resultado: ${cx(r)}.`,
      ],
      pista: 'Divide el exponente por cuatro y usa el resto.',
    };
  },
};

// ── Función potencia ────────────────────────────────────────────────────
const evaluarPotencia: Generador = {
  id: 'g4-p-eval',
  crear: (rnd) => {
    const a = entreNoCero(rnd, -4, 5);
    const e = entre(rnd, 2, 4);
    const x = uno(rnd, [-3, -2, 2, 3] as const);
    const r = a * x ** e;
    const ax = a === 1 ? '' : a === -1 ? '−' : n(a);
    return {
      habilidad: 'Evaluar una función potencia',
      enunciado: `Si f(x) = ${ax}x${sup(e)}, ¿cuánto vale f(${n(x)})?`,
      calcular: () => a * x ** e,
      correcta: { valor: r },
      distractores: [
        { valor: (a * x) ** e, porQue: 'Primero se eleva x y después se multiplica por el coeficiente.' },
        { valor: a * x * e, porQue: `x${sup(e)} no es ${e} · x.` },
        { valor: -r, porQue: 'Revisa el signo: con exponente par el resultado de la potencia es positivo; con impar conserva el signo.' },
      ],
      pasos: [
        `Reemplazamos: f(${n(x)}) = ${n(a)} · ${p(x)}${sup(e)}.`,
        `${p(x)}${sup(e)} = ${n(x ** e)}.`,
        `${n(a)} · ${p(x ** e)} = ${n(r)}.`,
      ],
      pista: 'Calcula primero la potencia y después multiplica por el coeficiente.',
    };
  },
};

const escalaPotencia: Generador = {
  id: 'g4-p-escala',
  crear: (rnd) => {
    const k = entre(rnd, 2, 5);
    const [e, que, magnitud] = uno(rnd, [
      [2, 'el área de un cuadrado', 'el lado'],
      [3, 'el volumen de un cubo', 'la arista'],
      [2, 'el área de un círculo', 'el radio'],
      [3, 'el volumen de una esfera', 'el radio'],
    ] as const);
    const r = k ** e;
    const otro = e === 2 ? k ** 3 : k ** 2;
    return {
      habilidad: 'Función potencia en geometría',
      enunciado: `Si ${magnitud} se multiplica por ${k}, ¿por cuánto se multiplica ${que}?`,
      calcular: () => k ** e,
      correcta: { valor: r },
      distractores: [
        { valor: k, porQue: `${que[0].toUpperCase()}${que.slice(1)} no es proporcional a ${magnitud}: depende de su potencia ${e}.` },
        { valor: k * e, porQue: `${k}${sup(e)} no es ${k} · ${e}.` },
        { valor: otro, porQue: e === 2 ? 'El cubo de la razón corresponde a volúmenes, no a áreas.' : 'El cuadrado de la razón corresponde a áreas, no a volúmenes.' },
      ],
      pasos: [
        `${que[0].toUpperCase()}${que.slice(1)} depende ${magnitud.startsWith('el ') ? `del ${magnitud.slice(3)}` : `de ${magnitud}`} elevado a ${e}.`,
        `Al multiplicar ${magnitud} por ${k}, se multiplica por ${k}${sup(e)}.`,
        `${k}${sup(e)} = ${r}.`,
      ],
      pista: 'Reemplaza la medida por la nueva y mira qué factor aparece.',
    };
  },
};

const coeficientePotencia: Generador = {
  id: 'g4-p-coef',
  crear: (rnd) => {
    const a = entre(rnd, 2, 7);
    const e = entre(rnd, 2, 3);
    const x = entre(rnd, 2, 3);
    const y = a * x ** e;
    return {
      habilidad: 'Determinar el coeficiente',
      enunciado: `La función f(x) = a · x${sup(e)} pasa por el punto (${x}, ${n(y)}). ¿Cuánto vale a?`,
      calcular: () => y / x ** e,
      correcta: { valor: a },
      distractores: [
        { valor: y / x, porQue: `x está elevado a ${e}: se divide por ${x}${sup(e)}, no por ${x}.` },
        { valor: y * x ** e, porQue: 'Para despejar a se divide, no se multiplica.' },
        { valor: y - x ** e, porQue: 'a multiplica a la potencia: se despeja dividiendo.' },
      ],
      pasos: [
        `Reemplazamos el punto: ${n(y)} = a · ${x}${sup(e)}.`,
        `${n(y)} = ${x ** e}a.`,
        `a = ${n(y)} : ${x ** e} = ${a}.`,
      ],
      pista: 'Reemplaza las coordenadas del punto en la función y despeja a.',
    };
  },
};

// ── Función logarítmica ─────────────────────────────────────────────────
const sub = (x: number) => String(x).split('').map((c) => '₀₁₂₃₄₅₆₇₈₉'[Number(c)]).join('');

const evaluarLog: Generador = {
  id: 'g4-l-eval',
  crear: (rnd) => {
    const b = uno(rnd, [2, 3, 4, 5, 10] as const);
    const e = entre(rnd, 2, b === 2 ? 8 : b === 10 ? 6 : 4) * uno(rnd, [1, 1, -1] as const);
    const arg = b ** e;
    const argTxt = e < 0 ? `1/${n(b ** -e)}` : n(arg);
    return {
      habilidad: e < 0 ? 'Logaritmos negativos' : 'Evaluar un logaritmo',
      enunciado: '¿Cuál es el valor del logaritmo?',
      expresion: `log${b === 10 ? '' : sub(b)} ${argTxt}`,
      calcular: () => Math.round((Math.log(arg) / Math.log(b)) * 1e9) / 1e9,
      correcta: { valor: e },
      distractores: [
        { valor: -e, porQue: e < 0 ? 'El argumento es menor que 1: el logaritmo es negativo.' : 'El argumento es mayor que 1: el logaritmo es positivo.' },
        { valor: e + 1, porQue: `Revisa: ${b} elevado a ${e + 1} no es ${argTxt}.` },
        { valor: e < 0 ? b ** -e : arg / b, porQue: 'El logaritmo es un exponente, no el resultado de dividir.' },
      ],
      pasos: [
        `Buscamos el exponente y tal que ${b}ʸ = ${argTxt}.`,
        e < 0 ? `${argTxt} = ${b}${sup(e)}.` : `${argTxt} = ${b}${sup(e)}.`,
        `El logaritmo vale ${n(e)}.`,
      ],
      pista: 'Escribe el argumento como una potencia de la base.',
    };
  },
};

const ecuacionLog: Generador = {
  id: 'g4-l-ec',
  crear: (rnd) => {
    const b = uno(rnd, [2, 3, 4, 5, 10] as const);
    const e = entre(rnd, 2, b === 2 ? 7 : b === 10 ? 5 : 4);
    const x = b ** e;
    return {
      habilidad: 'Ecuación logarítmica',
      enunciado: `Resuelve: log${b === 10 ? '' : sub(b)} x = ${e}.`,
      calcular: () => b ** e,
      correcta: { valor: x },
      distractores: [
        { valor: b * e, porQue: `La definición dice ${b}${sup(e)} = x, no ${b} · ${e}.` },
        { valor: e ** b, porQue: `La base es ${b} y el exponente ${e}, no al revés.` },
        { valor: b + e, porQue: 'Hay que elevar la base al exponente, no sumarlos.' },
      ],
      pasos: [
        `log${b === 10 ? '' : sub(b)} x = ${e} significa ${b}${sup(e)} = x.`,
        `${Array(e).fill(b).join(' · ')}.`,
        `x = ${n(x)}.`,
      ],
      pista: 'Escribe la igualdad en forma de potencia.',
    };
  },
};

const propiedadesLog: Generador = {
  id: 'g4-l-prop',
  crear: (rnd) => {
    const total = uno(rnd, [100, 1000, 10000] as const);
    const a = uno(rnd, [2, 4, 5, 8, 20, 25, 40, 50] as const);
    if (total % a !== 0) return null;
    const b = total / a;
    if (b === a || b === 1) return null;
    const r = Math.round(Math.log10(total));
    return {
      habilidad: 'Propiedades de los logaritmos',
      enunciado: 'Calcula usando propiedades:',
      expresion: `log ${n(a)} + log ${n(b)}`,
      calcular: () => Math.log10(a) + Math.log10(b),
      correcta: { valor: r },
      distractores: [
        { valor: a + b, porQue: 'Se suman los logaritmos, no los números.' },
        { valor: Math.log10(a + b), texto: `log ${n(a + b)}`, porQue: 'log a + log b = log(a · b), no log(a + b).' },
        { valor: total, porQue: 'Ese es el argumento; falta calcular su logaritmo.' },
      ],
      pasos: [
        'log a + log b = log(a · b).',
        `log ${n(a)} + log ${n(b)} = log ${n(total)}.`,
        `log ${n(total)} = ${r}, porque 10${sup(r)} = ${n(total)}.`,
      ],
      pista: 'Usa la propiedad del logaritmo de un producto.',
    };
  },
};

// ── Distribución binomial ───────────────────────────────────────────────
const PROBABILIDADES = [0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.75, 0.8] as const;

const esperanzaBinomial: Generador = {
  id: 'g4-b-esp',
  crear: (rnd) => {
    const pr = uno(rnd, PROBABILIDADES);
    const nn = 4 * entre(rnd, 5, 50);
    const r = Math.round(nn * pr * 100) / 100;
    const contexto = uno(rnd, [
      ['de los estudiantes de un colegio llega en bicicleta', 'estudiantes', 'llegue en bicicleta'],
      ['de los semáforos de una avenida está en verde al pasar', 'semáforos', 'esté en verde'],
      ['de las semillas de un sobre germina', 'semillas', 'germine'],
    ] as const);
    return {
      habilidad: 'Esperanza',
      enunciado: `Un ${n(pr * 100)} % ${contexto[0]}. Si se observan ${nn} ${contexto[1]}, ¿cuántos se espera que cumplan esa condición?`,
      calcular: () => nn * pr,
      correcta: { valor: r },
      distractores: [
        { valor: pr, porQue: 'Esa es la probabilidad de un caso, no la cantidad esperada.' },
        { valor: Math.round(nn * (1 - pr) * 100) / 100, porQue: 'Esa es la cantidad esperada que NO cumple la condición.' },
        { valor: Math.round(nn * pr * (1 - pr) * 100) / 100, porQue: 'Esa es la varianza n · p · q.' },
      ],
      pasos: [
        'En una binomial, la esperanza es E(X) = n · p.',
        `n = ${nn} y p = ${n(pr)}.`,
        `E(X) = ${nn} · ${n(pr)} = ${n(r)}.`,
      ],
      pista: 'Multiplica la cantidad de ensayos por la probabilidad de éxito.',
    };
  },
};

const varianzaBinomial: Generador = {
  id: 'g4-b-var',
  crear: (rnd) => {
    const pr = uno(rnd, PROBABILIDADES);
    const nn = 4 * entre(rnd, 5, 50);
    const v = Math.round(nn * pr * (1 - pr) * 10000) / 10000;
    return {
      habilidad: 'Varianza',
      enunciado: `X sigue una distribución binomial con n = ${nn} y p = ${n(pr)}. ¿Cuál es su varianza?`,
      calcular: () => Math.round(nn * pr * (1 - pr) * 10000) / 10000,
      correcta: { valor: v },
      distractores: [
        { valor: Math.round(nn * pr * 100) / 100, porQue: 'Esa es la esperanza n · p; falta multiplicar por q.' },
        { valor: Math.round(nn * (1 - pr) * 100) / 100, porQue: 'n · q es la cantidad esperada de fracasos.' },
        { valor: Math.round(Math.sqrt(v) * 100) / 100, texto: `≈ ${n(Math.round(Math.sqrt(v) * 100) / 100)}`, porQue: 'Esa es la desviación estándar (la raíz de la varianza).' },
      ],
      pasos: [
        `Var(X) = n · p · q, con q = 1 − ${n(pr)} = ${n(Math.round((1 - pr) * 100) / 100)}.`,
        `${nn} · ${n(pr)} · ${n(Math.round((1 - pr) * 100) / 100)}.`,
        `Var(X) = ${n(v)}.`,
      ],
      pista: 'La varianza binomial es n · p · q, con q = 1 − p.',
    };
  },
};

const probabilidadBinomial: Generador = {
  id: 'g4-b-pk',
  crear: (rnd) => {
    const nn = entre(rnd, 3, 6);
    const k = entre(rnd, 1, nn - 1);
    const total = 2 ** nn;
    const c = comb(nn, k);
    const cara = uno(rnd, ['caras', 'sellos'] as const);
    return {
      habilidad: 'Probabilidad binomial',
      enunciado: `Se lanza una moneda ${nn} veces. ¿Cuál es la probabilidad de obtener exactamente ${k} ${k === 1 ? cara.slice(0, -1) : cara}?`,
      calcular: () => comb(nn, k) * 0.5 ** nn,
      correcta: { valor: c / total, texto: fraccion(c, total) },
      distractores: [
        { valor: 1 / total, texto: `1/${total}`, porQue: `Esa es la probabilidad de una sola secuencia; hay ${c} con esa cantidad.` },
        { valor: k / nn, texto: fraccion(k, nn), porQue: `No basta con ${k} de ${nn}: hay que contar las secuencias posibles.` },
        { valor: 0.5 ** k, texto: `1/${2 ** k}`, porQue: 'Falta considerar los demás lanzamientos y las combinaciones.' },
      ],
      pasos: [
        `Secuencias con ${k} ${cara} en ${nn} lanzamientos: C(${nn}, ${k}) = ${c}.`,
        `Cada secuencia tiene probabilidad (1/2)${sup(nn)} = 1/${total}.`,
        `P = ${c}/${total}${fraccion(c, total) !== `${c}/${total}` ? ` = ${fraccion(c, total)}` : ''}.`,
      ],
      pista: 'Cuenta cuántas secuencias cumplen y multiplica por la probabilidad de cada una.',
    };
  },
};

// ── Distribución normal ─────────────────────────────────────────────────
const puntajeZ: Generador = {
  id: 'g4-n-z',
  crear: (rnd) => {
    const media = 10 * entre(rnd, 5, 70);
    const sigma = uno(rnd, [4, 5, 8, 10, 20, 25, 40, 50, 100] as const);
    const z = uno(rnd, [-2.5, -2, -1.5, -1, -0.5, 0.5, 1, 1.5, 2, 2.5] as const);
    const x = media + z * sigma;
    if (!Number.isInteger(x) || x <= 0) return null;
    return {
      habilidad: z < 0 ? 'Puntaje z negativo' : 'Puntaje z',
      enunciado: `Con media ${n(media)} y desviación estándar ${sigma}, ¿cuál es el puntaje z de un resultado de ${n(x)}?`,
      calcular: () => (x - media) / sigma,
      correcta: { valor: z },
      distractores: [
        { valor: -z, porQue: z < 0 ? 'El resultado está bajo la media: z es negativo.' : 'El resultado está sobre la media: z es positivo.' },
        { valor: x - media, porQue: 'Falta dividir por la desviación estándar.' },
        { valor: Math.round((x / sigma) * 100) / 100, porQue: 'Primero se resta la media y después se divide.' },
      ],
      pasos: [
        'z = (x − μ) / σ.',
        `z = (${n(x)} − ${n(media)}) / ${sigma} = ${n(x - media)} / ${sigma}.`,
        `z = ${n(z)}.`,
      ],
      pista: 'Resta la media al resultado y divide por la desviación estándar.',
    };
  },
};

const reglaEmpirica: Generador = {
  id: 'g4-n-regla',
  crear: (rnd) => {
    const media = 10 * entre(rnd, 5, 70);
    const sigma = uno(rnd, [5, 8, 10, 15, 20, 50] as const);
    const k = uno(rnd, [1, 2, 3] as const);
    const PCT = { 1: 68, 2: 95, 3: 99.7 } as const;
    const tipo = uno(rnd, ['entre', 'sobre'] as const);
    const r = tipo === 'entre' ? PCT[k] : Math.round(((100 - PCT[k]) / 2) * 100) / 100;
    const otros = ([1, 2, 3] as const).filter((j) => j !== k);
    return {
      habilidad: tipo === 'entre' ? 'Regla 68-95-99,7' : 'Colas de la distribución',
      enunciado:
        tipo === 'entre'
          ? `Una variable sigue una normal con media ${n(media)} y desviación estándar ${sigma}. ¿Qué porcentaje aproximado de los datos está entre ${n(media - k * sigma)} y ${n(media + k * sigma)}?`
          : `Una variable sigue una normal con media ${n(media)} y desviación estándar ${sigma}. ¿Qué porcentaje aproximado de los datos supera ${n(media + k * sigma)}?`,
      unidad: '%',
      calcular: () => (tipo === 'entre' ? PCT[k] : Math.round(((100 - PCT[k]) / 2) * 100) / 100),
      correcta: { valor: r },
      distractores:
        tipo === 'entre'
          ? [
              { valor: PCT[otros[0]], porQue: `Ese porcentaje corresponde a ±${otros[0]} desviaciones.` },
              { valor: PCT[otros[1]], porQue: `Ese porcentaje corresponde a ±${otros[1]} desviaciones.` },
              { valor: PCT[k] / 2, porQue: 'Esa es solo la mitad del intervalo, a un lado de la media.' },
            ]
          : [
              { valor: Math.round((100 - PCT[k]) * 100) / 100, porQue: 'Ese porcentaje suma las dos colas; sobre el valor queda solo una.' },
              { valor: PCT[k], porQue: 'Ese es el porcentaje dentro del intervalo, no sobre él.' },
              { valor: Math.round((100 - (100 - PCT[k]) / 2) * 100) / 100, porQue: 'Ese es el porcentaje bajo el valor.' },
            ],
      pasos: [
        `${n(media + k * sigma)} está a ${k} ${k === 1 ? 'desviación' : 'desviaciones'} sobre la media.`,
        `Entre μ − ${k}σ y μ + ${k}σ queda cerca del ${n(PCT[k])} %.`,
        tipo === 'entre' ? `Respuesta: ${n(r)} %.` : `Fuera queda el ${n(100 - PCT[k])} %, repartido en dos colas: ${n(r)} %.`,
      ],
      pista: 'Cuenta a cuántas desviaciones estándar de la media está el valor y usa la regla empírica.',
    };
  },
};

// ── Cuerpos de revolución ───────────────────────────────────────────────
const piTxt = (k: number, u: string) => `${k === 1 ? '' : n(k)}π ${u}`;

const volumenCilindro: Generador = {
  id: 'g4-r-cil',
  crear: (rnd) => {
    const r = entre(rnd, 2, 9);
    const h = entre(rnd, 2, 12);
    if (r === h) return null;
    const giro = rnd() < 0.5;
    return {
      habilidad: giro ? 'Rotar un rectángulo' : 'Volumen del cilindro',
      enunciado: giro
        ? `Un rectángulo de ${r} cm × ${h} cm gira en torno a su lado de ${h} cm. ¿Cuál es el volumen del cuerpo que se forma?`
        : `¿Cuál es el volumen de un cilindro de radio ${r} cm y altura ${h} cm?`,
      calcular: () => Math.PI * r ** 2 * h,
      correcta: { valor: r * r * h * Math.PI, texto: piTxt(r * r * h, 'cm³') },
      distractores: [
        { valor: h * h * r * Math.PI, texto: piTxt(h * h * r, 'cm³'), porQue: giro ? 'El lado que hace de eje es la altura; el otro es el radio.' : 'Intercambiaste radio y altura: es π · r² · h.' },
        { valor: 2 * r * h * Math.PI, texto: piTxt(2 * r * h, 'cm²'), porQue: '2πrh es el área lateral, no el volumen.' },
        { valor: (r * r * h * Math.PI) / 3, texto: (r * r * h) % 3 === 0 ? piTxt((r * r * h) / 3, 'cm³') : `${r * r * h}π/3 cm³`, porQue: 'Ese sería el volumen de un cono; el cilindro no se divide por 3.' },
      ],
      pasos: [
        giro ? `Se forma un cilindro de altura ${h} cm (el eje) y radio ${r} cm.` : 'V = π · r² · h.',
        `V = π · ${r}² · ${h} = π · ${r * r} · ${h}.`,
        `V = ${piTxt(r * r * h, 'cm³')}.`,
      ],
      pista: 'Multiplica el área de la base circular por la altura.',
    };
  },
};

const volumenCono: Generador = {
  id: 'g4-r-cono',
  crear: (rnd) => {
    const r = entre(rnd, 2, 9);
    const h = 3 * entre(rnd, 1, 4);
    if (r === h) return null;
    const v = (r * r * h) / 3;
    return {
      habilidad: 'Volumen del cono',
      enunciado: `¿Cuál es el volumen de un cono de radio ${r} cm y altura ${h} cm?`,
      calcular: () => (Math.PI * r ** 2 * h) / 3,
      correcta: { valor: v * Math.PI, texto: piTxt(v, 'cm³') },
      distractores: [
        { valor: r * r * h * Math.PI, texto: piTxt(r * r * h, 'cm³'), porQue: 'Falta dividir por 3: el cono es un tercio del cilindro.' },
        { valor: (r * h * Math.PI) / 3, texto: (r * h) % 3 === 0 ? piTxt((r * h) / 3, 'cm³') : `${r * h}π/3 cm³`, porQue: 'Falta elevar el radio al cuadrado.' },
        { valor: (h * h * r * Math.PI) / 3, texto: (h * h * r) % 3 === 0 ? piTxt((h * h * r) / 3, 'cm³') : `${h * h * r}π/3 cm³`, porQue: 'Intercambiaste radio y altura.' },
      ],
      pasos: [
        'V = π · r² · h / 3.',
        `V = π · ${r * r} · ${h} / 3.`,
        `V = ${piTxt(v, 'cm³')}.`,
      ],
      pista: 'El cono tiene un tercio del volumen del cilindro con la misma base y altura.',
    };
  },
};

const esfera: Generador = {
  id: 'g4-r-esf',
  crear: (rnd) => {
    const r = 3 * entre(rnd, 1, 6);
    const area = rnd() < 0.5;
    const vol = (4 * r ** 3) / 3;
    return area
      ? {
          habilidad: 'Área de la esfera',
          enunciado: `¿Cuál es el área de la superficie de una esfera de radio ${r} cm?`,
          calcular: () => 4 * Math.PI * r ** 2,
          correcta: { valor: 4 * r * r * Math.PI, texto: piTxt(4 * r * r, 'cm²') },
          distractores: [
            { valor: r * r * Math.PI, texto: piTxt(r * r, 'cm²'), porQue: 'Ese es el área de un círculo máximo; la esfera tiene 4 veces esa área.' },
            { valor: vol * Math.PI, texto: piTxt(vol, 'cm³'), porQue: 'Esa es la fórmula del volumen, no del área.' },
            { valor: 4 * r * Math.PI, texto: piTxt(4 * r, 'cm²'), porQue: 'El radio va al cuadrado.' },
          ],
          pasos: ['A = 4 · π · r².', `A = 4 · π · ${r * r}.`, `A = ${piTxt(4 * r * r, 'cm²')}.`],
          pista: 'El área de la esfera equivale a cuatro círculos de su mismo radio.',
        }
      : {
          habilidad: 'Volumen de la esfera',
          enunciado: `¿Cuál es el volumen de una esfera de radio ${r} cm?`,
          calcular: () => (4 / 3) * Math.PI * r ** 3,
          correcta: { valor: vol * Math.PI, texto: piTxt(vol, 'cm³') },
          distractores: [
            { valor: 4 * r ** 3 * Math.PI, texto: piTxt(4 * r ** 3, 'cm³'), porQue: 'Falta el 1/3 de la fórmula: V = 4/3 · π · r³.' },
            { valor: ((4 * r * r) / 3) * Math.PI, texto: piTxt((4 * r * r) / 3, 'cm³'), porQue: 'El radio va al cubo, no al cuadrado.' },
            { valor: vol, texto: `${n(vol)} cm³`, porQue: 'Falta el factor π.' },
          ],
          pasos: ['V = 4/3 · π · r³.', `V = 4/3 · π · ${n(r ** 3)}.`, `V = ${piTxt(vol, 'cm³')}.`],
          pista: 'Usa la fórmula del volumen de la esfera; el radio va al cubo.',
        };
  },
};

export const GENERADORES_4M: Record<string, Generador[]> = {
  'complejos-4m': [sumaComplejos, productoComplejos, potenciasI],
  'potencia-4m': [evaluarPotencia, escalaPotencia, coeficientePotencia],
  'logaritmica-4m': [evaluarLog, ecuacionLog, propiedadesLog],
  'binomial-4m': [esperanzaBinomial, varianzaBinomial, probabilidadBinomial],
  'normal-4m': [puntajeZ, reglaEmpirica],
  'revolucion-4m': [volumenCilindro, volumenCono, esfera],
};
