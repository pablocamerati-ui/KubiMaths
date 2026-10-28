import { useEffect, useId, useRef } from 'react';
import { AccessibilityInfo, Animated, Easing, StyleProp, ViewStyle } from 'react-native';
import Svg, {
  Circle,
  Defs,
  Ellipse,
  G,
  LinearGradient,
  Path,
  RadialGradient,
  Rect,
  Stop,
} from 'react-native-svg';

import { colors } from '@/theme';
import {
  Arm,
  CORE_GLINT_PATH,
  CORE_PATH,
  EXT_TRIANGLE_PATH,
  Eye,
  KubiExpression,
  POSES,
  sparklePath,
} from './poses';

export type KubiProps = {
  expression?: KubiExpression;
  /** Ancho en puntos; el alto se calcula con la proporción oficial. */
  size?: number;
  /** Flotación suave en reposo. */
  animated?: boolean;
  style?: StyleProp<ViewStyle>;
  /** Texto para lectores de pantalla. */
  accessibilityLabel?: string;
  /** Reacción breve: salto al acertar, sacudida al fallar, fiesta al celebrar. */
  reaccion?: Reaccion;
  /** Cambia este valor para repetir la misma reacción (por ejemplo, el número de respuesta). */
  reaccionClave?: string | number;
};

export type Reaccion = 'salto' | 'sacudida' | 'fiesta';

const VIEW_W = 240;
const VIEW_H = 270;

/**
 * KUBI — personaje oficial (diseño canónico 1.0).
 * No modificar la anatomía: ver KUBI_CHARACTER.md.
 */
