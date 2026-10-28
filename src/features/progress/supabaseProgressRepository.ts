import type { SupabaseClient } from '@supabase/supabase-js';

import { EMPTY_PROGRESS, MissionProgress, ProgressRepository, StudentProgress } from './types';

/**
 * Progreso en Supabase (tablas perfiles_estudiante y progreso_mision).
 *
 * Cuenta anónima: la primera vez se crea una sesión sin correo ni contraseña.
 * Solo viajan el apodo, el curso y los resultados; nunca datos personales.
 * El parámetro studentId se ignora: la identidad es la de la sesión.
 */
type PerfilFila = {
  id: string;
  alias: string | null;
  curso: string | null;
  xp_total: number;
  racha_actual: number;
  racha_mejor: number;
  ultimo_dia: string | null;
  logros: Record<string, string> | null;
};

type MisionFila = {
  estudiante_id: string;
  mision_id: string;
  completada: boolean;
  mejor_correctas: number;
  intentos: number;
};

const CURSOS = new Set(['7b', '8b', '1m', '2m', '3m', '4m']);

/** Devuelve el id del usuario, creando una sesión anónima si no hay una. */
export async function asegurarSesion(client: SupabaseClient): Promise<string> {
  const { data } = await client.auth.getSession();
  if (data.session?.user) return data.session.user.id;
  const { data: nueva, error } = await client.auth.signInAnonymously();
  if (error || !nueva.user) throw error ?? new Error('No se pudo iniciar sesión');
  return nueva.user.id;
}

export function filasAProgreso(perfil: PerfilFila | null, misiones: MisionFila[]): StudentProgress {
  if (!perfil) return EMPTY_PROGRESS;
  const p: StudentProgress = {
    xpTotal: perfil.xp_total,
    misiones: Object.fromEntries(
      misiones.map((m) => [
        m.mision_id,
        { completada: m.completada, mejorCorrectas: m.mejor_correctas, intentos: m.intentos } satisfies MissionProgress,
      ])
    ),
  };
  if (perfil.curso) p.curso = perfil.curso;
  if (perfil.alias) p.alias = perfil.alias;
  if (perfil.ultimo_dia) p.racha = { actual: perfil.racha_actual, mejor: perfil.racha_mejor, ultimoDia: perfil.ultimo_dia };
  if (perfil.logros && Object.keys(perfil.logros).length) p.logros = perfil.logros;
  return p;
}

export function progresoAFilas(id: string, p: StudentProgress): { perfil: PerfilFila; misiones: MisionFila[] } {
  return {
    perfil: {
      id,
      alias: p.alias ?? null,
      curso: p.curso && CURSOS.has(p.curso) ? p.curso : null,
      xp_total: p.xpTotal,
      racha_actual: p.racha?.actual ?? 0,
      racha_mejor: p.racha?.mejor ?? 0,
      ultimo_dia: p.racha?.ultimoDia ?? null,
      logros: p.logros ?? {},
    },
    misiones: Object.entries(p.misiones).map(([misionId, m]) => ({
      estudiante_id: id,
      mision_id: misionId,
      completada: m.completada,
      mejor_correctas: m.mejorCorrectas,
      intentos: m.intentos,
    })),
  };
}

export function crearSupabaseProgressRepository(client: SupabaseClient): ProgressRepository {
  return {
    async load() {
      const id = await asegurarSesion(client);
      const perfil = await client.from('perfiles_estudiante').select('*').eq('id', id).maybeSingle();
      if (perfil.error) throw perfil.error;
      const misiones = await client.from('progreso_mision').select('*').eq('estudiante_id', id);
      if (misiones.error) throw misiones.error;
      return filasAProgreso(perfil.data as PerfilFila | null, (misiones.data ?? []) as MisionFila[]);
    },
    async save(_studentId, progress) {
      const id = await asegurarSesion(client);
      const { perfil, misiones } = progresoAFilas(id, progress);
      const r1 = await client
        .from('perfiles_estudiante')
        .upsert({ ...perfil, actualizado_en: new Date().toISOString() });
      if (r1.error) throw r1.error;
      if (misiones.length) {
        const r2 = await client.from('progreso_mision').upsert(misiones, { onConflict: 'estudiante_id,mision_id' });
        if (r2.error) throw r2.error;
      }
    },
  };
}
