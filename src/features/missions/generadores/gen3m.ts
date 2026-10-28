import { entre, fraccion, Generador, mcd, n, p, uno } from './base';

/** Generadores de variantes para 3.º medio. */

const mas = (v: number) => (v < 0 ? `− ${-v}` : `+ ${v}`);
const r2 = (x: number) => Math.round(x * 100) / 100;

// ── Matemática financiera ───────────────────────────────────────────────
const interesCompuesto: Generador = {
  id: 'g3-fin-comp',
  crear: (rnd) => {
    const capital = 10000 * entre(rnd, 2, 50);
    const tasa = uno(rnd, [2, 3, 4, 5, 6, 8, 10] as const);
    const anos = entre(rnd, 2, 3);
    const final = (capital * (100 + tasa) ** anos) / 100 ** anos;
    return {
      habilidad: 'Interés compuesto',
      enunciado: `Depositas $${n(capital)} al ${tasa} % anual de interés compuesto. ¿Cuánto dinero tendrás después de ${anos} años?`,
      prefijo: '$',
      calcular: () => (capital * (100 + tasa) ** anos) / 100 ** anos,
      correcta: { valor: final },
      distractores: [
        { valor: capital * (1 + (tasa * anos) / 100), porQue: 'Ese es el resultado con interés simple. En el compuesto se gana interés sobre los intereses.' },
        { valor: final - capital, porQue: 'Ese es solo el interés ganado. Falta sumarle el capital.' },
        { valor: (capital * (100 + tasa)) / 100, porQue: 'Ese es el monto después de un solo año.' },
      ],
      pasos: [
        'Monto = capital · (1 + tasa)ⁿ.',
        `${n(capital)} · ${n(1 + tasa / 100)}^${anos}.`.replace(`^${anos}`, anos === 2 ? '²' : '³'),
        `= $${n(final)}.`,
      ],
      pista: 'Cada año el dinero se multiplica por el mismo factor.',
    };
  },
};

const cuotaCredito: Generador = {
  id: 'g3-fin-cuota',
  crear: (rnd) => {
    const monto = 100000 * entre(rnd, 1, 9);
    const cuotas = uno(rnd, [3, 4, 5, 6, 10, 12] as const);
    const tasa = entre(rnd, 1, 3);
    const total = (monto * (100 + tasa * cuotas)) / 100;
    const cuota = total / cuotas;
    if (!Number.isInteger(cuota)) return null;
    return {
      habilidad: 'Cuotas de un crédito',
      enunciado: `Pides un crédito de $${n(monto)} en ${cuotas} cuotas iguales, con ${tasa} % de interés simple mensual sobre el monto pedido. ¿De cuánto es cada cuota?`,
      prefijo: '$',
      calcular: () => (monto * (1 + (tasa * cuotas) / 100)) / cuotas,
      correcta: { valor: cuota },
      distractores: [
        { valor: monto / cuotas, porQue: 'Así no pagarías intereses. Falta sumar el interés de todos los meses.' },
        { valor: total, porQue: 'Ese es el total a pagar. Falta repartirlo en las cuotas.' },
        { valor: r2((monto / cuotas) * (1 + tasa / 100)), porQue: 'Aplicaste el interés de un solo mes. Son tantos meses como cuotas.' },
      ],
      pasos: [
        `Interés: ${tasa} % durante ${cuotas} meses = ${tasa * cuotas} % de $${n(monto)} = $${n(total - monto)}.`,
        `Total a pagar: $${n(total)}.`,
        `Cuota: ${n(total)} : ${cuotas} = $${n(cuota)}.`,
      ],
      pista: 'Calcula primero el total a pagar con intereses y luego repártelo.',
    };
  },
};

