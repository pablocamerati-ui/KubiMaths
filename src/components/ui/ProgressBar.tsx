import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { colors, radius } from '@/theme';

export function ProgressBar({
  value,
  color = colors.celeste,
  height = 14,
  label,
  style,
}: {
  /** Entre 0 y 1. */
  value: number;
  color?: string;
  height?: number;
  label?: string;
  style?: StyleProp<ViewStyle>;
}) {
  const pct = Math.max(0, Math.min(1, value));
  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={label}
      accessibilityValue={{ min: 0, max: 100, now: Math.round(pct * 100) }}
      style={[styles.track, { height, borderRadius: height / 2 }, style]}
    >
      <View style={[styles.fill, { width: `${pct * 100}%`, backgroundColor: color, borderRadius: height / 2 }]}>
        <View style={[styles.shine, { borderRadius: height / 2 }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  track: { alignSelf: 'stretch', backgroundColor: colors.borde, overflow: 'hidden' },
  fill: { height: '100%' },
  shine: {
    position: 'absolute',
    top: 3,
    left: 8,
    right: 8,
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.45)',
    borderRadius: radius.pill,
  },
});
