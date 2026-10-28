import { supabase } from '@/lib/supabase';

import { crearLlamadorSupabase, crearTutorIA } from './tutorIA';

/** Tutor de la app: con IA si Supabase está configurado; si no, solo local. */
export const tutorIA = crearTutorIA(supabase ? crearLlamadorSupabase(supabase) : null);
