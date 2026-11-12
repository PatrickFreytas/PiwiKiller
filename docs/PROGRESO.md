# Progreso de Tude

Última actualización: 2026-11-12

## HU en curso
Ninguna. HU-03 — Supabase y datos de prueba quedó terminada en la rama `hu-03-supabase` (PR #3, pendiente de fusión).

## Hecho en esta HU
- Se creó `supabase/migrations/20261112124000_create_tude_schema.sql` con las tablas para usuarios, locales, categorías, productos y opciones, además de pedidos, sus detalles y puntos.
- Se configuró RLS: catálogo público de solo lectura y datos personales, pedidos y puntos aislados por usuario.
- Se creó `supabase/seed.sql` con 6 locales ficticios, 20 productos y opciones configurables de demostración.
- Se añadió el cliente de Supabase y la pantalla Inicio consulta y muestra locales y productos reales del backend.
- Se documentó la configuración en README.md.
- Se corrigió el hook de hidratación web para evitar actualizaciones de estado dentro de efectos.
- Verificado localmente: `npx tsc --noEmit`, `npm run lint` y `npx expo export --platform android`.
- Se añadió `.sonarcloud.properties` para que SonarQube Cloud no cuente como duplicación las filas de `supabase/seed.sql` (el Quality Gate de la PR #3 fallaba con 4.1 % por ese archivo).
- Se creó en Supabase la organización "Tude" (plan Free) y el proyecto "tude" (región São Paulo, ref `fgcbvndcykqlnqoohhus`); se aplicaron la migración y `seed.sql` desde el SQL Editor.
- Se creó el `.env` local (no se sube) con la URL y la clave publicable del proyecto.
- Verificado contra el proyecto real: la API devuelve 6 locales, 20 productos, 7 categorías, 3 grupos de opciones y 6 opciones; con la clave pública no se puede insertar ni leer usuarios, pedidos o puntos.
- Verificado en la app (versión web, `expo start --web`): Inicio muestra "6 locales · 20 productos" con sus datos.
- El Quality Gate de SonarQube Cloud pasa en la PR #3.

## Falta
- [ ] Revisar y fusionar la PR #3.
- [ ] Opcional: abrir la app en Expo Go en un teléfono; la lectura se comprobó solo en web.

## Siguiente paso exacto
Fusionar la PR #3 en `main`. Después, crear la rama de HU-02 (tokens y componentes), que sigue sin implementación, y marcarla "En curso".

## Problemas abiertos
- La contraseña de la base de datos la generó Supabase y no se guardó; si se necesita (CLI, conexión directa), se restablece en Database → Settings del proyecto.
- En web (modo desarrollo) aparece el aviso "Cannot manually set color scheme, as dark mode is type 'media'" de NativeWind (`react-native-css-interop`); no impide cargar el catálogo. Revisarlo en HU-02 junto con los tokens.
- Las PR #1 (HU-01) y #2 (HU-02) ya están fusionadas en `main`, pero siguen como "Pendiente" en HISTORIAS.md y en el plan. La PR #2 solo contenía actualización de progreso: HU-02 aún no tiene implementación; su Figma es https://www.figma.com/design/uCivAoQFO20GMMhaqxsZka/proyecto-ruta?node-id=0-1.
- El ícono, el splash y el logo siguen siendo los de Expo; se cambian en HU-20.
- NativeWind 4.2.7 declara soporte hasta Expo SDK 57 y el proyecto usa SDK 58: empaqueta bien, pero falta probarlo en un dispositivo.
- `gh` no está instalado; las PR se abren desde GitHub web. El archivo `LICENSE` sigue siendo el de la plantilla Expo y requiere decisión.

## Decisiones tomadas
- 2026-11-12: La sesión de Supabase se guardará con `expo-sqlite/localStorage` al implementar autenticación; para esta HU, el cliente no persiste sesión.
- 2026-11-12: Las tablas de pedidos y puntos quedan preparadas, pero no permiten escrituras desde el cliente; esas operaciones necesitarán un flujo validado en las HUs de compra.
- 2026-11-12: La data de semilla identifica comercios y productos ficticios; no representa locales reales ni precios verificados.
- 2026-11-12: Las historias se organizan en `src/features/...`; `src/app` solo contiene rutas y las funcionalidades no importan internals de otras funcionalidades.
- 2026-11-12: Las ramas se suben a GitHub para revisión del usuario; el usuario fusiona las PR.
- 2026-11-12: Los iconos de pestañas usan símbolos nativos; `main` conserva el plan y las HUs se desarrollan en ramas propias.
