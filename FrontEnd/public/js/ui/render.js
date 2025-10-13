// ui/render.js - renderização de elementos
import { $, $$, el } from './dom.js';
import { initCarousel } from './carousel.js';
import { openModal } from './modal.js';
import { addToMyList, removeFromMyList, isInMyList, getMyList } from '../state.js';

export function renderHeader(userName, countFavoritos) {
  const header = $('.header');
  header.innerHTML = `
    <div class="header__inner container">
      <a class="logo" href="./index.html" aria-label="UTFlix Home"><span class="logo__mark">UT</span>Flix</a>
      <label class="header__search" aria-label="Buscar catálogo">
        <img class="icon" src="./assets/icons/search.svg" alt="" />
        <input id="searchInput" type="search" placeholder="Buscar por título ou gênero" aria-controls="searchResults" />
      </label>
      <div class="header__actions">
        <nav aria-label="Categorias">
          <a class="badge" href="#" data-filter="all">Tudo</a>
          <a class="badge" href="#" data-filter="movie">Filmes</a>
          <a class="badge" href="#" data-filter="series">Séries</a>
          <a class="badge" href="#" data-filter="fav">Favoritos (${countFavoritos})</a>
        </nav>
        <div class="profile-menu">
          <button class="profile-menu__btn" aria-haspopup="menu" aria-expanded="false">
            <img class="icon" src="./assets/icons/user.svg" alt="" /> ${userName || 'Guest'}
          </button>
          <div class="profile-menu__list" role="menu" aria-hidden="true">
            <button class="profile-menu__item" role="menuitem" id="logoutBtn">Sair</button>
          </div>
        </div>
      </div>
    </div>`;

  // Toggle menu
  const btn = $('.profile-menu__btn', header);
  const list = $('.profile-menu__list', header);
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    list.setAttribute('aria-hidden', String(expanded));
  });
}

export function renderHero(movie) {
  const hero = $('#hero');
  if (!movie) return hero.remove();
  hero.innerHTML = `
    <img class="hero__img" src="${movie.banner}" alt="Banner de ${movie.title}" />
    <div class="hero__overlay" aria-hidden="true"></div>
    <div class="hero__content">
      <h1 class="hero__title">${movie.title}</h1>
      <p>${movie.synopsis}</p>
      <div class="hero__actions">
        <button class="btn btn--primary" id="heroPlay"><img class="icon" src="./assets/icons/play.svg" alt="" /> Assistir</button>
        <a class="btn btn--ghost" href="/movie.html?id=${movie.id}">Mais infos</a>
      </div>
    </div>`;
  $('#heroPlay').addEventListener('click', () => openModal(movie.trailer || 'https://www.youtube.com/embed/dQw4w9WgXcQ'));
}

export function renderCarousel(title, items, containerId) {
  const container = $(containerId);
  container.innerHTML = '';
  const section = el('section', { class: 'section' }, [
    el('h2', { class: 'section__title' }, [title]),
    el('div', { class: 'carousel', tabindex: '0', 'data-title': title, role: 'region', 'aria-label': title }, [
      el('button', { class: 'carousel__btn carousel__btn--prev', 'aria-label': 'Anterior' }, [el('img', { class: 'icon', src: '/assets/icons/chevron-left.svg', alt: '' })]),
      el('div', { class: 'carousel__track' }, items.map(cardFor)),
      el('button', { class: 'carousel__btn carousel__btn--next', 'aria-label': 'Próximo' }, [el('img', { class: 'icon', src: '/assets/icons/chevron-right.svg', alt: '' })])
    ])
  ]);
  container.append(section);
  initCarousel(section.querySelector('.carousel'));
}

function cardFor(m) {
  const btnAdd = el('button', { class: 'icon-btn', title: isInMyList(m.id) ? 'Remover da Minha Lista' : 'Adicionar à Minha Lista' }, [
    el('img', { class: 'icon', src: '/assets/icons/plus.svg', alt: '' })
  ]);
  btnAdd.addEventListener('click', () => {
    const list = isInMyList(m.id) ? removeFromMyList(m.id) : addToMyList(m.id);
    btnAdd.title = isInMyList(m.id) ? 'Remover da Minha Lista' : 'Adicionar à Minha Lista';
    // Atualiza contador no header
    const favLink = document.querySelector('[data-filter="fav"]');
    favLink.textContent = `Favoritos (${list.length})`;
  });

  const btnPlay = el('button', { class: 'icon-btn', title: 'Assistir', onclick: () => openModal(m.trailer) }, [
    el('img', { class: 'icon', src: '/assets/icons/play.svg', alt: '' })
  ]);

  const a = el('a', { href: `/movie.html?id=${m.id}`, class: 'card', 'aria-label': `Abrir detalhes de ${m.title}` }, [
    el('img', { class: 'card__img', src: m.poster, alt: `Poster de ${m.title}` }),
    el('div', { class: 'card__meta' }, [
      el('div', { class: 'card__title' }, [m.title]),
      el('div', { class: 'card__actions' }, [btnPlay, btnAdd])
    ])
  ]);
  return a;
}

export function renderSearchResults(items) {
  const container = $('#searchResults');
  container.innerHTML = '';
  if (!items.length) {
    container.innerHTML = '<p role="status">Sem resultados</p>';
    return;
  }
  const grid = el('div', { class: 'carousel__track', style: 'grid-auto-flow: row; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));' }, items.map(cardFor));
  container.append(grid);
}

export function renderSimilar(items) {
  renderCarousel('Semelhantes', items, '#similar');
}
