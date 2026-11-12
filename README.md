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

## Estructura del proyecto

```
assets/
  images/
    app/            Icono, splash y favicon (referenciados en app.json)
    brand/          Logos e imágenes de marca usados dentro de la app
src/
  app/              RUTAS. Cada archivo es una pantalla; solo reexporta desde features/
    _layout.tsx     Layout raíz: tema + barra de pestañas
    index.tsx       Pestaña "Inicio"
    settings.tsx    Pestaña "Ajustes"
  features/         FUNCIONALIDADES. Una carpeta por cada área de la app
    home/
      screens/      Pantallas completas de la funcionalidad
      index.ts      Lo que la funcionalidad expone al resto de la app
    settings/
      components/   Componentes que solo usa esta funcionalidad
      screens/
      index.ts
  components/       COMPONENTES COMPARTIDOS entre funcionalidades
    ui/             Piezas básicas: texto, vistas, enlaces, colapsables
    layout/         Estructura de pantalla (Screen)
    navigation/     Barra de pestañas (nativa y web)
    feedback/       Splash animado; aquí irán loaders, toasts, etc.
  hooks/            Hooks reutilizables (tema, esquema de color)
  theme/            Colores, espaciado y tipografías
  config/           Configuración y constantes globales de la app
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
3. Si debe aparecer como pestaña, añádela en `src/components/navigation/app-tabs.tsx` y `app-tabs.web.tsx`.
