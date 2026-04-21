// Menú hamburguesa
const toggleBtn = document.querySelector('.nav__toggle');
const navList   = document.querySelector('#primary-menu'); // <-- coincide con tu HTML
const icon      = toggleBtn ? toggleBtn.querySelector('i') : null;

if (toggleBtn && navList && icon) {
  toggleBtn.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('is-open');
    toggleBtn.setAttribute('aria-expanded', String(isOpen));

    // Cambiar icono (bars ↔ xmark)
    icon.classList.toggle('fa-bars', !isOpen);
    icon.classList.toggle('fa-xmark', isOpen);
    toggleBtn.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  });
} else {
  console.warn('No se encontró .nav__toggle, #primary-menu o el <i> del botón.');
}
