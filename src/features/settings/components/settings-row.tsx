import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ui';
import { Spacing } from '@/theme';

type SettingsRowProps = {
  label: string;
  value: string;
};

/** Fila de solo lectura: etiqueta a la izquierda, valor a la derecha. */
export function SettingsRow({ label, value }: SettingsRowProps) {
  return (
    <View style={styles.row}>
      <ThemedText type="small">{label}</ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        {value}
      </ThemedText>
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
