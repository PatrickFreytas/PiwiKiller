import { StyleSheet, Text, View } from 'react-native';

import { Pill } from '@/components/ui';
import { formatPrice } from '@/config/demo';
import { FontFamily, Gradients, Palette, Typography } from '@/theme';

type PointsCardProps = {
  points: number;
  level: string;
  nextLevel: string;
  /** Puntos que faltan para el siguiente nivel. */
  pointsToNext: number;
  /** Beneficio del siguiente nivel. */
  nextLevelPerk: string;
};

/** Cada punto vale S/ 0.01 al canjear. */
const POINT_VALUE = 0.01;

/** Tarjeta de Tude Puntos: saldo, equivalencia en soles y avance al siguiente nivel. */
export function PointsCard({ points, level, nextLevel, pointsToNext, nextLevelPerk }: PointsCardProps) {
  const progress = points / (points + pointsToNext);

  return (
    <View style={styles.card}>
      <View style={styles.bubble} />
      <View style={styles.header}>
        <Text style={styles.label}>TUDE PUNTOS</Text>
        <Pill label={`Nivel ${level}`} tone="glass" />
      </View>
      <Text style={styles.points}>{points.toLocaleString('en-US')}</Text>
      <Text style={styles.equivalence}>
        = {formatPrice(points * POINT_VALUE)} para tu próximo pedido
      </Text>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${Math.round(progress * 100)}%` }]} />
      </View>
      <Text style={styles.next}>
        {pointsToNext} pts más para Nivel <Text style={styles.nextLevel}>{nextLevel}</Text> (
        {nextLevelPerk})
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 24,
    backgroundImage: Gradients.puntos,
    overflow: 'hidden',
  },
  bubble: {
    position: 'absolute',
    right: -30,
    top: -30,
    width: 140,
    height: 140,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.13)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    ...Typography.label,
    color: Palette.blanco,
  },
  points: {
    marginTop: 6,
    fontFamily: FontFamily.black,
    fontSize: 44,
    lineHeight: 54,
    letterSpacing: -1.5,
    color: Palette.blanco,
  },
  equivalence: {
    ...Typography.note,
    color: Palette.blanco,
  },
  track: {
    marginTop: 14,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    overflow: 'hidden',
  },
  fill: {
    height: 8,
    borderRadius: 4,
    backgroundColor: Palette.blanco,
  },
  next: {
    ...Typography.caption,
    marginTop: 6,
    color: Palette.blanco,
  },
  nextLevel: {
    fontFamily: FontFamily.bold,
  },
});
