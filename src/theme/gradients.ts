import type { ViewStyle } from 'react-native';

/** Degradados del diseño, como valores de `backgroundImage`. */
export const Gradients = {
  /** Miniaturas de comida: coral claro a coral. */
  coral: 'linear-gradient(135deg, #FFB3C1 0%, #FF5A79 100%)',
  /** Miniaturas: amarillo a naranja. */
  sol: 'linear-gradient(135deg, #FFD66B 0%, #FF9F1C 100%)',
  /** Miniaturas y cabeceras: menta. */
  menta: 'linear-gradient(135deg, #7BE0B5 0%, #12B886 100%)',
  /** Miniaturas: celeste a azul. */
  cielo: 'linear-gradient(135deg, #8FD3FF 0%, #2A8CFF 100%)',
  /** Miniaturas y cabeceras: rosa a frambuesa. */
  frambuesa: 'linear-gradient(135deg, #FF9AA8 0%, #E63E5C 100%)',
  /** Avatar: lila a plum. */
  plum: 'linear-gradient(135deg, #B9A6FF 0%, #5B2EFF 100%)',
  /** Banner de promoción: vino a vino claro. */
  vino: 'linear-gradient(120deg, #3D0A2A 0%, #6B1440 100%)',
  /** Tarjeta de Tude Puntos: coral a coral claro. */
  puntos: 'linear-gradient(135deg, #FF5A79 0%, #FF8FA3 100%)',
  /** Cabecera de inicio de sesión. */
  bienvenida: 'linear-gradient(150deg, #FF8FA3 0%, #FF5A79 60%, #E8395F 100%)',
} as const satisfies Record<string, ViewStyle['backgroundImage']>;

export type GradientName = keyof typeof Gradients;
