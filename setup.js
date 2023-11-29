/*------------------------- CONSTANTS -------------------------*/

/*------------------------- STATE VARIABLES -------------------------*/

/*------------------------- CACHED ELEMENTS -------------------------*/

//Hamburger Nav Menu
const hamburgerBtn = document.getElementById('hamburger-btn');
const navLinks = document.getElementById('hamburger-nav-links');

/*------------------------- EVENT LISTENERS -------------------------*/

// Hamburger Nav Menu Functionality
hamburgerBtn.addEventListener('click', function() {
    if(navLinks.style.opacity == '0' || navLinks.style.opacity == '') {
        navLinks.style.opacity = '1';
        navLinks.style.visibility = 'visible';
    } else {
        navLinks.style.opacity = '0';
        setTimeout(() => { navLinks.style.visibility = 'hidden'; }, 500);
    }
});


/*------------------------- INIT FUNCTIONS -------------------------*/
