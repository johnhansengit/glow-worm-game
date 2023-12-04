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