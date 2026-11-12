import type { ReactNode } from 'react';
import { StyleSheet, View, type DimensionValue, type StyleProp, type ViewStyle } from 'react-native';

import { Palette, Radius } from '@/theme';

type Block = {
  left: DimensionValue;
  top: DimensionValue;
  width: DimensionValue;
  height: DimensionValue;
  color: string;
};

const ROADS_VERTICAL: DimensionValue[] = ['30%', '69%'];
const ROADS_HORIZONTAL: DimensionValue[] = ['27%', '64%'];
const BLOCKS: Block[] = [
  { left: '8%', top: '46%', width: '18%', height: '14%', color: Palette.mapaVerde },
  { left: '38%', top: '7%', width: '26%', height: '18%', color: Palette.mapaAzul },
  { left: '77%', top: '74%', width: '20%', height: '16%', color: Palette.mapaVerde },
];

export type MapPlaceholderProps = {
  /** Alto del mapa en px. */
  height: number;
  /** Marcadores y controles, posicionados de forma absoluta sobre el mapa. */
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

/**
 * Mapa ilustrado del diseño (calles y manzanas dibujadas).
 * El mapa real en tiempo real queda fuera del MVP; este componente ocupa su lugar.
 */
export function MapPlaceholder({ height, children, style }: MapPlaceholderProps) {
  return (
    <View style={[styles.map, { height }, style]}>
      {BLOCKS.map((block) => (
        <View
          key={`${String(block.left)}-${String(block.top)}`}
          style={[
            styles.block,
            {
              left: block.left,
              top: block.top,
              width: block.width,
              height: block.height,
              backgroundColor: block.color,
            },
          ]}
        />
      ))}
      {ROADS_VERTICAL.map((left) => (
        <View key={String(left)} style={[styles.roadVertical, { left }]} />
      ))}
      {ROADS_HORIZONTAL.map((top) => (
        <View key={String(top)} style={[styles.roadHorizontal, { top }]} />
      ))}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    backgroundColor: Palette.mapa,
    overflow: 'hidden',
  },
  block: {
    position: 'absolute',
    borderRadius: Radius.pill,
  },
  roadVertical: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 14,
    backgroundColor: Palette.blanco,
  },
  roadHorizontal: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 14,
    backgroundColor: Palette.blanco,
  },
});
