import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Hero, Screen, Sheet } from '@/components/layout';
import { Button, Checkbox, Divider, PhonePrefix, TextField, ThemedText } from '@/components/ui';
import { useTheme } from '@/hooks/use-theme';
import { FontFamily, Palette, Radius, Spacing, Typography } from '@/theme';

import { AuthFooterLink } from '../components/auth-footer-link';
import { PasswordField } from '../components/password-field';

/**
 * "10 · Iniciar sesión". Solo interfaz: el inicio de sesión real con Supabase llega en la HU-06,
 * así que por ahora el botón lleva directo a Inicio.
 */
export function LoginScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);

  const enter = () => router.replace('/');

  return (
    <Screen edgeToEdge gap={0}>
      <Hero gradient="bienvenida" height={330}>
        <Text style={[styles.decoration, styles.burger]}>🍔</Text>
        <Text style={[styles.decoration, styles.drink]}>🥤</Text>
        <Text style={[styles.decoration, styles.chicken]}>🍗</Text>
        <View style={styles.brand}>
          <View style={styles.brandRow}>
            <View style={styles.logo}>
              <Text style={[styles.logoLetter, { color: theme.primary }]}>t</Text>
            </View>
            <Text style={styles.wordmark}>
              tude<Text style={{ color: theme.contrast }}>.</Text>
            </Text>
          </View>
          <Text style={styles.tagline}>Todo lo que se te{'\n'}antoja, a tu puerta.</Text>
        </View>
      </Hero>

      <Sheet style={styles.sheet}>
        <View style={styles.titleBlock}>
          <ThemedText type="headline">Inicia sesión</ThemedText>
          <ThemedText themeColor="textSecondary">Qué bueno verte de nuevo 👋</ThemedText>
        </View>

        <TextField
          label="Celular"
          placeholder="987 654 321"
          keyboardType="phone-pad"
          autoComplete="tel"
          value={phone}
          onChangeText={setPhone}
          left={<PhonePrefix />}
        />
        <PasswordField value={password} onChangeText={setPassword} />

        <View style={styles.optionsRow}>
          <Checkbox checked={remember} onChange={setRemember}>
            <ThemedText type="note">Recordarme</ThemedText>
          </Checkbox>
          <Pressable accessibilityRole="link" hitSlop={Spacing.two}>
            <ThemedText type="label" themeColor="primary">
              ¿Olvidaste tu contraseña?
            </ThemedText>
          </Pressable>
        </View>

        <Button fullWidth label="Iniciar sesión" onPress={enter} />

        <View style={styles.dividerRow}>
          <Divider style={styles.grow} />
          <ThemedText type="meta" themeColor="textSecondary">
            o entra con
          </ThemedText>
          <Divider style={styles.grow} />
        </View>

        <View style={styles.socialRow}>
          <Pressable
            accessibilityRole="button"
            style={[
              styles.social,
              styles.grow,
              { backgroundColor: theme.backgroundElement, borderColor: theme.border },
            ]}>
            <View style={[styles.whatsapp, { backgroundColor: theme.whatsapp }]}>
              <Text style={styles.whatsappEmoji}>💬</Text>
            </View>
            <Text style={[styles.socialLabel, { color: theme.text }]}>Código WhatsApp</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Entrar con Google"
            style={[
              styles.social,
              styles.socialSquare,
              { backgroundColor: theme.backgroundElement, borderColor: theme.border },
            ]}>
            <Text style={[styles.socialLetter, { color: Palette.google }]}>G</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Entrar con Facebook"
            style={[
              styles.social,
              styles.socialSquare,
              { backgroundColor: theme.backgroundElement, borderColor: theme.border },
            ]}>
            <Text style={[styles.socialLetter, { color: Palette.facebook }]}>f</Text>
          </Pressable>
        </View>

        <AuthFooterLink
          question="¿Nuevo en Tude?"
          action="Crea tu cuenta"
          onPress={() => router.push('/registro')}
        />
      </Sheet>
    </Screen>
  );
}

const styles = StyleSheet.create({
  decoration: {
    position: 'absolute',
  },
  burger: {
    right: 10,
    top: 70,
    fontSize: 120,
    lineHeight: 145,
  },
  drink: {
    right: 136,
    top: 190,
    fontSize: 64,
    lineHeight: 77,
  },
  chicken: {
    right: 34,
    top: 220,
    fontSize: 56,
    lineHeight: 68,
  },
  brand: {
    position: 'absolute',
    left: 24,
    top: 84,
    gap: 18,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    width: 52,
    height: 52,
    borderRadius: Radius.button,
    backgroundColor: Palette.blanco,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoLetter: {
    fontFamily: FontFamily.black,
    fontSize: 30,
    lineHeight: 36,
  },
  wordmark: {
    fontFamily: FontFamily.black,
    fontSize: 40,
    lineHeight: 49,
    letterSpacing: -1.5,
    color: Palette.blanco,
  },
  tagline: {
    ...Typography.title,
    letterSpacing: -0.4,
    color: Palette.blanco,
  },
  sheet: {
    gap: 16,
  },
  titleBlock: {
    gap: 4,
  },
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  grow: {
    flex: 1,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 10,
  },
  social: {
    height: 50,
    borderRadius: Radius.button,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
  },
  socialSquare: {
    width: 50,
  },
  socialLabel: {
    fontFamily: FontFamily.extraBold,
    fontSize: 14,
    lineHeight: 17,
  },
  socialLetter: {
    fontFamily: FontFamily.black,
    fontSize: 19,
    lineHeight: 24,
  },
  whatsapp: {
    width: 22,
    height: 22,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  whatsappEmoji: {
    fontSize: 12,
    lineHeight: 15,
  },
});
