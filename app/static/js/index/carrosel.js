// script.js

// Funções de arrasto para o carrossel
const initializeCarouselDragging = (carousel) => {
  let isDragging = false;
  let startX;
  let scrollLeft;

  const startDragging = (e) => {
    isDragging = true;
    startX = (e.pageX || e.touches[0].pageX) - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
    carousel.style.cursor = 'grabbing';
  };

  const stopDragging = () => {
    isDragging = false;
    carousel.style.cursor = 'grab';
  };

  const handleDragging = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = (e.pageX || e.touches[0].pageX) - carousel.offsetLeft;
    const walk = (x - startX) * 1; // Ajusta a velocidade do arrasto
    carousel.scrollLeft = scrollLeft - walk;
  };

  carousel.addEventListener('mousedown', startDragging);
  carousel.addEventListener('touchstart', startDragging);
  carousel.addEventListener('mouseleave', stopDragging);
  carousel.addEventListener('mouseup', stopDragging);
  carousel.addEventListener('touchend', stopDragging);
  carousel.addEventListener('mousemove', handleDragging);
  carousel.addEventListener('touchmove', handleDragging);
};

// Função para detectar cliques e arrastes em links dentro do carrossel
const initializeCarouselLinks = () => {
  document.querySelectorAll('.carousel-item a').forEach(anchor => {
    let isDragging = false;

    anchor.addEventListener('mousedown', () => {
      isDragging = false;
    });

    anchor.addEventListener('mousemove', () => {
      isDragging = true;
    });

    anchor.addEventListener('mouseup', (event) => {
      if (isDragging) {
        event.preventDefault();
      }
    });

    anchor.addEventListener('click', (event) => {
      if (isDragging) {
        event.preventDefault();
      }
    });
  });
};

// Função para inicializar o arrasto de carrosséis com a classe 'carossel-Slide'
const initializeSlideCarousels = () => {
  document.querySelectorAll('.carossel-Slide').forEach(carousel => {
    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
      isDown = false;
    });

    carousel.addEventListener('mouseup', () => {
      isDown = false;
    });

    carousel.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 0.8; // Ajuste a velocidade aqui (0.8 é um exemplo)
      carousel.scrollLeft = scrollLeft - walk;

      // Verifica se chegou ao final do carrossel
      if (carousel.scrollLeft === 0 || carousel.scrollLeft === carousel.scrollWidth - carousel.clientWidth) {
        isDown = false; // Para o movimento se chegou ao final
      }
    });
  });
};

// Função para inicializar o carrossel triplo
const initializeTripleCarousel = () => {
  const carousel = document.querySelector('.carrosle-triplo-container');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const slides = document.querySelectorAll('.carousel-slide-triplo');
  const totalSlides = slides.length;
  let currentIndex = 0;
  let autoSlideInterval;
  let userInteracted = false;

  const showNextSlide = () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
  };

  const showPrevSlide = () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
  };

  const updateCarousel = () => {
    carousel.style.transform = `translateX(-${currentIndex * (100 / 3)}%)`;
  };

  const resetAutoSlide = () => {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(showNextSlide, userInteracted ? 7000 : 3000);
  };

  nextBtn.addEventListener('click', () => {
    showNextSlide();
    userInteracted = true;
    resetAutoSlide();
  });

  prevBtn.addEventListener('click', () => {
    showPrevSlide();
    userInteracted = true;
    resetAutoSlide();
  });

  // Iniciar o slide automático
  autoSlideInterval = setInterval(showNextSlide, 3000);

  // Adicionar funcionalidade de arrasto
  initializeCarouselDragging(carousel);
};

// Inicialização de todos os componentes
document.addEventListener('DOMContentLoaded', () => {
  initializeCarouselDragging(document.querySelector('.carousel'));
  initializeCarouselLinks();
  initializeSlideCarousels();
  initializeTripleCarousel();
});
