import type { PropsWithChildren } from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '@/hooks/use-theme';
import { Radius, Shadows } from '@/theme';

export type CardProps = PropsWithChildren<{
  /** Si se indica, la tarjeta completa es presionable. */
  onPress?: () => void;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}>;

/** Tarjeta base: superficie blanca, radio 20 y sombra suave. El contenido lo pone cada pantalla. */
export function Card({ children, onPress, accessibilityLabel, style }: CardProps) {
  const theme = useTheme();
  const surface = [styles.base, { backgroundColor: theme.backgroundElement }];

  if (!onPress) {
    return <View style={[surface, style]}>{children}</View>;
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={({ pressed }) => [surface, pressed && styles.pressed, style]}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: Radius.card,
    boxShadow: Shadows.card,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
});
