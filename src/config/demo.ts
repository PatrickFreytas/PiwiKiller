/**
 * Datos de ejemplo tomados del Figma para las pantallas que todavía no leen datos reales
 * (sesión, direcciones, carrito, pedidos, puntos). Cada HU los reemplaza por datos de Supabase;
 * cuando ya nadie importe este archivo, se borra.
 */
export const DemoUser = {
  firstName: 'Patrick',
  displayName: 'Patrick F.',
  initials: 'PF',
  memberSince: 2026,
  phone: '+51 987 654 321',
  referralCode: 'PATRICK-TUDE',
} as const;

export const DemoAddress = {
  label: 'Casa · Av. Centenario 747',
  reference: 'Ref: portón negro, 2do piso',
} as const;

/** Local de ejemplo usado en restaurante, carrito, seguimiento y pedidos. */
export const DemoLocal = {
  name: 'Frutería La Selva',
  emoji: '🍹',
  categories: 'Jugos · Cholao · Raspadillas',
  address: 'Av. Amazonas',
  rating: 4.9,
  reviews: 320,
  deliveryTime: '10–20 min',
  closesAt: '10 pm',
} as const;

/** Da formato de precio en soles: `S/ 6.50`. */
export function formatPrice(amount: number) {
  return `S/ ${amount.toFixed(2)}`;
}
