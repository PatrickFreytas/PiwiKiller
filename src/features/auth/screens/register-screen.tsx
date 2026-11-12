import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components/layout';
import { Button, Checkbox, PhonePrefix, TextField, ThemedText } from '@/components/ui';
import { useTheme } from '@/hooks/use-theme';
import { Radius, Spacing } from '@/theme';

import { AuthFooterLink } from '../components/auth-footer-link';
import { AuthHeader } from '../components/auth-header';
import { PasswordField } from '../components/password-field';

const STRENGTH_LABELS = ['', 'Débil', 'Regular', 'Buena', 'Segura'] as const;

/** Fuerza de la contraseña de 0 a 4: largo, mayúsculas y minúsculas, números y símbolos. */
function getPasswordStrength(password: string) {
  if (password.length === 0) return 0;

  let strength = 1;
  if (password.length >= 8) strength += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
  if (/\d/.test(password) && /[^A-Za-z0-9]/.test(password)) strength += 1;
  return strength;
}

/**
 * "11 · Registro". Solo interfaz: la creación de la cuenta en Supabase llega en la HU-04,
 * así que por ahora el botón lleva a la verificación sin guardar nada.
 */
export function RegisterScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showReferral, setShowReferral] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  const [acceptsTerms, setAcceptsTerms] = useState(false);

  const strength = getPasswordStrength(password);

  return (
    <Screen gap={16}>
      <AuthHeader step={1} />

      <View style={styles.titleBlock}>
        <ThemedText type="heading">Crea tu cuenta</ThemedText>
        <ThemedText themeColor="textSecondary">Solo lo necesario. Sin DNI. 🙌</ThemedText>
      </View>

      <View style={styles.nameRow}>
        <TextField
          label="Nombre"
          placeholder="Patrick"
          autoComplete="given-name"
          value={firstName}
          onChangeText={setFirstName}
          style={styles.grow}
        />
        <TextField
          label="Apellido"
          placeholder="Freytas"
          autoComplete="family-name"
          value={lastName}
          onChangeText={setLastName}
          style={styles.grow}
        />
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

      <TextField
        label="Correo (opcional)"
        placeholder="tucorreo@gmail.com"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        value={email}
        onChangeText={setEmail}
      />

      <View style={styles.passwordBlock}>
        <PasswordField autoComplete="new-password" value={password} onChangeText={setPassword} />
        <View style={styles.strengthRow}>
          {[1, 2, 3, 4].map((level) => (
            <View
              key={level}
              style={[
                styles.strengthBar,
                { backgroundColor: level <= strength ? theme.success : theme.inputBorder },
              ]}
            />
          ))}
          <ThemedText type="metaBold" themeColor="successText" style={styles.strengthLabel}>
            {STRENGTH_LABELS[strength]}
          </ThemedText>
        </View>
      </View>

      {showReferral ? (
        <TextField
          label="Código de un amigo"
          placeholder="PATRICK-TUDE"
          autoCapitalize="characters"
          helper="Los dos ganan S/ 5 con tu primer pedido."
          value={referralCode}
          onChangeText={setReferralCode}
        />
      ) : (
        <Pressable
          accessibilityRole="button"
          onPress={() => setShowReferral(true)}
          style={[
            styles.referral,
            { backgroundColor: theme.warningSoft, borderColor: theme.warning },
          ]}>
          <Text style={styles.referralEmoji}>🎁</Text>
          <ThemedText type="note" style={styles.grow}>
            ¿Tienes código de un amigo? <ThemedText type="label">Agrégalo</ThemedText> y ganan S/ 5
          </ThemedText>
        </Pressable>
      )}

      <Checkbox
        checked={acceptsTerms}
        onChange={setAcceptsTerms}
        accessibilityLabel="Acepto los Términos y la Política de privacidad">
        <ThemedText type="caption" themeColor="textBody" style={styles.grow}>
          Acepto los{' '}
          <ThemedText type="captionBold" themeColor="primary">
            Términos
          </ThemedText>{' '}
          y la{' '}
          <ThemedText type="captionBold" themeColor="primary">
            Política de privacidad
          </ThemedText>
        </ThemedText>
      </Checkbox>

      <Button
        fullWidth
        label="Crear cuenta"
        disabled={!acceptsTerms}
        onPress={() => router.push('/verificar')}
        style={styles.submit}
      />

      <AuthFooterLink
        question="¿Ya tienes cuenta?"
        action="Inicia sesión"
        onPress={() => router.replace('/iniciar-sesion')}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  titleBlock: {
    gap: 6,
  },
  nameRow: {
    flexDirection: 'row',
    gap: 10,
  },
  grow: {
    flex: 1,
    minWidth: 0,
  },
  passwordBlock: {
    gap: 10,
  },
  strengthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  strengthBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  strengthLabel: {
    minWidth: 44,
    textAlign: 'right',
  },
  referral: {
    minHeight: 58,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: Radius.input,
    borderWidth: 1,
    borderStyle: 'dashed',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  referralEmoji: {
    fontSize: 18,
    lineHeight: 21,
  },
  submit: {
    marginTop: Spacing.two,
  },
});
