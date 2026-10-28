import AsyncStorage from '@react-native-async-storage/async-storage';
import { act, fireEvent, renderRouter, screen } from 'expo-router/testing-library';

import * as banco from '@/features/missions/banco';
import { misionEnteros7b } from '@/features/missions/data/enteros7b';
import { MissionResult } from '@/features/missions/engine';
import { Mission } from '@/features/missions/types';
import { PRACTICA_ID } from '@/features/practice/practica';
import {
  actualizarRacha,
  diaLocal,
  evaluarLogros,
  LOGROS,
  rachaVigente,
  registrarIntento,
  validarAlias,
} from '@/features/progress/logros';
import { localProgressRepository } from '@/features/progress/localProgressRepository';
import { EMPTY_PROGRESS, StudentProgress } from '@/features/progress/types';
import { COURSES } from '@/features/missions/catalog';

const APP_DIR = './src/app';
const dia = (y: number, m: number, d: number, h = 12) => new Date(y, m - 1, d, h);
const resultado = (over: Partial<MissionResult> = {}): MissionResult => ({
  missionId: 'enteros-7b',
  correctas: 6,
  total: 8,
  corazones: 1,
  xp: 80,
  completada: true,
  ...over,
});

describe('racha diaria', () => {
  test('el día se calcula en hora local', () => {
    expect(diaLocal(dia(2026, 1, 5, 0))).toBe('2026-01-05');
    expect(diaLocal(dia(2026, 12, 31, 23))).toBe('2026-12-31');
  });

  test('crece con días seguidos, se mantiene el mismo día y se corta al saltar un día', () => {
    let r = actualizarRacha(undefined, '2026-10-26');
    expect(r).toEqual({ actual: 1, mejor: 1, ultimoDia: '2026-10-26' });
    r = actualizarRacha(r, '2026-10-26');
    expect(r.actual).toBe(1);
    r = actualizarRacha(r, '2026-10-27');
    r = actualizarRacha(r, '2026-10-28');
    expect(r).toEqual({ actual: 3, mejor: 3, ultimoDia: '2026-10-28' });
    r = actualizarRacha(r, '2026-10-30');
    expect(r).toEqual({ actual: 1, mejor: 3, ultimoDia: '2026-10-30' });
  });

  test('cruza fin de mes y de año', () => {
    expect(actualizarRacha({ actual: 4, mejor: 4, ultimoDia: '2026-02-28' }, '2026-03-01').actual).toBe(5);
    expect(actualizarRacha({ actual: 2, mejor: 9, ultimoDia: '2026-12-31' }, '2027-01-01')).toEqual({
      actual: 3,
      mejor: 9,
      ultimoDia: '2027-01-01',
    });
  });

  test('la racha visible es 0 si no jugó hoy ni ayer', () => {
    const r = { actual: 5, mejor: 5, ultimoDia: '2026-10-26' };
    expect(rachaVigente(r, '2026-10-26')).toBe(5);
    expect(rachaVigente(r, '2026-10-27')).toBe(5);
    expect(rachaVigente(r, '2026-10-28')).toBe(0);
    expect(rachaVigente(undefined, '2026-10-28')).toBe(0);
  });
});

describe('logros', () => {
  test('primera misión, misión perfecta y que no se repiten', () => {
    const a = registrarIntento(EMPTY_PROGRESS, resultado({ completada: false, correctas: 2 }), dia(2026, 10, 1));
    expect(a.nuevos).toEqual([]);
    const b = registrarIntento(a.progreso, resultado(), dia(2026, 10, 1));
    expect(b.nuevos).toEqual(['primera-mision']);
    expect(b.progreso.logros).toEqual({ 'primera-mision': '2026-10-01' });
    const c = registrarIntento(b.progreso, resultado({ correctas: 8 }), dia(2026, 10, 2));
    expect(c.nuevos).toEqual(['mision-perfecta']);
    const d = registrarIntento(c.progreso, resultado({ correctas: 8 }), dia(2026, 10, 2));
    expect(d.nuevos).toEqual([]);
    expect(d.progreso.xpTotal).toBe(320);
  });

  test('la práctica PAES no cuenta como misión, pero sobre 80 % da su logro', () => {
    const prac = (correctas: number) =>
      resultado({ missionId: PRACTICA_ID, correctas, total: 15, completada: true, xp: 0 });
    const a = registrarIntento(EMPTY_PROGRESS, prac(11), dia(2026, 10, 1));
    expect(a.nuevos).toEqual([]);
    const b = registrarIntento(a.progreso, prac(12), dia(2026, 10, 1));
    expect(b.nuevos).toEqual(['practica-80']);
  });

  test('rachas de 3 y 7 días', () => {
    let p: StudentProgress = EMPTY_PROGRESS;
    const obtenidos: string[] = [];
    for (let d = 1; d <= 7; d++) {
      const r = registrarIntento(p, resultado({ completada: false, correctas: 1 }), dia(2026, 10, d));
      p = r.progreso;
      obtenidos.push(...r.nuevos.map((id) => `${d}:${id}`));
    }
    expect(obtenidos).toEqual(['3:racha-3', '7:racha-7']);
    expect(p.racha).toEqual({ actual: 7, mejor: 7, ultimoDia: '2026-10-07' });
  });

  test('completar todas las misiones de un curso', () => {
    const c7 = COURSES.find((c) => c.id === '7b')!;
    const misiones = Object.fromEntries(
      c7.levels.map((l) => [l.missionId!, { completada: true, mejorCorrectas: 7, intentos: 1 }])
    );
    const { nuevos } = evaluarLogros({ ...EMPTY_PROGRESS, misiones }, '2026-10-28');
    expect(nuevos).toEqual(['primera-mision', 'curso-7b']);
  });

  test('los ids de logros son únicos', () => {
    expect(new Set(LOGROS.map((l) => l.id)).size).toBe(LOGROS.length);
  });
});

