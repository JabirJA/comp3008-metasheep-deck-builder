import { MAIN_SIZE, SIDE_SIZE, total } from '../rules.js';
import { esc } from './dom.js';

const shell = (title, body) =>
  `<div class="backdrop"><div class="modal" role="dialog" aria-modal="true" aria-labelledby="m-title"><h2 id="m-title">${title}</h2>${body}</div></div>`;

const error = (m) => (m.error ? `<p class="error" role="alert">${esc(m.error)}</p>` : '');

export function modalHtml(s) {
  const m = s.modal;
  if (!m) return '';
  const counts = `Main ${total(s.main)}/${MAIN_SIZE} · Sideboard ${total(s.side)}/${SIDE_SIZE}`;

  if (m.type === 'prompt') {
    return shell(
      'Sign in to save your deck',
      `<p>Your deck (${total(s.main)} main · ${total(s.side)} sideboard) is held for 30 minutes while you sign in. Nothing will be lost.</p>
       <div class="stack">
         <button type="button" class="btn primary" data-action="signin-open" data-autofocus data-fid="m-signin">Sign in</button>
         <button type="button" class="btn outline" data-action="create-open" data-fid="m-create">Create account</button>
         <button type="button" class="link" data-action="close-modal" data-fid="m-keep">Keep building</button>
       </div>`,
    );
  }

  if (m.type === 'auth') {
    const create = m.tab === 'create';
    return shell(
      create ? 'Create account' : 'Sign in',
      `<form id="auth-form" novalidate>
         <div class="tabs">
           <button type="button" aria-pressed="${!create}" data-action="auth-tab" data-tab="signin" data-fid="tab-signin">Sign in</button>
           <button type="button" aria-pressed="${create}" data-action="auth-tab" data-tab="create" data-fid="tab-create">Create account</button>
         </div>
         <label>Email<input name="email" type="email" value="student@carleton.ca" data-autofocus></label>
         <label>Password<input name="password" type="password"></label>
         <p class="meta">Demo account: student@carleton.ca / demo1234</p>
         <p class="held">Your deck is held: ${counts}</p>
         ${error(m)}
         <button type="submit" class="btn primary">${create ? 'Create account' : 'Sign in'}</button>
         <button type="button" class="link" data-action="auth-cancel" data-fid="auth-cancel">Cancel</button>
       </form>`,
    );
  }

  if (m.type === 'save') {
    return shell(
      'Save deck',
      `<form id="save-form" novalidate>
         <label>Name<input name="name" type="text" value="${esc(m.name)}" data-autofocus></label>
         <p class="meta">${counts} · Legal</p>
         ${error(m)}
         <div class="row-btns">
           <button type="button" class="btn outline" data-action="close-modal" data-fid="save-cancel">Cancel</button>
           <button type="submit" class="btn primary">Save</button>
         </div>
       </form>`,
    );
  }

  return shell(
    '✓ Deck saved to My Decks',
    `<p><strong>${esc(m.name)}</strong> · ${m.summary}</p>
     <div class="row-btns">
       <button type="button" class="btn outline" data-action="close-modal" data-fid="saved-done">Keep building</button>
       <button type="button" class="btn primary" data-action="view" data-view="decks" data-autofocus data-fid="saved-view">View My Decks</button>
     </div>`,
  );
}
