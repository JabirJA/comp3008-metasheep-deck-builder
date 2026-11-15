import assert from 'node:assert/strict';
import { MAIN_SIZE, addError, copies, isLegal, total } from '../src/rules.js';

let deck = { main: { a: 3 }, side: { a: 1 } };
assert.equal(copies(deck, 'a'), 4);
assert.match(addError(deck, 'a', 'main', 'A'), /4 copies/);
assert.equal(addError(deck, 'b', 'main', 'B'), null);

deck = { main: Object.fromEntries(Array.from({ length: 13 }, (_, i) => [`c${i}`, i < 12 ? 4 : 2])), side: {} };
assert.equal(total(deck.main), MAIN_SIZE);
assert.match(addError(deck, 'new', 'main', 'New'), /Main Deck is full \(50\/50\)/);
assert.equal(isLegal(deck), true);
assert.equal(isLegal({ main: {}, side: {} }), false);

console.log('rules tests passed');
