type Table<Row> = {
  Row: Row;
  Insert: Partial<Row>;
  Update: Partial<Row>;
  Relationships: [];
};

type Usuario = {
  id: string;
  nombres: string;
  apellidos: string;
  celular: string | null;
  correo: string | null;
  codigo_amigo: string;
  referido_por: string | null;
  created_at: string;
  updated_at: string;
};

type Local = {
  id: string;
  slug: string;
  nombre: string;
  descripcion: string;
  categoria_destacada_id: string | null;
  direccion: string;
  telefono: string | null;
  calificacion: number;
  tiempo_entrega_minutos: number;
  costo_envio: number;
  abierto: boolean;
  activo: boolean;
  created_at: string;
};

type Categoria = {
  id: string;
  nombre: string;
  slug: string;
  orden: number;
  activo: boolean;
  created_at: string;
};

type Producto = {
  id: string;
  local_id: string;
  categoria_id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen_url: string | null;
  destacado: boolean;
  disponible: boolean;
  created_at: string;
};

type GrupoOpcion = {
  id: string;
  producto_id: string;
  nombre: string;
  requerido: boolean;
  minimo_selecciones: number;
  maximo_selecciones: number;
  orden: number;
  activo: boolean;
};

type Opcion = {
  id: string;
  grupo_opcion_id: string;
  nombre: string;
  precio_adicional: number;
  orden: number;
  activo: boolean;
};

type Pedido = {
  id: string;
  usuario_id: string;
  local_id: string;
  estado: string;
  metodo_pago: string;
  estado_pago: string;
  subtotal: number;
  costo_envio: number;
  descuento: number;
  total: number;
  direccion_entrega: string;
  referencia: string | null;
  telefono_contacto: string;
  created_at: string;
  updated_at: string;
};

type PedidoItem = {
  id: string;
  pedido_id: string;
  producto_id: string | null;
  nombre_producto: string;
  precio_unitario: number;
  cantidad: number;
  nota: string | null;
};

type PedidoItemOpcion = {
  id: string;
  pedido_item_id: string;
  opcion_id: string | null;
  nombre_opcion: string;
  precio_adicional: number;
};

type Punto = {
  id: string;
  usuario_id: string;
  pedido_id: string | null;
  cantidad: number;
  motivo: string;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      usuarios: Table<Usuario>;
      locales: Table<Local>;
      categorias: Table<Categoria>;
      productos: Table<Producto>;
      grupos_opciones: Table<GrupoOpcion>;
      opciones: Table<Opcion>;
      pedidos: Table<Pedido>;
      pedido_items: Table<PedidoItem>;
      pedido_item_opciones: Table<PedidoItemOpcion>;
      puntos: Table<Punto>;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
