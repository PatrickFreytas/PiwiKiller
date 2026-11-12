insert into public.categorias (id, nombre, slug, orden)
values
  ('22222222-2222-4222-8222-222222222201', 'Hamburguesas', 'hamburguesas', 1),
  ('22222222-2222-4222-8222-222222222202', 'Pollo a la brasa', 'pollo-a-la-brasa', 2),
  ('22222222-2222-4222-8222-222222222203', 'Pizzas', 'pizzas', 3),
  ('22222222-2222-4222-8222-222222222204', 'Comida amazónica', 'comida-amazonica', 4),
  ('22222222-2222-4222-8222-222222222205', 'Postres', 'postres', 5),
  ('22222222-2222-4222-8222-222222222206', 'Pescados y mariscos', 'pescados-y-mariscos', 6),
  ('22222222-2222-4222-8222-222222222207', 'Acompañamientos', 'acompanamientos', 7)
on conflict (id) do update set
  nombre = excluded.nombre,
  slug = excluded.slug,
  orden = excluded.orden,
  activo = true;

insert into public.locales (
  id, slug, nombre, descripcion, categoria_destacada_id, direccion,
  calificacion, tiempo_entrega_minutos, costo_envio, abierto
)
values
  (
    '11111111-1111-4111-8111-111111111101', 'burger-del-rio', 'Burger del Río',
    'Hamburguesas de demostración inspiradas en sabores de la Amazonía.',
    '22222222-2222-4222-8222-222222222201', 'Zona céntrica, Pucallpa (dirección de prueba)',
    4.7, 25, 4.00, true
  ),
  (
    '11111111-1111-4111-8111-111111111102', 'brasa-ucayali', 'Brasa Ucayali',
    'Pollo a la brasa y acompañamientos (local de demostración).',
    '22222222-2222-4222-8222-222222222202', 'Zona este, Pucallpa (dirección de prueba)',
    4.6, 35, 5.00, true
  ),
  (
    '11111111-1111-4111-8111-111111111103', 'masa-del-oriente', 'Masa del Oriente',
    'Pizzas artesanales para probar el catálogo de Tude.',
    '22222222-2222-4222-8222-222222222203', 'Zona norte, Pucallpa (dirección de prueba)',
    4.8, 30, 4.50, true
  ),
  (
    '11111111-1111-4111-8111-111111111104', 'sazon-amazonico', 'Sazón Amazónico',
    'Platos regionales de demostración.',
    '22222222-2222-4222-8222-222222222204', 'Zona sur, Pucallpa (dirección de prueba)',
    4.5, 40, 6.00, true
  ),
  (
    '11111111-1111-4111-8111-111111111105', 'dulce-aguaje', 'Dulce Aguaje',
    'Postres y bebidas dulces para la prueba de Tude.',
    '22222222-2222-4222-8222-222222222205', 'Zona céntrica, Pucallpa (dirección de prueba)',
    4.9, 20, 3.50, true
  ),
  (
    '11111111-1111-4111-8111-111111111106', 'rincon-de-la-ribera', 'Rincón de la Ribera',
    'Pescados y mariscos (local y productos ficticios de demostración).',
    '22222222-2222-4222-8222-222222222206', 'Zona ribereña, Pucallpa (dirección de prueba)',
    4.4, 45, 6.50, false
  )
on conflict (id) do update set
  slug = excluded.slug,
  nombre = excluded.nombre,
  descripcion = excluded.descripcion,
  categoria_destacada_id = excluded.categoria_destacada_id,
  direccion = excluded.direccion,
  calificacion = excluded.calificacion,
  tiempo_entrega_minutos = excluded.tiempo_entrega_minutos,
  costo_envio = excluded.costo_envio,
  abierto = excluded.abierto,
  activo = true;