const poderCompra: Generador = {
  id: 'g3-fin-ipc',
  crear: (rnd) => {
    const subida = uno(rnd, [5, 8, 10, 12, 15, 20, 25, 30, 40, 50] as const);
    const baja = r2((1 - 100 / (100 + subida)) * 100);
    const queda = r2((100 / (100 + subida)) * 100);
    return {
      habilidad: 'Inflación y poder de compra',
      enunciado: `Si los precios suben un ${subida} %, ¿en qué porcentaje baja lo que puedes comprar con el mismo sueldo? (Redondea a dos decimales).`,
      unidad: '%',
      calcular: () => r2((1 - 100 / (100 + subida)) * 100),
      correcta: { valor: baja },
      distractores: [
        { valor: subida, porQue: 'No baja lo mismo que suben los precios: tu dinero alcanza para 1 dividido por el factor de aumento.' },
        { valor: queda, porQue: 'Eso es lo que todavía puedes comprar. Se pregunta cuánto baja.' },
        { valor: 100 - subida, porQue: 'Restaste el alza a 100. Hay que dividir por el factor de aumento.' },
      ],
      pasos: [
        `Con el mismo dinero compras 1/${n(1 + subida / 100)} de lo que comprabas.`,
        `Eso es ≈ ${n(queda)} % de antes.`,
        `El poder de compra baja ≈ ${n(baja)} %.`,
      ],
      pista: 'Divide 1 por el factor de aumento de los precios y compara con el total.',
    };
  },
};

// ── Medidas de dispersión ───────────────────────────────────────────────
const rango: Generador = {
  id: 'g3-dis-rango',
  crear: (rnd) => {
    const datos = Array.from({ length: 5 }, () => entre(rnd, 10, 70) / 10);
    const max = Math.max(...datos);
    const min = Math.min(...datos);
    const r = r2(max - min);
    const ordenados = [...datos].sort((a, b) => a - b);
    const media = r2(datos.reduce((s, x) => s + x, 0) / datos.length);
    if (r === 0) return null;
    return {
      habilidad: 'Rango',
      enunciado: `Las notas de un estudiante fueron ${datos.map(n).join('; ')}. ¿Cuál es el rango?`,
      calcular: () => r2(Math.max(...datos) - Math.min(...datos)),
      correcta: { valor: r },
      distractores: [
        { valor: max, porQue: 'Esa es la nota más alta. Falta restarle la más baja.' },
        { valor: media, porQue: 'Ese es el promedio, no el rango.' },
        { valor: r2(max - ordenados[3]), porQue: 'Restaste las dos notas más altas. El rango es la mayor menos la menor.' },
      ],
      pasos: [
        'Rango = dato mayor − dato menor.',
        `Mayor: ${n(max)}. Menor: ${n(min)}.`,
        `${n(max)} − ${n(min)} = ${n(r)}.`,
      ],
      pista: 'Busca la nota más alta y la más baja.',
    };
  },
};

const varianzaGen: Generador = {
  id: 'g3-dis-var',
  crear: (rnd) => {
    const m = entre(rnd, 3, 12);
    const d1 = entre(rnd, 1, 4);
    const d2 = entre(rnd, 0, 4);
    const datos = [m - d1, m - d2, m + d2, m + d1].sort((a, b) => a - b);
    const sumaCuad = datos.reduce((s, x) => s + (x - m) ** 2, 0);
    const v = sumaCuad / 4;
    const dm = datos.reduce((s, x) => s + Math.abs(x - m), 0) / 4;
    if (datos[0] < 0) return null;
    return {
      habilidad: 'Varianza',
      enunciado: `¿Cuál es la varianza de los datos ${datos.join(', ')}?`,
      calcular: () => {
        const prom = datos.reduce((s, x) => s + x, 0) / 4;
        return datos.reduce((s, x) => s + (x - prom) ** 2, 0) / 4;
      },
      correcta: { valor: v },
      distractores: [
        { valor: sumaCuad, porQue: 'Esa es la suma de los cuadrados. Falta dividir por la cantidad de datos.' },
        { valor: dm, porQue: 'Esa es la desviación media. La varianza usa los cuadrados de las distancias.' },
        { valor: r2(sumaCuad / 3), porQue: 'Dividiste por n − 1. Aquí se pide la varianza poblacional: se divide por n.' },
      ],
      pasos: [
        `Promedio: ${datos.reduce((s, x) => s + x, 0)} / 4 = ${m}.`,
        `Cuadrados de las distancias: ${datos.map((x) => (x - m) ** 2).join(', ')}; suman ${sumaCuad}.`,
        `Varianza: ${sumaCuad} / 4 = ${n(v)}.`,
      ],
      pista: 'Eleva al cuadrado la distancia de cada dato al promedio y promédialas.',
    };
  },
};

