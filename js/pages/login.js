/**
 * HiveTrace Login Page Module
 * Replicates the split layout authentication screen from Stitch mockups with role switching.
 */
const LoginPage = (() => {
  let selectedRole = 'apiarist'; // 'apiarist' | 'auditor'

  function render() {
    const defaultEmail = selectedRole === 'auditor' ? 'auditor.chen@nabl-lab.org' : 'elena.vance@hivetrace.org';
    const idLabel = selectedRole === 'auditor' ? 'Auditor Credentials / Lab Identifier' : 'Work Email or Apiarist ID';

    return `
      <div class="login-layout">
        <!-- Left Column: Ambient Agro-Cryptographic Narrative & Live Telemetry -->
        <div class="login-narrative">
          <div style="position: relative; z-index: 1; display: flex; flex-direction: column; gap: 20px;">
            <!-- Botanical Badge -->
            <div class="badge badge--success" style="align-self: flex-start; padding: 6px 14px;">
              <span class="badge-dot badge-dot--green badge-dot--pulse"></span>
              <span style="font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;">
                Aravalli Forest Certified Biosecurity Network
              </span>
            </div>

            <!-- Editorial Headline -->
            <div>
              <h1 class="font-headline-lg" style="color: var(--on-surface); font-size: 34px; line-height: 42px; margin-bottom: 8px;">
                Harmonizing Forest Intelligence &amp; Cryptographic Provenance
              </h1>
              <p class="font-body-md" style="color: var(--on-surface-variant); max-width: 480px; line-height: 1.6;">
                Guarding endemic flora and ancient bee colonies with decentralized telemetry, isotopic testing, and immutable custody stamps.
              </p>
            </div>

            <!-- Field Photo Visual Strip -->
            <div style="position: relative; border-radius: var(--radius-lg); overflow: hidden; height: 160px; box-shadow: var(--shadow-sm); background: var(--forest-primary);">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOwxuEw7JEUX0D_A71aw52dILB7jAZgdVh-Gx_qrwW06b6ZKvAS1HC-KcAui09IIb9xqpVmcLkBgnNceSpDVbeGAWiipDcJ6jxCgHCACsUghbgEuGUuT45MHoedF4CffzUD7MVTgAUW8QHoTgV5vouc6HAhEM021DYd-5AFUNRQ13CKQ_CeqQuNIIAwVP9NCZDCwxJfiFbjXBCE94UEfAmMZcbLN29DM1YunSI4zw6VuW0kcrOjg50Sg" 
                alt="Artisanal Apiary in Forest Mist" 
                style="width: 100%; height: 100%; object-fit: cover; opacity: 0.9;"
              />
              <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(30,63,32,0.85) 0%, transparent 60%); display: flex; align-items: flex-end; padding: 12px 16px;">
                <div style="display: flex; align-items: center; gap: 8px; color: #FFF;">
                  <span class="material-symbols-outlined" style="color: var(--tertiary-accent); font-size: 18px;">eco</span>
                  <span style="font-size: 12px; font-weight: 600;">Sector 9 · Deep Canopy Forage Reserve</span>
                </div>
              </div>
            </div>

            <!-- 3 Live Telemetry KPI Cards -->
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
              <div style="background: rgba(255,255,255,0.9); backdrop-filter: blur(8px); border-radius: var(--radius-md); padding: 12px; border: 1px solid var(--border-subtle); box-shadow: var(--shadow-sm);">
                <span class="kpi-label" style="font-size: 10px;">Active Hives</span>
                <div style="display: flex; align-items: baseline; gap: 4px; margin: 4px 0;">
                  <span class="font-data-metric" style="font-size: 22px; color: var(--forest-primary); font-weight: 700;">142</span>
                  <span style="font-size: 11px; color: var(--on-surface-variant);">nodes</span>
                </div>
                <span style="font-size: 11px; color: var(--forest-success); font-weight: 600; display: flex; items-center; gap: 4px;">
                  <span class="badge-dot badge-dot--green"></span> 100% online
                </span>
              </div>

              <div style="background: rgba(255,255,255,0.9); backdrop-filter: blur(8px); border-radius: var(--radius-md); padding: 12px; border: 1px solid var(--border-subtle); box-shadow: var(--shadow-sm);">
                <span class="kpi-label" style="font-size: 10px;">Ledger Proof</span>
                <div style="display: flex; align-items: baseline; gap: 4px; margin: 4px 0;">
                  <span class="font-data-metric" style="font-size: 22px; color: var(--primary); font-weight: 700;">99.4%</span>
                  <span style="font-size: 11px; color: var(--on-surface-variant);">purity</span>
                </div>
                <span style="font-size: 11px; color: var(--honey-warning); font-weight: 600; display: flex; items-center; gap: 4px;">
                  <span class="badge-dot badge-dot--amber"></span> Polled 2m ago
                </span>
              </div>

              <div style="background: rgba(255,255,255,0.9); backdrop-filter: blur(8px); border-radius: var(--radius-md); padding: 12px; border: 1px solid var(--border-subtle); box-shadow: var(--shadow-sm);">
                <span class="kpi-label" style="font-size: 10px;">Accreditation</span>
                <div style="display: flex; align-items: baseline; gap: 4px; margin: 4px 0;">
                  <span class="font-headline-sm" style="font-size: 18px; color: var(--on-surface); font-weight: 700;">NABL</span>
                  <span style="font-size: 10px; color: var(--on-surface-variant);">ISO 17025</span>
                </div>
                <span style="font-size: 11px; color: var(--forest-primary); font-weight: 600; display: flex; items-center; gap: 4px;">
                  <span class="material-symbols-outlined" style="font-size: 13px;">verified</span> Validated
                </span>
              </div>
            </div>
          </div>

          <!-- Master Apiarist Quote Banner -->
          <div style="position: relative; z-index: 1; margin-top: 24px; background: rgba(255,255,255,0.65); backdrop-filter: blur(8px); border-radius: var(--radius-md); padding: 16px; border: 1px solid rgba(229,223,213,0.7); display: flex; gap: 12px; align-items: flex-start;">
            <div style="width: 36px; height: 36px; border-radius: var(--radius-full); background: var(--secondary-container); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <span class="material-symbols-outlined text-forest" style="font-size: 20px;">nest_eco_leaf</span>
            </div>
            <div>
              <p style="font-size: 13px; font-style: italic; color: var(--on-surface-variant); line-height: 1.5;">
                “Precision telemetry and immutable batch records protect our indigenous wild honey colonies from illicit adulteration.”
              </p>
              <span style="display: block; font-size: 11px; font-weight: 700; color: var(--forest-primary); margin-top: 4px;">
                — Elena Vance, Master Apiarist &amp; Field Lead
              </span>
            </div>
          </div>
        </div>

        <!-- Right Column: Authentication Gateway -->
        <div class="login-form-card">
          <div style="margin-bottom: 24px;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 14px;">
              <img src="assets/logo.svg" alt="HiveTrace Logo" style="width: 48px; height: 48px; object-fit: contain;" />
              <div>
                <div class="brand-name" style="font-size: 22px;">HiveTrace</div>
                <div class="brand-subtitle" style="font-size: 10px;">Bio-Canopy Grid</div>
              </div>
            </div>
            <span class="kpi-label text-primary" style="font-size: 11px; letter-spacing: 0.1em; display: block; margin-bottom: 4px;">
              Authentication Gateway
            </span>
            <h2 class="font-headline-lg" style="font-size: 28px; line-height: 36px; color: var(--on-surface); margin-bottom: 6px;">
              Welcome back
            </h2>
            <p class="font-body-md" style="color: var(--on-surface-variant); font-size: 14px;">
              Sign in to access your apiary telemetry, inspection logs, and cryptographic batch ledger.
            </p>
          </div>

          <!-- Role Switcher Segmented Tabs -->
          <div class="role-switcher" style="margin-bottom: 24px;">
            <button 
              type="button" 
              class="role-tab ${selectedRole === 'apiarist' ? 'active' : ''}" 
              id="role-apiarist-btn"
              onclick="LoginPage.setRole('apiarist')"
            >
              <span class="material-symbols-outlined" style="font-size: 18px;">nature_people</span>
              <span>Apiarist / Field Ranger</span>
            </button>
            <button 
              type="button" 
              class="role-tab ${selectedRole === 'auditor' ? 'active' : ''}" 
              id="role-auditor-btn"
              onclick="LoginPage.setRole('auditor')"
            >
              <span class="material-symbols-outlined" style="font-size: 18px;">verified_user</span>
              <span>Auditor / Lab Partner</span>
            </button>
          </div>

          <!-- Login Form -->
          <form id="login-form" onsubmit="event.preventDefault(); LoginPage.handleLogin();" style="display: flex; flex-direction: column; gap: 16px;">
            <div>
              <label class="form-label" for="login-email" id="login-label-identifier" style="margin-bottom: 6px;">
                ${idLabel}
              </label>
              <div class="form-input-icon">
                <span class="material-symbols-outlined">badge</span>
                <input 
                  type="text" 
                  id="login-email" 
                  class="form-input" 
                  placeholder="e.g. elena.vance@hivetrace.org" 
                  value="${defaultEmail}" 
                  required 
                />
              </div>
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <label class="form-label" for="login-password" style="margin-bottom: 0;">Station Passcode</label>
                <a href="javascript:void(0)" onclick="Toast.warning('Security Notice', 'Contact Sector B Controller for hardware token reset.');" style="font-size: 12px; color: var(--primary); text-decoration: none; font-weight: 600;">
                  Forgot passcode?
                </a>
              </div>
              <div class="form-input-icon">
                <span class="material-symbols-outlined">key</span>
                <input 
                  type="password" 
                  id="login-password" 
                  class="form-input" 
                  placeholder="••••••••••••" 
                  value="••••••••••••" 
                  required 
                />
                <button type="button" class="input-action" id="pwd-toggle" onclick="LoginPage.togglePassword()">
                  <span class="material-symbols-outlined" id="pwd-eye-icon" style="font-size: 20px;">visibility</span>
                </button>
              </div>
            </div>

            <!-- Hardware Security Token Simulation -->
            <div style="background: var(--surface-container-low); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 10px 14px; display: flex; align-items: center; justify-content: space-between;">
              <div style="display: flex; items-center; gap: 8px;">
                <span class="material-symbols-outlined text-forest" style="font-size: 20px;">nfc</span>
                <div>
                  <div style="font-size: 12px; font-weight: 700; color: var(--on-surface);">Hardware Token #AT-094</div>
                  <div style="font-size: 11px; color: var(--forest-success); font-weight: 600;">NFC Security Handshake Active</div>
                </div>
              </div>
              <span class="badge badge--success" style="font-size: 10px; padding: 2px 8px;">Synced</span>
            </div>

            <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 4px;">
              <label class="toggle-container">
                <input type="checkbox" id="login-remember" checked style="accent-color: var(--forest-success);" />
                <span class="toggle-label" style="font-size: 13px;">Persist Session on Device</span>
              </label>
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center; padding: 12px; font-size: 15px; margin-top: 8px;">
              <span class="material-symbols-outlined" style="font-size: 20px;">login</span>
              <span>Sign In to Apiary Station</span>
            </button>
          </form>

          <div style="display: flex; align-items: center; gap: 12px; margin: 20px 0;">
            <div style="flex: 1; height: 1px; background: var(--border-subtle);"></div>
            <span style="font-size: 12px; color: var(--on-surface-variant); font-weight: 600; text-transform: uppercase;">or</span>
            <div style="flex: 1; height: 1px; background: var(--border-subtle);"></div>
          </div>

          <!-- Secondary CTA -->
          <button 
            type="button" 
            class="btn btn-outline" 
            style="width: 100%; justify-content: center; padding: 10px;"
            onclick="Router.navigate('harvest-and-traceability')"
          >
            <span class="material-symbols-outlined text-primary" style="font-size: 20px;">qr_code_scanner</span>
            <span>Verify Batch QR Without Signing In</span>
          </button>
        </div>
      </div>
    `;
  }

  function setRole(role) {
    selectedRole = role;
    const main = document.getElementById('app-main');
    if (main) {
      main.innerHTML = render();
    }
  }

  function togglePassword() {
    const pwdInput = document.getElementById('login-password');
    const eyeIcon = document.getElementById('pwd-eye-icon');
    if (pwdInput && eyeIcon) {
      if (pwdInput.type === 'password') {
        pwdInput.type = 'text';
        eyeIcon.textContent = 'visibility_off';
      } else {
        pwdInput.type = 'password';
        eyeIcon.textContent = 'visibility';
      }
    }
  }

  function handleLogin() {
    const email = document.getElementById('login-email')?.value || 'elena.vance@hivetrace.org';
    HiveStore.login(email, selectedRole);
    Toast.success('Authentication Verified', `Welcome back, ${selectedRole === 'auditor' ? 'Auditor Chen' : 'Elena Vance'}. Apiary telemetry synchronized.`);
    Header.render();
    Router.navigate('dashboard');
  }

  return { render, setRole, togglePassword, handleLogin };
})();
