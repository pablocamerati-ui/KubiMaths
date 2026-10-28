import type { SupabaseClient } from '@supabase/supabase-js';

import { textoOpcion } from '../missions/format';
import { OptionId, Question } from '../missions/types';
import { asegurarSesion } from '../progress/supabaseProgressRepository';
import { localTutor } from './localTutor';

/**
 * Tutor con IA (Claude Haiku 5.5) detrás de la función `tutor` de Supabase.
 *
 * Solo se envía el ejercicio: nivel, habilidad, enunciado, alternativas,
 * respuesta correcta, pasos y, para explicar un error, la alternativa elegida.
 * Nunca el apodo, el progreso ni otro dato del estudiante.
 * Si no hay conexión, se acabó el presupuesto o algo falla, se usa el tutor local.
 */
export type PedidoTutor = {
  tipo: 'pista' | 'explicacion';
  nivel: string;
  habilidad: string;
  enunciado: string;
  expresion?: string;
  alternativas: string[];
  correcta: string;
  elegida?: string;
  pasos: string[];
};

export type RespuestaTutor = { texto: string; fuente: 'ia' | 'local' };

/** Función que llama al servidor; se inyecta para poder probar sin red. */
export type Llamador = (pedido: PedidoTutor) => Promise<{ texto?: string; error?: string }>;

export function armarPedido(
  tipo: PedidoTutor['tipo'],
  q: Question,
  nivel: string,
  elegida?: OptionId
): PedidoTutor {
  const texto = (id: OptionId) => textoOpcion(q, q.opciones.find((o) => o.id === id)!);
  return {
    tipo,
    nivel,
    habilidad: q.habilidad,
    enunciado: q.enunciado,
    ...(q.expresion ? { expresion: q.expresion } : {}),
    alternativas: q.opciones.map((o) => textoOpcion(q, o)),
    correcta: texto(q.correcta),
    ...(elegida ? { elegida: texto(elegida) } : {}),
    pasos: q.pasos.slice(0, 6),
  };
}

/** ¿La pista deja ver la respuesta? Se compara sin espacios ni mayúsculas. */
export function revelaRespuesta(pista: string, correcta: string): boolean {
  const limpiar = (s: string) => s.toLowerCase().replace(/\s+/g, '');
  const r = limpiar(correcta);
  // Respuestas muy cortas ("4", "x") aparecen en cualquier texto: se revisan como palabra aparte.
  if (r.length <= 2) return new RegExp(`(^|[^0-9a-záéíóúñ,./])${r.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^0-9a-záéíóúñ,/]|$)`, 'i').test(pista.toLowerCase());
  return limpiar(pista).includes(r);
}

export function crearLlamadorSupabase(client: SupabaseClient, limiteMs = 12000): Llamador {
  return async (pedido) => {
    await asegurarSesion(client);
    const llamada = client.functions.invoke('tutor', { body: pedido });
    const limite = new Promise<never>((_, rej) => setTimeout(() => rej(new Error('timeout')), limiteMs));
    const { data, error } = await Promise.race([llamada, limite]);
    if (error) return { error: 'servidor' };
    return data as { texto?: string; error?: string };
  };
}

export function crearTutorIA(llamar: Llamador | null) {
  return {
    disponible: llamar !== null,

    /** Pista para empezar: IA si se puede (y no revela el resultado), si no la pista local. */
    async pista(q: Question, nivel: string): Promise<RespuestaTutor> {
      if (llamar) {
        try {
          const pedido = armarPedido('pista', q, nivel);
          const r = await llamar(pedido);
          if (r.texto && !revelaRespuesta(r.texto, pedido.correcta)) return { texto: r.texto, fuente: 'ia' };
        } catch {
          // sin red: seguimos con la pista local
        }
      }
      return { texto: localTutor.pista(q), fuente: 'local' };
    },

    /** Explicación del error con otras palabras. null si la IA no está disponible. */
    async explicar(q: Question, nivel: string, elegida: OptionId): Promise<RespuestaTutor | null> {
      if (!llamar) return null;
      try {
        const r = await llamar(armarPedido('explicacion', q, nivel, elegida));
        return r.texto ? { texto: r.texto, fuente: 'ia' } : null;
      } catch {
        return null;
      }
    },
  };
}

export type TutorIA = ReturnType<typeof crearTutorIA>;
