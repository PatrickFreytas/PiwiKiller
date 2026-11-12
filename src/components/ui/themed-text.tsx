import { StyleSheet, Text, type TextProps } from 'react-native';

import { useTheme } from '@/hooks/use-theme';
import { Fonts, Typography, type ThemeColor } from '@/theme';

export type ThemedTextProps = TextProps & {
  /**
   * Variante tipográfica de la guía de estilo.
   * `default`, `small` y `smallBold` equivalen a `body`, `caption` y `label`.
   */
  type?:
    | 'default'
    | 'display'
    | 'heading'
    | 'title'
    | 'section'
    | 'subtitle'
    | 'body'
    | 'caption'
    | 'label'
    | 'meta'
    | 'small'
    | 'smallBold'
    | 'link'
    | 'linkPrimary'
    | 'code';
  themeColor?: ThemeColor;
};

export function ThemedText({ style, type = 'default', themeColor, ...rest }: ThemedTextProps) {
  const theme = useTheme();
  const color = theme[themeColor ?? (type === 'linkPrimary' ? 'primary' : 'text')];

  return <Text style={[{ color }, styles[type], style]} {...rest} />;
}

const styles = StyleSheet.create({
  default: Typography.body,
  display: Typography.display,
  heading: Typography.heading,
  title: Typography.title,
  section: Typography.section,
  subtitle: Typography.subtitle,
  body: Typography.body,
  caption: Typography.caption,
  label: Typography.label,
  meta: Typography.meta,
  small: Typography.caption,
  smallBold: Typography.label,
  link: Typography.label,
  linkPrimary: Typography.label,
  code: {
    fontFamily: Fonts.mono,
    fontSize: 12,
  },
});
