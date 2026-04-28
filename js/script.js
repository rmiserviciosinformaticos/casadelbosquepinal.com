// Menú hamburguesa
const toggleBtn = document.querySelector('.nav__toggle');
const navList   = document.querySelector('#primary-menu');
const icon      = toggleBtn ? toggleBtn.querySelector('i') : null;

if (toggleBtn && navList && icon) {
  toggleBtn.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('is-open');
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
    icon.classList.toggle('fa-bars', !isOpen);
    icon.classList.toggle('fa-xmark', isOpen);
    toggleBtn.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  });

  // Cerrar menú al hacer clic en un enlace (móvil)
  navList.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      icon.classList.add('fa-bars');
      icon.classList.remove('fa-xmark');
      toggleBtn.setAttribute('aria-label', 'Abrir menú');
    });
  });
}

// Lightbox de galería con crossfade
const lightbox  = document.querySelector('#lightbox');
const imgs      = lightbox ? lightbox.querySelectorAll('.gallery__full') : [];
const closeBtn  = lightbox ? lightbox.querySelector('.gallery__close') : null;
const prevLB    = lightbox ? lightbox.querySelector('.lightbox__nav--prev') : null;
const nextLB    = lightbox ? lightbox.querySelector('.lightbox__nav--next') : null;

if (lightbox && imgs.length >= 2 && closeBtn) {
  const items = Array.from(document.querySelectorAll('.gallery__item'));
  let currentIndex = 0;
  let activeIdx = 0; // 0 → imgs[0], 1 → imgs[1]

  const updateLabel = (alt) => {
    lightbox.setAttribute('aria-label', `Visor de imágenes — ${alt} (${currentIndex + 1} de ${items.length})`);
  };

  const openAt = (i) => {
    currentIndex = i;
    const item = items[i];
    const src  = item.getAttribute('data-full');
    const alt  = item.querySelector('img').alt;
    activeIdx = 0;
    imgs[0].src = src; imgs[0].alt = alt;
    imgs[1].src = ''; imgs[1].alt = '';
    imgs[0].classList.add('is-active');
    imgs[1].classList.remove('is-active');
    updateLabel(alt);
    lightbox.showModal();
  };

  const swapTo = (i) => {
    if (!items.length) return;
    currentIndex = (i + items.length) % items.length;
    const item = items[currentIndex];
    const nextIdx = 1 - activeIdx;
    const incoming = imgs[nextIdx];
    const outgoing = imgs[activeIdx];
    const alt = item.querySelector('img').alt;

    const show = () => {
      incoming.classList.add('is-active');
      outgoing.classList.remove('is-active');
      activeIdx = nextIdx;
      updateLabel(alt);
    };

    incoming.alt = alt;
    incoming.src = item.getAttribute('data-full');
    if (incoming.complete && incoming.naturalWidth > 0) {
      requestAnimationFrame(show);
    } else {
      incoming.onload = () => { incoming.onload = null; requestAnimationFrame(show); };
    }
  };

  items.forEach((item, i) => {
    item.addEventListener('click', () => openAt(i));
  });

  prevLB && prevLB.addEventListener('click', () => swapTo(currentIndex - 1));
  nextLB && nextLB.addEventListener('click', () => swapTo(currentIndex + 1));

  lightbox.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  swapTo(currentIndex - 1);
    if (e.key === 'ArrowRight') swapTo(currentIndex + 1);
  });

  closeBtn.addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.close();
  });
  lightbox.addEventListener('close', () => {
    imgs[0].src = ''; imgs[1].src = '';
    imgs[0].classList.remove('is-active');
    imgs[1].classList.remove('is-active');
  });
}

// Modal de cards (características)
const cardModal = document.querySelector('#card-modal');
if (cardModal) {
  const mImg    = cardModal.querySelector('.card-modal__img');
  const mTitle  = cardModal.querySelector('.card-modal__title');
  const mText   = cardModal.querySelector('.card-modal__text');
  const mDetail = cardModal.querySelector('.card-modal__detail');
  const mClose  = cardModal.querySelector('.card-modal__close');

  const openCardModal = (card) => {
    const iconImg = card.querySelector('.card__icon img');
    const title   = card.querySelector('.card__title');
    const text    = card.querySelector('.card__text');
    mImg.src    = iconImg ? iconImg.getAttribute('src') : '';
    mImg.alt    = iconImg ? iconImg.getAttribute('alt') : '';
    mTitle.textContent  = title ? title.textContent : '';
    mText.textContent   = text ? text.textContent : '';
    mDetail.textContent = card.getAttribute('data-detail') || '';
    cardModal.showModal();
  };

  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => openCardModal(card));
  });

  mClose.addEventListener('click', () => cardModal.close());
  cardModal.addEventListener('click', (e) => {
    if (e.target === cardModal) cardModal.close();
  });
}

// Slider de galería (prev/next con animación suave personalizada)
const slider    = document.querySelector('.gallery__grid');
const prevBtn   = document.querySelector('.gallery__nav--prev');
const nextBtn   = document.querySelector('.gallery__nav--next');
if (slider && prevBtn && nextBtn) {
  const getStep = () => {
    const item = slider.querySelector('.gallery__item');
    if (!item) return slider.clientWidth * 0.8;
    const gap = parseFloat(getComputedStyle(slider).columnGap || getComputedStyle(slider).gap || 0);
    return item.getBoundingClientRect().width + gap;
  };

  // Lineal: velocidad constante del inicio al fin
  const ease = (t) => t;

  let rafId = null;
  const animateScrollBy = (delta, duration = 900) => {
    if (rafId) cancelAnimationFrame(rafId);
    const startX = slider.scrollLeft;
    const maxX   = slider.scrollWidth - slider.clientWidth;
    const targetX = Math.max(0, Math.min(maxX, startX + delta));
    const change  = targetX - startX;
    const startTime = performance.now();
    const step = (now) => {
      const elapsed = Math.min((now - startTime) / duration, 1);
      slider.scrollLeft = startX + change * ease(elapsed);
      if (elapsed < 1) rafId = requestAnimationFrame(step);
      else rafId = null;
    };
    rafId = requestAnimationFrame(step);
  };

  prevBtn.addEventListener('click', () => animateScrollBy(-getStep()));
  nextBtn.addEventListener('click', () => animateScrollBy( getStep()));
}

// Año dinámico en el footer
const yearEl = document.getElementById('footer-year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());
