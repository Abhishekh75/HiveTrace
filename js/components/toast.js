/**
 * HiveTrace Toast Notification System
 * Handles elegant animated toast notifications for audits, drafts, alerts, and settings.
 */
const Toast = (() => {
  let container = null;

  function getContainer() {
    if (!container) {
      container = document.getElementById('toast-container');
      if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
      }
    }
    return container;
  }

  function show(title, message, type = 'success', duration = 4000) {
    const parent = getContainer();

    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;

    let icon = 'task_alt';
    if (type === 'warning') icon = 'warning';
    if (type === 'error') icon = 'error';

    toast.innerHTML = `
      <span class="material-symbols-outlined" style="font-size: 24px; flex-shrink: 0; font-variation-settings: 'FILL' 1;">
        ${icon}
      </span>
      <div style="flex: 1; min-width: 0;">
        <div class="toast-title">${escapeHtml(title)}</div>
        <div class="toast-message">${escapeHtml(message)}</div>
      </div>
      <button class="btn-ghost" style="padding: 2px; color: inherit; opacity: 0.8; margin-left: 8px; border: none; background: transparent; cursor: pointer;" aria-label="Close">
        <span class="material-symbols-outlined" style="font-size: 18px;">close</span>
      </button>
    `;

    const closeBtn = toast.querySelector('button');
    closeBtn.addEventListener('click', () => dismiss(toast));

    parent.appendChild(toast);

    // Trigger enter animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    const timer = setTimeout(() => {
      dismiss(toast);
    }, duration);

    toast._timer = timer;
    return toast;
  }

  function dismiss(toast) {
    if (!toast || !toast.parentNode) return;
    clearTimeout(toast._timer);
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  return {
    show,
    success: (title, message, dur) => show(title, message, 'success', dur),
    warning: (title, message, dur) => show(title, message, 'warning', dur),
    error: (title, message, dur) => show(title, message, 'error', dur),
  };
})();
