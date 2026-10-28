import { Mission, OptionId } from './types';

/**
 * Motor de una misión: lógica pura, sin interfaz, para poder probarla.
 */

export type AnswerRecord = { questionId: string; selected: OptionId; correct: boolean };

export type MissionState = {
  missionId: string;
  index: number;
  hearts: number;
  answers: AnswerRecord[];
  phase: 'respondiendo' | 'retroalimentacion' | 'terminada';
};

export type MissionAction = { type: 'responder'; option: OptionId } | { type: 'continuar' };

export function createMissionState(mission: Mission): MissionState {
  return {
    missionId: mission.id,
    index: 0,
    hearts: mission.corazonesIniciales,
    answers: [],
    phase: 'respondiendo',
  };
}

export function missionReducer(mission: Mission) {
  return (state: MissionState, action: MissionAction): MissionState => {
    switch (action.type) {
      case 'responder': {
        if (state.phase !== 'respondiendo') return state;
        const question = mission.preguntas[state.index];
        const correct = action.option === question.correcta;
        return {
          ...state,
          hearts: correct || mission.sinCorazones ? state.hearts : Math.max(0, state.hearts - 1),
          answers: [...state.answers, { questionId: question.id, selected: action.option, correct }],
          phase: 'retroalimentacion',
        };
      }
      case 'continuar': {
        if (state.phase !== 'retroalimentacion') return state;
        const isLast = state.index >= mission.preguntas.length - 1;
        if (isLast || (!mission.sinCorazones && state.hearts === 0)) return { ...state, phase: 'terminada' };
        return { ...state, index: state.index + 1, phase: 'respondiendo' };
      }
      default:
        return state;
    }
  };
}

export type MissionResult = {
  missionId: string;
  correctas: number;
  total: number;
  corazones: number;
  xp: number;
  completada: boolean;
};

/** La misión se completa al responder todas las preguntas sin quedarse sin corazones. */
export function summarize(mission: Mission, state: MissionState): MissionResult {
  const correctas = state.answers.filter((a) => a.correct).length;
  const total = mission.preguntas.length;
  const completada = state.answers.length === total && (mission.sinCorazones || state.hearts > 0);
  const xp = correctas * mission.xpPorCorrecta + (completada ? mission.xpBonoCompletar : 0);
  return { missionId: mission.id, correctas, total, corazones: state.hearts, xp, completada };
}
