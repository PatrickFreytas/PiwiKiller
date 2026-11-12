import type { ReactNode } from 'react';
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
import { FontFamily, Palette, Radius, Shadows, Spacing, Typography } from '@/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'soft' | 'whatsapp';
export type ButtonSize = 'lg' | 'md' | 'sm';

export type ButtonProps = Omit<PressableProps, 'children' | 'style'> & {
  /** Texto del botón, en tipo oración. */
  label: string;
  /**
   * `primary` CTA coral (uno solo por pantalla) · `secondary` blanco con borde ·
   * `soft` coral claro con texto coral · `whatsapp` verde para compartir.
   */
  variant?: ButtonVariant;
  /** `lg` 54 px (CTA) · `md` 44 px (dentro de tarjetas) · `sm` 42 px (acciones secundarias). */
  size?: ButtonSize;
  /** Contenido antes del texto (contador del carrito, ícono). */
  leading?: ReactNode;
  /** Texto destacado después del label (precio, total). */
  trailing?: string;
  /** Muestra un indicador de carga y bloquea el botón. */
  loading?: boolean;
  /** Ocupa todo el ancho disponible. */
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
};

/** Botón de la guía de estilo. */
export function Button({
  label,
  variant = 'primary',
  size = 'lg',
  leading,
  trailing,
  loading = false,
  fullWidth = false,
  disabled,
  style,
  ...rest
}: ButtonProps) {
  const theme = useTheme();
  const isDisabled = disabled || loading;

  const variants = {
    primary: { backgroundColor: theme.primary, color: theme.onPrimary },
    secondary: { backgroundColor: theme.backgroundElement, color: theme.text },
    soft: { backgroundColor: theme.primarySoft, color: theme.primary },
    whatsapp: { backgroundColor: theme.whatsapp, color: Palette.blanco },
  } as const;
  const { backgroundColor, color } = variants[variant];
  const hasGlow = variant === 'primary' && size === 'lg' && !isDisabled;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!isDisabled, busy: loading }}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        sizes[size],
        { backgroundColor },
        variant === 'secondary' && { borderWidth: 1, borderColor: theme.border },
        hasGlow && styles.glow,
        fullWidth && styles.fullWidth,
        pressed && styles.pressed,
        isDisabled && styles.disabled,
        style,
      ]}
      {...rest}>
      {loading ? (
        <ActivityIndicator color={color} />
      ) : (
        <>
          {leading}
          <Text numberOfLines={1} style={[labels[size], { color }]}>
            {label}
          </Text>
          {trailing ? (
            <Text numberOfLines={1} style={[labels[size], { color }]}>
              {trailing}
            </Text>
          ) : null}
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    gap: Spacing.two,
  },
  glow: {
    boxShadow: Shadows.primaryButton,
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
});

const sizes = StyleSheet.create({
  lg: { height: 54, paddingHorizontal: Spacing.four, borderRadius: Radius.button },
  md: { height: 44, paddingHorizontal: Spacing.three, borderRadius: Radius.pill },
  sm: { height: 42, paddingHorizontal: 14, borderRadius: Radius.pill },
});

const labels = StyleSheet.create({
  lg: Typography.button,
  md: { fontFamily: FontFamily.extraBold, fontSize: 14, lineHeight: 17 },
  sm: { fontFamily: FontFamily.extraBold, fontSize: 13, lineHeight: 16 },
});
