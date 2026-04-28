# Pendientes — revisión de bugs, inconsistencias y limpieza

Fecha del análisis: 2026-04-24

## Bugs funcionales / inconsistencias de contenido

- [x] **1.** Unificar info de TV / streaming. Hoy aparecen tres versiones distintas:
  - `index.html:241` → "TV con Sky y Netflix"
  - `index.html:398` (FAQ visible) → "TV con Sky, HBO MAX Netflix y Disney+" (además falta coma entre "HBO MAX" y "Netflix")
  - `index.html:79` (JSON-LD FAQ) → "TV con Sky, Netflix y Disney+"
- [x] **2.** El ancla `#caracteristicas` apunta a `<main>` (`index.html:125`), cuyo primer heading visible es "Casa del Bosque". Debería apuntar a la sección con el heading real "Características".
- [x] **3.** `<section class="features">` no tiene `id` (`index.html:194`): no se puede enlazar directamente; contiene el heading que en realidad corresponde al nav "Características".
- [x] **4.** `<main>` no envuelve todo el contenido principal. Galería, Features, Pricing, Location y FAQ están fuera. Revisar semántica.
- [x] **5.** Dos headings con el texto "Casa del Bosque": `<h1>` en el hero (`:115`) y `<h2 class="section-title">` en el main (`:129`). Duplicado.
- [x] **6.** `<h2 class="hero__subtitle">Naturaleza y descanso</h2>` (`:116`) no es un título de sección; convertir a `<p>`.

## Código muerto

- [x] **7.** Bloque de 35 líneas comentado en el HTML (`index.html:200-234`, las 4 tarjetas `.feature`). Borrar o reactivar.
- [x] **8.** CSS huérfano: `.features__grid`, `.feature`, `.feature__icon`, `.feature__title`, `.feature__text` (`css/styles.css:107-108, 153-157`). Borrar si no se usará.
- [x] **9.** `scroll-snap-align:start` en `.gallery__item` (`css/styles.css:127`) sin efecto: el contenedor ya no tiene `scroll-snap-type`.
- [x] **10.** Comentario engañoso en CSS `:110` dice "CON pastilla roja" pero el `background` está comentado (`:114`). No hay pastilla. Limpiar.
- [x] **11.** Comentarios sin valor:
  - `/* corregido */` en `css/styles.css:9`
  - SVG del WhatsApp FAB comentado (`css/styles.css:225-228`)
  - Comentario duplicado "Botón flotante de WhatsApp" (`index.html:416-417`)

## Fragilidad

- [x] **12.** Lightbox depende de `imgs.length === 2` (`js/script.js:34`). Si el HTML cambia a 1 o 3 `<img class="gallery__full">`, el crossfade falla silencioso. Hacer más defensivo.
- [x] **13.** Reset `a { display:block }` (`css/styles.css:17`) es muy agresivo; rompe cualquier enlace inline futuro. Cambiar a regla específica por clase.
- [ ] **14.** Font Awesome vía CDN sin `integrity` hash (`index.html:14`): riesgo de supply chain. Añadir SRI o alojar localmente. *(Parcial: agregado `crossorigin="anonymous"` + TODO con link al generador de hash. El integrity hash debe generarse manualmente desde https://www.srihash.org).*
- [ ] **15.** Galería con 4 imágenes duplicadas (8 `gallery__item`, solo 4 archivos únicos). Sustituir por fotos reales cuando estén. *(Pendiente: requiere fotos del usuario.)*

## Accesibilidad

- [x] **16.** Cards como `<article role="button" tabindex="0">`. Reemplazar por `<button>` real que envuelva el contenido.
- [x] **17.** El `<dialog>` del lightbox solo tiene `aria-label="Visor de imágenes"` genérico; no comunica qué foto se está viendo. Considerar actualizar `aria-label`/`aria-labelledby` dinámicamente.

## Redundancias / Estilo

- [x] **18.** `max-width:1600px` duplicado en `body` (`css/styles.css:15`) y `.hero` (`:53`). Eliminar del hero (el padre ya limita); mantener el media query `min-width:1600px` para bordes/sombra.
- [x] **19.** `.gallery__full { display:block }` (`:140`) redundante; ya aplica a todas las `img` vía reset (`:18`).
- [x] **20.** `transform:scale(1.002)` en `.gallery__thumb` (`:136`). Sin propósito claro; quitar.
- [x] **21.** `.card-modal__close` usa `position:absolute` sin que `.card-modal` tenga `position:relative` explícito. Funciona por el contexto del `<dialog[open]>`, pero conviene declararlo.

## Menores

- [x] **22.** Meta Twitter dice "Renta de cabaña" y OG "Alojamiento para 8–12 personas". Alinear con el heading principal.
- [x] **23.** WhatsApp FAB sin `data-gtag` (`index.html:418`). El tracking del final del body solo captura el CTA del hero.
- [x] **24.** Verificar que los `preconnect` a Google Fonts sigan usando HTTPS y que el `crossorigin` esté solo donde se necesita. *(Verificado: configuración estándar — HTTPS en ambos, `crossorigin` solo en `gstatic`.)*
