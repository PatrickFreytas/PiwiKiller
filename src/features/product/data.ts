/** Producto de ejemplo del Figma ("04 · Personalizar producto"). La HU-10 lo reemplaza por Supabase. */
export const DEMO_PRODUCT = {
  name: 'Raspadilla clásica',
  emoji: '🍧',
  promo: '2x1 hoy',
  description:
    'Hielo raspado con jarabe natural de frutas amazónicas. Elige hasta 3 sabores.',
  sizes: [
    { id: 'pequeno', name: 'Pequeño', price: 3.5 },
    { id: 'normal', name: 'Normal', price: 5.5 },
    { id: 'grande', name: 'Grande', price: 7.5 },
  ],
  defaultSizeId: 'normal',
  maxFlavors: 3,
  flavors: [
    { id: 'fresa', label: '🍓 Fresa' },
    { id: 'mango', label: '🥭 Mango' },
    { id: 'naranja', label: '🍊 Naranja' },
    { id: 'menta', label: '🌿 Menta' },
    { id: 'pina', label: '🍍 Piña' },
    { id: 'maracuya', label: '💛 Maracuyá' },
  ],
  defaultFlavorIds: ['fresa', 'mango'],
  extras: [
    { id: 'leche', name: 'Leche condensada', price: 1 },
    { id: 'fruta', name: 'Fruta picada', price: 1.5 },
  ],
  defaultExtraIds: ['leche'],
} as const;
