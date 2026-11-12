import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import type { ColorValue, StyleProp, ViewStyle } from 'react-native';

import { useTheme } from '@/hooks/use-theme';
import type { ThemeColor } from '@/theme';

type SymbolNames = Extract<SymbolViewProps['name'], object>;

/** Íconos de la app: símbolo de SF Symbols (iOS) y de Material Symbols (Android y web). */
const ICONS = {
  back: { ios: 'chevron.left', android: 'chevron_left' },
  chevronDown: { ios: 'chevron.down', android: 'keyboard_arrow_down' },
  search: { ios: 'magnifyingglass', android: 'search' },
  filters: { ios: 'slider.horizontal.3', android: 'tune' },
  bell: { ios: 'bell', android: 'notifications' },
  location: { ios: 'mappin.and.ellipse', android: 'location_on' },
  share: { ios: 'square.and.arrow.up', android: 'share' },
  eye: { ios: 'eye', android: 'visibility' },
  eyeOff: { ios: 'eye.slash', android: 'visibility_off' },
  check: { ios: 'checkmark', android: 'check' },
  settings: { ios: 'gearshape', android: 'settings' },
  phone: { ios: 'phone', android: 'call' },
  chat: { ios: 'message', android: 'chat' },
  home: { ios: 'house.fill', android: 'home' },
  orders: { ios: 'bag', android: 'shopping_bag' },
  points: { ios: 'star', android: 'star' },
  profile: { ios: 'person', android: 'person' },
} as const satisfies Record<string, { ios: SymbolNames['ios']; android: SymbolNames['android'] }>;

export type IconName = keyof typeof ICONS;

export type IconProps = {
  name: IconName;
  /** Tamaño en px (22 por defecto, como en el diseño). */
  size?: number;
  /** Color del tema (`text` por defecto). */
  themeColor?: ThemeColor;
  /** Color directo, cuando el ícono va sobre un fondo de marca. */
  color?: ColorValue;
  style?: StyleProp<ViewStyle>;
};

/** Ícono de línea. Usa siempre este componente en vez de `SymbolView` directamente. */
export function Icon({ name, size = 22, themeColor = 'text', color, style }: IconProps) {
  const theme = useTheme();
  const { ios, android } = ICONS[name];

  return (
    <SymbolView
      name={{ ios, android, web: android }}
      size={size}
      tintColor={color ?? theme[themeColor]}
      style={style}
    />
  );
}
