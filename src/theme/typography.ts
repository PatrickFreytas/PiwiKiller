import { Platform, type TextStyle } from 'react-native';

/**
 * Familias de Inter. Cada peso es una familia distinta (se cargan en el layout raíz),
 * por eso los estilos usan `fontFamily` y no `fontWeight`.
 */
export const FontFamily = {
  regular: 'Inter_400Regular',
  semiBold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
  extraBold: 'Inter_800ExtraBold',
  black: 'Inter_900Black',
} as const;

/** Familias tipográficas auxiliares por plataforma. */
export const Fonts = Platform.select({
  ios: {
    sans: FontFamily.regular,
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: FontFamily.regular,
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: FontFamily.regular,
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

/** Escala tipográfica de la guía de estilo (tamaño / interlineado / peso). */
export const Typography = {
  /** Display 32 / ExtraBold. */
  display: { fontFamily: FontFamily.extraBold, fontSize: 32, lineHeight: 39, letterSpacing: -0.8 },
  /** Saludo y títulos de pantalla: 26 / ExtraBold. */
  heading: { fontFamily: FontFamily.extraBold, fontSize: 26, lineHeight: 31, letterSpacing: -0.6 },
  /** Título 22 / ExtraBold. */
  title: { fontFamily: FontFamily.extraBold, fontSize: 22, lineHeight: 26 },
  /** Encabezado de sección ("Categorías", "Cerca de ti"): 19 / ExtraBold. */
  section: { fontFamily: FontFamily.extraBold, fontSize: 19, lineHeight: 23, letterSpacing: -0.3 },
  /** Subtítulo 16 / Bold. */
  subtitle: { fontFamily: FontFamily.bold, fontSize: 16, lineHeight: 20 },
  /** Cuerpo 14 / Regular: descripción de platos y ayudas. */
  body: { fontFamily: FontFamily.regular, fontSize: 14, lineHeight: 17 },
  /** Caption 12 / Regular: metadatos, distancia, tiempo. */
  caption: { fontFamily: FontFamily.regular, fontSize: 12, lineHeight: 15 },
  /** Etiquetas de campos y enlaces cortos: 13 / Bold. */
  label: { fontFamily: FontFamily.bold, fontSize: 13, lineHeight: 16 },
  /** Texto de botones: 16 / ExtraBold. */
  button: { fontFamily: FontFamily.extraBold, fontSize: 16, lineHeight: 20 },
  /** Texto de chips: 13 / SemiBold. */
  chip: { fontFamily: FontFamily.semiBold, fontSize: 13, lineHeight: 16 },
  /** Texto de pills: 11 / Bold. */
  pill: { fontFamily: FontFamily.bold, fontSize: 11, lineHeight: 14 },
  /** Metadatos pequeños: 11 / Regular. */
  meta: { fontFamily: FontFamily.regular, fontSize: 11, lineHeight: 14 },
  /** Texto dentro de campos: 15 / Regular. */
  input: { fontFamily: FontFamily.regular, fontSize: 15, lineHeight: 19 },
  /** Etiquetas de la barra inferior: 11 / SemiBold. */
  tab: { fontFamily: FontFamily.semiBold, fontSize: 11, lineHeight: 14 },
} as const satisfies Record<string, TextStyle>;

export type TypographyVariant = keyof typeof Typography;
