import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';

import { Kubi } from '@/components/kubi/Kubi';
import { AppText } from '@/components/ui/AppText';
import { Button } from '@/components/ui/Button';
import { SpeechBubble } from '@/components/ui/SpeechBubble';
import { colors, spacing } from '@/theme';

/** Pantalla 1 — Bienvenida */
export default function Bienvenida() {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.hero}>
        <Svg width={340} height={340} style={styles.halo} accessible={false}>
          <Defs>
            <RadialGradient id="halo">
              <Stop offset="0" stopColor={colors.morado} stopOpacity={0.22} />
              <Stop offset="1" stopColor={colors.morado} stopOpacity={0} />
            </RadialGradient>
          </Defs>
          <Circle cx={170} cy={170} r={170} fill="url(#halo)" />
        </Svg>
        <SpeechBubble text="¡Hola! Soy KUBI" style={styles.bubble} />
        <Kubi expression="saludando" size={230} accessibilityLabel="KUBI saludando" />
      </View>

      <View style={styles.copy}>
        <AppText variant="display" style={styles.center} accessibilityRole="header">
          KUBI
        </AppText>
        <AppText variant="subtitle" color={colors.violeta} style={styles.center}>
          Matemáticas que se juegan
        </AppText>
        <AppText color={colors.textoSecundario} style={[styles.center, styles.message]}>
          Cada desafío te hace más fuerte. Resuelve misiones, gana XP y avanza a tu ritmo.
        </AppText>
      </View>

      <Button label="¡Vamos a jugar!" onPress={() => router.push('/mapa')} testID="boton-jugar" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.fondo, paddingHorizontal: spacing.xl, paddingBottom: spacing.lg },
  hero: { flex: 1, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: spacing.xl },
  halo: { position: 'absolute' },
  bubble: { alignSelf: 'center', marginBottom: spacing.sm, transform: [{ translateX: 40 }] },
  copy: { gap: spacing.sm, marginBottom: spacing.xxl },
  center: { textAlign: 'center' },
  message: { paddingHorizontal: spacing.sm },
});
