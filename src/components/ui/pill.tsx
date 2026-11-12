import { StyleSheet, Text, View, type ViewProps } from 'react-native';

import { useTheme } from '@/hooks/use-theme';
import { Radius, Shadows, Typography } from '@/theme';

export type PillTone = 'promo' | 'success' | 'rating' | 'dark' | 'light';

export type PillProps = ViewProps & {
  /** Texto corto: "-20%", "Envío gratis", "★ 4.8", "Nuevo", "⏱ 15–25 min". */
  label: string;
  /**
   * `promo` coral (descuentos) · `success` menta (envío gratis) · `rating` sol (calificación) ·
   * `dark` vino (novedades) · `light` blanca con sombra (tiempo, sobre imágenes).
   */
  tone?: PillTone;
};

/** Etiqueta informativa no interactiva: 24 px de alto, radio 12, texto 11 Bold. */
export function Pill({ label, tone = 'promo', style, ...rest }: PillProps) {
  const theme = useTheme();

  const tones = {
    promo: { backgroundColor: theme.primarySoft, color: theme.primary },
    success: { backgroundColor: theme.successSoft, color: theme.successText },
    rating: { backgroundColor: theme.warningSoft, color: theme.warningText },
    dark: { backgroundColor: theme.contrast, color: theme.onContrast },
    light: { backgroundColor: theme.backgroundElement, color: theme.text },
  } as const;
  const { backgroundColor, color } = tones[tone];

  return (
    <View
      style={[styles.base, { backgroundColor }, tone === 'light' && styles.elevated, style]}
      {...rest}>
      <Text numberOfLines={1} style={[Typography.pill, { color }]}>
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
  elevated: {
    boxShadow: Shadows.pill,
  },
});
