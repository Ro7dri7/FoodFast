const carouselWrapper = document.querySelector('.carousel-wrapper');
const containerTestimonials = document.querySelector('.container-testimonials');
const testimonials = document.querySelectorAll('.testimonial');
const indicators = document.querySelectorAll('.carousel-indicators .indicator');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

let currentIndex = 0;
let autoSlideInterval = null;
const slideInterval = 5000; // 5 seconds

function updateCarousel() {
    // Calculate the translation based on the current index
    containerTestimonials.style.transform = `translateX(-${currentIndex * 33.333}%)`;
    // Update indicators
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
        indicator.setAttribute('aria-selected', index === currentIndex ? 'true' : 'false');
    });
    // Update accessibility for testimonials
    testimonials.forEach((testimonial, index) => {
        testimonial.setAttribute('aria-hidden', index !== currentIndex ? 'true' : 'false');
    });
}

function goToSlide(index) {
    currentIndex = (index + testimonials.length) % testimonials.length;
    updateCarousel();
    resetAutoSlide();
}

function nextSlide() {
    goToSlide(currentIndex + 1);
}

function prevSlide() {
    goToSlide(currentIndex - 1);
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, slideInterval);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Event listeners for navigation buttons
btnNext.addEventListener('click', nextSlide);
btnPrev.addEventListener('click', prevSlide);

// Event listeners for indicators
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => goToSlide(index));
    indicator.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            goToSlide(index);
        }
    });
});

// Event listeners for keyboard navigation on buttons
[btnPrev, btnNext].forEach(btn => {
    btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            btn.click();
        }
    });
});

// Touch/swipe support
let touchStartX = 0;
let touchEndX = 0;

carouselWrapper.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
});

carouselWrapper.addEventListener('touchmove', (e) => {
    touchEndX = e.touches[0].clientX;
});

carouselWrapper.addEventListener('touchend', () => {
    const swipeDistance = touchStartX - touchEndX;
    if (swipeDistance > 50) {
        nextSlide();
    } else if (swipeDistance < -50) {
        prevSlide();
    }
});

// Initialize carousel
testimonials.forEach((testimonial, index) => {
    testimonial.setAttribute('aria-hidden', index !== 0 ? 'true' : 'false');
});
indicators[0].setAttribute('aria-selected', 'true');
startAutoSlide();

// Pause auto-slide on hover
carouselWrapper.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
carouselWrapper.addEventListener('mouseleave', startAutoSlide);