import Svg, { Path, Rect } from 'react-native-svg';

import { colors } from '@/theme';

type IconProps = { size?: number; color?: string };

export function HeartIcon({ size = 24, color = colors.morado, filled = true }: IconProps & { filled?: boolean }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" accessible={false}>
      <Path
        d="M12 20.5s-7.5-4.6-7.5-10.2C4.5 7.4 6.6 5.5 9 5.5c1.4 0 2.4.7 3 1.6.6-.9 1.6-1.6 3-1.6 2.4 0 4.5 1.9 4.5 4.8 0 5.6-7.5 10.2-7.5 10.2z"
        fill={filled ? color : 'none'}
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/** Rombo de XP (eco del núcleo de KUBI). */
export function XpIcon({ size = 20, color = colors.amarillo }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" accessible={false}>
      <Path d="M12 2.5l7.5 9.5-7.5 9.5L4.5 12z" fill={color} stroke="#E9A93A" strokeWidth={1.5} strokeLinejoin="round" />
      <Path d="M12 7l3.8 5L12 17 8.2 12z" fill="#FFFFFF" opacity={0.45} />
    </Svg>
  );
}

export function LockIcon({ size = 26, color = colors.bloqueadoTexto }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" accessible={false}>
      <Rect x={5} y={10.5} width={14} height={10} rx={3} fill={color} />
      <Path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" fill="none" stroke={color} strokeWidth={2.4} strokeLinecap="round" />
    </Svg>
  );
}

export function CheckIcon({ size = 26, color = colors.blanco }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" accessible={false}>
      <Path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke={color} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function CrossIcon({ size = 22, color = colors.texto }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" accessible={false}>
      <Path d="M6 6l12 12M18 6L6 18" fill="none" stroke={color} strokeWidth={2.6} strokeLinecap="round" />
    </Svg>
  );
}

export function PlayIcon({ size = 26, color = colors.blanco }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" accessible={false}>
      <Path d="M8 5.5v13l10.5-6.5z" fill={color} stroke={color} strokeWidth={1.5} strokeLinejoin="round" />
    </Svg>
  );
}

export function ClockIcon({ size = 24, color = colors.bloqueadoTexto }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" accessible={false}>
      <Path d="M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17z" fill="none" stroke={color} strokeWidth={2.2} />
      <Path d="M12 7.5V12l3 2" fill="none" stroke={color} strokeWidth={2.2} strokeLinecap="round" />
    </Svg>
  );
}

/** Llama de la racha diaria. */
export function FlameIcon({ size = 22, color = '#FF8A3D' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" accessible={false}>
      <Path
        d="M12 2.8c.6 3-1.9 4.6-3.4 6.6C7.3 11 6.5 12.6 6.5 14.6a5.5 5.5 0 0 0 11 0c0-2.4-1.1-4.1-2.3-5.4-.3 1.3-1 2.2-1.9 2.6.4-3.6-.6-6.8-1.3-9z"
        fill={color}
      />
      <Path d="M12 20.1a2.6 2.6 0 0 1-2.6-2.6c0-1.6 1.3-2.5 2.2-3.8.5 1.3 3 2 3 3.8a2.6 2.6 0 0 1-2.6 2.6z" fill={colors.amarillo} />
    </Svg>
  );
}

/** Medalla de logro. */
export function MedalIcon({ size = 28, color = colors.amarillo, apagada = false }: IconProps & { apagada?: boolean }) {
  const cinta = apagada ? colors.bloqueado : colors.morado;
  const disco = apagada ? colors.bloqueado : color;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" accessible={false}>
      <Path d="M7 2.5h4l2.2 6.2-3.2 1.6z" fill={cinta} />
      <Path d="M17 2.5h-4l-2.2 6.2 3.2 1.6z" fill={apagada ? colors.bloqueadoTexto : colors.violeta} opacity={apagada ? 0.4 : 1} />
      <Path d="M12 8.6a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4z" fill={disco} stroke={apagada ? colors.bloqueadoTexto : '#E9A93A'} strokeWidth={1.4} />
      <Path d="M12 11.3l1.1 2.2 2.4.3-1.8 1.7.5 2.4-2.2-1.2-2.2 1.2.5-2.4-1.8-1.7 2.4-.3z" fill={colors.blanco} opacity={apagada ? 0.7 : 0.85} />
    </Svg>
  );
}

export function UserIcon({ size = 24, color = colors.violeta }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" accessible={false}>
      <Path d="M12 3.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" fill={color} />
      <Path d="M4.5 20.5c.6-3.8 3.6-6 7.5-6s6.9 2.2 7.5 6z" fill={color} />
    </Svg>
  );
}

export function BackIcon({ size = 24, color = colors.texto }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" accessible={false}>
      <Path d="M15 5l-7 7 7 7" fill="none" stroke={color} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
