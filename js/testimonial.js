//Constante DOM
const containerTestimonials = document.querySelector('.container-testimonials');
const allCardTestimonials = document.querySelectorAll('.testimonial'); //arreglo
const prevBtn = document.querySelector('.btn-prev');
const nextBtn = document.querySelector('.btn-next');
//Constantes
const totalCardTestimonials = allCardTestimonials.length;

//Variables
let currentIndex = 0;
let autoPlayInterval;

//funcion para actualizar posicion del carrusel
const updateCarousel = () =>{
    const offset = currentIndex * containerTestimonials.clientWidth;
    containerTestimonials.scrollTo({
        left: offset,
        behavior: 'smooth'
    })
}

//Boton siguientes - evento click
nextBtn.addEventListener('click', () => {
    //Si llego al final, vuelve al principio

    //* (0 +1) % 3 -> 1 % 3 -> 1
    //* (1 +1) % 3 -> 2 % 3 -> 2
    //* (2 +1) % 3 -> 3 % 3 -> 0
    
    currentIndex = (currentIndex + 1) % totalCardTestimonials;
    updateCarousel();
    resetAutoPlay();
});

prevBtn.addEventListener('click', () => {
    //Si esta al principio, vuelve al final

    //* Indice va a ser 1
    //* currentIndex = (1 - 1 +3) % 3 = 0
    //* currentIndex = 0
    //* currentIndex = (0 - 1 +3) % 3 = 2

    currentIndex = (currentIndex - 1 + totalCardTestimonials) % totalCardTestimonials;
    updateCarousel();
    resetAutoPlay();
});

//funcion para activar el autoplay cada 5 segundos
function startAutoPlay(){
    autoPlayInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalCardTestimonials;
        updateCarousel();
    }, 5000);
}

//reiniciar autoplay cuando se navega manualmente
function resetAutoPlay(){
    clearInterval(autoPlayInterval);
    startAutoPlay();
}

//Iniciar autoplay
startAutoPlay();
