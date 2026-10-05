/**
 * HiveTrace Beehive Management Dashboard Module
 * Faithfully reproduces the main command dashboard from Stitch mockups.
 */
const DashboardPage = (() => {
  let activeFilter = 'all'; // 'all' | 'honey' | 'brood' | 'attention'
  let searchQuery = '';

  function render() {
    const kpis = HiveStore.get('kpis');
    const hives = HiveStore.get('hives') || [];
    const tasks = HiveStore.get('tasks') || [];
    const batches = HiveStore.get('batches') || [];

    // Filter hives
    const filteredHives = hives.filter(h => {
      if (activeFilter === 'attention' && h.status !== 'attention') return false;
      if (activeFilter === 'honey' && h.status !== 'harvest' && h.superFill < 80) return false;
      if (activeFilter === 'brood' && h.status === 'attention') return false;

      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return h.id.toLowerCase().includes(q) || 
               h.queen.toLowerCase().includes(q) || 
               h.breed.toLowerCase().includes(q) ||
               h.floralBase.toLowerCase().includes(q);
      }
      return true;
    });

    return `
      <div class="flex-col w-full">
        <!-- Command Header Section -->
        <section class="w-full px-margin" style="padding-top: 24px; padding-bottom: 24px; background: rgba(246, 239, 230, 0.5); border-bottom: 1px solid var(--border-subtle);">
          <div class="max-container flex items-center justify-between flex-wrap" style="gap: 24px;">
            <div>
              <div class="flex items-center gap-sm mb-xs flex-wrap">
                <span class="badge badge--primary" style="padding: 4px 12px; font-size: 11px;">
                  <span class="badge-dot badge-dot--green badge-dot--pulse"></span>
                  Aravalli Sector B • Telemetry Active
                </span>
                <span style="color: var(--on-surface-variant); opacity: 0.5;">•</span>
                <span style="font-size: 12px; color: var(--on-surface-variant); font-weight: 600;">Synced 2m ago</span>
              </div>
              <h1 class="font-headline-lg" style="margin-top: 4px; color: var(--on-surface);">Good morning, Elena</h1>
              <p class="font-body-md" style="color: var(--on-surface-variant); margin-top: 4px;">
                Aravalli Forest Apiary Zone B <span class="text-primary font-bold">•</span> 
                <strong>${kpis.activeColonies} Active Colonies</strong> <span class="text-primary font-bold">•</span> 
                <span class="text-forest font-bold">Optimal Foraging Conditions</span>
              </p>
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center gap-sm flex-wrap">
              <button 
                type="button" 
                class="btn btn-primary"
                onclick="Router.navigate('inspections')"
              >
                <span class="material-symbols-outlined">add</span>
                <span>Log Inspection</span>
              </button>

              <button 
                type="button" 
                class="btn btn-secondary"
                onclick="Router.navigate('harvest-and-traceability')"
              >
                <span class="material-symbols-outlined">hive</span>
                <span>Add Harvest Batch</span>
              </button>

              <button 
                type="button" 
                class="btn btn-outline"
                onclick="DashboardPage.simulateScan()"
              >
                <span class="material-symbols-outlined text-primary">qr_code_scanner</span>
                <span>Scan Hive QR</span>
              </button>
            </div>
          </div>
        </section>

        <!-- KPI Overview Cards Grid -->
        <section class="w-full px-margin" style="padding-top: 24px; padding-bottom: 24px;">
          <div class="max-container grid-4">
            <!-- Active Colonies -->
            <div class="card">
              <div class="card-stripe card-stripe--green"></div>
              <div>
                <div class="flex items-center justify-between mb-sm">
                  <span class="kpi-label">Active Colonies</span>
                  <span class="material-symbols-outlined text-forest" style="font-size: 22px;">nest_multi_room</span>
                </div>
                <div class="flex items-baseline gap-sm">
                  <span class="kpi-value">${kpis.activeColonies}</span>
                  <span class="kpi-trend kpi-trend--up">+${kpis.colonyGrowth} this month</span>
                </div>
                <p class="font-body-sm" style="color: var(--on-surface-variant); margin-top: 4px;">${kpis.viabilityIndex}% overall colony viability index</p>
              </div>
              <div class="flex items-center justify-between border-t" style="margin-top: 16px; padding-top: 12px;">
                <span class="badge badge--success">
                  <span class="badge-dot badge-dot--green"></span> Colonies Thriving
                </span>
                <span style="font-size: 11px; font-weight: 600; color: var(--on-surface-variant);">Zone B Sector</span>
              </div>
            </div>

            <!-- Honey Yield Forecast -->
            <div class="card">
              <div class="card-stripe card-stripe--amber"></div>
              <div>
                <div class="flex items-center justify-between mb-sm">
                  <span class="kpi-label">Honey Yield Forecast</span>
                  <span class="material-symbols-outlined text-primary" style="font-size: 22px;">water_drop</span>
                </div>
                <div class="flex items-baseline gap-sm">
                  <span class="kpi-value">${kpis.honeyYield.toLocaleString()}</span>
                  <span class="kpi-unit">kg</span>
                  <span class="kpi-trend kpi-trend--up" style="margin-left: auto;">+${kpis.yieldGrowth}% vs last cycle</span>
                </div>
                <p class="font-body-sm" style="color: var(--on-surface-variant); margin-top: 4px;">Acacia &amp; Wild Berry bloom window</p>
              </div>
              <div class="border-t" style="margin-top: 16px; padding-top: 12px;">
                <div class="flex items-center justify-between mb-xs" style="font-size: 11px;">
                  <span style="color: var(--on-surface-variant); font-weight: 500;">Super Capacity</span>
                  <span class="text-primary font-bold">82% full</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill progress-fill--amber" style="width: 82%;"></div>
                </div>
              </div>
            </div>

            <!-- Brood Health Index -->
            <div class="card">
              <div class="card-stripe card-stripe--green"></div>
              <div>
                <div class="flex items-center justify-between mb-sm">
                  <span class="kpi-label">Brood Health Index</span>
                  <span class="material-symbols-outlined text-success" style="font-size: 22px;">health_and_safety</span>
                </div>
                <div class="flex items-baseline gap-sm">
                  <span class="kpi-value">${kpis.broodHealth}%</span>
                  <span class="kpi-trend kpi-trend--up">Optimal Pattern</span>
                </div>
                <p class="font-body-sm" style="color: var(--on-surface-variant); margin-top: 4px;">Sampled across 32 core telemetry frames</p>
              </div>
              <div class="border-t" style="margin-top: 16px; padding-top: 12px;">
                <div class="flex items-center justify-between mb-xs" style="font-size: 11px;">
                  <span style="color: var(--on-surface-variant); font-weight: 500;">Laying Density</span>
                  <span class="text-forest font-bold">Solid Capped Brood</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill progress-fill--green" style="width: 95%;"></div>
                </div>
              </div>
            </div>

            <!-- Inspections Due (Berry Alert) -->
            <div class="card">
              <div class="card-stripe card-stripe--red"></div>
              <div>
                <div class="flex items-center justify-between mb-sm">
                  <span class="kpi-label">Inspections Due</span>
                  <span class="material-symbols-outlined text-danger" style="font-size: 22px;">assignment_late</span>
                </div>
                <div class="flex items-baseline gap-sm">
                  <span class="kpi-value">${kpis.inspectionsDue}</span>
                  <span class="kpi-unit">Hives</span>
                  <span class="kpi-trend kpi-trend--down" style="margin-left: auto;">${kpis.highPriority} High Priority</span>
                </div>
                <p class="font-body-sm" style="color: var(--on-surface-variant); margin-top: 4px;">Scheduled for canopy check cycle</p>
              </div>
              <div class="flex items-center justify-between border-t" style="margin-top: 16px; padding-top: 12px;">
                <span class="badge badge--danger">
                  <span class="material-symbols-outlined" style="font-size: 14px;">timer</span> Due within 48 hrs
                </span>
                <a href="#inspections" class="text-forest font-bold flex items-center" style="font-size: 12px; text-decoration: none;">
                  View queue <span class="material-symbols-outlined" style="font-size: 14px;">arrow_forward</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <!-- Main Dashboard 12-Column Grid -->
        <section class="w-full px-margin" style="padding-bottom: 48px;">
          <div class="max-container grid-12 items-start">
            
            <!-- LEFT COLUMN: Hive Fleet Grid & Telemetry (8 cols) -->
            <div class="col-span-8 flex-col gap-lg">
              
              <!-- Filter Bar & Search Controls -->
              <div class="card" style="padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
                <div class="flex items-center gap-xs overflow-x-auto" id="fleet-filter-tabs">
                  <button 
                    type="button" 
                    class="btn ${activeFilter === 'all' ? 'btn-primary' : 'btn-ghost'}" 
                    style="font-size: 12px; padding: 6px 14px;"
                    onclick="DashboardPage.setFilter('all')"
                  >
                    All Colonies (142)
                  </button>
                  <button 
                    type="button" 
                    class="btn ${activeFilter === 'honey' ? 'btn-primary' : 'btn-ghost'}" 
                    style="font-size: 12px; padding: 6px 14px;"
                    onclick="DashboardPage.setFilter('honey')"
                  >
                    Honey Flow (64)
                  </button>
                  <button 
                    type="button" 
                    class="btn ${activeFilter === 'brood' ? 'btn-primary' : 'btn-ghost'}" 
                    style="font-size: 12px; padding: 6px 14px;"
                    onclick="DashboardPage.setFilter('brood')"
                  >
                    Brood Rearing (52)
                  </button>
                  <button 
                    type="button" 
                    class="btn ${activeFilter === 'attention' ? 'btn-danger' : 'btn-ghost'}" 
                    style="font-size: 12px; padding: 6px 14px; color: ${activeFilter === 'attention' ? '' : 'var(--berry-destructive)'};"
                    onclick="DashboardPage.setFilter('attention')"
                  >
                    <span class="badge-dot badge-dot--red"></span>
                    Attention (6)
                  </button>
                </div>

                <!-- Search Input -->
                <div class="flex items-center gap-xs">
                  <div class="batch-lookup" style="background: var(--surface-container-low); padding: 4px 12px;">
                    <span class="material-symbols-outlined">search</span>
                    <input 
                      type="text" 
                      id="hive-search-input" 
                      placeholder="Search Hive ID, Queen..." 
                      value="${searchQuery}" 
                      oninput="DashboardPage.handleSearch(this.value)"
                    />
                  </div>
                  <button type="button" class="btn-ghost" title="Reset Filters" onclick="DashboardPage.resetFilters()">
                    <span class="material-symbols-outlined" style="font-size: 20px;">tune</span>
                  </button>
                </div>
              </div>

              <!-- Hive Cards Grid -->
              <div class="grid-2">
                ${filteredHives.map(hive => renderHiveCard(hive)).join('')}
              </div>

              <!-- Botanical Forage Map & Micro-Climate Overview Banner -->
              <div class="card flex items-center gap-lg" style="padding: 24px; flex-direction: row; flex-wrap: wrap;">
                <div style="width: 200px; height: 160px; border-radius: var(--radius-lg); overflow: hidden; position: relative; flex-shrink: 0; background: var(--forest-primary); border: 1px solid var(--border-subtle);">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIvTuNwD9vp606OAwERINCp-rPDkBga8b49_VIV6bna38u9zfOPBhFsjccgELcE6tG-HeXkJsRVZd4n9Jv_WIyHdHIUk6jH9sVb_XkhFLM3NhmhYRhDuPQypmvPce6ZKlBqkYckERbzWtN-6Qi2OH2cCykSrrf7lSach1YBerkf_CpNxWDhS6hKdzyk-MM_7f7-Wvu7oEPFL-tWjQQ2jwUDBPg-Yc9WG25D7dT5ummSkJfDP8M6tVBVQ" 
                    alt="Canopy Aerial View" 
                    style="width: 100%; height: 100%; object-fit: cover;"
                  />
                  <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(30,63,32,0.85) 0%, transparent 60%); display: flex; align-items: flex-end; padding: 10px;">
                    <span style="font-size: 11px; font-weight: 700; color: #FFF; display: flex; align-items: center; gap: 4px;">
                      <span class="material-symbols-outlined text-primary" style="font-size: 14px;">location_on</span> Sector B Canopy
                    </span>
                  </div>
                </div>

                <div style="flex: 1; min-width: 280px;">
                  <div class="flex items-center gap-xs mb-xs">
                    <span class="material-symbols-outlined text-forest" style="font-size: 22px;">park</span>
                    <h4 class="font-headline-sm" style="color: var(--on-surface);">Canopy Blooming Phase: Peak Acacia &amp; Wild Blackberry</h4>
                  </div>
                  <p class="font-body-sm" style="color: var(--on-surface-variant); line-height: 1.6; margin-bottom: 14px;">
                    Foraging radius covers 3.2 km² of non-sprayed tribal bio-reserve. Recent precipitation (14mm on Tuesday) accelerated nectar secretion across wild acacia slopes, raising projected daily hive weight gain across Sector B by +280g/hive/day.
                  </p>
                  <div class="flex items-center gap-xs flex-wrap">
                    <span class="badge badge--info">Acacia Bloom: 92% Density</span>
                    <span class="badge badge--info">Bramble: Early Petal Drop</span>
                    <span class="badge badge--success">
                      <span class="material-symbols-outlined" style="font-size: 14px;">eco</span> Zero Pesticide Trace
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- RIGHT COLUMN: Actionable Feeds, Traceability & Forest Telemetry (4 cols) -->
            <div class="col-span-4 flex-col gap-lg">
              
              <!-- Upcoming Inspections & Field Operations -->
              <div class="card" id="field-operations-card">
                <div class="flex items-center justify-between mb-md">
                  <div class="flex items-center gap-xs">
                    <span class="material-symbols-outlined text-forest" style="font-size: 22px;">checklist</span>
                    <h3 class="font-headline-sm" style="color: var(--on-surface);">Field Operations</h3>
                  </div>
                  <span class="badge badge--info">${tasks.filter(t => !t.completed).length} Pending</span>
                </div>

                <div class="flex-col gap-sm">
                  ${tasks.map(task => renderTaskItem(task)).join('')}
                </div>

                <button 
                  type="button" 
                  class="btn btn-outline w-full" 
                  style="justify-content: center; margin-top: 16px; font-size: 13px;"
                  onclick="DashboardPage.promptAddTask()"
                >
                  <span class="material-symbols-outlined" style="font-size: 18px;">add_task</span>
                  <span>Add Inspection Task</span>
                </button>
              </div>

              <!-- Recent Honey Harvest & Traceability Batches -->
              <div class="card">
                <div class="flex items-center justify-between mb-md">
                  <div class="flex items-center gap-xs">
                    <span class="material-symbols-outlined text-primary" style="font-size: 22px;">verified</span>
                    <h3 class="font-headline-sm" style="color: var(--on-surface);">Harvest Provenance</h3>
                  </div>
                  <a href="#harvest-and-traceability" class="text-forest font-bold" style="font-size: 12px; text-decoration: underline;">Ledger</a>
                </div>

                <div class="flex-col gap-sm">
                  ${batches.slice(0, 2).map(b => `
                    <div style="background: rgba(255,241,232,0.4); border: 1px solid rgba(229,223,213,0.6); border-radius: var(--radius-md); padding: 12px; display: flex; flex-direction: column; gap: 8px;">
                      <div class="flex items-center justify-between">
                        <span class="font-data-code font-bold" style="font-size: 12px; color: var(--on-surface);">Batch #${b.id}</span>
                        <span class="badge badge--success" style="font-size: 10px; padding: 2px 8px;">
                          <span class="material-symbols-outlined" style="font-size: 12px;">check</span> Sealed &amp; Verified
                        </span>
                      </div>
                      <h4 class="font-headline-sm text-forest" style="font-size: 14px;">${b.name}</h4>
                      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 12px; padding: 6px 0; border-top: 1px solid var(--border-subtle); border-bottom: 1px solid var(--border-subtle);">
                        <div>
                          <span style="color: var(--on-surface-variant); font-size: 11px; display: block;">Purity:</span>
                          <span style="font-weight: 700; color: var(--on-surface);">${b.purity}% Botanical</span>
                        </div>
                        <div>
                          <span style="color: var(--on-surface-variant); font-size: 11px; display: block;">Moisture:</span>
                          <span style="font-weight: 700; color: var(--on-surface);">${b.moisture}% (Standard)</span>
                        </div>
                      </div>
                      <div class="flex items-center justify-between" style="font-size: 11px; color: var(--on-surface-variant);">
                        <span>Harvested ${b.harvestDate} • ${b.jars} Jars</span>
                        <a href="#harvest-and-traceability" class="text-forest font-bold flex items-center" style="text-decoration: none;">
                          <span class="material-symbols-outlined" style="font-size: 14px; margin-right: 2px;">qr_code_2</span> Public QR
                        </a>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Forest Environment Sensor Telemetry Widget (Deep Forest Green) -->
              <div style="background: var(--forest-primary); color: #FFF; border-radius: var(--radius-xl); padding: 24px; box-shadow: var(--shadow-md); position: relative; overflow: hidden;">
                <div style="position: relative; z-index: 1;">
                  <div class="flex items-center justify-between mb-sm">
                    <div class="flex items-center gap-xs">
                      <span class="material-symbols-outlined text-primary" style="font-size: 22px; color: var(--tertiary-accent);">nest_eco_leaf</span>
                      <h3 class="font-headline-sm" style="color: #FFF;">Forest Microclimate</h3>
                    </div>
                    <span class="badge" style="background: rgba(255,255,255,0.15); color: var(--tertiary-accent); font-size: 10px;">Station 03-B</span>
                  </div>
                  <p class="font-body-sm" style="color: rgba(255,255,255,0.8); margin-bottom: 16px;">
                    Real-time apiary weather and floral nectar availability metrics.
                  </p>

                  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; text-align: center; background: rgba(0,0,0,0.25); border-radius: var(--radius-md); padding: 12px; margin-bottom: 16px; border: 1px solid rgba(255,255,255,0.1);">
                    <div>
                      <span style="font-size: 11px; color: rgba(255,255,255,0.7); display: block;">Ambient</span>
                      <span class="font-data-metric" style="font-size: 18px; color: #FFF;">26°C</span>
                      <span style="font-size: 10px; color: var(--tertiary-accent); display: block;">Clear skies</span>
                    </div>
                    <div style="border-left: 1px solid rgba(255,255,255,0.15); border-right: 1px solid rgba(255,255,255,0.15);">
                      <span style="font-size: 11px; color: rgba(255,255,255,0.7); display: block;">Barometer</span>
                      <span class="font-data-metric" style="font-size: 18px; color: #FFF;">1013</span>
                      <span style="font-size: 10px; color: rgba(255,255,255,0.7); display: block;">hPa Stable</span>
                    </div>
                    <div>
                      <span style="font-size: 11px; color: rgba(255,255,255,0.7); display: block;">Nectar Index</span>
                      <span class="font-data-metric" style="font-size: 18px; color: var(--primary-container);">High</span>
                      <span style="font-size: 10px; color: var(--tertiary-accent); display: block;">Bloom Peak</span>
                    </div>
                  </div>

                  <div class="flex items-center justify-between" style="font-size: 12px; color: rgba(255,255,255,0.85); font-weight: 500;">
                    <span class="flex items-center gap-xs">
                      <span class="material-symbols-outlined" style="font-size: 16px; color: var(--tertiary-accent);">air</span>
                      Wind: 6 km/h NNW
                    </span>
                    <span class="flex items-center gap-xs">
                      <span class="material-symbols-outlined" style="font-size: 16px; color: var(--tertiary-accent);">water_drop</span>
                      Humidity: 48%
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        <!-- Footer -->
        <footer class="app-footer">
          <div class="footer-inner">
            <div class="flex items-center gap-sm">
              <img src="assets/logo.svg" alt="HiveTrace Emblem" style="width: 30px; height: 30px; object-fit: contain;" />
              <span class="brand-name" style="font-size: 18px;">HiveTrace</span>
              <span style="color: var(--border-subtle);">•</span>
              <span style="font-size: 12px; color: var(--on-surface-variant);">Forestry &amp; Apiary Integrity System</span>
            </div>
            <div class="flex items-center gap-md" style="font-size: 12px; color: var(--on-surface-variant);">
              <span>Protected Canopy Protocol v4.2</span>
              <span class="text-forest font-bold flex items-center gap-xs">
                <span class="material-symbols-outlined" style="font-size: 16px;">verified</span>
                Certified Organic Provenance
              </span>
            </div>
          </div>
        </footer>
      </div>
    `;
  }

  function renderHiveCard(hive) {
    const isAlert = hive.status === 'attention';
    const isHarvest = hive.status === 'harvest';
    const stripeClass = isAlert ? 'card-stripe--red' : isHarvest ? 'card-stripe--amber' : 'card-stripe--green';
    const badgeClass = isAlert ? 'badge--danger' : isHarvest ? 'badge--warning' : 'badge--success';
    const badgeText = isAlert ? 'Attention Alert' : isHarvest ? 'Ready to Extract' : 'Optimal';

    return `
      <div class="card">
        <div class="card-stripe ${stripeClass}"></div>
        <div class="flex-col" style="gap: 12px;">
          <div class="flex items-start justify-between">
            <div>
              <div class="flex items-center gap-xs">
                <h3 class="font-headline-sm" style="color: var(--on-surface); font-size: 18px;">Hive #${hive.id}</h3>
                <span class="badge ${badgeClass}" style="font-size: 11px;">
                  <span class="badge-dot ${isAlert ? 'badge-dot--red' : isHarvest ? 'badge-dot--amber' : 'badge-dot--green'}"></span>
                  ${badgeText}
                </span>
              </div>
              <span class="font-label-sm" style="color: var(--on-surface-variant); margin-top: 2px; display: block;">
                Floral Base: ${hive.floralBase}
              </span>
            </div>
            <div style="text-align: right;">
              <span style="font-size: 10px; color: var(--on-surface-variant); display: block;">Last Inspected</span>
              <span style="font-size: 12px; font-weight: 700; color: var(--on-surface);">${hive.lastInspected}</span>
            </div>
          </div>

          <!-- Queen Provenance -->
          <div style="background: rgba(255,241,232,0.6); border: 1px solid rgba(229,223,213,0.6); border-radius: var(--radius-md); padding: 8px 12px; display: flex; align-items: center; justify-content: space-between;">
            <div class="flex items-center gap-xs">
              <span class="material-symbols-outlined text-primary" style="font-size: 18px;">stars</span>
              <div>
                <span style="font-size: 12px; font-weight: 700; color: var(--on-surface); display: block;">Queen: ${hive.queen}</span>
                <span style="font-size: 10px; color: var(--on-surface-variant);">${hive.breed} Lineage</span>
              </div>
            </div>
            <span class="badge" style="background: rgba(244,196,100,0.3); font-size: 10px;">Vigor: ${hive.vigor}</span>
          </div>

          <!-- Sensor Metrics Grid -->
          <div class="sensor-grid">
            <div class="sensor-cell">
              <span class="sensor-label">Weight</span>
              <span class="sensor-value">${hive.weight}<span style="font-size: 11px; font-weight: normal; margin-left: 2px;">kg</span></span>
              <span class="sensor-sub ${isAlert ? 'text-danger' : 'text-success'}">${isAlert ? 'Weight drop' : '+1.4 kg/wk'}</span>
            </div>
            <div class="sensor-cell">
              <span class="sensor-label">Core Temp</span>
              <span class="sensor-value">${hive.temp}°C</span>
              <span class="sensor-sub text-success">Brood Nest</span>
            </div>
            <div class="sensor-cell">
              <span class="sensor-label">${isHarvest ? 'Refractometer' : 'Acoustics'}</span>
              <span class="sensor-value">${isHarvest ? '17.2%' : hive.acoustics + 'Hz'}</span>
              <span class="sensor-sub ${isAlert ? 'text-danger' : 'text-success'}">${isAlert ? 'Agitation' : isHarvest ? 'Capped ✓' : 'Calm Forage'}</span>
            </div>
          </div>

          <!-- Super Saturation Progress -->
          <div>
            <div class="flex justify-between items-center mb-xs" style="font-size: 11px;">
              <span style="color: var(--on-surface-variant); font-weight: 500;">Honey Super Saturation</span>
              <span class="font-bold ${isHarvest ? 'text-forest' : 'text-primary'}">${hive.superFill}% Capped</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill ${isHarvest ? 'progress-fill--green' : 'progress-fill--gradient'}" style="width: ${hive.superFill}%;"></div>
            </div>
          </div>

          <!-- Card Bottom Action -->
          <div class="flex items-center justify-between border-t" style="padding-top: 10px; margin-top: 4px;">
            <button 
              type="button" 
              class="btn-ghost" 
              style="padding: 4px 8px; font-size: 12px; font-weight: 700; color: var(--forest-primary);"
              onclick="Router.navigate('inspections')"
            >
              <span class="material-symbols-outlined" style="font-size: 16px;">assignment</span>
              <span>Inspect #${hive.id}</span>
            </button>

            ${isAlert ? `
              <button 
                type="button" 
                class="btn btn-danger" 
                style="padding: 4px 12px; font-size: 11px;"
                onclick="Toast.warning('Urgent Priority', 'Scheduled alcohol wash screen dispatched for Hive #${hive.id}');"
              >
                Prioritize
              </button>
            ` : isHarvest ? `
              <button 
                type="button" 
                class="btn btn-primary" 
                style="padding: 4px 12px; font-size: 11px;"
                onclick="Router.navigate('harvest-and-traceability')"
              >
                Extract
              </button>
            ` : `
              <button 
                type="button" 
                class="btn btn-outline" 
                style="padding: 4px 10px; font-size: 11px;"
                onclick="Toast.success('Telemetry Synced', 'Hive #${hive.id} sensor packet validated via LoRaWAN.');"
              >
                Sync
              </button>
            `}
          </div>
        </div>
      </div>
    `;
  }

  function renderTaskItem(task) {
    const priorityColor = task.priority === 'high' ? 'badge--danger' : task.priority === 'harvest' ? 'badge--warning' : 'badge--success';
    const priorityLabel = task.priority === 'high' ? 'Priority' : task.priority === 'harvest' ? 'Harvest' : 'Colony Dev';

    return `
      <div class="task-item" style="opacity: ${task.completed ? 0.6 : 1};">
        <input 
          type="checkbox" 
          class="task-checkbox" 
          ${task.completed ? 'checked' : ''} 
          onchange="DashboardPage.toggleTask('${task.id}', this.checked)"
        />
        <div style="flex: 1; min-width: 0;">
          <div class="flex items-center justify-between" style="gap: 4px;">
            <span class="font-label-md font-bold truncate" style="text-decoration: ${task.completed ? 'line-through' : 'none'};">
              ${task.title}
            </span>
            <span class="badge ${priorityColor}" style="font-size: 10px; padding: 2px 6px;">
              ${priorityLabel}
            </span>
          </div>
          <p class="font-body-sm" style="font-size: 12px; color: var(--on-surface-variant); margin-top: 2px;">
            ${task.description}
          </p>
          <span style="font-size: 11px; font-weight: 600; color: var(--on-surface-variant); opacity: 0.8; margin-top: 4px; display: block;">
            Due: ${task.due} • ${task.assignee}
          </span>
        </div>
      </div>
    `;
  }

  function setFilter(filter) {
    activeFilter = filter;
    refreshView();
  }

  function handleSearch(val) {
    searchQuery = val;
    refreshView();
  }

  function resetFilters() {
    activeFilter = 'all';
    searchQuery = '';
    refreshView();
  }

  function toggleTask(taskId, isChecked) {
    HiveStore.updateTask(taskId, { completed: isChecked });
    Toast.show('Task Updated', isChecked ? 'Task marked as completed.' : 'Task re-opened.');
    refreshView();
  }

  function promptAddTask() {
    const title = prompt('Enter new field task title:');
    if (title && title.trim()) {
      const state = HiveStore.getState();
      const newTask = {
        id: 't' + Date.now(),
        title: title.trim(),
        description: 'Scheduled canopy operational field inspection',
        due: 'Tomorrow, 10:00',
        assignee: 'Elena V.',
        priority: 'colony',
        completed: false
      };
      state.tasks.unshift(newTask);
      HiveStore.set('tasks', state.tasks);
      Toast.success('Task Added', `Scheduled: "${title}"`);
      refreshView();
    }
  }

  function simulateScan() {
    Toast.show('Hive QR Scanned', 'Recognized Hive #A-14 in Sector B. Opening telemetry inspector...');
    setTimeout(() => {
      Router.navigate('inspections');
    }, 600);
  }

  function refreshView() {
    const main = document.getElementById('app-main');
    if (main && Router.getCurrentPath() === 'dashboard') {
      main.innerHTML = render();
    }
  }

  return { 
    render, 
    setFilter, 
    handleSearch, 
    resetFilters, 
    toggleTask, 
    promptAddTask, 
    simulateScan 
  };
})();
