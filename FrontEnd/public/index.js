import { requireAuth, getProfile, logout } from './js/auth.js';
import { getMovies, demoClientes } from './js/api.js';
import { renderHeader, renderHero, renderCarousel, renderSearchResults } from './js/ui/render.js';
import { $, $$ } from './js/ui/dom.js';
import { getMyList } from './js/state.js';

requireAuth();

(async function init() {
  const profile = getProfile();
  const welcomeName = await demoClientes().catch(() => null);
  const userName = welcomeName || profile.name || 'Guest';
  renderHeader(userName, getMyList().length);

  // Logout
  document.addEventListener('click', (e) => {
    if (e.target?.id === 'logoutBtn') logout();
  });

  const movies = await getMovies();
  const trending = movies.filter(m => m.tags.includes('trending'));
  const popular = movies.filter(m => m.tags.includes('popular'));
  const action = movies.filter(m => m.genres.includes('Ação'));
  const comedy = movies.filter(m => m.genres.includes('Comédia'));
  const drama = movies.filter(m => m.genres.includes('Drama'));

  renderHero(trending[0] || movies[0]);

  renderCarousel('Em alta', trending, '#row1');
  renderCarousel('Populares', popular, '#row2');
  renderCarousel('Ação', action, '#row3');
  renderCarousel('Comédia', comedy, '#row4');
  renderCarousel('Drama', drama, '#row5');

  // Busca
  const input = $('#searchInput');
  input?.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    const filtered = movies.filter(m => m.title.toLowerCase().includes(q) || m.genres.join(' ').toLowerCase().includes(q));
    renderSearchResults(filtered);
  });

  // Filtro por categoria
  document.querySelectorAll('[data-filter]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const type = el.dataset.filter;
      const list = type === 'movie' ? movies.filter(m => m.type === 'movie')
                 : type === 'series' ? movies.filter(m => m.type === 'series')
                 : type === 'fav' ? movies.filter(m => getMyList().includes(String(m.id)))
                 : movies;
      renderSearchResults(list);
      $('#searchInput').focus();
    });
  });
})();
