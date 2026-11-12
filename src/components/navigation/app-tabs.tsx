import { NativeTabs } from 'expo-router/native-tabs';

import { useTheme } from '@/hooks/use-theme';
import { Typography } from '@/theme';

/**
 * Barra de pestañas nativa (Android / iOS) con los colores de la guía de estilo:
 * fondo blanco, pestaña activa en coral e inactivas en gris.
 * Cada Trigger apunta a una ruta de `src/app/(tabs)`.
 */
export default function AppTabs() {
  const colors = useTheme();
  const label = {
    fontFamily: Typography.tab.fontFamily,
    fontSize: Typography.tab.fontSize,
  };

  return (
    <NativeTabs
      backgroundColor={colors.backgroundElement}
      tintColor={colors.primary}
      indicatorColor={colors.primarySoft}
      rippleColor={colors.primarySoft}
      shadowColor={colors.border}
      iconColor={{ default: colors.textSecondary, selected: colors.primary }}
      labelStyle={{
        default: { ...label, color: colors.textSecondary },
        selected: { ...label, color: colors.primary },
      }}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Inicio</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="buscar">
        <NativeTabs.Trigger.Label>Buscar</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="magnifyingglass" md="search" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="pedidos">
        <NativeTabs.Trigger.Label>Pedidos</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="bag" md="shopping_bag" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="puntos">
        <NativeTabs.Trigger.Label>Puntos</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="star" md="star" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="perfil">
        <NativeTabs.Trigger.Label>Perfil</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="person" md="person" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
