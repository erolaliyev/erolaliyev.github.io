const menu = document.getElementById('mobile-menu');
const nav = document.getElementsByTagName('nav');
const navLink = document.getElementsByClassName('nav-link');

const toggleMenu = () => {
  nav[0].classList.toggle('nav-menu');
  menu.classList.toggle('active');
};

menu.addEventListener('click', toggleMenu);

for (i = 0; i < navLink.length; i++) {
  navLink[i].addEventListener('click', function() {
    toggleMenu();
  });
}
