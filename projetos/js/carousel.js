document.querySelectorAll(".carousel").forEach(carousel => {

  const imagens = JSON.parse(carousel.dataset.images);
  let indexAtual = 0;
  let arrastando = false;
  let inicioX = 0;

  const img        = carousel.querySelector(".carousel-img");
  const btnNext    = carousel.querySelector(".next");
  const btnPrev    = carousel.querySelector(".prev");
  const indicators = carousel.querySelector(".carousel-indicators");

  // Cria indicadores
  imagens.forEach((_, i) => {
    const dot = document.createElement("span");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => irPara(i));
    indicators.appendChild(dot);
  });

  const dots = indicators.querySelectorAll("span");
  img.src = imagens[0];

  // Botões
  btnNext.addEventListener("click", () => mudar(1));
  btnPrev.addEventListener("click", () => mudar(-1));

  // Teclado — só ativa quando o carrossel está visível na tela
  document.addEventListener("keydown", (e) => {
    const rect = carousel.getBoundingClientRect();
    const visivel = rect.top < window.innerHeight && rect.bottom > 0;
    if (!visivel) return;
    if (e.key === "ArrowRight") mudar(1);
    if (e.key === "ArrowLeft")  mudar(-1);
  });

  // Swipe mobile
  carousel.addEventListener("touchstart", (e) => {
    inicioX = e.touches[0].clientX;
    arrastando = true;
  }, { passive: true });

  carousel.addEventListener("touchend", (e) => {
    if (!arrastando) return;
    const diff = inicioX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) mudar(diff > 0 ? 1 : -1);
    arrastando = false;
  });

  // Auto-play a cada 5s — pausa no hover
  let autoPlay = setInterval(() => mudar(1), 5000);

  carousel.addEventListener("mouseenter", () => clearInterval(autoPlay));
  carousel.addEventListener("mouseleave", () => {
    autoPlay = setInterval(() => mudar(1), 5000);
  });

  function mudar(direcao) {
    irPara((indexAtual + direcao + imagens.length) % imagens.length);
  }

  function irPara(index) {
    indexAtual = index;

    img.style.opacity = "0";
    img.style.transform = "scale(0.97)";

    setTimeout(() => {
      img.src = imagens[indexAtual];
      img.style.opacity = "1";
      img.style.transform = "scale(1)";
      dots.forEach(d => d.classList.remove("active"));
      dots[indexAtual].classList.add("active");
    }, 220);
  }
});