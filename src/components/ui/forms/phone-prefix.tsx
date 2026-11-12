import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@/hooks/use-theme';
import { Typography } from '@/theme';

/** Prefijo "🇵🇪 +51" con separador, para el `left` de un `TextField` de celular. */
export function PhonePrefix() {
  const theme = useTheme();

  return (
    <View style={styles.row}>
      <Text style={styles.flag}>🇵🇪</Text>
      <Text style={[Typography.callout, { color: theme.text }]}>+51</Text>
      <View style={[styles.separator, { backgroundColor: theme.inputBorder }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  flag: {
    fontSize: 16,
    lineHeight: 20,
  },
  separator: {
    width: 2,
    height: 28,
    marginLeft: 2,
  },
});
