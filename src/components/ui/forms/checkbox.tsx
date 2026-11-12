import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '@/hooks/use-theme';
import { Palette, Spacing } from '@/theme';

import { Icon } from '../display/icon';

export type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  /** Texto o contenido a la derecha de la casilla. */
  children?: ReactNode;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
};

/** Casilla de 22 px con radio 7: coral con check cuando está marcada. */
export function Checkbox({ checked, onChange, children, accessibilityLabel, style }: CheckboxProps) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      accessibilityLabel={accessibilityLabel}
      hitSlop={Spacing.two}
      onPress={() => onChange(!checked)}
      style={[styles.row, style]}>
      <View
        style={[
          styles.box,
          checked
            ? { backgroundColor: theme.primary, borderColor: theme.primary }
            : { borderColor: theme.iconMuted },
        ]}>
        {checked ? <Icon name="check" size={14} color={Palette.blanco} /> : null}
      </View>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  box: {
    width: 22,
    height: 22,
    borderRadius: 7,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
