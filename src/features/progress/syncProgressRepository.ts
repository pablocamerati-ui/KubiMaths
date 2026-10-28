import { ProgressRepository, Racha, StudentProgress } from './types';

/**
 * Une dos versiones del progreso sin perder avances: se queda con lo mejor de cada una.
 * Sirve cuando el mismo estudiante jugó sin conexión o en otro teléfono.
 */
export function unirProgreso(a: StudentProgress, b: StudentProgress): StudentProgress {
  const misiones: StudentProgress['misiones'] = { ...a.misiones };
  for (const [id, mb] of Object.entries(b.misiones)) {
    const ma = misiones[id];
    misiones[id] = ma
      ? {
          completada: ma.completada || mb.completada,
          mejorCorrectas: Math.max(ma.mejorCorrectas, mb.mejorCorrectas),
          intentos: Math.max(ma.intentos, mb.intentos),
        }
      : mb;
  }
  const logros: Record<string, string> = { ...(b.logros ?? {}) };
  for (const [id, dia] of Object.entries(a.logros ?? {})) {
    logros[id] = logros[id] && logros[id] < dia ? logros[id] : dia;
  }
  const racha = unirRacha(a.racha, b.racha);
  const curso = a.curso ?? b.curso;
  const alias = a.alias ?? b.alias;
  return {
    xpTotal: Math.max(a.xpTotal, b.xpTotal),
    misiones,
    ...(curso ? { curso } : {}),
    ...(alias ? { alias } : {}),
    ...(racha ? { racha } : {}),
    ...(Object.keys(logros).length ? { logros } : {}),
  };
}

function unirRacha(a?: Racha, b?: Racha): Racha | undefined {
  if (!a || !b) return a ?? b;
  const reciente = a.ultimoDia > b.ultimoDia ? a : b.ultimoDia > a.ultimoDia ? b : a.actual >= b.actual ? a : b;
  return { ...reciente, mejor: Math.max(a.mejor, b.mejor) };
}

const conLimite = <T,>(p: Promise<T>, ms: number) =>
  Promise.race([p, new Promise<never>((_, rej) => setTimeout(() => rej(new Error('timeout')), ms))]);

/**
 * Primero el teléfono, después la nube.
 * - Cargar: lee lo local, sin esperar a la red.
 * - Sincronizar: trae lo guardado en Supabase y lo une con el progreso actual.
 * - Guardar: guarda en el teléfono siempre; en la nube cuando se puede, en orden y sin bloquear el juego.
 */
export function crearSyncProgressRepository(
  local: ProgressRepository,
  remoto: ProgressRepository,
  { limiteMs = 8000, alFallar }: { limiteMs?: number; alFallar?: (e: unknown) => void } = {}
): ProgressRepository {
  // Los envíos a la nube van uno tras otro para que el último guardado sea el más nuevo.
  let cola: Promise<void> = Promise.resolve();
  const subir = (studentId: string, p: StudentProgress) => {
    cola = cola
      .then(() => conLimite(remoto.save(studentId, p), limiteMs))
      .catch((e) => alFallar?.(e));
    return cola;
  };

  return {
    load: (studentId) => local.load(studentId),
    async sincronizar(studentId, actual) {
      const enNube = await conLimite(remoto.load(studentId), limiteMs);
      const unido = unirProgreso(actual, enNube);
      await local.save(studentId, unido);
      subir(studentId, unido);
      return unido;
    },
    async save(studentId, progress) {
      await local.save(studentId, progress);
      subir(studentId, progress);
    },
  };
}
