const HELD_KEY = 'metasheep.heldDeck';
const SAVED_KEY = 'metasheep.savedDecks';
const HOLD_MS = 30 * 60 * 1000;

export function holdDeck(deck) {
  localStorage.setItem(HELD_KEY, JSON.stringify({ main: deck.main, side: deck.side, expiresAt: Date.now() + HOLD_MS }));
}

export function getHeld() {
  const held = JSON.parse(localStorage.getItem(HELD_KEY) || 'null');
  return held && held.expiresAt > Date.now() ? held : null;
}

export const clearHeld = () => localStorage.removeItem(HELD_KEY);

const readAll = () => JSON.parse(localStorage.getItem(SAVED_KEY) || '{}');

export const listDecks = (email) => readAll()[email] || [];

export function saveDeck(email, name, deck) {
  const all = readAll();
  all[email] = [...listDecks(email), { name, main: deck.main, side: deck.side, savedAt: Date.now() }];
  localStorage.setItem(SAVED_KEY, JSON.stringify(all));
}

export function deleteDeck(email, index) {
  const all = readAll();
  all[email] = listDecks(email).filter((_, i) => i !== index);
  localStorage.setItem(SAVED_KEY, JSON.stringify(all));
}
