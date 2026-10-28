import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';
import { AppState, Platform } from 'react-native';

/**
 * Cliente de Supabase de KUBI.
 *
 * La URL y la clave publicable vienen de app.json (expo.extra.supabase). Esa clave
 * es pública por diseño: la seguridad la dan las políticas por fila. Las variables
 * EXPO_PUBLIC_SUPABASE_URL y EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY, si existen,
 * tienen prioridad (por ejemplo, para apuntar a otro proyecto).
 * En las pruebas queda en null y la app funciona solo con el teléfono.
 */
type ConfigSupabase = { url?: string; publishableKey?: string };
const extra = (Constants.expoConfig?.extra?.supabase ?? {}) as ConfigSupabase;
const enPruebas = process.env.JEST_WORKER_ID !== undefined;

const url = enPruebas ? undefined : (process.env.EXPO_PUBLIC_SUPABASE_URL ?? extra.url);
const key = enPruebas ? undefined : (process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? extra.publishableKey);

export const supabase: SupabaseClient | null =
  url && key
    ? createClient(url, key, {
        auth: {
          storage: AsyncStorage,
          autoRefreshToken: true,
          persistSession: true,
          // En iOS y Android no hay una URL desde la que leer la sesión.
          detectSessionInUrl: false,
        },
      })
    : null;

// El refresco del token solo corre mientras la app está en primer plano.
if (supabase && Platform.OS !== 'web') {
  AppState.addEventListener('change', (state) => {
    if (state === 'active') supabase.auth.startAutoRefresh();
    else supabase.auth.stopAutoRefresh();
  });
}
