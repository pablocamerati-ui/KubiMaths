/* eslint-env jest */
// Almacenamiento local simulado para las pruebas.
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// En pruebas no se cargan fuentes reales ni vibración.
jest.mock('expo-font', () => ({
  ...jest.requireActual('expo-font'),
  useFonts: () => [true, null],
  isLoaded: () => true,
  loadAsync: () => Promise.resolve(),
}));

jest.mock('expo-haptics', () => ({
  notificationAsync: jest.fn(() => Promise.resolve()),
  impactAsync: jest.fn(() => Promise.resolve()),
  selectionAsync: jest.fn(() => Promise.resolve()),
  NotificationFeedbackType: { Success: 'success', Warning: 'warning', Error: 'error' },
  ImpactFeedbackStyle: { Light: 'light', Medium: 'medium', Heavy: 'heavy' },
}));

// Audio simulado: registra qué se reproduce.
jest.mock('expo-audio', () => ({
  createAudioPlayer: jest.fn(() => ({ volume: 1, seekTo: jest.fn(() => Promise.resolve()), play: jest.fn(), remove: jest.fn() })),
  setAudioModeAsync: jest.fn(() => Promise.resolve()),
}));
