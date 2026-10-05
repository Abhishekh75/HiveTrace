/**
 * HiveTrace Hive Inspection Log Form Module
 * Faithfully implements the multi-section form with state management,
 * frame picker, radial gauge, quick tags, draft autosave, and localStorage backend submission.
 */
const InspectionPage = (() => {
  // Local form state
  let formState = {
    hiveId: 'A-14',
    queenStatus: 'seen_marked',
    demeanor: 'calm',
    broodPattern: 'solid',
    activeFrames: [1, 2, 3, 4, 5, 6, 7],
    superFillRate: 85,
    pollenLevel: 'abundant',
    varroaCount: 1,
    pests: {
      beetle: false,
      moth: false,
      chalkbrood: false,
      foulbrood: false
    },
    notes: 'Colony exhibits exceptional vigor. Italian queen located on frame #4 with unbroken concentric egg rings. Super #1 and #2 completely capped with high-grade wildflower honey. Zero signs of chalkbrood or beetle larvae. Added shallow honey super #3 with drawn foundation to prevent swarming impulses during the lavender bloom.',
    nextInspectionDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
  };

  function render() {
    return `
      <div class="flex-col w-full">
        <!-- Top Status Banner -->
        <section class="w-full px-margin" style="padding-top: 24px; padding-bottom: 24px; background: rgba(246, 239, 230, 0.5); border-bottom: 1px solid var(--border-subtle);">
          <div class="max-container flex items-center justify-between flex-wrap" style="gap: 16px;">
            <div>
              <div class="flex items-center gap-sm mb-xs">
                <span class="badge badge--success" style="font-size: 11px;">
                  <span class="badge-dot badge-dot--green"></span> Live Canopy Inspection
                </span>
                <span style="font-size: 12px; color: var(--on-surface-variant); font-weight: 600;">Sector B • Biosecurity Log</span>
              </div>
              <h1 class="font-headline-lg" style="color: var(--on-surface);">Inspection Log — Hive #${formState.hiveId}</h1>
              <p class="font-body-md" style="color: var(--on-surface-variant); margin-top: 4px;">
                Italian Queen Lineage <span class="text-primary font-bold">•</span> Brood Chamber Rotational Assessment
              </p>
            </div>

            <!-- Header Quick Telemetry Pill Cards -->
            <div class="flex items-center gap-sm flex-wrap">
              <div style="background: var(--surface-white); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 10px 16px; display: flex; align-items: center; gap: 12px; box-shadow: var(--shadow-sm);">
                <div>
                  <span class="kpi-label" style="font-size: 10px;">Ambient Canopy</span>
                  <div class="font-headline-sm" style="font-size: 18px; color: var(--on-surface); font-weight: 700;">48% RH</div>
                  <span style="font-size: 11px; color: var(--on-surface-variant);">Sunny · Clear Flight</span>
                </div>
                <div style="width: 36px; height: 36px; border-radius: var(--radius-md); background: rgba(244,196,100,0.3); display: flex; align-items: center; justify-content: center; color: var(--honey-warning);">
                  <span class="material-symbols-outlined" style="font-size: 22px;">wb_sunny</span>
                </div>
              </div>

              <div style="background: var(--forest-success); color: #FFF; border-radius: var(--radius-lg); padding: 10px 16px; display: flex; align-items: center; gap: 12px; box-shadow: var(--shadow-sm);">
                <div>
                  <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; opacity: 0.9;">Bio-Harvest Status</span>
                  <div class="font-headline-sm" style="font-size: 18px; font-weight: 700;">Clear to Extract</div>
                  <span style="font-size: 11px; opacity: 0.9;">Zero Chemical Trace</span>
                </div>
                <div style="width: 36px; height: 36px; border-radius: var(--radius-md); background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center;">
                  <span class="material-symbols-outlined" style="font-size: 22px;">verified</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Form Body -->
        <section class="w-full px-margin" style="padding-top: 32px; padding-bottom: 48px;">
          <div class="max-container" style="max-width: 1080px;">
            <form id="hive-inspection-form" onsubmit="event.preventDefault(); InspectionPage.submitLog();" style="display: flex; flex-direction: column; gap: 28px;">
              
              <!-- SECTION 1: Colony Vitals & Queen Assessment -->
              <div class="form-section">
                <div class="form-section-header">
                  <div class="flex items-center gap-sm">
                    <span class="form-section-number">1</span>
                    <div>
                      <h2 class="font-headline-sm" style="color: var(--on-surface);">Colony Vitals &amp; Queen Assessment</h2>
                      <p class="font-body-sm" style="color: var(--on-surface-variant);">Verify queen laying viability, lineage marking, and comb structural rhythm.</p>
                    </div>
                  </div>
                  <span class="badge badge--success">
                    <span class="material-symbols-outlined" style="font-size: 14px;">crown</span> Marked Yellow (2022-2027)
                  </span>
                </div>

                <div class="grid-2">
                  <!-- Queen Status Selector -->
                  <div>
                    <label class="form-label">Queen Presence &amp; Oviposition Status</label>
                    <div class="radio-card-group cols-2">
                      <label class="radio-card ${formState.queenStatus === 'seen_marked' ? 'selected' : ''}">
                        <input type="radio" name="queen_status" value="seen_marked" ${formState.queenStatus === 'seen_marked' ? 'checked' : ''} onchange="InspectionPage.setQueenStatus('seen_marked')" />
                        <span class="font-label-md">Queen Seen &amp; Marked</span>
                      </label>
                      <label class="radio-card ${formState.queenStatus === 'eggs_present' ? 'selected' : ''}">
                        <input type="radio" name="queen_status" value="eggs_present" ${formState.queenStatus === 'eggs_present' ? 'checked' : ''} onchange="InspectionPage.setQueenStatus('eggs_present')" />
                        <span class="font-label-md">Eggs Present (Active)</span>
                      </label>
                      <label class="radio-card ${formState.queenStatus === 'no_queen' ? 'selected' : ''}">
                        <input type="radio" name="queen_status" value="no_queen" ${formState.queenStatus === 'no_queen' ? 'checked' : ''} onchange="InspectionPage.setQueenStatus('no_queen')" />
                        <span class="font-label-md">No Queen / Virgin Cell</span>
                      </label>
                      <label class="radio-card ${formState.queenStatus === 'supersedure' ? 'selected' : ''}">
                        <input type="radio" name="queen_status" value="supersedure" ${formState.queenStatus === 'supersedure' ? 'checked' : ''} onchange="InspectionPage.setQueenStatus('supersedure')" />
                        <span class="font-label-md">Supersedure In Progress</span>
                      </label>
                    </div>
                  </div>

                  <!-- Demeanor / Temperament -->
                  <div>
                    <label class="form-label">Colony Demeanor &amp; Defensiveness Score</label>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;">
                      <div 
                        class="select-card ${formState.demeanor === 'calm' ? 'selected-calm' : ''}" 
                        onclick="InspectionPage.setDemeanor('calm')"
                      >
                        <div class="select-card-title">Calm / Docile</div>
                        <div class="select-card-desc">Gentle frame inspection</div>
                      </div>
                      <div 
                        class="select-card ${formState.demeanor === 'normal' ? 'selected-moderate' : ''}" 
                        onclick="InspectionPage.setDemeanor('normal')"
                      >
                        <div class="select-card-title">Moderate</div>
                        <div class="select-card-desc">Light smoker required</div>
                      </div>
                      <div 
                        class="select-card ${formState.demeanor === 'defensive' ? 'selected-defensive' : ''}" 
                        onclick="InspectionPage.setDemeanor('defensive')"
                      >
                        <div class="select-card-title">Defensive</div>
                        <div class="select-card-desc">Guarding aggressively</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Brood Pattern & Frame Density Selector -->
                <div class="border-t" style="margin-top: 24px; padding-top: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
                  <div>
                    <label class="form-label">Brood Pattern Integrity</label>
                    <p class="form-hint" style="margin-bottom: 8px;">Coverage uniformity across worker capped brood combs.</p>
                    <div class="radio-card-group cols-2">
                      <label class="radio-card ${formState.broodPattern === 'solid' ? 'selected' : ''}">
                        <input type="radio" name="brood_pattern" value="solid" ${formState.broodPattern === 'solid' ? 'checked' : ''} onchange="InspectionPage.setBroodPattern('solid')" />
                        <span class="font-label-md">Solid &amp; Uniform (&gt;85%)</span>
                      </label>
                      <label class="radio-card ${formState.broodPattern === 'spotty' ? 'selected' : ''}">
                        <input type="radio" name="brood_pattern" value="spotty" ${formState.broodPattern === 'spotty' ? 'checked' : ''} onchange="InspectionPage.setBroodPattern('spotty')" />
                        <span class="font-label-md">Spotty (&lt;60%)</span>
                      </label>
                      <label class="radio-card ${formState.broodPattern === 'drone' ? 'selected' : ''}">
                        <input type="radio" name="brood_pattern" value="drone" ${formState.broodPattern === 'drone' ? 'checked' : ''} onchange="InspectionPage.setBroodPattern('drone')" />
                        <span class="font-label-md">Drone-Biased Laying</span>
                      </label>
                      <label class="radio-card ${formState.broodPattern === 'none' ? 'selected' : ''}">
                        <input type="radio" name="brood_pattern" value="none" ${formState.broodPattern === 'none' ? 'checked' : ''} onchange="InspectionPage.setBroodPattern('none')" />
                        <span class="font-label-md">No Brood / Empty</span>
                      </label>
                    </div>
                  </div>

                  <!-- 10 Frames Picker -->
                  <div style="background: var(--surface-container-low); padding: 16px; border-radius: var(--radius-lg); border: 1px solid var(--border-subtle);">
                    <div class="flex items-center justify-between mb-xs">
                      <span class="font-label-md" style="font-weight: 700; color: var(--on-surface);">Active Brood Chamber Frames</span>
                      <span class="font-headline-sm text-forest" id="brood-count-label" style="font-size: 16px; font-weight: 700;">
                        ${formState.activeFrames.length} of 10 Frames
                      </span>
                    </div>
                    <p class="font-body-sm" style="color: var(--on-surface-variant); margin-bottom: 12px;">Interactive brood frame occupancy selector:</p>
                    
                    <div class="frame-picker" id="frame-picker">
                      ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => {
                        const isActive = formState.activeFrames.includes(n);
                        return `
                          <button 
                            type="button" 
                            class="frame-btn ${isActive ? 'active' : 'inactive'}" 
                            data-frame="${n}"
                            onclick="InspectionPage.toggleFrame(${n})"
                          >
                            ${n}
                          </button>
                        `;
                      }).join('')}
                    </div>

                    <div class="flex items-center justify-between font-body-sm" style="font-size: 11px; color: var(--on-surface-variant); margin-top: 8px;">
                      <span>← Outer Comb</span>
                      <span style="font-weight: 600;">Central Queen Nursery</span>
                      <span>Outer Storage →</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- SECTION 2: Honey Stores & Super Capacity -->
              <div class="form-section">
                <div class="form-section-header">
                  <div class="flex items-center gap-sm">
                    <span class="form-section-number">2</span>
                    <div>
                      <h2 class="font-headline-sm" style="color: var(--on-surface);">Honey Stores &amp; Super Capacity</h2>
                      <p class="font-body-sm" style="color: var(--on-surface-variant);">Calibrate super ripeness, capped cells ratio, and forage floral honey reserves.</p>
                    </div>
                  </div>
                  <span class="badge badge--info">Super #3 Added 18d ago</span>
                </div>

                <div class="grid-12 items-center">
                  <!-- Slider & Pollen Badges (7 cols) -->
                  <div class="col-span-7 flex-col gap-md">
                    <div>
                      <div class="flex items-center justify-between mb-xs">
                        <label class="form-label" for="super-slider" style="margin-bottom: 0;">Honey Supers Fill Rate &amp; Capping Degree</label>
                        <span class="font-headline-sm text-primary font-bold" id="slider-val-label">${formState.superFillRate}% Filled</span>
                      </div>
                      <p class="font-body-sm" style="color: var(--on-surface-variant); margin-bottom: 10px;">
                        Super Comb #1: 95% Capped · Super Comb #2: 90% Capped · Super Comb #3: 70% Capped
                      </p>
                      
                      <input 
                        type="range" 
                        class="range-slider" 
                        id="super-slider" 
                        min="0" 
                        max="100" 
                        value="${formState.superFillRate}" 
                        oninput="InspectionPage.handleSlider(this.value)"
                      />

                      <div class="flex justify-between font-label-sm" style="color: var(--on-surface-variant); margin-top: 6px;">
                        <span>0% Empty</span>
                        <span>50% Expanding</span>
                        <span>80% Capped Ready</span>
                        <span class="text-forest font-bold">100% Full Super</span>
                      </div>
                    </div>

                    <!-- Pollen Reserve Level Badges -->
                    <div class="pt-sm border-t">
                      <label class="form-label">Pollen Reserve Band Level (Protein Buffer)</label>
                      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;">
                        <div 
                          class="select-card ${formState.pollenLevel === 'abundant' ? 'selected-calm' : ''}" 
                          onclick="InspectionPage.setPollenLevel('abundant')"
                        >
                          <div class="select-card-title">Abundant</div>
                          <div class="select-card-desc">&gt; 3 Full Frames</div>
                        </div>
                        <div 
                          class="select-card ${formState.pollenLevel === 'adequate' ? 'selected-moderate' : ''}" 
                          onclick="InspectionPage.setPollenLevel('adequate')"
                        >
                          <div class="select-card-title">Adequate</div>
                          <div class="select-card-desc">1-2 Mixed Frames</div>
                        </div>
                        <div 
                          class="select-card ${formState.pollenLevel === 'low' ? 'selected-defensive' : ''}" 
                          onclick="InspectionPage.setPollenLevel('low')"
                        >
                          <div class="select-card-title">Critically Low</div>
                          <div class="select-card-desc">Pollen Patties Req.</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Radial SVG Gauge Card (5 cols) -->
                  <div class="col-span-5" style="background: var(--surface-container-high); border-radius: var(--radius-xl); padding: 24px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; border: 1px solid var(--border-subtle);">
                    <div class="gauge-container">
                      <svg class="w-full h-full" viewBox="0 0 100 100" style="transform: rotate(-90deg);">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(89,67,47,0.15)" stroke-width="9"></circle>
                        <circle 
                          id="gauge-circle"
                          cx="50" 
                          cy="50" 
                          r="45" 
                          fill="none" 
                          stroke="var(--primary-container)" 
                          stroke-width="9" 
                          stroke-linecap="round"
                          stroke-dasharray="${(formState.superFillRate * 2.83).toFixed(1)}, 283"
                          style="transition: stroke-dasharray 0.3s ease;"
                        ></circle>
                      </svg>
                      <div class="gauge-text">
                        <span class="font-headline-md font-bold" id="gauge-text-val" style="color: var(--on-surface); font-size: 26px;">${formState.superFillRate}%</span>
                        <span style="font-size: 11px; font-weight: 700; color: var(--forest-primary); text-transform: uppercase;">Ripened</span>
                      </div>
                    </div>
                    <div class="flex items-center gap-xs text-forest font-bold mt-sm" style="font-size: 13px;">
                      <span class="material-symbols-outlined" style="font-size: 18px;">water_drop</span>
                      <span>Ready for harvest extraction</span>
                    </div>
                    <p class="font-body-sm" style="color: var(--on-surface-variant); margin-top: 4px;">
                      Target Refractive Brix Index: <strong>81.5° Bx</strong>
                    </p>
                  </div>
                </div>
              </div>

              <!-- SECTION 3: Biosecurity & Pest Diagnostics -->
              <div class="form-section">
                <div class="form-section-header">
                  <div class="flex items-center gap-sm">
                    <span class="form-section-number">3</span>
                    <div>
                      <h2 class="font-headline-sm" style="color: var(--on-surface);">Biosecurity &amp; Pest Diagnostics</h2>
                      <p class="font-body-sm" style="color: var(--on-surface-variant);">Real-time mite count, pathogen checks, and biological certification compliance.</p>
                    </div>
                  </div>
                  <span class="badge badge--success">
                    <span class="material-symbols-outlined" style="font-size: 14px;">health_and_safety</span> Biosecure Certified
                  </span>
                </div>

                <div class="grid-12 gap-lg">
                  <!-- Varroa Load Counter (4 cols) -->
                  <div class="col-span-4" style="background: var(--surface-container-low); border-radius: var(--radius-lg); padding: 16px; display: flex; flex-direction: column; justify-content: space-between; border: 1px solid var(--border-subtle);">
                    <div>
                      <div class="flex items-center justify-between mb-xs">
                        <label class="form-label" for="varroa-count-input" style="margin-bottom: 0;">Varroa Destructor Load</label>
                        <span class="badge badge--success" style="font-size: 10px;">Alcohol Wash</span>
                      </div>
                      <p class="font-body-sm" style="color: var(--on-surface-variant); margin-bottom: 12px;">Sugar roll count normalized per 100 nurse bees.</p>
                      
                      <div class="flex items-center gap-sm mb-sm">
                        <input 
                          type="number" 
                          id="varroa-count-input" 
                          class="form-number" 
                          min="0" 
                          max="25" 
                          value="${formState.varroaCount}" 
                          oninput="InspectionPage.handleVarroa(this.value)"
                        />
                        <div>
                          <div style="font-size: 13px; font-weight: 700; color: var(--on-surface);">Mites / 100 bees</div>
                          <div style="font-size: 11px; color: var(--forest-success); font-weight: 600;">
                            ${formState.varroaCount <= 2 ? '1.0% Threshold (Safe < 2.0%)' : 'Caution: Screen recommended'}
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Visual Safe Threshold Indicator -->
                    <div>
                      <div style="display: flex; height: 8px; border-radius: var(--radius-full); overflow: hidden; width: 100%;">
                        <div style="background: var(--forest-success); width: 33%;"></div>
                        <div style="background: var(--honey-warning); width: 33%;"></div>
                        <div style="background: var(--berry-destructive); width: 34%;"></div>
                      </div>
                      <div class="flex justify-between" style="font-size: 10px; color: var(--on-surface-variant); margin-top: 4px;">
                        <span>Safe (0-2)</span>
                        <span>Monitor (3-5)</span>
                        <span>Critical (&gt;5)</span>
                      </div>
                    </div>
                  </div>

                  <!-- Disease Inspection Checkboxes (8 cols) -->
                  <div class="col-span-8" style="background: var(--surface-container-low); border-radius: var(--radius-lg); padding: 16px; border: 1px solid var(--border-subtle);">
                    <label class="form-label">Pathological &amp; Parasite Screen</label>
                    <p class="font-body-sm" style="color: var(--on-surface-variant); margin-bottom: 12px;">Mark any affirmative observations for regulatory veterinary compliance.</p>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                      <label class="checkbox-card">
                        <input type="checkbox" id="check-shb" onchange="InspectionPage.setPest('beetle', this.checked)" />
                        <div>
                          <div style="font-size: 13px; font-weight: 600; color: var(--on-surface);">Small Hive Beetle (Aethina tumida)</div>
                          <div style="font-size: 11px; color: var(--forest-success); font-weight: 600;">None detected (Clean)</div>
                        </div>
                      </label>

                      <label class="checkbox-card">
                        <input type="checkbox" id="check-moth" onchange="InspectionPage.setPest('moth', this.checked)" />
                        <div>
                          <div style="font-size: 13px; font-weight: 600; color: var(--on-surface);">Greater Wax Moth (Galleria)</div>
                          <div style="font-size: 11px; color: var(--forest-success); font-weight: 600;">Clear comb web</div>
                        </div>
                      </label>

                      <label class="checkbox-card">
                        <input type="checkbox" id="check-chalkbrood" onchange="InspectionPage.setPest('chalkbrood', this.checked)" />
                        <div>
                          <div style="font-size: 13px; font-weight: 600; color: var(--on-surface);">Chalkbrood (Ascosphaera apis)</div>
                          <div style="font-size: 11px; color: var(--forest-success); font-weight: 600;">Clear - No mummies</div>
                        </div>
                      </label>

                      <label class="checkbox-card">
                        <input type="checkbox" id="check-foulbrood" onchange="InspectionPage.setPest('foulbrood', this.checked)" />
                        <div>
                          <div style="font-size: 13px; font-weight: 600; color: var(--on-surface);">American / European Foulbrood</div>
                          <div style="font-size: 11px; color: var(--forest-success); font-weight: 600;">Negative (Rope test negative)</div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <!-- SECTION 4: Apiarist Field Notes & Action Scheduling -->
              <div class="form-section">
                <div class="form-section-header">
                  <div class="flex items-center gap-sm">
                    <span class="form-section-number">4</span>
                    <div>
                      <h2 class="font-headline-sm" style="color: var(--on-surface);">Apiarist Field Observations &amp; Schedule</h2>
                      <p class="font-body-sm" style="color: var(--on-surface-variant);">Log operational field actions, queen replacement plans, and next inspection timeline.</p>
                    </div>
                  </div>
                  <button 
                    type="button" 
                    class="btn btn-outline" 
                    style="font-size: 12px; padding: 4px 12px;"
                    onclick="InspectionPage.toggleVoice()"
                  >
                    <span class="material-symbols-outlined" style="font-size: 16px;">mic</span>
                    <span id="voice-status-text">Voice Dictation Ready</span>
                  </button>
                </div>

                <div class="grid-12 gap-lg">
                  <!-- Clinical Notes (8 cols) -->
                  <div class="col-span-8 flex-col gap-sm">
                    <div class="flex items-center justify-between">
                      <label class="form-label" for="apiarist-notes" style="margin-bottom: 0;">Clinical Field Notes</label>
                      
                      <!-- Quick Tags -->
                      <div class="flex items-center gap-xs flex-wrap">
                        <button type="button" class="quick-tag" onclick="InspectionPage.appendTag('+ Added shallow super')">+ Added shallow super</button>
                        <button type="button" class="quick-tag" onclick="InspectionPage.appendTag('+ Fed sugar syrup')">+ Fed sugar syrup</button>
                        <button type="button" class="quick-tag" onclick="InspectionPage.appendTag('+ Replaced brood frame')">+ Replaced brood frame</button>
                      </div>
                    </div>

                    <textarea 
                      id="apiarist-notes" 
                      class="form-textarea" 
                      rows="4" 
                      placeholder="Document comb development, propolis seal strength, drone cell activity..."
                      oninput="InspectionPage.formState.notes = this.value"
                    >${formState.notes}</textarea>
                  </div>

                  <!-- Date & Follow-up (4 cols) -->
                  <div class="col-span-4" style="background: var(--surface-container-low); border-radius: var(--radius-lg); padding: 16px; display: flex; flex-direction: column; justify-content: space-between; border: 1px solid var(--border-subtle);">
                    <div>
                      <span class="font-label-md" style="font-weight: 700; color: var(--on-surface); display: block; margin-bottom: 4px;">Next Follow-Up Inspection</span>
                      <p class="font-body-sm" style="color: var(--on-surface-variant); margin-bottom: 12px;">Biosecurity mandated 14-day rotational cycle for active production hives.</p>
                      
                      <input 
                        type="date" 
                        class="form-date" 
                        id="next-inspection-date"
                        value="${formState.nextInspectionDate}" 
                        onchange="InspectionPage.formState.nextInspectionDate = this.value"
                      />

                      <div style="margin-top: 12px; display: flex; flex-direction: column; gap: 4px; font-size: 12px;">
                        <div class="flex items-center justify-between">
                          <span style="color: var(--on-surface-variant);">Recommended window:</span>
                          <span style="font-weight: 600; color: var(--on-surface);">12-14 Days</span>
                        </div>
                        <div class="flex items-center justify-between">
                          <span style="color: var(--on-surface-variant);">Pre-harvest clearance:</span>
                          <span class="text-forest font-bold">Active Window</span>
                        </div>
                      </div>
                    </div>

                    <div style="background: var(--secondary-container); color: var(--forest-primary); border-radius: var(--radius-md); padding: 8px 12px; font-size: 11px; font-weight: 600; display: flex; align-items: center; gap: 6px; margin-top: 12px;">
                      <span class="material-symbols-outlined" style="font-size: 16px;">event_repeat</span>
                      <span>Syncs to Sector B Field Calendar</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Bottom Submission Bar -->
              <div class="submission-bar">
                <div class="flex items-center gap-sm">
                  <div style="width: 40px; height: 40px; border-radius: var(--radius-full); background: var(--forest-success); color: #FFF; display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-sm); flex-shrink: 0;">
                    <span class="material-symbols-outlined" style="font-size: 20px;">enhanced_encryption</span>
                  </div>
                  <div>
                    <div style="font-size: 14px; font-weight: 700; color: var(--on-surface);">HiveTrace Cryptographic Audit</div>
                    <div style="font-size: 12px; color: var(--on-surface-variant);">This log will be immutably signed to batch record #HT-2025-088.</div>
                  </div>
                </div>

                <div class="flex items-center gap-sm flex-wrap">
                  <button 
                    type="button" 
                    class="btn btn-outline" 
                    onclick="Router.navigate('dashboard')"
                  >
                    Cancel / Return
                  </button>

                  <button 
                    type="button" 
                    class="btn btn-secondary" 
                    onclick="InspectionPage.saveDraft()"
                  >
                    Save Draft to Tablet
                  </button>

                  <button 
                    type="submit" 
                    class="btn btn-primary" 
                    id="submit-inspection-btn"
                  >
                    <span class="material-symbols-outlined" style="font-size: 20px;">verified</span>
                    <span>Seal &amp; Transmit Inspection Audit</span>
                  </button>
                </div>
              </div>

            </form>

            <!-- Sealed Inspections History Table (Backed by LocalStorage) -->
            ${renderInspectionsHistory()}

          </div>
        </section>
      </div>
    `;
  }

  function renderInspectionsHistory() {
    const inspections = HiveStore.get('inspections') || [];
    if (inspections.length === 0) return '';

    return `
      <div class="card" style="margin-top: 32px; padding: 24px;">
        <div class="flex items-center justify-between mb-md">
          <div class="flex items-center gap-xs">
            <span class="material-symbols-outlined text-forest" style="font-size: 22px;">history_edu</span>
            <h3 class="font-headline-sm" style="color: var(--on-surface);">Locally Persisted Inspection Audits</h3>
          </div>
          <span class="badge badge--success">${inspections.length} Sealed Records</span>
        </div>

        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
            <thead>
              <tr style="border-bottom: 2px solid var(--border-subtle); text-align: left; color: var(--on-surface-variant); font-size: 11px; text-transform: uppercase;">
                <th style="padding: 8px 12px;">Audit ID</th>
                <th style="padding: 8px 12px;">Hive ID</th>
                <th style="padding: 8px 12px;">Queen</th>
                <th style="padding: 8px 12px;">Brood Frames</th>
                <th style="padding: 8px 12px;">Super Fill</th>
                <th style="padding: 8px 12px;">Cryptographic Hash</th>
                <th style="padding: 8px 12px;">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              ${inspections.map(ins => `
                <tr style="border-bottom: 1px solid var(--border-subtle);">
                  <td style="padding: 10px 12px; font-weight: 700; color: var(--forest-primary);">${ins.id}</td>
                  <td style="padding: 10px 12px; font-weight: 600;">Hive #${ins.hiveId}</td>
                  <td style="padding: 10px 12px;">${ins.queenStatus}</td>
                  <td style="padding: 10px 12px;">${ins.activeFrames ? ins.activeFrames.length : 7}/10 Frames</td>
                  <td style="padding: 10px 12px; font-weight: 600; color: var(--primary);">${ins.superFillRate}%</td>
                  <td style="padding: 10px 12px;"><code class="font-data-code" style="font-size: 11px; background: var(--surface-container-low); padding: 2px 6px; border-radius: 4px;">${ins.hashDigest}</code></td>
                  <td style="padding: 10px 12px; color: var(--on-surface-variant); font-size: 11px;">${new Date(ins.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Interactivity Handlers
  function setQueenStatus(status) {
    formState.queenStatus = status;
    refreshView();
  }

  function setDemeanor(demeanor) {
    formState.demeanor = demeanor;
    refreshView();
  }

  function setBroodPattern(pattern) {
    formState.broodPattern = pattern;
    refreshView();
  }

  function toggleFrame(frameNum) {
    const idx = formState.activeFrames.indexOf(frameNum);
    if (idx >= 0) {
      if (formState.activeFrames.length > 1) {
        formState.activeFrames.splice(idx, 1);
      }
    } else {
      formState.activeFrames.push(frameNum);
      formState.activeFrames.sort((a, b) => a - b);
    }
    refreshFramePicker();
  }

  function refreshFramePicker() {
    const label = document.getElementById('brood-count-label');
    if (label) {
      label.textContent = `${formState.activeFrames.length} of 10 Frames`;
    }
    const container = document.getElementById('frame-picker');
    if (container) {
      const buttons = container.querySelectorAll('.frame-btn');
      buttons.forEach(btn => {
        const frameNum = parseInt(btn.dataset.frame, 10);
        const isActive = formState.activeFrames.includes(frameNum);
        btn.className = `frame-btn ${isActive ? 'active' : 'inactive'}`;
      });
    }
  }

  function handleSlider(val) {
    formState.superFillRate = parseInt(val, 10);
    const label = document.getElementById('slider-val-label');
    if (label) label.textContent = `${val}% Filled`;

    const gaugeText = document.getElementById('gauge-text-val');
    if (gaugeText) gaugeText.textContent = `${val}%`;

    const circle = document.getElementById('gauge-circle');
    if (circle) {
      const dash = (val * 2.83).toFixed(1);
      circle.setAttribute('stroke-dasharray', `${dash}, 283`);
    }
  }

  function setPollenLevel(level) {
    formState.pollenLevel = level;
    refreshView();
  }

  function handleVarroa(val) {
    formState.varroaCount = parseInt(val, 10) || 0;
  }

  function setPest(key, isChecked) {
    formState.pests[key] = isChecked;
  }

  function appendTag(tagText) {
    const textarea = document.getElementById('apiarist-notes');
    if (textarea) {
      if (textarea.value.trim().length > 0) {
        textarea.value += ' ' + tagText;
      } else {
        textarea.value = tagText;
      }
      formState.notes = textarea.value;
      textarea.focus();
    }
  }

  function toggleVoice() {
    const statusText = document.getElementById('voice-status-text');
    if (statusText) {
      statusText.textContent = 'Listening to field dictation...';
      statusText.style.color = 'var(--berry-destructive)';
      Toast.show('Audio Dictation', 'Microphone active. Ambient wind filter engaged.');

      setTimeout(() => {
        appendTag('Super #2 frame inspection completed with zero swarm cells detected.');
        statusText.textContent = 'Voice Dictation Ready';
        statusText.style.color = '';
        Toast.success('Transcription Complete', 'Clinical field note updated via speech audio model.');
      }, 1500);
    }
  }

  function saveDraft() {
    const notesElem = document.getElementById('apiarist-notes');
    if (notesElem) formState.notes = notesElem.value;

    const draft = HiveStore.saveDraft({
      ...formState,
      savedAt: new Date().toISOString()
    });

    Toast.success('Draft Saved to Tablet', `Audit draft #${draft.tempId} stored offline in local database.`);
  }

  function submitLog() {
    const notesElem = document.getElementById('apiarist-notes');
    if (notesElem) formState.notes = notesElem.value;

    const record = HiveStore.addInspection({
      ...formState,
      completedBy: HiveStore.get('auth.user.name') || 'Elena Vance',
      sector: 'Sector B'
    });

    Toast.success(
      'Inspection Record Sealed', 
      `Biosecurity hash ${record.hashDigest} generated and logged to Hive #${record.hiveId} ledger.`
    );

    // Refresh view to show updated audit table
    refreshView();

    // Scroll to audit table
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  function refreshView() {
    const main = document.getElementById('app-main');
    if (main && Router.getCurrentPath() === 'inspections') {
      main.innerHTML = render();
    }
  }

  return {
    render,
    formState,
    setQueenStatus,
    setDemeanor,
    setBroodPattern,
    toggleFrame,
    handleSlider,
    setPollenLevel,
    handleVarroa,
    setPest,
    appendTag,
    toggleVoice,
    saveDraft,
    submitLog
  };
})();
