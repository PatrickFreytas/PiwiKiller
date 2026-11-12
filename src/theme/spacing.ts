import { Platform } from 'react-native';

/** Escala de espaciado. Usar siempre estos valores en márgenes, paddings y gaps. */
export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

/** Espacio que ocupa la barra de pestañas inferior en cada plataforma. */
export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;

/** Ancho máximo del contenido en pantallas grandes (tablet / web). */
export const MaxContentWidth = 800;
