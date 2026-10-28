import type { SupabaseClient } from '@supabase/supabase-js';

import {
  crearSupabaseProgressRepository,
  filasAProgreso,
  progresoAFilas,
} from '@/features/progress/supabaseProgressRepository';
import { crearSyncProgressRepository, unirProgreso } from '@/features/progress/syncProgressRepository';
import { EMPTY_PROGRESS, ProgressRepository, StudentProgress } from '@/features/progress/types';

const completo: StudentProgress = {
  xpTotal: 230,
  curso: '8b',
  alias: 'Cometa_7',
  racha: { actual: 2, mejor: 5, ultimoDia: '2026-10-28' },
  logros: { 'primera-mision': '2026-10-20' },
  misiones: {
    'enteros-7b': { completada: true, mejorCorrectas: 8, intentos: 3 },
    'practica-paes': { completada: true, mejorCorrectas: 11, intentos: 1 },
  },
};

describe('unir progreso de teléfono y nube', () => {
  test('se queda con lo mejor de cada lado', () => {
    const telefono: StudentProgress = {
      xpTotal: 100,
      misiones: {
        a: { completada: false, mejorCorrectas: 6, intentos: 4 },
        b: { completada: true, mejorCorrectas: 7, intentos: 1 },
      },
      racha: { actual: 1, mejor: 2, ultimoDia: '2026-10-28' },
      logros: { x: '2026-10-28' },
      alias: 'Local',
    };
    const nube: StudentProgress = {
      xpTotal: 150,
      misiones: {
        a: { completada: true, mejorCorrectas: 5, intentos: 2 },
        c: { completada: false, mejorCorrectas: 3, intentos: 1 },
      },
      racha: { actual: 4, mejor: 6, ultimoDia: '2026-10-26' },
      logros: { x: '2026-10-25', y: '2026-10-26' },
      alias: 'Nube',
      curso: '1m',
    };
    expect(unirProgreso(telefono, nube)).toEqual({
      xpTotal: 150,
      misiones: {
        a: { completada: true, mejorCorrectas: 6, intentos: 4 },
        b: { completada: true, mejorCorrectas: 7, intentos: 1 },
        c: { completada: false, mejorCorrectas: 3, intentos: 1 },
      },
      racha: { actual: 1, mejor: 6, ultimoDia: '2026-10-28' },
      logros: { x: '2026-10-25', y: '2026-10-26' },
      alias: 'Local',
      curso: '1m',
    });
  });

  test('unir con vacío no cambia nada y es simétrico en lo esencial', () => {
    expect(unirProgreso(completo, EMPTY_PROGRESS)).toEqual(completo);
    expect(unirProgreso(EMPTY_PROGRESS, completo)).toEqual(completo);
  });
});

describe('filas de Supabase', () => {
  test('ida y vuelta sin perder datos', () => {
    const { perfil, misiones } = progresoAFilas('u1', completo);
    expect(perfil).toMatchObject({ id: 'u1', alias: 'Cometa_7', curso: '8b', xp_total: 230, racha_mejor: 5, ultimo_dia: '2026-10-28' });
    expect(misiones).toHaveLength(2);
    expect(filasAProgreso(perfil, misiones)).toEqual(completo);
  });

  test('sin perfil en la nube es progreso vacío; un curso desconocido no se envía', () => {
    expect(filasAProgreso(null, [])).toEqual(EMPTY_PROGRESS);
    expect(progresoAFilas('u1', { ...EMPTY_PROGRESS, curso: 'zz' }).perfil.curso).toBeNull();
  });
});

