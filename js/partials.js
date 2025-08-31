/* ******************************** */
/*              HEADER              */
/* ******************************** */
const btnToggleResponsive =document.querySelector('.btn-toggle');
const menuResponsive = document.querySelector('.menu-responsive');
const header = document.querySelector('header');

btnToggleResponsive.addEventListener('click', () =>{
    const iconBars = document.querySelector('.fa-bars');
    const iconClose = document.querySelector('.fa-xmark');

    //activar el menu responsive
    if(iconBars.classList.contains('active')){
        iconBars.classList.remove('active');
        iconClose.classList.add('active');
        menuResponsive.classList.add('show');
        menuResponsive.style.top = `${header.clientHeight}px`;
    }
    //cerrar el menu responsive
    else{
        iconBars.classList.add('active');
        iconClose.classList.remove('active');
        menuResponsive.classList.remove('show');
    }
})

//forzar cierre de menu-responsive a pesar de no haber hecho click en "x"
window.addEventListener('resize', () => {
    const iconBars = document.querySelector('.fa-bars');
    const iconClose = document.querySelector('.fa-xmark');

    if (window.innerWidth > 922) {
        // restablecer menú
        menuResponsive.classList.remove('show');
        iconBars.classList.add('active');
        iconClose.classList.remove('active');
    }
});