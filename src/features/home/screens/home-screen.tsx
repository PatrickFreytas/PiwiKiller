import { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Screen } from '@/components/layout';
import { ThemedText, ThemedView } from '@/components/ui';
import { AppConfig } from '@/config/app';
import { fetchCatalog } from '@/features/home/services/catalog-service';
import { Spacing } from '@/theme';
import type { Catalog } from '@/features/home/services/catalog-service';

function getErrorMessage(error: unknown) {
  return error instanceof Error
    ? error.message
    : 'Ocurrió un error inesperado al cargar el catálogo.';
}

export function HomeScreen() {
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadCatalog = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      setCatalog(await fetchCatalog());
    } catch (caught) {
      setError(getErrorMessage(caught));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isActive = true;

    fetchCatalog()
      .then((data) => {
        if (isActive) {
          setCatalog(data);
        }
      })
      .catch((caught: unknown) => {
        if (isActive) {
          setError(getErrorMessage(caught));
        }
      })
      .finally(() => {
        if (isActive) {
          setLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  const localNames = new Map(catalog?.locales.map((local) => [local.id, local.nombre]));

  return (
    <Screen>
      <ThemedView style={styles.header}>
        <ThemedText type="heading" themeColor="primary">
          {AppConfig.name}
        </ThemedText>
        <ThemedText themeColor="textSecondary">
          Catálogo conectado a Supabase · datos de demostración
        </ThemedText>
      </ThemedView>

      {loading && <ThemedText>Conectando y cargando el catálogo…</ThemedText>}

      {error && (
        <ThemedView type="backgroundElement" style={styles.card}>
          <ThemedText type="smallBold">No se pudo cargar el catálogo</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {error}
          </ThemedText>
          <Pressable
            accessibilityRole="button"
            disabled={loading}
            onPress={() => void loadCatalog()}
            style={styles.retryButton}>
            <ThemedText type="smallBold">Reintentar</ThemedText>
          </Pressable>
        </ThemedView>
      )}

      {catalog && (
        <>
          <ThemedView type="backgroundElement" style={styles.card}>
            <ThemedText type="smallBold">Catálogo listo</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {catalog.locales.length} locales · {catalog.productos.length} productos
            </ThemedText>
          </ThemedView>

          <View style={styles.section}>
            <ThemedText type="section">Locales</ThemedText>
            {catalog.locales.map((local) => (
              <ThemedView key={local.id} type="backgroundElement" style={styles.item}>
                <ThemedText type="smallBold">{local.nombre}</ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  {local.abierto ? 'Abierto' : 'Cerrado'} · ★ {local.calificacion.toFixed(1)} ·{' '}
                  {local.tiempo_entrega_minutos} min · Envío S/ {local.costo_envio.toFixed(2)}
                </ThemedText>
              </ThemedView>
            ))}
          </View>

          <View style={styles.section}>
            <ThemedText type="section">Productos</ThemedText>
            {catalog.productos.map((producto) => (
              <ThemedView key={producto.id} type="backgroundElement" style={styles.item}>
                <ThemedText type="smallBold">{producto.nombre}</ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  {localNames.get(producto.local_id) ?? 'Local'} · S/ {producto.precio.toFixed(2)}
                </ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  {producto.descripcion}
                </ThemedText>
              </ThemedView>
            ))}
          </View>
        </>
      )}
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
  section: {
    gap: Spacing.two,
  },
  item: {
    gap: Spacing.one,
    padding: Spacing.three,
    borderRadius: Spacing.three,
  },
  retryButton: {
    alignSelf: 'flex-start',
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
  },
});
