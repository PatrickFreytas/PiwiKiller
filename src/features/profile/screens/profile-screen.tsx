import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';

import { Screen } from '@/components/layout';
import { Button, Card, ThemedText } from '@/components/ui';
import { AppConfig } from '@/config/app';
import { Spacing } from '@/theme';

import { ProfileRow } from '../components/profile-row';

/**
 * Pestaña Perfil. El Figma todavía no tiene diseño propio para esta pantalla
 * (los datos del usuario se ven en "Puntos"); por ahora da acceso a la cuenta y a los datos de la app.
 */
export function ProfileScreen() {
  const router = useRouter();

  return (
    <Screen withTabBar gap={Spacing.three}>
      <ThemedText type="heading">Perfil</ThemedText>

      <Card style={styles.card}>
        <ThemedText type="subtitle">Tu cuenta</ThemedText>
        <ThemedText themeColor="textSecondary">
          Inicia sesión para guardar tus direcciones, pedidos y Tude Puntos.
        </ThemedText>
        <Button fullWidth size="md" label="Iniciar sesión" onPress={() => router.push('/iniciar-sesion')} />
        <Button
          fullWidth
          size="md"
          variant="soft"
          label="Crear cuenta"
          onPress={() => router.push('/registro')}
        />
      </Card>

      <Card style={styles.card}>
        <ProfileRow label="Aplicación" value={AppConfig.name} />
        <ProfileRow label="Versión" value={AppConfig.version} />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.three,
    gap: 12,
  },
});
