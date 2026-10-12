/**
 * HiveTrace Header & Mobile Navigation Component
 * Implements the fixed top navigation bar, collapsible mobile navigation drawer,
 * and mobile bottom thumb bar with complete touch-friendly interactions.
 */
const Header = (() => {
  const container = document.getElementById('app-header');

  const LOGO_SVG = `assets/logo.svg`;
  const AVATAR_IMG = `https://lh3.googleusercontent.com/aida/AEtjO1Uid7xaDdH9h-UCZsCbTkTPZRW9QcIys2A35ue_LkHrrhyaJ49wGRMGAeDh5iCIAu9XeipuqBSNnarfzynNr9xLWXPncirSSzHN7nvUTa8r1VoS6MSLIWbPpfUz0EC9_Df_hNgMwZC4vpOO7mDtT1uNIuqD-1ssvG2JswVhTROPkC-yOzw-bhH8wkQOjSiQ1wG-BchqAfRmTFtm7HxOYpHOZWT7rVSB13R34Ulk3zMqkAky_TDAjmifbpRT`;

  let isDrawerOpen = false;

  function openDrawer() {
    isDrawerOpen = true;
    const drawer = document.getElementById('mobile-nav-drawer');
    const backdrop = document.getElementById('mobile-nav-backdrop');
    const toggleBtn = document.getElementById('btn-mobile-menu-toggle');

    if (drawer) drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-expanded', 'true');
      const icon = toggleBtn.querySelector('.material-symbols-outlined');
      if (icon) icon.textContent = 'close';
    }
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    isDrawerOpen = false;
    const drawer = document.getElementById('mobile-nav-drawer');
    const backdrop = document.getElementById('mobile-nav-backdrop');
    const toggleBtn = document.getElementById('btn-mobile-menu-toggle');

    if (drawer) drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-expanded', 'false');
      const icon = toggleBtn.querySelector('.material-symbols-outlined');
      if (icon) icon.textContent = 'menu';
    }
    document.body.style.overflow = '';
  }

  function toggleDrawer() {
    if (isDrawerOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  }

  function render() {
    const isLoggedIn = HiveStore.get('auth.isLoggedIn');
    const currentPath = Router.getCurrentPath();
    const user = HiveStore.get('auth.user') || { name: 'Elena Vance', role: 'Master Apiarist' };

    // Reset drawer state on re-render to avoid stuck backdrops
    closeDrawer();

    if (!container) return;

    // If on login page, render minimal header without drawer/bottom bar
    if (currentPath === 'login') {
      container.innerHTML = `
        <div class="app-header">
          <div class="header-inner">
            <a href="#login" class="brand-link">
              <img src="${LOGO_SVG}" alt="HiveTrace Emblem" class="brand-logo" />
              <div>
                <div class="brand-name">HiveTrace</div>
                <div class="brand-subtitle">Bio-Canopy Grid</div>
              </div>
            </a>
            <div class="header-controls">
              <a href="#harvest-and-traceability" class="btn btn-outline" style="font-size: 13px; padding: 6px 14px;">
                <span class="material-symbols-outlined" style="font-size: 18px;">qr_code_scanner</span>
                <span class="public-trace-label">Public Traceability</span>
              </a>
            </div>
          </div>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <!-- Top Fixed Header -->
      <div class="app-header">
        <div class="header-inner">
          <div class="flex items-center" style="gap: 32px;">
            <a href="#dashboard" class="brand-link" id="header-brand-logo">
              <img src="${LOGO_SVG}" alt="HiveTrace Emblem" class="brand-logo" />
              <div>
                <div class="brand-name">HiveTrace</div>
                <div class="brand-subtitle">Bio-Canopy Grid</div>
              </div>
            </a>

            <!-- Desktop Navigation Pills -->
            <nav class="nav-pills" id="main-nav-pills">
              <button class="nav-pill ${currentPath === 'dashboard' ? 'active' : ''}" data-path="dashboard" onclick="Router.navigate('dashboard')">Dashboard</button>
              <button class="nav-pill ${currentPath === 'hives-and-apiaries' ? 'active' : ''}" data-path="hives-and-apiaries" onclick="Router.navigate('hives-and-apiaries')">Hives & Apiaries</button>
              <button class="nav-pill ${currentPath === 'inspections' ? 'active' : ''}" data-path="inspections" onclick="Router.navigate('inspections')">Inspections</button>
              <button class="nav-pill ${currentPath === 'harvest-and-traceability' ? 'active' : ''}" data-path="harvest-and-traceability" onclick="Router.navigate('harvest-and-traceability')">Harvest & Traceability</button>
              <button class="nav-pill ${currentPath === 'lab-reports' ? 'active' : ''}" data-path="lab-reports" onclick="Router.navigate('lab-reports')">Lab Reports</button>
              <button class="nav-pill ${currentPath === 'settings' ? 'active' : ''}" data-path="settings" onclick="Router.navigate('settings')">Settings</button>
            </nav>
          </div>

          <!-- Header Right Controls -->
          <div class="header-controls">
            <!-- Desktop Batch Lookup Input -->
            <div class="batch-lookup">
              <span class="material-symbols-outlined">qr_code_scanner</span>
              <input type="text" id="header-batch-input" placeholder="Lookup batch code..." value="" />
              <button type="button" class="verify-btn" id="header-batch-verify">Verify</button>
            </div>

            <!-- Weather Widget (desktop) -->
            <div class="weather-widget" title="Live Apiary Sensor Station 03-B">
              <span class="material-symbols-outlined text-forest" style="font-size: 20px;">sunny</span>
              <div class="flex-col">
                <span style="font-size: 11px; font-weight: 700; color: var(--on-surface); line-height: 1.1;">24°C Sunny</span>
                <span style="font-size: 10px; color: var(--on-surface-variant); font-weight: 500; line-height: 1.1;">Humidity 48%</span>
              </div>
            </div>

            <!-- Notification Bell -->
            <button type="button" class="notify-btn" id="btn-notifications" aria-label="Notifications" title="2 Unread Alerts">
              <span class="material-symbols-outlined">notifications</span>
              <span class="notify-dot"></span>
            </button>

            <!-- User Avatar & Profile Card Quick Menu -->
            <div class="user-profile" id="user-profile-btn" style="cursor: pointer;" title="View Profile & Settings" onclick="Router.navigate('settings')">
              <img src="${AVATAR_IMG}" alt="${user.name}" class="user-avatar" />
              <div class="user-info flex-col" style="text-align: left;">
                <span class="user-name">${user.name}</span>
                <span class="user-role">${user.role}</span>
              </div>
              <button class="btn-ghost logout-quick-btn" style="padding: 4px; border: none; background: transparent; cursor: pointer;" title="Logout" onclick="event.stopPropagation(); Header.handleLogout();">
                <span class="material-symbols-outlined" style="font-size: 18px; color: var(--on-surface-variant);">logout</span>
              </button>
            </div>

            <!-- Mobile Hamburger Toggle Button -->
            <button type="button" class="mobile-menu-btn" id="btn-mobile-menu-toggle" aria-label="Open navigation menu" aria-expanded="false" title="Menu">
              <span class="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Navigation Drawer Backdrop -->
      <div id="mobile-nav-backdrop" class="mobile-drawer-backdrop" aria-hidden="true"></div>

      <!-- Mobile Navigation Slide-Over Drawer -->
      <aside id="mobile-nav-drawer" class="mobile-drawer" aria-label="Mobile Navigation Drawer">
        <!-- Drawer Header -->
        <div class="drawer-header">
          <a href="#dashboard" class="brand-link" onclick="Header.closeDrawer()">
            <img src="${LOGO_SVG}" alt="HiveTrace Emblem" class="brand-logo" style="width: 40px; height: 40px;" />
            <div>
              <div class="brand-name" style="font-size: 20px;">HiveTrace</div>
              <div class="brand-subtitle" style="font-size: 10px;">Bio-Canopy Grid</div>
            </div>
          </a>
          <button type="button" class="drawer-close-btn" id="btn-close-drawer" aria-label="Close navigation menu">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <!-- Field Apiarist Profile Banner -->
        <div class="drawer-profile" onclick="Header.closeDrawer(); Router.navigate('settings');" role="button" tabindex="0" title="Manage Profile">
          <img src="${AVATAR_IMG}" alt="${user.name}" class="drawer-avatar" />
          <div class="flex-col" style="flex: 1; text-align: left; min-width: 0;">
            <div class="flex items-center gap-xs">
              <span class="drawer-user-name truncate">${user.name}</span>
              <span class="material-symbols-outlined text-forest" style="font-size: 16px;">verified</span>
            </div>
            <span class="drawer-user-role">${user.role}</span>
            <span class="drawer-user-status">
              <span class="badge-dot badge-dot--green badge-dot--pulse"></span> Sector B Online
            </span>
          </div>
          <span class="material-symbols-outlined" style="color: var(--outline); font-size: 20px;">chevron_right</span>
        </div>

        <!-- Mobile Batch Code Lookup -->
        <div class="drawer-search-box">
          <div class="drawer-batch-lookup">
            <span class="material-symbols-outlined" style="font-size: 18px; color: var(--on-surface-variant); margin-right: 6px;">qr_code_scanner</span>
            <input type="text" id="drawer-batch-input" placeholder="Lookup batch code..." />
            <button type="button" class="verify-btn" id="drawer-batch-verify">Verify</button>
          </div>
        </div>

        <!-- Drawer Navigation List -->
        <nav class="drawer-nav" id="drawer-nav-list">
          <button type="button" class="drawer-nav-item ${currentPath === 'dashboard' ? 'active' : ''}" data-path="dashboard" onclick="Header.closeDrawer(); Router.navigate('dashboard');">
            <span class="material-symbols-outlined">space_dashboard</span>
            <span class="drawer-nav-label">Command Dashboard</span>
            <span class="material-symbols-outlined drawer-chevron">chevron_right</span>
          </button>

          <button type="button" class="drawer-nav-item ${currentPath === 'hives-and-apiaries' ? 'active' : ''}" data-path="hives-and-apiaries" onclick="Header.closeDrawer(); Router.navigate('hives-and-apiaries');">
            <span class="material-symbols-outlined">nest_multi_room</span>
            <span class="drawer-nav-label">Hives &amp; Apiaries</span>
            <span class="badge badge--success" style="font-size: 10px; margin-left: auto; margin-right: 8px;">142 Active</span>
          </button>

          <button type="button" class="drawer-nav-item ${currentPath === 'inspections' ? 'active' : ''}" data-path="inspections" onclick="Header.closeDrawer(); Router.navigate('inspections');">
            <span class="material-symbols-outlined">fact_check</span>
            <span class="drawer-nav-label">Field Inspections</span>
            <span class="badge badge--warning" style="font-size: 10px; margin-left: auto; margin-right: 8px;">Audit Form</span>
          </button>

          <button type="button" class="drawer-nav-item ${currentPath === 'harvest-and-traceability' ? 'active' : ''}" data-path="harvest-and-traceability" onclick="Header.closeDrawer(); Router.navigate('harvest-and-traceability');">
            <span class="material-symbols-outlined">qr_code_scanner</span>
            <span class="drawer-nav-label">Harvest &amp; Traceability</span>
            <span class="material-symbols-outlined drawer-chevron">chevron_right</span>
          </button>

          <button type="button" class="drawer-nav-item ${currentPath === 'lab-reports' ? 'active' : ''}" data-path="lab-reports" onclick="Header.closeDrawer(); Router.navigate('lab-reports');">
            <span class="material-symbols-outlined">biotech</span>
            <span class="drawer-nav-label">Lab Reports &amp; Purity</span>
            <span class="material-symbols-outlined drawer-chevron">chevron_right</span>
          </button>

          <button type="button" class="drawer-nav-item ${currentPath === 'settings' ? 'active' : ''}" data-path="settings" onclick="Header.closeDrawer(); Router.navigate('settings');">
            <span class="material-symbols-outlined">tune</span>
            <span class="drawer-nav-label">Settings &amp; Profile</span>
            <span class="material-symbols-outlined drawer-chevron">chevron_right</span>
          </button>
        </nav>

        <!-- Quick Field Actions inside Drawer -->
        <div class="drawer-quick-actions">
          <button type="button" class="btn btn-primary w-full" style="justify-content: center;" onclick="Header.closeDrawer(); Router.navigate('inspections');">
            <span class="material-symbols-outlined">add</span>
            <span>Log Inspection</span>
          </button>
          <button type="button" class="btn btn-outline w-full" style="justify-content: center;" onclick="Header.closeDrawer(); DashboardPage.simulateScan();">
            <span class="material-symbols-outlined text-primary">qr_code_scanner</span>
            <span>Scan Hive QR</span>
          </button>
        </div>

        <!-- Weather / Telemetry Station Info in Drawer -->
        <div class="drawer-weather">
          <div class="flex items-center gap-xs">
            <span class="material-symbols-outlined text-forest" style="font-size: 22px;">sunny</span>
            <div>
              <div style="font-size: 12px; font-weight: 700; color: var(--on-surface);">24°C Sunny • Station 03-B</div>
              <div style="font-size: 11px; color: var(--on-surface-variant); font-weight: 500;">Humidity 48% • Barometer 1013 hPa</div>
            </div>
          </div>
        </div>

        <!-- Drawer Footer with Logout -->
        <div class="drawer-footer">
          <button type="button" class="btn-ghost w-full flex items-center gap-sm" style="justify-content: flex-start; color: var(--berry-destructive); font-weight: 700;" onclick="Header.closeDrawer(); Header.handleLogout();">
            <span class="material-symbols-outlined">logout</span>
            <span>Sign Out Session</span>
          </button>
          <div style="font-size: 11px; color: var(--outline); margin-top: 10px; text-align: center;">
            HiveTrace v2.4 • Bio-Canopy Integrity Mesh
          </div>
        </div>
      </aside>

      <!-- Mobile Bottom Navigation Thumb Bar -->
      <nav id="mobile-bottom-bar" class="mobile-bottom-bar" aria-label="Mobile Navigation Bar">
        <button type="button" class="bottom-nav-item ${currentPath === 'dashboard' ? 'active' : ''}" data-path="dashboard" onclick="Router.navigate('dashboard')">
          <span class="material-symbols-outlined">space_dashboard</span>
          <span>Dashboard</span>
        </button>
        <button type="button" class="bottom-nav-item ${currentPath === 'hives-and-apiaries' ? 'active' : ''}" data-path="hives-and-apiaries" onclick="Router.navigate('hives-and-apiaries')">
          <span class="material-symbols-outlined">nest_multi_room</span>
          <span>Hives</span>
        </button>
        <button type="button" class="bottom-nav-item bottom-nav-item--featured ${currentPath === 'inspections' ? 'active' : ''}" data-path="inspections" onclick="Router.navigate('inspections')">
          <span class="material-symbols-outlined">fact_check</span>
          <span>Inspect</span>
        </button>
        <button type="button" class="bottom-nav-item ${currentPath === 'harvest-and-traceability' || currentPath === 'lab-reports' ? 'active' : ''}" data-path="harvest-and-traceability" onclick="Router.navigate('harvest-and-traceability')">
          <span class="material-symbols-outlined">qr_code_scanner</span>
          <span>Trace</span>
        </button>
        <button type="button" class="bottom-nav-item" id="bottom-bar-menu-toggle" onclick="Header.toggleDrawer()">
          <span class="material-symbols-outlined">menu</span>
          <span>Menu</span>
        </button>
      </nav>
    `;

    // Wire up desktop batch verification search
    const verifyInput = document.getElementById('header-batch-input');
    const verifyBtn = document.getElementById('header-batch-verify');
    if (verifyBtn && verifyInput) {
      const doVerify = () => {
        const query = (verifyInput.value || 'AT-2024-08').trim();
        Router.navigate('harvest-and-traceability');
        Toast.success('Batch Queried', `Loading cryptographic ledger record for ${query}...`);
      };
      verifyBtn.addEventListener('click', doVerify);
      verifyInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') doVerify();
      });
    }

    // Wire up drawer mobile batch search
    const drawerVerifyInput = document.getElementById('drawer-batch-input');
    const drawerVerifyBtn = document.getElementById('drawer-batch-verify');
    if (drawerVerifyBtn && drawerVerifyInput) {
      const doDrawerVerify = () => {
        const query = (drawerVerifyInput.value || 'AT-2024-08').trim();
        closeDrawer();
        Router.navigate('harvest-and-traceability');
        Toast.success('Batch Queried', `Loading cryptographic ledger record for ${query}...`);
      };
      drawerVerifyBtn.addEventListener('click', doDrawerVerify);
      drawerVerifyInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') doDrawerVerify();
      });
    }

    // Mobile menu toggle button in header
    const toggleBtn = document.getElementById('btn-mobile-menu-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', toggleDrawer);
    }

    // Close button in drawer
    const closeBtn = document.getElementById('btn-close-drawer');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeDrawer);
    }

    // Backdrop click closes drawer
    const backdrop = document.getElementById('mobile-nav-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', closeDrawer);
    }

    // Notifications toggle
    const notifyBtn = document.getElementById('btn-notifications');
    if (notifyBtn) {
      notifyBtn.addEventListener('click', () => {
        Toast.warning('Biosecurity Alert', 'Hive #B-08: Scheduled Varroa screen overdue by 4 hours.');
      });
    }
  }

  function handleLogout() {
    closeDrawer();
    HiveStore.logout();
    Toast.show('Session Ended', 'You have been signed out of HiveTrace.');
    Router.navigate('login');
  }

  // Close drawer on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isDrawerOpen) {
      closeDrawer();
    }
  });

  // Subscribe to auth events and store changes
  HiveStore.on('auth:login', render);
  HiveStore.on('auth:logout', render);

  return {
    render,
    openDrawer,
    closeDrawer,
    toggleDrawer,
    handleLogout
  };
})();
