import { StyleSheet } from 'react-native';

import { Screen } from '@/components/layout';
import { ThemedText, ThemedView } from '@/components/ui';
import { AppConfig } from '@/config/app';
import { Spacing } from '@/theme';

import { SettingsRow } from '../components/settings-row';

export function SettingsScreen() {
  return (
    <Screen>
      <ThemedText type="heading">Ajustes</ThemedText>

      <ThemedView type="backgroundElement" style={styles.card}>
        <SettingsRow label="Aplicación" value={AppConfig.name} />
        <SettingsRow label="Versión" value={AppConfig.version} />
        <SettingsRow label="Tema" value="Claro" />
      </ThemedView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: Spacing.three,
    padding: Spacing.four,
    borderRadius: Spacing.four,
  },
});
