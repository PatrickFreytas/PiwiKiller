import { TabList, TabSlot, TabTrigger, Tabs, type TabTriggerSlotProps } from 'expo-router/ui';
import { Pressable, StyleSheet, Text } from 'react-native';

import { Icon, type IconName } from '@/components/ui';
import { useTheme } from '@/hooks/use-theme';
import { MaxContentWidth, Spacing, Typography } from '@/theme';

/** Barra de pestañas para web, con el diseño de la barra inferior del Figma. */
export default function AppTabs() {
  const theme = useTheme();

  return (
    <Tabs>
      <TabSlot style={styles.slot} />
      <TabList
        style={[
          styles.bar,
          { backgroundColor: theme.backgroundElement, borderTopColor: theme.border },
        ]}>
        <TabTrigger name="index" href="/" asChild>
          <TabButton icon="home" label="Inicio" />
        </TabTrigger>
        <TabTrigger name="buscar" href="/buscar" asChild>
          <TabButton icon="search" label="Buscar" />
        </TabTrigger>
        <TabTrigger name="pedidos" href="/pedidos" asChild>
          <TabButton icon="orders" label="Pedidos" />
        </TabTrigger>
        <TabTrigger name="puntos" href="/puntos" asChild>
          <TabButton icon="points" label="Puntos" />
        </TabTrigger>
        <TabTrigger name="perfil" href="/perfil" asChild>
          <TabButton icon="profile" label="Perfil" />
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}

type TabButtonProps = TabTriggerSlotProps & {
  icon: IconName;
  label: string;
};

/** Pestaña: ícono de 22 px y etiqueta 11 SemiBold; coral si está activa. */
function TabButton({
  icon,
  label,
  isFocused,
  ref: _ref,
  children: _children,
  ...props
}: TabButtonProps) {
  const theme = useTheme();
  const color = isFocused ? theme.primary : theme.textSecondary;

  return (
    <Pressable
      {...props}
      accessibilityRole="tab"
      accessibilityState={{ selected: !!isFocused }}
      style={({ pressed }) => [styles.tab, pressed && styles.pressed]}>
      <Icon name={icon} color={color} />
      <Text style={[Typography.tab, { color }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  slot: {
    height: '100%',
  },
  bar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 84,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  tab: {
    flex: 1,
    maxWidth: MaxContentWidth / 5,
    paddingTop: 11,
    alignItems: 'center',
    gap: Spacing.one,
  },
  pressed: {
    opacity: 0.7,
  },
});
