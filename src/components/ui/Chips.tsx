import { StyleSheet, View } from 'react-native';

import { colors, radius } from '@/theme';
import { AppText } from './AppText';
import { HeartIcon, XpIcon } from './icons';

export function XpChip({ xp }: { xp: number }) {
  return (
    <View style={[styles.chip, styles.xp]} accessible accessibilityLabel={`${xp} puntos de experiencia`}>
      <XpIcon size={20} />
      <AppText variant="label" color={colors.amarilloOscuro}>
        {xp} XP
      </AppText>
    </View>
  );
}

export function Hearts({ hearts, max }: { hearts: number; max: number }) {
  return (
    <View style={styles.hearts} accessible accessibilityLabel={`${hearts} de ${max} corazones`}>
      {Array.from({ length: max }, (_, i) => (
        <HeartIcon key={i} size={26} filled={i < hearts} color={i < hearts ? colors.morado : colors.bloqueado} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: radius.pill,
  },
  xp: { backgroundColor: colors.amarilloSuave },
  hearts: { flexDirection: 'row', gap: 2 },
});
