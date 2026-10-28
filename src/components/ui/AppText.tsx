import { ReactNode } from 'react';
import { StyleSheet, Text, TextProps, TextStyle, View } from 'react-native';

import { colors, fonts } from '@/theme';

type Variant = 'display' | 'title' | 'subtitle' | 'body' | 'label' | 'caption';

const VARIANTS: Record<Variant, { fontFamily: string; fontSize: number; lineHeight: number }> = {
  display: { fontFamily: fonts.extrabold, fontSize: 56, lineHeight: 60 },
  title: { fontFamily: fonts.extrabold, fontSize: 26, lineHeight: 32 },
  subtitle: { fontFamily: fonts.bold, fontSize: 19, lineHeight: 26 },
  body: { fontFamily: fonts.regular, fontSize: 16, lineHeight: 24 },
  label: { fontFamily: fonts.semibold, fontSize: 15, lineHeight: 20 },
  caption: { fontFamily: fonts.semibold, fontSize: 12, lineHeight: 16 },
};

/**
 * Exponentes dibujados por la app.
 * Sora no trae los superíndices ⁴ a ⁹: el teléfono los tomaba de otra fuente y
 * se veían de distinto tamaño. Aquí cada exponente se escribe con los dígitos
 * normales de Sora, más pequeños y levantados, así todos se ven iguales.
 */
const SUPERINDICES: Record<string, string> = {
  '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9',
  '⁻': '−', '⁺': '+', 'ˣ': 'x', 'ⁿ': 'n', 'ʰ': 'h',
};
const TRAMOS = new RegExp(`([${Object.keys(SUPERINDICES).join('')}]+)`, 'u');
const ESCALA = 0.62;
const SUBIDA = 0.42;

/** Separa el texto en tramos normales y exponentes (con sus dígitos normales). */
export function partirExponentes(texto: string): { texto: string; exponente: boolean }[] {
  return texto
    .split(TRAMOS)
    .filter((t) => t.length > 0)
    .map((t) =>
      TRAMOS.test(t) && [...t].every((c) => c in SUPERINDICES)
        ? { texto: [...t].map((c) => SUPERINDICES[c]).join(''), exponente: true }
        : { texto: t, exponente: false }
    );
}

function conExponentes(children: ReactNode, estilo: TextStyle): ReactNode {
  if (typeof children !== 'string' || !TRAMOS.test(children)) return children;
  const tamano = estilo.fontSize ?? 16;
  return partirExponentes(children).map((parte, i) =>
    parte.exponente ? (
      <View key={i} style={{ transform: [{ translateY: -tamano * SUBIDA }] }} accessible={false}>
        <Text
          style={{
            fontFamily: estilo.fontFamily,
            fontSize: Math.round(tamano * ESCALA),
            lineHeight: Math.round(tamano * ESCALA * 1.15),
            color: estilo.color,
          }}
        >
          {parte.texto}
        </Text>
      </View>
    ) : (
      parte.texto
    )
  );
}

export function AppText({
  variant = 'body',
  color = colors.texto,
  style,
  children,
  ...rest
}: TextProps & { variant?: Variant; color?: string }) {
  const estilo = StyleSheet.flatten([VARIANTS[variant], { color }, style]) as TextStyle;
  const tieneExponentes = typeof children === 'string' && TRAMOS.test(children);
  return (
    <Text
      {...rest}
      // El lector de pantalla lee el texto original (3⁵), no los pedazos.
      {...(tieneExponentes && !rest.accessibilityLabel ? { accessibilityLabel: children as string } : {})}
      style={estilo}
    >
      {conExponentes(children, estilo)}
    </Text>
  );
}
