import { CARDS, cardById } from './data/cards.js';
import * as rules from './rules.js';
import * as auth from './services/authService.js';
import * as decks from './services/deckService.js';

let state = {
  main: {},
  side: {},
  filters: { colors: [], types: [], query: '' },
  user: null,
  view: 'builder',
  modal: null,
  toast: null,
};
let toastId = 0;
let listener = () => {};

export const getState = () => state;
export const subscribe = (fn) => (listener = fn);

function set(patch) {
  state = { ...state, ...patch };
  listener(state);
}

function toast(kind, text) {
  set({ toast: { id: ++toastId, kind, text } });
}

const summary = () => `${rules.total(state.main)} main · ${rules.total(state.side)} sideboard`;

export function init() {
  const held = decks.getHeld();
  if (!held) return;
  set({ main: held.main, side: held.side });
  toast('success', `Your held deck was restored (${summary()}).`);
}

export const setQuery = (query) => set({ filters: { ...state.filters, query } });
export const clearFilters = () => set({ filters: { colors: [], types: [], query: '' } });

export function toggleFilter(kind, value) {
  const list = state.filters[kind];
  const next = list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
  set({ filters: { ...state.filters, [kind]: next } });
}

export function visibleCards() {
  const { colors, types, query } = state.filters;
  const q = query.trim().toLowerCase();
  return CARDS.filter(
    (c) =>
      (!colors.length || colors.includes(c.color)) &&
      (!types.length || types.includes(c.type)) &&
      (!q || c.name.toLowerCase().includes(q)),
  );
}

export function addCard(id, board) {
  const card = cardById(id);
  const error = rules.addError(state, id, board, card.name);
  if (error) return toast('error', error);
  set({ [board]: { ...state[board], [id]: (state[board][id] || 0) + 1 } });
  toast('success', `${card.name} added to ${rules.BOARD_LABEL[board]} (${rules.total(state[board])}/${rules.BOARD_LIMIT[board]})`);
}

export function removeCard(id, board) {
  const next = { ...state[board] };
  if (next[id] > 1) next[id] -= 1;
  else delete next[id];
  set({ [board]: next });
  toast('info', `${cardById(id).name} removed from ${rules.BOARD_LABEL[board]} (${rules.total(next)}/${rules.BOARD_LIMIT[board]})`);
}

export function fillDemo() {
  const main = { ...state.main };
  for (const c of CARDS) {
    const room = rules.MAIN_SIZE - rules.total(main);
    const allowed = rules.MAX_COPIES - rules.copies({ main, side: state.side }, c.id);
    if (room > 0 && allowed > 0) main[c.id] = (main[c.id] || 0) + Math.min(room, allowed);
  }
  set({ main });
  toast('info', `Demo: Main Deck filled to ${rules.total(main)}/${rules.MAIN_SIZE}.`);
}

export function beginSave() {
  if (!rules.isLegal(state)) return toast('error', `Your deck isn't legal yet: Mainboard ${rules.total(state.main)}/${rules.MAIN_SIZE}.`);
  if (state.user) return set({ modal: { type: 'save', name: 'My Deck' } });
  decks.holdDeck(state);
  set({ modal: { type: 'prompt' } });
}

export function openAuth(tab = 'signin') {
  if (!state.user && rules.total(state.main)) decks.holdDeck(state);
  set({ modal: { type: 'auth', tab, error: null } });
}

export const setAuthTab = (tab) => set({ modal: { ...state.modal, tab, error: null } });
export const closeModal = () => set({ modal: null });

export function cancelAuth() {
  set({ modal: null });
  if (decks.getHeld()) toast('info', 'Your deck is still held. Press Save Deck to try again.');
}

export function submitAuth(tab, email, password) {
  try {
    const user = tab === 'create' ? auth.createAccount(email.trim(), password) : auth.signIn(email.trim(), password);
    decks.clearHeld();
    set({ user, modal: null });
    toast('success', `Welcome, ${user.email}. Your deck is intact (${summary()}). Press Save Deck to finish.`);
  } catch (err) {
    set({ modal: { ...state.modal, error: err.message } });
  }
}

export function signOut() {
  set({ user: null, view: 'builder' });
  toast('info', 'Signed out. Your current deck is still on screen.');
}

export function confirmSave(name) {
  const clean = name.trim();
  if (!clean) return set({ modal: { type: 'save', name, error: 'Give your deck a name.' } });
  try {
    decks.saveDeck(state.user.email, clean, state);
    set({ modal: { type: 'saved', name: clean, summary: summary() } });
  } catch {
    set({ modal: { type: 'save', name: clean, error: "Couldn't save. Your deck is still here, so try again." } });
  }
}

export const setView = (view) => set({ view, modal: null });

export function loadDeck(index) {
  const deck = decks.listDecks(state.user.email)[index];
  set({ main: deck.main, side: deck.side, view: 'builder' });
  toast('success', `Loaded "${deck.name}" (${summary()}).`);
}

export function deleteDeck(index) {
  const deck = decks.listDecks(state.user.email)[index];
  decks.deleteDeck(state.user.email, index);
  set({});
  toast('info', `Deleted "${deck.name}".`);
}

export const dismissToast = (id) => {
  if (state.toast?.id === id) set({ toast: null });
};
