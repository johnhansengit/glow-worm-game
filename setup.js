/*------------------------- CONSTANTS -------------------------*/

/*------------------------- STATE VARIABLES -------------------------*/

/*------------------------- CACHED ELEMENTS -------------------------*/

//Hamburger Nav Menu
const hamburgerBtn = document.getElementById('hamburger-btn');
const navLinks = document.getElementById('hamburger-nav-links');

/*------------------------- EVENT LISTENERS -------------------------*/

// Hamburger Nav Menu Functionality
hamburgerBtn.addEventListener('click', function() {
    navLinks.style.display = (navLinks.style.display == 'none') ? 'flex' : 'none';
});

/*------------------------- INIT FUNCTIONS -------------------------*/
