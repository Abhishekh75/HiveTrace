/**
 * HiveTrace Header Component
 * Implements the fixed top navigation bar matching the Stitch canvas layout.
 */
const Header = (() => {
  const container = document.getElementById('app-header');

  const LOGO_SVG = `assets/logo.svg`;
  const AVATAR_IMG = `https://lh3.googleusercontent.com/aida/AEtjO1Uid7xaDdH9h-UCZsCbTkTPZRW9QcIys2A35ue_LkHrrhyaJ49wGRMGAeDh5iCIAu9XeipuqBSNnarfzynNr9xLWXPncirSSzHN7nvUTa8r1VoS6MSLIWbPpfUz0EC9_Df_hNgMwZC4vpOO7mDtT1uNIuqD-1ssvG2JswVhTROPkC-yOzw-bhH8wkQOjSiQ1wG-BchqAfRmTFtm7HxOYpHOZWT7rVSB13R34Ulk3zMqkAky_TDAjmifbpRT`;

  function render() {
    const isLoggedIn = HiveStore.get('auth.isLoggedIn');
    const currentPath = Router.getCurrentPath();
    const user = HiveStore.get('auth.user') || { name: 'Elena Vance', role: 'Master Apiarist' };

    if (!container) return;

    // If on login page, render minimal header
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
              <a href="#harvest-and-traceability" class="btn btn-outline" style="font-size: 13px; padding: 6px 16px;">
                <span class="material-symbols-outlined" style="font-size: 18px;">qr_code_scanner</span>
                Public Traceability
              </a>
            </div>
          </div>
        </div>
      `;
      return;
    }

    container.innerHTML = `
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

            <!-- Navigation Pills -->
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
            <!-- Batch Lookup Input -->
            <div class="batch-lookup">
              <span class="material-symbols-outlined">qr_code_scanner</span>
              <input type="text" id="header-batch-input" placeholder="Lookup batch code..." value="" />
              <button type="button" class="verify-btn" id="header-batch-verify">Verify</button>
            </div>

            <!-- Weather Widget -->
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
              <button class="btn-ghost" style="padding: 4px; border: none; background: transparent; cursor: pointer;" title="Logout" onclick="event.stopPropagation(); handleLogout();">
                <span class="material-symbols-outlined" style="font-size: 18px; color: var(--on-surface-variant);">logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Wire up batch verification search
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

    // Notifications toggle
    const notifyBtn = document.getElementById('btn-notifications');
    if (notifyBtn) {
      notifyBtn.addEventListener('click', () => {
        Toast.warning('Biosecurity Alert', 'Hive #B-08: Scheduled Varroa screen overdue by 4 hours.');
      });
    }
  }

  function handleLogout() {
    HiveStore.logout();
    Toast.show('Session Ended', 'You have been signed out of HiveTrace.');
    Router.navigate('login');
  }

  // Subscribe to auth events and store changes
  HiveStore.on('auth:login', render);
  HiveStore.on('auth:logout', render);

  return { render };
})();
