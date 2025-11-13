// ui/carousel.js – controle de carrossel (setas, teclado, inicialização segura)

export function initCarousel(root) {
  if (!root || root.dataset.carouselInit === '1') return;

  const track = root.querySelector('.carousel__track');
  const prev = root.querySelector('.carousel__btn--prev');
  const next = root.querySelector('.carousel__btn--next');
  if (!track) return;

  // acessibilidade
  track.setAttribute('role', 'list');
  track.setAttribute('aria-label', root.dataset.title || 'Carrossel');
  track.setAttribute('tabindex', '0');

  function cardWidth() {
    const card = track.querySelector('.card');
    return card ? card.getBoundingClientRect().width + 12 : 220;
  }

  function scrollByCard(dir) {
    track.scrollBy({ left: dir * cardWidth(), behavior: 'smooth' });
  }

  prev?.addEventListener('click', () => scrollByCard(-1));
  next?.addEventListener('click', () => scrollByCard(1));

  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); scrollByCard(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); scrollByCard(-1); }
  });

  root.dataset.carouselInit = '1';
}

// inicializa todos os carrosséis encontrados dentro de um escopo
export function initCarouselsIn(scope = document) {
  scope.querySelectorAll('.carousel').forEach(c => initCarousel(c));
}
