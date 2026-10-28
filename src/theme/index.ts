/**
 * Tokens de diseño oficiales de KUBI.
 * Los colores de marca vienen del diseño canónico 1.0 (ver KUBI_CHARACTER.md).
 */
export const colors = {
  morado: '#7954EE',
  violeta: '#5338B4',
  celeste: '#36D6E7',
  amarillo: '#FFCA58',
  azulOscuro: '#20234E',
  fondo: '#F7F8FF',

  // Derivados funcionales (no forman parte de la paleta del personaje)
  blanco: '#FFFFFF',
  texto: '#20234E',
  textoSecundario: '#4E5173',
  borde: '#E3E4F2',
  superficie: '#FFFFFF',
  superficieSuave: '#EEEAFD',
  bloqueado: '#DCDDEA',
  bloqueadoTexto: '#6B6E8A',
  celesteSuave: '#E2F9FB',
  celesteOscuro: '#0E7C8A',
  amarilloSuave: '#FFF4DA',
  amarilloOscuro: '#8A5A00',
} as const;

export const fonts = {
  regular: 'Sora_400Regular',
  semibold: 'Sora_600SemiBold',
  bold: 'Sora_700Bold',
  extrabold: 'Sora_800ExtraBold',
} as const;

export const radius = { sm: 12, md: 16, lg: 24, xl: 32, pill: 999 } as const;

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 } as const;
