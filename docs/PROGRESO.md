# Progreso de Tude

Última actualización: 2026-11-12

## HU en curso
HU-03 — Supabase y datos de prueba (rama `hu-03-supabase`)

## Hecho en esta HU
- Se creó `supabase/migrations/20261112124000_create_tude_schema.sql` con las tablas para usuarios, locales, categorías, productos y opciones, además de pedidos, sus detalles y puntos.
- Se configuró RLS: catálogo público de solo lectura y datos personales, pedidos y puntos aislados por usuario.
- Se creó `supabase/seed.sql` con 6 locales ficticios, 20 productos y opciones configurables de demostración.
- Se añadió el cliente de Supabase y la pantalla Inicio consulta y muestra locales y productos reales del backend.
- Se documentó la configuración en README.md.
- Se corrigió el hook de hidratación web para evitar actualizaciones de estado dentro de efectos.
- Verificado localmente: `npx tsc --noEmit`, `npm run lint` y `npx expo export --platform android`.
- Se añadió `.sonarcloud.properties` para que SonarQube Cloud no cuente como duplicación las filas de `supabase/seed.sql` (el Quality Gate de la PR #3 fallaba con 4.1 % por ese archivo).

## Falta
- [ ] Confirmar que el Quality Gate de SonarQube Cloud pasa en la PR #3 tras el último push.
- [ ] Aplicar la migración y `seed.sql` en un proyecto Supabase.
- [ ] Configurar `.env` local con la URL y la clave pública/anon del proyecto.
- [ ] Verificar en Expo Go que Inicio lee los 6 locales y 20 productos.
- [ ] Revisar y fusionar la PR de esta HU.

## Siguiente paso exacto
Crear o elegir el proyecto Supabase, ejecutar la migración y los datos de prueba según README.md, y después configurar `.env` para probar la lectura desde Inicio.

## Problemas abiertos
- No hay credenciales de un proyecto Supabase en este entorno ni sesión iniciada en el panel de Supabase; el acceso real a la base todavía no se puede validar. El usuario debe crear el proyecto y pasar la URL y la clave anon.
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