describe('apodo', () => {
  test.each([
    ['Cometa_7', 'Cometa_7'],
    ['  Ñandú   veloz ', 'Ñandú veloz'],
    ['Sofía-2', 'Sofía-2'],
  ])('acepta «%s»', (entrada, limpio) => {
    expect(validarAlias(entrada)).toEqual({ ok: true, alias: limpio });
  });

  test.each(['a', '   ', 'un apodo demasiado largo', 'ana@mail.cl', 'tel 912345678', '<script>', '12345678'])(
    'rechaza «%s»',
    (entrada) => {
      expect(validarAlias(entrada).ok).toBe(false);
    }
  );
});

describe('progreso guardado', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  test('guarda y lee apodo, racha y logros', async () => {
    const p: StudentProgress = {
      xpTotal: 10,
      misiones: {},
      alias: 'Cometa',
      racha: { actual: 2, mejor: 4, ultimoDia: '2026-10-28' },
      logros: { 'primera-mision': '2026-10-27' },
    };
    await localProgressRepository.save('local', p);
    expect(await localProgressRepository.load('local')).toEqual(p);
  });

  test('ignora una racha mal formada', async () => {
    await AsyncStorage.setItem('kubi:progreso:local', JSON.stringify({ xpTotal: 5, misiones: {}, racha: { actual: 'x' } }));
    expect(await localProgressRepository.load('local')).toEqual({ xpTotal: 5, misiones: {} });
  });
});

describe('pantalla de perfil', () => {
  async function tap(testID: string) {
    await act(async () => {
      fireEvent.press(await screen.findByTestId(testID));
    });
  }

  beforeEach(async () => {
    await AsyncStorage.clear();
    // 28-10-2026 al mediodía, hora local.
    jest.spyOn(Date, 'now').mockReturnValue(dia(2026, 10, 28).getTime());
    jest.spyOn(banco, 'prepararIntento').mockImplementation((m: Mission) => m);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('misión → logro nuevo en recompensas → perfil con racha, logros y avance; apodo validado', async () => {
    // Ayer ya había jugado: hoy la racha sube a 2.
    await AsyncStorage.setItem(
      'kubi:progreso:local',
      JSON.stringify({ xpTotal: 0, misiones: {}, racha: { actual: 1, mejor: 1, ultimoDia: '2026-10-27' } })
    );
    await renderRouter(APP_DIR, { initialUrl: '/mapa' });
    expect(await screen.findByLabelText('Mi perfil. Racha de 1 día')).toBeTruthy();

    await tap('nivel-n1');
    for (let i = 0; i < 8; i++) {
      await screen.findByText(new RegExp(`PREGUNTA ${i + 1} DE 8`));
      await tap(`opcion-${misionEnteros7b.preguntas[i].correcta}`);
      await screen.findByTestId('panel-retroalimentacion');
      await tap('boton-continuar');
    }
    expect(await screen.findByText('¡Misión cumplida!')).toBeTruthy();
    expect(screen.getByLabelText('Nuevos logros: Primera misión · Misión perfecta')).toBeTruthy();

    await tap('boton-continuar-mapa');
    expect(await screen.findByLabelText('Mi perfil. Racha de 2 días')).toBeTruthy();
    await tap('boton-perfil');
    expect(screen).toHavePathname('/perfil');

    // Sin apodo, el editor parte abierto y valida.
    expect(await screen.findByText('¿Cómo te llamo?')).toBeTruthy();
    expect(screen.getByLabelText('XP total: 100')).toBeTruthy();
    expect(screen.getByLabelText('Días de racha: 2')).toBeTruthy();
    expect(screen.getByLabelText('Mejor racha: 2')).toBeTruthy();
    expect(screen.getByLabelText('Misiones: 1/24')).toBeTruthy();
    expect(screen.getByLabelText('Logro Primera misión: obtenido')).toBeTruthy();
    expect(screen.getByLabelText('Logro Misión perfecta: obtenido')).toBeTruthy();
    expect(screen.getByLabelText(/^Logro Racha de 3 días: pendiente/)).toBeTruthy();
    expect(screen.getByLabelText('Números enteros: completada, mejor resultado 8 de 8, 1 intento')).toBeTruthy();
    expect(screen.getByLabelText('Fracciones y decimales: sin jugar')).toBeTruthy();
    expect(screen.getByLabelText('Práctica PAES: aún no la haces')).toBeTruthy();

    await act(async () => {
      fireEvent.changeText(screen.getByTestId('input-alias'), 'ana@correo.cl');
    });
    await tap('boton-guardar-alias');
    expect(screen.getByTestId('error-alias')).toBeTruthy();

    await act(async () => {
      fireEvent.changeText(screen.getByTestId('input-alias'), '  Cometa_7 ');
    });
    await tap('boton-guardar-alias');
    expect((await screen.findByTestId('alias-actual')).props.children).toBe('Cometa_7');
    expect(screen.queryByTestId('input-alias')).toBeNull();

    const saved = JSON.parse((await AsyncStorage.getItem('kubi:progreso:local'))!);
    expect(saved).toMatchObject({
      alias: 'Cometa_7',
      racha: { actual: 2, mejor: 2, ultimoDia: '2026-10-28' },
      logros: { 'primera-mision': '2026-10-28', 'mision-perfecta': '2026-10-28' },
    });

    await tap('boton-volver');
    expect(screen).toHavePathname('/mapa');
  });
});
