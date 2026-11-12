import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Hero, Screen, Sheet } from '@/components/layout';
import {
  Button,
  Chip,
  Divider,
  IconButton,
  MapPlaceholder,
  TextField,
  ThemedText,
} from '@/components/ui';
import { DemoAddress, formatPrice } from '@/config/demo';
import { useGoBack } from '@/hooks/use-go-back';
import { useTheme } from '@/hooks/use-theme';
import { FontFamily, Radius, Shadows, Spacing, Typography } from '@/theme';

type Service = 'viaje' | 'envio' | 'mudanza';
type Payment = 'efectivo' | 'yape';

const SERVICES: { id: Service; label: string; action: string }[] = [
  { id: 'viaje', label: '🛺 Viaje', action: 'Buscar mototaxi' },
  { id: 'envio', label: '📦 Envío', action: 'Buscar repartidor' },
  { id: 'mudanza', label: '🚚 Mudanza', action: 'Buscar camioneta' },
];

/** Valores de ejemplo del Figma ("09 · Mototaxi y envíos"). Queda fuera del MVP (versión 2). */
const DEMO_RIDE = {
  destination: 'Plaza de Armas de Pucallpa',
  suggestedMin: 6,
  suggestedMax: 8,
  initialOffer: 7,
  minOffer: 3,
  step: 0.5,
  driversNearby: 5,
} as const;

const MAP_HEIGHT = 330;

