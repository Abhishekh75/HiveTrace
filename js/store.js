/**
 * HiveTrace State Management Store
 * LocalStorage-backed reactive state management with event system
 */
const HiveStore = (() => {
  const STORAGE_KEY = 'hivetrace_data';
  const listeners = new Map();

  // Default state shape
  const defaultState = {
    auth: {
      isLoggedIn: false,
      user: null,
      role: 'apiarist', // 'apiarist' | 'auditor'
    },
    inspections: [],
    drafts: [],
    settings: {
      autoSave: true,
      notificationsEnabled: true,
      darkMode: false,
      telemetrySync: true,
      biosecureProtocol: true,
      voiceDictation: false,
    },
    batches: [
      {
        id: 'AT-2024-08',
        name: 'Aravalli Wildflower Reserve',
        purity: 99.4,
        moisture: 17.1,
        status: 'verified',
        jars: 480,
        distributed: 70.4,
        harvestDate: '2024-10-12',
        hashDigest: '0x8a4b...92e1:sha256:at08',
      },
      {
        id: 'AT-2024-07',
        name: 'Acacia Monofloral',
        purity: 98.8,
        moisture: 16.9,
        status: 'verified',
        jars: 320,
        distributed: 85.0,
        harvestDate: '2024-09-28',
        hashDigest: '0x7c3a...d4f2:sha256:at07',
      },
      {
        id: 'AT-2024-06',
        name: 'Bramble Reserve',
        purity: 97.2,
        moisture: 17.8,
        status: 'verified',
        jars: 210,
        distributed: 92.5,
        harvestDate: '2024-09-15',
        hashDigest: '0x5e9d...a1b3:sha256:at06',
      },
    ],
    hives: [
      { id: 'A-14', queen: 'Aurelia', breed: 'Italian', status: 'optimal', weight: 46.2, temp: 35.1, acoustics: 240, superFill: 85, floralBase: 'Wild Berry & Acacia', vigor: 'High', lastInspected: 'Yesterday' },
      { id: 'A-15', queen: 'Beatrix', breed: 'Carniolan', status: 'optimal', weight: 42.8, temp: 34.8, acoustics: 235, superFill: 70, floralBase: 'Forest Flora & Bramble', vigor: 'Peak', lastInspected: '3 days ago' },
      { id: 'B-08', queen: 'Cassia', breed: 'Caucasian', status: 'attention', weight: 38.5, temp: 36.2, acoustics: 275, superFill: 42, floralBase: 'Rock Cliff Apiary Rim', vigor: 'Low', lastInspected: '12 days ago' },
      { id: 'C-02', queen: 'Danae', breed: 'Buckfast', status: 'harvest', weight: 54.0, temp: 35.0, acoustics: 220, superFill: 98, floralBase: 'Valley Stream Riparian', vigor: 'High', lastInspected: '4 days ago' },
    ],
    tasks: [
      { id: 't1', title: 'Hive #B-08 Varroa Screen', description: 'Bottom board alcohol wash count test', due: 'Today, 14:00', assignee: 'Elena V.', priority: 'high', completed: false },
      { id: 't2', title: 'Hive #C-02 Super Extraction', description: 'Insert escape board 24h prior to frame removal', due: 'Tomorrow, 08:30', assignee: 'Crew', priority: 'harvest', completed: false },
      { id: 't3', title: 'Feed Pollen Patty to Nuc #04', description: 'Supplement brood rearing split frame', due: 'Oct 18', assignee: 'Elena V.', priority: 'colony', completed: false },
    ],
    kpis: {
      activeColonies: 142,
      colonyGrowth: 4,
      viabilityIndex: 96,
      honeyYield: 3850,
      yieldGrowth: 14,
      broodHealth: 94.8,
      inspectionsDue: 6,
      highPriority: 2,
    },
  };

  // Load state from localStorage
  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return deepMerge(defaultState, parsed);
      }
    } catch (e) {
      console.warn('[HiveStore] Failed to load state:', e);
    }
    return JSON.parse(JSON.stringify(defaultState));
  }

  // Deep merge utility
  function deepMerge(target, source) {
    const result = { ...target };
    for (const key of Object.keys(source)) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = deepMerge(target[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    }
    return result;
  }

  let state = loadState();

  // Save to localStorage
  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('[HiveStore] Failed to persist state:', e);
    }
  }

  // Event system
  function on(event, callback) {
    if (!listeners.has(event)) listeners.set(event, new Set());
    listeners.get(event).add(callback);
    return () => listeners.get(event)?.delete(callback);
  }

  function emit(event, data) {
    listeners.get(event)?.forEach(cb => {
      try { cb(data); } catch (e) { console.error(`[HiveStore] Listener error for ${event}:`, e); }
    });
    listeners.get('*')?.forEach(cb => {
      try { cb({ event, data }); } catch (e) { console.error('[HiveStore] Global listener error:', e); }
    });
  }

  // Getters
  function getState() { return state; }
  function get(path) {
    return path.split('.').reduce((obj, key) => obj?.[key], state);
  }

  // Setters
  function set(path, value) {
    const keys = path.split('.');
    let obj = state;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!obj[keys[i]]) obj[keys[i]] = {};
      obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = value;
    persist();
    emit('change', { path, value });
    emit(`change:${path}`, value);
  }

  // Actions
  function login(email, role) {
    state.auth = {
      isLoggedIn: true,
      user: { email, name: 'Elena Vance', role: role === 'auditor' ? 'Lab Auditor' : 'Master Apiarist' },
      role,
    };
    persist();
    emit('auth:login', state.auth);
  }

  function logout() {
    state.auth = { isLoggedIn: false, user: null, role: 'apiarist' };
    persist();
    emit('auth:logout');
  }

  function addInspection(inspection) {
    const id = 'INS-' + Date.now().toString(36).toUpperCase();
    const record = {
      id,
      timestamp: new Date().toISOString(),
      hashDigest: '0x' + Math.random().toString(16).slice(2, 6) + '...' + Math.random().toString(16).slice(2, 6),
      ...inspection,
    };
    state.inspections.unshift(record);
    // Remove from drafts if it was saved as a draft
    state.drafts = state.drafts.filter(d => d.tempId !== inspection.tempId);
    persist();
    emit('inspection:added', record);
    return record;
  }

  function saveDraft(draft) {
    const tempId = draft.tempId || 'DRAFT-' + Date.now().toString(36).toUpperCase();
    const existing = state.drafts.findIndex(d => d.tempId === tempId);
    const record = { ...draft, tempId, savedAt: new Date().toISOString() };
    if (existing >= 0) {
      state.drafts[existing] = record;
    } else {
      state.drafts.unshift(record);
    }
    persist();
    emit('draft:saved', record);
    return record;
  }

  function toggleSetting(key) {
    if (state.settings.hasOwnProperty(key)) {
      state.settings[key] = !state.settings[key];
      persist();
      emit('settings:changed', { key, value: state.settings[key] });
      return state.settings[key];
    }
    return null;
  }

  function updateTask(taskId, updates) {
    const task = state.tasks.find(t => t.id === taskId);
    if (task) {
      Object.assign(task, updates);
      persist();
      emit('task:updated', task);
    }
  }

  function resetState() {
    state = JSON.parse(JSON.stringify(defaultState));
    persist();
    emit('state:reset');
  }

  return {
    getState, get, set, on, emit,
    login, logout,
    addInspection, saveDraft,
    toggleSetting,
    updateTask,
    resetState,
  };
})();