const propiedadDispersion: Generador = {
  id: 'g3-dis-prop',
  crear: (rnd) => {
    const s = entre(rnd, 5, 25) / 10;
    const suma = rnd() < 0.5;
    const k = suma ? entre(rnd, 2, 10) / 10 : entre(rnd, 2, 3);
    const r = suma ? s : s * k;
    return {
      habilidad: 'Propiedades de la dispersión',
      enunciado: suma
        ? `La desviación estándar de unos puntajes es ${n(s)}. Si a todos se les suma ${n(k)}, ¿cuál es la nueva desviación estándar?`
        : `La desviación estándar de unos puntajes es ${n(s)}. Si todos los puntajes se multiplican por ${k}, ¿cuál es la nueva desviación estándar?`,
      calcular: () => (suma ? s : s * k),
      correcta: { valor: r },
      distractores: suma
        ? [
            { valor: r2(s + k), porQue: 'Sumar lo mismo a todos mueve los datos, pero no cambia qué tan separados están.' },
            { valor: r2(s * k), porQue: 'Multiplicaste. A los puntajes se les suma, no se les multiplica.' },
            { valor: r2(Math.abs(s - k)) || 0.01, porQue: 'Sumar lo mismo a todos no cambia la dispersión.' },
          ]
        : [
            { valor: s, porQue: 'Al multiplicar todos los datos, las distancias al promedio también se multiplican.' },
            { valor: r2(s * k * k), porQue: 'Por el cuadrado del factor se multiplica la varianza, no la desviación estándar.' },
            { valor: r2(s + k), porQue: 'Sumaste el factor. Las distancias al promedio se multiplican por él.' },
          ],
      pasos: suma
        ? [
            'Al sumar la misma cantidad, el promedio sube lo mismo que cada dato.',
            'Las distancias de cada dato al promedio no cambian.',
            `La desviación estándar sigue siendo ${n(r)}.`,
          ]
        : [
            'Al multiplicar todos los datos, las distancias al promedio se multiplican por lo mismo.',
            `${n(s)} · ${k}.`,
            `La nueva desviación estándar es ${n(r)}.`,
          ],
      pista: 'Piensa en qué pasa con las distancias de cada dato al promedio.',
    };
  },
};

// ── Probabilidad condicional ────────────────────────────────────────────
const tablaDobleEntrada: Generador = {
  id: 'g3-con-tabla',
  crear: (rnd) => {
    const ab = entre(rnd, 5, 40);
    const aNoB = entre(rnd, 5, 40);
    const noAb = entre(rnd, 5, 40);
    const noAnoB = entre(rnd, 5, 40);
    const b = ab + noAb;
    const a = ab + aNoB;
    const total = a + noAb + noAnoB;
    const curso = uno(rnd, ['3.º medio A', '3.º medio B', 'un taller', 'un club'] as const);
    return {
      habilidad: 'Tabla de doble entrada',
      enunciado: `En ${curso} hay ${total} estudiantes. ${a} usan la biblioteca; de ellos, ${ab} también van a la sala de computación. Además, ${noAb} van solo a la sala de computación. Si eliges al azar a alguien que va a la sala de computación, ¿cuál es la probabilidad de que use la biblioteca?`,
      calcular: () => ab / b,
      correcta: { valor: ab / b, texto: fraccion(ab, b) },
      distractores: [
        { valor: ab / total, texto: fraccion(ab, total), porQue: 'El total no son todos: solo los que van a la sala de computación.' },
        { valor: ab / a, texto: fraccion(ab, a), porQue: 'La condición está al revés: esa es la probabilidad de ir a computación sabiendo que usa la biblioteca.' },
        { valor: a / total, texto: fraccion(a, total), porQue: 'Esa es la probabilidad de usar la biblioteca sin la condición.' },
      ],
      pasos: [
        `Van a la sala de computación: ${ab} + ${noAb} = ${b}.`,
        `De ellos, ${ab} usan la biblioteca.`,
        `P = ${ab}/${b}${fraccion(ab, b) !== `${ab}/${b}` ? ` = ${fraccion(ab, b)}` : ''}.`,
      ],
      pista: 'La condición reduce el total de casos posibles.',
    };
  },
};

