import { Pressable, StyleSheet, View } from 'react-native';

import { Spacing } from '@/theme';

import { ThemedText } from '../text/themed-text';

export type SectionHeaderProps = {
  title: string;
  /** Texto del enlace a la derecha ("Ver todas", "Mapa"). */
  actionLabel?: string;
  onActionPress?: () => void;
};

/** Encabezado de sección: título 19 ExtraBold y enlace opcional en coral. */
export function SectionHeader({ title, actionLabel, onActionPress }: SectionHeaderProps) {
  return (
    <View style={styles.row}>
      <ThemedText type="section" style={styles.title}>
        {title}
      </ThemedText>
      {actionLabel ? (
        <Pressable accessibilityRole="button" hitSlop={Spacing.two} onPress={onActionPress}>
          <ThemedText type="label" themeColor="primary">
            {actionLabel}
          </ThemedText>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  title: {
    flex: 1,
  },
});
