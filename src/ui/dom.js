export const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export function setHtml(el, html) {
  if (el.dataset.html === html) return false;
  const fid = el.contains(document.activeElement) ? document.activeElement.dataset.fid : null;
  const scroll = el.scrollTop;
  el.innerHTML = html;
  el.dataset.html = html;
  el.scrollTop = scroll;
  if (fid) el.querySelector(`[data-fid="${fid}"]`)?.focus();
  return true;
}