const urnaCondicional: Generador = {
  id: 'g3-con-urna',
  crear: (rnd) => {
    const rojas = entre(rnd, 2, 8);
    const azules = entre(rnd, 1, 8);
    const t = rojas + azules;
    return {
      habilidad: 'Extracciones sin reposición',
      enunciado: `Una caja tiene ${rojas} fichas rojas y ${azules} azules. Sacas una roja y no la devuelves. ¿Cuál es la probabilidad de que la segunda también sea roja?`,
      calcular: () => (rojas - 1) / (t - 1),
      correcta: { valor: (rojas - 1) / (t - 1), texto: fraccion(rojas - 1, t - 1) },
      distractores: [
        { valor: rojas / t, texto: fraccion(rojas, t), porQue: 'Así sería si devolvieras la ficha. Ahora queda una roja menos.' },
        { valor: (rojas - 1) / t, texto: fraccion(rojas - 1, t), porQue: 'También queda una ficha menos en total.' },
        { valor: (rojas / t) * ((rojas - 1) / (t - 1)), texto: fraccion(rojas * (rojas - 1), t * (t - 1)), porQue: 'Esa es la probabilidad de sacar dos rojas seguidas. Aquí ya sabes que la primera fue roja.' },
      ],
      pasos: [
        `Después de sacar una roja quedan ${rojas - 1} rojas y ${azules} azules.`,
        `En total quedan ${t - 1} fichas.`,
        `P = ${rojas - 1}/${t - 1}${fraccion(rojas - 1, t - 1) !== `${rojas - 1}/${t - 1}` ? ` = ${fraccion(rojas - 1, t - 1)}` : ''}.`,
      ],
      pista: 'Cuenta cuántas fichas quedan después de la primera extracción.',
    };
  },
};

const bayes: Generador = {
  id: 'g3-con-bayes',
  crear: (rnd) => {
    const pa = uno(rnd, [30, 40, 50, 60, 70] as const);
    const pb = 100 - pa;
    const da = entre(rnd, 1, 6);
    const db = entre(rnd, 1, 6);
    if (da === db) return null;
    const defA = pa * da;
    const defB = pb * db;
    return {
      habilidad: 'Teorema de Bayes',
      enunciado: `Una fábrica hace el ${pa} % de sus piezas con la máquina A y el ${pb} % con la B. La A produce ${da} % de piezas defectuosas y la B, ${db} %. Si una pieza salió defectuosa, ¿cuál es la probabilidad de que venga de la máquina B?`,
      calcular: () => ((pb / 100) * (db / 100)) / ((pa / 100) * (da / 100) + (pb / 100) * (db / 100)),
      correcta: { valor: defB / (defA + defB), texto: fraccion(defB, defA + defB) },
      distractores: [
        { valor: pb / 100, texto: fraccion(pb, 100), porQue: 'Esa es la probabilidad de venir de B sin saber que es defectuosa.' },
        { valor: db / 100, texto: fraccion(db, 100), porQue: 'Esa es la probabilidad de que B produzca una defectuosa, no la inversa.' },
        { valor: defA / (defA + defB), texto: fraccion(defA, defA + defB), porQue: 'Esa es la probabilidad de que venga de la máquina A.' },
      ],
      pasos: [
        `Defectuosas de A: ${pa} % · ${da} %. Defectuosas de B: ${pb} % · ${db} %.`,
        `En proporción: A aporta ${defA} y B aporta ${defB} (de cada 10.000 piezas).`,
        `P(B | defectuosa) = ${defB}/${defA + defB} = ${fraccion(defB, defA + defB)}.`,
      ],
      pista: 'Calcula cuántas defectuosas aporta cada máquina y qué parte de ellas viene de la que te piden.',
    };
  },
};

// ── Modelos exponenciales ───────────────────────────────────────────────
const crecimiento: Generador = {
  id: 'g3-exp-crec',
  crear: (rnd) => {
    const a = uno(rnd, [2, 3, 5, 10, 20, 50, 100, 200] as const);
    const b = uno(rnd, [2, 3, 4] as const);
    const t = entre(rnd, 2, 5);
    const r = a * b ** t;
    if (r > 5_000_000) return null;
    const verbo = { 2: 'se duplica', 3: 'se triplica', 4: 'se cuadruplica' }[b];
    return {
      habilidad: 'Crecimiento exponencial',
      enunciado: `Un cultivo parte con ${n(a)} bacterias y ${verbo} cada hora. ¿Cuántas bacterias habrá después de ${t} horas?`,
      calcular: () => a * b ** t,
      correcta: { valor: r },
      distractores: [
        { valor: a * b * t, porQue: `Multiplicaste por ${b} y por ${t}. El factor se aplica una vez por cada hora: es una potencia.` },
        { valor: a * b ** (t - 1), porQue: 'Contaste una hora menos.' },
        { valor: a + b ** t, porQue: 'La cantidad inicial se multiplica, no se suma.' },
      ],
      pasos: [
        `Modelo: N(t) = ${n(a)} · ${b}ᵗ.`,
        `${b}^${t} = ${n(b ** t)}.`.replace(`${b}^${t}`, `${b}${'⁰¹²³⁴⁵⁶⁷⁸⁹'[t]}`),
        `${n(a)} · ${n(b ** t)} = ${n(r)} bacterias.`,
      ],
      pista: 'Cada hora la cantidad se multiplica por el mismo número.',
    };
  },
};

