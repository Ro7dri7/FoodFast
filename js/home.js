const containerTabs = document.querySelectorAll('.tab');
const allContainerDishes = document.querySelectorAll('.container-dishes');

containerTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
        const tabName = e.target.dataset.name;

        containerTabs.forEach(t => {
            t.classList.remove('active');
            t.setAttribute('aria-selected', 'false');
        });
        e.target.classList.add('active');
        e.target.setAttribute('aria-selected', 'true');

        allContainerDishes.forEach(container => {
            const dishName = container.dataset.name;
            container.classList.toggle('active', tabName === dishName);
        });
    });

    tab.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.target.click();
        }
    });
});

const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputs = contactForm.querySelectorAll('input, select');
    let isValid = true;

    inputs.forEach(input => {
        const errorMessage = input.nextElementSibling;
        if (!input.value.trim()) {
            errorMessage.textContent = 'Este campo es obligatorio';
            isValid = false;
        } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
            errorMessage.textContent = 'Por favor, ingrese un correo válido';
            isValid = false;
        } else {
            errorMessage.textContent = '';
        }
    });

    if (isValid) {
        contactForm.querySelector('.success-message').textContent = '¡Reserva enviada con éxito!';
        contactForm.reset();
        setTimeout(() => {
            contactForm.querySelector('.success-message').textContent = '';
        }, 3000);
    }
});