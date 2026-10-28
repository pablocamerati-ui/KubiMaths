import AsyncStorage from '@react-native-async-storage/async-storage';
import { act, fireEvent, renderRouter, screen } from 'expo-router/testing-library';

import * as banco from '@/features/missions/banco';
import { misionEnteros7b as m } from '@/features/missions/data/enteros7b';
import { Mission } from '@/features/missions/types';

const APP_DIR = './src/app';

async function tap(testID: string) {
  await act(async () => {
    fireEvent.press(await screen.findByTestId(testID));
  });
}

beforeEach(async () => {
  await AsyncStorage.clear();
  jest.spyOn(banco, 'prepararIntento').mockImplementation((x: Mission) => x);
});
afterEach(() => jest.restoreAllMocks());

test('sin Supabase: la pista es la local y no se ofrece la explicación con IA', async () => {
  await renderRouter(APP_DIR, { initialUrl: '/desafio/enteros-7b' });
  await screen.findByText(/PREGUNTA 1 DE 8/);
  await tap('boton-pista');
  expect(await screen.findByText(m.preguntas[0].pista)).toBeTruthy();
  await tap(`opcion-${m.preguntas[0].correcta === 'a' ? 'b' : 'a'}`);
  await screen.findByTestId('panel-retroalimentacion');
  expect(screen.queryByTestId('boton-explicar')).toBeNull();
});
