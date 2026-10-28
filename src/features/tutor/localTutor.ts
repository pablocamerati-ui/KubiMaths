import { textoOpcion } from '../missions/format';
import { OptionId, Question } from '../missions/types';
import { TutorFeedback, TutorService } from './TutorService';

const ANIMOS_CORRECTO = ['¡Correcto!', '¡Bien hecho!', '¡Exacto!', '¡Lo tienes!'];

function valorTexto(q: Question, id: OptionId): string {
  const op = q.opciones.find((o) => o.id === id);
  return op ? textoOpcion(q, op) : '';
}

/** Respuestas cortas: «¡Casi! Era 5/6». Frases: «¡Casi! La correcta es: …». */
function tituloError(correcta: string): string {
  return correcta.length > 14 ? `¡Casi! La correcta es: ${correcta}` : `¡Casi! Era ${correcta}`;
}

/** Tutor basado en reglas locales. No usa red ni datos personales. */
export const localTutor: TutorService = {
  retroalimentar(question, elegida) {
    const correcto = elegida === question.correcta;
    if (correcto) {
      const idx = question.id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % ANIMOS_CORRECTO.length;
      return { correcto, titulo: ANIMOS_CORRECTO[idx], pasos: question.pasos };
    }
    const opcion = question.opciones.find((o) => o.id === elegida);
    return {
      correcto,
      titulo: tituloError(valorTexto(question, question.correcta)),
      porQue: opcion?.porQue,
      pasos: question.pasos,
    } satisfies TutorFeedback;
  },
  pista(question) {
    return question.pista;
  },
};
