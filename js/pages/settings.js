/**
 * HiveTrace Settings & Profile Module
 * Implements the exact profile card layout and state management for toggle switches backed by localStorage.
 */
const SettingsPage = (() => {
  const AVATAR_IMG = `https://lh3.googleusercontent.com/aida/AEtjO1Uid7xaDdH9h-UCZsCbTkTPZRW9QcIys2A35ue_LkHrrhyaJ49wGRMGAeDh5iCIAu9XeipuqBSNnarfzynNr9xLWXPncirSSzHN7nvUTa8r1VoS6MSLIWbPpfUz0EC9_Df_hNgMwZC4vpOO7mDtT1uNIuqD-1ssvG2JswVhTROPkC-yOzw-bhH8wkQOjSiQ1wG-BchqAfRmTFtm7HxOYpHOZWT7rVSB13R34Ulk3zMqkAky_TDAjmifbpRT`;

  function render() {
    const user = HiveStore.get('auth.user') || { name: 'Elena Vance', role: 'Master Apiarist', email: 'elena.vance@hivetrace.org' };
    const settings = HiveStore.get('settings') || {};
    const inspections = HiveStore.get('inspections') || [];
    const drafts = HiveStore.get('drafts') || [];

    return `
      <div class="flex-col w-full">
        <!-- Top Banner -->
        <section class="w-full px-margin" style="padding-top: 24px; padding-bottom: 24px; background: rgba(246, 239, 230, 0.5); border-bottom: 1px solid var(--border-subtle);">
          <div class="max-container flex items-center justify-between flex-wrap gap-md">
            <div>
              <div class="flex items-center gap-sm mb-xs">
                <span class="badge badge--primary" style="font-size: 11px;">
                  <span class="badge-dot badge-dot--green"></span> System Configuration
                </span>
                <span style="font-size: 12px; color: var(--on-surface-variant); font-weight: 600;">Sector B Station</span>
              </div>
              <h1 class="font-headline-lg" style="color: var(--on-surface);">Apiarist Profile &amp; Settings</h1>
              <p class="font-body-md" style="color: var(--on-surface-variant); margin-top: 4px;">
                Manage field ranger credentials, hardware telemetry toggles, and offline storage synchronization.
              </p>
            </div>
            <button 
              type="button" 
              class="btn btn-outline"
              onclick="SettingsPage.resetDemoData()"
            >
              <span class="material-symbols-outlined text-danger">restart_alt</span>
              <span>Reset Demo State</span>
            </button>
          </div>
        </section>

        <!-- Profile & Settings Body -->
        <section class="w-full px-margin" style="padding-top: 32px; padding-bottom: 48px;">
          <div class="max-container" style="max-width: 980px; display: flex; flex-direction: column; gap: 24px;">
            
            <!-- MASTER APIARIST PROFILE CARD (Matches Stitch Profile Mockup Exact Layout) -->
            <div class="card" style="padding: 32px; position: relative;">
              <div class="card-stripe card-stripe--green"></div>
              
              <div class="flex items-start justify-between flex-wrap gap-lg">
                <!-- Avatar & Identity Info -->
                <div class="flex items-center gap-lg flex-wrap">
                  <div style="position: relative;">
                    <img 
                      src="${AVATAR_IMG}" 
                      alt="${user.name}" 
                      style="width: 88px; height: 88px; border-radius: var(--radius-full); object-fit: cover; border: 3px solid var(--surface-white); box-shadow: var(--shadow-md);"
                    />
                    <span style="position: absolute; bottom: 4px; right: 4px; width: 18px; height: 18px; border-radius: var(--radius-full); background: var(--forest-success); border: 2px solid #FFF;" title="Active Field Lead"></span>
                  </div>

                  <div>
                    <div class="flex items-center gap-xs flex-wrap">
                      <h2 class="font-headline-md" style="color: var(--on-surface); font-size: 24px;">${user.name}</h2>
                      <span class="badge badge--success" style="font-size: 11px;">
                        <span class="material-symbols-outlined" style="font-size: 14px;">verified</span> Verified Field Lead
                      </span>
                    </div>

                    <div style="font-size: 14px; font-weight: 600; color: var(--forest-primary); margin-top: 2px;">
                      ${user.role} • Forestry Apiary Integrity System
                    </div>

                    <p class="font-body-sm" style="color: var(--on-surface-variant); margin-top: 6px;">
                      Station ID: <code class="font-data-code font-bold">#HT-AV-9042</code> • Sector: <strong>Aravalli Canopy B</strong>
                    </p>
                  </div>
                </div>

                <!-- Accreditation & QR Badge -->
                <div style="text-align: right; background: var(--surface-container-low); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 12px 16px;">
                  <span class="kpi-label text-forest" style="font-size: 10px; display: block; margin-bottom: 2px;">Accreditation</span>
                  <div class="font-headline-sm" style="font-size: 16px; color: var(--on-surface); font-weight: 700;">NABL ISO 17025</div>
                  <span style="font-size: 11px; color: var(--forest-success); font-weight: 600;">Certificate #NAB-HT-2024</span>
                </div>
              </div>

              <!-- Profile Details Grid -->
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--border-subtle);">
                <div style="background: rgba(255,241,232,0.4); border-radius: var(--radius-md); padding: 12px; border: 1px solid rgba(229,223,213,0.6);">
                  <span class="font-label-sm" style="color: var(--on-surface-variant); display: block;">Official Email</span>
                  <span style="font-size: 13px; font-weight: 700; color: var(--on-surface); word-break: break-all;">${user.email || 'elena.vance@hivetrace.org'}</span>
                </div>
                <div style="background: rgba(255,241,232,0.4); border-radius: var(--radius-md); padding: 12px; border: 1px solid rgba(229,223,213,0.6);">
                  <span class="font-label-sm" style="color: var(--on-surface-variant); display: block;">Supervised Colonies</span>
                  <span class="font-data-metric" style="font-size: 18px; color: var(--forest-primary); font-weight: 700;">142 Hives</span>
                </div>
                <div style="background: rgba(255,241,232,0.4); border-radius: var(--radius-md); padding: 12px; border: 1px solid rgba(229,223,213,0.6);">
                  <span class="font-label-sm" style="color: var(--on-surface-variant); display: block;">Hardware NFC Token</span>
                  <span style="font-size: 13px; font-weight: 700; color: var(--forest-success);">AT-094 Synced ✓</span>
                </div>
              </div>
            </div>

            <!-- SYSTEM & TELEMETRY TOGGLE SWITCHES CARD (State Management) -->
            <div class="card" style="padding: 28px;">
              <div class="flex items-center justify-between mb-md">
                <div class="flex items-center gap-xs">
                  <span class="material-symbols-outlined text-primary" style="font-size: 22px;">tune</span>
                  <h3 class="font-headline-sm" style="color: var(--on-surface);">Hardware &amp; Operational Toggle Settings</h3>
                </div>
                <span class="badge badge--info">Reactive State Store</span>
              </div>
              <p class="font-body-sm" style="color: var(--on-surface-variant); margin-bottom: 20px;">
                Toggles update immediately and are persisted into localStorage state.
              </p>

              <div style="display: flex; flex-direction: column; gap: 16px;">
                
                <!-- Toggle 1: Auto-Save -->
                <div class="flex items-center justify-between" style="padding: 12px 16px; background: var(--surface-container-low); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
                  <div>
                    <div style="font-size: 14px; font-weight: 700; color: var(--on-surface);">Auto-Save Inspection Drafts</div>
                    <div style="font-size: 12px; color: var(--on-surface-variant);">Automatically writes uncommitted form changes to local device tablet cache.</div>
                  </div>
                  <label class="toggle-switch">
                    <input 
                      type="checkbox" 
                      ${settings.autoSave ? 'checked' : ''} 
                      onchange="SettingsPage.toggleSwitch('autoSave')"
                    />
                    <span class="toggle-slider"></span>
                  </label>
                </div>

                <!-- Toggle 2: Real-Time Telemetry Sync -->
                <div class="flex items-center justify-between" style="padding: 12px 16px; background: var(--surface-container-low); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
                  <div>
                    <div style="font-size: 14px; font-weight: 700; color: var(--on-surface);">LoRaWAN Live Telemetry Synchronization</div>
                    <div style="font-size: 12px; color: var(--on-surface-variant);">Pulls 15-minute acoustic frequency and hive weight delta packets from field gateways.</div>
                  </div>
                  <label class="toggle-switch">
                    <input 
                      type="checkbox" 
                      ${settings.telemetrySync ? 'checked' : ''} 
                      onchange="SettingsPage.toggleSwitch('telemetrySync')"
                    />
                    <span class="toggle-slider"></span>
                  </label>
                </div>

                <!-- Toggle 3: Strict Biosecure Protocol -->
                <div class="flex items-center justify-between" style="padding: 12px 16px; background: var(--surface-container-low); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
                  <div>
                    <div style="font-size: 14px; font-weight: 700; color: var(--on-surface);">Strict Biosecurity Protocol Enforcement</div>
                    <div style="font-size: 12px; color: var(--on-surface-variant);">Requires veterinary parasite screening checklist prior to harvest batch unlocking.</div>
                  </div>
                  <label class="toggle-switch">
                    <input 
                      type="checkbox" 
                      ${settings.biosecureProtocol ? 'checked' : ''} 
                      onchange="SettingsPage.toggleSwitch('biosecureProtocol')"
                    />
                    <span class="toggle-slider"></span>
                  </label>
                </div>

                <!-- Toggle 4: Push Alerts & Notifications -->
                <div class="flex items-center justify-between" style="padding: 12px 16px; background: var(--surface-container-low); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
                  <div>
                    <div style="font-size: 14px; font-weight: 700; color: var(--on-surface);">Canopy Weather &amp; Swarm Alerts</div>
                    <div style="font-size: 12px; color: var(--on-surface-variant);">Instant browser toast notifications on sudden atmospheric drops or hive agitation.</div>
                  </div>
                  <label class="toggle-switch">
                    <input 
                      type="checkbox" 
                      ${settings.notificationsEnabled ? 'checked' : ''} 
                      onchange="SettingsPage.toggleSwitch('notificationsEnabled')"
                    />
                    <span class="toggle-slider"></span>
                  </label>
                </div>

                <!-- Toggle 5: Voice Dictation -->
                <div class="flex items-center justify-between" style="padding: 12px 16px; background: var(--surface-container-low); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
                  <div>
                    <div style="font-size: 14px; font-weight: 700; color: var(--on-surface);">Hands-Free Voice Dictation Engine</div>
                    <div style="font-size: 12px; color: var(--on-surface-variant);">Enable microphone acoustic model for dictating frame observations while wearing bee gloves.</div>
                  </div>
                  <label class="toggle-switch">
                    <input 
                      type="checkbox" 
                      ${settings.voiceDictation ? 'checked' : ''} 
                      onchange="SettingsPage.toggleSwitch('voiceDictation')"
                    />
                    <span class="toggle-slider"></span>
                  </label>
                </div>

              </div>
            </div>

            <!-- LOCAL STORAGE DATA MANAGEMENT CARD -->
            <div class="card" style="padding: 28px;">
              <div class="flex items-center justify-between mb-md">
                <div class="flex items-center gap-xs">
                  <span class="material-symbols-outlined text-forest" style="font-size: 22px;">database</span>
                  <h3 class="font-headline-sm" style="color: var(--on-surface);">Local Device Database &amp; Mock API Status</h3>
                </div>
                <span class="badge badge--success">localStorage Active</span>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
                <div style="background: var(--surface-container-low); border-radius: var(--radius-md); padding: 14px; border: 1px solid var(--border-subtle);">
                  <div style="font-size: 12px; font-weight: 600; color: var(--on-surface-variant);">Sealed Inspection Records</div>
                  <div class="font-data-metric" style="font-size: 24px; color: var(--forest-primary); font-weight: 700; margin-top: 4px;">
                    ${inspections.length}
                  </div>
                  <div style="font-size: 11px; color: var(--on-surface-variant); margin-top: 2px;">Stored in browser localStorage</div>
                </div>

                <div style="background: var(--surface-container-low); border-radius: var(--radius-md); padding: 14px; border: 1px solid var(--border-subtle);">
                  <div style="font-size: 12px; font-weight: 600; color: var(--on-surface-variant);">Saved Form Drafts</div>
                  <div class="font-data-metric" style="font-size: 24px; color: var(--primary); font-weight: 700; margin-top: 4px;">
                    ${drafts.length}
                  </div>
                  <div style="font-size: 11px; color: var(--on-surface-variant); margin-top: 2px;">Offline cached form states</div>
                </div>
              </div>

              <div class="flex items-center gap-sm flex-wrap">
                <button type="button" class="btn btn-outline" onclick="SettingsPage.exportJson()">
                  <span class="material-symbols-outlined">download</span>
                  <span>Export Inspection Ledger (JSON)</span>
                </button>
                <button type="button" class="btn btn-danger" onclick="SettingsPage.resetDemoData()">
                  <span class="material-symbols-outlined">delete_forever</span>
                  <span>Reset All Local Prototype Data</span>
                </button>
              </div>
            </div>

          </div>
        </section>
      </div>
    `;
  }

  function toggleSwitch(key) {
    const val = HiveStore.toggleSetting(key);
    Toast.success('Setting Updated', `${key} is now ${val ? 'ENABLED' : 'DISABLED'}.`);
  }

  function exportJson() {
    const data = HiveStore.getState();
    const str = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    const dl = document.createElement('a');
    dl.setAttribute('href', str);
    dl.setAttribute('download', `hivetrace_backup_${Date.now()}.json`);
    dl.click();
    Toast.success('Export Ready', 'Downloaded full HiveTrace mock state JSON.');
  }

  function resetDemoData() {
    if (confirm('Reset all Prototype data back to default demo state?')) {
      HiveStore.resetState();
      Toast.success('State Reset', 'Demo prototype data restored to fresh defaults.');
      Header.render();
      refreshView();
    }
  }

  function refreshView() {
    const main = document.getElementById('app-main');
    if (main && Router.getCurrentPath() === 'settings') {
      main.innerHTML = render();
    }
  }

  return {
    render,
    toggleSwitch,
    exportJson,
    resetDemoData
  };
})();
