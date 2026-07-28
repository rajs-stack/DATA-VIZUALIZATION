import "./js/main.js";

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

  moreToggle.addEventListener('click', (e) => {
    const expanded = moreToggle.getAttribute('aria-expanded') === 'true';
    if (expanded) closeMenu(); else openMenu();
  });

  // close when clicking outside
  document.addEventListener('click', (e) => {
    if (!moreMenu.contains(e.target) && !moreToggle.contains(e.target)) {
      closeMenu();
    }
  });

  // close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // ensure menu hidden initially
  closeMenu();
});
