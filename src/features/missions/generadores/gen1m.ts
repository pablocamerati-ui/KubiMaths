import { entre, fraccion, Generador, mcd, n, p, sup, uno } from './base';

/** Generadores de variantes para 1.º medio. */

const coef = (k: number, letra: string) => (k === 1 ? letra : k === -1 ? `−${letra}` : `${n(k)}${letra}`);
const mas = (v: number) => (v < 0 ? `− ${-v}` : `+ ${v}`);

// ── Números racionales ──────────────────────────────────────────────────
const multFracciones: Generador = {
  id: 'g1-rac-mult',
  crear: (rnd) => {
    const a = entre(rnd, 1, 7) * uno(rnd, [-1, 1] as const);
    const b = entre(rnd, 2, 9);
    const c = entre(rnd, 1, 7);
    const d = entre(rnd, 2, 9);
    if (mcd(a, b) !== 1 || mcd(c, d) !== 1) return null;
    const f = (x: number, y: number) => (x < 0 ? `(${fraccion(x, y)})` : fraccion(x, y));
    return {
      habilidad: 'Multiplicación de fracciones',
      enunciado: 'Calcula el producto:',
      expresion: `${f(a, b)} · ${fraccion(c, d)}`,
      calcular: () => (a / b) * (c / d),
      correcta: { valor: (a * c) / (b * d), texto: fraccion(a * c, b * d) },
      distractores: [
        { valor: (a * d) / (b * c), texto: fraccion(a * d, b * c), porQue: 'Invertiste la segunda fracción: eso se hace al dividir, no al multiplicar.' },
        { valor: -(a * c) / (b * d), texto: fraccion(-a * c, b * d), porQue: 'Revisa la regla de los signos.' },
        { valor: (a + c) / (b + d), texto: fraccion(a + c, b + d), porQue: 'Se multiplican numerador con numerador y denominador con denominador.' },
      ],
      pasos: [
        'Multiplicamos numeradores entre sí y denominadores entre sí.',
        `(${n(a)} · ${c}) / (${b} · ${d}) = ${n(a * c)}/${b * d}.`,
        `Simplificamos: ${fraccion(a * c, b * d)}.`,
      ],
      pista: 'Numerador por numerador y denominador por denominador; luego simplifica.',
    };
  },
};

const divFracciones: Generador = {
  id: 'g1-rac-div',
  crear: (rnd) => {
    const a = entre(rnd, 1, 8);
    const b = entre(rnd, 2, 9);
    const c = entre(rnd, 1, 8);
    const d = entre(rnd, 2, 9);
    if (mcd(a, b) !== 1 || mcd(c, d) !== 1) return null;
    return {
      habilidad: 'División de fracciones',
      enunciado: 'Calcula el cociente:',
      expresion: `${fraccion(a, b)} : ${fraccion(c, d)}`,
      calcular: () => a / b / (c / d),
      correcta: { valor: (a * d) / (b * c), texto: fraccion(a * d, b * c) },
      distractores: [
        { valor: (a * c) / (b * d), texto: fraccion(a * c, b * d), porQue: 'Multiplicaste directamente. Al dividir, se multiplica por el inverso de la segunda.' },
        { valor: (b * c) / (a * d), texto: fraccion(b * c, a * d), porQue: 'Invertiste la primera fracción. Se invierte la segunda.' },
        { valor: (a + d) / (b + c), texto: fraccion(a + d, b + c), porQue: 'Sumaste términos. Se multiplica por el inverso de la segunda fracción.' },
      ],
      pasos: [
        `Dividir por ${fraccion(c, d)} es multiplicar por su inverso, ${fraccion(d, c)}.`,
        `${fraccion(a, b)} · ${fraccion(d, c)} = ${a * d}/${b * c}.`,
        `Simplificamos: ${fraccion(a * d, b * c)}.`,
      ],
      pista: 'Dividir por una fracción es multiplicar por su inverso.',
    };
  },
};

