import * as store from './store.js';
import { setHtml } from './ui/dom.js';
import { bannerHtml, mainPanelHtml, sidePanelHtml, topbarHtml } from './ui/deckPanel.js';
import { filtersHtml, gridHtml, metaHtml } from './ui/libraryView.js';
import { modalHtml } from './ui/modals.js';
import { toastHtml } from './ui/toast.js';

const $ = (selector) => document.querySelector(selector);
let lastToastId = 0;

function render(s) {
  setHtml($('#topbar'), topbarHtml(s));
  setHtml($('#banner'), bannerHtml(s));
  setHtml($('#filters'), filtersHtml(s));
  setHtml($('#meta'), metaHtml(s));
  setHtml($('#grid'), gridHtml(s));
  setHtml($('#main-panel'), mainPanelHtml(s));
  setHtml($('#side-panel'), sidePanelHtml(s));
  if (setHtml($('#modal-root'), modalHtml(s)) && s.modal) $('#modal-root').querySelector('[data-autofocus]')?.focus();
  setHtml($('#toast-root'), toastHtml(s));

  if (s.toast && s.toast.id !== lastToastId) {
    lastToastId = s.toast.id;
    const id = s.toast.id;
    setTimeout(() => store.dismissToast(id), s.toast.kind === 'error' ? 7000 : 4500);
  }
}

const actions = {
  add: (d) => store.addCard(d.id, d.board),
  remove: (d) => store.removeCard(d.id, d.board),
  filter: (d) => store.toggleFilter(d.kind, d.v),
  'clear-filters': () => {
    $('#search').value = '';
    store.clearFilters();
  },
  save: () => store.beginSave(),
  'signin-open': () => store.openAuth('signin'),
  'create-open': () => store.openAuth('create'),
  'auth-tab': (d) => store.setAuthTab(d.tab),
  'auth-cancel': () => store.cancelAuth(),
  'sign-out': () => store.signOut(),
  'fill-demo': () => store.fillDemo(),
  'close-modal': () => store.closeModal(),
  'dismiss-toast': (d) => store.dismissToast(Number(d.id)),
};

document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-action]');
  if (el) actions[el.dataset.action]?.(el.dataset);
});

$('#search').addEventListener('input', (e) => store.setQuery(e.target.value));

document.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  if (e.target.id === 'auth-form') store.submitAuth(store.getState().modal.tab, data.email, data.password);
  if (e.target.id === 'save-form') store.confirmSave(data.name);
});

document.addEventListener('keydown', (e) => {
  const modal = store.getState().modal;
  if (e.key !== 'Escape' || !modal) return;
  if (modal.type === 'auth') store.cancelAuth();
  else store.closeModal();
});

document.addEventListener('dragstart', (e) => {
  const card = e.target.closest('.card');
  if (!card) return;
  e.dataTransfer.setData('text/plain', card.dataset.cardId);
  document.body.classList.add('dragging');
});

document.addEventListener('dragend', () => {
  document.body.classList.remove('dragging');
  document.querySelectorAll('.zone.over').forEach((z) => z.classList.remove('over'));
});

document.addEventListener('dragover', (e) => {
  const zone = e.target.closest('.zone');
  if (!zone) return;
  e.preventDefault();
  document.querySelectorAll('.zone.over').forEach((z) => z !== zone && z.classList.remove('over'));
  zone.classList.add('over');
});

document.addEventListener('drop', (e) => {
  const zone = e.target.closest('.zone');
  if (!zone) return;
  e.preventDefault();
  document.body.classList.remove('dragging');
  store.addCard(e.dataTransfer.getData('text/plain'), zone.dataset.board);
});

store.subscribe(render);
store.init();
render(store.getState());
