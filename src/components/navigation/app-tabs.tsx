import { NativeTabs } from 'expo-router/native-tabs';

import { useTheme } from '@/hooks/use-theme';
import { Typography } from '@/theme';

/**
 * Barra de pestañas nativa (Android / iOS) con los colores de la guía de estilo:
 * fondo blanco, pestaña activa en coral e inactivas en gris.
 * Cada Trigger apunta a una ruta de `src/app`.
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

      <NativeTabs.Trigger name="styleguide">
        <NativeTabs.Trigger.Label>Guía</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="paintpalette.fill" md="palette" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="settings">
        <NativeTabs.Trigger.Label>Ajustes</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="gearshape.fill" md="settings" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
