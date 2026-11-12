import type { GradientName } from '@/theme';

export type OrderStatus = 'en_curso' | 'entregado' | 'cancelado';

export type Order = {
  id: string;
  local: string;
  emoji: string;
  gradient: GradientName;
  status: OrderStatus;
  /** Resumen: productos, fecha y total. */
  summary: string;
  /** Solo pedidos en curso: tiempo estimado de llegada. */
  eta?: string;
  /** Solo pedidos entregados: calificación que dio el usuario, si ya calificó. */
  rating?: number;
};

/** Pedidos de ejemplo del Figma ("08 · Mis pedidos"). La HU-15 los reemplaza por Supabase. */
export const DEMO_ORDERS: Order[] = [
  {
    id: 'td-2048',
    local: 'Frutería La Selva',
    emoji: '🥤',
    gradient: 'menta',
    status: 'en_curso',
    summary: '2 productos · S/ 9.50',
    eta: '🛵 6 min',
  },
  {
    id: 'td-2031',
    local: 'Brasa Amazónica',
    emoji: '🍗',
    gradient: 'coral',
    status: 'entregado',
    summary: '10 nov · 1/4 pollo + papas · S/ 18.00',
  },
  {
    id: 'td-2017',
    local: 'Burger Charapa',
    emoji: '🍔',
    gradient: 'sol',
    status: 'entregado',
    summary: '7 nov · Burger regional · S/ 16.50',
    rating: 5,
  },
];
