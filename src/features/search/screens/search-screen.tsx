import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';

import { Screen } from '@/components/layout';
import { Card, Icon, TextField, ThemedText } from '@/components/ui';
import { Spacing } from '@/theme';

/**
 * Pestaña Buscar. El Figma todavía no tiene diseño para esta pantalla:
 * la búsqueda y los filtros se construyen en la HU-08.
 */
export function SearchScreen() {
  const [query, setQuery] = useState('');

  return (
    <Screen withTabBar gap={Spacing.three}>
      <ThemedText type="heading">Buscar</ThemedText>
      <TextField
        placeholder="Busca platos o locales…"
        returnKeyType="search"
        value={query}
        onChangeText={setQuery}
        left={<Icon name="search" themeColor="textSecondary" />}
      />
      <Card style={styles.empty}>
        <Text style={styles.emoji}>🔎</Text>
        <ThemedText type="subtitle">Muy pronto</ThemedText>
        <ThemedText themeColor="textSecondary" style={styles.center}>
          Aquí podrás buscar platos y locales, y filtrar por zona, envío gratis y calificación.
        </ThemedText>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  empty: {
    padding: Spacing.four,
    alignItems: 'center',
    gap: Spacing.two,
  },
  emoji: {
    fontSize: 44,
    lineHeight: 54,
  },
  center: {
    textAlign: 'center',
  },
});