export function Kubi({
  expression = 'neutral',
  size = 200,
  animated = true,
  style,
  accessibilityLabel,
  reaccion,
  reaccionClave,
}: KubiProps) {
  const pose = POSES[expression];
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const id = (name: string) => `${name}${uid}`;
  const url = (name: string) => `url(#${id(name)})`;

  const float = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!animated) return;
    let loop: Animated.CompositeAnimation | undefined;
    let cancelled = false;
    AccessibilityInfo.isReduceMotionEnabled()
      .then((reduce) => {
        if (reduce || cancelled) return;
        loop = Animated.loop(
          Animated.sequence([
            Animated.timing(float, {
              toValue: 1,
              duration: 1400,
              easing: Easing.inOut(Easing.quad),
              useNativeDriver: true,
            }),
            Animated.timing(float, {
              toValue: 0,
              duration: 1400,
              easing: Easing.inOut(Easing.quad),
              useNativeDriver: true,
            }),
          ])
        );
        loop.start();
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
      loop?.stop();
    };
  }, [animated, float]);

  // Reacciones: un valor de 0 a 1 por cada una.
  const salto = useRef(new Animated.Value(0)).current;
  const sacudida = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!reaccion) return;
    let anim: Animated.CompositeAnimation | undefined;
    let cancelled = false;
    AccessibilityInfo.isReduceMotionEnabled()
      .then((reduce) => {
        if (reduce || cancelled) return;
        salto.setValue(0);
        sacudida.setValue(0);
        const saltar = (ms: number) =>
          Animated.timing(salto, { toValue: 1, duration: ms, easing: Easing.out(Easing.quad), useNativeDriver: true });
        const reiniciar = Animated.timing(salto, { toValue: 0, duration: 0, useNativeDriver: true });
        anim =
          reaccion === 'salto'
            ? saltar(480)
            : reaccion === 'sacudida'
              ? Animated.timing(sacudida, { toValue: 1, duration: 520, easing: Easing.linear, useNativeDriver: true })
              : Animated.sequence([
                  Animated.parallel([
                    saltar(520),
                    Animated.timing(sacudida, { toValue: 1, duration: 520, useNativeDriver: true }),
                  ]),
                  reiniciar,
                  saltar(460),
                  reiniciar,
                  saltar(420),
                ]);
        anim.start();
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
      anim?.stop();
    };
  }, [reaccion, reaccionClave, salto, sacudida]);

  const translateY = Animated.add(
    float.interpolate({ inputRange: [0, 1], outputRange: [0, -size * 0.025] }),
    salto.interpolate({ inputRange: [0, 0.45, 1], outputRange: [0, -size * 0.16, 0] })
  );
  const scale = salto.interpolate({ inputRange: [0, 0.12, 0.45, 0.85, 1], outputRange: [1, 0.93, 1.06, 0.98, 1] });
  const rotate = sacudida.interpolate({
    inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
    outputRange: ['0deg', '-8deg', '7deg', '-4deg', '2deg', '0deg'],
  });
  const height = (size * VIEW_H) / VIEW_W;

  const renderArm = (arm: Arm, key: string) => (
    <G key={key}>
      <Path
        d={arm.d}
        fill="none"
        stroke={arm.front ? '#6447D4' : colors.morado}
        strokeWidth={14}
        strokeLinecap="round"
      />
      <Circle cx={arm.hand[0]} cy={arm.hand[1]} r={arm.handR ?? 10} fill={url('limb')} />
    </G>
  );

  const renderEye = (eye: Eye, key: string) =>
    eye.type === 'closed' ? (
      <Path
        key={key}
        d={eye.d}
        fill="none"
        stroke={colors.azulOscuro}
        strokeWidth={6}
        strokeLinecap="round"
      />
    ) : (
      <G key={key}>
        <Ellipse cx={eye.white[0]} cy={eye.white[1]} rx={eye.white[2]} ry={eye.white[3]} fill="#FFFFFF" />
        <Ellipse cx={eye.pupil[0]} cy={eye.pupil[1]} rx={eye.pupil[2]} ry={eye.pupil[3]} fill={colors.azulOscuro} />
        <Circle cx={eye.glint[0]} cy={eye.glint[1]} r={eye.glint[2]} fill="#FFFFFF" />
      </G>
    );

  const tilt = pose.tilt ? `rotate(${pose.tilt} 120 250)` : undefined;
  const lift = pose.lift ? `translate(0 ${pose.lift})` : undefined;

  return (
    <Animated.View
      style={[{ width: size, height, transform: [{ translateY }, { scale }, { rotate }] }, style]}
      accessible
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel ?? `KUBI ${expression}`}
    >
      <Svg width={size} height={height} viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}>
        <Defs>
          <RadialGradient id={id('body')} cx="36%" cy="28%" r="85%">
            <Stop offset="0" stopColor="#9C80F8" />
            <Stop offset="0.5" stopColor={colors.morado} />
            <Stop offset="1" stopColor={colors.violeta} />
          </RadialGradient>
          <LinearGradient id={id('ext')} x1="0" y1="0" x2="0.4" y2="1">
            <Stop offset="0" stopColor="#8E70F5" />
            <Stop offset="1" stopColor="#5F42C8" />
          </LinearGradient>
          <LinearGradient id={id('limb')} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#8263F1" />
            <Stop offset="1" stopColor={colors.violeta} />
          </LinearGradient>
          <RadialGradient id={id('foot')} cx="40%" cy="30%" r="80%">
            <Stop offset="0" stopColor="#6E50E0" />
            <Stop offset="1" stopColor="#4A31A3" />
          </RadialGradient>
          <RadialGradient id={id('core')} cx="45%" cy="35%" r="70%">
            <Stop offset="0" stopColor="#C9F7FC" />
            <Stop offset="0.45" stopColor={colors.celeste} />
            <Stop offset="1" stopColor="#1FAFC2" />
          </RadialGradient>
          <RadialGradient id={id('glow')}>
            <Stop offset="0" stopColor={colors.celeste} stopOpacity={0.55} />
            <Stop offset="1" stopColor={colors.celeste} stopOpacity={0} />
          </RadialGradient>
          <RadialGradient id={id('gold')}>
            <Stop offset="0" stopColor={colors.amarillo} stopOpacity={0.6} />
            <Stop offset="1" stopColor={colors.amarillo} stopOpacity={0} />
          </RadialGradient>
          <RadialGradient id={id('ground')}>
            <Stop offset="0" stopColor={colors.azulOscuro} stopOpacity={0.2} />
            <Stop offset="1" stopColor={colors.azulOscuro} stopOpacity={0} />
          </RadialGradient>
        </Defs>

        <Ellipse cx={120} cy={254} rx={pose.lift ? 52 : 66} ry={pose.lift ? 7 : 9} fill={url('ground')} />

        {pose.bubbles && (
          <G opacity={0.85}>
            <Circle cx={196} cy={58} r={4} fill={colors.celeste} />
            <Circle cx={208} cy={42} r={5.5} fill={colors.celeste} />
            <Circle cx={222} cy={24} r={7} fill={colors.celeste} />
          </G>
        )}

        <G transform={tilt}>
          <G transform={lift}>
            {/* Extensiones superiores asimétricas */}
            <Path d={EXT_TRIANGLE_PATH} fill={url('ext')} />
            <Rect x={146} y={44} width={32} height={32} rx={9} transform="rotate(18 162 60)" fill={url('ext')} />

            {/* Piernas y pies */}
            <Rect x={87} y={204} width={20} height={38} rx={10} fill={url('limb')} />
            <Rect x={133} y={204} width={20} height={38} rx={10} fill={url('limb')} />
            <Ellipse cx={95} cy={245} rx={18} ry={9} fill={url('foot')} />
            <Ellipse cx={145} cy={245} rx={18} ry={9} fill={url('foot')} />

            {pose.arms.map((arm, i) => (arm.front ? null : renderArm(arm, `a${i}`)))}

            {/* Cuerpo-cubo */}
            <Rect x={40} y={66} width={160} height={152} rx={48} fill={url('body')} />
            <Ellipse cx={100} cy={82} rx={38} ry={8} fill="#FFFFFF" opacity={0.14} />

            {pose.eyes.map((eye, i) => renderEye(eye, `e${i}`))}
            {pose.brows.map((d, i) => (
              <Path key={`b${i}`} d={d} fill="none" stroke={colors.azulOscuro} strokeWidth={5} strokeLinecap="round" />
            ))}

            {pose.mouth.type === 'o' ? (
              <Ellipse
                cx={pose.mouth.cx}
                cy={pose.mouth.cy}
                rx={pose.mouth.rx}
                ry={pose.mouth.ry}
                fill={colors.azulOscuro}
              />
            ) : pose.mouth.type === 'open' ? (
              <Path
                d={pose.mouth.d}
                fill={colors.azulOscuro}
                stroke={colors.azulOscuro}
                strokeWidth={3}
                strokeLinejoin="round"
              />
            ) : (
              <Path d={pose.mouth.d} fill="none" stroke={colors.azulOscuro} strokeWidth={5} strokeLinecap="round" />
            )}

            {/* Núcleo-rombo con hendidura */}
            {pose.gold && <Circle cx={120} cy={197} r={32} fill={url('gold')} />}
            <Circle cx={120} cy={197} r={pose.glow ?? 20} fill={url('glow')} />
            <Path d={CORE_PATH} fill={url('core')} stroke={colors.azulOscuro} strokeOpacity={0.25} strokeWidth={1} />
            <Path d={CORE_GLINT_PATH} fill="#FFFFFF" opacity={0.7} />

            {pose.arms.map((arm, i) => (arm.front ? renderArm(arm, `f${i}`) : null))}
          </G>
        </G>

        {/* Destellos de recompensa, siempre encima */}
        {pose.sparkles?.map(([x, y, s], i) => (
          <Path key={`s${i}`} d={sparklePath(x, y, s)} fill={colors.amarillo} />
        ))}
      </Svg>
    </Animated.View>
  );
}
