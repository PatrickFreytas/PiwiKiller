import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components/layout';
import { Button, Chip, Pill, TextField, ThemedText } from '@/components/ui';
import { FontFamily, Palette, Spacing } from '@/theme';

import { ColorSwatch } from '../components/color-swatch';
import { LocalCardExample } from '../components/local-card-example';

const SWATCHES = [
  { name: 'Coral Tude', hex: Palette.coral, textColor: Palette.blanco },
  { name: 'Vino', hex: Palette.vino, textColor: Palette.blanco },
  { name: 'Menta (éxito)', hex: Palette.menta, textColor: Palette.blanco },
  { name: 'Sol (puntos)', hex: Palette.sol, textColor: Palette.vino },
  { name: 'Coral 50', hex: Palette.coral50, textColor: Palette.coral },
  { name: 'Fondo', hex: Palette.fondo, textColor: Palette.vino, outlined: true },
  { name: 'Texto 2', hex: Palette.texto2, textColor: Palette.blanco },
  { name: 'Plum (promo)', hex: Palette.plum, textColor: Palette.blanco },
] as const;

const CATEGORIES = ['🔥 Promos', '🍗 Pollo', '🍔 Burgers', '🍕 Pizza'] as const;

const RULES = [
  'Radio 16–20 px en tarjetas, 999 px en chips.',
  'Grid de 4 px, márgenes laterales 20 px.',
  'Un solo CTA coral por pantalla.',
  'Títulos en tipo oración (no MAYÚSCULAS).',
] as const;

/** Pantalla de muestra: reproduce "01 · Guía de estilo TUDE" con los tokens y componentes reales. */
export function StyleguideScreen() {
  const [category, setCategory] = useState<string>(CATEGORIES[0]);
  const [phone, setPhone] = useState('');

  return (
    <Screen>
      <View style={styles.block}>
        <ThemedText themeColor="primary" style={styles.eyebrow}>
          SISTEMA VISUAL
        </ThemedText>
        <View style={styles.brand}>
          <View style={styles.logo}>
            <Text style={styles.logoLetter}>t</Text>
          </View>
          <View style={styles.brandText}>
            <ThemedText themeColor="primary" style={styles.wordmark}>
              tude<ThemedText style={styles.wordmark}>.</ThemedText>
            </ThemedText>
            <ThemedText themeColor="textSecondary" style={styles.tagline}>
              Todo lo que se te antoja, a tu puerta.
            </ThemedText>
          </View>
        </View>
        <ThemedText themeColor="textBody" style={styles.intro}>
          <ThemedText type="subtitle" themeColor="textBody">
            Tude
          </ThemedText>
          : corto, fácil de decir y de recordar en Pucallpa. Coral rosado para diferenciarnos del
          verde de Piwi y del naranja de otras apps; vino profundo para un aire premium y legible.
        </ThemedText>
      </View>

      <View style={styles.block}>
        <ThemedText type="subtitle">Color</ThemedText>
        <View style={styles.swatches}>
          {SWATCHES.map((swatch) => (
            <ColorSwatch key={swatch.name} {...swatch} />
          ))}
        </View>
      </View>

      <View style={styles.block}>
        <ThemedText type="subtitle">Tipografía · Inter</ThemedText>
        <ThemedText type="display">Display 32 / ExtraBold</ThemedText>
        <ThemedText type="title">Título 22 / ExtraBold</ThemedText>
        <ThemedText type="subtitle">Subtítulo 16 / Bold</ThemedText>
        <ThemedText type="body">Cuerpo 14 / Regular — descripción de platos y ayudas.</ThemedText>
        <ThemedText type="caption" themeColor="textSecondary">
          Caption 12 / Regular — metadatos, distancia, tiempo.
        </ThemedText>
      </View>

      <View style={styles.block}>
        <ThemedText type="subtitle">Componentes</ThemedText>

        <View style={styles.row}>
          <Button label="Agregar · S/ 9.50" />
          <Button label="Secundario" variant="secondary" />
        </View>

        <View style={styles.row}>
          {CATEGORIES.map((item) => (
            <Chip
              key={item}
              label={item}
              selected={item === category}
              onPress={() => setCategory(item)}
            />
          ))}
        </View>

        <View style={styles.row}>
          <Pill label="-20%" tone="promo" />
          <Pill label="Envío gratis" tone="success" />
          <Pill label="★ 4.8" tone="rating" />
          <Pill label="Nuevo" tone="dark" />
          <Pill label="⏱ 15–25 min" tone="light" />
        </View>

        <TextField
          label="Celular"
          placeholder="987 654 321"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
          left={<ThemedText style={styles.prefix}>🇵🇪 +51</ThemedText>}
        />
        <TextField
          label="Correo (opcional)"
          placeholder="tucorreo@gmail.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <LocalCardExample />

        <ThemedText type="caption" themeColor="textSecondary">
          La barra inferior de esta pantalla también sigue la guía: pestaña activa en coral,
          etiquetas 11 / SemiBold.
        </ThemedText>
      </View>

      <View style={styles.block}>
        <ThemedText type="subtitle">Reglas</ThemedText>
        {RULES.map((rule) => (
          <ThemedText key={rule} type="body" themeColor="textBody">
            • {rule}
          </ThemedText>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  block: {
    gap: 12,
  },
  eyebrow: {
    fontFamily: FontFamily.extraBold,
    fontSize: 12,
    lineHeight: 15,
    letterSpacing: 1.5,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  logo: {
    width: 84,
    height: 84,
    borderRadius: 26,
    backgroundColor: Palette.coral,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoLetter: {
    fontFamily: FontFamily.black,
    fontSize: 44,
    lineHeight: 54,
    letterSpacing: -2,
    color: Palette.blanco,
  },
  brandText: {
    flex: 1,
    minWidth: 0,
  },
  wordmark: {
    fontFamily: FontFamily.black,
    fontSize: 52,
    lineHeight: 63,
    letterSpacing: -1,
  },
  tagline: {
    fontFamily: FontFamily.regular,
    fontSize: 15,
    lineHeight: 19,
  },
  intro: {
    fontFamily: FontFamily.regular,
    fontSize: 16,
    lineHeight: 24,
  },
  swatches: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 12,
  },
  prefix: {
    fontFamily: FontFamily.bold,
    fontSize: 15,
    lineHeight: 19,
  },
});
