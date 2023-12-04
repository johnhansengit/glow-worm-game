// const hamburgerBtn = document.getElementById('hamburger-btn');
// const navLinks = document.getElementById('hamburger-nav-links');
// const goToGameBtn = document.getElementById('go-to-game');
// const main = document.querySelector('main');
// const footer = document.querySelector('footer');
// const logo = document.getElementById('logo');


// // Hamburger Nav Menu Functionality
// hamburgerBtn.addEventListener('click', function () {
//     if (navLinks.style.opacity == '0' || navLinks.style.opacity == '') {
//         navLinks.style.opacity = '1';
//         console.log('Opacity 1');
//     } else {
//         navLinks.style.opacity = '0';
//         console.log('Opactiy 0');
//     }
// });

// Go To Game Button
const goToGameBtn = document.getElementById('go-to-game');

if (goToGameBtn) {
    goToGameBtn.addEventListener('click', function() {
        fadeOutPageTransition('game.html');
    });
}

logo.style.opacity = 1;
main.style.opacity = 1;
footer.style.opacity = 1;