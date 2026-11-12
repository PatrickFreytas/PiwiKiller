import { getSupabaseClient } from '@/lib/supabase';

export type CatalogLocal = {
  id: string;
  nombre: string;
  calificacion: number;
  tiempo_entrega_minutos: number;
  costo_envio: number;
  abierto: boolean;
};

export type CatalogProduct = {
  id: string;
  local_id: string;
  nombre: string;
  descripcion: string;
  precio: number;
};

export type Catalog = {
  locales: CatalogLocal[];
  productos: CatalogProduct[];
};

export async function fetchCatalog(): Promise<Catalog> {
  const supabase = getSupabaseClient();
  const [localesResult, productosResult] = await Promise.all([
    supabase
      .from('locales')
      .select('id, nombre, calificacion, tiempo_entrega_minutos, costo_envio, abierto')
      .eq('activo', true)
      .order('nombre'),
    supabase
      .from('productos')
      .select('id, local_id, nombre, descripcion, precio')
      .eq('disponible', true)
      .order('nombre'),
  ]);

  if (localesResult.error) {
    throw new Error(`No se pudieron cargar los locales: ${localesResult.error.message}`);
  }

  if (productosResult.error) {
    throw new Error(`No se pudieron cargar los productos: ${productosResult.error.message}`);
  }

  return {
    locales: localesResult.data,
    productos: productosResult.data,
  };
}