const ordenRacionales: Generador = {
  id: 'g1-rac-orden',
  crear: (rnd) => {
    const dens = [3, 4, 5, 6, 8] as const;
    const fr = Array.from({ length: 4 }, () => {
      const d = uno(rnd, dens);
      const a = entre(rnd, 1, d - 1);
      return { a, d, v: a / d };
    });
    if (fr.some((f) => mcd(f.a, f.d) !== 1)) return null;
    const mayor = fr.reduce((m, f) => (f.v > m.v ? f : m));
    const resto = fr.filter((f) => f !== mayor);
    if (resto.length !== 3) return null;
    return {
      habilidad: 'Orden de racionales',
      enunciado: '¿Cuál de estas fracciones es la mayor?',
      expresion: fr.map((f) => `${f.a}/${f.d}`).join(' ; '),
      calcular: () => Math.max(...fr.map((f) => f.v)),
      correcta: { valor: mayor.v, texto: `${mayor.a}/${mayor.d}` },
      distractores: resto.map((f) => ({
        valor: f.v,
        texto: `${f.a}/${f.d}`,
        porQue: `${f.a}/${f.d} = ${n(Math.round(f.v * 1000) / 1000)}, que es menor.`,
      })) as [{ valor: number; texto: string; porQue: string }, { valor: number; texto: string; porQue: string }, { valor: number; texto: string; porQue: string }],
      pasos: [
        'Convertimos cada fracción a decimal (o a denominador común).',
        fr.map((f) => `${f.a}/${f.d} ≈ ${n(Math.round(f.v * 1000) / 1000)}`).join('; ') + '.',
        `La mayor es ${mayor.a}/${mayor.d}.`,
      ],
      pista: 'Compara las fracciones como decimales o con un denominador común.',
    };
  },
};

// ── Potencias ───────────────────────────────────────────────────────────
const exponenteNegativo: Generador = {
  id: 'g1-pot-neg',
  crear: (rnd) => {
    const b = entre(rnd, 2, 6);
    const e = entre(rnd, 1, b <= 3 ? 4 : 3);
    const r = 1 / b ** e;
    return {
      habilidad: 'Exponente negativo',
      enunciado: '¿Cuál es el valor de la potencia?',
      expresion: `${b}${sup(-e)}`,
      calcular: () => b ** -e,
      correcta: { valor: r, texto: `1/${b ** e}` },
      distractores: [
        { valor: -(b ** e), texto: n(-(b ** e)), porQue: 'El exponente negativo no hace negativo el resultado: indica el inverso.' },
        { valor: -b * e, texto: n(-b * e), porQue: 'No se multiplica la base por el exponente.' },
        { valor: 1 / (b * e) + (b * e === b ** e ? 1 : 0), texto: `1/${b * e}`, porQue: `El denominador es ${b}${sup(e)}, no ${b} · ${e}.` },
      ],
      pasos: [
        'Un exponente negativo indica el inverso: a⁻ⁿ = 1/aⁿ.',
        `${b}${sup(-e)} = 1/${b}${sup(e)}.`,
        `= 1/${b ** e}.`,
      ],
      pista: 'Un exponente negativo indica el inverso multiplicativo de la potencia.',
    };
  },
};

