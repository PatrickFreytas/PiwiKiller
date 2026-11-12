import type { PropsWithChildren, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Gradients, ScreenMargin, Spacing, type GradientName } from '@/theme';

type HeroProps = PropsWithChildren<{
  /** Degradado de fondo. Si se omite, `children` debe cubrir el fondo (un mapa, por ejemplo). */
  gradient?: GradientName;
  /** Alto total en px, como en el diseño (incluye la zona de la barra de estado). */
  height: number;
  /** Botones a la izquierda de la fila superior (volver). */
  leading?: ReactNode;
  /** Botones a la derecha de la fila superior (compartir, favorito). */
  trailing?: ReactNode;
}>;

/**
 * Cabecera a sangre de una pantalla: fondo de color o mapa, decoración y una fila de botones
 * que respeta el área segura. Debajo suele ir un `Sheet` o una tarjeta que la solapa.
 */
export function Hero({ gradient, height, leading, trailing, children }: HeroProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.hero, { height }, gradient && { backgroundImage: Gradients[gradient] }]}>
      {children}
      <View style={[styles.actions, { top: Math.max(insets.top, Spacing.three) + Spacing.two }]}>
        <View style={styles.group}>{leading}</View>
        <View style={styles.group}>{trailing}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    overflow: 'hidden',
  },
  actions: {
    position: 'absolute',
    left: ScreenMargin,
    right: ScreenMargin,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  group: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
});
