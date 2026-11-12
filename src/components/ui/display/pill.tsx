import { StyleSheet, Text, View, type ViewProps } from 'react-native';

import { useTheme } from '@/hooks/use-theme';
import { FontFamily, Palette, Radius, Shadows, Typography } from '@/theme';

export type PillTone = 'promo' | 'success' | 'rating' | 'dark' | 'light' | 'sun' | 'glass';

export type PillProps = ViewProps & {
  /** Texto corto: "-20%", "Envío gratis", "★ 4.8", "Nuevo", "⏱ 15–25 min". */
  label: string;
  /**
   * `promo` coral (descuentos) · `success` menta (envío gratis) · `rating` sol claro (calificación) ·
   * `dark` vino (novedades) · `light` blanca con sombra (sobre imágenes) ·
   * `sun` amarillo sólido (exclusivos) · `glass` translúcida (sobre fondos de color).
   */
  tone?: PillTone;
  /** `md` mide 24 px de alto; `sm` mide 18 px y va sobre miniaturas. */
  size?: 'md' | 'sm';
};

/** Etiqueta informativa no interactiva. */
export function Pill({ label, tone = 'promo', size = 'md', style, ...rest }: PillProps) {
  const theme = useTheme();

  const tones = {
    promo: { backgroundColor: theme.primarySoft, color: theme.primary },
    success: { backgroundColor: theme.successSoft, color: theme.successText },
    rating: { backgroundColor: theme.warningSoft, color: theme.warningText },
    dark: { backgroundColor: theme.contrast, color: theme.onContrast },
    light: { backgroundColor: theme.backgroundElement, color: theme.text },
    sun: { backgroundColor: theme.warning, color: theme.text },
    glass: { backgroundColor: 'rgba(255, 255, 255, 0.2)', color: Palette.blanco },
  } as const;
  const { backgroundColor, color } = tones[tone];

  return (
    <View
      style={[
        styles.base,
        size === 'sm' && styles.small,
        { backgroundColor },
        tone === 'light' && styles.elevated,
        style,
      ]}
      {...rest}>
      <Text numberOfLines={1} style={[size === 'sm' ? styles.smallText : Typography.pill, { color }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 24,
    paddingHorizontal: 9,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  small: {
    height: 18,
    paddingHorizontal: 7,
    borderRadius: 9,
  },
  smallText: {
    fontFamily: FontFamily.bold,
    fontSize: 10,
    lineHeight: 12,
  },
  elevated: {
    boxShadow: Shadows.pill,
  },
});
