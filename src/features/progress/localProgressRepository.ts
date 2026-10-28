import AsyncStorage from '@react-native-async-storage/async-storage';

import { EMPTY_PROGRESS, ProgressRepository, Racha, StudentProgress } from './types';

const esRacha = (r: unknown): r is Racha =>
  !!r &&
  typeof (r as Racha).actual === 'number' &&
  typeof (r as Racha).mejor === 'number' &&
  typeof (r as Racha).ultimoDia === 'string';

const key = (studentId: string) => `kubi:progreso:${studentId}`;

export const localProgressRepository: ProgressRepository = {
  async load(studentId) {
    try {
      const raw = await AsyncStorage.getItem(key(studentId));
      if (!raw) return EMPTY_PROGRESS;
      const parsed = JSON.parse(raw) as Partial<StudentProgress>;
      return {
        xpTotal: typeof parsed.xpTotal === 'number' ? parsed.xpTotal : 0,
        misiones: parsed.misiones ?? {},
        ...(typeof parsed.curso === 'string' ? { curso: parsed.curso } : {}),
        ...(typeof parsed.alias === 'string' ? { alias: parsed.alias } : {}),
        ...(esRacha(parsed.racha) ? { racha: parsed.racha } : {}),
        ...(parsed.logros && typeof parsed.logros === 'object' ? { logros: parsed.logros } : {}),
      };
    } catch {
      return EMPTY_PROGRESS;
    }
  },
  async save(studentId, progress) {
    await AsyncStorage.setItem(key(studentId), JSON.stringify(progress));
  },
};
