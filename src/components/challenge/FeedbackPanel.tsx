import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { Button } from '@/components/ui/Button';
import { XpIcon } from '@/components/ui/icons';
import { TutorFeedback } from '@/features/tutor/TutorService';
import { colors, radius, spacing } from '@/theme';

type Props = {
  feedback: TutorFeedback;
  xpGanado: number;
  botonLabel: string;
  onContinue: () => void;
  /** Si está, muestra «Explícamelo de otra forma» (tutor IA). */
  onExplicar?: () => void;
  /** Texto de la explicación del tutor IA (o el aviso mientras carga). */
  explicacion?: string | null;
};

export function FeedbackPanel({ feedback, xpGanado, botonLabel, onContinue, onExplicar, explicacion }: Props) {
  const ok = feedback.correcto;
  return (
    <View
      style={[styles.panel, ok ? styles.ok : styles.ko]}
      accessibilityLiveRegion="polite"
      testID="panel-retroalimentacion"
    >
      <View style={styles.titleRow}>
        <AppText variant="subtitle" color={ok ? colors.celesteOscuro : colors.violeta} style={{ flex: 1 }}>
          {feedback.titulo}
        </AppText>
        {ok && xpGanado > 0 && (
          <View style={styles.xp}>
            <XpIcon size={18} />
            <AppText variant="label" color={colors.amarilloOscuro}>
              +{xpGanado} XP
            </AppText>
          </View>
        )}
      </View>

      {feedback.porQue && <AppText variant="label">{feedback.porQue}</AppText>}

      <View style={styles.steps}>
        {feedback.pasos.map((paso, i) => (
          <View key={i} style={styles.step}>
            <View style={styles.stepNum}>
              <AppText variant="caption" color={colors.blanco}>
                {i + 1}
              </AppText>
            </View>
            <AppText style={styles.stepText} color={colors.textoSecundario}>
              {paso}
            </AppText>
          </View>
        ))}
      </View>

      {onExplicar &&
        (explicacion ? (
          <View style={styles.explicacion} testID="explicacion-ia">
            <AppText variant="caption" color={colors.violeta}>
              KUBI TE LO EXPLICA DE OTRA FORMA
            </AppText>
            <AppText variant="label">{explicacion}</AppText>
          </View>
        ) : (
          <Pressable onPress={onExplicar} testID="boton-explicar" accessibilityRole="button" hitSlop={6} style={styles.link}>
            <AppText variant="label" color={colors.morado}>
              Explícamelo de otra forma
            </AppText>
          </Pressable>
        ))}

      <Button label={botonLabel} onPress={onContinue} testID="boton-continuar" />
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    gap: spacing.md,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
  },
  ok: { backgroundColor: colors.celesteSuave },
  ko: { backgroundColor: colors.superficieSuave },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  xp: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.amarilloSuave,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.pill,
  },
  steps: { gap: spacing.sm },
  step: { flexDirection: 'row', gap: spacing.sm, alignItems: 'flex-start' },
  stepNum: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.violeta,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  stepText: { flex: 1, fontSize: 15, lineHeight: 22 },
  link: { alignSelf: 'flex-start', minHeight: 32, justifyContent: 'center' },
  explicacion: { gap: 4, padding: spacing.md, borderRadius: radius.md, backgroundColor: colors.blanco },
});
