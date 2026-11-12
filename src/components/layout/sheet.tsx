import type { PropsWithChildren } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '@/hooks/use-theme';
import { Radius, ScreenMargin, type ThemeColor } from '@/theme';

type SheetProps = PropsWithChildren<{
  /** Color de fondo del tema (`background` por defecto). */
  background?: ThemeColor;
  /** Muestra el asa gris superior de los paneles sobre un mapa. */
  handle?: boolean;
  style?: StyleProp<ViewStyle>;
}>;

/**
 * Panel con esquinas superiores de 28 px que sube sobre una cabecera de color o un mapa.
 * Va justo después de la cabecera, dentro de un `Screen` con `edgeToEdge`.
 */
export function Sheet({ children, background = 'background', handle = false, style }: SheetProps) {
  const theme = useTheme();

  return (
    <View style={[styles.sheet, { backgroundColor: theme[background] }, style]}>
      {handle ? <View style={[styles.handle, { backgroundColor: theme.handle }]} /> : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    marginTop: -Radius.sheet,
    paddingTop: 22,
    paddingHorizontal: ScreenMargin,
    borderTopLeftRadius: Radius.sheet,
    borderTopRightRadius: Radius.sheet,
  },
  handle: {
    width: 40,
    height: 5,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: -10,
    marginBottom: 14,
  },
});
