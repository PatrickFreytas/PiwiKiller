import { useRouter } from 'expo-router';
import { Fragment } from 'react';
import { Pressable, Share, StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components/layout';
import { Button, Card, Divider, IconButton, ThemedText } from '@/components/ui';
import { DemoUser } from '@/config/demo';
import { useTheme } from '@/hooks/use-theme';
import { FontFamily, Gradients, Palette, Spacing, Typography } from '@/theme';

import { PointsCard } from '../components/points-card';

/** Saldo de ejemplo del Figma ("07 · Tude Puntos y perfil"). La HU-17 lo reemplaza por Supabase. */
const DEMO_POINTS = {
  points: 1240,
  level: 'Casero 🥈',
  nextLevel: 'Patrón 🥇',
  pointsToNext: 760,
  nextLevelPerk: 'envíos gratis ilimitados',
  coupons: 3,
} as const;

type MenuItem = {
  emoji: string;
  label: string;
  detail?: string;
  onPress?: () => void;
};

/** "07 · Tude Puntos y perfil": saldo de puntos, cupones, código de invitación y accesos. */
export function RewardsScreen() {
  const router = useRouter();
  const theme = useTheme();

  const menu: MenuItem[] = [
    { emoji: '📦', label: 'Mis pedidos', onPress: () => router.push('/pedidos') },
    { emoji: '📍', label: 'Mis direcciones' },
    { emoji: '💳', label: 'Métodos de pago', detail: 'Yape' },
    { emoji: '💬', label: 'Ayuda por WhatsApp' },
  ];

  const shareCode = () => {
    void Share.share({
      message: `Pide en Tude con mi código ${DemoUser.referralCode} y los dos ganamos S/ 5.`,
    });
  };

  return (
    <Screen withTabBar gap={14}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.initials}>{DemoUser.initials}</Text>
        </View>
        <View style={styles.grow}>
          <ThemedText type="section" numberOfLines={1}>
            {DemoUser.displayName}
          </ThemedText>
          <ThemedText type="caption" themeColor="textSecondary">
            Miembro desde {DemoUser.memberSince}
          </ThemedText>
        </View>
        <IconButton
          icon="settings"
          accessibilityLabel="Ajustes"
          onPress={() => router.push('/perfil')}
        />
      </View>

      <PointsCard
        points={DEMO_POINTS.points}
        level={DEMO_POINTS.level}
        nextLevel={DEMO_POINTS.nextLevel}
        pointsToNext={DEMO_POINTS.pointsToNext}
        nextLevelPerk={DEMO_POINTS.nextLevelPerk}
      />

      <View style={styles.tiles}>
        <Card style={styles.tile}>
          <Text style={styles.tileEmoji}>🎟️</Text>
          <ThemedText type="bodyBold">{DEMO_POINTS.coupons} cupones</ThemedText>
          <ThemedText type="meta" themeColor="textSecondary">
            disponibles
          </ThemedText>
        </Card>
        <Card style={styles.tile}>
          <Text style={styles.tileEmoji}>🤝</Text>
          <ThemedText type="bodyBold">Invita y gana</ThemedText>
          <ThemedText type="meta" themeColor="textSecondary">
            S/ 5 para ti y tu pata
          </ThemedText>
        </Card>
      </View>

      <View style={[styles.referral, { backgroundColor: theme.contrast }]}>
        <View style={styles.grow}>
          <Text style={styles.referralLabel}>Tu código para invitar</Text>
          <Text style={styles.referralCode} numberOfLines={1} adjustsFontSizeToFit>
            {DemoUser.referralCode}
          </Text>
        </View>
        <Button label="Compartir" variant="whatsapp" size="sm" onPress={shareCode} />
      </View>

      <View>
        {menu.map((item, index) => (
          <Fragment key={item.label}>
            {index > 0 ? <Divider /> : null}
            <Pressable
              accessibilityRole="button"
              onPress={item.onPress}
              style={({ pressed }) => [styles.menuRow, pressed && styles.pressed]}>
              <Text style={styles.menuEmoji}>{item.emoji}</Text>
              <ThemedText type="callout" style={styles.grow}>
                {item.label}
              </ThemedText>
              <ThemedText type="caption" themeColor="textSecondary">
                {item.detail ? `${item.detail} ›` : '›'}
              </ThemedText>
            </Pressable>
          </Fragment>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundImage: Gradients.plum,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    ...Typography.title,
    color: Palette.blanco,
  },
  grow: {
    flex: 1,
    minWidth: 0,
  },
  tiles: {
    flexDirection: 'row',
    gap: 10,
  },
  tile: {
    flex: 1,
    padding: 14,
    gap: 2,
  },
  tileEmoji: {
    fontSize: 22,
    lineHeight: 26,
    marginBottom: 4,
  },
  referral: {
    minHeight: 68,
    paddingHorizontal: 14,
    paddingVertical: 13,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  referralLabel: {
    ...Typography.meta,
    color: 'rgba(255, 255, 255, 0.67)',
  },
  referralCode: {
    fontFamily: FontFamily.extraBold,
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: 2,
    color: Palette.blanco,
  },
  menuRow: {
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  menuEmoji: {
    fontSize: 20,
    lineHeight: 24,
  },
  pressed: {
    opacity: 0.6,
  },
});
