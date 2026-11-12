import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Screen } from '@/components/layout';
import { Chip, ThemedText } from '@/components/ui';
import { ScreenMargin } from '@/theme';

import { OrderCard } from '../components/order-card';
import { DEMO_ORDERS, type OrderStatus } from '../data';

type Filter = 'todos' | OrderStatus;

/** "08 · Mis pedidos": pedido en curso, pedidos anteriores y filtros por estado. */
export function OrdersScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>('todos');

  const activeCount = DEMO_ORDERS.filter((order) => order.status === 'en_curso').length;
  const filters: { id: Filter; label: string }[] = [
    { id: 'todos', label: 'Todos' },
    { id: 'en_curso', label: activeCount > 0 ? `En curso · ${activeCount}` : 'En curso' },
    { id: 'entregado', label: 'Entregados' },
    { id: 'cancelado', label: 'Cancelados' },
  ];

  const visible = DEMO_ORDERS.filter((order) => filter === 'todos' || order.status === filter);
  const active = visible.filter((order) => order.status === 'en_curso');
  const previous = visible.filter((order) => order.status !== 'en_curso');

  const renderOrders = (orders: typeof DEMO_ORDERS) =>
    orders.map((order) => (
      <OrderCard
        key={order.id}
        order={order}
        onTrack={() => router.push('/seguimiento')}
        onReorder={() => router.push('/carrito')}
      />
    ));

  return (
    <Screen withTabBar gap={16}>
      <ThemedText type="heading">Mis pedidos</ThemedText>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.bleed}
        contentContainerStyle={styles.chips}>
        {filters.map((item) => (
          <Chip
            key={item.id}
            label={item.label}
            selected={item.id === filter}
            onPress={() => setFilter(item.id)}
          />
        ))}
      </ScrollView>

      {active.length > 0 ? (
        <View style={styles.group}>
          <ThemedText type="overline" themeColor="textSecondary">
            EN CURSO
          </ThemedText>
          {renderOrders(active)}
        </View>
      ) : null}

      {previous.length > 0 ? (
        <View style={styles.group}>
          <ThemedText type="overline" themeColor="textSecondary">
            ANTERIORES
          </ThemedText>
          {renderOrders(previous)}
        </View>
      ) : null}

      {visible.length === 0 ? (
        <ThemedText themeColor="textSecondary">No tienes pedidos en este estado.</ThemedText>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  bleed: {
    marginHorizontal: -ScreenMargin,
    flexGrow: 0,
  },
  chips: {
    paddingHorizontal: ScreenMargin,
    gap: 12,
  },
  group: {
    gap: 12,
  },
});
