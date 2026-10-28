import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAudioPlayer } from 'expo-audio';
import { act, fireEvent, renderRouter, screen, waitFor } from 'expo-router/testing-library';

import { _reiniciarAjustes, cambiarAjustes, cargarAjustes, leerAjustes } from '@/features/ajustes/ajustes';
import * as banco from '@/features/missions/banco';
import { misionEnteros7b as m } from '@/features/missions/data/enteros7b';
import { Mission } from '@/features/missions/types';
import * as sonidos from '@/features/sonido/sonidos';

const APP_DIR = './src/app';

async function tap(testID: string) {
  await act(async () => {
    fireEvent.press(await screen.findByTestId(testID));
  });
}

beforeEach(async () => {
  await AsyncStorage.clear();
  _reiniciarAjustes();
  sonidos._reiniciarSonidos();
  jest.clearAllMocks();
});
afterEach(() => jest.restoreAllMocks());

describe('ajustes y sonidos', () => {
  test('el sonido parte activado, se puede apagar y se recuerda', async () => {
    expect(leerAjustes().sonido).toBe(true);
    cambiarAjustes({ sonido: false });
    await new Promise((r) => setTimeout(r, 0));
    expect(JSON.parse((await AsyncStorage.getItem('kubi:ajustes'))!)).toEqual({ sonido: false });
    _reiniciarAjustes();
    expect((await cargarAjustes()).sonido).toBe(false);
  });

  test('con el sonido apagado no se reproduce nada', () => {
    cambiarAjustes({ sonido: false });
    sonidos.reproducir('acierto');
    expect(createAudioPlayer).not.toHaveBeenCalled();
    cambiarAjustes({ sonido: true });
    sonidos.reproducir('acierto');
    expect(createAudioPlayer).toHaveBeenCalledTimes(1);
    // El reproductor se reutiliza.
    sonidos.reproducir('acierto');
    expect(createAudioPlayer).toHaveBeenCalledTimes(1);
  });
});

describe('sonidos en el juego', () => {
  beforeEach(() => {
    jest.spyOn(banco, 'prepararIntento').mockImplementation((x: Mission) => x);
  });

  test('suena acierto o error al responder, y celebración al cumplir la misión', async () => {
    const espia = jest.spyOn(sonidos, 'reproducir');
    try {
      await renderRouter(APP_DIR, { initialUrl: '/desafio/enteros-7b' });
      await screen.findByText(/PREGUNTA 1 DE 8/);
      await tap(`opcion-${m.preguntas[0].correcta === 'a' ? 'b' : 'a'}`);
      expect(espia).toHaveBeenLastCalledWith('error');
      await tap('boton-continuar');
      for (let i = 1; i < 8; i++) {
        await screen.findByText(new RegExp(`PREGUNTA ${i + 1} DE 8`));
        await tap(`opcion-${m.preguntas[i].correcta}`);
        expect(espia).toHaveBeenLastCalledWith('acierto');
        await tap('boton-continuar');
      }
      await screen.findByText('¡Misión cumplida!');
      // Al entrar a recompensas suenan la celebración y el logro nuevo (primera misión):
      // se crean sus reproductores, además de los de acierto y error.
      await waitFor(() => expect(createAudioPlayer).toHaveBeenCalledTimes(4), { timeout: 4000 });
    } finally {
      espia.mockRestore();
    }
  });

  test('el interruptor del perfil apaga los sonidos', async () => {
    await renderRouter(APP_DIR, { initialUrl: '/perfil' });
    const sw = await screen.findByTestId('switch-sonido');
    expect(sw.props.value).toBe(true);
    await act(async () => {
      fireEvent(sw, 'valueChange', false);
    });
    expect(leerAjustes().sonido).toBe(false);
    expect(screen.getByTestId('switch-sonido').props.value).toBe(false);
  });
});
