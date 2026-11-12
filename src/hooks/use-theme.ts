import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/theme';

/** Devuelve los colores del tema activo (claro u oscuro). */
export function useTheme() {
  const scheme = useColorScheme();
  return Colors[scheme === 'dark' ? 'dark' : 'light'];
}
