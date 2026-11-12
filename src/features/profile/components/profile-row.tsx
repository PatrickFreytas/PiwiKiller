import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ui';
import { Spacing } from '@/theme';

type ProfileRowProps = {
  label: string;
  value: string;
};

/** Fila de solo lectura: etiqueta a la izquierda, valor a la derecha. */
export function ProfileRow({ label, value }: ProfileRowProps) {
  return (
    <View style={styles.row}>
      <ThemedText>{label}</ThemedText>
      <ThemedText themeColor="textSecondary">{value}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Spacing.three,
  },
});
