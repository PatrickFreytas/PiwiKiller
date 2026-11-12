import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ui';

type AuthFooterLinkProps = {
  question: string;
  action: string;
  onPress: () => void;
};

/** Enlace al pie de las pantallas de cuenta: "¿Nuevo en Tude? Crea tu cuenta". */
export function AuthFooterLink({ question, action, onPress }: AuthFooterLinkProps) {
  return (
    <View style={styles.row}>
      <ThemedText themeColor="textSecondary">{question}</ThemedText>
      <Pressable accessibilityRole="link" hitSlop={8} onPress={onPress}>
        <ThemedText type="bodyBold" themeColor="primary">
          {action}
        </ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 4,
  },
});
