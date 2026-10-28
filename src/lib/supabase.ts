import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AppState, Platform } from 'react-native';

/**
 * Cliente de Supabase de KUBI.
 * Si faltan las variables de entorno (por ejemplo, en las pruebas), queda en null
 * y la app funciona solo con el progreso guardado en el teléfono.
 */
const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const key = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

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
