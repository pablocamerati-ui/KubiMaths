export type OptionId = 'a' | 'b' | 'c' | 'd';

export type QuestionOption = {
  id: OptionId;
  /** Valor numérico de la alternativa (para verificar la matemática en pruebas). */
  valor: number;
  /** Texto a mostrar cuando no basta el número (por ejemplo, una fracción "3/4"). */
  texto?: string;
  /** Explicación del error típico que lleva a esta alternativa (solo incorrectas). */
  porQue?: string;
};

export type Question = {
  id: string;
  enunciado: string;
  /** Expresión destacada, por ejemplo "−7 + 4". */
  expresion?: string;
  opciones: [QuestionOption, QuestionOption, QuestionOption, QuestionOption];
  correcta: OptionId;
  /** Unidad que acompaña a las alternativas, por ejemplo "°C" o "m". */
  unidad?: string;
  /** Prefijo de las alternativas, por ejemplo "$". */
  prefijo?: string;
  /** Cálculo de referencia: debe dar el valor de la alternativa correcta. */
  calcular: () => number;
  /** Pasos de la resolución, en orden. */
  pasos: string[];
  /** Pista breve sin revelar el resultado (para el tutor). */
  pista: string;
  habilidad: string;
};

export type Mission = {
  id: string;
  titulo: string;
  nivel: string;
  unidad: string;
  preguntas: Question[];
  corazonesIniciales: number;
  xpPorCorrecta: number;
  xpBonoCompletar: number;
  /** Modo práctica: no se pierden corazones y siempre se responden todas las preguntas. */
  sinCorazones?: boolean;
};
