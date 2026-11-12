import { TabList, TabSlot, TabTrigger, Tabs, type TabTriggerSlotProps } from 'expo-router/ui';
import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import { Pressable, StyleSheet, Text } from 'react-native';

import { useTheme } from '@/hooks/use-theme';
import { MaxContentWidth, Spacing, Typography } from '@/theme';

type WebSymbol = Extract<SymbolViewProps['name'], object>['web'];

/** Barra de pestañas para web, con el diseño de la barra inferior de la guía de estilo. */
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
        <TabTrigger name="home" href="/" asChild>
          <TabButton icon="home" label="Inicio" />
        </TabTrigger>
        <TabTrigger name="styleguide" href="/styleguide" asChild>
          <TabButton icon="palette" label="Guía" />
        </TabTrigger>
        <TabTrigger name="settings" href="/settings" asChild>
          <TabButton icon="settings" label="Ajustes" />
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}

type TabButtonProps = TabTriggerSlotProps & {
  icon: WebSymbol;
  label: string;
};

/** Pestaña: ícono de 22 px y etiqueta 11 SemiBold; coral si está activa. */
function TabButton({ icon, label, isFocused, ref: _ref, children: _children, ...props }: TabButtonProps) {
  const theme = useTheme();
  const color = isFocused ? theme.primary : theme.textSecondary;

  return (
    <Pressable
      {...props}
      accessibilityRole="tab"
      accessibilityState={{ selected: !!isFocused }}
      style={({ pressed }) => [styles.tab, pressed && styles.pressed]}>
      <SymbolView name={{ web: icon }} size={22} tintColor={color} />
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