const notacionCientifica: Generador = {
  id: 'g1-pot-cient',
  crear: (rnd) => {
    const m = entre(rnd, 11, 99) / 10;
    if (Number.isInteger(m)) return null;
    const e = entre(rnd, 3, 8) * uno(rnd, [-1, 1] as const);
    const numero = m * 10 ** e;
    const cifras = String(Math.round(m * 10));
    const escrito = e > 0 ? n(Math.round(numero)) : `0,${'0'.repeat(-e - 1)}${cifras}`;
    return {
      habilidad: 'Notación científica',
      enunciado: `¿Cómo se escribe ${escrito} en notación científica?`,
      calcular: () => e,
      correcta: { valor: e, texto: `${n(m)} · 10${sup(e)}` },
      distractores: [
        { valor: 100 - e, texto: `${n(m)} · 10${sup(-e)}`, porQue: e > 0 ? 'Un número grande lleva exponente positivo.' : 'Un número menor que 1 lleva exponente negativo.' },
        { valor: 200 + e, texto: `${n(m * 10)} · 10${sup(e - 1)}`, porQue: 'En notación científica la parte decimal debe estar entre 1 y 10.' },
        { valor: 300 + e, texto: `${n(m)} · 10${sup(e > 0 ? e + 1 : e - 1)}`, porQue: 'Cuenta de nuevo cuántos lugares se mueve la coma.' },
      ],
      pasos: [
        `Movemos la coma hasta dejar un solo dígito antes de ella: ${n(m)}.`,
        `La coma se movió ${Math.abs(e)} lugares hacia la ${e > 0 ? 'izquierda' : 'derecha'}.`,
        `Resultado: ${n(m)} · 10${sup(e)}.`,
      ],
      pista: 'Deja un solo dígito distinto de cero antes de la coma y cuenta cuántos lugares la moviste.',
    };
  },
};

const crecimiento: Generador = {
  id: 'g1-pot-crec',
  crear: (rnd) => {
    const ini = uno(rnd, [2, 3, 5, 10, 50, 100] as const);
    const horas = entre(rnd, 3, 6);
    const r = ini * 2 ** horas;
    return {
      habilidad: 'Crecimiento exponencial',
      enunciado: `Un cultivo tiene ${ini} bacterias y se duplica cada hora. ¿Cuántas habrá después de ${horas} horas?`,
      calcular: () => ini * 2 ** horas,
      correcta: { valor: r },
      distractores: [
        { valor: ini * 2 * horas, porQue: 'Duplicar cada hora es multiplicar por 2 una y otra vez: 2 elevado a las horas.' },
        { valor: ini + 2 ** horas, porQue: 'La cantidad inicial se multiplica, no se suma.' },
        { valor: ini * 2 ** (horas - 1), porQue: `Contaste una duplicación menos: son ${horas}.` },
      ],
      pasos: [
        `Después de h horas hay ${ini} · 2ʰ bacterias.`,
        `2${sup(horas)} = ${2 ** horas}.`,
        `${ini} · ${2 ** horas} = ${n(r)} bacterias.`,
      ],
      pista: 'Duplicar varias veces seguidas equivale a multiplicar por una potencia de 2.',
    };
  },
};

// ── Álgebra: productos notables ─────────────────────────────────────────
const cuadradoBinomio: Generador = {
  id: 'g1-alg-cuad',
  crear: (rnd) => {
    const k = entre(rnd, 2, 9) * uno(rnd, [-1, 1] as const);
    // valor: código = término central + 1000 · término libre
    const cod = (centro: number, libre: number) => centro + 1000 * libre;
    return {
      habilidad: 'Cuadrado de binomio',
      enunciado: 'Desarrolla el cuadrado de binomio:',
      expresion: `(x ${mas(k)})²`,
      calcular: () => cod(2 * k, k * k),
      correcta: { valor: cod(2 * k, k * k), texto: `x² ${mas(2 * k)}x + ${k * k}` },
      distractores: [
        { valor: cod(0, k * k), texto: `x² + ${k * k}`, porQue: `Falta el doble producto: 2 · x · ${p(k)}.` },
        { valor: cod(k, k * k), texto: `x² ${mas(k)}x + ${k * k}`, porQue: 'El término central es el doble producto, no el producto simple.' },
        { valor: cod(2 * k, 2 * k), texto: `x² ${mas(2 * k)}x ${mas(2 * k)}`, porQue: `El último término es ${p(k)}², no 2 · ${p(k)}.` },
      ],
      pasos: [
        '(a + b)² = a² + 2ab + b².',
        `x² + 2 · x · ${p(k)} + ${p(k)}².`,
        `= x² ${mas(2 * k)}x + ${k * k}.`,
      ],
      pista: 'Cuadrado del primero, más el doble del primero por el segundo, más el cuadrado del segundo.',
    };
  },
};

