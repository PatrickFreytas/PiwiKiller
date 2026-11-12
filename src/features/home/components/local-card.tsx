import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Card, FoodThumb, Pill, ThemedText } from '@/components/ui';
import { formatPrice } from '@/config/demo';
import { useTheme } from '@/hooks/use-theme';
import type { GradientName } from '@/theme';

export type LocalCardProps = {
  name: string;
  /** Categorías o tipo de comida del local. */
  subtitle: string;
  emoji: string;
  gradient: GradientName;
  rating: number;
  /** Minutos estimados de entrega. */
  deliveryMinutes: number;
  /** Costo de envío en soles; 0 se muestra como "Envío gratis". */
  deliveryFee: number;
  /** Precio del producto más barato. */
  priceFrom: number | null;
  open: boolean;
  onPress: () => void;
};

/** Tarjeta de local de "Cerca de ti": miniatura, nombre, calificación, tiempo y envío. */
export function LocalCard({
  name,
  subtitle,
  emoji,
  gradient,
  rating,
  deliveryMinutes,
  deliveryFee,
  priceFrom,
  open,
  onPress,
}: LocalCardProps) {
  const theme = useTheme();
  const [favorite, setFavorite] = useState(false);
  const from = Math.max(deliveryMinutes - 5, 5);

  return (
    <Card style={[styles.card, !open && styles.closed]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={name}
        onPress={onPress}
        style={({ pressed }) => [styles.content, pressed && styles.pressed]}>
        <FoodThumb emoji={emoji} gradient={gradient}>
          {!open ? <Pill label="Cerrado" tone="dark" size="sm" style={styles.badge} /> : null}
        </FoodThumb>

        <View style={styles.info}>
          <ThemedText type="subtitle" numberOfLines={1} style={styles.title}>
            {name}
          </ThemedText>
          <ThemedText type="caption" themeColor="textSecondary" numberOfLines={1}>
            {subtitle}
          </ThemedText>

          <View style={styles.metaRow}>
            <Pill label={`★ ${rating.toFixed(1)}`} tone="rating" />
            <ThemedText type="meta" themeColor="textSecondary">
              ⏱ {from}–{deliveryMinutes + 5} min
            </ThemedText>
          </View>

          <View style={styles.metaRow}>
            {deliveryFee === 0 ? (
              <Pill label="Envío gratis" tone="success" size="sm" />
            ) : (
              <ThemedText type="metaBold" themeColor="successText">
                Envío {formatPrice(deliveryFee)}
              </ThemedText>
            )}
            {priceFrom !== null ? (
              <ThemedText type="meta" themeColor="textSecondary">
                · desde {formatPrice(priceFrom)}
              </ThemedText>
            ) : null}
          </View>
        </View>
      </Pressable>

      {/* El corazón va fuera del área presionable de la tarjeta: un botón no puede contener otro. */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        hitSlop={8}
        onPress={() => setFavorite((value) => !value)}
        style={styles.favorite}>
        <Text style={[styles.heart, { color: favorite ? theme.primary : theme.iconMuted }]}>
          {favorite ? '♥' : '♡'}
        </Text>
      </Pressable>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
  },
  pressed: {
    opacity: 0.85,
  },
  closed: {
    opacity: 0.6,
  },
  badge: {
    position: 'absolute',
    top: 6,
    left: 6,
  },
  info: {
    flex: 1,
    minWidth: 0,
    gap: 6,
  },
  title: {
    paddingRight: 32,
  },
  favorite: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  heart: {
    fontSize: 20,
    lineHeight: 24,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
});
