# Progreso de Tude

Última actualización: 2026-11-12

## HU en curso
HU-02 — Tokens de Tude y componentes (rama `hu-02-componentes-figma`, parte de `hu-03-supabase`).

HU-03 quedó terminada en la rama `hu-03-supabase` (PR #3, pendiente de fusión).

## Hecho en esta HU
- Tokens en `src/theme` tomados de "01 · Guía de estilo TUDE": paleta (`Palette`, `Colors`), tipografía Inter (`FontFamily`, `Typography`), radios (`Radius`), sombras (`Shadows`), degradados (`Gradients`) y margen lateral de 20 px (`ScreenMargin`). `tailwind.config.js` repite la paleta para NativeWind.
- La fuente Inter (400, 600, 700, 800, 900) se carga en `src/app/_layout.tsx` con `useFonts`.
- Componentes en `src/components/ui`: `Button` (primario y secundario), `Chip`, `Pill` (5 tonos), `TextField` (etiqueta, prefijo, error), `Card`. `ThemedText` usa la escala tipográfica de la guía.
- Barra inferior: en web sigue el diseño (84 px, borde superior, ícono 22 + etiqueta 11 SemiBold, activa en coral); en Android/iOS la barra nativa usa los mismos colores.
- Pantalla de muestra `src/features/styleguide` (pestaña temporal "Guía") que reproduce la guía de estilo con los componentes reales, más una tarjeta de local como la de "02 · Inicio".
- La app queda solo en modo claro (`userInterfaceStyle: light`): el Figma no define modo oscuro.
- Se corrigió el error de NativeWind en web ("Cannot manually set color scheme") con `darkMode: 'class'`.
- Verificado: `npx tsc --noEmit`, `npx expo lint`, `npx expo export --platform android` y revisión visual en web contra el Figma.

## Falta
- [ ] Probar en Expo Go en un teléfono (fuente Inter, sombras, barra nativa). Solo se revisó en web.
- [ ] Revisión del usuario: comparar la pestaña "Guía" con el Figma.
- [ ] Abrir la PR de HU-02 después de fusionar la PR #3 (esta rama incluye sus commits).
- [ ] Al cerrar la HU: quitar o esconder la pestaña "Guía" si ya no hace falta.

## Siguiente paso exacto
Fusionar la PR #3, abrir la PR de `hu-02-componentes-figma` y probar la pestaña "Guía" en Expo Go.

## Problemas abiertos
- El conector de Figma (MCP) no sirve con el plan Starter: agota su cupo de llamadas. El diseño se leyó abriendo el archivo en Chrome con la sesión del usuario.
- Los íconos del Figma son vectores propios; la barra usa Material Symbols / SF Symbols equivalentes. El buscador, el banner y las cajas de ícono del diseño no se hicieron: van con sus pantallas (HU-07 en adelante).
- La barra del diseño tiene 5 pestañas (Inicio, Buscar, Pedidos, Puntos, Perfil); hoy solo existen Inicio, Guía y Ajustes porque las demás rutas llegan en HUs posteriores.
- La contraseña de la base de datos la generó Supabase y no se guardó; si se necesita (CLI, conexión directa), se restablece en Database → Settings del proyecto.
- La PR #1 (HU-01) ya está fusionada en `main`, pero sigue como "Pendiente" en HISTORIAS.md y en el plan.
- El ícono, el splash y el logo siguen siendo los de Expo; se cambian en HU-20.
- NativeWind 4.2.7 declara soporte hasta Expo SDK 57 y el proyecto usa SDK 58: empaqueta bien, pero falta probarlo en un dispositivo.
- `gh` no está instalado; las PR se abren desde GitHub web. El archivo `LICENSE` sigue siendo el de la plantilla Expo y requiere decisión.

## Decisiones tomadas
- 2026-11-12: La app es solo de modo claro hasta que exista un diseño oscuro en Figma.
- 2026-11-12: Cada peso de Inter es una familia (`Inter_700Bold`…); los estilos usan `fontFamily` de `@/theme`, no `fontWeight`.
- 2026-11-12: La sesión de Supabase se guardará con `expo-sqlite/localStorage` al implementar autenticación; para esta HU, el cliente no persiste sesión.
- 2026-11-12: Las tablas de pedidos y puntos quedan preparadas, pero no permiten escrituras desde el cliente; esas operaciones necesitarán un flujo validado en las HUs de compra.
- 2026-11-12: La data de semilla identifica comercios y productos ficticios; no representa locales reales ni precios verificados.
- 2026-11-12: Las historias se organizan en `src/features/...`; `src/app` solo contiene rutas y las funcionalidades no importan internals de otras funcionalidades.
- 2026-11-12: Las ramas se suben a GitHub para revisión del usuario; el usuario fusiona las PR.
- 2026-11-12: Los iconos de pestañas usan símbolos nativos; `main` conserva el plan y las HUs se desarrollan en ramas propias.
