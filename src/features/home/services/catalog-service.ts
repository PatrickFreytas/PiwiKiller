import { getSupabaseClient } from '@/lib/supabase';

export type CatalogCategory = {
  id: string;
  nombre: string;
  slug: string;
};

export type CatalogLocal = {
  id: string;
  nombre: string;
  calificacion: number;
  tiempo_entrega_minutos: number;
  costo_envio: number;
  abierto: boolean;
  /** Categoría destacada del local, si tiene. */
  categoria: CatalogCategory | null;
  /** Precio del producto más barato del local; `null` si no tiene productos. */
  precio_desde: number | null;
};

export type Catalog = {
  categorias: CatalogCategory[];
  locales: CatalogLocal[];
  /** Total de productos disponibles en el catálogo. */
  totalProductos: number;
};

/** Lee categorías, locales activos y productos disponibles, y arma el catálogo de Inicio. */
export async function fetchCatalog(): Promise<Catalog> {
  const supabase = getSupabaseClient();
  const [categoriasResult, localesResult, productosResult] = await Promise.all([
    supabase.from('categorias').select('id, nombre, slug').eq('activo', true).order('orden'),
    supabase
      .from('locales')
      .select(
        'id, nombre, calificacion, tiempo_entrega_minutos, costo_envio, abierto, categoria_destacada_id',
      )
      .eq('activo', true)
      .order('nombre'),
    supabase.from('productos').select('local_id, precio').eq('disponible', true),
  ]);

  if (categoriasResult.error) {
    throw new Error(`No se pudieron cargar las categorías: ${categoriasResult.error.message}`);
  }

  if (localesResult.error) {
    throw new Error(`No se pudieron cargar los locales: ${localesResult.error.message}`);
  }

  if (productosResult.error) {
    throw new Error(`No se pudieron cargar los productos: ${productosResult.error.message}`);
  }

  const categorias = categoriasResult.data;
  const categoriasPorId = new Map(categorias.map((categoria) => [categoria.id, categoria]));

  const precioDesde = new Map<string, number>();
  for (const producto of productosResult.data) {
    const actual = precioDesde.get(producto.local_id);
    if (actual === undefined || producto.precio < actual) {
      precioDesde.set(producto.local_id, producto.precio);
    }
  }

  return {
    categorias,
    totalProductos: productosResult.data.length,
    locales: localesResult.data.map(({ categoria_destacada_id, ...local }) => ({
      ...local,
      categoria: categoria_destacada_id
        ? (categoriasPorId.get(categoria_destacada_id) ?? null)
        : null,
      precio_desde: precioDesde.get(local.id) ?? null,
    })),
  };
}
