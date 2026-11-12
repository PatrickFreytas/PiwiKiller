import { useState, type ReactNode } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';

import { useTheme } from '@/hooks/use-theme';
import { Radius, Spacing, Typography } from '@/theme';

export type TextFieldProps = Omit<TextInputProps, 'style'> & {
  /** Etiqueta sobre el campo ("Celular", "Correo (opcional)"). */
  label?: string;
  /** Mensaje de error; pinta el borde en coral y reemplaza a `helper`. */
  error?: string;
  /** Texto de ayuda debajo del campo. */
  helper?: string;
  /** Contenido a la izquierda del texto (prefijo "+51", ícono). */
  left?: ReactNode;
  /** Contenido a la derecha del texto (mostrar contraseña, limpiar). */
  right?: ReactNode;
  /** Estilo del contenedor (para repartir el ancho entre dos campos, por ejemplo). */
  style?: StyleProp<ViewStyle>;
};

/** Campo de texto: 52 px de alto, radio 14, borde de 1 px, texto 15 Regular. */
export function TextField({
  label,
  error,
  helper,
  left,
  right,
  style,
  onFocus,
  onBlur,
  editable = true,
  ...rest
}: TextFieldProps) {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);

  const borderColor = error || focused ? theme.primary : theme.inputBorder;
  const message = error ?? helper;

  return (
    <View style={[styles.container, style]}>
      {label ? <Text style={[Typography.label, { color: theme.text }]}>{label}</Text> : null}

      <View
        style={[
          styles.field,
          { backgroundColor: theme.backgroundElement, borderColor },
          !editable && styles.disabled,
        ]}>
        {left}
        <TextInput
          accessibilityLabel={label}
          editable={editable}
          placeholderTextColor={theme.textSecondary}
          selectionColor={theme.primary}
          style={[styles.input, { color: theme.text }]}
          onFocus={(event) => {
            setFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            onBlur?.(event);
          }}
          {...rest}
        />
        {right}
      </View>

      {message ? (
        <Text style={[Typography.caption, { color: error ? theme.primary : theme.textSecondary }]}>
          {message}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  field: {
    height: 52,
    paddingHorizontal: 15,
    borderRadius: Radius.input,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  input: {
    flex: 1,
    minWidth: 0,
    height: '100%',
    padding: 0,
    fontFamily: Typography.input.fontFamily,
    fontSize: Typography.input.fontSize,
    // En web quita el recuadro de foco del navegador; el foco se marca con el borde coral.
    outlineWidth: 0,
    outlineColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
  },
});
