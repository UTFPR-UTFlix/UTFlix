import { requireAuth, getProfile, logout } from './js/auth.js';
import { getMovieById, getMovies, addFavorite, removeFavorite } from './js/api.js';
import { renderHeader, renderSimilar } from './js/ui/render.js';
import { $, el } from './js/ui/dom.js';
import { openModal } from './js/ui/modal.js';
import { addToMyList, isInMyList, getMyList, removeFromMyList } from './js/state.js';

requireAuth();

(async function init() {
  const profile = getProfile();
  renderHeader(profile.name, getMyList().length);
  document.addEventListener('click', (e) => { if (e.target?.id === 'logoutBtn') logout(); });

  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const movie = await getMovieById(id);
  if (!movie) {
    document.querySelector('#content').innerHTML = '<p role="status" class="container">Conteúdo não encontrado.</p>';
    return;
  }

  const banner = document.querySelector('#banner');
  banner.innerHTML = `
    <img class="banner__img" src="${movie.banner}" alt="Banner de ${movie.title}" />
    <div class="hero__overlay" aria-hidden="true"></div>
    <div class="banner__content">
      <h1 class="hero__title">${movie.title}</h1>
      <div class="meta">
        <span class="badge">Nota ${movie.rating.toFixed(1)}</span>
        <span class="badge">${movie.year}</span>
        <span class="badge">${movie.duration}</span>
        <span class="badge">${movie.genres.join(', ')}</span>
      </div>
      <p>${movie.synopsis}</p>
      <div class="hero__actions">
        <button class="btn btn--primary" id="btnPlay"><img class="icon" src="./assets/icons/play.svg" alt="" /> Assistir agora</button>
        <button class="btn btn--ghost" id="btnFav">${isInMyList(movie.id) ? 'Remover da Minha Lista' : 'Adicionar à Minha Lista'}</button>
      </div>
    </div>`;

  document.querySelector('#btnPlay').addEventListener('click', () => openModal(movie.trailer));
  document.querySelector('#btnFav').addEventListener('click', async (e) => {
    const { idCliente } = getProfile();
    try {
      if (isInMyList(movie.id)) {
        removeFromMyList(movie.id);
        if (idCliente) await removeFavorite(idCliente, movie.id);
        e.target.textContent = 'Removido da Minha Lista';
      } else {
        addToMyList(movie.id);
        if (idCliente) await addFavorite(idCliente, movie.id);
        e.target.textContent = 'Adicionado!';
      }
    } catch {
      e.target.textContent = 'Tente novamente';
    }
  });

  // semelhantes (mesmo primeiro gênero)
  const all = await getMovies();
  const similares = all.filter(m => m.id !== movie.id && m.genres.some(g => movie.genres.includes(g))).slice(0, 12);
  renderSimilar(similares);
})();
