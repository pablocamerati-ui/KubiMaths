import AsyncStorage from '@react-native-async-storage/async-storage';
import { act, fireEvent, renderRouter, screen } from 'expo-router/testing-library';

import * as banco from '@/features/missions/banco';
import { misionEnteros7b as m } from '@/features/missions/data/enteros7b';
import { Mission } from '@/features/missions/types';

// Tutor con IA falsa (sin red): responde según el tipo de pedido.
jest.mock('@/features/tutor/tutor', () => {
  const { crearTutorIA } = jest.requireActual('@/features/tutor/tutorIA');
  return {
    tutorIA: crearTutorIA(async (p: { tipo: string }) =>
      p.tipo === 'pista' ? { texto: 'Mira bien los signos.' } : { texto: 'Confundiste sumar con restar.' }
    ),
  };
});

const APP_DIR = './src/app';
const wrongOf = (c: string) => (c === 'a' ? 'b' : 'a');

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

test('pista con IA antes de responder y explicación con otras palabras después de fallar', async () => {
  await renderRouter(APP_DIR, { initialUrl: '/desafio/enteros-7b' });
  await screen.findByText(/PREGUNTA 1 DE 8/);
  await tap('boton-pista');
  expect(await screen.findByText('Mira bien los signos.')).toBeTruthy();
  expect(screen.queryByTestId('boton-pista')).toBeNull();

  await tap(`opcion-${wrongOf(m.preguntas[0].correcta)}`);
  await screen.findByTestId('panel-retroalimentacion');
  // Tras responder, la pista se esconde.
  expect(screen.queryByTestId('tarjeta-pista')).toBeNull();
  await tap('boton-explicar');
  expect(await screen.findByText('Confundiste sumar con restar.')).toBeTruthy();

  // En la pregunta siguiente se puede pedir pista otra vez.
  await tap('boton-continuar');
  await screen.findByText(/PREGUNTA 2 DE 8/);
  expect(screen.getByTestId('boton-pista')).toBeTruthy();

  // Si acierta, no se ofrece explicación.
  await tap(`opcion-${m.preguntas[1].correcta}`);
  await screen.findByTestId('panel-retroalimentacion');
  expect(screen.queryByTestId('boton-explicar')).toBeNull();
});
