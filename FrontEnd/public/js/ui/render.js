import { $, $$ } from './dom.js';
import { openModal } from './modal.js';
import { addToMyList, removeFromMyList, getMyList } from '../state.js';
import { getMovieById } from '../api.js';

/* ============================
   HEADER (com logo e logout)
============================ */
export function renderHeader(userName, countFavoritos) {
  const header = document.querySelector('.header');
  header.innerHTML = `
    <div class="header__inner container">
      <!-- LOGO -->
      <a href="./index.html" class="logo" aria-label="UTFlix Home">
        <span class="logo__mark">UT</span>Flix
      </a>

      <!-- BARRA DE BUSCA -->
      <label class="header__search" aria-label="Buscar catálogo">
        <img class="icon" src="./assets/icons/search.svg" alt="Buscar" />
        <input
          id="searchInput"
          type="search"
          placeholder="Buscar por título ou gênero"
          aria-controls="searchResults"
        />
      </label>

      <!-- AÇÕES DO HEADER -->
      <div class="header__actions">
        <nav aria-label="Categorias">
          <a class="badge" href="#" data-filter="all">Tudo</a>
          <a class="badge" href="#" data-filter="movie">Filmes</a>
          <a class="badge" href="#" data-filter="series">Séries</a>
          <a class="badge" href="#" data-filter="fav">Favoritos (${countFavoritos})</a>
        </nav>

        <!-- MENU DE PERFIL -->
        <div class="profile-menu">
          <button class="profile-menu__btn" aria-haspopup="menu" aria-expanded="false">
            <img class="icon" src="./assets/icons/user.svg" alt="Usuário" />
            <span>${userName || 'Guest'}</span>
          </button>
          <div class="profile-menu__list" role="menu" aria-hidden="true">
            <button class="profile-menu__item" id="logoutBtn" role="menuitem">Sair</button>
          </div>
        </div>
      </div>
    </div>
  `;

  /* === Interatividade do menu de perfil === */
  const profileBtn = header.querySelector('.profile-menu__btn');
  const profileList = header.querySelector('.profile-menu__list');

  // abre/fecha menu
  profileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = profileList.getAttribute('aria-hidden') === 'false';
    profileList.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
    profileBtn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
  });

  // fecha ao clicar fora
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target)) {
      profileList.setAttribute('aria-hidden', 'true');
      profileBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ============================
   HERO (filme principal)
============================ */
export function renderHero(movie) {
  const hero = $('#hero');
  if (!movie) return;
  hero.innerHTML = `
    <img src="${movie.banner}" alt="Banner de ${movie.title}" class="hero__img" />
    <div class="hero__overlay"></div>
    <div class="hero__content">
      <h2 class="hero__title">${movie.title}</h2>
      <p>${movie.description}</p>
      <div class="hero__actions">
        <button class="btn btn--primary" data-id="${movie.id}" data-action="play">▶ Assistir</button>
        <a class="btn btn--ghost" href="./movie.html?id=${movie.id}">Mais infos</a>
      </div>
    </div>
  `;
  hero.querySelector('[data-action="play"]').addEventListener('click', () => {
    openModal(movie.trailer);
  });
}

/* ============================
   CARROSSEL DE FILMES
============================ */
export function renderCarousel(title, items, containerId) {
  const container = $(containerId);
  if (!items?.length) return;

  container.innerHTML = `
    <section class="section" aria-label="${title}">
      <h2 class="section__title">${title}</h2>
      <div class="carousel">
        <div class="carousel__track" tabindex="0">
          ${items.map(movie => `
            <div class="card" tabindex="0">
              <img src="${movie.poster}" alt="Poster de ${movie.title}" class="card__img" />
              <div class="card__meta">
                <span class="card__title">${movie.title}</span>
                <div class="card__actions">
                  <button class="icon-btn" data-id="${movie.id}" data-action="play" title="Assistir">▶</button>
                  <button class="icon-btn" data-id="${movie.id}" data-action="fav" title="Adicionar à lista">＋</button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;

  container.querySelectorAll('[data-action="play"]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const movie = await getMovieById(btn.dataset.id);
      openModal(movie.trailer);
    });
  });

  container.querySelectorAll('[data-action="fav"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      if (getMyList().includes(id)) removeFromMyList(id);
      else addToMyList(id);
      btn.classList.toggle('active');
    });
  });
}

/* ============================
   RESULTADOS DE BUSCA
============================ */
export function renderSearchResults(items) {
  const area = $('#searchResults');
  if (!items?.length) {
    area.innerHTML = `<p>Nenhum resultado encontrado.</p>`;
    return;
  }
  area.innerHTML = `
    <div class="carousel__track" style="grid-auto-columns: clamp(140px, 28vw, 220px);">
      ${items.map(movie => `
        <div class="card" tabindex="0">
          <img src="${movie.poster}" alt="Poster de ${movie.title}" class="card__img" />
          <div class="card__meta">
            <span class="card__title">${movie.title}</span>
            <div class="card__actions">
              <button class="icon-btn" data-id="${movie.id}" data-action="play" title="Assistir">▶</button>
              <button class="icon-btn" data-id="${movie.id}" data-action="fav" title="Adicionar à lista">＋</button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

/* ============================
   FILMES SEMELHANTES (detalhe)
============================ */
export function renderSimilar(items) {
  const container = $('#similar');
  if (!container || !items?.length) return;

  container.innerHTML = `
    <h3 class="section__title">Semelhantes</h3>
    <div class="carousel__track">
      ${items.map(movie => `
        <a href="./movie.html?id=${movie.id}" class="card">
          <img src="${movie.poster}" alt="Poster de ${movie.title}" class="card__img" />
        </a>
      `).join('')}
    </div>
  `;
}
