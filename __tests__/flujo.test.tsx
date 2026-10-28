import AsyncStorage from '@react-native-async-storage/async-storage';
import { act, fireEvent, renderRouter, screen } from 'expo-router/testing-library';

import * as banco from '@/features/missions/banco';
import { misionEnteros7b } from '@/features/missions/data/enteros7b';
import { misionEnteros8b } from '@/features/missions/data/enteros8b';
import { Mission } from '@/features/missions/types';
import { crearPractica } from '@/features/practice/practica';

// Cada intento sortea sus preguntas con Date.now() como semilla: la fijamos
// para saber qué preguntas aparecen.
const SEMILLA = 777;
const m = banco.prepararIntento(misionEnteros7b, SEMILLA);
const m8 = banco.prepararIntento(misionEnteros8b, SEMILLA);

const APP_DIR = './src/app';
const wrongOf = (c: string) => (c === 'a' ? 'b' : 'a');

async function tap(testID: string) {
  await act(async () => {
    fireEvent.press(await screen.findByTestId(testID));
  });
}

async function answer(option: string) {
  await tap(`opcion-${option}`);
  await screen.findByTestId('panel-retroalimentacion');
  await tap('boton-continuar');
}

beforeEach(async () => {
  await AsyncStorage.clear();
  jest.spyOn(Date, 'now').mockReturnValue(SEMILLA);
});

afterEach(() => {
  jest.restoreAllMocks();
});

/** Juega con las 8 preguntas escritas a mano, en orden (para revisar textos exactos). */
function usarPreguntasFijas() {
  jest.spyOn(banco, 'prepararIntento').mockImplementation((mision: Mission) => mision);
}

