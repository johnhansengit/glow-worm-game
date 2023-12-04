// Go To Game Button
const goToGameBtn = document.getElementById('go-to-game');

if (goToGameBtn) {
    goToGameBtn.addEventListener('click', function() {
        fadeOutPageTransition('game.html');
    });
}

// Fade-in page content
logo.style.opacity = 1;
main.style.opacity = 1;
footer.style.opacity = 1;

// Automatic year update in footer
const thisYear = new Date().getFullYear()

footer.innerHTML = `a <a href="https://johnhansen.io/" alt="johnhansen.io" target="_blank">john hansen</a> creation © ${thisYear}`;