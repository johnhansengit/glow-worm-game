// Hamburger Nav Menu Functionality
const hamburgerBtn = document.getElementById('hamburger-btn');
const navLinks = document.getElementById('hamburger-nav-links');

hamburgerBtn.addEventListener('click', function () {
    if (navLinks.style.opacity == '0' || navLinks.style.opacity == '') {
        navLinks.style.opacity = '1';
    } else {
        navLinks.style.opacity = '0';
    }
});

// Fade out functionality
const main = document.querySelector('main');
const footer = document.querySelector('footer');
const logo = document.getElementById('logo');


function fadeOutPageTransition(destination) {
    if (main) main.style.opacity = 0;
    if (footer) footer.style.opacity = 0;
    if (logo) logo.style.opacity = 0;

    setTimeout(function() {
        window.location.href = destination;
    }, 500); // 500ms for the transition to complete
}

document.querySelectorAll('#menu-bar a, #hamburger-nav-links a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        var destination = this.getAttribute('href');
        fadeOutPageTransition(destination); 
    });
});