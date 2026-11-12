import { StyleSheet, Text, View } from 'react-native';

import { Palette, Radius, Typography } from '@/theme';

type ColorSwatchProps = {
  name: string;
  hex: string;
  /** Color del texto sobre la muestra. */
  textColor: string;
  /** Dibuja un borde fino (para colores casi blancos). */
  outlined?: boolean;
};

/** Muestra de color de la guía de estilo: nombre y código hexadecimal. */
export function ColorSwatch({ name, hex, textColor, outlined = false }: ColorSwatchProps) {
  return (
    <View style={[styles.swatch, { backgroundColor: hex }, outlined && styles.outlined]}>
      <Text style={[Typography.label, { color: textColor }]}>{name}</Text>
      <Text style={[Typography.label, { color: textColor }]}>{hex}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  swatch: {
    flexGrow: 1,
    flexBasis: 168,
    height: 96,
    padding: 12,
    borderRadius: Radius.button,
    justifyContent: 'flex-end',
  },
  outlined: {
    borderWidth: 1,
    borderColor: Palette.borde,
  },
});
