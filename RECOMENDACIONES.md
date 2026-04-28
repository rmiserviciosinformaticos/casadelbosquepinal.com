# Recomendaciones — mejoras a la página

Fecha: 2026-04-27
Priorizadas por impacto en conversión para una landing de cabaña vacacional.

## 🏆 Alto impacto (lo que mueve la aguja)

- [ ] **1.** Reseñas / testimonios. La sección que más convierte en alojamiento. 4-6 quotes con nombre y fecha, con `schema.org/Review` + `AggregateRating` para que aparezcan estrellas en Google.
- [ ] **2.** Video tour. Ya existe la carpeta `video/` lista. Recortado a 30-60s, autoplay muted en el hero o como item destacado en la galería. Reduce mucho el "¿cómo se ve realmente?".
- [ ] **3.** Más fotos reales en la galería. Hoy son 4. El carrusel ya soporta 15-20. Agrupar por: exteriores, sala/cocina, recámaras, baños, terraza, alrededores.
- [ ] **4.** CTA sticky en móvil. Barra inferior con "Desde $1,690 · Reservar por WhatsApp" que aparezca al hacer scroll. Más visible que el FAB, sobre todo cerca del bloque de precios.

## 🤝 Confianza (reduce fricción y preguntas repetidas)

- [ ] **5.** Reglas de la casa + política de cancelación + check-in/out. Hoy todo se pregunta por WhatsApp; documentarlo libera tiempo y da seriedad.
- [ ] **6.** Qué incluye / qué no incluye. Sábanas, toallas, leña, café, jabón, etc. La pregunta más repetida en cabañas.
- [ ] **7.** Información sobre depósito/fianza y formas de pago. Transferencia, efectivo, anticipo. Lo buscan antes de escribir.

## 🌲 Contenido + SEO local

- [ ] **8.** "Qué hacer cerca". Cascada de Chuveje, Puente de Dios, Misiones Franciscanas, Sótano del Barro. 4-6 cards (foto + distancia en min). Genera tráfico orgánico de "qué hacer en Pinal de Amoles".
- [ ] **9.** Cómo llegar. Indicaciones desde CDMX/Querétaro/SLP, estado de carretera, link a Waze además de Maps. Útil en zona serrana.
- [ ] **10.** Mapa custom con puntos de interés. En vez del iframe simple, un mapa con la cabaña + atractivos numerados.

## ⚙️ Técnico / UX

- [ ] **11.** WhatsApp con fechas prellenadas reales. Mini selector de fechas + huéspedes en el hero que arme el URL del WhatsApp. Hoy el mensaje contiene `[indica tu fecha]` que el usuario tiene que editar.
- [ ] **12.** Calendario de disponibilidad pública. Aunque sea visual (sin reservas en línea): qué fechas están ocupadas. Mata el ping-pong de "¿está libre tal finde?".
- [ ] **13.** Preload del hero + WebP en galería. Mejora LCP. Hoy `cover-pinal.jpg` se carga sin `<link rel="preload">`.
- [ ] **14.** SRI hash en Font Awesome. Pendiente #14 de `PENDIENTES.md`, riesgo real de supply chain.

---

## Recomendación si solo se hacen 3 cosas

Reseñas + video tour + CTA sticky móvil. Esos tres mueven conversión más que cualquier otra cosa que se pueda hacer sin tocar backend.
