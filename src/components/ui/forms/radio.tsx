import { StyleSheet, View } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

/** Indicador de opción única (22 px). Va dentro de una fila presionable; no maneja el toque. */
export function Radio({ selected }: { selected: boolean }) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.circle,
        selected
          ? { borderWidth: 7, borderColor: theme.primary }
          : { borderWidth: 2, borderColor: theme.iconMuted },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 22,
    height: 22,
    borderRadius: 11,
  },
});
