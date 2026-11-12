import type { GradientName } from '@/theme';

export type CartItem = {
  id: string;
  name: string;
  options: string;
  price: number;
  quantity: number;
  emoji: string;
  gradient: GradientName;
};

/** Carrito de ejemplo del Figma ("05 · Carrito y pago"). La HU-11 lo reemplaza por el store real. */
export const DEMO_CART_ITEMS: CartItem[] = [
  {
    id: 'raspadilla-clasica',
    name: 'Raspadilla clásica',
    options: 'Normal · Fresa, Mango · Leche cond.',
    price: 6.5,
    quantity: 1,
    emoji: '🍧',
    gradient: 'frambuesa',
  },
  {
    id: 'cholao-original',
    name: 'Cholao Original',
    options: 'Grande · sin azúcar',
    price: 6.5,
    quantity: 1,
    emoji: '🥤',
    gradient: 'coral',
  },
];

/** Promoción de ejemplo: descuento fijo mientras la raspadilla siga en el carrito. */
export const DEMO_DISCOUNT = {
  label: 'Descuento 2x1',
  amount: 3.5,
  productId: 'raspadilla-clasica',
} as const;

export type PaymentMethodId = 'yape' | 'plin' | 'efectivo';

export const PAYMENT_METHODS: {
  id: PaymentMethodId;
  name: string;
  hint?: string;
  /** Texto del botón de pago. */
  action: string;
}[] = [
  {
    id: 'yape',
    name: 'Yape',
    hint: 'Paga desde tu app, sin efectivo',
    action: 'Pagar con Yape ·',
  },
  { id: 'plin', name: 'Plin', action: 'Pagar con Plin ·' },
  { id: 'efectivo', name: 'Efectivo', hint: '¿Con cuánto pagas?', action: 'Pagar en efectivo ·' },
];
