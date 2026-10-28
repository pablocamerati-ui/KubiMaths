import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { CheckIcon, CrossIcon } from '@/components/ui/icons';
import { colors, fonts, radius } from '@/theme';

export type OptionState = 'normal' | 'correcta' | 'incorrecta' | 'atenuada';

type Props = {
  letra: string;
  texto: string;
  state: OptionState;
  disabled: boolean;
  onPress: () => void;
  testID?: string;
};

export function OptionButton({ letra, texto, state, disabled, onPress, testID }: Props) {
  const stateLabel = state === 'correcta' ? ', respuesta correcta' : state === 'incorrecta' ? ', tu respuesta, incorrecta' : '';
  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={`Alternativa ${letra}: ${texto}${stateLabel}`}
      accessibilityState={{ disabled, selected: state === 'correcta' || state === 'incorrecta' }}
      style={({ pressed }) => [
        styles.base,
        state === 'correcta' && styles.correct,
        state === 'incorrecta' && styles.wrong,
        state === 'atenuada' && styles.dim,
        pressed && !disabled && styles.pressed,
      ]}
    >
      <View
        style={[
          styles.badge,
          state === 'correcta' && { backgroundColor: colors.celesteOscuro, borderColor: colors.celesteOscuro },
          state === 'incorrecta' && { backgroundColor: colors.azulOscuro, borderColor: colors.azulOscuro },
        ]}
      >
        {state === 'correcta' ? (
          <CheckIcon size={20} />
        ) : state === 'incorrecta' ? (
          <CrossIcon size={18} color={colors.blanco} />
        ) : (
          <AppText variant="label" color={colors.violeta}>
            {letra}
          </AppText>
        )}
      </View>
      <AppText
        style={[styles.text, state === 'incorrecta' && styles.strike]}
        color={state === 'atenuada' ? colors.bloqueadoTexto : colors.texto}
      >
        {texto}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    minHeight: 60,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: radius.md,
    backgroundColor: colors.blanco,
    borderWidth: 2,
    borderColor: colors.borde,
    borderBottomWidth: 5,
  },
  pressed: { transform: [{ translateY: 2 }], borderBottomWidth: 3, borderColor: colors.morado },
  correct: { backgroundColor: colors.celesteSuave, borderColor: colors.celeste },
  wrong: { backgroundColor: '#ECEBF5', borderColor: colors.azulOscuro },
  dim: { opacity: 0.6 },
  badge: {
    width: 34,
    height: 34,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.borde,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { flex: 1, fontFamily: fonts.bold, fontSize: 20, lineHeight: 26 },
  strike: { textDecorationLine: 'line-through' },
});
