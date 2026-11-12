# Plan de trabajo: app Tude con Claude

12 nov 2026 · necry

## Resumen

Vamos a construir el MVP de Tude, una app móvil de delivery para Pucallpa, en unas 8 semanas. Se trabaja con Claude en sesiones cortas, y todo el contexto vive en el repositorio. Así, cuando se acaben los tokens, cualquier sesión nueva retoma exactamente donde quedó la anterior.

- **Qué incluye el MVP:** registro e inicio de sesión, inicio con locales, menú del restaurante, personalizar producto, carrito, pago (Yape/Plin manual y efectivo), mis pedidos, seguimiento del pedido, Tude Puntos y perfil.
- **Qué queda para la versión 2:** mototaxi y envíos, el panel del restaurante, la app del repartidor, el mapa en tiempo real y los pagos con pasarela.
- **Fuente del diseño:** el archivo de Figma "proyecto-ruta", sección "TUDE · App delivery", paleta coral #FF5A79 + vino #3D0A2A.
- **Resultado esperado:** un APK instalable para Android y un repositorio en GitHub con una PR por historia de usuario.

## Stack recomendado

La elección es **Expo (React Native) con TypeScript y Supabase**. Es el camino con menos configuración, Claude lo maneja muy bien y genera la app para Android y iPhone con un solo código.

| Capa | Herramienta | Para qué |
| --- | --- | --- |
| App móvil | Expo SDK + React Native + TypeScript | Pantallas y navegación; se prueba en el celular con Expo Go |
| Navegación | Expo Router | Una carpeta por pantalla, fácil de seguir |
| Estilos | NativeWind (Tailwind) + tokens de Tude | Colores y tamaños del Figma en un solo archivo |
| Estado | Zustand | Carrito y sesión del usuario |
| Backend | Supabase (Postgres + Auth + Storage) | Usuarios, locales, productos, pedidos; plan gratuito |
| Login por celular | Supabase Auth con OTP por SMS | Código de 4 a 6 dígitos, como en la pantalla "Verificar celular" |
| Código y tareas | GitHub + Trello (o GitHub Projects) | Una rama y una PR por historia de usuario |
| Publicación | EAS Build | Genera el APK para instalar |

Si el curso exige otra tecnología (Flutter, Kotlin), el método de trabajo y las fases de este plan sirven igual; solo cambian los comandos.

## Cómo trabajar con Claude sin perder el hilo

La regla de oro: **Claude no recuerda nada entre sesiones; el repositorio sí.** Por eso todo lo importante se escribe en tres archivos que Claude lee al empezar y actualiza al terminar.

| Archivo | Qué guarda | Quién lo actualiza |
| --- | --- | --- |
| `CLAUDE.md` | Reglas fijas: stack, estructura de carpetas, colores, cómo nombrar ramas y commits | Tú, casi nunca cambia |
| `docs/PROGRESO.md` | Bitácora: HU actual, qué se terminó, qué falta, errores abiertos, siguiente paso exacto | Claude, al final de cada sesión |
| `docs/HISTORIAS.md` | Lista de HU con criterios de terminado y estado | Claude marca la HU como hecha al cerrar su PR |

1. **Una sesión = una historia de usuario (o una parte).** Si la HU es grande, divídela en pasos pequeños y termina cada paso con un commit.
2. **Commit cada 20 o 30 minutos de trabajo.** Si los tokens se cortan a mitad, lo último guardado está en Git.
3. **Antes de que se acaben los tokens, pide el cierre.** Cuando veas el aviso de límite, escribe: "Cierra la sesión: actualiza PROGRESO.md y haz commit".
4. **Si se cortó sin cierre,** la siguiente sesión empieza con `git status` y `git log -5`. Claude reconstruye el estado desde ahí y actualiza PROGRESO.md antes de seguir.
5. **Para retomar, usa siempre el mismo prompt de reanudación** (está en Plantillas). No expliques todo de nuevo; deja que Claude lea los archivos.
6. **Una PR por HU,** con el número en el nombre de la rama: `hu-07-carrito`. Así cualquiera ve en GitHub qué está hecho.

Con Claude Code (terminal o la app de escritorio) Claude lee y escribe los archivos solo. Si usas el chat de claude.ai, sube CLAUDE.md, PROGRESO.md y los archivos de la HU al empezar, y copia sus cambios al terminar.

