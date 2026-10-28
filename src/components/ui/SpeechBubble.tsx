import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { colors, radius } from '@/theme';
import { AppText } from './AppText';

/** Globo de diálogo de KUBI; la cola apunta hacia la izquierda (hacia KUBI). */
export function SpeechBubble({ text, style }: { text: string; style?: StyleProp<ViewStyle> }) {
  return (
    <View style={[styles.wrap, style]}>
      <View style={styles.tail} />
      <View style={styles.bubble}>
        <AppText variant="label">{text}</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', alignItems: 'center', flexShrink: 1 },
  tail: {
    width: 14,
    height: 14,
    backgroundColor: colors.blanco,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: colors.borde,
    transform: [{ rotate: '45deg' }],
    marginRight: -8,
    zIndex: 1,
  },
  bubble: {
    flexShrink: 1,
    backgroundColor: colors.blanco,
    borderWidth: 2,
    borderColor: colors.borde,
    borderRadius: radius.lg,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
