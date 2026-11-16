import { MAIN_SIZE, SIDE_SIZE, total } from '../rules.js';
import { listDecks } from '../services/deckService.js';
import { esc } from './dom.js';

export function decksHtml(s) {
  if (!s.user) {
    return `<h1>My Decks</h1>
      <p>Sign in to see your saved decks.</p>
      <button type="button" class="btn primary" data-action="signin-open" data-fid="decks-signin">Sign in</button>`;
  }
  const decks = listDecks(s.user.email);
  if (!decks.length) {
    return `<h1>My Decks</h1>
      <p>You haven't saved any decks yet. Build one and press Save Deck.</p>
      <button type="button" class="btn primary" data-action="view" data-view="builder" data-fid="decks-build">Go to Deck Builder</button>`;
  }
  const items = decks
    .map(
      (d, i) => `<li class="deck-item">
        <div class="deck-info">
          <h2>${esc(d.name)}</h2>
          <p>Main ${total(d.main)}/${MAIN_SIZE} · Sideboard ${total(d.side)}/${SIDE_SIZE} · Saved ${new Date(d.savedAt).toLocaleDateString()}</p>
        </div>
        <button type="button" class="btn outline" data-action="load" data-i="${i}" data-fid="load-${i}" aria-label="Load ${esc(d.name)}">Load</button>
        <button type="button" class="btn danger" data-action="delete" data-i="${i}" data-fid="del-${i}" aria-label="Delete ${esc(d.name)}">Delete</button>
      </li>`,
    )
    .join('');
  return `<h1>My Decks</h1><p>${decks.length} saved deck${decks.length === 1 ? '' : 's'}. Loading a deck opens it in the builder.</p><ul class="deck-list">${items}</ul>`;
}