const sumaPorDiferencia: Generador = {
  id: 'g1-alg-sxd',
  crear: (rnd) => {
    const a = entre(rnd, 1, 5);
    const k = entre(rnd, 2, 9);
    const ax = a === 1 ? 'x' : `${a}x`;
    return {
      habilidad: 'Suma por diferencia',
      enunciado: 'Calcula el producto:',
      expresion: `(${ax} + ${k})(${ax} − ${k})`,
      calcular: () => a * a * 1000 - k * k,
      correcta: { valor: a * a * 1000 - k * k, texto: `${a * a === 1 ? '' : a * a}x² − ${k * k}` },
      distractores: [
        { valor: a * a * 1000 + k * k, texto: `${a * a === 1 ? '' : a * a}x² + ${k * k}`, porQue: 'El producto de +b y −b es negativo.' },
        { valor: a * a * 1000 - k * k + 500, texto: `${a * a === 1 ? '' : a * a}x² − ${2 * a * k}x − ${k * k}`, porQue: `Los términos centrales se cancelan: +${a * k}x − ${a * k}x = 0.` },
        { valor: a * a * 1000 - 2 * k, texto: `${a * a === 1 ? '' : a * a}x² − ${2 * k}`, porQue: `${k}² = ${k * k}, no ${k} · 2.` },
      ],
      pasos: [
        '(a + b)(a − b) = a² − b².',
        `(${ax})² − ${k}².`,
        `= ${a * a === 1 ? '' : a * a}x² − ${k * k}.`,
      ],
      pista: 'Una suma por su diferencia es igual a la diferencia de los cuadrados.',
    };
  },
};

const calculoMental: Generador = {
  id: 'g1-alg-mental',
  crear: (rnd) => {
    const base = uno(rnd, [20, 30, 40, 50, 60, 70, 80, 90, 100] as const);
    const d = entre(rnd, 1, 4);
    const r = (base + d) * (base - d);
    return {
      habilidad: 'Cálculo mental con productos notables',
      enunciado: 'Usa un producto notable para calcular:',
      expresion: `${base + d} · ${base - d}`,
      calcular: () => (base + d) * (base - d),
      correcta: { valor: r },
      distractores: [
        { valor: base * base + d * d, porQue: `Es una suma por diferencia: ${base}² − ${d}².` },
        { valor: base * base, porQue: `Falta restar ${d}².` },
        { valor: base * base - 2 * d, porQue: `Se resta ${d}², no el doble de ${d}.` },
      ],
      pasos: [
        `${base + d} · ${base - d} = (${base} + ${d})(${base} − ${d}).`,
        `= ${base}² − ${d}² = ${n(base * base)} − ${d * d}.`,
        `= ${n(r)}.`,
      ],
      pista: 'Escribe los factores como una suma por su diferencia.',
    };
  },
};

