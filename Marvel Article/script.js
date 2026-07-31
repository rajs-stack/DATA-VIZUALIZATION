// Topbar interactions (dropdown) and small helpers

function qs(sel) { return document.querySelector(sel); }

document.addEventListener('DOMContentLoaded', () => {
  const moreToggle = qs('.nav__more-toggle');
  const moreMenu = qs('.nav__more-menu');

  if (!moreToggle || !moreMenu) return;

  function closeMenu() {
    moreMenu.style.display = 'none';
    moreToggle.setAttribute('aria-expanded', 'false');
  }

  function openMenu() {
    moreMenu.style.display = 'flex';
    moreToggle.setAttribute('aria-expanded', 'true');
  }

  moreToggle.addEventListener('click', () => {
    const expanded = moreToggle.getAttribute('aria-expanded') === 'true';
    if (expanded) closeMenu(); else openMenu();
  });

  document.addEventListener('click', (e) => {
    if (!moreMenu.contains(e.target) && !moreToggle.contains(e.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  closeMenu();
});
