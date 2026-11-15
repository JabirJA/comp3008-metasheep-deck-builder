import { esc } from './dom.js';

export function toastHtml(s) {
  const t = s.toast;
  if (!t) return '';
  return `<div class="toast ${t.kind}" role="${t.kind === 'error' ? 'alert' : 'status'}"><span>${esc(t.text)}</span>
    <button type="button" data-action="dismiss-toast" data-id="${t.id}" aria-label="Dismiss notification">×</button></div>`;
}
