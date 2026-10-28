import * as Haptics from 'expo-haptics';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FeedbackPanel } from '@/components/challenge/FeedbackPanel';
import { OptionButton, OptionState } from '@/components/challenge/OptionButton';
import { Kubi } from '@/components/kubi/Kubi';
import { KubiExpression } from '@/components/kubi/poses';
import { AppText } from '@/components/ui/AppText';
import { Button } from '@/components/ui/Button';
import { Hearts } from '@/components/ui/Chips';
import { CrossIcon } from '@/components/ui/icons';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { SpeechBubble } from '@/components/ui/SpeechBubble';
import { prepararIntento } from '@/features/missions/banco';
import { getMission } from '@/features/missions/catalog';
import { createMissionState, missionReducer, summarize } from '@/features/missions/engine';
import { textoOpcion } from '@/features/missions/format';
import { Mission } from '@/features/missions/types';
import { useProgress } from '@/features/progress/ProgressContext';
import { codificarResumen, crearPractica, esPractica, Practica, pruebaDe, resumenPorEje } from '@/features/practice/practica';
import { localTutor } from '@/features/tutor/localTutor';
import { tutorIA } from '@/features/tutor/tutor';
import { RespuestaTutor } from '@/features/tutor/tutorIA';
import { colors, fonts, radius, spacing } from '@/theme';

const LETRAS = ['A', 'B', 'C', 'D'];

/** Pantalla 3 — Desafío matemático */
export default function Desafio() {
  const { misionId, semilla } = useLocalSearchParams<{ misionId: string; semilla?: string }>();
  const practica = useMemo(
    () => (esPractica(misionId) ? crearPractica(Number(semilla) || 1, pruebaDe(misionId)) : undefined),
    [misionId, semilla]
  );
  // Cada intento sortea 8 preguntas del banco de la misión (fijas + variantes).
  const semillaIntento = useMemo(() => Number(semilla) || Date.now(), [semilla]);
  const mission = useMemo(() => {
    if (practica) return practica.mision;
    const base = misionId ? getMission(misionId) : undefined;
    return base ? prepararIntento(base, semillaIntento) : undefined;
  }, [practica, misionId, semillaIntento]);

  if (!mission) {
    return (
      <SafeAreaView style={[styles.safe, styles.center]}>
        <Kubi expression="confundido" size={140} />
        <AppText variant="subtitle" style={{ textAlign: 'center', marginVertical: spacing.lg }}>
          No encontré esta misión.
        </AppText>
        <Button label="Volver al mapa" onPress={() => router.replace('/mapa')} />
      </SafeAreaView>
    );
  }
  return <DesafioJuego key={`${mission.id}-${semillaIntento}`} mission={mission} practica={practica} semilla={semilla} />;
}

