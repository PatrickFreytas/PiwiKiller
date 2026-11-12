# Progreso de Tude

Última actualización: 2026-11-12

## HU en curso
HU-02 — Tokens de Tude y componentes (rama `pantallas-figma`, que parte de `hu-02-componentes-figma`).

Además, por pedido del usuario, se adelantó la interfaz de todas las pantallas del Figma (HU-04 a HU-18). Son solo interfaz con datos de ejemplo: la lógica de cada una se construye en su HU.

## Hecho
- Tokens en `src/theme` tomados del Figma: colores, tipografía Inter, espaciado, radios, sombras y degradados.
- Componentes compartidos ordenados en `src/components/ui` por función: `actions/` (Button, Chip, IconButton, QuantityStepper), `forms/` (TextField, Checkbox, Radio, PhonePrefix), `display/` (Pill, FoodThumb, Icon, Divider, SectionHeader, MapPlaceholder), `surfaces/` (Card, ThemedView) y `text/` (ThemedText). Todo se importa desde `@/components/ui`.
- `src/components/layout`: `Screen` (márgenes, áreas seguras, pie fijo), `Hero` (cabecera a sangre) y `Sheet` (panel con esquinas de 28).
- Se quitó la pestaña y la pantalla "Guía", y los componentes de plantilla sin uso (Collapsible, ExternalLink).
- Navegación: pila de pantallas en la raíz y 5 pestañas en `src/app/(tabs)` (Inicio, Buscar, Pedidos, Puntos, Perfil).
- Pantallas del Figma creadas: 02 Inicio, 03 Restaurante y menú, 04 Personalizar producto, 05 Carrito y pago, 06 Seguimiento, 07 Tude Puntos, 08 Mis pedidos, 09 Mototaxi y envíos, 10 Iniciar sesión, 11 Registro y 12 Verificar celular.
- Inicio usa datos reales de Supabase (categorías, locales, "desde S/") con filtros que funcionan y los locales cerrados agrupados al final.
- Verificado: `npx tsc --noEmit`, `npx expo lint`, `npx expo export --platform android` y revisión visual de las 13 rutas en web, incluido el flujo Inicio → local → carrito → seguimiento.

## Falta
- [ ] Probar en Expo Go en un teléfono (fuente Inter, sombras, degradados, barra nativa). Solo se revisó en web.
- [ ] Revisión del usuario de las pantallas contra el Figma.
- [ ] Fusionar en orden: PR #3 (HU-03), `hu-02-componentes-figma` y luego `pantallas-figma`.
- [ ] Conectar cada pantalla con datos reales en su HU y borrar sus datos de ejemplo.

## Siguiente paso exacto
Fusionar las ramas pendientes y probar en Expo Go. Después, seguir con la HU-04 (registro real en Supabase) sobre la pantalla de registro ya creada.

## Problemas abiertos
- Las pantallas nuevas (menos Inicio) usan datos de ejemplo del Figma: `src/config/demo.ts` y el `data.ts` de cada funcionalidad. Iniciar sesión, registro y verificación no validan ni guardan nada todavía; el carrito no persiste.
- Al tocar cualquier local en Inicio se abre el local de ejemplo ("Frutería La Selva"), no el que se tocó: el menú real llega en la HU-09.
- Buscar y Perfil no tienen diseño en el Figma; quedaron como pantallas simples provisionales.
- Mototaxi y envíos está fuera del MVP según el plan; solo se construyó su interfaz.
- El mapa es una ilustración (`MapPlaceholder`), igual que en el Figma; el mapa real es de la versión 2.
- Los íconos del Figma son vectores propios; se usan los equivalentes de Material Symbols / SF Symbols mediante el componente `Icon`. Las imágenes de comida son emojis sobre degradados, como en el diseño.
- El conector de Figma (MCP) no sirve con el plan Starter: agota su cupo de llamadas. El diseño se leyó abriendo el archivo en Chrome con la sesión del usuario.
- La contraseña de la base de datos la generó Supabase y no se guardó; si se necesita (CLI, conexión directa), se restablece en Database → Settings del proyecto.
- La PR #1 (HU-01) ya está fusionada en `main`, pero sigue como "Pendiente" en HISTORIAS.md y en el plan.
- El ícono, el splash y el logo siguen siendo los de Expo; se cambian en HU-20.
- NativeWind 4.2.7 declara soporte hasta Expo SDK 57 y el proyecto usa SDK 58: empaqueta bien, pero falta probarlo en un dispositivo.
- `gh` no está instalado; las PR se abren desde GitHub web. El archivo `LICENSE` sigue siendo el de la plantilla Expo y requiere decisión.

## Decisiones tomadas
- 2026-11-12: Las rutas de pantallas van en español (`/local`, `/carrito`, `/iniciar-sesion`); las carpetas de `features` siguen en inglés como `home`.
- 2026-11-12: Los componentes compartidos se agrupan por función dentro de `src/components/ui` y se importan siempre desde `@/components/ui`.
- 2026-11-12: Los datos de ejemplo viven en `data.ts` de cada funcionalidad y en `src/config/demo.ts`, para borrarlos de un solo lugar cuando llegue la HU correspondiente.
- 2026-11-12: La app es solo de modo claro hasta que exista un diseño oscuro en Figma.
- 2026-11-12: Cada peso de Inter es una familia (`Inter_700Bold`…); los estilos usan `fontFamily` de `@/theme`, no `fontWeight`.
- 2026-11-12: La sesión de Supabase se guardará con `expo-sqlite/localStorage` al implementar autenticación; para esta HU, el cliente no persiste sesión.
- 2026-11-12: Las tablas de pedidos y puntos quedan preparadas, pero no permiten escrituras desde el cliente; esas operaciones necesitarán un flujo validado en las HUs de compra.
- 2026-11-12: La data de semilla identifica comercios y productos ficticios; no representa locales reales ni precios verificados.
- 2026-11-12: Las historias se organizan en `src/features/...`; `src/app` solo contiene rutas y las funcionalidades no importan internals de otras funcionalidades.
- 2026-11-12: Las ramas se suben a GitHub para revisión del usuario; el usuario fusiona las PR.
- 2026-11-12: Los iconos de pestañas usan símbolos nativos; `main` conserva el plan y las HUs se desarrollan en ramas propias.
