import { StyleSheet, View } from 'react-native';

import { IconButton } from '@/components/ui';
import { useGoBack } from '@/hooks/use-go-back';
import { useTheme } from '@/hooks/use-theme';

type AuthHeaderProps = {
  /** Paso actual del registro (1 = datos, 2 = verificación). */
  step: 1 | 2;
};

/** Cabecera del registro: botón de volver e indicador de 2 pasos centrado. */
export function AuthHeader({ step }: AuthHeaderProps) {
  const goBack = useGoBack();
  const theme = useTheme();

  return (
    <View style={styles.row}>
      <IconButton icon="back" accessibilityLabel="Volver" onPress={goBack} />
      <View style={styles.steps} accessibilityLabel={`Paso ${step} de 2`}>
        {[1, 2].map((item) => (
          <View
            key={item}
            style={[
              styles.step,
              { backgroundColor: item <= step ? theme.primary : theme.inputBorder },
            ]}
          />
        ))}
      </View>
      <View style={styles.spacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  steps: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  step: {
    width: 22,
    height: 6,
    borderRadius: 3,
  },
  spacer: {
    width: 44,
  },
});