// ── Sistemas de ecuaciones ──────────────────────────────────────────────
const sistemaReduccion: Generador = {
  id: 'g1-sis-red',
  crear: (rnd) => {
    const x = entre(rnd, -5, 9);
    const y = entre(rnd, -5, 9);
    if (x === y) return null;
    const s = x + y;
    const d = x - y;
    // valor: código = 100·x + y
    return {
      habilidad: 'Método de reducción',
      enunciado: 'Resuelve el sistema: x + y = ' + n(s) + ' y x − y = ' + n(d) + '.',
      calcular: () => 100 * ((s + d) / 2) + (s - d) / 2,
      correcta: { valor: 100 * x + y, texto: `x = ${n(x)}, y = ${n(y)}` },
      distractores: [
        { valor: 100 * y + x, texto: `x = ${n(y)}, y = ${n(x)}`, porQue: 'Intercambiaste los valores: revisa con x − y.' },
        { valor: 100 * (s + d) + (s - d), texto: `x = ${n(s + d)}, y = ${n(s - d)}`, porQue: 'Al sumar las ecuaciones queda 2x: falta dividir por 2.' },
        { valor: 100 * x - y, texto: `x = ${n(x)}, y = ${n(-y)}`, porQue: `Revisa: ${n(x)} + ${p(-y)} no da ${n(s)}.` },
      ],
      pasos: [
        `Sumamos las ecuaciones: 2x = ${n(s + d)}, así que x = ${n(x)}.`,
        `Reemplazamos en x + y = ${n(s)}: y = ${n(s)} − ${p(x)}.`,
        `y = ${n(y)}.`,
      ],
      pista: 'Suma las dos ecuaciones para eliminar y.',
    };
  },
};

const sistemaContexto: Generador = {
  id: 'g1-sis-ctx',
  crear: (rnd) => {
    const pc = 100 * entre(rnd, 5, 15);
    const pj = 100 * entre(rnd, 3, 12);
    const c = entre(rnd, 2, 9);
    const j = entre(rnd, 2, 9);
    if (pc === pj || c === j) return null;
    const total = c + j;
    const plata = c * pc + j * pj;
    return {
      habilidad: 'Problemas con sistemas',
      enunciado: `En un kiosco, ${total} productos entre completos a $${n(pc)} y jugos a $${n(pj)} costaron $${n(plata)}. ¿Cuántos completos se compraron?`,
      calcular: () => (plata - pj * total) / (pc - pj),
      correcta: { valor: c },
      distractores: [
        { valor: j, porQue: 'Esa es la cantidad de jugos.' },
        { valor: Math.round((plata / pc) * 100) / 100, porQue: 'No todo lo gastado fue en completos: también hubo jugos.' },
        { valor: total, porQue: 'Ese es el total de productos.' },
      ],
      pasos: [
        `Sea c completos y j jugos: c + j = ${total} y ${n(pc)}c + ${n(pj)}j = ${n(plata)}.`,
        `Reemplazamos j = ${total} − c: ${n(pc)}c + ${n(pj)}(${total} − c) = ${n(plata)}.`,
        `${n(pc - pj)}c = ${n(plata - pj * total)}, así que c = ${c}.`,
      ],
      pista: 'Plantea una ecuación para la cantidad y otra para el dinero.',
    };
  },
};

// ── Semejanza ───────────────────────────────────────────────────────────
const escala: Generador = {
  id: 'g1-sem-esc',
  crear: (rnd) => {
    const e = uno(rnd, [100, 200, 500, 1000, 2000] as const);
    const cm = entre(rnd, 2, 15);
    const r = (cm * e) / 100;
    return {
      habilidad: 'Escalas',
      enunciado: `En un plano a escala 1 : ${n(e)}, una pared mide ${cm} cm. ¿Cuánto mide en la realidad?`,
      unidad: 'm',
      calcular: () => (cm * e) / 100,
      correcta: { valor: r },
      distractores: [
        { valor: cm * e, porQue: 'Ese resultado está en centímetros. Falta pasarlo a metros.' },
        { valor: (cm * e) / 1000, porQue: '1 m = 100 cm, no 1.000 cm.' },
        { valor: cm / e, porQue: 'En la realidad la medida es mayor: se multiplica por la escala.' },
      ],
      pasos: [
        `Cada cm del plano son ${n(e)} cm reales.`,
        `${cm} · ${n(e)} = ${n(cm * e)} cm.`,
        `${n(cm * e)} cm = ${n(r)} m.`,
      ],
      pista: 'Multiplica por la escala y luego convierte de centímetros a metros.',
    };
  },
};

