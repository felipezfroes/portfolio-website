document.querySelectorAll(".carousel").forEach(carousel => {

    const imagens = JSON.parse(carousel.dataset.images);
    let indexAtual = 0;

    const img = carousel.querySelector(".carousel-img");
    const btnNext = carousel.querySelector(".next");
    const btnPrev = carousel.querySelector(".prev");
    const indicatorsContainer = carousel.querySelector(".carousel-indicators");

    // Cria os indicadores
    imagens.forEach((_, index) => {
        const dot = document.createElement("span");
        if (index === 0) dot.classList.add("active");

        dot.addEventListener("click", () => {
            indexAtual = index;
            atualizarCarousel();
        });

        indicatorsContainer.appendChild(dot);
    });

    const dots = indicatorsContainer.querySelectorAll("span");

    img.src = imagens[0];

    btnNext.addEventListener("click", () => mudarImagem(1));
    btnPrev.addEventListener("click", () => mudarImagem(-1));

    function mudarImagem(direcao) {
        indexAtual = (indexAtual + direcao + imagens.length) % imagens.length;
        atualizarCarousel();
    }

    function atualizarCarousel() {
        img.style.opacity = 0;

        setTimeout(() => {
            img.src = imagens[indexAtual];
            img.style.opacity = 1;

            dots.forEach(dot => dot.classList.remove("active"));
            dots[indexAtual].classList.add("active");
        }, 200);
    }
});
