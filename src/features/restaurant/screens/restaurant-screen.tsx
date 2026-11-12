import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Hero, Screen } from '@/components/layout';
import { Button, Card, Chip, Divider, IconButton, ThemedText } from '@/components/ui';
import { DemoLocal, formatPrice } from '@/config/demo';
import { useGoBack } from '@/hooks/use-go-back';
import { useTheme } from '@/hooks/use-theme';
import { FontFamily, Palette, Radius, ScreenMargin, type ThemeColor } from '@/theme';

import { ProductCard } from '../components/product-card';
import { DEMO_CART_SUMMARY, DEMO_MENU } from '../data';

const STATS: { value: string; label: string; color?: ThemeColor }[] = [
  { value: `★ ${DemoLocal.rating}`, label: `${DemoLocal.reviews} reseñas` },
  { value: DemoLocal.deliveryTime, label: 'entrega' },
  { value: 'Gratis', label: 'envío', color: 'successText' },
  { value: '● Abierto', label: `hasta ${DemoLocal.closesAt}`, color: 'successText' },
];

/** "03 · Restaurante y menú": cabecera del local, promoción activa y menú por categorías. */
export function RestaurantScreen() {
  const router = useRouter();
  const goBack = useGoBack();
  const theme = useTheme();
  const [favorite, setFavorite] = useState(true);
  const [sectionId, setSectionId] = useState(DEMO_MENU[0].id);

  // El chip elegido pasa su sección al inicio; el resto del menú sigue debajo.
  const sections = [...DEMO_MENU].sort(
    (a, b) => Number(b.id === sectionId) - Number(a.id === sectionId),
  );

  return (
    <Screen
      edgeToEdge
      gap={14}
      footer={
        <Button
          fullWidth
          label="Ver carrito"
          trailing={formatPrice(DEMO_CART_SUMMARY.total)}
          leading={
            <View style={styles.count}>
              <Text style={styles.countText}>{DEMO_CART_SUMMARY.items}</Text>
            </View>
          }
          onPress={() => router.push('/carrito')}
        />
      }>
      <Hero
        gradient="menta"
        height={220}
        leading={<IconButton icon="back" accessibilityLabel="Volver" onPress={goBack} />}
        trailing={
          <>
            <IconButton icon="share" accessibilityLabel="Compartir local" />
            <IconButton
              accessibilityLabel={favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              onPress={() => setFavorite((value) => !value)}>
              <Text style={[styles.heart, { color: favorite ? theme.primary : theme.iconMuted }]}>
                {favorite ? '♥' : '♡'}
              </Text>
            </IconButton>
          </>
        }>
        <Text style={styles.heroEmojiSmall}>🍓</Text>
        <Text style={styles.heroEmojiLarge}>🥤</Text>
      </Hero>

      <View style={styles.body}>
        <Card style={styles.infoCard}>
          <View style={styles.identity}>
            <View style={[styles.logo, { backgroundColor: theme.contrast }]}>
              <Text style={styles.logoEmoji}>{DemoLocal.emoji}</Text>
            </View>
            <View style={styles.identityText}>
              <ThemedText type="section" numberOfLines={1}>
                {DemoLocal.name}
              </ThemedText>
              <ThemedText type="caption" themeColor="textSecondary" numberOfLines={1}>
                {DemoLocal.categories} · {DemoLocal.address}
              </ThemedText>
            </View>
          </View>
          <Divider />
          <View style={styles.stats}>
            {STATS.map((stat) => (
              <View key={stat.label} style={styles.stat}>
                <ThemedText type="subtitle" themeColor={stat.color} numberOfLines={1}>
                  {stat.value}
                </ThemedText>
                <ThemedText type="meta" themeColor="textSecondary" numberOfLines={1}>
                  {stat.label}
                </ThemedText>
              </View>
            ))}
          </View>
        </Card>

        <View style={[styles.promo, { backgroundColor: theme.primarySoft }]}>
          <Text style={styles.promoEmoji}>🎁</Text>
          <View style={styles.promoText}>
            <ThemedText type="label" themeColor="primary">
              2x1 en raspadillas hasta las 5 pm
            </ThemedText>
            <ThemedText type="meta" themeColor="textSecondary">
              Se aplica automáticamente
            </ThemedText>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.bleed}
          contentContainerStyle={styles.chips}>
          {DEMO_MENU.map((section) => (
            <Chip
              key={section.id}
              label={section.chip}
              selected={section.id === sectionId}
              onPress={() => setSectionId(section.id)}
            />
          ))}
        </ScrollView>

        {sections.map((section) => (
          <View key={section.id} style={styles.section}>
            <ThemedText type="section">{section.title}</ThemedText>
            <View style={styles.grid}>
              {section.products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onPress={() => router.push('/producto')}
                />
              ))}
              {/* Con un número impar de productos, un hueco mantiene el ancho de dos columnas. */}
              {section.products.length % 2 === 1 ? <View style={styles.gridSpacer} /> : null}
            </View>
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heroEmojiSmall: {
    position: 'absolute',
    left: 40,
    top: 105,
    fontSize: 70,
    lineHeight: 85,
  },
  heroEmojiLarge: {
    position: 'absolute',
    right: 60,
    top: 65,
    fontSize: 120,
    lineHeight: 145,
  },
  heart: {
    fontSize: 20,
    lineHeight: 24,
  },
  body: {
    marginTop: -50,
    paddingHorizontal: ScreenMargin,
    gap: 14,
  },
  infoCard: {
    padding: 16,
    gap: 12,
  },
  identity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 52,
    height: 52,
    borderRadius: Radius.button,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoEmoji: {
    fontSize: 26,
    lineHeight: 31,
  },
  identityText: {
    flex: 1,
    minWidth: 0,
    gap: 4,
  },
  stats: {
    flexDirection: 'row',
    gap: 8,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  promo: {
    minHeight: 54,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: Radius.button,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  promoEmoji: {
    fontSize: 22,
    lineHeight: 26,
  },
  promoText: {
    flex: 1,
    minWidth: 0,
  },
  bleed: {
    marginHorizontal: -ScreenMargin,
    flexGrow: 0,
  },
  chips: {
    paddingHorizontal: ScreenMargin,
    gap: 12,
  },
  section: {
    gap: 12,
  },
  grid: {
    flexDirection: 'row',
    gap: 12,
  },
  gridSpacer: {
    flex: 1,
  },
  count: {
    minWidth: 29,
    height: 25,
    paddingHorizontal: 8,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    fontFamily: FontFamily.extraBold,
    fontSize: 14,
    lineHeight: 17,
    color: Palette.blanco,
  },
});
