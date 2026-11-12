import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { Screen } from '@/components/layout';
import {
  Button,
  Card,
  Chip,
  FoodThumb,
  Icon,
  IconButton,
  SectionHeader,
  ThemedText,
} from '@/components/ui';
import { DemoAddress, DemoUser } from '@/config/demo';
import { useTheme } from '@/hooks/use-theme';
import { Radius, ScreenMargin, Spacing } from '@/theme';

import { getCategoryVisual } from '../category-visuals';
import { LocalCard } from '../components/local-card';
import { PromoBanner } from '../components/promo-banner';
import { SearchBar } from '../components/search-bar';
import { ServiceTiles } from '../components/service-tiles';
import { fetchCatalog, type Catalog, type CatalogLocal } from '../services/catalog-service';

type Filter = 'open' | 'freeDelivery' | 'topRated';

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'open', label: '🟢 Abierto ahora' },
  { id: 'freeDelivery', label: '🛵 Envío gratis' },
  { id: 'topRated', label: '★ 4.5+' },
];

function getErrorMessage(error: unknown) {
  return error instanceof Error
    ? error.message
    : 'Ocurrió un error inesperado al cargar el catálogo.';
}

function matchesFilters(local: CatalogLocal, filters: ReadonlySet<Filter>) {
  if (filters.has('freeDelivery') && local.costo_envio > 0) return false;
  if (filters.has('topRated') && local.calificacion < 4.5) return false;
  return true;
}

export function HomeScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ReadonlySet<Filter>>(new Set<Filter>(['open']));
  const [showClosed, setShowClosed] = useState(false);

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
        if (isActive) setCatalog(data);
      })
      .catch((caught: unknown) => {
        if (isActive) setError(getErrorMessage(caught));
      })
      .finally(() => {
        if (isActive) setLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, []);

  const toggleFilter = (filter: Filter) => {
    setFilters((current) => {
      const next = new Set(current);
      if (next.has(filter)) {
        next.delete(filter);
      } else {
        next.add(filter);
      }
      return next;
    });
  };

  const matching = catalog?.locales.filter((local) => matchesFilters(local, filters)) ?? [];
  const openLocals = matching.filter((local) => local.abierto);
  const closedLocals = matching.filter((local) => !local.abierto);
  // Con "Abierto ahora" activo los cerrados se agrupan al final, detrás de "Mostrar".
  const hideClosed = filters.has('open') && !showClosed;
  const visibleLocals = hideClosed ? openLocals : [...openLocals, ...closedLocals];

  return (
    <Screen withTabBar gap={18}>
      <View style={styles.header}>
        <View style={styles.address}>
          <ThemedText type="meta" themeColor="textSecondary">
            Entregar en
          </ThemedText>
          <View style={styles.addressRow}>
            <Icon name="location" size={18} themeColor="primary" />
            <ThemedText type="callout" numberOfLines={1} style={styles.addressText}>
              {DemoAddress.label}
            </ThemedText>
            <Icon name="chevronDown" size={14} />
          </View>
        </View>
        <IconButton icon="bell" accessibilityLabel="Notificaciones" />
      </View>

      <View>
        <ThemedText type="heading">Hola {DemoUser.firstName} 👋</ThemedText>
        <ThemedText type="heading" themeColor="primary">
          ¿qué se te antoja hoy?
        </ThemedText>
      </View>

      <SearchBar onPress={() => router.push('/buscar')} />

      <ServiceTiles
        localCount={catalog ? catalog.locales.length : null}
        onFoodPress={() => router.push('/buscar')}
        onRidePress={() => router.push('/mototaxi')}
        onDeliveryPress={() => router.push('/mototaxi')}
      />

      {catalog && catalog.categorias.length > 0 ? (
        <View style={styles.section}>
          <SectionHeader
            title="Categorías"
            actionLabel="Ver todas"
            onActionPress={() => router.push('/buscar')}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.bleed}
            contentContainerStyle={styles.strip}>
            {catalog.categorias.map((categoria) => {
              const visual = getCategoryVisual(categoria.slug);
              return (
                <Pressable
                  key={categoria.id}
                  accessibilityRole="button"
                  accessibilityLabel={categoria.nombre}
                  onPress={() => router.push('/buscar')}
                  style={styles.category}>
                  <FoodThumb
                    emoji={visual.emoji}
                    gradient={visual.gradient}
                    size={64}
                    radius={Radius.card}
                  />
                  <ThemedText type="captionBold" numberOfLines={1}>
                    {visual.shortName ?? categoria.nombre}
                  </ThemedText>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      ) : null}

      <PromoBanner />

      <View style={styles.section}>
        <SectionHeader title="Cerca de ti" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.bleed}
          contentContainerStyle={styles.strip}>
          {FILTERS.map((filter) => (
            <Chip
              key={filter.id}
              label={filter.label}
              selected={filters.has(filter.id)}
              onPress={() => toggleFilter(filter.id)}
            />
          ))}
        </ScrollView>

        {loading ? <ThemedText themeColor="textSecondary">Cargando locales…</ThemedText> : null}

        {error ? (
          <Card style={styles.message}>
            <ThemedText type="bodyBold">No se pudo cargar el catálogo</ThemedText>
            <ThemedText type="caption" themeColor="textSecondary">
              {error}
            </ThemedText>
            <Button
              label="Reintentar"
              variant="soft"
              size="sm"
              disabled={loading}
              onPress={() => void loadCatalog()}
            />
          </Card>
        ) : null}

        {visibleLocals.map((local) => {
          const visual = getCategoryVisual(local.categoria?.slug);
          return (
            <LocalCard
              key={local.id}
              name={local.nombre}
              subtitle={local.categoria?.nombre ?? 'Comida'}
              emoji={visual.emoji}
              gradient={visual.gradient}
              rating={local.calificacion}
              deliveryMinutes={local.tiempo_entrega_minutos}
              deliveryFee={local.costo_envio}
              priceFrom={local.precio_desde}
              open={local.abierto}
              onPress={() => router.push('/local')}
            />
          );
        })}

        {catalog && visibleLocals.length === 0 ? (
          <ThemedText themeColor="textSecondary">
            No hay locales abiertos que cumplan con estos filtros.
          </ThemedText>
        ) : null}

        {filters.has('open') && closedLocals.length > 0 ? (
          <View style={[styles.closedRow, { backgroundColor: theme.backgroundMuted }]}>
            <ThemedText type="caption" themeColor="textSecondary">
              🌙 {closedLocals.length}{' '}
              {closedLocals.length === 1 ? 'local cerrado' : 'locales cerrados'} ahora
            </ThemedText>
            <Pressable
              accessibilityRole="button"
              hitSlop={Spacing.two}
              onPress={() => setShowClosed((value) => !value)}>
              <ThemedText type="captionBold" themeColor="primary">
                {showClosed ? 'Ocultar' : 'Mostrar'}
              </ThemedText>
            </Pressable>
          </View>
        ) : null}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  address: {
    flex: 1,
    minWidth: 0,
    gap: Spacing.one,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  addressText: {
    flexShrink: 1,
  },
  section: {
    gap: 12,
  },
  bleed: {
    marginHorizontal: -ScreenMargin,
    flexGrow: 0,
  },
  strip: {
    paddingHorizontal: ScreenMargin,
    gap: 12,
  },
  category: {
    width: 64,
    alignItems: 'center',
    gap: 6,
  },
  message: {
    gap: Spacing.two,
    padding: Spacing.three,
  },
  closedRow: {
    minHeight: 35,
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.input,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
});