/** Cliente falso que imita lo justo de supabase-js. */
function clienteFalso() {
  const tablas: Record<string, Record<string, unknown>[]> = { perfiles_estudiante: [], progreso_mision: [] };
  let usuario: string | null = null;
  const anonimos = jest.fn(async () => {
    usuario = 'anon-1';
    return { data: { user: { id: usuario } }, error: null };
  });
  const client = {
    auth: {
      getSession: async () => ({ data: { session: usuario ? { user: { id: usuario } } : null } }),
      signInAnonymously: anonimos,
    },
    from: (tabla: string) => {
      const filtro: Record<string, unknown> = {};
      const q = {
        select: () => q,
        eq: (col: string, val: unknown) => {
          filtro[col] = val;
          return q;
        },
        maybeSingle: async () => ({ data: tablas[tabla].find((f) => Object.entries(filtro).every(([k, v]) => f[k] === v)) ?? null, error: null }),
        then: (res: (v: unknown) => void) =>
          res({ data: tablas[tabla].filter((f) => Object.entries(filtro).every(([k, v]) => f[k] === v)), error: null }),
        upsert: async (filas: Record<string, unknown> | Record<string, unknown>[]) => {
          for (const fila of Array.isArray(filas) ? filas : [filas]) {
            const llave = tabla === 'perfiles_estudiante' ? ['id'] : ['estudiante_id', 'mision_id'];
            const i = tablas[tabla].findIndex((f) => llave.every((k) => f[k] === fila[k]));
            if (i >= 0) tablas[tabla][i] = fila;
            else tablas[tabla].push(fila);
          }
          return { error: null };
        },
      };
      return q;
    },
  };
  return { client: client as unknown as SupabaseClient, tablas, anonimos };
}

describe('repositorio Supabase', () => {
  test('crea una sesión anónima una sola vez, guarda y vuelve a leer', async () => {
    const { client, tablas, anonimos } = clienteFalso();
    const repo = crearSupabaseProgressRepository(client);
    expect(await repo.load('local')).toEqual(EMPTY_PROGRESS);
    await repo.save('local', completo);
    expect(anonimos).toHaveBeenCalledTimes(1);
    expect(tablas.perfiles_estudiante[0]).toMatchObject({ id: 'anon-1', alias: 'Cometa_7' });
    expect(tablas.perfiles_estudiante[0]).not.toHaveProperty('nombre');
    expect(tablas.progreso_mision).toHaveLength(2);
    expect(await repo.load('local')).toEqual(completo);
  });
});

describe('teléfono + nube', () => {
  const memoria = (inicial: StudentProgress = EMPTY_PROGRESS): ProgressRepository & { dato: StudentProgress } => {
    const r = {
      dato: inicial,
      load: async () => r.dato,
      save: async (_: string, p: StudentProgress) => {
        r.dato = p;
      },
    };
    return r;
  };

  test('cargar no espera a la nube; sincronizar une y guarda en ambos', async () => {
    const local = memoria({ ...EMPTY_PROGRESS, xpTotal: 10 });
    const nube = memoria({ ...EMPTY_PROGRESS, xpTotal: 50, alias: 'Nube' });
    const repo = crearSyncProgressRepository(local, nube);
    expect((await repo.load('local')).xpTotal).toBe(10);
    const unido = await repo.sincronizar!('local', await repo.load('local'));
    expect(unido).toMatchObject({ xpTotal: 50, alias: 'Nube' });
    expect(local.dato).toEqual(unido);
    await new Promise((r) => setTimeout(r, 0));
    expect(nube.dato).toEqual(unido);
  });

  test('sin conexión: guarda en el teléfono y avisa el error de la nube sin romper', async () => {
    const local = memoria();
    const alFallar = jest.fn();
    const nube: ProgressRepository = {
      load: () => Promise.reject(new Error('sin red')),
      save: () => Promise.reject(new Error('sin red')),
    };
    const repo = crearSyncProgressRepository(local, nube, { alFallar });
    await repo.save('local', completo);
    expect(local.dato).toEqual(completo);
    await expect(repo.sincronizar!('local', completo)).rejects.toThrow('sin red');
    await new Promise((r) => setTimeout(r, 0));
    expect(alFallar).toHaveBeenCalled();
  });

  test('los envíos a la nube llegan en orden', async () => {
    const llegadas: number[] = [];
    const nube: ProgressRepository = {
      load: async () => EMPTY_PROGRESS,
      save: (_, p) => new Promise((r) => setTimeout(() => {
        llegadas.push(p.xpTotal);
        r();
      }, p.xpTotal === 1 ? 30 : 1)),
    };
    const repo = crearSyncProgressRepository(memoria(), nube);
    await repo.save('local', { ...EMPTY_PROGRESS, xpTotal: 1 });
    await repo.save('local', { ...EMPTY_PROGRESS, xpTotal: 2 });
    await new Promise((r) => setTimeout(r, 60));
    expect(llegadas).toEqual([1, 2]);
  });
});
