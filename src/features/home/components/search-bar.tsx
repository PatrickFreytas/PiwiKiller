import { Pressable, StyleSheet, View } from 'react-native';

import { Icon, ThemedText } from '@/components/ui';
import { useTheme } from '@/hooks/use-theme';
import { Radius, Shadows, Typography } from '@/theme';

/** Buscador de Inicio. Es un acceso: al tocarlo lleva a la pestaña Buscar. */
export function SearchBar({ onPress }: { onPress: () => void }) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="search"
      accessibilityLabel="Buscar platos o locales"
      onPress={onPress}
      style={({ pressed }) => [
        styles.bar,
        { backgroundColor: theme.backgroundElement },
        pressed && styles.pressed,
      ]}>
      <Icon name="search" themeColor="textSecondary" />
      <ThemedText themeColor="textSecondary" numberOfLines={1} style={styles.placeholder}>
        Busca platos o locales…
      </ThemedText>
      <View style={[styles.filters, { backgroundColor: theme.primarySoft }]}>
        <Icon name="filters" size={18} themeColor="primary" />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 54,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: Radius.button,
    boxShadow: Shadows.field,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  placeholder: {
    ...Typography.input,
    flex: 1,
  },
  filters: {
    width: 36,
    height: 36,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.85,
  },
});