const vidaMedia: Generador = {
  id: 'g3-exp-vida',
  crear: (rnd) => {
    const vida = uno(rnd, [2, 3, 4, 5, 8, 10, 20] as const);
    const veces = entre(rnd, 2, 4);
    const queda = entre(rnd, 3, 25);
    const inicial = queda * 2 ** veces;
    const tiempo = vida * veces;
    return {
      habilidad: 'Vida media',
      enunciado: `Una sustancia tiene una vida media de ${vida} años. Si hoy hay ${n(inicial)} g, ¿cuántos gramos quedarán en ${tiempo} años?`,
      unidad: 'g',
      calcular: () => inicial * (1 / 2) ** (tiempo / vida),
      correcta: { valor: queda },
      distractores: [
        { valor: inicial / 2 ** (veces - 1), porQue: 'Contaste una vida media menos.' },
        { valor: r2(inicial / veces), porQue: `Dividiste por ${veces}. Hay que dividir por 2 una vez por cada vida media.` },
        { valor: r2(inicial / (2 * veces)), porQue: `Dividiste por 2 · ${veces}. Son divisiones por 2 sucesivas: por 2 elevado a ${veces}.` },
      ],
      pasos: [
        `En ${tiempo} años pasan ${tiempo} / ${vida} = ${veces} vidas medias.`,
        `Cada vida media la cantidad se reduce a la mitad: ${Array.from({ length: veces + 1 }, (_, i) => n(inicial / 2 ** i)).join(' → ')}.`,
        `Quedarán ${n(queda)} g.`,
      ],
      pista: 'Cuenta cuántas veces cabe la vida media en el tiempo total.',
    };
  },
};

const despejarTiempo: Generador = {
  id: 'g3-exp-tiempo',
  crear: (rnd) => {
    const c = entre(rnd, 2, 9);
    const b = uno(rnd, [2, 3, 5] as const);
    const t = entre(rnd, 2, b === 2 ? 7 : 4);
    const total = c * b ** t;
    const sup = (x: number) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[x];
    return {
      habilidad: 'Despejar el tiempo',
      enunciado: 'Resuelve la ecuación:',
      expresion: `${c} · ${b}ᵗ = ${n(total)}`,
      calcular: () => Math.round(Math.log(total / c) / Math.log(b)),
      correcta: { valor: t, texto: `t = ${t}` },
      distractores: [
        { valor: b ** t, texto: `t = ${n(b ** t)}`, porQue: `${n(b ** t)} es el valor de ${b}ᵗ. Falta encontrar el exponente.` },
        { valor: total / c / b, texto: `t = ${n(total / c / b)}`, porQue: `Dividiste por ${b}. Hay que buscar a qué exponente elevar ${b}.` },
        { valor: t + 1, texto: `t = ${t + 1}`, porQue: `Revisa: ${b}${sup(t + 1)} = ${n(b ** (t + 1))}.` },
      ],
      pasos: [
        `Dividimos por ${c}: ${b}ᵗ = ${n(b ** t)}.`,
        `${n(b ** t)} = ${b}${sup(t)}.`,
        `t = ${t}.`,
      ],
      pista: 'Primero deja sola la potencia y luego busca su exponente.',
    };
  },
};

// ── Geometría analítica ─────────────────────────────────────────────────
const TRIOS = [
  [3, 4, 5],
  [6, 8, 10],
  [5, 12, 13],
  [8, 15, 17],
  [9, 12, 15],
] as const;

