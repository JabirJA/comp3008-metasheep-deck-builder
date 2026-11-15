const KEY = 'metasheep.users';
const DEMO = { 'student@carleton.ca': 'demo1234' };

const users = () => ({ ...DEMO, ...JSON.parse(localStorage.getItem(KEY) || '{}') });

export function signIn(email, password) {
  if (users()[email] !== password) throw new Error('Incorrect email or password. Your deck is still held.');
  return { email };
}

export function createAccount(email, password) {
  if (!/^\S+@\S+\.\S+$/.test(email)) throw new Error('Enter a valid email address.');
  if (password.length < 6) throw new Error('Password must be at least 6 characters.');
  if (users()[email]) throw new Error('That email already has an account. Try signing in.');
  const saved = JSON.parse(localStorage.getItem(KEY) || '{}');
  localStorage.setItem(KEY, JSON.stringify({ ...saved, [email]: password }));
  return { email };
}
