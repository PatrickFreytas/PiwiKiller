# Progreso de Tude

Última actualización: 2026-11-12

## HU en curso
HU-01 — Base del proyecto (rama hu-01-base)

## Hecho en esta HU
- Proyecto Expo SDK 58 + TypeScript + Expo Router creado y renombrado a "Tude" (app.json, package.json).
- Estructura por funcionalidades en `src/` (ver README.md), con pestañas provisionales Inicio y Ajustes.
- CLAUDE.md, docs/PROGRESO.md y docs/HISTORIAS.md creados.
- Dependencias del stack instaladas: NativeWind 4 + Tailwind 3, Zustand, Supabase (`@supabase/supabase-js` + `expo-sqlite` para guardar la sesión) y la fuente Inter (`@expo-google-fonts/inter`).
- NativeWind configurado (`tailwind.config.js`, `babel.config.js`, `metro.config.js`, `src/theme/global.css`) con los 5 colores de Tude; el título de Inicio usa `className="text-coral"` como prueba.
- `.env.example` con las dos variables de Supabase.
- `main` y `hu-01-base` subidas a GitHub (origin).
- Verificado: `npx tsc --noEmit` sin errores, `npx expo export --platform android` empaqueta bien y `npx expo-doctor` pasa.

## Falta
- [ ] Probar que la app abre en Expo Go en el celular (`npm start` y escanear el QR) y que el título "Tude" de Inicio se ve en coral (confirma que NativeWind funciona en el dispositivo).
- [ ] El usuario revisa y fusiona la PR de hu-01-base hacia main (https://github.com/PatrickFreytas/PiwiKiller/pull/new/hu-01-base).
- [ ] Al fusionar: marcar HU-01 como Hecho en HISTORIAS.md y en la tabla del plan.

## Siguiente paso exacto
Confirmar con el usuario que la app abrió en Expo Go y que la PR de HU-01 se fusionó. Luego empezar HU-02: crear la rama `hu-02-tokens-componentes` desde `main`, pedir el enlace del Figma "proyecto-ruta", pasar los colores de Tude a `src/theme/colors.ts` (hoy tiene la paleta gris/azul de la plantilla) y cargar la fuente Inter en `src/app/_layout.tsx`.

## Estado al cortar la sesión (2026-11-12, límite de uso)
- Se creó la rama `hu-02-tokens-componentes` (sale de `hu-01-base`, porque la PR de HU-01 aún no se fusiona). Todavía no tiene código de HU-02.
- Figma: https://www.figma.com/design/uCivAoQFO20GMMhaqxsZka/proyecto-ruta?node-id=0-1 — la guía de estilo es la capa "01 · Guía de estilo TUDE" dentro de "TUDE · App delivery".
- El conector de Figma (MCP) devolvió "límite de llamadas del plan Starter": no se pudo leer el diseño por ahí. Alternativa: abrir el Figma en Chrome y mirar la capa, o que el usuario exporte esa capa como PNG.
- Próximo paso de HU-02: leer la guía de estilo, pasar tokens a `src/theme/` y `tailwind.config.js`, cargar Inter y crear botón, chip, pill, input, tarjeta y barra inferior en `src/components/ui/`.

## Problemas abiertos
- `gh` (GitHub CLI) no está instalado en esta PC: las PR se abren desde la web de GitHub, o se instala `gh`.
- El archivo `LICENSE` es el de la plantilla de Expo (MIT a nombre de Expo); decidir si se reemplaza o se quita.
- El ícono, el splash y el logo siguen siendo los de Expo; se cambian en HU-20.

- NativeWind 4.2.7 declara soporte hasta Expo SDK 57 y el proyecto usa SDK 58: empaqueta bien, pero falta verlo en un dispositivo. Si falla, evaluar NativeWind 5 (hoy en versión candidata).

## Decisiones tomadas
- 2026-11-12: La sesión de Supabase se guardará con `expo-sqlite/localStorage` (lo que recomienda hoy la guía de Expo), no con AsyncStorage. La variable de la clave se llama `EXPO_PUBLIC_SUPABASE_ANON_KEY`, como en el plan.
- 2026-11-12: Claude sube las ramas a GitHub para que el usuario revise la PR; el usuario es quien la fusiona.
- 2026-11-12: Stack Expo + TypeScript (el del plan). El repo y la carpeta se llaman PiwiKiller, pero la app se llama Tude.
- 2026-11-12: Estructura por funcionalidades (`src/features/...`) en lugar de la estructura plana del plan (`app/`, `components/`, `store/`), a pedido del usuario. CLAUDE.md ya describe la estructura real; `lib/` y `store/` van dentro de `src/`.
- 2026-11-12: Los íconos de las pestañas usan símbolos del sistema (SF Symbols / Material), no imágenes PNG.
- 2026-11-12: `main` solo tiene el plan de trabajo; todo el código de HU-01 entra por la rama hu-01-base.
