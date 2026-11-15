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

export function saveDeck(email, name, deck) {
  const all = JSON.parse(localStorage.getItem(SAVED_KEY) || '{}');
  all[email] = [...(all[email] || []), { name, main: deck.main, side: deck.side }];
  localStorage.setItem(SAVED_KEY, JSON.stringify(all));
}
