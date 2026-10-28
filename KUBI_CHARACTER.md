# KUBI — Ficha del personaje oficial

**Versión canónica 1.0.** Esta ficha es la referencia obligatoria para cualquier uso de KUBI en la app, animaciones, stickers, redes y productos. No se rediseña: las variaciones futuras (disfraces, accesorios, estaciones) parten siempre de esta versión.

Fuente: lámina «KUBI — Mascota oficial» (vistas frontal, lateral, posterior, tres cuartos, primer plano del rostro y hoja de ocho expresiones).

## Concepto

Criatura geométrica amistosa nacida del universo del conocimiento. Es curiosa, inteligente, optimista, juguetona y muy expresiva. Conecta con estudiantes de 12 a 18 años sin verse infantil.

## Anatomía (no se modifica)

| Elemento | Regla |
|---|---|
| Cuerpo | Cubo muy redondeado, volumétrico, con cabeza y torso en una sola figura. Más ancho que las extremidades. |
| Extensiones superiores | **Dos**, asimétricas. A su derecha (izquierda del espectador): un prisma redondeado alto. A su izquierda: un dado pequeño redondeado, inclinado unos 18°. |
| Ojos | Dos, grandes, ovalados, blanco limpio, pupila azul oscuro y un reflejo principal (más uno secundario opcional). |
| Cejas | Pequeñas, redondeadas, expresivas. |
| Boca | Simple. Sonrisa en reposo. |
| Nariz | **No tiene.** |
| Brazos | **Dos**, cortos y flexibles, con manos redondeadas sin dedos. |
| Piernas | **Dos**, cortas, con pies pequeños ovalados. |
| Núcleo | Rombo turquesa luminoso **centrado en el pecho**, con una **hendidura triangular (muesca en V) en la punta superior**. Siempre visible en vistas frontales y de tres cuartos. |

No se cambia el número de extremidades ni la ubicación del núcleo. Sin texturas peludas, superficies metálicas, accesorios en la versión base, tipografía, logos ni marcas de agua sobre el personaje.

## Paleta oficial

| Color | Hex | Uso |
|---|---|---|
| Morado principal | `#7954EE` | Cuerpo, brazos, piernas |
| Violeta sombras | `#5338B4` | Sombras y volumen |
| Celeste luminoso | `#36D6E7` | Núcleo y su brillo; efectos de "pensar" |
| Amarillo | `#FFCA58` | **Solo** efectos de recompensa (destellos, aura, medallas) |
| Azul oscuro | `#20234E` | Pupilas, cejas, boca, detalles |
| Fondo de la app | `#F7F8FF` | Fondo general de la interfaz |

Los degradados internos del dibujo (luces y sombras) se derivan de estos colores.

## Expresiones oficiales

Misma anatomía en todas; solo cambian cejas, ojos, boca, brazos, postura y efectos.

| Expresión | Clave en código | Rasgos | Uso en la app |
|---|---|---|---|
| Feliz | `feliz` | Cejas arriba, boca abierta, brazos sueltos | Saludos, mensajes positivos, intento sin completar (sin amarillo) |
| Pensando | `pensando` | Ceja asimétrica, mirada arriba, mano al mentón, burbujas turquesa | Tras un error: "revisemos juntos" |
| Sorprendido | `sorprendido` | Ojos grandes, pupilas pequeñas, boca en "o", manos arriba | Descubrimientos |
| Celebrando | `celebrando` | Ojos cerrados felices, brazos arriba, salto, destellos amarillos | Acierto y misión cumplida |
| Concentrado | `concentrado` | Cejas hacia adentro, ojos entrecerrados, boca recta | Mientras el estudiante responde |
| Animando | `animando` | Guiño, puño arriba, mano en la cadera | Invitar a jugar (mapa) |
| Confundido | `confundido` | Cejas dispares, mirada cruzada, boca ondulada, cabeza inclinada | Errores de la app (pantalla no encontrada) |
| Orgulloso | `orgulloso` | Ojos cerrados serenos, manos en la cadera, aura dorada | Logros, rachas, nivel completado |

Además, en código: `neutral` (versión canónica en reposo) y `saludando` (bienvenida).

**Tono:** KUBI nunca castiga. Ante un error anima a reintentar; nunca se muestra triste ni enojado.

## Recursos en este repositorio

- `src/components/kubi/Kubi.tsx` — componente vectorial (react-native-svg) con todas las expresiones. Uso: `<Kubi expression="celebrando" size={200} />`.
- `src/components/kubi/poses.ts` — datos de cada pose sobre la anatomía común.
- `assets/kubi/*.svg` — vistas y expresiones en SVG con **fondo transparente real** (vectoriales, sin pérdida). Sirven para web, diseño y redes.
- `assets/icon.png` — ícono de la app (1024 × 1024, fondo opaco, como exige iOS).
- `assets/splash-icon.png` — KUBI para la pantalla de carga (PNG con transparencia).
- Ambos PNG se regeneran desde el SVG oficial con `npm run icons`.

## Archivos gráficos que conviene producir después

1. Render 3D oficial de las vistas y expresiones (por ejemplo, en Blender) usando estas láminas como referencia.
2. Animaciones ligeras (Lottie o Rive) para idle, acierto y celebración.
3. Ícono de app final con revisión en tamaños pequeños (29, 40 y 60 pt).
