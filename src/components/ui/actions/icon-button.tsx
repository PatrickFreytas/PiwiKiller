import type { ReactNode } from 'react';
import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '@/hooks/use-theme';
import { Palette, Radius, Shadows } from '@/theme';

import { Icon, type IconName } from '../display/icon';

export type IconButtonProps = {
  /** Ícono de la lista de `Icon`. Si se pasa `children`, se ignora. */
  icon?: IconName;
  /** Contenido propio en lugar del ícono (un emoji o un texto corto). */
  children?: ReactNode;
  /** Obligatorio: describe la acción para lectores de pantalla. */
  accessibilityLabel: string;
  /** `light` caja blanca (por defecto) · `whatsapp` caja verde con ícono blanco. */
  tone?: 'light' | 'whatsapp';
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

/** Caja de ícono de 44 px con radio 14 y sombra: volver, compartir, notificaciones, etc. */
export function IconButton({
  icon,
  children,
  accessibilityLabel,
  tone = 'light',
  onPress,
  style,
}: IconButtonProps) {
  const theme = useTheme();
  const isWhatsapp = tone === 'whatsapp';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      hitSlop={4}
      onPress={onPress}
      style={({ pressed }) => [
        styles.box,
        { backgroundColor: isWhatsapp ? theme.whatsapp : theme.backgroundElement },
        pressed && styles.pressed,
        style,
      ]}>
      {children ??
        (icon ? <Icon name={icon} color={isWhatsapp ? Palette.blanco : undefined} /> : null)}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 44,
    height: 44,
    borderRadius: Radius.input,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: Shadows.iconBox,
  },
  pressed: {
    opacity: 0.7,
  },
});
