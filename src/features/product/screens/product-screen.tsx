import { Fragment, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { Hero, Screen, Sheet } from '@/components/layout';
import {
  Button,
  Checkbox,
  Chip,
  Divider,
  IconButton,
  Pill,
  QuantityStepper,
  ThemedText,
} from '@/components/ui';
import { formatPrice } from '@/config/demo';
import { useGoBack } from '@/hooks/use-go-back';
import { useTheme } from '@/hooks/use-theme';
import { Radius, Spacing, Typography } from '@/theme';

import { SizeOption } from '../components/size-option';
import { DEMO_PRODUCT } from '../data';

/** "04 · Personalizar producto": tamaño, sabores, extras, nota y cantidad. */
export function ProductScreen() {
  const goBack = useGoBack();
  const theme = useTheme();
  const product = DEMO_PRODUCT;

  const [sizeId, setSizeId] = useState<string>(product.defaultSizeId);
  const [flavorIds, setFlavorIds] = useState<string[]>([...product.defaultFlavorIds]);
  const [extraIds, setExtraIds] = useState<string[]>([...product.defaultExtraIds]);
  const [note, setNote] = useState('');
  const [quantity, setQuantity] = useState(1);

  const toggleFlavor = (id: string) => {
    setFlavorIds((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      // Al llegar al máximo no se agregan más sabores.
      return current.length < product.maxFlavors ? [...current, id] : current;
    });
  };

  const toggleExtra = (id: string, checked: boolean) => {
    setExtraIds((current) => (checked ? [...current, id] : current.filter((item) => item !== id)));
  };

  const sizePrice = product.sizes.find((size) => size.id === sizeId)?.price ?? 0;
  const extrasPrice = product.extras
    .filter((extra) => extraIds.includes(extra.id))
    .reduce((sum, extra) => sum + extra.price, 0);
  const total = (sizePrice + extrasPrice) * quantity;
  const hasFlavors = flavorIds.length > 0;

  return (
    <Screen
      edgeToEdge
      gap={0}
      footer={
        <View style={styles.footer}>
          <QuantityStepper value={quantity} onChange={setQuantity} />
          <Button
            label="Agregar ·"
            trailing={formatPrice(total)}
            disabled={!hasFlavors}
            onPress={goBack}
            style={styles.addButton}
          />
        </View>
      }>
      <Hero
        gradient="frambuesa"
        height={250}
        leading={<IconButton icon="back" accessibilityLabel="Volver" onPress={goBack} />}>
        <Text style={styles.heroEmoji}>{product.emoji}</Text>
      </Hero>

      <Sheet style={styles.sheet}>
        <View style={styles.group}>
          <View style={styles.titleRow}>
            <ThemedText type="headline" style={styles.grow}>
              {product.name}
            </ThemedText>
            <Pill label={product.promo} tone="promo" />
          </View>
          <ThemedText type="note" themeColor="textSecondary">
            {product.description}
          </ThemedText>
        </View>

        <View style={styles.group}>
          <View style={styles.titleRow}>
            <ThemedText type="subtitle" style={styles.grow}>
              Tamaño
            </ThemedText>
            <Pill label="✓ Listo" tone="success" />
          </View>
          <View style={styles.sizes}>
            {product.sizes.map((size) => (
              <SizeOption
                key={size.id}
                name={size.name}
                price={size.price}
                selected={size.id === sizeId}
                onPress={() => setSizeId(size.id)}
              />
            ))}
          </View>
        </View>

        <View style={styles.group}>
          <View style={styles.titleRow}>
            <ThemedText type="subtitle">Sabores</ThemedText>
            <ThemedText type="caption" themeColor="textSecondary" style={styles.grow}>
              · {flavorIds.length} de {product.maxFlavors}
            </ThemedText>
            <Pill
              label={hasFlavors ? '✓ Listo' : 'Requerido'}
              tone={hasFlavors ? 'success' : 'promo'}
            />
          </View>
          <View style={styles.chips}>
            {product.flavors.map((flavor) => {
              const selected = flavorIds.includes(flavor.id);
              return (
                <Chip
                  key={flavor.id}
                  label={selected ? `${flavor.label} ✓` : flavor.label}
                  selected={selected}
                  onPress={() => toggleFlavor(flavor.id)}
                />
              );
            })}
          </View>
        </View>

        <View style={styles.group}>
          <ThemedText type="subtitle">Extras</ThemedText>
          {product.extras.map((extra, index) => (
            <Fragment key={extra.id}>
              {index > 0 ? <Divider /> : null}
              <View style={styles.extraRow}>
                <Checkbox
                  checked={extraIds.includes(extra.id)}
                  onChange={(checked) => toggleExtra(extra.id, checked)}
                  style={styles.grow}>
                  <ThemedText>{extra.name}</ThemedText>
                </Checkbox>
                <ThemedText type="caption" themeColor="textSecondary">
                  + {formatPrice(extra.price)}
                </ThemedText>
              </View>
            </Fragment>
          ))}
        </View>

        <View
          style={[
            styles.note,
            { backgroundColor: theme.backgroundElement, borderColor: theme.iconMuted },
          ]}>
          <Text style={styles.noteEmoji}>📝</Text>
          <TextInput
            accessibilityLabel="Nota para el local"
            placeholder="Nota para el local (opcional)"
            placeholderTextColor={theme.textSecondary}
            value={note}
            onChangeText={setNote}
            style={[styles.noteInput, { color: theme.text }]}
          />
        </View>
      </Sheet>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heroEmoji: {
    alignSelf: 'center',
    marginTop: 46,
    fontSize: 130,
    lineHeight: 157,
  },
  sheet: {
    gap: 22,
  },
  group: {
    gap: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  grow: {
    flex: 1,
  },
  sizes: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  extraRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  note: {
    height: 46,
    paddingHorizontal: 15,
    borderRadius: Radius.input,
    borderWidth: 1,
    borderStyle: 'dashed',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  noteEmoji: {
    fontSize: 16,
    lineHeight: 20,
  },
  noteInput: {
    flex: 1,
    minWidth: 0,
    height: '100%',
    padding: 0,
    fontFamily: Typography.caption.fontFamily,
    fontSize: 13,
    outlineWidth: 0,
    outlineColor: 'transparent',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  addButton: {
    flex: 1,
    alignSelf: 'auto',
  },
});
