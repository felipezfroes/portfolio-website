/* =============================================
   GALERIA DOS ESTUDOS DE CASO
   Sem JavaScript, todas as imagens aparecem empilhadas.
   Com JavaScript, vira um carrossel controlado por botões,
   indicadores, setas do teclado (com foco na galeria) e swipe.
   Não há troca automática: o visitante controla a navegação.
============================================= */
const GALLERY_EN = document.documentElement.lang.toLowerCase().startsWith('en');

document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const slides = [...carousel.querySelectorAll('.carousel-slide')];
  if (slides.length < 2) return;

  const prev = carousel.querySelector('.carousel-btn.prev');
  const next = carousel.querySelector('.carousel-btn.next');
  const indicators = carousel.querySelector('.carousel-indicators');
  const counter = carousel.querySelector('.carousel-counter');
  let current = 0;
  let touchStartX = null;

  const dots = slides.map((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', GALLERY_EN
      ? `Show image ${i + 1} of ${slides.length}`
      : `Mostrar imagem ${i + 1} de ${slides.length}`);
    dot.addEventListener('click', () => show(i));
    indicators.appendChild(dot);
    return dot;
  });

  function show(index) {
    current = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      const active = i === current;
      slide.hidden = !active;
      slide.classList.toggle('is-active', active);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
      dot.setAttribute('aria-current', i === current ? 'true' : 'false');
    });

    if (counter) counter.textContent = `${current + 1} / ${slides.length}`;
  }

  prev.addEventListener('click', () => show(current - 1));
  next.addEventListener('click', () => show(current + 1));

  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      show(current - 1);
      e.preventDefault();
    } else if (e.key === 'ArrowRight') {
      show(current + 1);
      e.preventDefault();
    }
  });

  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) show(current + (diff > 0 ? 1 : -1));
    touchStartX = null;
  });

  carousel.classList.add('is-ready');
  show(0);
});
