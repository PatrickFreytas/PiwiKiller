create table public.categorias (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  slug text not null unique,
  orden integer not null default 0,
  activo boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.locales (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  nombre text not null,
  descripcion text not null default '',
  categoria_destacada_id uuid references public.categorias(id) on delete set null,
  direccion text not null,
  telefono text,
  calificacion numeric(2, 1) not null default 0 check (calificacion between 0 and 5),
  tiempo_entrega_minutos integer not null check (tiempo_entrega_minutos > 0),
  costo_envio numeric(8, 2) not null default 0 check (costo_envio >= 0),
  abierto boolean not null default false,
  activo boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.usuarios (
  id uuid primary key references auth.users(id) on delete cascade,
  nombres text not null default '',
  apellidos text not null default '',
  celular text unique,
  correo text,
  codigo_amigo text not null unique,
  referido_por uuid references public.usuarios(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.productos (
  id uuid primary key default gen_random_uuid(),
  local_id uuid not null references public.locales(id) on delete cascade,
  categoria_id uuid not null references public.categorias(id) on delete restrict,
  nombre text not null,
  descripcion text not null default '',
  precio numeric(10, 2) not null check (precio >= 0),
  imagen_url text,
  destacado boolean not null default false,
  disponible boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.grupos_opciones (
  id uuid primary key default gen_random_uuid(),
  producto_id uuid not null references public.productos(id) on delete cascade,
  nombre text not null,
  requerido boolean not null default false,
  minimo_selecciones integer not null default 0 check (minimo_selecciones >= 0),
  maximo_selecciones integer not null default 1 check (maximo_selecciones > 0),
  orden integer not null default 0,
  activo boolean not null default true,
  check (minimo_selecciones <= maximo_selecciones),
  check (not requerido or minimo_selecciones > 0)
);

create table public.opciones (
  id uuid primary key default gen_random_uuid(),
  grupo_opcion_id uuid not null references public.grupos_opciones(id) on delete cascade,
  nombre text not null,
  precio_adicional numeric(10, 2) not null default 0 check (precio_adicional >= 0),
  orden integer not null default 0,
  activo boolean not null default true
);

create table public.pedidos (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid not null references public.usuarios(id) on delete restrict,
  local_id uuid not null references public.locales(id) on delete restrict,
  estado text not null default 'confirmado'
    check (estado in ('confirmado', 'aceptado', 'preparando', 'en_camino', 'entregado', 'cancelado')),
  metodo_pago text not null check (metodo_pago in ('yape', 'plin', 'efectivo')),
  estado_pago text not null default 'pendiente'
    check (estado_pago in ('pendiente', 'verificado', 'rechazado')),
  subtotal numeric(10, 2) not null check (subtotal >= 0),
  costo_envio numeric(8, 2) not null default 0 check (costo_envio >= 0),
  descuento numeric(10, 2) not null default 0 check (descuento >= 0),
  total numeric(10, 2) not null check (total >= 0),
  direccion_entrega text not null,
  referencia text,
  telefono_contacto text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.pedido_items (
  id uuid primary key default gen_random_uuid(),
  pedido_id uuid not null references public.pedidos(id) on delete cascade,
  producto_id uuid references public.productos(id) on delete set null,
  nombre_producto text not null,
  precio_unitario numeric(10, 2) not null check (precio_unitario >= 0),
  cantidad integer not null check (cantidad > 0),
  nota text
);

create table public.pedido_item_opciones (
  id uuid primary key default gen_random_uuid(),
  pedido_item_id uuid not null references public.pedido_items(id) on delete cascade,
  opcion_id uuid references public.opciones(id) on delete set null,
  nombre_opcion text not null,
  precio_adicional numeric(10, 2) not null default 0 check (precio_adicional >= 0)
);

create table public.puntos (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid not null references public.usuarios(id) on delete cascade,
  pedido_id uuid references public.pedidos(id) on delete set null,
  cantidad integer not null check (cantidad <> 0),
  motivo text not null,
  created_at timestamptz not null default now()
);

create index productos_local_disponibles_idx
  on public.productos (local_id, disponible);
create index productos_categoria_idx
  on public.productos (categoria_id);
create index grupos_opciones_producto_idx
  on public.grupos_opciones (producto_id, orden);
create index opciones_grupo_idx
  on public.opciones (grupo_opcion_id, orden);
create index pedidos_usuario_fecha_idx
  on public.pedidos (usuario_id, created_at desc);
create index pedido_items_pedido_idx
  on public.pedido_items (pedido_id);
create index puntos_usuario_fecha_idx
  on public.puntos (usuario_id, created_at desc);

create or replace function public.crear_usuario_desde_auth()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.usuarios (
    id,
    nombres,
    apellidos,
    celular,
    correo,
    codigo_amigo
  )
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'nombres', ''),
    coalesce(new.raw_user_meta_data ->> 'apellidos', ''),
    new.phone,
    new.email,
    upper(substr(replace(new.id::text, '-', ''), 1, 10))
  );

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.crear_usuario_desde_auth();

create or replace function public.actualizar_fecha_modificacion()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger usuarios_actualizar_fecha
  before update on public.usuarios
  for each row execute function public.actualizar_fecha_modificacion();

create trigger pedidos_actualizar_fecha
  before update on public.pedidos
  for each row execute function public.actualizar_fecha_modificacion();

alter table public.usuarios enable row level security;
alter table public.locales enable row level security;
alter table public.categorias enable row level security;
alter table public.productos enable row level security;
alter table public.grupos_opciones enable row level security;
alter table public.opciones enable row level security;
alter table public.pedidos enable row level security;
alter table public.pedido_items enable row level security;
alter table public.pedido_item_opciones enable row level security;
alter table public.puntos enable row level security;

create policy locales_catalogo_publico
  on public.locales for select to anon, authenticated
  using (activo);

create policy categorias_catalogo_publico
  on public.categorias for select to anon, authenticated
  using (activo);

create policy productos_disponibles_publicos
  on public.productos for select to anon, authenticated
  using (
    disponible
    and exists (
      select 1
      from public.locales
      where locales.id = productos.local_id
        and locales.activo
    )
  );

create policy grupos_opciones_disponibles_publicos
  on public.grupos_opciones for select to anon, authenticated
  using (
    activo
    and exists (
      select 1
      from public.productos
      join public.locales on locales.id = productos.local_id
      where productos.id = grupos_opciones.producto_id
        and productos.disponible
        and locales.activo
    )
  );

create policy opciones_disponibles_publicas
  on public.opciones for select to anon, authenticated
  using (
    activo
    and exists (
      select 1
      from public.grupos_opciones
      join public.productos on productos.id = grupos_opciones.producto_id
      join public.locales on locales.id = productos.local_id
      where grupos_opciones.id = opciones.grupo_opcion_id
        and grupos_opciones.activo
        and productos.disponible
        and locales.activo
    )
  );

create policy usuarios_leer_propio
  on public.usuarios for select to authenticated
  using ((select auth.uid()) = id);

create policy usuarios_actualizar_propio
  on public.usuarios for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create policy pedidos_leer_propio
  on public.pedidos for select to authenticated
  using ((select auth.uid()) = usuario_id);

create policy pedido_items_leer_propios
  on public.pedido_items for select to authenticated
  using (
    exists (
      select 1
      from public.pedidos
      where pedidos.id = pedido_items.pedido_id
        and pedidos.usuario_id = (select auth.uid())
    )
  );

create policy pedido_item_opciones_leer_propios
  on public.pedido_item_opciones for select to authenticated
  using (
    exists (
      select 1
      from public.pedido_items
      join public.pedidos on pedidos.id = pedido_items.pedido_id
      where pedido_items.id = pedido_item_opciones.pedido_item_id
        and pedidos.usuario_id = (select auth.uid())
    )
  );

create policy puntos_leer_propios
  on public.puntos for select to authenticated
  using ((select auth.uid()) = usuario_id);

revoke all on table
  public.usuarios,
  public.locales,
  public.categorias,
  public.productos,
  public.grupos_opciones,
  public.opciones,
  public.pedidos,
  public.pedido_items,
  public.pedido_item_opciones,
  public.puntos
from anon, authenticated;

grant select on table
  public.locales,
  public.categorias,
  public.productos,
  public.grupos_opciones,
  public.opciones
to anon, authenticated;

grant select on table
  public.usuarios,
  public.pedidos,
  public.pedido_items,
  public.pedido_item_opciones,
  public.puntos
to authenticated;

grant update (nombres, apellidos, celular, correo)
  on table public.usuarios to authenticated;

revoke all on function public.crear_usuario_desde_auth() from public, anon, authenticated;
