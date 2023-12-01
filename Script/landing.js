// Hamburger Nav Menu
const hamburgerBtn = document.getElementById('hamburger-btn');
const navLinks = document.getElementById('hamburger-nav-links');
const goToGameBtn = document.getElementById('go-to-game');

// Hamburger Nav Menu Functionality
hamburgerBtn.addEventListener('click', function () {
    if (navLinks.style.opacity == '0' || navLinks.style.opacity == '') {
        navLinks.style.opacity = '1';
        navLinks.style.visibility = 'visible';
    } else {
        navLinks.style.opacity = '0';
        setTimeout(() => { navLinks.style.visibility = 'hidden'; }, 500);
    }
});

// Go To Game Button
if (goToGameBtn) {
    goToGameBtn.addEventListener('click', function () {
        window.location.href = 'game.html';
    });
}