## Fases e historias de usuario

Son 20 historias en 6 fases, en el orden en que se construyen: cada una deja algo que se puede probar en el celular. Marca el Estado aquí y en `docs/HISTORIAS.md` al cerrar cada PR.

| HU | Fase | Qué se construye | Terminado cuando | Estado |
| --- | --- | --- | --- | --- |
| HU-01 | 0 · Base | Proyecto Expo, repo en GitHub, CLAUDE.md, PROGRESO.md, HISTORIAS.md | La app abre en Expo Go y el repo tiene los 3 archivos | Pendiente |
| HU-02 | 0 · Base | Tokens de Tude y componentes: botón, chip, pill, input, tarjeta, barra inferior | Una pantalla de muestra se ve igual que la guía de estilo del Figma | Pendiente |
| HU-03 | 0 · Base | Supabase: tablas de usuarios, locales, categorías, productos, opciones, pedidos, puntos + datos de prueba | 6 locales y 20 productos cargados y leídos desde la app | Pendiente |
| HU-04 | 1 · Cuenta | Registro: nombre, apellido, celular, correo opcional, contraseña, código de amigo | El usuario queda creado en Supabase, sin pedir DNI | Pendiente |
| HU-05 | 1 · Cuenta | Verificar celular con código (OTP) | Código válido entra; inválido muestra error; reenvío a los 30 s | Pendiente |
| HU-06 | 1 · Cuenta | Iniciar sesión, recordarme y cerrar sesión | Al reabrir la app sigue con la sesión iniciada | Pendiente |
| HU-07 | 2 · Explorar | Inicio: dirección, buscador, categorías, banner, lista de locales | Muestra los locales reales con rating, tiempo y costo de envío | Pendiente |
| HU-08 | 2 · Explorar | Búsqueda y filtros: abierto ahora, envío gratis, ★ 4.5+, zona | Los cerrados quedan agrupados al final | Pendiente |
| HU-09 | 2 · Explorar | Restaurante y menú por categorías | Sin paso de "escoge la sede"; chips de categoría llevan a su sección | Pendiente |
| HU-10 | 2 · Explorar | Personalizar producto: tamaño, sabores, extras, nota | El precio se actualiza y el botón se activa solo con lo requerido elegido | Pendiente |
| HU-11 | 3 · Comprar | Carrito: sumar, quitar, total | Solo admite productos de un local a la vez | Pendiente |
| HU-12 | 3 · Comprar | Mis direcciones: guardar, elegir, referencia | La dirección elegida aparece en Inicio y en el pago | Pendiente |
| HU-13 | 3 · Comprar | Pago: Yape/Plin (número de operación o captura) y efectivo con vuelto | El resumen muestra subtotal, envío, descuento y total | Pendiente |
| HU-14 | 3 · Comprar | Crear pedido y sus estados | El pedido pasa de confirmado a entregado (cambiado desde Supabase) | Pendiente |
| HU-15 | 4 · Después | Mis pedidos: en curso, anteriores, pedir de nuevo, calificar | "Pedir de nuevo" llena el carrito en un toque | Pendiente |
| HU-16 | 4 · Después | Seguimiento: etapas en vivo, WhatsApp del repartidor, código de entrega | La pantalla cambia sola cuando cambia el estado (Supabase Realtime) | Pendiente |
| HU-17 | 4 · Después | Tude Puntos: suma por pedido, niveles, canje | Cada pedido entregado suma puntos y se ven en Perfil | Pendiente |
| HU-18 | 4 · Después | Perfil y referidos: datos, código, compartir por WhatsApp | El código de amigo da el bono a ambos | Pendiente |
| HU-19 | 5 · Cierre | Estados vacíos y errores: sin internet, local cerrado, sin pedidos | Ninguna pantalla queda en blanco o con error sin mensaje | Pendiente |
| HU-20 | 5 · Cierre | Ícono, splash, APK con EAS, video demo | El APK se instala en un Android y completa un pedido de prueba | Pendiente |

## Plantillas para copiar

Copia estas cuatro plantillas tal cual. Las dos primeras van al repositorio en HU-01; los dos prompts los pegas en Claude.

**1. `CLAUDE.md` (raíz del repo)**

