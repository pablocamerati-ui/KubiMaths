import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { colors, fonts, radius } from '@/theme';
import { AppText } from './AppText';

type Props = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

/** Botón con base sólida "3D", coherente con el volumen de KUBI. */
export function Button({ label, onPress, variant = 'primary', disabled, style, testID }: Props) {
  const primary = variant === 'primary';
  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        primary ? styles.primary : styles.secondary,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
    >
      <AppText
        style={styles.label}
        color={primary ? colors.blanco : colors.violeta}
      >
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 56,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    borderBottomWidth: 5,
  },
  primary: { backgroundColor: colors.morado, borderBottomColor: colors.violeta },
  secondary: {
    backgroundColor: colors.blanco,
    borderWidth: 2,
    borderColor: colors.borde,
    borderBottomColor: colors.borde,
  },
  disabled: { backgroundColor: colors.bloqueado, borderBottomColor: '#C7C8D9' },
  pressed: { transform: [{ translateY: 3 }], borderBottomWidth: 2 },
  label: { fontFamily: fonts.bold, fontSize: 17, letterSpacing: 0.2 },
});
