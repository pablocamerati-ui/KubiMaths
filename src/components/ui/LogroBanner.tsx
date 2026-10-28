import { StyleSheet, View } from 'react-native';

import { Kubi } from '@/components/kubi/Kubi';
import { getLogro } from '@/features/progress/logros';
import { colors, radius, spacing } from '@/theme';
import { AppText } from './AppText';
import { MedalIcon } from './icons';

/** Aviso de logros recién desbloqueados, con KUBI orgulloso. */
export function LogroBanner({ ids }: { ids: string[] }) {
  const logros = ids.map(getLogro).filter((l): l is NonNullable<typeof l> => !!l);
  if (logros.length === 0) return null;
  const titulos = logros.map((l) => l.titulo).join(' · ');
  return (
    <View
      style={styles.banner}
      accessible
      accessibilityLiveRegion="polite"
      accessibilityLabel={`${logros.length === 1 ? 'Nuevo logro' : 'Nuevos logros'}: ${titulos}`}
      testID="banner-logro"
    >
      <Kubi expression="orgulloso" size={64} accessibilityLabel="KUBI orgulloso" />
      <View style={{ flex: 1, gap: 2 }}>
        <AppText variant="caption" color={colors.amarilloOscuro}>
          {logros.length === 1 ? '¡NUEVO LOGRO!' : '¡NUEVOS LOGROS!'}
        </AppText>
        <AppText variant="label">{titulos}</AppText>
      </View>
      <MedalIcon size={36} />
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    paddingRight: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.amarilloSuave,
    borderWidth: 2,
    borderColor: colors.amarillo,
  },
});
