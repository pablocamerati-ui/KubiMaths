import { MissionResult } from '../missions/engine';
import { StudentProgress } from './types';

/** Suma el resultado de un intento al progreso del estudiante (función pura). */
export function applyResult(progress: StudentProgress, result: MissionResult): StudentProgress {
  const prev = progress.misiones[result.missionId];
  return {
    ...progress,
    xpTotal: progress.xpTotal + result.xp,
    misiones: {
      ...progress.misiones,
      [result.missionId]: {
        completada: (prev?.completada ?? false) || result.completada,
        mejorCorrectas: Math.max(prev?.mejorCorrectas ?? 0, result.correctas),
        intentos: (prev?.intentos ?? 0) + 1,
      },
    },
  };
}
