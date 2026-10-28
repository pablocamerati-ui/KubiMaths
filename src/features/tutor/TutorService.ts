import { OptionId, Question } from '../missions/types';

export type TutorFeedback = {
  correcto: boolean;
  titulo: string;
  /** Por qué la alternativa elegida es incorrecta (solo si falló). */
  porQue?: string;
  /** Resolución paso a paso. */
  pasos: string[];
};

/**
 * Contrato del tutor KUBI.
 *
 * Hoy lo implementa `LocalTutor` (reglas locales, sin red). Más adelante
 * puede implementarlo un tutor con IA detrás de un backend propio, que
 * reciba solo el ejercicio y la respuesta, nunca datos personales del
 * estudiante. Las pantallas dependen solo de esta interfaz.
 */
export interface TutorService {
  /** Retroalimentación inmediata tras responder. */
  retroalimentar(question: Question, elegida: OptionId): TutorFeedback;
  /** Pista que no revela el resultado. */
  pista(question: Question): string;
}
