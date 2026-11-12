import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components/layout';
import { Button, ThemedText } from '@/components/ui';
import { DemoUser } from '@/config/demo';
import { useTheme } from '@/hooks/use-theme';
import { Radius, Spacing } from '@/theme';

import { AuthHeader } from '../components/auth-header';
import { OtpInput } from '../components/otp-input';

const CODE_LENGTH = 4;
const RESEND_SECONDS = 30;

/**
 * "12 · Verificar celular". Solo interfaz: el envío y la validación del código llegan en la HU-05,
 * así que por ahora cualquier código de 4 dígitos lleva a Inicio.
 */
export function VerifyScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [code, setCode] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((value) => (value > 0 ? value - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const canResend = secondsLeft === 0;
  const countdown = `0:${String(secondsLeft).padStart(2, '0')}`;

  return (
    <Screen
      gap={16}
      footer={
        <View style={styles.footer}>
          <View style={[styles.notice, { backgroundColor: theme.successSoft }]}>
            <Text style={styles.noticeEmoji}>🔒</Text>
            <ThemedText type="caption" themeColor="successText" style={styles.grow}>
              Nunca compartas este código. Tude no te lo pedirá por llamada.
            </ThemedText>
          </View>
          <Button
            fullWidth
            label="Verificar y entrar"
            disabled={code.length < CODE_LENGTH}
            onPress={() => router.replace('/')}
          />
        </View>
      }>
      <AuthHeader step={2} />

      <View style={[styles.icon, { backgroundColor: theme.primarySoft }]}>
        <Text style={styles.iconEmoji}>📲</Text>
      </View>

      <View style={styles.titleBlock}>
        <ThemedText type="heading" style={styles.center}>
          Verifica tu celular
        </ThemedText>
        <ThemedText themeColor="textSecondary" style={[styles.center, styles.description]}>
          Te enviamos un código de {CODE_LENGTH} dígitos por WhatsApp al{' '}
          <ThemedText type="bodyBold">{DemoUser.phone}</ThemedText>
        </ThemedText>
      </View>

      <OtpInput value={code} onChange={setCode} length={CODE_LENGTH} />

      <View style={styles.resend}>
        <View style={styles.resendRow}>
          <ThemedText themeColor="textSecondary">¿No te llegó?</ThemedText>
          {canResend ? (
            <Pressable
              accessibilityRole="button"
              hitSlop={Spacing.two}
              onPress={() => setSecondsLeft(RESEND_SECONDS)}>
              <ThemedText type="bodyBold" themeColor="primary">
                Reenviar código
              </ThemedText>
            </Pressable>
          ) : (
            <ThemedText type="bodyBold">Reenviar en {countdown}</ThemedText>
          )}
        </View>
        <Pressable accessibilityRole="button" hitSlop={Spacing.two}>
          <ThemedText type="bodyBold" themeColor="primary">
            Enviar por SMS
          </ThemedText>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 96,
    height: 96,
    borderRadius: 30,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.two,
  },
  iconEmoji: {
    fontSize: 48,
    lineHeight: 59,
  },
  titleBlock: {
    gap: 10,
    alignItems: 'center',
  },
  center: {
    textAlign: 'center',
  },
  description: {
    maxWidth: 260,
    lineHeight: 21,
  },
  resend: {
    alignItems: 'center',
    gap: 10,
  },
  resendRow: {
    flexDirection: 'row',
    gap: 4,
  },
  footer: {
    gap: 14,
  },
  notice: {
    minHeight: 54,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: Radius.input,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  noticeEmoji: {
    fontSize: 16,
    lineHeight: 20,
  },
  grow: {
    flex: 1,
    minWidth: 0,
  },
});
