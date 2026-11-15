# MetaSheep Deck Builder (COMP 3008 A4)

A working version of our redesigned MetaSheep deck builder: build a deck with a visible Main Deck and Sideboard, sign in without losing it, and save it.

## Run it

Needs a modern browser (Chrome, Edge, Firefox, Safari) and Python 3 (preinstalled on macOS) or Node. No other dependencies and no build step.

```
python3 -m http.server 8000
```

Then open http://localhost:8000. (`npm start` does the same.) Opening `index.html` directly will not work because browsers block ES modules on `file://`.

## Where to start the task

The page opens on the builder, signed out, with both panels empty. Task:

1. Drag **Dom Trooper** into the Main Deck (or press **+ Main**), and **Re-GZ** into the Sideboard.
2. Press **Demo: fill main deck to 50** (or keep adding cards) until the chip says **Deck is legal**.
3. Press **Save Deck**. You are asked to sign in; your deck is held.
4. Sign in with the demo account `student@carleton.ca` / `demo1234` (or create an account).
5. Press **Save Deck** again, name the deck, and press **Save**.

Error and recovery paths to try: add a 5th copy of a card or add to a full board (error toast), sign in with a wrong password (inline error), press **Cancel** on sign-in then **Save Deck** again (deck still held), reload the page while signed out (held deck is restored).

## Tests

`npm test` (or `node tests/rules.test.js`) runs the deck-rule checks.

## Files

- `index.html`, `styles.css`: page and styling
- `src/main.js`: renders state, handles clicks, forms, drag and drop
- `src/store.js`: app state and actions
- `src/rules.js`: deck size and copy-limit rules
- `src/data/cards.js`: card list
- `src/services/authService.js`: mock accounts (localStorage)
- `src/services/deckService.js`: held deck and saved decks (localStorage)
- `src/ui/`: HTML builders for each part of the screen

All data stays in the browser's localStorage. Clear it to reset.
