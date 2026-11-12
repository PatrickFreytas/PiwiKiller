# Tude — app de delivery (Pucallpa)

@AGENTS.md

## Antes de hacer cualquier cosa
1. Lee docs/PROGRESO.md y docs/HISTORIAS.md.
2. Trabaja SOLO en la HU marcada como "En curso".
3. Al terminar o si te lo pido: actualiza PROGRESO.md y haz commit.

El plan completo (fases, cronograma, prompts) está en Plan_de_trabajo_Tude.md.

## Stack
Expo + React Native + TypeScript, Expo Router, NativeWind, Zustand, Supabase.

## Estructura
Organizada por funcionalidades. Reglas completas en README.md.

src/app/                  rutas (Expo Router); cada archivo solo reexporta una pantalla
src/features/<nombre>/    una carpeta por funcionalidad: screens/, components/, hooks/, services/, types.ts
src/components/           componentes compartidos: ui/, layout/, navigation/, feedback/
src/theme/                tokens: colores, espaciado, tipografía, radios
src/lib/supabase.ts       cliente de Supabase (se crea en HU-03)
src/store/                estado con Zustand: carrito, sesión (se crea cuando haga falta)
src/hooks/, src/config/   hooks compartidos y constantes globales
docs/                     PROGRESO.md, HISTORIAS.md

## Diseño (Figma "proyecto-ruta", sección TUDE · App delivery)
Coral #FF5A79 · Vino #3D0A2A · Fondo #FFF5F7 · Menta #12B886 · Sol #FFC530
Fuente Inter. Radios: tarjetas 16-20, chips 999. Márgenes laterales 20.

## Reglas
- Una rama por HU: hu-XX-nombre. Commits pequeños en español.
- Una PR por HU. Al cerrarla, marcar la HU como Hecho en docs/HISTORIAS.md y en la tabla del plan.
- No subir claves: usar .env (EXPO_PUBLIC_SUPABASE_URL, EXPO_PUBLIC_SUPABASE_ANON_KEY).
- Textos de la app en español de Perú, precios en S/.
- Antes de cada commit: `npx tsc --noEmit` sin errores.