/** "09 · Mototaxi y envíos": ruta, oferta de precio y forma de pago. */
export function RidesScreen() {
  const goBack = useGoBack();
  const theme = useTheme();
  const [service, setService] = useState<Service>('viaje');
  const [offer, setOffer] = useState<number>(DEMO_RIDE.initialOffer);
  const [payment, setPayment] = useState<Payment>('efectivo');
  const [showNote, setShowNote] = useState(false);
  const [note, setNote] = useState('');

  const action = SERVICES.find((item) => item.id === service)?.action ?? SERVICES[0].action;
  const canLower = offer > DEMO_RIDE.minOffer;

  return (
    <Screen edgeToEdge gap={0} background="backgroundElement">
      <Hero
        height={MAP_HEIGHT}
        leading={<IconButton icon="back" accessibilityLabel="Volver" onPress={goBack} />}>
        <MapPlaceholder height={MAP_HEIGHT}>
          <View
            style={[
              styles.origin,
              { backgroundColor: theme.primary, borderColor: theme.backgroundElement },
            ]}
          />
          <Text style={styles.destination}>📍</Text>
        </MapPlaceholder>
      </Hero>

      <Sheet background="backgroundElement" handle style={styles.sheet}>
        <View style={[styles.segments, { backgroundColor: theme.backgroundMuted }]}>
          {SERVICES.map((item) => {
            const selected = item.id === service;
            return (
              <Pressable
                key={item.id}
                accessibilityRole="tab"
                accessibilityState={{ selected }}
                onPress={() => setService(item.id)}
                style={[
                  styles.segment,
                  selected && [styles.segmentActive, { backgroundColor: theme.backgroundElement }],
                ]}>
                <Text
                  numberOfLines={1}
                  style={[
                    selected ? styles.segmentTextActive : styles.segmentText,
                    { color: selected ? theme.text : theme.textSecondary },
                  ]}>
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={[styles.route, { borderColor: theme.border }]}>
          <View style={styles.stop}>
            <View style={[styles.dot, { backgroundColor: theme.primary }]} />
            <View style={styles.grow}>
              <ThemedText type="meta" themeColor="textSecondary">
                Recojo
              </ThemedText>
              <ThemedText type="bodyBold" numberOfLines={1}>
                Mi ubicación · {DemoAddress.label.replace('Casa · ', '')}
              </ThemedText>
            </View>
          </View>
          <Divider />
          <View style={styles.stop}>
            <View style={[styles.square, { backgroundColor: theme.contrast }]} />
            <View style={styles.grow}>
              <ThemedText type="meta" themeColor="textSecondary">
                Destino
              </ThemedText>
              <ThemedText type="bodyBold" numberOfLines={1}>
                {DEMO_RIDE.destination}
              </ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.offerHeader}>
          <ThemedText type="subtitle">Tu oferta</ThemedText>
          <ThemedText type="meta" themeColor="textSecondary">
            Precio sugerido: S/ {DEMO_RIDE.suggestedMin} – {DEMO_RIDE.suggestedMax}
          </ThemedText>
        </View>

        <View style={[styles.offer, { backgroundColor: theme.background }]}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Bajar la oferta"
            disabled={!canLower}
            onPress={() => setOffer((value) => value - DEMO_RIDE.step)}
            style={[
              styles.offerButton,
              { backgroundColor: theme.backgroundElement },
              !canLower && styles.disabled,
            ]}>
            <Text style={[styles.offerSign, { color: theme.text }]}>−</Text>
          </Pressable>
          <View style={styles.offerValue}>
            <Text style={[styles.offerAmount, { color: theme.text }]}>{formatPrice(offer)}</Text>
            <ThemedText type="metaBold" themeColor="successText">
              ● {DEMO_RIDE.driversNearby} mototaxis cerca
            </ThemedText>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Subir la oferta"
            onPress={() => setOffer((value) => value + DEMO_RIDE.step)}
            style={[styles.offerButton, { backgroundColor: theme.backgroundElement }]}>
            <Text style={[styles.offerSign, { color: theme.text }]}>+</Text>
          </Pressable>
        </View>

        <View style={styles.chips}>
          <Chip
            label="💵 Efectivo"
            selected={payment === 'efectivo'}
            onPress={() => setPayment('efectivo')}
          />
          <Chip label="Yape" selected={payment === 'yape'} onPress={() => setPayment('yape')} />
          <Chip label="💬 Nota" selected={showNote} onPress={() => setShowNote((value) => !value)} />
        </View>

        {showNote ? (
          <TextField
            placeholder="Nota para el conductor (opcional)"
            value={note}
            onChangeText={setNote}
          />
        ) : null}

        <Button fullWidth label={action} />
      </Sheet>
    </Screen>
  );
}

const styles = StyleSheet.create({
  origin: {
    position: 'absolute',
    left: '19%',
    top: '75%',
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 4,
  },
  destination: {
    position: 'absolute',
    left: '74%',
    top: '33%',
    fontSize: 34,
    lineHeight: 41,
  },
  sheet: {
    gap: 14,
  },
  segments: {
    height: 45,
    padding: 4,
    borderRadius: Radius.input,
    flexDirection: 'row',
    gap: 4,
  },
  segment: {
    flex: 1,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentActive: {
    boxShadow: Shadows.segment,
  },
  segmentText: {
    fontFamily: FontFamily.semiBold,
    fontSize: 14,
    lineHeight: 17,
  },
  segmentTextActive: {
    ...Typography.bodyBold,
  },
  route: {
    borderRadius: Radius.button,
    borderWidth: 1,
  },
  stop: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  square: {
    width: 10,
    height: 10,
    borderRadius: 2,
  },
  grow: {
    flex: 1,
    minWidth: 0,
  },
  offerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  offer: {
    minHeight: 75,
    paddingHorizontal: 10,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  offerButton: {
    width: 48,
    height: 48,
    borderRadius: Radius.input,
    alignItems: 'center',
    justifyContent: 'center',
  },
  offerSign: {
    fontFamily: FontFamily.bold,
    fontSize: 24,
    lineHeight: 29,
  },
  offerValue: {
    flex: 1,
    alignItems: 'center',
  },
  offerAmount: {
    fontFamily: FontFamily.black,
    fontSize: 34,
    lineHeight: 41,
    letterSpacing: -1,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  disabled: {
    opacity: 0.4,
  },
});
