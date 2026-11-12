import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ThemedText } from '@/components/ui';
import { useTheme } from '@/hooks/use-theme';
import { FontFamily, Palette, Radius, Shadows, Typography } from '@/theme';

type ServiceTilesProps = {
  /** Cantidad de locales activos, para el subtítulo de "Comida". */
  localCount: number | null;
  onFoodPress: () => void;
  onRidePress: () => void;
  onDeliveryPress: () => void;
};

/** Accesos de Inicio: Comida (grande) y, a la derecha, Mototaxi y Envíos. */
export function ServiceTiles({
  localCount,
  onFoodPress,
  onRidePress,
  onDeliveryPress,
}: ServiceTilesProps) {
  const theme = useTheme();

  return (
    <View style={styles.row}>
      <Pressable
        accessibilityRole="button"
        onPress={onFoodPress}
        style={({ pressed }) => [
          styles.food,
          { backgroundColor: theme.primary },
          pressed && styles.pressed,
        ]}>
        <Text style={styles.foodEmoji}>🍔</Text>
        <Text style={styles.foodTitle}>Comida</Text>
        <Text style={styles.foodSubtitle}>
          {localCount === null ? 'Locales cerca de ti' : `${localCount} locales`}
        </Text>
      </Pressable>

      <View style={styles.column}>
        <SmallTile emoji="🛺" title="Mototaxi" subtitle="Tú pones el precio" onPress={onRidePress} />
        <SmallTile
          emoji="📦"
          title="Envíos"
          subtitle="Paquetes y mandados"
          onPress={onDeliveryPress}
        />
      </View>
    </View>
  );
}

type SmallTileProps = {
  emoji: string;
  title: string;
  subtitle: string;
  onPress: () => void;
};

function SmallTile({ emoji, title, subtitle, onPress }: SmallTileProps) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.small,
        { backgroundColor: theme.backgroundElement },
        pressed && styles.pressed,
      ]}>
      <Text style={styles.smallEmoji}>{emoji}</Text>
      <View style={styles.smallText}>
        <ThemedText type="label">{title}</ThemedText>
        <ThemedText type="meta" themeColor="textSecondary" numberOfLines={2}>
          {subtitle}
        </ThemedText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  food: {
    flex: 21,
    minHeight: 112,
    padding: 14,
    borderRadius: Radius.card,
    overflow: 'hidden',
  },
  foodEmoji: {
    position: 'absolute',
    right: 8,
    bottom: -8,
    fontSize: 58,
    lineHeight: 70,
  },
  foodTitle: {
    fontFamily: FontFamily.bold,
    fontSize: 17,
    lineHeight: 20,
    color: Palette.blanco,
  },
  foodSubtitle: {
    ...Typography.caption,
    color: Palette.blanco,
  },
  column: {
    flex: 13,
    gap: 10,
  },
  small: {
    flex: 1,
    minHeight: 51,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: Radius.button,
    boxShadow: Shadows.tile,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  smallEmoji: {
    fontSize: 24,
    lineHeight: 29,
  },
  smallText: {
    flex: 1,
    minWidth: 0,
  },
  pressed: {
    opacity: 0.85,
  },
});