describe('Navegación y primera misión jugable', () => {
  test('bienvenida → mapa → desafío completo → recompensas → mapa actualizado', async () => {
    await renderRouter(APP_DIR, { initialUrl: '/' });
    expect(screen).toHavePathname('/');
    expect(await screen.findByText('KUBI')).toBeTruthy();
    expect(screen.getByText('¡Vamos a jugar!')).toBeTruthy();

    await tap('boton-jugar');
    expect(screen).toHavePathname('/mapa');
    expect(await screen.findByText('Mapa de aventuras')).toBeTruthy();
    expect(screen.getByLabelText('Misión 1: Números enteros. Disponible')).toBeTruthy();
    expect(screen.getByLabelText('Misión 2: Fracciones y decimales. Bloqueada')).toBeTruthy();
    expect(screen.getByLabelText('0 puntos de experiencia')).toBeTruthy();

    await tap('nivel-n1');
    expect(screen).toHavePathname('/desafio/enteros-7b');
    expect(await screen.findByText(/PREGUNTA 1 DE 8/)).toBeTruthy();
    expect(screen.getByLabelText('3 de 3 corazones')).toBeTruthy();

    // Pregunta 1 mal (pierde un corazón y explica), el resto bien.
    await tap(`opcion-${wrongOf(m.preguntas[0].correcta)}`);
    expect(await screen.findByText(/^¡Casi!/)).toBeTruthy();
    expect(screen.getByLabelText('2 de 3 corazones')).toBeTruthy();
    await tap('boton-continuar');

    for (let i = 1; i < m.preguntas.length; i++) {
      expect(await screen.findByText(new RegExp(`PREGUNTA ${i + 1} DE 8`))).toBeTruthy();
      await answer(m.preguntas[i].correcta);
    }

    expect(screen).toHavePathname('/recompensas');
    expect(await screen.findByText('¡Misión cumplida!')).toBeTruthy();
    expect(screen.getByLabelText('XP ganado: +90')).toBeTruthy();
    expect(screen.getByLabelText('Correctas: 7/8')).toBeTruthy();

    await tap('boton-continuar-mapa');
    expect(screen).toHavePathname('/mapa');
    expect(await screen.findByLabelText('Misión 1: Números enteros. Completada')).toBeTruthy();
    expect(screen.getByLabelText('Misión 2: Fracciones y decimales. Disponible')).toBeTruthy();
    expect(screen.getByLabelText('Misión 3: Porcentajes. Bloqueada')).toBeTruthy();
    expect(screen.getByLabelText('90 puntos de experiencia')).toBeTruthy();

    // El progreso queda guardado en el dispositivo.
    const saved = JSON.parse((await AsyncStorage.getItem('kubi:progreso:local'))!);
    expect(saved.xpTotal).toBe(90);
    expect(saved.misiones['enteros-7b']).toMatchObject({ completada: true, mejorCorrectas: 7, intentos: 1 });
  });

  test('sin corazones: resultados sin completar y reintentar vuelve a la pregunta 1', async () => {
    await renderRouter(APP_DIR, { initialUrl: '/desafio/enteros-7b' });
    for (let i = 0; i < 3; i++) {
      await screen.findByText(new RegExp(`PREGUNTA ${i + 1} DE 8`));
      await answer(wrongOf(m.preguntas[i].correcta));
    }
    expect(screen).toHavePathname('/recompensas');
    expect(await screen.findByText('¡Casi lo logras!')).toBeTruthy();
    expect(screen.getByLabelText('Correctas: 0/8')).toBeTruthy();

    await tap('boton-reintentar');
    expect(screen).toHavePathname('/desafio/enteros-7b');
    expect(await screen.findByText(/PREGUNTA 1 DE 8/)).toBeTruthy();
    expect(screen.getByLabelText('3 de 3 corazones')).toBeTruthy();
  });

  test('misiones nuevas muestran fracciones y montos en formato chileno', async () => {
    usarPreguntasFijas();
    await renderRouter(APP_DIR, { initialUrl: '/desafio/fracciones-7b' });
    expect(await screen.findByText(/PREGUNTA 1 DE 8/)).toBeTruthy();
    expect(screen.getByLabelText('Alternativa A: 6/8')).toBeTruthy();
    await answer('a');
    expect(await screen.findByText('0,4')).toBeTruthy();

    await renderRouter(APP_DIR, { initialUrl: '/desafio/geometria-7b' });
    await screen.findByText(/PREGUNTA 1 DE 8/);
    await tap('opcion-b');
    // Tras responder, el enunciado sigue visible aunque KUBI cambie su mensaje.
    expect(await screen.findByTestId('enunciado-respondido')).toBeTruthy();
    expect(screen.getByText(/8 cm de largo y 5 cm de ancho/)).toBeTruthy();

    await renderRouter(APP_DIR, { initialUrl: '/desafio/porcentajes-7b' });
    expect(await screen.findByText(/PREGUNTA 1 DE 8/)).toBeTruthy();
    expect(screen.getByLabelText('Alternativa A: 20')).toBeTruthy();
  });

  test('el selector cambia al mapa de 8.º básico y lo recuerda', async () => {
    await renderRouter(APP_DIR, { initialUrl: '/mapa' });
    expect(await screen.findByLabelText('Misión 1: Números enteros. Disponible')).toBeTruthy();

    await tap('curso-8b');
    expect(await screen.findByText('Potencias, funciones y Pitágoras')).toBeTruthy();
    expect(screen.getByLabelText('Misión 1: Multiplicación y división de enteros. Disponible')).toBeTruthy();
    expect(screen.getByLabelText('Misión 2: Potencias y raíces. Bloqueada')).toBeTruthy();

    await tap('nivel-8b-n1');
    expect(screen).toHavePathname('/desafio/enteros-8b');
    for (let i = 0; i < 8; i++) {
      await screen.findByText(new RegExp(`PREGUNTA ${i + 1} DE 8`));
      await answer(m8.preguntas[i].correcta);
    }
    expect(await screen.findByText('¡Misión cumplida!')).toBeTruthy();
    expect(screen.getByLabelText('XP ganado: +100')).toBeTruthy();

    await tap('boton-continuar-mapa');
    expect(await screen.findByLabelText('Misión 1: Multiplicación y división de enteros. Completada')).toBeTruthy();
    expect(screen.getByLabelText('Misión 2: Potencias y raíces. Disponible')).toBeTruthy();

    const saved = JSON.parse((await AsyncStorage.getItem('kubi:progreso:local'))!);
    expect(saved.curso).toBe('8b');

    await tap('curso-1m');
    expect(await screen.findByText('Álgebra, semejanza y probabilidad')).toBeTruthy();
    expect(screen.getByLabelText('Misión 1: Números racionales. Disponible')).toBeTruthy();
    expect(screen.getByLabelText('Misión 6: Probabilidades. Bloqueada')).toBeTruthy();

    await tap('curso-2m');
    expect(await screen.findByText('Raíces, logaritmos y cuadráticas')).toBeTruthy();
    expect(screen.getByLabelText('Misión 1: Raíces y números reales. Disponible')).toBeTruthy();
    expect(screen.getByLabelText('Misión 5: Trigonometría. Bloqueada')).toBeTruthy();
  });

  test('práctica PAES: 15 preguntas sin corazones y resultados por eje', async () => {
    const semilla = 4242;
    jest.spyOn(Date, 'now').mockReturnValue(semilla);
    const practica = crearPractica(semilla);

    await renderRouter(APP_DIR, { initialUrl: '/mapa' });
    await tap('boton-practica');
    expect(screen).toHavePathname('/desafio/practica-paes');
    expect(await screen.findByText(/PREGUNTA 1 DE 15/)).toBeTruthy();
    expect(screen.queryByLabelText(/corazones/)).toBeNull();

    // Las primeras 5 incorrectas, el resto correctas: los errores no terminan la práctica.
    for (let i = 0; i < 15; i++) {
      await screen.findByText(new RegExp(`PREGUNTA ${i + 1} DE 15`));
      const q = practica.mision.preguntas[i];
      await answer(i < 5 ? wrongOf(q.correcta) : q.correcta);
    }

    expect(screen).toHavePathname('/recompensas');
    expect(await screen.findByText('¡Práctica terminada!')).toBeTruthy();
    expect(screen.getByLabelText('Correctas: 10/15')).toBeTruthy();
    expect(screen.getByLabelText('Logro: 67 %')).toBeTruthy();
    for (const e of ['numeros', 'algebra', 'geometria', 'probabilidad']) {
      expect(screen.getByTestId(`eje-${e}`)).toBeTruthy();
    }
    expect(screen.getByText(/No es un ensayo oficial/)).toBeTruthy();

    await tap('boton-otra-practica');
    expect(screen).toHavePathname('/desafio/practica-paes');
    expect(await screen.findByText(/PREGUNTA 1 DE 15/)).toBeTruthy();
  });

  test('cada intento de una misión trae otras preguntas', async () => {
    const firma = (x: Mission) => x.preguntas.map((q) => `${q.enunciado}|${q.expresion ?? ''}`).join('#');
    const intento1 = banco.prepararIntento(misionEnteros7b, 1);
    const intento2 = banco.prepararIntento(misionEnteros7b, 2);
    expect(firma(intento1)).not.toBe(firma(intento2));

    jest.spyOn(Date, 'now').mockReturnValue(1);
    await renderRouter(APP_DIR, { initialUrl: '/desafio/enteros-7b' });
    for (let i = 0; i < 3; i++) {
      await screen.findByText(new RegExp(`PREGUNTA ${i + 1} DE 8`));
      await answer(wrongOf(intento1.preguntas[i].correcta));
    }
    expect(await screen.findByText('¡Casi lo logras!')).toBeTruthy();

    // Al reintentar se sortea un nuevo grupo de 8 preguntas.
    jest.spyOn(Date, 'now').mockReturnValue(2);
    await tap('boton-reintentar');
    await screen.findByText(/PREGUNTA 1 DE 8/);
    for (let i = 0; i < 8; i++) {
      await screen.findByText(new RegExp(`PREGUNTA ${i + 1} DE 8`));
      await answer(intento2.preguntas[i].correcta);
    }
    expect(await screen.findByText('¡Misión cumplida!')).toBeTruthy();
    expect(screen.getByLabelText('Correctas: 8/8')).toBeTruthy();
  });

  test('misión inexistente muestra un mensaje y permite volver', async () => {
    await renderRouter(APP_DIR, { initialUrl: '/desafio/no-existe' });
    expect(await screen.findByText('No encontré esta misión.')).toBeTruthy();
  });
});