const distancia: Generador = {
  id: 'g3-ana-dist',
  crear: (rnd) => {
    const [dx0, dy0, d] = uno(rnd, TRIOS);
    const [dx, dy] = rnd() < 0.5 ? [dx0, dy0] : [dy0, dx0];
    const sx = uno(rnd, [-1, 1] as const);
    const sy = uno(rnd, [-1, 1] as const);
    const x1 = entre(rnd, -6, 6);
    const y1 = entre(rnd, -6, 6);
    const x2 = x1 + sx * dx;
    const y2 = y1 + sy * dy;
    return {
      habilidad: 'Distancia entre dos puntos',
      enunciado: `¿Cuál es la distancia entre los puntos (${n(x1)}, ${n(y1)}) y (${n(x2)}, ${n(y2)})?`,
      calcular: () => Math.hypot(x2 - x1, y2 - y1),
      correcta: { valor: d },
      distractores: [
        { valor: dx + dy, porQue: 'Sumaste las diferencias. Se usa Pitágoras: la raíz de la suma de sus cuadrados.' },
        { valor: d * d, porQue: 'Ese es el cuadrado de la distancia. Falta sacar la raíz.' },
        { valor: Math.abs(dx - dy), porQue: 'Restaste las diferencias. Se elevan al cuadrado y se suman.' },
      ],
      pasos: [
        `Δx = ${n(x2)} − ${p(x1)} = ${n(x2 - x1)} y Δy = ${n(y2)} − ${p(y1)} = ${n(y2 - y1)}.`,
        `d = √(${p(x2 - x1)}² + ${p(y2 - y1)}²) = √${d * d}.`,
        `d = ${d}.`,
      ],
      pista: 'La distancia es la hipotenusa del triángulo formado por las diferencias.',
    };
  },
};

const puntoMedio: Generador = {
  id: 'g3-ana-pm',
  crear: (rnd) => {
    const x1 = entre(rnd, -9, 9);
    const y1 = entre(rnd, -9, 9);
    const x2 = x1 + 2 * entre(rnd, -6, 6);
    const y2 = y1 + 2 * entre(rnd, -6, 6);
    if (x1 === x2 || y1 === y2) return null;
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    const cod = (x: number, y: number) => 1000 * x + y;
    const pt = (x: number, y: number) => `(${n(x)}, ${n(y)})`;
    return {
      habilidad: 'Punto medio',
      enunciado: `¿Cuál es el punto medio del segmento que une ${pt(x1, y1)} y ${pt(x2, y2)}?`,
      calcular: () => cod((x1 + x2) / 2, (y1 + y2) / 2),
      correcta: { valor: cod(mx, my), texto: pt(mx, my) },
      distractores: [
        { valor: cod(x1 + x2, y1 + y2), texto: pt(x1 + x2, y1 + y2), porQue: 'Sumaste las coordenadas. Falta dividir por 2.' },
        { valor: cod((x2 - x1) / 2, (y2 - y1) / 2), texto: pt((x2 - x1) / 2, (y2 - y1) / 2), porQue: 'Restaste las coordenadas. El punto medio es el promedio.' },
        { valor: cod(my, mx) + 0.5, texto: pt(my, mx), porQue: 'Intercambiaste las coordenadas x e y.' },
      ],
      pasos: [
        `x = (${n(x1)} + ${p(x2)}) / 2 = ${n(mx)}.`,
        `y = (${n(y1)} + ${p(y2)}) / 2 = ${n(my)}.`,
        `Punto medio: ${pt(mx, my)}.`,
      ],
      pista: 'Promedia las coordenadas x por un lado y las y por otro.',
    };
  },
};