```markdown
# Tude — app de delivery (Pucallpa)

## Antes de hacer cualquier cosa
1. Lee docs/PROGRESO.md y docs/HISTORIAS.md.
2. Trabaja SOLO en la HU marcada como "En curso".
3. Al terminar o si te lo pido: actualiza PROGRESO.md y haz commit.

## Stack
Expo + React Native + TypeScript, Expo Router, NativeWind, Zustand, Supabase.

## Estructura
app/            pantallas (Expo Router)
components/     componentes reutilizables
theme/tokens.ts colores, tipografía, radios
lib/supabase.ts cliente de Supabase
store/          estado (carrito, sesión)
docs/           PROGRESO.md, HISTORIAS.md

## Diseño (Figma "proyecto-ruta", sección TUDE · App delivery)
Coral #FF5A79 · Vino #3D0A2A · Fondo #FFF5F7 · Menta #12B886 · Sol #FFC530
Fuente Inter. Radios: tarjetas 16-20, chips 999. Márgenes laterales 20.

## Reglas
- Una rama por HU: hu-XX-nombre. Commits pequeños en español.
- No subir claves: usar .env (EXPO_PUBLIC_SUPABASE_URL, EXPO_PUBLIC_SUPABASE_ANON_KEY).
- Textos de la app en español de Perú, precios en S/.
```

**2. `docs/PROGRESO.md`**

```markdown
# Progreso de Tude

Última actualización: AAAA-MM-DD

## HU en curso
HU-XX — nombre (rama hu-XX-nombre)

## Hecho en esta HU
- ...

## Falta
- [ ] ...

## Siguiente paso exacto
(Lo primero que debe hacer la próxima sesión, con el archivo y la función.)

## Problemas abiertos
- ...

## Decisiones tomadas
- AAAA-MM-DD: ...
```

**3. Prompt para empezar una HU**

```markdown
Vamos a trabajar en Tude. Lee CLAUDE.md, docs/PROGRESO.md y docs/HISTORIAS.md.
Empieza la HU-XX: crea la rama, haz un plan corto de pasos y espera mi OK.
Trabaja paso por paso, con un commit al terminar cada paso.
```

**4. Prompt para retomar (cuando se acabaron los tokens o es otro día)**

```markdown
Retomamos Tude. Lee CLAUDE.md y docs/PROGRESO.md.
Revisa git status y git log -5 para confirmar el estado real.
Si PROGRESO.md no coincide con el código, corrígelo primero.
Luego dime en 3 líneas dónde estamos y continúa con el "Siguiente paso exacto".
```

## Checklist por sesión y cronograma

Cada sesión con Claude sigue los mismos pasos. Así nunca pierdes más de unos minutos de trabajo si se cortan los tokens.

- [ ] Pegar el prompt de inicio o el de retomar
- [ ] Confirmar que Claude dijo bien en qué HU y en qué paso estamos
- [ ] Trabajar un paso a la vez y probar en el celular con Expo Go
- [ ] Commit al cerrar cada paso
- [ ] Al ver el aviso de límite: "Cierra la sesión: actualiza PROGRESO.md y haz commit"
- [ ] Push a GitHub antes de apagar la computadora
- [ ] Al terminar una HU: PR, marcar Hecho en la tabla de arriba y en HISTORIAS.md

**Cronograma: el MVP queda listo en 8 semanas, una fase a la vez**

| Fase | Semanas | Historias | Entregable |
| --- | --- | --- | --- |
| 0 · Base | Semana 1 | HU-01 a HU-03 | App abre + datos de prueba |
| 1 · Cuenta | Semana 2 | HU-04 a HU-06 | Registro y login funcionando |
| 2 · Explorar | Semanas 3-4 | HU-07 a HU-10 | Ver locales y armar productos |
| 3 · Comprar | Semanas 5-6 | HU-11 a HU-14 | Pedido creado de punta a punta |
| 4 · Después | Semana 7 | HU-15 a HU-18 | Seguimiento, puntos y perfil |
| 5 · Cierre | Semana 8 | HU-19 a HU-20 | APK instalable + video demo |

Con unas 6 a 8 horas por semana, el MVP queda listo en 8 semanas. Las fases 2 y 3 son las más largas porque conectan las pantallas con los datos de Supabase.
