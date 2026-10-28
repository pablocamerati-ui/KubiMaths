import { supabase } from '@/lib/supabase';

import { localProgressRepository } from './localProgressRepository';
import { crearSupabaseProgressRepository } from './supabaseProgressRepository';
import { crearSyncProgressRepository } from './syncProgressRepository';
import { ProgressRepository } from './types';

/** Con Supabase configurado: teléfono + nube. Sin configurar (o en pruebas): solo teléfono. */
export const progressRepository: ProgressRepository = supabase
  ? crearSyncProgressRepository(localProgressRepository, crearSupabaseProgressRepository(supabase), {
      alFallar: (e) => {
        if (__DEV__) console.info('[KUBI] Sin sincronizar con la nube:', e instanceof Error ? e.message : e);
      },
    })
  : localProgressRepository;
