import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { useTheme } from '@/hooks/use-theme';
import { Radius, Shadows, Spacing, Typography } from '@/theme';

export type ButtonProps = Omit<PressableProps, 'children' | 'style'> & {
  /** Texto del botón, en tipo oración. */
  label: string;
  /** `primary` es el CTA coral (uno solo por pantalla); `secondary` es blanco con borde. */
  variant?: 'primary' | 'secondary';
  /** Muestra un indicador de carga y bloquea el botón. */
  loading?: boolean;
  /** Ocupa todo el ancho disponible. */
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
};

/** Botón de la guía de estilo: 54 px de alto, radio 16, texto 16 ExtraBold. */
export function Button({
  label,
  variant = 'primary',
  loading = false,
  fullWidth = false,
  disabled,
  style,
  ...rest
}: ButtonProps) {
  const theme = useTheme();
  const isPrimary = variant === 'primary';
  const isDisabled = disabled || loading;
  const textColor = isPrimary ? theme.onPrimary : theme.text;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!isDisabled, busy: loading }}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        isPrimary
          ? { backgroundColor: theme.primary, boxShadow: Shadows.primaryButton }
          : {
              backgroundColor: theme.backgroundElement,
              borderWidth: 1,
              borderColor: theme.border,
            },
        fullWidth && styles.fullWidth,
        pressed && styles.pressed,
        isDisabled && styles.disabled,
        isDisabled && isPrimary && styles.noShadow,
        style,
      ]}
      {...rest}>
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text numberOfLines={1} style={[Typography.button, { color: textColor }]}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 54,
    paddingHorizontal: Spacing.four,
    borderRadius: Radius.button,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    opacity: 0.5,
  },
  noShadow: {
    boxShadow: 'none',
  },
});
