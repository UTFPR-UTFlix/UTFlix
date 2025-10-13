// auth.js - sessão simples com localStorage e guardas de rota
const TOKEN_KEY = 'utflix_token';
const PROFILE_KEY = 'utflix_profile';

export function requireAuth() {
  const path = location.pathname;
  if (!localStorage.getItem(TOKEN_KEY) && (path.endsWith('/index.html') || path.endsWith('/movie.html') || path.endsWith('/'))) {
    location.replace('login.html');
  }
}

export function saveSession({ email, name }) {
  const token = 'fake-' + Math.random().toString(36).slice(2);
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(PROFILE_KEY, JSON.stringify({ email, name: name || 'Guest' }));
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(PROFILE_KEY);
  location.replace('login.html');
}

export function getProfile() {
  try { return JSON.parse(localStorage.getItem(PROFILE_KEY)) || { name: 'Guest' }; }
  catch { return { name: 'Guest' }; }
}

// Login page behavior
export function initLogin() {
  const form = document.querySelector('#loginForm');
  const email = document.querySelector('#email');
  const name = document.querySelector('#name');
  const error = document.querySelector('#formError');
  const guest = document.querySelector('#asGuest');

  function validateEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    error.textContent = '';
    if (!validateEmail(email.value)) {
      error.textContent = 'Por favor, informe um e-mail válido.';
      email.focus();
      return;
    }
    saveSession({ email: email.value, name: name.value.trim() });
    location.replace('index.html');
  });

  guest?.addEventListener('click', (e) => {
    e.preventDefault();
    saveSession({ email: 'guest@utflix', name: 'Guest' });
    location.replace('index.html');
  });
}
