import type { ViewStyle } from 'react-native';

/** Sombras de la guía de estilo, como valores de `boxShadow`. */
export const Shadows = {
  /** Botón principal: resplandor coral. */
  primaryButton: '0px 8px 20px rgba(255, 90, 121, 0.35)',
  /** Tarjetas de locales y productos. */
  card: '0px 4px 18px rgba(61, 10, 42, 0.07)',
  /** Buscador y filas elevadas. */
  field: '0px 4px 16px rgba(61, 10, 42, 0.08)',
  /** Cajas de ícono (44 px). */
  iconBox: '0px 2px 10px rgba(61, 10, 42, 0.08)',
  /** Pills blancas sobre imágenes. */
  pill: '0px 2px 8px rgba(61, 10, 42, 0.12)',
} as const satisfies Record<string, ViewStyle['boxShadow']>;
