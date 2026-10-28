export type MissionProgress = {
  completada: boolean;
  mejorCorrectas: number;
  intentos: number;
};

export type Racha = {
  /** Días seguidos jugando, contando el último día jugado. */
  actual: number;
  mejor: number;
  /** Último día jugado (AAAA-MM-DD, hora local). */
  ultimoDia: string;
};

export type StudentProgress = {
  xpTotal: number;
  misiones: Record<string, MissionProgress>;
  /** Último curso elegido en el mapa (por ejemplo "7b" u "8b"). */
  curso?: string;
  /** Apodo elegido por el estudiante. Nunca su nombre completo ni otros datos personales. */
  alias?: string;
  racha?: Racha;
  /** Logros desbloqueados: id del logro → día en que se obtuvo. */
  logros?: Record<string, string>;
};

export const EMPTY_PROGRESS: StudentProgress = { xpTotal: 0, misiones: {} };

/**
 * Persistencia del progreso por estudiante.
 * Implementación actual: local en el dispositivo (AsyncStorage).
 * Siguiente: Supabase (ver supabase/README.md), con la misma interfaz.
 */
export interface ProgressRepository {
  load(studentId: string): Promise<StudentProgress>;
  save(studentId: string, progress: StudentProgress): Promise<void>;
  /** Opcional: trae el progreso de la nube y lo une con el actual. */
  sincronizar?(studentId: string, actual: StudentProgress): Promise<StudentProgress>;
}
