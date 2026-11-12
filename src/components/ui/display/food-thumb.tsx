import type { ReactNode } from 'react';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { Gradients, Radius, type GradientName } from '@/theme';

export type FoodThumbProps = {
  /** Emoji que representa el local o el producto mientras no haya fotos. */
  emoji: string;
  /** Degradado de fondo. */
  gradient?: GradientName;
  /** Lado del cuadrado en px (92 en tarjetas de local, 52–64 en listas). */
  size?: number;
  /** Radio de las esquinas (16 por defecto). */
  radius?: number;
  /** Contenido superpuesto, como una `Pill` de descuento. */
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

/** Miniatura cuadrada con degradado y emoji. */
export function FoodThumb({
  emoji,
  gradient = 'coral',
  size = 92,
  radius = Radius.button,
  children,
  style,
}: FoodThumbProps) {
  const emojiSize = Math.round(size * 0.48);

  return (
    <View
      style={[
        styles.base,
        { width: size, height: size, borderRadius: radius, backgroundImage: Gradients[gradient] },
        style,
      ]}>
      <Text style={{ fontSize: emojiSize, lineHeight: Math.round(emojiSize * 1.22) }}>{emoji}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
