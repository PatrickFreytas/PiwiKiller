import { StyleSheet, View } from 'react-native';

import { Button, Card, FoodThumb, Pill, ThemedText } from '@/components/ui';
import { useTheme } from '@/hooks/use-theme';
import { Radius } from '@/theme';

import type { Order } from '../data';

type OrderCardProps = {
  order: Order;
  onTrack: () => void;
  onReorder: () => void;
};

/** Tarjeta de pedido: en curso (borde coral y "Seguir pedido") o anterior (calificar y repetir). */
export function OrderCard({ order, onTrack, onReorder }: OrderCardProps) {
  const theme = useTheme();
  const isActive = order.status === 'en_curso';
  const isDelivered = order.status === 'entregado';

  return (
    <Card style={[styles.card, isActive && { borderWidth: 2, borderColor: theme.primary }]}>
      <View style={styles.header}>
        <FoodThumb
          emoji={order.emoji}
          gradient={order.gradient}
          size={52}
          radius={Radius.input}
        />
        <View style={styles.text}>
          <ThemedText type="subtitle" numberOfLines={1}>
            {order.local}
          </ThemedText>
          <ThemedText type="meta" themeColor="textSecondary" numberOfLines={1}>
            {order.summary}
          </ThemedText>
          {isDelivered ? (
            <ThemedText type="metaBold" themeColor="successText" numberOfLines={1}>
              ✓ Entregado{order.rating ? ` · ★ ${order.rating} tu calificación` : ''}
            </ThemedText>
          ) : null}
          {order.status === 'cancelado' ? (
            <ThemedText type="metaBold" themeColor="textSecondary">
              Cancelado
            </ThemedText>
          ) : null}
        </View>
        {isActive && order.eta ? <Pill label={order.eta} tone="promo" /> : null}
      </View>

      {isActive ? (
        <Button fullWidth size="md" label="Seguir pedido" onPress={onTrack} />
      ) : (
        <View style={styles.actions}>
          {isDelivered && !order.rating ? (
            <Button size="sm" variant="secondary" label="★ Calificar" style={styles.action} />
          ) : null}
          <Button
            size="sm"
            variant="soft"
            label="↻ Pedir de nuevo"
            onPress={onReorder}
            style={styles.action}
          />
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 14,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  text: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  action: {
    flex: 1,
    alignSelf: 'auto',
  },
});
