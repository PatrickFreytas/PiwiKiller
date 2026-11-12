import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

/** Línea separadora de 1 px. */
export function Divider({ style }: { style?: StyleProp<ViewStyle> }) {
  const theme = useTheme();

  return <View style={[styles.line, { backgroundColor: theme.border }, style]} />;
}

const styles = StyleSheet.create({
  line: {
    height: 1,
    alignSelf: 'stretch',
  },
});
