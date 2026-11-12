import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ui';
import { formatPrice } from '@/config/demo';
import { useTheme } from '@/hooks/use-theme';
import { Radius } from '@/theme';

type SizeOptionProps = {
  name: string;
  price: number;
  selected: boolean;
  onPress: () => void;
};

/** Opción de tamaño: nombre y precio; la elegida va en coral con borde de 2 px. */
export function SizeOption({ name, price, selected, onPress }: SizeOptionProps) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[
        styles.option,
        selected
          ? { backgroundColor: theme.primarySoft, borderColor: theme.primary, borderWidth: 2 }
          : { backgroundColor: theme.backgroundElement, borderColor: theme.border },
      ]}>
      <ThemedText type="bodyBold" themeColor={selected ? 'primary' : 'text'}>
        {name}
      </ThemedText>
      <ThemedText type="meta" themeColor={selected ? 'primary' : 'textSecondary'}>
        {formatPrice(price)}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  option: {
    flex: 1,
    height: 58,
    borderRadius: Radius.input,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