const tales: Generador = {
  id: 'g1-sem-tales',
  crear: (rnd) => {
    const k = entre(rnd, 2, 4);
    const sombra = entre(rnd, 2, 9);
    const altura = sombra * k;
    const sombraEdif = entre(rnd, 4, 15);
    const r = sombraEdif * k;
    if (sombraEdif === sombra) return null;
    return {
      habilidad: 'Semejanza en contexto',
      enunciado: `Un poste de ${altura} m proyecta una sombra de ${sombra} m. A la misma hora, un árbol proyecta una sombra de ${sombraEdif} m. ¿Cuánto mide el árbol?`,
      unidad: 'm',
      calcular: () => (altura / sombra) * sombraEdif,
      correcta: { valor: r },
      distractores: [
        { valor: Math.round(((sombra * sombraEdif) / altura) * 100) / 100, porQue: 'Invertiste la razón: altura / sombra debe ser igual en ambos.' },
        { valor: sombraEdif + (altura - sombra), porQue: 'La relación es proporcional (multiplicativa), no una diferencia constante.' },
        { valor: altura * sombraEdif, porQue: `Falta dividir por la sombra del poste (${sombra} m).` },
      ],
      pasos: [
        'Los triángulos que forman objeto y sombra son semejantes.',
        `altura / sombra: ${altura} / ${sombra} = h / ${sombraEdif}.`,
        `h = ${k} · ${sombraEdif} = ${r} m.`,
      ],
      pista: 'La razón entre altura y sombra es la misma para ambos objetos.',
    };
  },
};

const razonAreas: Generador = {
  id: 'g1-sem-area',
  crear: (rnd) => {
    const k = entre(rnd, 2, 5);
    const area = entre(rnd, 3, 20);
    const r = area * k * k;
    return {
      habilidad: 'Razón de áreas',
      enunciado: `Una figura de ${area} cm² se amplía con razón de semejanza ${k}. ¿Cuál es el área de la figura ampliada?`,
      unidad: 'cm²',
      calcular: () => area * k ** 2,
      correcta: { valor: r },
      distractores: [
        { valor: area * k, porQue: 'Las áreas cambian según el cuadrado de la razón.' },
        { valor: area * k ** 3, porQue: 'El cubo de la razón es para los volúmenes.' },
        { valor: area + k * k, porQue: 'El área se multiplica por la razón al cuadrado, no se le suma.' },
      ],
      pasos: [
        `Si las longitudes se multiplican por ${k}, el área se multiplica por ${k}² = ${k * k}.`,
        `${area} · ${k * k}.`,
        `= ${r} cm².`,
      ],
      pista: 'Las áreas se multiplican por el cuadrado de la razón de semejanza.',
    };
  },
};

// ── Probabilidad ────────────────────────────────────────────────────────
const laplace: Generador = {
  id: 'g1-prob-lap',
  crear: (rnd) => {
    const rojas = entre(rnd, 1, 9);
    const azules = entre(rnd, 1, 9);
    const verdes = entre(rnd, 1, 9);
    const total = rojas + azules + verdes;
    if (rojas === azules || rojas === verdes) return null;
    return {
      habilidad: 'Regla de Laplace',
      enunciado: `Una bolsa tiene ${rojas} bolitas rojas, ${azules} azules y ${verdes} verdes. Si sacas una al azar, ¿cuál es la probabilidad de que sea roja?`,
      calcular: () => rojas / total,
      correcta: { valor: rojas / total, texto: fraccion(rojas, total) },
      distractores: [
        { valor: rojas / (azules + verdes), texto: fraccion(rojas, azules + verdes), porQue: 'El total de casos incluye también las rojas.' },
        { valor: (azules + verdes) / total, texto: fraccion(azules + verdes, total), porQue: 'Esa es la probabilidad de que NO sea roja.' },
        { valor: 1 / 3, texto: '1/3', porQue: 'Hay tres colores, pero no la misma cantidad de bolitas de cada uno.' },
      ],
      pasos: [
        `Casos totales: ${rojas} + ${azules} + ${verdes} = ${total}.`,
        `Casos favorables (rojas): ${rojas}.`,
        `P = ${rojas}/${total}${fraccion(rojas, total) !== `${rojas}/${total}` ? ` = ${fraccion(rojas, total)}` : ''}.`,
      ],
      pista: 'Divide los casos favorables por el total de casos posibles.',
    };
  },
};

