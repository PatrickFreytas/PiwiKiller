import { Platform } from 'react-native';

/** Escala de espaciado (grid de 4 px). Usar siempre estos valores en márgenes, paddings y gaps. */
export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

/** Margen lateral de todas las pantallas (guía de estilo: 20 px). */
export const ScreenMargin = 20;

/** Espacio que ocupa la barra de pestañas inferior en cada plataforma. */
export const BottomTabInset = Platform.select({ ios: 50, android: 80, web: 84 }) ?? 0;

/** Ancho máximo del contenido en pantallas grandes (tablet / web). */
export const MaxContentWidth = 800;
