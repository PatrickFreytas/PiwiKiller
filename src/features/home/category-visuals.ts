import type { GradientName } from '@/theme';

type CategoryVisual = {
  emoji: string;
  gradient: GradientName;
  /** Nombre corto para la tira de categorías. */
  shortName?: string;
};

/** Emoji y degradado de cada categoría, por `slug`. La base de datos aún no guarda imágenes. */
const VISUALS: Record<string, CategoryVisual> = {
  hamburguesas: { emoji: '🍔', gradient: 'sol', shortName: 'Burgers' },
  'pollo-a-la-brasa': { emoji: '🍗', gradient: 'coral', shortName: 'Pollo' },
  pizzas: { emoji: '🍕', gradient: 'frambuesa', shortName: 'Pizza' },
  'comida-amazonica': { emoji: '🍲', gradient: 'menta', shortName: 'Regional' },
  postres: { emoji: '🍰', gradient: 'plum' },
  'pescados-y-mariscos': { emoji: '🐟', gradient: 'cielo', shortName: 'Ceviche' },
  acompanamientos: { emoji: '🍟', gradient: 'sol', shortName: 'Extras' },
};

const FALLBACK: CategoryVisual = { emoji: '🍽️', gradient: 'coral' };

export function getCategoryVisual(slug: string | undefined): CategoryVisual {
  return (slug && VISUALS[slug]) || FALLBACK;
}
