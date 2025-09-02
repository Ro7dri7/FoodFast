const btnToggle = document.querySelector('.btn-toggle');
const mainNav = document.querySelector('.main-nav');
const iconBars = document.querySelector('.fa-bars');
const iconClose = document.querySelector('.fa-xmark');

btnToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.contains('show');
    mainNav.classList.toggle('show');
    iconBars.classList.toggle('active', !isOpen);
    iconClose.classList.toggle('active', isOpen);
    btnToggle.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 992) {
        mainNav.classList.remove('show');
        iconBars.classList.add('active');
        iconClose.classList.remove('active');
        btnToggle.setAttribute('aria-expanded', 'false');
    }
});

// Ensure accessibility with keyboard navigation
btnToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btnToggle.click();
    }
});