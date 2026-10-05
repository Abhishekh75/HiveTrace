/**
 * HiveTrace Main Application Entrypoint
 * Registers SPA routes, initializes stores, renders global header, and binds global events.
 */
document.addEventListener('DOMContentLoaded', () => {
  // Register SPA routes
  Router.register('login', LoginPage.render);
  Router.register('dashboard', DashboardPage.render);
  Router.register('hives-and-apiaries', DashboardPage.render);
  Router.register('inspections', InspectionPage.render);
  Router.register('harvest-and-traceability', TraceabilityPage.render);
  Router.register('lab-reports', TraceabilityPage.render);
  Router.register('settings', SettingsPage.render);
  Router.register('profile', SettingsPage.render);

  // If user is not logged in by default, log in as Elena Vance for a seamless prototype experience,
  // or respect existing session
  if (!HiveStore.get('auth.isLoggedIn') && !window.location.hash) {
    HiveStore.login('elena.vance@hivetrace.org', 'apiarist');
  }

  // Render initial Header
  Header.render();

  // Initialize Router
  Router.init();

  // Global hashchange hook to re-render header active state
  window.addEventListener('hashchange', () => {
    Header.render();
  });

  // Welcome toast on first load
  setTimeout(() => {
    if (HiveStore.get('auth.isLoggedIn')) {
      Toast.success(
        'Bio-Canopy Grid Online', 
        'Connected to Sector B gateway. 142 colonies reporting nominal telemetry.'
      );
    }
  }, 600);
});
