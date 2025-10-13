// api.js - leitura do movies.json e demo de fetch /clientes
const MOVIES_URL = './movies.json';

export async function getMovies() {
  const res = await fetch(MOVIES_URL);
  if (!res.ok) throw new Error('Falha ao carregar filmes');
  return await res.json();
}

export async function getMovieById(id) {
  const list = await getMovies();
  return list.find(m => String(m.id) === String(id));
}

export async function demoClientes() {
  // Tenta fazer um GET /clientes; se falhar (CORS/file), usa mock
  try {
    const res = await fetch('/clientes');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    if (Array.isArray(data) && data.length && data[0].nome) {
      return data[0].nome;
    }
  } catch (e) {
    // mock
    return 'Cliente Demo';
  }
  return null;
}
