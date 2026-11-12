import { StyleSheet, Text, View } from 'react-native';

import { Card, Pill, ThemedText } from '@/components/ui';
import { FontFamily, Gradients, Radius, Spacing } from '@/theme';

/** Ejemplo de la tarjeta de local de "02 · Inicio", armada con `Card` y `Pill`. */
export function LocalCardExample() {
  return (
    <Card style={styles.card}>
      <View style={styles.thumbnail}>
        <Text style={styles.emoji}>🍗</Text>
        <Pill label="-20%" tone="promo" style={styles.discount} />
      </View>

      <View style={styles.info}>
        <View style={styles.titleRow}>
          <ThemedText type="subtitle" numberOfLines={1} style={styles.title}>
            Brasa Amazónica
          </ThemedText>
          <ThemedText themeColor="iconMuted" style={styles.heart}>
            ♡
          </ThemedText>
        </View>
        <ThemedText type="caption" themeColor="textSecondary" numberOfLines={1}>
          Pollo a la brasa · Parrillas
        </ThemedText>

        <View style={styles.metaRow}>
          <Pill label="★ 4.8" tone="rating" />
          <ThemedText type="meta" themeColor="textSecondary">
            ⏱ 20–30 min · 1.2 km
          </ThemedText>
        </View>

        <View style={styles.metaRow}>
          <ThemedText type="meta" themeColor="successText" style={styles.bold}>
            Envío S/ 4.00
          </ThemedText>
          <ThemedText type="meta" themeColor="textSecondary">
            · desde S/ 12
          </ThemedText>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: 12,
  },
  thumbnail: {
    width: 92,
    height: 92,
    borderRadius: Radius.button,
    backgroundImage: Gradients.coral,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 44,
    lineHeight: 54,
  },
  discount: {
    position: 'absolute',
    top: 6,
    left: 6,
  },
  info: {
    flex: 1,
    minWidth: 0,
    gap: 6,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.two,
  },
  title: {
    flex: 1,
  },
  heart: {
    fontSize: 20,
    lineHeight: 24,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  bold: {
    fontFamily: FontFamily.bold,
  },
});
