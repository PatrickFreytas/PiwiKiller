import type { GradientName } from '@/theme';

export type MenuProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  emoji: string;
  gradient: GradientName;
  badge?: string;
};

export type MenuSection = {
  id: string;
  /** Nombre corto para el chip. */
  chip: string;
  title: string;
  products: MenuProduct[];
};

/** Menú de ejemplo del Figma ("03 · Restaurante y menú"). La HU-09 lo reemplaza por Supabase. */
export const DEMO_MENU: MenuSection[] = [
  {
    id: 'populares',
    chip: 'Populares',
    title: '🔥 Populares',
    products: [
      {
        id: 'cholao-original',
        name: 'Cholao Original',
        description: 'Fresa, maracuyá, plátano…',
        price: 6.5,
        emoji: '🍧',
        gradient: 'frambuesa',
        badge: '⭐ Top 1',
      },
      {
        id: 'cholao-tropical',
        name: 'Cholao Tropical',
        description: 'Mango, piña, sandía…',
        price: 6.5,
        emoji: '🥭',
        gradient: 'sol',
      },
    ],
  },
  {
    id: 'raspadillas',
    chip: 'Raspadillas',
    title: 'Raspadillas',
    products: [
      {
        id: 'raspadilla-clasica',
        name: 'Raspadilla clásica',
        description: 'Hielo raspado con jarabe natural…',
        price: 5.5,
        emoji: '🍧',
        gradient: 'coral',
        badge: '2x1 hoy',
      },
    ],
  },
];

/** Carrito de ejemplo que muestra el botón "Ver carrito". */
export const DEMO_CART_SUMMARY = { items: 2, total: 13 } as const;
