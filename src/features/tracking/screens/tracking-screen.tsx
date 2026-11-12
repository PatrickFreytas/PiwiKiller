import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Hero, Screen, Sheet } from '@/components/layout';
import { FoodThumb, IconButton, MapPlaceholder, ThemedText } from '@/components/ui';
import { DemoLocal, formatPrice } from '@/config/demo';
import { useGoBack } from '@/hooks/use-go-back';
import { useTheme } from '@/hooks/use-theme';
import { FontFamily, Palette, Radius, Shadows, Spacing, Typography } from '@/theme';

import { OrderProgress } from '../components/order-progress';

/** Pedido de ejemplo del Figma ("06 · Seguimiento en vivo"). La HU-16 lo reemplaza por Realtime. */
const DEMO_ORDER = {
  code: '#TD-2048',
  eta: '13:10',
  minutesLeft: 6,
  currentStep: 2,
  items: 2,
  total: 9.5,
  paidWith: 'Yape',
  deliveryCode: '4 8 1 7',
  courier: { name: 'Jhon', rating: 4.9, vehicle: 'Moto roja', plate: '4521-UC' },
} as const;

const MAP_HEIGHT = 430;

/** "06 · Seguimiento en vivo": mapa, etapas del pedido, repartidor y código de entrega. */
export function TrackingScreen() {
  const goBack = useGoBack();
  const theme = useTheme();
  const order = DEMO_ORDER;

  return (
    <Screen edgeToEdge gap={0} background="backgroundElement">
      <Hero
        height={MAP_HEIGHT}
        leading={<IconButton icon="back" accessibilityLabel="Volver" onPress={goBack} />}>
        <MapPlaceholder height={MAP_HEIGHT}>
          <View style={[styles.marker, styles.localMarker, { backgroundColor: theme.contrast }]}>
            <Text style={styles.markerEmoji}>{DemoLocal.emoji}</Text>
          </View>
          <View
            style={[
              styles.marker,
              styles.courierMarker,
              { backgroundColor: theme.primary, borderColor: theme.backgroundElement },
            ]}>
            <Text style={styles.markerEmojiLarge}>🛵</Text>
          </View>
          <View
            style={[
              styles.marker,
              styles.homeMarker,
              { backgroundColor: theme.backgroundElement, borderColor: theme.contrast },
            ]}>
            <Text style={styles.markerEmojiSmall}>🏠</Text>
          </View>
        </MapPlaceholder>

        <View style={styles.etaWrapper} pointerEvents="none">
          <View style={[styles.eta, { backgroundColor: theme.backgroundElement }]}>
            <ThemedText type="label">Llega en</ThemedText>
            <Text style={[styles.etaValue, { color: theme.primary }]}>
              {order.minutesLeft} min
            </Text>
          </View>
        </View>
      </Hero>

      <Sheet background="backgroundElement" handle style={styles.sheet}>
        <View style={styles.titleBlock}>
          <ThemedText type="section">Tu pedido va en camino 🛵</ThemedText>
          <ThemedText type="caption" themeColor="textSecondary">
            Pedido {order.code} · Llegada estimada {order.eta}
          </ThemedText>
        </View>

        <OrderProgress currentStep={order.currentStep} />

        <View style={[styles.courier, { backgroundColor: theme.background }]}>
          <FoodThumb emoji="🧑🏽" gradient="coral" size={52} radius={26} />
          <View style={styles.grow}>
            <ThemedText type="subtitle">{order.courier.name} · tu repartidor</ThemedText>
            <ThemedText type="meta" themeColor="textSecondary">
              ★ {order.courier.rating} · {order.courier.vehicle} · Placa {order.courier.plate}
            </ThemedText>
          </View>
          <IconButton icon="chat" tone="whatsapp" accessibilityLabel="Escribir por WhatsApp" />
          <IconButton icon="phone" accessibilityLabel="Llamar al repartidor" />
        </View>

        <View style={[styles.orderRow, { borderColor: theme.border }]}>
          <View style={styles.grow}>
            <ThemedText type="bodyBold">
              {order.items} productos · {formatPrice(order.total)}
            </ThemedText>
            <ThemedText type="meta" themeColor="textSecondary">
              Pagado con {order.paidWith} ✓
            </ThemedText>
          </View>
          <Pressable accessibilityRole="button" hitSlop={Spacing.two}>
            <ThemedText type="label" themeColor="primary">
              Ver detalle
            </ThemedText>
          </Pressable>
        </View>

        <View style={styles.codeRow}>
          <ThemedText type="meta" themeColor="textSecondary">
            🔒 Código de entrega:
          </ThemedText>
          <View style={[styles.code, { backgroundColor: theme.contrast }]}>
            <Text style={styles.codeText}>{order.deliveryCode}</Text>
          </View>
        </View>
      </Sheet>
    </Screen>
  );
}

const styles = StyleSheet.create({
  marker: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  localMarker: {
    left: '15%',
    top: '29%',
    width: 44,
    height: 44,
    borderRadius: Radius.input,
  },
  courierMarker: {
    left: '64%',
    top: '64%',
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    boxShadow: Shadows.marker,
  },
  homeMarker: {
    left: '78%',
    top: '78%',
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
  },
  markerEmoji: {
    fontSize: 22,
    lineHeight: 26,
  },
  markerEmojiLarge: {
    fontSize: 22,
    lineHeight: 28,
  },
  markerEmojiSmall: {
    fontSize: 16,
    lineHeight: 20,
  },
  etaWrapper: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  eta: {
    height: 32,
    paddingHorizontal: 14,
    borderRadius: 16,
    boxShadow: Shadows.pill,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  etaValue: {
    fontFamily: FontFamily.black,
    fontSize: 13,
    lineHeight: 16,
  },
  sheet: {
    gap: 16,
  },
  titleBlock: {
    gap: 4,
  },
  grow: {
    flex: 1,
    minWidth: 0,
  },
  courier: {
    padding: 14,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  orderRow: {
    paddingHorizontal: 15,
    paddingVertical: 14,
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  code: {
    height: 26,
    paddingHorizontal: 10,
    borderRadius: 13,
    justifyContent: 'center',
  },
  codeText: {
    ...Typography.label,
    letterSpacing: 3,
    color: Palette.blanco,
  },
});
