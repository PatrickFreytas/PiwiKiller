import { StyleSheet } from 'react-native';

import { Screen } from '@/components/layout';
import { ThemedText, ThemedView } from '@/components/ui';
import { AppConfig } from '@/config/app';
import { Spacing } from '@/theme';

export function HomeScreen() {
  return (
    <Screen>
      <ThemedView style={styles.header}>
        <ThemedText type="subtitle" className="text-coral">
          {AppConfig.name}
        </ThemedText>
        <ThemedText themeColor="textSecondary">Delivery en Pucallpa. La base de la app está lista.</ThemedText>
      </ThemedView>

      <ThemedView type="backgroundElement" style={styles.card}>
        <ThemedText type="smallBold">Siguiente paso</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          Crea tu primera funcionalidad en <ThemedText type="code">src/features</ThemedText> y
          muéstrala aquí.
        </ThemedText>
      </ThemedView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: Spacing.two,
  },
  card: {
    gap: Spacing.two,
    padding: Spacing.four,
    borderRadius: Spacing.four,
  },
});
