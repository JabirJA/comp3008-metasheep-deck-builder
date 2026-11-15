export const MAIN_SIZE = 50;
export const SIDE_SIZE = 10;
export const MAX_COPIES = 4;

export const BOARD_LABEL = { main: 'Main Deck', side: 'Sideboard' };
export const BOARD_LIMIT = { main: MAIN_SIZE, side: SIDE_SIZE };

export const total = (board) => Object.values(board).reduce((a, b) => a + b, 0);
export const copies = (deck, id) => (deck.main[id] || 0) + (deck.side[id] || 0);
export const isLegal = (deck) => total(deck.main) === MAIN_SIZE;

export function addError(deck, id, board, name) {
  const size = total(deck[board]);
  if (size >= BOARD_LIMIT[board]) {
    return `${BOARD_LABEL[board]} is full (${size}/${BOARD_LIMIT[board]}). ${name} wasn't added.`;
  }
  if (copies(deck, id) >= MAX_COPIES) {
    return `You can only have ${MAX_COPIES} copies of ${name} across Main Deck and Sideboard.`;
  }
  return null;
}
