# Tude

App móvil de delivery para Pucallpa. El plan está en `Plan_de_trabajo_Tude.md` y el avance en `docs/PROGRESO.md`.

Hecha con [Expo](https://expo.dev) (React Native + TypeScript). Un solo código para Android, iOS y web.

## Cómo ejecutarla

```bash
npm install        # solo la primera vez
npm start          # inicia el servidor de desarrollo
```

Con el servidor iniciado, escanea el código QR con la app **Expo Go** en tu teléfono, o pulsa `a` para abrirla en un emulador de Android.

Otros comandos:

```bash
npm run android    # abre directamente en Android
npm run web        # abre en el navegador
npm run lint       # revisa el estilo del código
npx tsc --noEmit   # revisa los tipos
```

## Configurar Supabase

1. Crea un proyecto en Supabase.
2. Ejecuta `supabase/migrations/20261112124000_create_tude_schema.sql` en el SQL Editor y luego `supabase/seed.sql`. Para desarrollo local con Supabase CLI y Docker, `supabase start` aplica las migraciones y la semilla; `supabase db reset` las vuelve a aplicar.
3. Copia `.env.example` a `.env` y completa `EXPO_PUBLIC_SUPABASE_URL` y `EXPO_PUBLIC_SUPABASE_ANON_KEY` con los datos del proyecto. Usa la clave pública/anon, nunca la `service_role`.
4. Reinicia Expo con `npm start`. La pantalla Inicio muestra el catálogo cargado desde Supabase.

Los seis locales y veinte productos de `seed.sql` son datos ficticios de demostración, no comercios ni precios verificados.

## Estructura del proyecto

```
assets/
  images/
    app/            Icono, splash y favicon (referenciados en app.json)
    brand/          Logos e imágenes de marca usados dentro de la app
src/
  app/              RUTAS. Cada archivo es una pantalla; solo reexporta desde features/
    _layout.tsx     Layout raíz: fuente Inter, tema y pila de pantallas
    (tabs)/         Pestañas: index (Inicio), buscar, pedidos, puntos, perfil
    local.tsx, producto.tsx, carrito.tsx, seguimiento.tsx, mototaxi.tsx
    iniciar-sesion.tsx, registro.tsx, verificar.tsx
  features/         FUNCIONALIDADES. Una carpeta por cada área de la app
    home/           Inicio (lee el catálogo de Supabase)
    restaurant/     Restaurante y menú
    product/        Personalizar producto
    cart/           Carrito y pago
    tracking/       Seguimiento en vivo
    orders/         Mis pedidos
    rewards/        Tude Puntos
    rides/          Mototaxi y envíos
    auth/           Iniciar sesión, registro y verificación
    search/, profile/   Pestañas sin diseño propio todavía
      screens/      Pantallas completas de la funcionalidad
      components/   Componentes que solo usa esa funcionalidad
      data.ts       Datos de ejemplo del Figma, mientras no lea de Supabase
      index.ts      Lo que la funcionalidad expone al resto de la app
  components/       COMPONENTES COMPARTIDOS entre funcionalidades
    ui/
      actions/      Button, Chip, IconButton, QuantityStepper
      forms/        TextField, Checkbox, Radio, PhonePrefix
      display/      Pill, FoodThumb, Icon, Divider, SectionHeader, MapPlaceholder
      surfaces/     Card, ThemedView
      text/         ThemedText
      index.ts      Punto único de importación: `@/components/ui`
    layout/         Screen (base de toda pantalla), Hero (cabecera a sangre), Sheet (panel)
    navigation/     Barra de pestañas (nativa y web)
    feedback/       Splash animado; aquí irán loaders, toasts, etc.
  lib/              Clientes y tipos de servicios compartidos (Supabase)
  hooks/            Hooks reutilizables (tema, volver atrás)
  theme/            Tokens: colores, tipografía, espaciado, radios, sombras, degradados
  config/           Constantes globales y datos de ejemplo compartidos (demo.ts)
supabase/
  migrations/       Cambios versionados del esquema PostgreSQL
  seed.sql          Datos ficticios de demostración
```

## Reglas de organización

1. **`src/app` solo contiene rutas.** Nada de lógica ni estilos: cada archivo reexporta una pantalla de `features/`.
2. **Todo lo de una funcionalidad vive en su carpeta** dentro de `features/`. Según lo vaya necesitando, puede tener `screens/`, `components/`, `hooks/`, `services/` (datos y almacenamiento) y `types.ts`.
3. **Un componente sube a `src/components` solo cuando lo usan dos o más funcionalidades.**
4. **Las funcionalidades no se importan entre sí por dentro**: solo a través de su `index.ts`.
5. **Colores y espaciados salen siempre de `@/theme`**, nunca valores sueltos en las pantallas.
6. Los imports usan el alias `@/` (apunta a `src/`) y `@/assets/` (apunta a `assets/`).

## Cómo añadir una funcionalidad nueva

1. Crea `src/features/<nombre>/screens/<nombre>-screen.tsx` y expórtala en `src/features/<nombre>/index.ts`.
2. Crea la ruta `src/app/<nombre>.tsx` con una sola línea:
   ```ts
   export { NombreScreen as default } from '@/features/<nombre>';
   ```
3. Si debe aparecer como pestaña, pon la ruta en `src/app/(tabs)/` y añádela en `src/components/navigation/app-tabs.tsx` y `app-tabs.web.tsx`.