insert into public.productos (
  id, local_id, categoria_id, nombre, descripcion, precio, destacado, disponible
)
values
  ('33333333-3333-4333-8333-333333333301', '11111111-1111-4111-8111-111111111101', '22222222-2222-4222-8222-222222222201', 'Burger del Río', 'Hamburguesa de res, queso, tomate y salsa de la casa.', 18.90, true, true),
  ('33333333-3333-4333-8333-333333333302', '11111111-1111-4111-8111-111111111101', '22222222-2222-4222-8222-222222222201', 'Cheese burger', 'Hamburguesa clásica con queso cheddar.', 16.50, false, true),
  ('33333333-3333-4333-8333-333333333303', '11111111-1111-4111-8111-111111111101', '22222222-2222-4222-8222-222222222201', 'Burger de plátano', 'Hamburguesa con plátano frito y salsa criolla.', 20.00, true, true),
  ('33333333-3333-4333-8333-333333333304', '11111111-1111-4111-8111-111111111101', '22222222-2222-4222-8222-222222222207', 'Papas crocantes', 'Porción de papas fritas para compartir.', 8.00, false, true),
  ('33333333-3333-4333-8333-333333333305', '11111111-1111-4111-8111-111111111102', '22222222-2222-4222-8222-222222222202', 'Pollo a la brasa personal', 'Cuarto de pollo con papas y ensalada.', 22.00, true, true),
  ('33333333-3333-4333-8333-333333333306', '11111111-1111-4111-8111-111111111102', '22222222-2222-4222-8222-222222222202', 'Medio pollo familiar', 'Medio pollo con papas y ensalada para compartir.', 42.00, false, true),
  ('33333333-3333-4333-8333-333333333307', '11111111-1111-4111-8111-111111111102', '22222222-2222-4222-8222-222222222207', 'Yucas fritas', 'Porción de yuca frita con crema de ají.', 9.50, false, true),
  ('33333333-3333-4333-8333-333333333308', '11111111-1111-4111-8111-111111111103', '22222222-2222-4222-8222-222222222203', 'Pizza amazónica', 'Pizza de cecina, chorizo regional y queso.', 32.00, true, true),
  ('33333333-3333-4333-8333-333333333309', '11111111-1111-4111-8111-111111111103', '22222222-2222-4222-8222-222222222203', 'Pizza margarita', 'Salsa de tomate, mozzarella y albahaca.', 26.00, false, true),
  ('33333333-3333-4333-8333-333333333310', '11111111-1111-4111-8111-111111111103', '22222222-2222-4222-8222-222222222203', 'Pizza de pepperoni', 'Pepperoni y mozzarella.', 30.00, false, true),
  ('33333333-3333-4333-8333-333333333311', '11111111-1111-4111-8111-111111111103', '22222222-2222-4222-8222-222222222207', 'Pan de ajo', 'Pan al horno con ajo y queso.', 10.00, false, true),
  ('33333333-3333-4333-8333-333333333312', '11111111-1111-4111-8111-111111111104', '22222222-2222-4222-8222-222222222204', 'Juane de gallina', 'Arroz sazonado con gallina, envuelto en hoja de bijao.', 18.00, true, true),
  ('33333333-3333-4333-8333-333333333313', '11111111-1111-4111-8111-111111111104', '22222222-2222-4222-8222-222222222204', 'Tacacho con cecina', 'Plátano asado majado con cecina regional.', 24.00, true, true),
  ('33333333-3333-4333-8333-333333333314', '11111111-1111-4111-8111-111111111104', '22222222-2222-4222-8222-222222222204', 'Inchicapi de gallina', 'Sopa regional de gallina con maní y culantro.', 20.00, false, true),
  ('33333333-3333-4333-8333-333333333315', '11111111-1111-4111-8111-111111111105', '22222222-2222-4222-8222-222222222205', 'Torta de chocolate', 'Porción de torta húmeda de chocolate.', 12.00, true, true),
  ('33333333-3333-4333-8333-333333333316', '11111111-1111-4111-8111-111111111105', '22222222-2222-4222-8222-222222222205', 'Cheesecake de cocona', 'Cheesecake con salsa de cocona.', 14.00, false, true),
  ('33333333-3333-4333-8333-333333333317', '11111111-1111-4111-8111-111111111105', '22222222-2222-4222-8222-222222222205', 'Dulce de plátano', 'Plátano maduro cocido con canela.', 9.00, false, true),
  ('33333333-3333-4333-8333-333333333318', '11111111-1111-4111-8111-111111111106', '22222222-2222-4222-8222-222222222206', 'Ceviche de paiche', 'Pescado marinado con limón y cebolla (producto de prueba).', 28.00, true, true),
  ('33333333-3333-4333-8333-333333333319', '11111111-1111-4111-8111-111111111106', '22222222-2222-4222-8222-222222222206', 'Chicharrón de pescado', 'Pescado crocante con yuca (producto de prueba).', 26.00, false, true),
  ('33333333-3333-4333-8333-333333333320', '11111111-1111-4111-8111-111111111106', '22222222-2222-4222-8222-222222222206', 'Tiradito de paiche', 'Láminas de pescado con crema de ají (producto de prueba).', 29.00, false, true)
on conflict (id) do update set
  local_id = excluded.local_id,
  categoria_id = excluded.categoria_id,
  nombre = excluded.nombre,
  descripcion = excluded.descripcion,
  precio = excluded.precio,
  destacado = excluded.destacado,
  disponible = excluded.disponible;

insert into public.grupos_opciones (
  id, producto_id, nombre, requerido, minimo_selecciones, maximo_selecciones, orden
)
values
  ('44444444-4444-4444-8444-444444444401', '33333333-3333-4333-8333-333333333301', 'Elige el tamaño', true, 1, 1, 1),
  ('44444444-4444-4444-8444-444444444402', '33333333-3333-4333-8333-333333333301', 'Extras', false, 0, 2, 2),
  ('44444444-4444-4444-8444-444444444403', '33333333-3333-4333-8333-333333333308', 'Elige el tamaño', true, 1, 1, 1)
on conflict (id) do update set
  producto_id = excluded.producto_id,
  nombre = excluded.nombre,
  requerido = excluded.requerido,
  minimo_selecciones = excluded.minimo_selecciones,
  maximo_selecciones = excluded.maximo_selecciones,
  orden = excluded.orden,
  activo = true;

insert into public.opciones (id, grupo_opcion_id, nombre, precio_adicional, orden)
values
  ('55555555-5555-4555-8555-555555555501', '44444444-4444-4444-8444-444444444401', 'Regular', 0, 1),
  ('55555555-5555-4555-8555-555555555502', '44444444-4444-4444-8444-444444444401', 'Doble', 5, 2),
  ('55555555-5555-4555-8555-555555555503', '44444444-4444-4444-8444-444444444402', 'Queso extra', 2, 1),
  ('55555555-5555-4555-8555-555555555504', '44444444-4444-4444-8444-444444444402', 'Tocino', 3, 2),
  ('55555555-5555-4555-8555-555555555505', '44444444-4444-4444-8444-444444444403', 'Mediana', 0, 1),
  ('55555555-5555-4555-8555-555555555506', '44444444-4444-4444-8444-444444444403', 'Familiar', 12, 2)
on conflict (id) do update set
  grupo_opcion_id = excluded.grupo_opcion_id,
  nombre = excluded.nombre,
  precio_adicional = excluded.precio_adicional,
  orden = excluded.orden,
  activo = true;
