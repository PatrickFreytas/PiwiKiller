import { useRouter } from 'expo-router';
import { Fragment, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components/layout';
import {
  Button,
  Card,
  Divider,
  FoodThumb,
  IconButton,
  QuantityStepper,
  ThemedText,
} from '@/components/ui';
import { DemoAddress, DemoLocal, formatPrice } from '@/config/demo';
import { useGoBack } from '@/hooks/use-go-back';
import { useTheme } from '@/hooks/use-theme';
import { Radius, Spacing, type ThemeColor } from '@/theme';

import { PaymentOption } from '../components/payment-option';
import {
  DEMO_CART_ITEMS,
  DEMO_DISCOUNT,
  PAYMENT_METHODS,
  type CartItem,
  type PaymentMethodId,
} from '../data';

/** "05 · Carrito y pago": productos, dirección, método de pago y resumen. */
export function CartScreen() {
  const router = useRouter();
  const goBack = useGoBack();
  const theme = useTheme();
  const [items, setItems] = useState<CartItem[]>(DEMO_CART_ITEMS);
  const [paymentId, setPaymentId] = useState<PaymentMethodId>('yape');

  const setQuantity = (id: string, quantity: number) => {
    setItems((current) =>
      current
        .map((item) => (item.id === id ? { ...item, quantity } : item))
        // Bajar a 0 quita el producto del carrito.
        .filter((item) => item.quantity > 0),
    );
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const hasDiscount = items.some((item) => item.id === DEMO_DISCOUNT.productId);
  const discount = hasDiscount ? DEMO_DISCOUNT.amount : 0;
  const total = subtotal - discount;
  const points = Math.round(subtotal);
  const payment = PAYMENT_METHODS.find((method) => method.id === paymentId) ?? PAYMENT_METHODS[0];
  const isEmpty = items.length === 0;

  const header = (
    <View style={styles.header}>
      <IconButton icon="back" accessibilityLabel="Volver" onPress={goBack} />
      <View style={styles.headerText}>
        <ThemedText type="section">Tu pedido</ThemedText>
        <ThemedText type="caption" themeColor="textSecondary">
          {DemoLocal.name} · {DemoLocal.deliveryTime}
        </ThemedText>
      </View>
    </View>
  );

  if (isEmpty) {
    return (
      <Screen gap={Spacing.three}>
        {header}
        <Card style={styles.empty}>
          <Text style={styles.emptyEmoji}>🛒</Text>
          <ThemedText type="subtitle">Tu carrito está vacío</ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.centerText}>
            Agrega algo rico del menú para continuar.
          </ThemedText>
          <Button label="Ver el menú" variant="soft" size="md" onPress={goBack} />
        </Card>
      </Screen>
    );
  }

  return (
    <Screen
      gap={Spacing.two}
      footer={
        <View style={styles.footer}>
          <View style={styles.totalRow}>
            <ThemedText type="subtitle">Total</ThemedText>
            <ThemedText type="title">{formatPrice(total)}</ThemedText>
          </View>
          <Button
            fullWidth
            label={payment.action}
            trailing={formatPrice(total)}
            onPress={() => router.push('/seguimiento')}
          />
        </View>
      }>
      {header}

      <Card style={styles.itemsCard}>
        {items.map((item, index) => (
          <Fragment key={item.id}>
            {index > 0 ? <Divider /> : null}
            <View style={styles.item}>
              <FoodThumb
                emoji={item.emoji}
                gradient={item.gradient}
                size={56}
                radius={Radius.input}
              />
              <View style={styles.itemText}>
                <ThemedText type="bodyBold" numberOfLines={1}>
                  {item.name}
                </ThemedText>
                <ThemedText type="meta" themeColor="textSecondary" numberOfLines={2}>
                  {item.options}
                </ThemedText>
                <ThemedText type="bodyBold" style={styles.itemPrice}>
                  {formatPrice(item.price * item.quantity)}
                </ThemedText>
              </View>
              <QuantityStepper
                size="sm"
                min={0}
                value={item.quantity}
                onChange={(quantity) => setQuantity(item.id, quantity)}
              />
            </View>
          </Fragment>
        ))}
      </Card>

      <Card style={styles.addressCard}>
        <View style={[styles.addressIcon, { backgroundColor: theme.primarySoft }]}>
          <Text style={styles.addressEmoji}>📍</Text>
        </View>
        <View style={styles.itemText}>
          <ThemedText type="meta" themeColor="textSecondary">
            Entregar en
          </ThemedText>
          <ThemedText type="bodyBold" numberOfLines={1}>
            {DemoAddress.label}
          </ThemedText>
          <ThemedText type="meta" themeColor="textSecondary" numberOfLines={1}>
            {DemoAddress.reference}
          </ThemedText>
        </View>
        <Pressable accessibilityRole="button" hitSlop={Spacing.two}>
          <ThemedText type="label" themeColor="primary">
            Cambiar
          </ThemedText>
        </Pressable>
      </Card>

      <ThemedText type="subtitle" style={styles.sectionTitle}>
        Método de pago
      </ThemedText>
      {PAYMENT_METHODS.map((method) => (
        <PaymentOption
          key={method.id}
          id={method.id}
          name={method.name}
          hint={method.hint}
          selected={method.id === paymentId}
          onPress={() => setPaymentId(method.id)}
        />
      ))}

      <View style={[styles.points, { backgroundColor: theme.warningSoft }]}>
        <Text style={styles.pointsEmoji}>⭐</Text>
        <ThemedText type="note" style={styles.itemText}>
          Ganarás <ThemedText type="label">{points} Tude Puntos</ThemedText> con este pedido
        </ThemedText>
      </View>

      <View style={styles.summary}>
        <SummaryRow label="Subtotal" value={formatPrice(subtotal)} />
        <SummaryRow label="Envío" value="Gratis" valueColor="successText" bold />
        {hasDiscount ? (
          <SummaryRow
            label={DEMO_DISCOUNT.label}
            value={`− ${formatPrice(discount)}`}
            valueColor="primary"
            bold
          />
        ) : null}
      </View>
    </Screen>
  );
}

type SummaryRowProps = {
  label: string;
  value: string;
  valueColor?: ThemeColor;
  bold?: boolean;
};

function SummaryRow({ label, value, valueColor = 'text', bold = false }: SummaryRowProps) {
  return (
    <View style={styles.summaryRow}>
      <ThemedText themeColor="textSecondary">{label}</ThemedText>
      <ThemedText type={bold ? 'bodyBold' : 'body'} themeColor={valueColor}>
        {value}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 4,
  },
  headerText: {
    flex: 1,
    minWidth: 0,
    gap: 4,
  },
  itemsCard: {
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  item: {
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  itemText: {
    flex: 1,
    minWidth: 0,
  },
  itemPrice: {
    marginTop: 4,
  },
  addressCard: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  addressIcon: {
    width: 40,
    height: 40,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addressEmoji: {
    fontSize: 16,
    lineHeight: 20,
  },
  sectionTitle: {
    marginTop: 4,
    marginBottom: 2,
  },
  points: {
    minHeight: 42,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: Radius.button,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  pointsEmoji: {
    fontSize: 20,
    lineHeight: 24,
  },
  summary: {
    paddingHorizontal: 4,
    paddingTop: 4,
    gap: 6,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footer: {
    gap: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  empty: {
    padding: Spacing.four,
    alignItems: 'center',
    gap: Spacing.two,
  },
  emptyEmoji: {
    fontSize: 44,
    lineHeight: 54,
  },
  centerText: {
    textAlign: 'center',
  },
});
