import { misionEnteros7b } from '@/features/missions/data/enteros7b';
import { misionFracciones7b } from '@/features/missions/data/fracciones7b';
import { localTutor } from '@/features/tutor/localTutor';
import { armarPedido, crearTutorIA, Llamador, revelaRespuesta } from '@/features/tutor/tutorIA';

const q = misionEnteros7b.preguntas[0];
const incorrecta = q.opciones.find((o) => o.id !== q.correcta)!.id;

describe('pedido al tutor IA', () => {
  test('solo lleva el ejercicio, con los textos que ve el estudiante', () => {
    const p = armarPedido('explicacion', q, '7.º básico', incorrecta);
    expect(Object.keys(p).sort()).toEqual(
      ['alternativas', 'correcta', 'elegida', 'enunciado', 'expresion', 'habilidad', 'nivel', 'pasos', 'tipo'].sort()
    );
    expect(p.alternativas).toHaveLength(4);
    expect(p.alternativas).toContain(p.correcta);
    expect(p.alternativas).toContain(p.elegida);
    expect(JSON.stringify(p)).not.toMatch(/"(alias|xpTotal|racha|logros|misiones|id|studentId)"/);
  });

  test('la pista no lleva la alternativa elegida', () => {
    expect(armarPedido('pista', q, '7.º básico')).not.toHaveProperty('elegida');
  });

  test('los textos caben en los límites del servidor', () => {
    const LIMITES = { enunciado: 400, expresion: 120, alternativa: 80, paso: 240 };
    for (const m of [misionEnteros7b, misionFracciones7b]) {
      for (const pq of m.preguntas) {
        const p = armarPedido('pista', pq, m.nivel);
        expect(p.enunciado.length).toBeLessThanOrEqual(LIMITES.enunciado);
        expect((p.expresion ?? '').length).toBeLessThanOrEqual(LIMITES.expresion);
        for (const a of p.alternativas) expect(a.length).toBeLessThanOrEqual(LIMITES.alternativa);
        for (const s of p.pasos) expect(s.length).toBeLessThanOrEqual(LIMITES.paso);
      }
    }
  });
});

describe('detectar pistas que revelan la respuesta', () => {
  test.each([
    ['Piensa en la recta numérica: el resultado es −3.', '−3', true],
    ['¿Qué pasa si sumas 3 al número?', '−3', false],
    ['La respuesta es 3/4, simplifica.', '3/4', true],
    ['Amplifica las fracciones al mismo denominador.', '3/4', false],
    ['Divide por 4 y luego multiplica', '4', true],
    ['Usa 14 como base', '4', false],
    ['Iguala los exponentes de 2', 'x = 2', false],
    ['Al final queda x = 2', 'x = 2', true],
  ])('«%s» con respuesta %s → %s', (pista, correcta, esperado) => {
    expect(revelaRespuesta(pista, correcta)).toBe(esperado);
  });
});

describe('tutor IA con respaldo local', () => {
  test('sin servidor: pista local y sin explicación', async () => {
    const t = crearTutorIA(null);
    expect(t.disponible).toBe(false);
    expect(await t.pista(q, '7.º básico')).toEqual({ texto: localTutor.pista(q), fuente: 'local' });
    expect(await t.explicar(q, '7.º básico', incorrecta)).toBeNull();
  });

  test('con servidor: usa la respuesta de la IA', async () => {
    const llamar: Llamador = jest.fn(async (p) => ({ texto: p.tipo === 'pista' ? 'Fíjate en los signos.' : 'Sumaste en vez de restar.' }));
    const t = crearTutorIA(llamar);
    expect(await t.pista(q, '7.º básico')).toEqual({ texto: 'Fíjate en los signos.', fuente: 'ia' });
    expect(await t.explicar(q, '7.º básico', incorrecta)).toEqual({ texto: 'Sumaste en vez de restar.', fuente: 'ia' });
    expect(llamar).toHaveBeenCalledTimes(2);
  });

  test('si la IA revela la respuesta, falla, se acaba el presupuesto o no hay red: pista local', async () => {
    const correcta = armarPedido('pista', q, '7.º básico').correcta;
    for (const llamar of [
      (async () => ({ texto: `La respuesta es ${correcta}.` })) as Llamador,
      (async () => ({ error: 'tope_mensual' })) as Llamador,
      (async () => {
        throw new Error('sin red');
      }) as Llamador,
    ]) {
      expect(await crearTutorIA(llamar).pista(q, '7.º básico')).toEqual({ texto: localTutor.pista(q), fuente: 'local' });
    }
    expect(await crearTutorIA(async () => ({ error: 'ia' })).explicar(q, '7.º básico', incorrecta)).toBeNull();
  });
});
