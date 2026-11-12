import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ui';
import { useTheme } from '@/hooks/use-theme';

export const ORDER_STEPS = ['Confirmado', 'Preparando', 'En camino', 'Entregado'] as const;

type OrderProgressProps = {
  /** Índice de la etapa actual dentro de `ORDER_STEPS`. */
  currentStep: number;
  /** Avance dentro de la etapa actual, de 0 a 1. */
  stepProgress?: number;
};

/** Barra de 4 etapas del pedido: completadas en menta, la actual en coral. */
export function OrderProgress({ currentStep, stepProgress = 0.6 }: OrderProgressProps) {
  const theme = useTheme();

  return (
    <View style={styles.row}>
      {ORDER_STEPS.map((step, index) => {
        const isDone = index < currentStep;
        const isCurrent = index === currentStep;

        return (
          <View key={step} style={styles.step}>
            <View style={[styles.track, { backgroundColor: theme.track }]}>
              <View
                style={[
                  styles.fill,
                  isDone && { width: '100%', backgroundColor: theme.success },
                  isCurrent && {
                    width: `${Math.round(stepProgress * 100)}%`,
                    backgroundColor: theme.primary,
                  },
                ]}
              />
            </View>
            <ThemedText
              type={isCurrent ? 'metaBold' : 'meta'}
              themeColor={isCurrent ? 'primary' : 'textSecondary'}
              numberOfLines={1}>
              {step}
            </ThemedText>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 6,
  },
  step: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  track: {
    alignSelf: 'stretch',
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  fill: {
    width: 0,
    height: 6,
    borderRadius: 3,
  },
});