const dosDados: Generador = {
  id: 'g1-prob-dados',
  crear: (rnd) => {
    const suma = entre(rnd, 3, 11);
    let fav = 0;
    for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) if (a + b === suma) fav++;
    return {
      habilidad: 'Dos dados',
      enunciado: `Se lanzan dos dados. ¿Cuál es la probabilidad de que la suma sea ${suma}?`,
      calcular: () => fav / 36,
      correcta: { valor: fav / 36, texto: fraccion(fav, 36) },
      distractores: [
        { valor: 1 / 11, texto: '1/11', porQue: 'Las 11 sumas posibles no son igual de probables.' },
        { valor: fav / 12, texto: fraccion(fav, 12), porQue: 'Los casos posibles son 6 · 6 = 36, no 6 + 6.' },
        { valor: 1 / 36, texto: '1/36', porQue: `Hay ${fav} combinaciones que suman ${suma}, no una sola.` },
      ],
      pasos: [
        'Hay 6 · 6 = 36 resultados posibles, todos igual de probables.',
        `Combinaciones que suman ${suma}: ${fav}.`,
        `P = ${fav}/36${fraccion(fav, 36) !== `${fav}/36` ? ` = ${fraccion(fav, 36)}` : ''}.`,
      ],
      pista: 'Haz una tabla de 6 por 6 y cuenta las combinaciones favorables.',
    };
  },
};

const sinReposicion: Generador = {
  id: 'g1-prob-sinrep',
  crear: (rnd) => {
    const a = entre(rnd, 2, 6);
    const b = entre(rnd, 2, 6);
    const t = a + b;
    const num = a * (a - 1);
    const den = t * (t - 1);
    return {
      habilidad: 'Extracciones sin reposición',
      enunciado: `Una caja tiene ${a} fichas azules y ${b} blancas. Se sacan dos fichas, sin devolver la primera. ¿Cuál es la probabilidad de que ambas sean azules?`,
      calcular: () => (a / t) * ((a - 1) / (t - 1)),
      correcta: { valor: num / den, texto: fraccion(num, den) },
      distractores: [
        { valor: (a * a) / (t * t), texto: fraccion(a * a, t * t), porQue: 'Sin reposición, en la segunda extracción queda una azul menos y una ficha menos.' },
        { valor: (2 * a) / t, texto: fraccion(2 * a, t), porQue: 'Las probabilidades de ambas extracciones se multiplican.' },
        { valor: (a * (a - 1)) / (t * t), texto: fraccion(a * (a - 1), t * t), porQue: 'También disminuye el total de fichas en la segunda extracción.' },
      ],
      pasos: [
        `Primera azul: ${a}/${t}.`,
        `Segunda azul (queda una menos): ${a - 1}/${t - 1}.`,
        `P = ${a}/${t} · ${a - 1}/${t - 1} = ${fraccion(num, den)}.`,
      ],
      pista: 'Multiplica las probabilidades de cada extracción, recordando que la ficha no se devuelve.',
    };
  },
};

export const GENERADORES_1M: Record<string, Generador[]> = {
  'racionales-1m': [multFracciones, divFracciones, ordenRacionales],
  'potencias-1m': [exponenteNegativo, notacionCientifica, crecimiento],
  'algebra-1m': [cuadradoBinomio, sumaPorDiferencia, calculoMental],
  'sistemas-1m': [sistemaReduccion, sistemaContexto],
  'semejanza-1m': [escala, tales, razonAreas],
  'probabilidad-1m': [laplace, dosDados, sinReposicion],
};
