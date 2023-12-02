const hamburgerBtn = document.getElementById('hamburger-btn');
const navLinks = document.getElementById('hamburger-nav-links');
const goToGameBtn = document.getElementById('go-to-game');
const main = document.querySelector('main');
const footer = document.querySelector('footer');
const logo = document.getElementById('logo');


// Hamburger Nav Menu Functionality
hamburgerBtn.addEventListener('click', function () {
    if (navLinks.style.opacity == '0' || navLinks.style.opacity == '') {
        navLinks.style.opacity = '1';
    } else {
        navLinks.style.opacity = '0';
    }
});

// Go To Game Button
if (goToGameBtn) {
    goToGameBtn.addEventListener('click', function () {
        main.style.opacity = 0;
        footer.style.opacity = 0;
        logo.style.opacity = 0;
        setTimeout(function() {
            window.location.href = 'game.html';
        }, 500);
    });
}