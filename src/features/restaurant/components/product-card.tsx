import { StyleSheet, Text, View } from 'react-native';

import { Card, FoodThumb, Pill, ThemedText } from '@/components/ui';
import { formatPrice } from '@/config/demo';
import { useTheme } from '@/hooks/use-theme';
import { FontFamily, Palette, Radius } from '@/theme';

import type { MenuProduct } from '../data';

type ProductCardProps = {
  product: MenuProduct;
  onPress: () => void;
};

/** Tarjeta de producto del menú: imagen, nombre, descripción, precio y botón "+". */
export function ProductCard({ product, onPress }: ProductCardProps) {
  const theme = useTheme();

  return (
    <Card onPress={onPress} accessibilityLabel={`Agregar ${product.name}`} style={styles.card}>
      <FoodThumb
        emoji={product.emoji}
        gradient={product.gradient}
        size={120}
        radius={Radius.input}
        style={styles.image}>
        {product.badge ? (
          <Pill label={product.badge} tone="light" size="sm" style={styles.badge} />
        ) : null}
      </FoodThumb>

      <View style={styles.info}>
        <ThemedText type="bodyBold" numberOfLines={1}>
          {product.name}
        </ThemedText>
        <ThemedText type="meta" themeColor="textSecondary" numberOfLines={1}>
          {product.description}
        </ThemedText>
      </View>

      <View style={styles.footer}>
        <ThemedText type="subtitle">{formatPrice(product.price)}</ThemedText>
        <View style={[styles.add, { backgroundColor: theme.primary }]}>
          <Text style={styles.plus}>+</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
    gap: 8,
  },
  image: {
    width: '100%',
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
  },
  info: {
    paddingHorizontal: 4,
    gap: 2,
  },
  footer: {
    paddingHorizontal: 4,
    paddingBottom: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  add: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plus: {
    fontFamily: FontFamily.extraBold,
    fontSize: 20,
    lineHeight: 24,
    color: Palette.blanco,
  },
});
