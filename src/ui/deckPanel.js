import { COLORS, cardById } from '../data/cards.js';
import { BOARD_LABEL, BOARD_LIMIT, MAIN_SIZE, isLegal, total } from '../rules.js';
import { esc } from './dom.js';

export function topbarHtml(s) {
  const account = s.user
    ? `<span class="who">${esc(s.user.email)}</span>
       <button type="button" class="btn ghost" data-action="sign-out" data-fid="sign-out">Sign out</button>`
    : '<button type="button" class="btn primary" data-action="signin-open" data-fid="top-signin">Sign in</button>';
  return `<span class="brand">MetaSheep</span><span class="tab">Deck Builder</span><div class="account">${account}</div>`;
}

export function bannerHtml(s) {
  if (s.user) return '';
  return `<p class="banner">You're not signed in. Sign in to save this deck. We'll hold your deck for 30 minutes while you sign in.</p>`;
}

function rows(s, board) {
  return Object.entries(s[board])
    .map(([id, n]) => {
      const c = cardById(id);
      const name = esc(c.name);
      return `<li class="row">
        <span class="swatch" style="background:${COLORS[c.color].hex}" aria-hidden="true"></span>
        <span class="rname">${name}</span><span class="qty">× ${n}</span>
        <button type="button" data-action="remove" data-board="${board}" data-id="${id}" data-fid="rm-${board}-${id}" aria-label="Remove one ${name} from ${BOARD_LABEL[board]}">−</button>
        <button type="button" data-action="add" data-board="${board}" data-id="${id}" data-fid="up-${board}-${id}" aria-label="Add one ${name} to ${BOARD_LABEL[board]}">+</button>
      </li>`;
    })
    .join('');
}

function zone(s, board) {
  const body = total(s[board])
    ? `<ul class="rows">${rows(s, board)}</ul>`
    : `<p class="drop-empty">Drag cards here for your ${board === 'main' ? 'main deck' : 'sideboard'}</p>`;
  return `<div class="zone" data-board="${board}" data-drop-label="Drop here: ${BOARD_LABEL[board]}">${body}</div>`;
}

export function mainPanelHtml(s) {
  const legal = isLegal(s);
  const missing = MAIN_SIZE - total(s.main);
  const helper = !legal
    ? `Add ${missing} more card${missing === 1 ? '' : 's'} to save`
    : s.user
      ? ''
      : 'Sign in to save';
  return `<header class="phead">
      <h2>Main Deck <span class="counter">${total(s.main)}/${MAIN_SIZE}</span></h2>
      <div class="save">
        <button type="button" class="btn primary" data-action="save" data-fid="save" ${legal ? '' : 'disabled'}>${s.user ? '' : '🔒 '}Save Deck</button>
        <span class="helper">${helper}</span>
      </div>
    </header>
    <p class="status ${legal ? 'ok' : 'warn'}" role="status">${legal ? '✓ Deck is legal' : `⚠ Not legal: Mainboard ${total(s.main)}/${MAIN_SIZE}`}</p>
    ${zone(s, 'main')}
    <button type="button" class="link" data-action="fill-demo" data-fid="fill-demo">Demo: fill main deck to 50</button>`;
}

export function sidePanelHtml(s) {
  return `<header class="phead"><h2>Sideboard <span class="counter">${total(s.side)}/${BOARD_LIMIT.side}</span></h2></header>
    <p class="sub">Backup cards, up to ${BOARD_LIMIT.side}</p>
    ${zone(s, 'side')}`;
}
