const MOVIES_URL = './movies.json';
const CLIENTES_BASE = 'http://localhost:3000';
const FILMES_BASE = 'http://localhost:3001';

export async function getMovies() {
  try {
    const res = await fetch(`${FILMES_BASE}/filmes`);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const list = await res.json();
    return list.map(mapFilme);
  } catch (e) {
    const res = await fetch(MOVIES_URL);
    if (!res.ok) throw new Error('Falha ao carregar filmes');
    return await res.json();
  }
}

function mapFilme(f) {
  const generos = (f.generos || []).map(g => g?.genero?.genero).filter(Boolean);
  return {
    id: f.idFilme,
    title: f.titulo,
    year: f.anoLancamento,
    rating: f.rating ?? 8.0,
    duration: f.duration ?? '120 min',
    genres: generos,
    synopsis: `Sinopse de ${f.titulo}`,
    poster: './assets/img/poster-01.svg',
    banner: './assets/img/banner-01.svg',
    trailer: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    tags: ['popular'],
    type: 'movie',
  };
}

export async function getMovieById(id) {
  const list = await getMovies();
  return list.find(m => String(m.id) === String(id));
}

export async function demoClientes() {
  try {
    const token = localStorage.getItem('utflix_token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const res = await fetch(`${CLIENTES_BASE}/clientes`, { headers });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    if (Array.isArray(data) && data.length && data[0].nome) {
      return data[0].nome;
    }
  } catch (e) {
    return 'Cliente Demo';
  }
  return null;
}

export async function addFavorite(idCliente, idFilme) {
  const token = localStorage.getItem('utflix_token');
  const headers = { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) };
  const res = await fetch(`${CLIENTES_BASE}/clientes/${idCliente}/favoritos`, {
    method: 'POST', headers, body: JSON.stringify({ idFilme: Number(idFilme) })
  });
  if (!res.ok) throw new Error('Falha ao favoritar');
}

export async function removeFavorite(idCliente, idFilme) {
  const token = localStorage.getItem('utflix_token');
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const res = await fetch(`${CLIENTES_BASE}/clientes/${idCliente}/favoritos/${idFilme}`, {
    method: 'DELETE', headers
  });
  if (!res.ok) throw new Error('Falha ao remover favorito');
}

export async function getFavorites(idCliente) {
  const token = localStorage.getItem('utflix_token');
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const res = await fetch(`${CLIENTES_BASE}/clientes/${idCliente}/favoritos`, { headers });
  if (!res.ok) throw new Error('Falha ao obter favoritos');
  const data = await res.json();
  return Array.isArray(data) ? data.map(String) : [];
}
