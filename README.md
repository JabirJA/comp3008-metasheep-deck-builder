MetaSheep Deck Builder (COMP 3008 A4)
A redesigned version of MetaSheep deckbuilder specifically for gundam. You can build a deck with a visible Main Deck and Sideboard, sign in without losing it, and save it.

Run it
Needs a modern browser (e.g. chrome) and Python 3.

npm start
or 
python3 -m http.server 8000
Then open http://localhost:8000. in your web browser.

Where to start the task
The page opens on the builder, signed out, with both panels empty. Task:

Drag Dom Trooper into the Main Deck (or press + Main), and Re-GZ into the Sideboard. This is how you can manually add to the deck
For a faster way you can just press Demo: fill main deck to 50 until the label at the top of the deck says Deck is legal.
Press Save Deck. You are asked to sign in; your deck is held.
Sign in with the demo account student@carleton.ca / demo1234. Or you can create an account using our account system.
Press Save Deck again, name the deck, and press Save.
Open the My Decks tab to see your saved deck. Load opens it in the builder, Delete removes it.
Error and recovery paths to try:

Add a 5th copy of a card or add to a full board (error toast). Sign in with a wrong password (inline error). Press Cancel on sign-in then Save Deck again (deck still held). Reload the page while signed out (held deck is restored).

Tests
npm test runs the deck-rule checks located in node tests/rules.test.js.

Files
index.html, styles.css: page and styling
tests/rules.test.js: Test for deck rule checks
src/main.js: renders state, handles clicks, forms, drag and drop
src/store.js: app state and actions
src/rules.js: deck size and copy-limit rules
src/data/cards.js: card list
src/services/authService.js: mock accounts (localStorage)
src/services/deckService.js: held deck and saved decks (localStorage)
src/ui/: HTML builders (including the My Decks page) for each part of the screen
