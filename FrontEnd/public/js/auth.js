// auth.js - sessão simples com localStorage e guardas de rota
const TOKEN_KEY = 'utflix_token';
const PROFILE_KEY = 'utflix_profile';

export function requireAuth() {
  const path = location.pathname;
  if (!localStorage.getItem(TOKEN_KEY) && (path.endsWith('/index.html') || path.endsWith('/movie.html') || path.endsWith('/'))) {
    location.replace('login.html');
  }
}

export function saveSession({ email, name, token, idCliente }) {
  const t = token || ('fake-' + Math.random().toString(36).slice(2));
  localStorage.setItem(TOKEN_KEY, t);
  localStorage.setItem(PROFILE_KEY, JSON.stringify({ email, name: name || 'Guest', idCliente }));
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
  const password = document.querySelector('#password');
  const name = document.querySelector('#name');
  const error = document.querySelector('#formError');
  const guest = document.querySelector('#asGuest');

  function validateEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  const BASE = 'http://localhost:3000';
  async function callLogin(emailVal, senhaVal, nameVal) {
    const headers = { 'Content-Type': 'application/json' };
    const res = await fetch(`${BASE}/clientes/login`, { method: 'POST', headers, body: JSON.stringify({ email: emailVal, senha: senhaVal }) });
    if (!res.ok) throw new Error('Login inválido');
    const data = await res.json();
    saveSession({ email: emailVal, name: nameVal, token: data.token, idCliente: data.idCliente });
  }
  async function callRegister(nameVal, emailVal, senhaVal) {
    const headers = { 'Content-Type': 'application/json' };
    const res = await fetch(`${BASE}/clientes/registrar`, { method: 'POST', headers, body: JSON.stringify({ nome: nameVal || 'Guest', email: emailVal, senha: senhaVal }) });
    if (!res.ok) throw new Error('Registro inválido');
    await callLogin(emailVal, senhaVal, nameVal || 'Guest');
  }

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    error.textContent = '';
    if (!validateEmail(email.value)) { error.textContent = 'Por favor, informe um e-mail válido.'; email.focus(); return; }
    if (!password.value) { error.textContent = 'Informe sua senha.'; password.focus(); return; }
    try { await callLogin(email.value, password.value, name.value.trim()); location.replace('index.html'); }
    catch { error.textContent = 'Login inválido.'; }
  });

  document.querySelector('#registerBtn')?.addEventListener('click', async (e) => {
    e.preventDefault();
    error.textContent = '';
    if (!validateEmail(email.value)) { error.textContent = 'Por favor, informe um e-mail válido.'; email.focus(); return; }
    if (!password.value) { error.textContent = 'Informe sua senha.'; password.focus(); return; }
    try { await callRegister(name.value.trim(), email.value, password.value); location.replace('index.html'); }
    catch { error.textContent = 'Registro inválido.'; }
  });

  guest?.addEventListener('click', (e) => {
    e.preventDefault();
    saveSession({ email: 'guest@utflix', name: 'Guest' });
    location.replace('index.html');
  });
}
