const navMenu = document.querySelector('#hambMenu');
navMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    console.log('triggered')
})