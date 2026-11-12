import type { ViewStyle } from 'react-native';

/** Degradados de la guía de estilo, como valores de `backgroundImage`. */
export const Gradients = {
  /** Miniatura de local o producto: coral claro a coral. */
  coral: 'linear-gradient(135deg, #FFB3C1 0%, #FF5A79 100%)',
  /** Banner de promoción: vino a vino claro. */
  vino: 'linear-gradient(120deg, #3D0A2A 0%, #6B1440 100%)',
} as const satisfies Record<string, ViewStyle['backgroundImage']>;
