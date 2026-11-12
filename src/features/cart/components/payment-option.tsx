import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Radio, ThemedText } from '@/components/ui';
import { useTheme } from '@/hooks/use-theme';
import { FontFamily, Palette, Radius } from '@/theme';

import type { PaymentMethodId } from '../data';

const LOGOS: Record<PaymentMethodId, { text: string; backgroundColor: string; emoji?: boolean }> = {
  yape: { text: 'Y', backgroundColor: Palette.yape },
  plin: { text: 'P', backgroundColor: Palette.plin },
  efectivo: { text: '💵', backgroundColor: Palette.menta50, emoji: true },
};

type PaymentOptionProps = {
  id: PaymentMethodId;
  name: string;
  hint?: string;
  selected: boolean;
  onPress: () => void;
};

/** Fila de método de pago: logo, nombre, ayuda y selector; la elegida lleva borde coral. */
export function PaymentOption({ id, name, hint, selected, onPress }: PaymentOptionProps) {
  const theme = useTheme();
  const logo = LOGOS[id];

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={name}
      onPress={onPress}
      style={[
        styles.row,
        { backgroundColor: theme.backgroundElement },
        selected
          ? { borderColor: theme.primary, borderWidth: 2 }
          : { borderColor: theme.border, borderWidth: 1 },
      ]}>
      <View style={[styles.logo, { backgroundColor: logo.backgroundColor }]}>
        <Text style={logo.emoji ? styles.logoEmoji : styles.logoLetter}>{logo.text}</Text>
      </View>
      <View style={styles.text}>
        <ThemedText type="bodyBold">{name}</ThemedText>
        {hint ? (
          <ThemedText type="meta" themeColor="textSecondary">
            {hint}
          </ThemedText>
        ) : null}
      </View>
      <Radio selected={selected} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 56,
    paddingHorizontal: 15,
    borderRadius: Radius.button,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoLetter: {
    fontFamily: FontFamily.black,
    fontSize: 13,
    lineHeight: 16,
    color: Palette.blanco,
  },
  logoEmoji: {
    fontSize: 18,
    lineHeight: 21,
  },
  text: {
    flex: 1,
    minWidth: 0,
  },
});
