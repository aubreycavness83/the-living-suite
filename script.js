const heroTrack = document.querySelector(".hero-carousel__track");
const heroSlides = Array.from(
  document.querySelectorAll(".hero-carousel__slide"),
);
const heroPrevBtn = document.querySelector(".hero-carousel__btn--prev");
const heroNextBtn = document.querySelector(".hero-carousel__btn--next");
const heroDots = Array.from(document.querySelectorAll(".hero-carousel__dot"));

let heroIndex = 0;

function renderHeroCarousel() {
  const offset = heroIndex * 100;
  heroTrack.style.transform = `translateX(-${offset}%)`;

  heroDots.forEach((dot, i) => {
    dot.classList.toggle("hero-carousel__dot--active", i === heroIndex);
  });
}

function goToNextHero() {
  heroIndex = (heroIndex + 1) % heroSlides.length;
  renderHeroCarousel();
}

function goToPrevHero() {
  heroIndex = (heroIndex - 1 + heroSlides.length) % heroSlides.length;
  renderHeroCarousel();
}

heroNextBtn.addEventListener("click", goToNextHero);
heroPrevBtn.addEventListener("click", goToPrevHero);

heroDots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    heroIndex = i;
    renderHeroCarousel();
  });
});

renderHeroCarousel();

let heroAutoPlayId = setInterval(goToNextHero, 5000);

const productTrack = document.querySelector(".product-slider__track");
const productCards = Array.from(document.querySelectorAll(".product-card"));
const productPrevBtn = document.querySelector(".product-slider__btn--prev");
const productNextBtn = document.querySelector(".product-slider__btn--next");

let productIndex = 0;

function getProductStepPx() {
  const firstCard = productCards[0];
  const cardWidth = firstCard.getBoundingClientRect().width;

  const trackStyles = window.getComputedStyle(productTrack);
  const gap = parseFloat(trackStyles.gap) || 0;

  return cardWidth + gap;
}

function renderProductSlider() {
  const step = getProductStepPx();
  const offsetPx = productIndex * step;

  productTrack.style.transform = `translateX(-${offsetPx}px)`;
}

function getMaxProductIndex() {
  const visibleCount = 4;
  return Math.max(0, productCards.length - visibleCount);
}

function goToNextProducts() {
  const maxIndex = getMaxProductIndex();
  productIndex = Math.min(productIndex + 1, maxIndex);
  renderProductSlider();
}

function goToPrevProducts() {
  productIndex = Math.max(productIndex - 1, 0);
  renderProductSlider();
}

productNextBtn.addEventListener("click", goToNextProducts);
productPrevBtn.addEventListener("click", goToPrevProducts);

renderProductSlider();

window.addEventListener("resize", renderProductSlider);

// Financing Section - Random Image
function setRandomFinancingImage() {
  const productImages = Array.from(
    document.querySelectorAll(".product-card__img"),
  ).map((img) => img.src);

  if (productImages.length > 0) {
    const randomIndex = Math.floor(Math.random() * productImages.length);
    const randomImage = productImages[randomIndex];
    const financingImage = document.getElementById("financing-random-image");

    if (financingImage) {
      financingImage.src = randomImage;
    }
  }
}

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.getElementById("close-btn");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const triggers = document.querySelectorAll(".lightbox-trigger");

let currentIndex = 0;

function updateLightbox(index) {
  const selectedImage = triggers[index];
  lightboxImg.src = selectedImage.src;
}

triggers.forEach((image, index) => {
  image.addEventListener("click", () => {
    currentIndex = index;
    lightbox.style.display = "flex";
    updateLightbox(index);
  });
});

nextBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  e.preventDefault();
  currentIndex = (currentIndex + 1) % triggers.length;
  updateLightbox(currentIndex);
});

prevBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  e.preventDefault();
  currentIndex = (currentIndex - 1 + triggers.length) % triggers.length;
  updateLightbox(currentIndex);
});

closeBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  lightbox.style.display = "none";
});

lightbox.addEventListener("click", (e) => {
  // Close when clicking on the dark background, but not on buttons or the image
  if (
    e.target === lightbox ||
    (e.target !== nextBtn &&
      e.target !== prevBtn &&
      e.target !== lightboxImg &&
      e.target !== closeBtn &&
      !nextBtn.contains(e.target) &&
      !prevBtn.contains(e.target))
  ) {
    lightbox.style.display = "none";
  }
});
