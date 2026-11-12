import { StyleSheet, Text, View } from 'react-native';

import { Pill } from '@/components/ui';
import { FontFamily, Gradients, Palette, Radius, Typography } from '@/theme';

/** Banner de promoción de Inicio: envío gratis en el primer pedido. */
export function PromoBanner() {
  return (
    <View style={styles.banner}>
      <Text style={styles.emoji}>🛵</Text>
      <Pill label="SOLO EN TUDE" tone="sun" />
      <Text style={styles.title}>Envío GRATIS{'\n'}en tu 1er pedido</Text>
      <Text style={styles.code}>
        Código: <Text style={styles.codeValue}>PRIMERATUDE</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    minHeight: 140,
    padding: 18,
    borderRadius: Radius.banner,
    backgroundImage: Gradients.vino,
    gap: 8,
    overflow: 'hidden',
  },
  emoji: {
    position: 'absolute',
    right: 14,
    top: 26,
    fontSize: 96,
    lineHeight: 116,
  },
  title: {
    ...Typography.title,
    color: Palette.blanco,
  },
  code: {
    ...Typography.caption,
    color: Palette.blanco,
  },
  codeValue: {
    fontFamily: FontFamily.bold,
  },
});
