(() => {
  const root = document.documentElement;
  const themeToggle = document.querySelector('#theme-toggle');
  const themeLabel = document.querySelector('#theme-label');
  const menuToggle = document.querySelector('#menu-toggle');
  const mobileMenu = document.querySelector('#mobile-menu');

  const setTheme = (theme) => {
    root.dataset.theme = theme;
    localStorage.setItem('theme', theme);
    if (themeToggle) {
      const isDark = theme === 'dark';
      themeToggle.setAttribute('aria-pressed', String(isDark));
      themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }
    if (themeLabel) themeLabel.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
  };

  setTheme(root.dataset.theme || 'light');
  themeToggle?.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

  menuToggle?.addEventListener('click', () => {
    const isOpen = mobileMenu?.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  mobileMenu?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('is-open');
      menuToggle?.setAttribute('aria-expanded', 'false');
      menuToggle?.setAttribute('aria-label', 'Open menu');
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Keep the legacy project pages functional without reintroducing the old carousel.
  const legacyMenuButton = document.querySelector('.header__main-ham-menu-cont');
  const legacyMenu = document.querySelector('.header__sm-menu');
  legacyMenuButton?.addEventListener('click', () => legacyMenu?.classList.toggle('header__sm-menu--active'));
  legacyMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => legacyMenu.classList.remove('header__sm-menu--active')));
})();
