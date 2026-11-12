import type { PropsWithChildren, ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/hooks/use-theme';
import { BottomTabInset, MaxContentWidth, ScreenMargin, Spacing, type ThemeColor } from '@/theme';

type ScreenProps = PropsWithChildren<{
  /** Si es `false`, el contenido no hace scroll. */
  scrollable?: boolean;
  /**
   * Contenido a sangre: sin márgenes laterales ni margen superior.
   * Para pantallas con cabecera de color o mapa; cada bloque pone su propio margen.
   */
  edgeToEdge?: boolean;
  /** `true` en las pantallas de pestaña: deja espacio para la barra inferior. */
  withTabBar?: boolean;
  /** Barra fija al pie (total y botón de pago, por ejemplo). */
  footer?: ReactNode;
  /** Separación vertical entre bloques (24 por defecto). */
  gap?: number;
  /** Color de fondo del tema (`background` por defecto). */
  background?: ThemeColor;
}>;

/**
 * Contenedor base de todas las pantallas: aplica el fondo del tema,
 * respeta las áreas seguras y la barra de pestañas, y centra el contenido.
 */
export function Screen({
  children,
  scrollable = true,
  edgeToEdge = false,
  withTabBar = false,
  footer,
  gap = Spacing.four,
  background = 'background',
}: ScreenProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const backgroundColor = theme[background];

  const bottomInset = withTabBar ? insets.bottom + BottomTabInset : footer ? 0 : insets.bottom;
  const padding = {
    paddingTop: edgeToEdge ? 0 : insets.top + Spacing.three,
    paddingBottom: bottomInset + Spacing.four,
    paddingLeft: edgeToEdge ? 0 : insets.left + ScreenMargin,
    paddingRight: edgeToEdge ? 0 : insets.right + ScreenMargin,
  };

  const footerNode = footer ? (
    <View
      style={[
        styles.footer,
        {
          backgroundColor: theme.backgroundElement,
          borderTopColor: theme.border,
          paddingBottom: insets.bottom + Spacing.three,
        },
      ]}>
      <View style={styles.footerContent}>{footer}</View>
    </View>
  ) : null;

  return (
    <View style={[styles.root, { backgroundColor }]}>
      {scrollable ? (
        <ScrollView
          style={styles.root}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[styles.center, padding]}>
          <View style={[styles.content, { gap }]}>{children}</View>
        </ScrollView>
      ) : (
        <View style={[styles.root, styles.center, padding]}>
          <View style={[styles.content, styles.fill, { gap }]}>{children}</View>
        </View>
      )}
      {footerNode}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
  },
  content: {
    width: '100%',
    maxWidth: MaxContentWidth,
  },
  fill: {
    flex: 1,
  },
  footer: {
    borderTopWidth: 1,
    paddingTop: 15,
    paddingHorizontal: ScreenMargin,
    alignItems: 'center',
  },
  footerContent: {
    width: '100%',
    maxWidth: MaxContentWidth,
  },
});