function DesafioJuego({ mission, practica, semilla }: { mission: Mission; practica?: Practica; semilla?: string }) {
  const { recordResult } = useProgress();
  const reducer = useMemo(() => missionReducer(mission), [mission]);
  const [state, dispatch] = useReducer(reducer, mission, createMissionState);

  const question = mission.preguntas[state.index];
  const answer = state.phase === 'retroalimentacion' ? state.answers[state.answers.length - 1] : undefined;
  const feedback = answer ? localTutor.retroalimentar(question, answer.selected) : undefined;
  const answered = state.answers.length;
  const sinCorazones = !mission.sinCorazones && state.hearts === 0;
  const esUltima = state.index >= mission.preguntas.length - 1;
  const nivel = practica ? (practica.cursos[question.id] ?? mission.nivel) : mission.nivel;

  // Tutor: una pista por pregunta y, si falla, una explicación con otras palabras.
  const [pista, setPista] = useState<RespuestaTutor | 'cargando' | null>(null);
  const [explicacion, setExplicacion] = useState<RespuestaTutor | 'cargando' | 'sin_conexion' | null>(null);
  const preguntaActual = useRef(question.id);
  preguntaActual.current = question.id;
  useEffect(() => {
    setPista(null);
    setExplicacion(null);
  }, [state.index]);

  const pedirPista = () => {
    if (pista) return;
    setPista('cargando');
    const id = question.id;
    tutorIA.pista(question, nivel).then((r) => {
      if (preguntaActual.current === id) setPista(r);
    });
  };

  const pedirExplicacion = () => {
    if (!answer || explicacion) return;
    setExplicacion('cargando');
    const id = question.id;
    tutorIA.explicar(question, nivel, answer.selected).then((r) => {
      if (preguntaActual.current === id) setExplicacion(r ?? 'sin_conexion');
    });
  };

  const kubiExpression: KubiExpression = !answer ? 'concentrado' : answer.correct ? 'celebrando' : 'pensando';
  const kubiDice = !answer
    ? question.enunciado
    : answer.correct
      ? '¡Eso es! Sigue así.'
      : sinCorazones
        ? 'Se acabaron los corazones, pero aprendimos mucho.'
        : 'Tranquilo, revisemos juntos cómo se resuelve.';

  const responder = (option: (typeof question.opciones)[number]['id']) => {
    if (state.phase !== 'respondiendo') return;
    const correct = option === question.correcta;
    Haptics.notificationAsync(
      correct ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Warning
    ).catch(() => undefined);
    dispatch({ type: 'responder', option });
  };

  const continuar = () => {
    if (esUltima || sinCorazones) {
      const finalState = { ...state, phase: 'terminada' as const };
      const result = summarize(mission, finalState);
      const nuevosLogros = recordResult(result);
      router.replace({
        pathname: '/recompensas',
        params: {
          misionId: mission.id,
          correctas: String(result.correctas),
          total: String(result.total),
          xp: String(result.xp),
          corazones: String(result.corazones),
          completada: result.completada ? '1' : '0',
          ...(nuevosLogros.length ? { logros: nuevosLogros.join(',') } : {}),
          ...(practica ? { resumen: codificarResumen(resumenPorEje(practica, state.answers)), semilla: semilla ?? '' } : {}),
        },
      });
      return;
    }
    dispatch({ type: 'continuar' });
  };

  const optionState = (id: string): OptionState => {
    if (!answer) return 'normal';
    if (id === question.correcta) return 'correcta';
    if (id === answer.selected) return 'incorrecta';
    return 'atenuada';
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.topBar}>
        <Pressable
          onPress={() => (router.canGoBack() ? router.back() : router.replace('/mapa'))}
          accessibilityRole="button"
          accessibilityLabel={practica ? 'Salir de la práctica' : 'Salir del desafío'}
          hitSlop={8}
          style={styles.close}
          testID="boton-salir"
        >
          <CrossIcon size={24} color={colors.textoSecundario} />
        </Pressable>
        <ProgressBar value={answered / mission.preguntas.length} label="Avance de la misión" style={{ flex: 1 }} />
        {mission.sinCorazones ? (
          <AppText variant="label" color={colors.violeta} accessibilityLabel={`${answered} de ${mission.preguntas.length} respondidas`}>
            {answered}/{mission.preguntas.length}
          </AppText>
        ) : (
          <Hearts hearts={state.hearts} max={mission.corazonesIniciales} />
        )}
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <AppText variant="caption" color={colors.violeta} testID="contador-pregunta">
          PREGUNTA {state.index + 1} DE {mission.preguntas.length} ·{' '}
          {practica ? `${(practica.cursos[question.id] ?? '').toUpperCase()} · ` : ''}
          {question.habilidad.toUpperCase()}
        </AppText>

        <View style={styles.kubiRow}>
          <Kubi expression={kubiExpression} size={96} animated={!answer} />
          <SpeechBubble text={kubiDice} style={{ flex: 1 }} />
        </View>

        {!answer && (
          <View style={styles.pistaZona}>
            {pista === null ? (
              <Pressable
                testID="boton-pista"
                onPress={pedirPista}
                accessibilityRole="button"
                accessibilityLabel="Pedir una pista a KUBI"
                style={({ pressed }) => [styles.pistaBoton, pressed && { opacity: 0.8 }]}
              >
                <AppText variant="label" color={colors.violeta}>
                  Pedir pista
                </AppText>
              </Pressable>
            ) : (
              <View style={styles.pistaCard} testID="tarjeta-pista" accessibilityLiveRegion="polite">
                <AppText variant="caption" color={colors.celesteOscuro}>
                  PISTA DE KUBI
                </AppText>
                <AppText variant="label" testID="texto-pista">
                  {pista === 'cargando' ? 'KUBI está pensando…' : pista.texto}
                </AppText>
              </View>
            )}
          </View>
        )}

        {answer && !question.expresion && (
          <View style={styles.enunciado} testID="enunciado-respondido">
            <AppText variant="label" color={colors.textoSecundario}>
              {question.enunciado}
            </AppText>
          </View>
        )}

        {question.expresion && (
          <View style={styles.expression} accessible accessibilityLabel={`Expresión: ${question.expresion}`}>
            <AppText style={styles.expressionText}>{question.expresion}</AppText>
          </View>
        )}

        <View style={styles.options}>
          {question.opciones.map((op, i) => (
            <OptionButton
              key={op.id}
              testID={`opcion-${op.id}`}
              letra={LETRAS[i]}
              texto={textoOpcion(question, op)}
              state={optionState(op.id)}
              disabled={state.phase !== 'respondiendo'}
              onPress={() => responder(op.id)}
            />
          ))}
        </View>
      </ScrollView>

      {feedback && (
        <FeedbackPanel
          feedback={feedback}
          xpGanado={mission.xpPorCorrecta}
          botonLabel={esUltima || sinCorazones ? 'Ver resultados' : 'Continuar'}
          onContinue={continuar}
          {...(!feedback.correcto && tutorIA.disponible
            ? {
                onExplicar: pedirExplicacion,
                explicacion:
                  explicacion === 'cargando'
                    ? 'KUBI está pensando…'
                    : explicacion === 'sin_conexion'
                      ? 'Ahora no me puedo conectar. Revisa los pasos de arriba, ¡ahí está todo!'
                      : (explicacion?.texto ?? null),
              }
            : {})}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.fondo },
  center: { alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  close: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  content: { paddingHorizontal: spacing.xl, paddingBottom: spacing.xl, gap: spacing.lg },
  kubiRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  expression: {
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    backgroundColor: colors.blanco,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: colors.borde,
  },
  enunciado: {
    padding: spacing.lg,
    backgroundColor: colors.blanco,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: colors.borde,
  },
  expressionText: { fontFamily: fonts.extrabold, fontSize: 40, lineHeight: 48, color: colors.texto },
  options: { gap: spacing.md },
  pistaZona: { alignItems: 'flex-start' },
  pistaBoton: {
    minHeight: 44,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: colors.superficieSuave,
    backgroundColor: colors.blanco,
  },
  pistaCard: {
    alignSelf: 'stretch',
    gap: 4,
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.celesteSuave,
    borderWidth: 2,
    borderColor: colors.celeste,
  },
});
