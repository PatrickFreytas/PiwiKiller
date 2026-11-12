import { useState } from 'react';
import { Pressable } from 'react-native';

import { Icon, TextField, type TextFieldProps } from '@/components/ui';

/** Campo de contraseña con botón para mostrarla u ocultarla. */
export function PasswordField(props: Omit<TextFieldProps, 'secureTextEntry' | 'right'>) {
  const [visible, setVisible] = useState(false);

  return (
    <TextField
      label="Contraseña"
      placeholder="••••••••"
      autoCapitalize="none"
      autoComplete="password"
      secureTextEntry={!visible}
      right={
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          hitSlop={8}
          onPress={() => setVisible((value) => !value)}>
          <Icon name={visible ? 'eyeOff' : 'eye'} size={20} themeColor="textSecondary" />
        </Pressable>
      }
      {...props}
    />
  );
}