const perpendicular: Generador = {
  id: 'g3-ana-perp',
  crear: (rnd) => {
    const num = entre(rnd, 1, 6) * uno(rnd, [-1, 1] as const);
    const den = entre(rnd, 1, 5);
    if (mcd(num, den) !== 1 || Math.abs(num) === den) return null;
    const b = entre(rnd, -9, 9);
    const m = num / den;
    const mTxt = den === 1 ? `${n(num)}` : `${num < 0 ? '−' : ''}${Math.abs(num)}/${den}`;
    const recta = den === 1 ? `y = ${num === 1 ? '' : num === -1 ? '−' : n(num)}x ${mas(b)}` : `y = (${mTxt})x ${mas(b)}`;
    const paralela = rnd() < 0.4;
    const r = paralela ? m : -1 / m;
    return {
      habilidad: paralela ? 'Rectas paralelas' : 'Rectas perpendiculares',
      enunciado: `¿Cuál es la pendiente de una recta ${paralela ? 'paralela' : 'perpendicular'} a ${recta.replace(' + 0', '').replace(' − 0', '')}?`,
      calcular: () => (paralela ? num / den : -den / num),
      correcta: { valor: r, texto: paralela ? fraccion(num, den) : fraccion(-den, num) },
      distractores: paralela
        ? [
            { valor: -1 / m, texto: fraccion(-den, num), porQue: 'Esa sería la pendiente de una perpendicular. Las paralelas tienen la misma pendiente.' },
            { valor: -m, texto: fraccion(-num, den), porQue: 'Las paralelas tienen exactamente la misma pendiente, con el mismo signo.' },
            { valor: b === 0 || b === m ? 99 : b, texto: n(b === 0 || b === m ? 99 : b), porQue: 'Ese es el coeficiente de posición, no la pendiente.' },
          ]
        : [
            { valor: m, texto: fraccion(num, den), porQue: 'Esa es la pendiente de una paralela.' },
            { valor: -m, texto: fraccion(-num, den), porQue: 'Falta invertir: el producto de las pendientes debe ser −1.' },
            { valor: 1 / m, texto: fraccion(den, num), porQue: 'Falta cambiar el signo: el producto de las pendientes debe ser −1.' },
          ],
      pasos: paralela
        ? [
            `La pendiente de la recta dada es ${mTxt}.`,
            'Dos rectas paralelas tienen la misma pendiente.',
            `Pendiente: ${fraccion(num, den)}.`,
          ]
        : [
            `La pendiente de la recta dada es ${mTxt}.`,
            'Dos rectas son perpendiculares si el producto de sus pendientes es −1.',
            `Pendiente: ${fraccion(-den, num)}.`,
          ],
      pista: paralela
        ? 'Compara las pendientes de dos rectas que nunca se cortan.'
        : 'Las pendientes de dos rectas perpendiculares son inversas y de signo contrario.',
    };
  },
};

// ── Inecuaciones ────────────────────────────────────────────────────────
const inecuacion: Generador = {
  id: 'g3-ine-lin',
  crear: (rnd) => {
    const a = entre(rnd, 2, 6) * uno(rnd, [-1, 1] as const);
    const lim = entre(rnd, -8, 8);
    const b = entre(rnd, -9, 9);
    if (b === 0) return null;
    const c = a * lim + b;
    const sentido = uno(rnd, ['<', '>', '≤', '≥'] as const);
    const invertir = { '<': '>', '>': '<', '≤': '≥', '≥': '≤' } as const;
    const final = a < 0 ? invertir[sentido] : sentido;
    const codigo = { '<': -1000, '>': 1000, '≤': -2000, '≥': 2000 } as const;
    const ax = a === 1 ? 'x' : a === -1 ? '−x' : `${n(a)}x`;
    return {
      habilidad: a < 0 ? 'Inecuaciones con negativos' : 'Inecuaciones lineales',
      enunciado: 'Resuelve la inecuación:',
      expresion: `${ax} ${mas(b)} ${sentido} ${n(c)}`,
      calcular: () => codigo[final] + (c - b) / a,
      correcta: { valor: codigo[final] + lim, texto: `x ${final} ${n(lim)}` },
      distractores: [
        a < 0
          ? { valor: codigo[sentido] + lim, texto: `x ${sentido} ${n(lim)}`, porQue: 'Al dividir por un número negativo, el sentido de la desigualdad se invierte.' }
          : { valor: codigo[invertir[sentido]] + lim, texto: `x ${invertir[sentido]} ${n(lim)}`, porQue: 'Dividiste por un número positivo: el sentido no cambia.' },
        { valor: codigo[final] + (c + b) / a + 0.001, texto: `x ${final} ${n(r2((c + b) / a))}`, porQue: `Al pasar el ${n(Math.abs(b))} al otro lado, su signo cambia.` },
        { valor: codigo[final] + (c - b) + 0.002, texto: `x ${final} ${n(c - b)}`, porQue: `Falta dividir por ${n(a)}.` },
      ],
      pasos: [
        `${b > 0 ? 'Restamos' : 'Sumamos'} ${Math.abs(b)} a ambos lados: ${ax} ${sentido} ${n(c - b)}.`,
        a < 0
          ? `Dividimos por ${n(a)} e invertimos el sentido: x ${final} ${n(lim)}.`
          : `Dividimos por ${a} (positivo, el sentido se mantiene): x ${final} ${n(lim)}.`,
        `Solución: x ${final} ${n(lim)}.`,
      ],
      pista: 'Despeja como en una ecuación y fíjate si divides por un número negativo.',
    };
  },
};

