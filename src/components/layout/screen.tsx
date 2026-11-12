import type { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/hooks/use-theme';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/theme';

type ScreenProps = PropsWithChildren<{
  /** Si es `false`, el contenido no hace scroll. */
  scrollable?: boolean;
}>;

/**
 * Contenedor base de todas las pantallas: aplica el fondo del tema,
 * respeta las áreas seguras y la barra de pestañas, y centra el contenido.
 */
export function Screen({ children, scrollable = true }: ScreenProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const padding = {
    paddingTop: insets.top + Spacing.four,
    paddingBottom: insets.bottom + BottomTabInset + Spacing.three,
    paddingLeft: insets.left + Spacing.four,
    paddingRight: insets.right + Spacing.four,
  };

  if (!scrollable) {
    return (
      <View style={[styles.root, styles.center, padding, { backgroundColor: theme.background }]}>
        <View style={[styles.content, styles.fill]}>{children}</View>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.root, { backgroundColor: theme.background }]}
      contentContainerStyle={[styles.center, padding]}>
      <View style={styles.content}>{children}</View>
    </ScrollView>
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
    gap: Spacing.four,
  },
  fill: {
    flex: 1,
  },
});
