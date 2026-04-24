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

// Lightbox de galería
const lightbox  = document.querySelector('#lightbox');
const fullImg   = lightbox ? lightbox.querySelector('.gallery__full') : null;
const closeBtn  = lightbox ? lightbox.querySelector('.gallery__close') : null;

if (lightbox && fullImg && closeBtn) {
  document.querySelectorAll('.gallery__item').forEach(item => {
    item.addEventListener('click', () => {
      fullImg.src = item.getAttribute('data-full');
      fullImg.alt = item.querySelector('img').alt;
      lightbox.showModal();
    });
  });

  closeBtn.addEventListener('click', () => lightbox.close());

  // Cerrar al hacer clic en el backdrop
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.close();
  });

  // Cerrar con Escape (nativo de <dialog>, pero limpiamos src)
  lightbox.addEventListener('close', () => {
    fullImg.src = '';
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
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openCardModal(card);
      }
    });
  });

  mClose.addEventListener('click', () => cardModal.close());
  cardModal.addEventListener('click', (e) => {
    if (e.target === cardModal) cardModal.close();
  });
}