const enterosEnIntervalo: Generador = {
  id: 'g3-ine-enteros',
  crear: (rnd) => {
    const a = entre(rnd, -9, 3);
    const b = a + entre(rnd, 3, 10);
    const izq = uno(rnd, ['<', '≤'] as const);
    const der = uno(rnd, ['<', '≤'] as const);
    let c = 0;
    for (let x = a; x <= b; x++) {
      if ((izq === '<' ? a < x : a <= x) && (der === '<' ? x < b : x <= b)) c++;
    }
    return {
      habilidad: 'Soluciones enteras',
      enunciado: `¿Cuántos números enteros cumplen ${n(a)} ${izq} x ${der} ${n(b)}?`,
      calcular: () => {
        let k = 0;
        for (let x = a - 1; x <= b + 1; x++) if ((izq === '<' ? a < x : a <= x) && (der === '<' ? x < b : x <= b)) k++;
        return k;
      },
      correcta: { valor: c },
      distractores: [
        { valor: c + 1, porQue: 'Contaste un extremo que no se incluye. Revisa cada desigualdad.' },
        { valor: c - 1, porQue: 'Dejaste fuera un extremo que sí se incluye (≤).' },
        { valor: b - a === c || b - a === c + 1 || b - a === c - 1 ? c + 2 : b - a, porQue: 'Restar los extremos no siempre da la cantidad de enteros: revisa cuáles se incluyen.' },
      ],
      pasos: [
        `${izq === '<' ? `El ${n(a)} no se incluye` : `El ${n(a)} se incluye`} y ${der === '<' ? `el ${n(b)} no` : `el ${n(b)} sí`}.`,
        `Los enteros van desde ${n(izq === '<' ? a + 1 : a)} hasta ${n(der === '<' ? b - 1 : b)}.`,
        `Son ${c} números.`,
      ],
      pista: 'Escribe la lista de enteros, cuidando qué extremos se incluyen.',
    };
  },
};

const planCelular: Generador = {
  id: 'g3-ine-ctx',
  crear: (rnd) => {
    const fijo = 1000 * entre(rnd, 4, 12);
    const porUnidad = uno(rnd, [20, 25, 40, 50, 100] as const);
    const maxU = 10 * entre(rnd, 4, 30);
    const tope = fijo + porUnidad * maxU;
    return {
      habilidad: 'Inecuaciones en contexto',
      enunciado: `Un plan de celular cobra $${n(fijo)} fijos más $${porUnidad} por cada MB extra. Si quieres gastar como máximo $${n(tope)}, ¿cuántos MB extra puedes usar como máximo?`,
      unidad: 'MB',
      calcular: () => Math.floor((tope - fijo) / porUnidad),
      correcta: { valor: maxU },
      distractores: [
        { valor: r2(tope / porUnidad), porQue: 'Dividiste el total completo. Primero resta el cargo fijo.' },
        { valor: maxU - 1, porQue: 'Con exactamente ese máximo gastas justo el tope, y eso está permitido.' },
        { valor: r2(fijo / porUnidad), porQue: 'Dividiste el cargo fijo. Se divide lo que queda después de pagarlo.' },
      ],
      pasos: [
        `Planteamos: ${n(fijo)} + ${porUnidad}x ≤ ${n(tope)}.`,
        `${porUnidad}x ≤ ${n(tope - fijo)}.`,
        `x ≤ ${maxU}: como máximo ${maxU} MB.`,
      ],
      pista: 'Plantea una inecuación con el cargo fijo más el costo por MB.',
    };
  },
};

export const GENERADORES_3M: Record<string, Generador[]> = {
  'finanzas-3m': [interesCompuesto, cuotaCredito, poderCompra],
  'dispersion-3m': [rango, varianzaGen, propiedadDispersion],
  'condicional-3m': [tablaDobleEntrada, urnaCondicional, bayes],
  'exponencial-3m': [crecimiento, vidaMedia, despejarTiempo],
  'analitica-3m': [distancia, puntoMedio, perpendicular],
  'inecuaciones-3m': [inecuacion, enterosEnIntervalo, planCelular],
};
