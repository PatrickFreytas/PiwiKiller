import { useRef, useState, type ComponentRef } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { useTheme } from '@/hooks/use-theme';
import { FontFamily } from '@/theme';

type OtpInputProps = {
  value: string;
  onChange: (value: string) => void;
  /** Cantidad de dígitos del código (4 por defecto). */
  length?: number;
};

/** Código de verificación: una casilla por dígito sobre un único campo numérico invisible. */
export function OtpInput({ value, onChange, length = 4 }: OtpInputProps) {
  const theme = useTheme();
  const inputRef = useRef<ComponentRef<typeof TextInput>>(null);
  const [focused, setFocused] = useState(false);

  return (
    <Pressable
      accessibilityLabel={`Código de ${length} dígitos`}
      onPress={() => inputRef.current?.focus()}
      style={styles.row}>
      {Array.from({ length }, (_, index) => {
        const digit = value[index];
        const isNext = focused && index === value.length;

        return (
          <View
            key={index}
            style={[
              styles.box,
              { backgroundColor: theme.backgroundElement },
              digit || isNext
                ? { borderWidth: 2, borderColor: theme.primary }
                : { borderWidth: 1, borderColor: theme.inputBorder },
            ]}>
            <Text style={[styles.digit, { color: digit ? theme.text : theme.iconMuted }]}>
              {digit ?? '_'}
            </Text>
          </View>
        );
      })}
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={(text) => onChange(text.replace(/\D/g, '').slice(0, length))}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        keyboardType="number-pad"
        autoComplete="one-time-code"
        textContentType="oneTimeCode"
        maxLength={length}
        caretHidden
        style={styles.hiddenInput}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  box: {
    width: 64,
    height: 72,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  digit: {
    fontFamily: FontFamily.extraBold,
    fontSize: 30,
    lineHeight: 36,
  },
  hiddenInput: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
  },
});
