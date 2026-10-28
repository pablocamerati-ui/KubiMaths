import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSyncExternalStore } from 'react';

/** Ajustes del teléfono (no viajan a la nube). */
export type Ajustes = { sonido: boolean };

const CLAVE = 'kubi:ajustes';
const POR_DEFECTO: Ajustes = { sonido: true };

let actuales: Ajustes = POR_DEFECTO;
const oyentes = new Set<() => void>();

const avisar = () => oyentes.forEach((o) => o());

/** Lee los ajustes guardados (se llama al iniciar la app). */
export async function cargarAjustes(): Promise<Ajustes> {
  try {
    const raw = await AsyncStorage.getItem(CLAVE);
    const p = raw ? (JSON.parse(raw) as Partial<Ajustes>) : {};
    actuales = { sonido: typeof p.sonido === 'boolean' ? p.sonido : POR_DEFECTO.sonido };
  } catch {
    actuales = POR_DEFECTO;
  }
  avisar();
  return actuales;
}

export function leerAjustes(): Ajustes {
  return actuales;
}

export function cambiarAjustes(cambio: Partial<Ajustes>) {
  actuales = { ...actuales, ...cambio };
  avisar();
  AsyncStorage.setItem(CLAVE, JSON.stringify(actuales)).catch(() => undefined);
}

export function useAjustes(): Ajustes {
  return useSyncExternalStore(
    (o) => {
      oyentes.add(o);
      return () => oyentes.delete(o);
    },
    () => actuales,
    () => actuales
  );
}

/** Solo para pruebas. */
export function _reiniciarAjustes() {
  actuales = POR_DEFECTO;
  avisar();
}
