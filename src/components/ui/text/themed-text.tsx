import { StyleSheet, Text, type TextProps } from 'react-native';

import { useTheme } from '@/hooks/use-theme';
import { Typography, type ThemeColor, type TypographyVariant } from '@/theme';

type TextVariant = Exclude<TypographyVariant, 'button' | 'chip' | 'pill' | 'input' | 'tab'>;

export type ThemedTextProps = TextProps & {
  /** Variante de la escala tipográfica de `@/theme` (`body` por defecto). */
  type?: TextVariant;
  /** Color del tema (`text` por defecto). */
  themeColor?: ThemeColor;
};

/** Texto con la tipografía y los colores de la guía de estilo. */
export function ThemedText({ style, type = 'body', themeColor = 'text', ...rest }: ThemedTextProps) {
  const theme = useTheme();

  return <Text style={[{ color: theme[themeColor] }, styles[type], style]} {...rest} />;
}

const styles = StyleSheet.create(Typography);
