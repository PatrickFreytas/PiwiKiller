import { Colors } from '@/theme';

/** Devuelve los colores del tema. Por ahora solo existe el modo claro (ver `@/theme/colors`). */
export function useTheme() {
  return Colors.light;
}
