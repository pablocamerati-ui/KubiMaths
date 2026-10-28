import { misionAlgebra1m } from './data/algebra1m';
import { misionAlgebra7b } from './data/algebra7b';
import { misionCuadratica2m } from './data/cuadratica2m';
import { misionEcuacion2m } from './data/ecuacion2m';
import { misionEcuaciones7b } from './data/ecuaciones7b';
import { misionEcuaciones8b } from './data/ecuaciones8b';
import { misionEnteros7b } from './data/enteros7b';
import { misionEnteros8b } from './data/enteros8b';
import { misionFracciones7b } from './data/fracciones7b';
import { misionFunciones8b } from './data/funciones8b';
import { misionGeometria7b } from './data/geometria7b';
import { misionGeometria8b } from './data/geometria8b';
import { misionLogaritmos2m } from './data/logaritmos2m';
import { misionPorcentajes7b } from './data/porcentajes7b';
import { misionPotencias1m } from './data/potencias1m';
import { misionPotencias8b } from './data/potencias8b';
import { misionProbabilidad1m } from './data/probabilidad1m';
import { misionProbabilidad2m } from './data/probabilidad2m';
import { misionRacionales1m } from './data/racionales1m';
import { misionRaices2m } from './data/raices2m';
import { misionSemejanza1m } from './data/semejanza1m';
import { misionSistemas1m } from './data/sistemas1m';
import { misionTrigonometria2m } from './data/trigonometria2m';
import { misionVariacion8b } from './data/variacion8b';
import { Mission } from './types';

/** Una parada del mapa de aventuras. */
export type MapLevel = {
  id: string;
  titulo: string;
  /** Misión jugable; null mientras el contenido no esté disponible. */
  missionId: string | null;
};

export type CourseId = '7b' | '8b' | '1m' | '2m';

/** Un curso tiene su propio mapa de aventuras. */
export type Course = {
  id: CourseId;
  nombre: string;
  /** Texto corto para el selector, por ejemplo "7.º". */
  corto: string;
  descripcion: string;
  levels: MapLevel[];
};

const level = (id: string, m: Mission): MapLevel => ({ id, titulo: m.titulo, missionId: m.id });

export const COURSES: Course[] = [
  {
    id: '7b',
    nombre: '7.º básico',
    corto: '7.º',
    descripcion: 'Números, álgebra y geometría',
    levels: [
      level('n1', misionEnteros7b),
      level('n2', misionFracciones7b),
      level('n3', misionPorcentajes7b),
      level('n4', misionAlgebra7b),
      level('n5', misionEcuaciones7b),
      level('n6', misionGeometria7b),
    ],
  },
  {
    id: '8b',
    nombre: '8.º básico',
    corto: '8.º',
    descripcion: 'Potencias, funciones y Pitágoras',
    levels: [
      level('8b-n1', misionEnteros8b),
      level('8b-n2', misionPotencias8b),
      level('8b-n3', misionVariacion8b),
      level('8b-n4', misionEcuaciones8b),
      level('8b-n5', misionFunciones8b),
      level('8b-n6', misionGeometria8b),
    ],
  },
  {
    id: '1m',
    nombre: '1.º medio',
    corto: '1.º M',
    descripcion: 'Álgebra, semejanza y probabilidad',
    levels: [
      level('1m-n1', misionRacionales1m),
      level('1m-n2', misionPotencias1m),
      level('1m-n3', misionAlgebra1m),
      level('1m-n4', misionSistemas1m),
      level('1m-n5', misionSemejanza1m),
      level('1m-n6', misionProbabilidad1m),
    ],
  },
  {
    id: '2m',
    nombre: '2.º medio',
    corto: '2.º M',
    descripcion: 'Raíces, logaritmos y cuadráticas',
    levels: [
      level('2m-n1', misionRaices2m),
      level('2m-n2', misionLogaritmos2m),
      level('2m-n3', misionCuadratica2m),
      level('2m-n4', misionEcuacion2m),
      level('2m-n5', misionTrigonometria2m),
      level('2m-n6', misionProbabilidad2m),
    ],
  },
];

export const DEFAULT_COURSE: CourseId = '7b';

export function getCourse(id: string | undefined): Course {
  return COURSES.find((c) => c.id === id) ?? COURSES[0];
}

/** Niveles de 7.º básico (se mantiene por compatibilidad). */
export const MAP_LEVELS: MapLevel[] = getCourse('7b').levels;

/** Todos los niveles de todos los cursos. */
export const ALL_LEVELS: MapLevel[] = COURSES.flatMap((c) => c.levels);

const MISSIONS: Record<string, Mission> = Object.fromEntries(
  [
    misionEnteros7b,
    misionFracciones7b,
    misionPorcentajes7b,
    misionAlgebra7b,
    misionEcuaciones7b,
    misionGeometria7b,
    misionEnteros8b,
    misionPotencias8b,
    misionVariacion8b,
    misionEcuaciones8b,
    misionFunciones8b,
    misionGeometria8b,
    misionRacionales1m,
    misionPotencias1m,
    misionAlgebra1m,
    misionSistemas1m,
    misionSemejanza1m,
    misionProbabilidad1m,
    misionRaices2m,
    misionLogaritmos2m,
    misionCuadratica2m,
    misionEcuacion2m,
    misionTrigonometria2m,
    misionProbabilidad2m,
  ].map((m) => [m.id, m])
);

export const ALL_MISSIONS: Mission[] = Object.values(MISSIONS);

export function getMission(id: string): Mission | undefined {
  return MISSIONS[id];
}

/** Curso al que pertenece una misión. */
export function courseOfMission(missionId: string): Course | undefined {
  return COURSES.find((c) => c.levels.some((l) => l.missionId === missionId));
}

export type LevelStatus = 'completada' | 'disponible' | 'proximamente' | 'bloqueada';

/**
 * Un nivel se desbloquea cuando el anterior del mismo curso está completado.
 * El primer nivel de cada curso siempre está disponible.
 * Si está desbloqueado pero aún no tiene contenido, queda "próximamente".
 */
export function levelStatuses(
  completedMissionIds: ReadonlySet<string>,
  levels: MapLevel[] = MAP_LEVELS
): LevelStatus[] {
  return levels.map((lvl, i) => {
    if (lvl.missionId && completedMissionIds.has(lvl.missionId)) return 'completada';
    const prev = levels[i - 1];
    const unlocked = i === 0 || (prev?.missionId != null && completedMissionIds.has(prev.missionId));
    if (!unlocked) return 'bloqueada';
    return lvl.missionId ? 'disponible' : 'proximamente';
  });
}
