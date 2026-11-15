import { COLORS, TYPES } from '../data/cards.js';
import { MAX_COPIES, copies } from '../rules.js';
import { visibleCards } from '../store.js';
import { esc } from './dom.js';

const chip = (kind, value, label, on) =>
  `<button type="button" class="chip" data-action="filter" data-kind="${kind}" data-v="${value}" data-fid="${kind}-${value}" aria-pressed="${on}">${label}</button>`;

export function filtersHtml(s) {
  const colors = Object.entries(COLORS)
    .map(([k, c]) => chip('colors', k, `<span class="dot" style="background:${c.hex}"></span>${c.label}`, s.filters.colors.includes(k)))
    .join('');
  const types = TYPES.map((t) => chip('types', t, t, s.filters.types.includes(t))).join('');
  return `<div class="chip-row" role="group" aria-label="Filter by colour">${colors}</div>
    <div class="chip-row" role="group" aria-label="Filter by type">${types}</div>`;
}

export function metaHtml(s) {
  const f = s.filters;
  const filtered = f.colors.length || f.types.length || f.query.trim();
  return `<p><strong>Showing ${visibleCards().length} cards</strong>
    <span class="hint">Drag a card into Main Deck or Sideboard, or use the buttons under each card.</span></p>
    ${filtered ? '<button type="button" class="link" data-action="clear-filters" data-fid="clear-filters">Clear filters</button>' : ''}`;
}

export function gridHtml(s) {
  const cards = visibleCards();
  if (!cards.length) return '<p class="empty">No cards match these filters.</p>';
  return cards
    .map((c) => {
      const n = copies(s, c.id);
      const color = COLORS[c.color];
      return `<article class="card" draggable="true" data-card-id="${c.id}" aria-label="${esc(c.name)}, ${color.label} ${c.type}, ${n} of ${MAX_COPIES} copies in deck">
        <div class="art" style="--c:${color.hex}" aria-hidden="true">${esc(c.name.split(' ').map((w) => w[0]).join('').slice(0, 3))}</div>
        <h3>${esc(c.name)}</h3>
        <p class="cmeta">${color.label} · ${c.type}</p>
        <div class="ctl">
          <span class="count ${n >= MAX_COPIES ? 'max' : ''}">${n}/${MAX_COPIES}</span>
          <button type="button" data-action="add" data-board="main" data-id="${c.id}" data-fid="add-main-${c.id}" aria-label="Add ${esc(c.name)} to Main Deck">+ Main</button>
          <button type="button" data-action="add" data-board="side" data-id="${c.id}" data-fid="add-side-${c.id}" aria-label="Add ${esc(c.name)} to Sideboard">+ Side</button>
        </div>
      </article>`;
    })
    .join('');
}
