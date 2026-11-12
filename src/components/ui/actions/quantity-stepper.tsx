import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '@/hooks/use-theme';
import { FontFamily, Radius } from '@/theme';

export type QuantityStepperProps = {
  value: number;
  onChange: (value: number) => void;
  /** Valor mínimo permitido (1 por defecto; 0 permite quitar el producto). */
  min?: number;
  max?: number;
  /** `lg` 54 px con botones blancos (pie de producto) · `sm` 28 px compacto (carrito). */
  size?: 'lg' | 'sm';
  style?: StyleProp<ViewStyle>;
};

/** Selector de cantidad con botones − y +. */
export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  size = 'lg',
  style,
}: QuantityStepperProps) {
  const theme = useTheme();
  const isLarge = size === 'lg';
  const canDecrease = value > min;
  const canIncrease = value < max;

  const buttonStyle = isLarge
    ? [styles.largeButton, { backgroundColor: theme.backgroundElement }]
    : styles.smallButton;
  const signStyle = isLarge ? styles.largeSign : styles.smallSign;

  return (
    <View
      style={[
        isLarge ? styles.large : styles.small,
        { backgroundColor: theme.backgroundMuted },
        style,
      ]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Quitar uno"
        disabled={!canDecrease}
        hitSlop={6}
        onPress={() => onChange(value - 1)}
        style={[buttonStyle, !canDecrease && styles.disabled]}>
        <Text style={[signStyle, { color: theme.text }]}>−</Text>
      </Pressable>
      <Text style={[styles.value, { color: theme.text }]}>{value}</Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Agregar uno"
        disabled={!canIncrease}
        hitSlop={6}
        onPress={() => onChange(value + 1)}
        style={[buttonStyle, !canIncrease && styles.disabled]}>
        <Text style={[signStyle, { color: isLarge ? theme.text : theme.primary }]}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  large: {
    width: 130,
    height: 54,
    padding: 6,
    borderRadius: Radius.button,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  small: {
    width: 66,
    height: 28,
    paddingHorizontal: 4,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  largeButton: {
    width: 42,
    height: 42,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallButton: {
    width: 20,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeSign: {
    fontFamily: FontFamily.bold,
    fontSize: 22,
    lineHeight: 26,
  },
  smallSign: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
    lineHeight: 20,
  },
  value: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
    lineHeight: 20,
    minWidth: 14,
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.4,
  },
});
