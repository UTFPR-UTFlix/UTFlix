// state.js - Minha Lista e progresso
const LIST_KEY = 'utflix_mylist';
const PROGRESS_KEY = 'utflix_progress';

export function getMyList() {
  try { return JSON.parse(localStorage.getItem(LIST_KEY)) || []; }
  catch { return []; }
}
export function isInMyList(id) {
  return getMyList().includes(String(id));
}
export function addToMyList(id) {
  const s = new Set(getMyList());
  s.add(String(id));
  localStorage.setItem(LIST_KEY, JSON.stringify([...s]));
  return [...s];
}
export function removeFromMyList(id) {
  const s = new Set(getMyList());
  s.delete(String(id));
  localStorage.setItem(LIST_KEY, JSON.stringify([...s]));
  return [...s];
}
export function toggleMyList(id) {
  return isInMyList(id) ? removeFromMyList(id) : addToMyList(id);
}

// "Continuar assistindo" (opcional)
export function markInProgress(id, time = Date.now()) {
  const map = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');
  map[String(id)] = { id: String(id), updatedAt: time };
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(map));
}
export function getInProgress() {
  return Object.values(JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}'))
    .sort((a,b) => b.updatedAt - a.updatedAt);
}
