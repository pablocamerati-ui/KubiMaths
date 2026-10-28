import { useEffect } from 'react';
import { AudioPlayer, createAudioPlayer, setAudioModeAsync } from 'expo-audio';

import { leerAjustes } from '../ajustes/ajustes';

/**
 * Sonidos breves de KUBI (generados con scripts/render-sounds.mjs).
 * Respetan el ajuste «Sonidos» y el modo silencio del iPhone, y se mezclan
 * con la música que el estudiante tenga sonando.
 */
const FUENTES = {
  acierto: require('../../../assets/sonidos/acierto.wav'),
  error: require('../../../assets/sonidos/error.wav'),
  celebracion: require('../../../assets/sonidos/celebracion.wav'),
  logro: require('../../../assets/sonidos/logro.wav'),
  toque: require('../../../assets/sonidos/toque.wav'),
} as const;

export type Sonido = keyof typeof FUENTES;

const reproductores: Partial<Record<Sonido, AudioPlayer>> = {};
let modoListo = false;

function reproductor(nombre: Sonido): AudioPlayer {
  if (!reproductores[nombre]) {
    const p = createAudioPlayer(FUENTES[nombre]);
    p.volume = nombre === 'toque' ? 0.5 : 0.8;
    reproductores[nombre] = p;
  }
  return reproductores[nombre]!;
}

export function reproducir(nombre: Sonido) {
  if (!leerAjustes().sonido) return;
  try {
    if (!modoListo) {
      modoListo = true;
      setAudioModeAsync({ playsInSilentMode: false, interruptionMode: 'mixWithOthers' }).catch(() => undefined);
    }
    const p = reproductor(nombre);
    p.seekTo(0).catch(() => undefined);
    p.play();
  } catch {
    // Un sonido nunca debe interrumpir el juego.
  }
}

/** Reproduce un sonido al aparecer una pantalla y, si corresponde, el de logro un poco después. */
export function useSonidoDeEntrada(nombre: Sonido | null, conLogro = false) {
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    if (nombre) timers.push(setTimeout(() => reproducir(nombre), 250));
    if (conLogro) timers.push(setTimeout(() => reproducir('logro'), nombre ? 1100 : 300));
    return () => timers.forEach(clearTimeout);
    // Solo al entrar a la pantalla.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/** Solo para pruebas: olvida los reproductores creados. */
export function _reiniciarSonidos() {
  for (const k of Object.keys(reproductores) as Sonido[]) delete reproductores[k];
}
