# Historias de usuario de Tude

Estados: Pendiente · En curso · Hecho. Solo una HU puede estar "En curso" a la vez.

## Fase 0 · Base (semana 1)

| HU | Qué se construye | Terminado cuando | Estado |
| --- | --- | --- | --- |
| HU-01 | Proyecto Expo, repo en GitHub, CLAUDE.md, PROGRESO.md, HISTORIAS.md | La app abre en Expo Go y el repo tiene los 3 archivos | En curso |
| HU-02 | Tokens de Tude y componentes: botón, chip, pill, input, tarjeta, barra inferior | Una pantalla de muestra se ve igual que la guía de estilo del Figma | Pendiente |
| HU-03 | Supabase: tablas de usuarios, locales, categorías, productos, opciones, pedidos, puntos + datos de prueba | 6 locales y 20 productos cargados y leídos desde la app | Pendiente |

## Fase 1 · Cuenta (semana 2)

| HU | Qué se construye | Terminado cuando | Estado |
| --- | --- | --- | --- |
| HU-04 | Registro: nombre, apellido, celular, correo opcional, contraseña, código de amigo | El usuario queda creado en Supabase, sin pedir DNI | Pendiente |
| HU-05 | Verificar celular con código (OTP) | Código válido entra; inválido muestra error; reenvío a los 30 s | Pendiente |
| HU-06 | Iniciar sesión, recordarme y cerrar sesión | Al reabrir la app sigue con la sesión iniciada | Pendiente |

## Fase 2 · Explorar (semanas 3-4)

| HU | Qué se construye | Terminado cuando | Estado |
| --- | --- | --- | --- |
| HU-07 | Inicio: dirección, buscador, categorías, banner, lista de locales | Muestra los locales reales con rating, tiempo y costo de envío | Pendiente |
| HU-08 | Búsqueda y filtros: abierto ahora, envío gratis, ★ 4.5+, zona | Los cerrados quedan agrupados al final | Pendiente |
| HU-09 | Restaurante y menú por categorías | Sin paso de "escoge la sede"; chips de categoría llevan a su sección | Pendiente |
| HU-10 | Personalizar producto: tamaño, sabores, extras, nota | El precio se actualiza y el botón se activa solo con lo requerido elegido | Pendiente |

## Fase 3 · Comprar (semanas 5-6)

| HU | Qué se construye | Terminado cuando | Estado |
| --- | --- | --- | --- |
| HU-11 | Carrito: sumar, quitar, total | Solo admite productos de un local a la vez | Pendiente |
| HU-12 | Mis direcciones: guardar, elegir, referencia | La dirección elegida aparece en Inicio y en el pago | Pendiente |
| HU-13 | Pago: Yape/Plin (número de operación o captura) y efectivo con vuelto | El resumen muestra subtotal, envío, descuento y total | Pendiente |
| HU-14 | Crear pedido y sus estados | El pedido pasa de confirmado a entregado (cambiado desde Supabase) | Pendiente |

## Fase 4 · Después (semana 7)

| HU | Qué se construye | Terminado cuando | Estado |
| --- | --- | --- | --- |
| HU-15 | Mis pedidos: en curso, anteriores, pedir de nuevo, calificar | "Pedir de nuevo" llena el carrito en un toque | Pendiente |
| HU-16 | Seguimiento: etapas en vivo, WhatsApp del repartidor, código de entrega | La pantalla cambia sola cuando cambia el estado (Supabase Realtime) | Pendiente |
| HU-17 | Tude Puntos: suma por pedido, niveles, canje | Cada pedido entregado suma puntos y se ven en Perfil | Pendiente |
| HU-18 | Perfil y referidos: datos, código, compartir por WhatsApp | El código de amigo da el bono a ambos | Pendiente |

## Fase 5 · Cierre (semana 8)

| HU | Qué se construye | Terminado cuando | Estado |
| --- | --- | --- | --- |
| HU-19 | Estados vacíos y errores: sin internet, local cerrado, sin pedidos | Ninguna pantalla queda en blanco o con error sin mensaje | Pendiente |
| HU-20 | Ícono, splash, APK con EAS, video demo | El APK se instala en un Android y completa un pedido de prueba | Pendiente |

## Fuera del MVP (versión 2)

Mototaxi y envíos, panel del restaurante, app del repartidor, mapa en tiempo real, pagos con pasarela.
