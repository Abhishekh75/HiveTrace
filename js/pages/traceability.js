/**
 * HiveTrace Honey Traceability & Batch Verification Page Module
 * Faithfully reproduces the Provenance Ledger, timeline, pollen spectrum, and lab certificate from Stitch mockups.
 */
const TraceabilityPage = (() => {
  let activeBatchId = 'AT-2024-08';

  const batchDetails = {
    'AT-2024-08': {
      id: 'AT-2024-08',
      name: 'Aravalli Wildflower Reserve',
      varietal: 'Aravalli Wildflower',
      harvestDate: 'Oct 12, 2024',
      jars: 480,
      purity: 99.4,
      moisture: 17.1,
      brix: 81.5,
      elevation: '480m ASL',
      origin: 'Sector B Canopy 4',
      colonies: '12 Core Colonies',
      hashDigest: '0x8a4b99f2e71d3c051a8e92e1:sha256:at08',
      blockHeight: 'Block #481,029',
      pollen: [
        { name: 'Wild Blackberry & Bramble (Rubus fruticosus)', percent: 48, color: 'var(--primary-container)' },
        { name: 'Native Acacia (Acacia modesta)', percent: 36, color: 'var(--tertiary-accent)' },
        { name: 'Wild Clover & Vetiver', percent: 11, color: 'var(--forest-success)' },
        { name: 'Secondary Forest Nectar', percent: 5, color: 'var(--outline-variant)' }
      ],
      lab: [
        { label: 'Diastase Activity', value: '14.2', unit: 'Schade', std: 'Std > 8.0', status: 'Optimal Enzyme', pass: true },
        { label: 'HMF (Hydroxymethylfurfural)', value: '3.8', unit: 'mg/kg', std: 'Std < 40.0', status: 'Raw Unheated', pass: true },
        { label: 'C4 Sugar Adulteration', value: '< 0.8%', unit: '13C IRMS', std: 'Std < 7.0%', status: 'Negative (Pure)', pass: true },
        { label: 'Electrical Conductivity', value: '0.42', unit: 'mS/cm', std: 'Std < 0.80', status: 'Blossom Profile', pass: true },
        { label: 'Invertase Enzyme', value: '84.5', unit: 'U/kg', std: 'Std > 50.0', status: 'Active Live Enzymes', pass: true },
        { label: 'Free Acidity', value: '18.4', unit: 'meq/kg', std: 'Std < 50.0', status: 'Fermentation-Free', pass: true }
      ]
    },
    'AT-2024-07': {
      id: 'AT-2024-07',
      name: 'Acacia Monofloral Reserve',
      varietal: 'Native Acacia Monofloral',
      harvestDate: 'Sep 28, 2024',
      jars: 1200,
      purity: 98.8,
      moisture: 16.9,
      brix: 82.1,
      elevation: '520m ASL',
      origin: 'Sector B Northern Slope',
      colonies: '24 Core Colonies',
      hashDigest: '0x7c3ad991f4b82c091d3fd4f2:sha256:at07',
      blockHeight: 'Block #472,118',
      pollen: [
        { name: 'Native Acacia (Acacia modesta)', percent: 78, color: 'var(--tertiary-accent)' },
        { name: 'Wild Blackberry & Bramble', percent: 14, color: 'var(--primary-container)' },
        { name: 'Mustard Flower', percent: 5, color: 'var(--forest-success)' },
        { name: 'Secondary Canopy Pollen', percent: 3, color: 'var(--outline-variant)' }
      ],
      lab: [
        { label: 'Diastase Activity', value: '16.5', unit: 'Schade', std: 'Std > 8.0', status: 'Peak Enzyme', pass: true },
        { label: 'HMF (Hydroxymethylfurfural)', value: '4.2', unit: 'mg/kg', std: 'Std < 40.0', status: 'Ultra Fresh', pass: true },
        { label: 'C4 Sugar Adulteration', value: '< 0.5%', unit: '13C IRMS', std: 'Std < 7.0%', status: 'Negative (Pure)', pass: true },
        { label: 'Electrical Conductivity', value: '0.35', unit: 'mS/cm', std: 'Std < 0.80', status: 'Monofloral Clean', pass: true },
        { label: 'Invertase Enzyme', value: '92.1', unit: 'U/kg', std: 'Std > 50.0', status: 'High Vitality', pass: true },
        { label: 'Free Acidity', value: '16.2', unit: 'meq/kg', std: 'Std < 50.0', status: 'Fresh Harvest', pass: true }
      ]
    },
    'AT-2024-06': {
      id: 'AT-2024-06',
      name: 'Forest Bramble Reserve',
      varietal: 'Wild Bramble',
      harvestDate: 'Sep 15, 2024',
      jars: 210,
      purity: 97.2,
      moisture: 17.8,
      brix: 80.9,
      elevation: '440m ASL',
      origin: 'Sector B Valley Brook',
      colonies: '8 Riparian Colonies',
      hashDigest: '0x5e9d22a819b10499e1c3a1b3:sha256:at06',
      blockHeight: 'Block #463,890',
      pollen: [
        { name: 'Wild Forest Bramble', percent: 62, color: 'var(--primary-container)' },
        { name: 'Valley Stream Riparian Flora', percent: 22, color: 'var(--forest-success)' },
        { name: 'Wild Berry Nectar', percent: 11, color: 'var(--tertiary-accent)' },
        { name: 'Forest Herbs', percent: 5, color: 'var(--outline-variant)' }
      ],
      lab: [
        { label: 'Diastase Activity', value: '13.8', unit: 'Schade', std: 'Std > 8.0', status: 'Optimal Enzyme', pass: true },
        { label: 'HMF (Hydroxymethylfurfural)', value: '5.1', unit: 'mg/kg', std: 'Std < 40.0', status: 'Raw Unheated', pass: true },
        { label: 'C4 Sugar Adulteration', value: '< 0.9%', unit: '13C IRMS', std: 'Std < 7.0%', status: 'Negative (Pure)', pass: true },
        { label: 'Electrical Conductivity', value: '0.48', unit: 'mS/cm', std: 'Std < 0.80', status: 'Bramble Pure', pass: true },
        { label: 'Invertase Enzyme', value: '78.0', unit: 'U/kg', std: 'Std > 50.0', status: 'Active Live Enzymes', pass: true },
        { label: 'Free Acidity', value: '20.1', unit: 'meq/kg', std: 'Std < 50.0', status: 'Standard Clean', pass: true }
      ]
    }
  };

  function render() {
    const data = batchDetails[activeBatchId] || batchDetails['AT-2024-08'];

    return `
      <div class="flex-col w-full">
        <!-- Top Status & Breadcrumb Header -->
        <section class="w-full px-margin" style="padding-top: 24px; padding-bottom: 24px; background: rgba(246, 239, 230, 0.5); border-bottom: 1px solid var(--border-subtle);">
          <div class="max-container">
            <div class="flex items-center justify-between flex-wrap gap-sm mb-xs">
              <div class="flex items-center gap-xs font-label-sm" style="color: var(--on-surface-variant);">
                <span>HiveTrace Ledger</span>
                <span>/</span>
                <span class="text-forest font-bold">Batch #${data.id}</span>
              </div>
              <span class="badge badge--success">
                <span class="material-symbols-outlined" style="font-size: 14px;">verified</span>
                Cryptographically Verified Organic Monofloral Honey
              </span>
            </div>

            <div class="flex items-end justify-between flex-wrap gap-md mt-xs">
              <div>
                <span class="kpi-label text-forest" style="font-size: 11px;">Module A • Provenance Ledger</span>
                <h1 class="font-headline-lg" style="color: var(--on-surface); margin-top: 4px;">Batch Verification &amp; Forest-to-Jar Provenance</h1>
                <p class="font-body-md" style="color: var(--on-surface-variant); max-width: 680px; margin-top: 4px;">
                  Real-time melissopalynological audit, botanical bloom radius telemetry, and independent laboratory enzyme assays for harvested honey batches.
                </p>
              </div>

              <!-- Action Buttons -->
              <div class="flex items-center gap-xs flex-wrap">
                <button type="button" class="btn btn-primary" onclick="TraceabilityPage.downloadCert()">
                  <span class="material-symbols-outlined">download</span>
                  <span>Certificate (PDF)</span>
                </button>
                <button type="button" class="btn btn-secondary" onclick="TraceabilityPage.printLabels()">
                  <span class="material-symbols-outlined">print</span>
                  <span>Print NFC/QR Labels</span>
                </button>
                <button type="button" class="btn btn-outline" onclick="TraceabilityPage.shareBatch()">
                  <span class="material-symbols-outlined">share</span>
                  <span>Share URL</span>
                </button>
              </div>
            </div>

            <!-- Active Lot Pills Switcher & Search Bar -->
            <div class="card" style="margin-top: 20px; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
              <div class="flex items-center gap-sm flex-wrap">
                <span class="font-label-md flex items-center gap-xs" style="color: var(--on-surface-variant);">
                  <span class="material-symbols-outlined text-primary" style="font-size: 18px;">filter_vintage</span> Active Lot:
                </span>
                <div class="flex items-center gap-xs flex-wrap">
                  <button 
                    type="button" 
                    class="btn ${activeBatchId === 'AT-2024-08' ? 'btn-primary' : 'btn-ghost'}" 
                    style="font-size: 12px; padding: 6px 14px;"
                    onclick="TraceabilityPage.setBatch('AT-2024-08')"
                  >
                    AT-2024-08 (Aravalli Wildflower)
                  </button>
                  <button 
                    type="button" 
                    class="btn ${activeBatchId === 'AT-2024-07' ? 'btn-primary' : 'btn-ghost'}" 
                    style="font-size: 12px; padding: 6px 14px;"
                    onclick="TraceabilityPage.setBatch('AT-2024-07')"
                  >
                    AT-2024-07 (Acacia Monofloral)
                  </button>
                  <button 
                    type="button" 
                    class="btn ${activeBatchId === 'AT-2024-06' ? 'btn-primary' : 'btn-ghost'}" 
                    style="font-size: 12px; padding: 6px 14px;"
                    onclick="TraceabilityPage.setBatch('AT-2024-06')"
                  >
                    AT-2024-06 (Bramble Reserve)
                  </button>
                </div>
              </div>

              <!-- Batch Query Input -->
              <div class="batch-lookup" style="background: var(--surface-container-low); padding: 4px 12px;">
                <span class="material-symbols-outlined">search</span>
                <input 
                  type="text" 
                  id="trace-batch-search" 
                  placeholder="Search batch ID..." 
                  value="${data.id}" 
                  onkeydown="if(event.key === 'Enter') TraceabilityPage.queryBatch(this.value)"
                />
                <button type="button" class="verify-btn" onclick="TraceabilityPage.queryBatch(document.getElementById('trace-batch-search').value)">Query</button>
              </div>
            </div>
          </div>
        </section>

        <!-- 4 Top Provenance Snapshot Cards -->
        <section class="w-full px-margin" style="padding-top: 24px; padding-bottom: 24px;">
          <div class="max-container grid-4">
            <!-- Varietal -->
            <div class="card">
              <div class="card-stripe card-stripe--green"></div>
              <div>
                <div class="flex items-center justify-between mb-xs">
                  <span class="kpi-label">Harvest Varietal</span>
                  <span class="material-symbols-outlined text-forest" style="font-size: 20px;">psychiatry</span>
                </div>
                <h3 class="font-headline-sm" style="color: var(--on-surface); font-size: 18px;">${data.varietal}</h3>
                <p class="font-body-sm" style="color: var(--on-surface-variant); margin-top: 4px;">Raw, Unpasteurized, Cold-Centrifuged</p>
              </div>
              <div class="flex items-center gap-xs border-t" style="margin-top: 16px; padding-top: 10px; font-size: 11px; font-weight: 600; color: var(--forest-primary);">
                <span class="material-symbols-outlined" style="font-size: 15px;">eco</span>
                <span>100% Native Biome Forage</span>
              </div>
            </div>

            <!-- Origin -->
            <div class="card">
              <div class="card-stripe card-stripe--green"></div>
              <div>
                <div class="flex items-center justify-between mb-xs">
                  <span class="kpi-label">Hive Origin</span>
                  <span class="material-symbols-outlined text-forest" style="font-size: 20px;">location_on</span>
                </div>
                <h3 class="font-headline-sm" style="color: var(--on-surface); font-size: 18px;">${data.origin}</h3>
                <p class="font-body-sm" style="color: var(--on-surface-variant); margin-top: 4px;">${data.colonies} • Elevation ${data.elevation}</p>
              </div>
              <div class="flex items-center gap-xs border-t" style="margin-top: 16px; padding-top: 10px; font-size: 11px; font-weight: 600; color: var(--forest-primary);">
                <span class="material-symbols-outlined" style="font-size: 15px;">fence</span>
                <span>Tribal Protected Canopy</span>
              </div>
            </div>

            <!-- Melissopalynology -->
            <div class="card">
              <div class="card-stripe card-stripe--amber"></div>
              <div>
                <div class="flex items-center justify-between mb-xs">
                  <span class="kpi-label">Melissopalynology</span>
                  <span class="material-symbols-outlined text-primary" style="font-size: 20px;">science</span>
                </div>
                <div class="flex items-baseline gap-xs">
                  <span class="kpi-value" style="color: var(--primary);">${data.purity}%</span>
                  <span class="kpi-trend kpi-trend--up">Purity Index</span>
                </div>
                <p class="font-body-sm" style="color: var(--on-surface-variant); margin-top: 4px;">Predominant Wild Berry &amp; Acacia</p>
              </div>
              <div class="flex items-center gap-xs border-t" style="margin-top: 16px; padding-top: 10px; font-size: 11px; font-weight: 600; color: var(--forest-primary);">
                <span class="material-symbols-outlined" style="font-size: 15px;">verified</span>
                <span>ISO 17025 Certified</span>
              </div>
            </div>

            <!-- Moisture & Refractometer -->
            <div class="card">
              <div class="card-stripe card-stripe--green"></div>
              <div>
                <div class="flex items-center justify-between mb-xs">
                  <span class="kpi-label">Moisture &amp; Refractometer</span>
                  <span class="material-symbols-outlined text-forest" style="font-size: 20px;">opacity</span>
                </div>
                <div class="flex items-baseline gap-xs">
                  <span class="kpi-value">${data.moisture}%</span>
                  <span style="font-size: 11px; color: var(--forest-success); font-weight: 700; margin-left: 4px;">Std &lt; 20% ✓</span>
                </div>
                <p class="font-body-sm" style="color: var(--on-surface-variant); margin-top: 4px;">${data.brix}° Brix • Cold Centrifuged</p>
              </div>
              <div class="flex items-center gap-xs border-t" style="margin-top: 16px; padding-top: 10px; font-size: 11px; font-weight: 600; color: var(--forest-primary);">
                <span class="material-symbols-outlined" style="font-size: 15px;">check_circle</span>
                <span>Optimal Viscosity &amp; Curing</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Main 12-Column Grid: Timeline (7 cols) + Lab & QR Passport (5 cols) -->
        <section class="w-full px-margin" style="padding-bottom: 48px;">
          <div class="max-container grid-12 items-start">
            
            <!-- LEFT COLUMN: Provenance Timeline & Pollen Breakdown (7 cols) -->
            <div class="col-span-7 flex-col gap-lg">
              
              <!-- Provenance Timeline -->
              <div class="card">
                <div class="flex items-center justify-between mb-lg">
                  <div class="flex items-center gap-xs">
                    <span class="material-symbols-outlined text-forest" style="font-size: 22px;">timeline</span>
                    <h3 class="font-headline-sm" style="color: var(--on-surface);">Verified Provenance Timeline</h3>
                  </div>
                  <span class="badge badge--success">Chain of Custody 100%</span>
                </div>

                <div class="timeline">
                  <!-- Node 1 -->
                  <div class="timeline-node">
                    <div class="timeline-marker">
                      <span class="material-symbols-outlined">park</span>
                    </div>
                    <div style="background: rgba(255,241,232,0.5); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 14px;">
                      <div class="flex items-center justify-between mb-xs">
                        <span class="font-label-md text-forest" style="font-size: 13px;">Stage 1 • Forest Foraging &amp; Bio-Canopy Health</span>
                        <span style="font-size: 11px; color: var(--on-surface-variant); font-weight: 600;">Sep 14 - Oct 08</span>
                      </div>
                      <p class="font-body-sm" style="color: var(--on-surface-variant); line-height: 1.5;">
                        Zero chemical pesticides within 3.2km buffer. Multi-frequency hive audio sensors recorded calm foraging pitch (235-240Hz). Continuous weight sensors logged +310g/hive daily gain during the peak wild blackberry and acacia nectar secretion window.
                      </p>
                      <div class="flex items-center gap-xs mt-sm flex-wrap">
                        <span class="badge badge--info">Sector B Canopy 4</span>
                        <span class="badge badge--success">Zero Spray Buffer Verified</span>
                      </div>
                    </div>
                  </div>

                  <!-- Node 2 -->
                  <div class="timeline-node">
                    <div class="timeline-marker" style="background: var(--primary-container); color: var(--on-primary-container);">
                      <span class="material-symbols-outlined">hive</span>
                    </div>
                    <div style="background: rgba(255,241,232,0.5); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 14px;">
                      <div class="flex items-center justify-between mb-xs">
                        <span class="font-label-md text-forest" style="font-size: 13px;">Stage 2 • Super Extraction &amp; Cold-Spin Filtration</span>
                        <span style="font-size: 11px; color: var(--on-surface-variant); font-weight: 600;">Oct 12, 09:30 IST</span>
                      </div>
                      <p class="font-body-sm" style="color: var(--on-surface-variant); line-height: 1.5;">
                        Honey frames uncapped by master apiarists using stainless hot-air uncapping. Raw honey cold-centrifuged at 28°C and coarse gravity filtered (800-micron stainless mesh). Zero fine filtering or heat pasteurization, preserving raw invertase enzymes and natural pollen grains.
                      </p>
                      <div class="flex items-center gap-xs mt-sm flex-wrap">
                        <span class="badge badge--info">480 Standard Jars</span>
                        <span class="badge badge--warning">Cold-Centrifuge &lt;35°C</span>
                      </div>
                    </div>
                  </div>

                  <!-- Node 3 -->
                  <div class="timeline-node">
                    <div class="timeline-marker" style="background: var(--forest-success);">
                      <span class="material-symbols-outlined">science</span>
                    </div>
                    <div style="background: rgba(255,241,232,0.5); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 14px;">
                      <div class="flex items-center justify-between mb-xs">
                        <span class="font-label-md text-forest" style="font-size: 13px;">Stage 3 • Multi-Spectral NABL Laboratory Testing</span>
                        <span style="font-size: 11px; color: var(--on-surface-variant); font-weight: 600;">Oct 14, 15:45 IST</span>
                      </div>
                      <p class="font-body-sm" style="color: var(--on-surface-variant); line-height: 1.5;">
                        Full isotopic 13C testing (EA-IRMS) confirmed zero C4 sugar syrup adulteration (&lt;0.8%). Hydroxymethylfurfural (HMF) tested at 3.8 mg/kg confirming pristine unheated quality. Diastase activity registered at 14.2 Schade units.
                      </p>
                      <div class="flex items-center gap-xs mt-sm flex-wrap">
                        <span class="badge badge--success">NABL ISO 17025 Accredited</span>
                        <span class="badge badge--info">Report #NAB-HT-9921</span>
                      </div>
                    </div>
                  </div>

                  <!-- Node 4 -->
                  <div class="timeline-node" style="margin-bottom: 0;">
                    <div class="timeline-marker" style="background: var(--forest-primary);">
                      <span class="material-symbols-outlined">enhanced_encryption</span>
                    </div>
                    <div style="background: rgba(255,241,232,0.5); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 14px;">
                      <div class="flex items-center justify-between mb-xs">
                        <span class="font-label-md text-forest" style="font-size: 13px;">Stage 4 • Cryptographic Custody Seal &amp; Batch QR Minting</span>
                        <span style="font-size: 11px; color: var(--on-surface-variant); font-weight: 600;">Oct 16, 11:20 IST</span>
                      </div>
                      <p class="font-body-sm" style="color: var(--on-surface-variant); line-height: 1.5;">
                        Batch telemetry, sensor hash, lab certificate SHA-256 digest, and apiarist digital signature immutably committed into the forestry provenance ledger at ${data.blockHeight}.
                      </p>
                      <div class="flex items-center gap-xs mt-sm flex-wrap">
                        <code class="font-data-code" style="font-size: 11px; background: var(--surface-white); padding: 2px 8px; border-radius: 4px; border: 1px solid var(--border-subtle);">${data.hashDigest}</code>
                        <span class="badge badge--success">${data.blockHeight}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Botanical Pollen Spectrum -->
              <div class="card">
                <div class="flex items-center justify-between mb-md">
                  <div class="flex items-center gap-xs">
                    <span class="material-symbols-outlined text-primary" style="font-size: 22px;">spa</span>
                    <h3 class="font-headline-sm" style="color: var(--on-surface);">Melissopalynological Pollen Spectrum</h3>
                  </div>
                  <span class="badge badge--info">99.4% Endemic Floral</span>
                </div>

                <div class="flex-col gap-sm">
                  ${data.pollen.map(p => `
                    <div>
                      <div class="flex justify-between items-center mb-xs" style="font-size: 12px;">
                        <span style="font-weight: 600; color: var(--on-surface);">${p.name}</span>
                        <span class="font-data-code font-bold" style="color: var(--forest-primary); font-size: 13px;">${p.percent}%</span>
                      </div>
                      <div class="progress-bar" style="height: 8px;">
                        <div class="progress-fill" style="width: ${p.percent}%; background: ${p.color};"></div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>

            </div>

            <!-- RIGHT COLUMN: Official Lab Certificate & Digital Passport QR (5 cols) -->
            <div class="col-span-5 flex-col gap-lg">
              
              <!-- Official Certificate of Analysis Card -->
              <div class="card">
                <div class="flex items-center justify-between mb-sm">
                  <div class="flex items-center gap-xs">
                    <span class="material-symbols-outlined text-forest" style="font-size: 22px;">verified_user</span>
                    <h3 class="font-headline-sm" style="color: var(--on-surface);">Certificate of Analysis</h3>
                  </div>
                  <span class="badge badge--success">NABL Validated</span>
                </div>
                <p class="font-body-sm" style="color: var(--on-surface-variant); margin-bottom: 16px;">
                  Independent physicochemical inspection protocol for export &amp; organic retail compliance.
                </p>

                <!-- 6 Metric Cards Grid (2x3) -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                  ${data.lab.map(metric => `
                    <div style="background: var(--surface-container-low); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 12px;">
                      <div style="font-size: 11px; font-weight: 600; color: var(--on-surface-variant);">${metric.label}</div>
                      <div style="display: flex; align-items: baseline; gap: 4px; margin: 4px 0;">
                        <span class="font-data-metric" style="font-size: 20px; font-weight: 700; color: var(--on-surface);">${metric.value}</span>
                        <span style="font-size: 10px; color: var(--on-surface-variant); font-weight: 500;">${metric.unit}</span>
                      </div>
                      <div class="flex items-center justify-between" style="font-size: 10px; color: var(--on-surface-variant);">
                        <span>${metric.std}</span>
                        <span class="text-forest font-bold">${metric.status}</span>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Digital Product Passport & QR Code Card -->
              <div class="card" style="text-align: center; display: flex; flex-direction: column; align-items: center;">
                <div class="flex items-center gap-xs mb-xs">
                  <span class="material-symbols-outlined text-primary" style="font-size: 22px;">qr_code_2</span>
                  <h3 class="font-headline-sm" style="color: var(--on-surface);">Public Digital Passport</h3>
                </div>
                <p class="font-body-sm" style="color: var(--on-surface-variant); margin-bottom: 16px; max-width: 320px;">
                  Scan QR or tap NFC tag on retail jar cap to verify botanical provenance directly from the forest blockchain.
                </p>

                <!-- High-Resolution Simulated QR Code Card -->
                <div style="background: #FFF; border: 2px solid var(--forest-primary); border-radius: var(--radius-xl); padding: 16px; box-shadow: var(--shadow-md); margin-bottom: 16px; position: relative;">
                  <img 
                    src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://hivetrace.org/batch/${data.id}&color=1E3F20&bgcolor=FFFFFF" 
                    alt="Cryptographic QR Code for Batch ${data.id}" 
                    style="width: 180px; height: 180px; display: block;"
                    onerror="this.src='assets/logo.svg';"
                  />
                  <div style="margin-top: 8px; font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 700; color: var(--forest-primary);">
                    LOT: ${data.id}
                  </div>
                </div>

                <div style="background: var(--surface-container-low); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 10px 14px; width: 100%; text-align: left; margin-bottom: 14px;">
                  <div style="font-size: 11px; color: var(--on-surface-variant); font-weight: 600;">Cryptographic Hash Digest (SHA-256):</div>
                  <div class="font-data-code truncate" style="font-size: 11px; color: var(--forest-primary); font-weight: 700; margin-top: 2px;">
                    ${data.hashDigest}
                  </div>
                </div>

                <button 
                  type="button" 
                  class="btn btn-primary w-full" 
                  style="justify-content: center;"
                  onclick="TraceabilityPage.simulateNfc()"
                >
                  <span class="material-symbols-outlined" style="font-size: 18px;">contactless</span>
                  <span>Simulate NFC Smart Cap Tap</span>
                </button>
              </div>

            </div>

          </div>
        </section>
      </div>
    `;
  }

  function setBatch(batchId) {
    activeBatchId = batchId;
    refreshView();
    Toast.success('Batch Switched', `Loaded immutable ledger records for Batch #${batchId}`);
  }

  function queryBatch(query) {
    const clean = (query || '').trim().toUpperCase();
    if (batchDetails[clean]) {
      setBatch(clean);
    } else {
      Toast.warning('Batch Not Found', `Batch "${clean}" was not found in Sector B ledger.`);
    }
  }

  function downloadCert() {
    Toast.success('Certificate Exported', `Generated cryptographic NABL laboratory certificate for Batch #${activeBatchId}.`);
  }

  function printLabels() {
    Toast.show('Print Spooler Active', `Sent 480 NFC/QR passport label templates to Station 03 printer.`);
  }

  function shareBatch() {
    navigator.clipboard?.writeText(window.location.href);
    Toast.success('Link Copied', `Public verification link for Batch #${activeBatchId} copied to clipboard.`);
  }

  function simulateNfc() {
    Toast.success('NFC Handshake Confirmed', `Handshake verified with tamper-proof smart jar cap tag #TAG-${activeBatchId}. Batch authenticity 100% confirmed.`);
  }

  function refreshView() {
    const main = document.getElementById('app-main');
    if (main && Router.getCurrentPath() === 'harvest-and-traceability') {
      main.innerHTML = render();
    }
  }

  return { 
    render, 
    setBatch, 
    queryBatch, 
    downloadCert, 
    printLabels, 
    shareBatch, 
    simulateNfc 
  };
})();
