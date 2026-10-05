/**
 * HiveTrace SPA Router
 * Hash-based routing with page transitions
 */
const Router = (() => {
  const routes = new Map();
  let currentRoute = null;

  function register(path, renderFn) {
    routes.set(path, renderFn);
  }

  function navigate(path) {
    window.location.hash = path;
  }

  function getCurrentPath() {
    return window.location.hash.slice(1) || 'login';
  }

  function render() {
    const path = getCurrentPath();
    const main = document.getElementById('app-main');
    const renderFn = routes.get(path);

    if (renderFn) {
      // Check auth for protected routes
      if (path !== 'login' && !HiveStore.get('auth.isLoggedIn')) {
        navigate('login');
        return;
      }

      currentRoute = path;
      main.innerHTML = '';
      const content = renderFn();
      if (typeof content === 'string') {
        main.innerHTML = content;
      } else if (content instanceof HTMLElement) {
        main.appendChild(content);
      }

      // Add page enter animation
      main.firstElementChild?.classList.add('page-enter');

      // Update header nav active state
      updateNavActive(path);

      // Scroll to top
      window.scrollTo(0, 0);
    } else {
      // Fallback to dashboard
      navigate(HiveStore.get('auth.isLoggedIn') ? 'dashboard' : 'login');
    }
  }

  function updateNavActive(path) {
    document.querySelectorAll('.nav-pill').forEach(pill => {
      pill.classList.toggle('active', pill.dataset.path === path);
    });
  }

  function init() {
    window.addEventListener('hashchange', render);
    // Initial render
    if (!window.location.hash) {
      navigate(HiveStore.get('auth.isLoggedIn') ? 'dashboard' : 'login');
    } else {
      render();
    }
  }

  return { register, navigate, init, getCurrentPath };
})();
