# Progreso de Tude

Última actualización: 2026-11-12

## HU en curso
HU-01 — Base del proyecto (rama hu-01-base)

## Hecho en esta HU
- Proyecto Expo SDK 58 + TypeScript + Expo Router creado y renombrado a "Tude" (app.json, package.json).
- Estructura por funcionalidades en `src/` (ver README.md), con pestañas provisionales Inicio y Ajustes.
- CLAUDE.md, docs/PROGRESO.md y docs/HISTORIAS.md creados.
- Verificado: `npx tsc --noEmit` sin errores y `npx expo export --platform android` empaqueta bien.

## Falta
- [ ] Probar que la app abre en Expo Go en el celular (`npm start` y escanear el QR).
- [ ] Subir a GitHub: `git push -u origin main` y `git push -u origin hu-01-base` (el remoto `origin` ya está configurado y vacío).
- [ ] Abrir la PR de hu-01-base hacia main, fusionarla y marcar HU-01 como Hecho en HISTORIAS.md y en la tabla del plan.

## Siguiente paso exacto
Confirmar con el usuario que la app abrió en Expo Go y hacer el push de `main` y `hu-01-base`. Al cerrar la PR, empezar HU-02: crear la rama `hu-02-tokens-componentes`, instalar NativeWind con `npx expo install` y pasar los colores de Tude a `src/theme/colors.ts` (hoy tiene la paleta gris/azul de la plantilla).

## Problemas abiertos
- `gh` (GitHub CLI) no está instalado en esta PC: las PR se abren desde la web de GitHub, o se instala `gh`.
- El archivo `LICENSE` es el de la plantilla de Expo (MIT a nombre de Expo); decidir si se reemplaza o se quita.
- El ícono, el splash y el logo siguen siendo los de Expo; se cambian en HU-20.

## Decisiones tomadas
- 2026-11-12: Stack Expo + TypeScript (el del plan). El repo y la carpeta se llaman PiwiKiller, pero la app se llama Tude.
- 2026-11-12: Estructura por funcionalidades (`src/features/...`) en lugar de la estructura plana del plan (`app/`, `components/`, `store/`), a pedido del usuario. CLAUDE.md ya describe la estructura real; `lib/` y `store/` van dentro de `src/`.
- 2026-11-12: Los íconos de las pestañas usan símbolos del sistema (SF Symbols / Material), no imágenes PNG.
- 2026-11-12: `main` solo tiene el plan de trabajo; todo el código de HU-01 entra por la rama hu-01-base.
