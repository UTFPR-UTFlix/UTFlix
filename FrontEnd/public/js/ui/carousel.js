// ui/carousel.js - rolagem com teclado e botões
import { $, $$ } from './dom.js';

export function initCarousel(root) {
  const track = $('.carousel__track', root);
  const prev = $('.carousel__btn--prev', root);
  const next = $('.carousel__btn--next', root);

  function scrollByCard(dir) {
    const card = track.querySelector('.card');
    const delta = card ? (card.getBoundingClientRect().width + 12) : 220;
    track.scrollBy({ left: dir * delta, behavior: 'smooth' });
  }

  prev?.addEventListener('click', () => scrollByCard(-1));
  next?.addEventListener('click', () => scrollByCard(1));

  // Teclado dentro do carrossel
  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); scrollByCard(1); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); scrollByCard(-1); }
  });

  // Acessibilidade
  track.setAttribute('role', 'list');
  track.setAttribute('aria-label', root.dataset.title || 'Carrossel');
}
