import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { MissionResult } from '../missions/engine';
import { evaluarLogros, diaLocal, registrarIntento } from './logros';
import { progressRepository } from './repositorio';
import { unirProgreso } from './syncProgressRepository';
import { EMPTY_PROGRESS, ProgressRepository, StudentProgress } from './types';

/** Mientras no haya cuentas, el progreso se guarda para un estudiante local. */
export const LOCAL_STUDENT_ID = 'local';

type ProgressContextValue = {
  progress: StudentProgress;
  ready: boolean;
  completedMissionIds: ReadonlySet<string>;
  /** Guarda un intento y devuelve los ids de los logros que se acaban de desbloquear. */
  recordResult: (result: MissionResult) => string[];
  /** Recuerda el curso elegido en el mapa. */
  setCurso: (curso: string) => void;
  /** Guarda el apodo del estudiante (ya validado con validarAlias). */
  setAlias: (alias: string) => void;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({
  children,
  repository = progressRepository,
  studentId = LOCAL_STUDENT_ID,
}: {
  children: ReactNode;
  repository?: ProgressRepository;
  studentId?: string;
}) {
  const [progress, setProgress] = useState<StudentProgress>(EMPTY_PROGRESS);
  const [ready, setReady] = useState(false);
  const latest = useRef(progress);

  useEffect(() => {
    let active = true;
    repository.load(studentId).then((p) => {
      if (!active) return;
      latest.current = p;
      setProgress(p);
      setReady(true);
      // Después, sin bloquear: unir con lo guardado en la nube (si hay conexión).
      repository
        .sincronizar?.(studentId, p)
        .then((unido) => {
          if (!active) return;
          // Si se jugó mientras tanto, se une también lo nuevo.
          if (latest.current === p) {
            latest.current = unido;
            setProgress(unido);
            return;
          }
          const next = unirProgreso(latest.current, unido);
          latest.current = next;
          setProgress(next);
          repository.save(studentId, next).catch(() => undefined);
        })
        .catch(() => undefined);
    });
    return () => {
      active = false;
    };
  }, [repository, studentId]);

  const guardar = useCallback(
    (next: StudentProgress) => {
      latest.current = next;
      setProgress(next);
      repository.save(studentId, next).catch(() => undefined);
    },
    [repository, studentId]
  );

  const recordResult = useCallback(
    (result: MissionResult) => {
      // Date.now() permite fijar la fecha en las pruebas.
      const { progreso, nuevos } = registrarIntento(latest.current, result, new Date(Date.now()));
      guardar(progreso);
      return nuevos;
    },
    [guardar]
  );

  const setCurso = useCallback(
    (curso: string) => {
      if (latest.current.curso === curso) return;
      guardar({ ...latest.current, curso });
    },
    [guardar]
  );

  const setAlias = useCallback(
    (alias: string) => {
      if (latest.current.alias === alias) return;
      guardar(evaluarLogros({ ...latest.current, alias }, diaLocal(new Date(Date.now()))).progreso);
    },
    [guardar]
  );

  const completedMissionIds = useMemo(
    () =>
      new Set(
        Object.entries(progress.misiones)
          .filter(([, m]) => m.completada)
          .map(([id]) => id)
      ),
    [progress]
  );

  const value = useMemo(
    () => ({ progress, ready, completedMissionIds, recordResult, setCurso, setAlias }),
    [progress, ready, completedMissionIds, recordResult, setCurso, setAlias]
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress debe usarse dentro de ProgressProvider');
  return ctx;
}
