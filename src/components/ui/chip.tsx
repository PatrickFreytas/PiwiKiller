import {
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { useTheme } from '@/hooks/use-theme';
import { Radius, Typography } from '@/theme';

export type ChipProps = Omit<PressableProps, 'children' | 'style'> & {
  /** Texto del chip; puede llevar un emoji delante ("🍗 Pollo"). */
  label: string;
  /** Chip activo: fondo vino y texto blanco. */
  selected?: boolean;
  style?: StyleProp<ViewStyle>;
};

/** Chip de filtro o categoría: 36 px de alto, totalmente redondeado, texto 13 SemiBold. */
export function Chip({ label, selected = false, style, ...rest }: ChipProps) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={({ pressed }) => [
        styles.base,
        selected
          ? { backgroundColor: theme.contrast, borderColor: theme.contrast }
          : { backgroundColor: theme.backgroundElement, borderColor: theme.border },
        pressed && styles.pressed,
        style,
      ]}
      {...rest}>
      <Text
        numberOfLines={1}
        style={[Typography.chip, { color: selected ? theme.onContrast : theme.text }]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 36,
    paddingHorizontal: 15,
    borderRadius: Radius.full,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  pressed: {
    opacity: 0.8,
  },
});
