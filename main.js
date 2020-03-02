// Hamburger menu in mobile views

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

// Dark theme

(function initializeTheme() {
  syncBetweenTabs();
  listenToOSChanges();
  enableTheme(
    returnThemeBasedOnLocalStorage() ||
      returnThemeBasedOnOS() ||
      returnThemeBasedOnTime(),
    false
  );
})();

function returnThemeBasedOnLocalStorage() {
  const pref = localStorage.getItem('preference-theme');
  const lastChanged = localStorage.getItem('preference-theme-last-change');
  let now = new Date();
  now = now.getTime();
  const minutesPassed = (now - lastChanged) / (1000 * 60);

  if (minutesPassed < 120 && pref === 'light') return 'light';
  else if (minutesPassed < 120 && pref === 'dark') return 'dark';
  else return undefined;
}

function syncBetweenTabs() {
  window.addEventListener('storage', e => {
    if (e.key === 'preference-theme') {
      if (e.newValue === 'light') enableTheme('light');
      else if (e.newValue === 'dark') enableTheme('dark');
    }
  });
}

function returnThemeBasedOnOS() {
  let pref = window.matchMedia('(prefers-color-scheme: dark)');
  if (pref.matches) return 'dark';
  else {
    pref = window.matchMedia('(prefers-color-scheme: light)');
    if (pref.matches) return 'light';
    else return undefined;
  }
}

function returnThemeBasedOnTime() {
  let date = new Date();
  const hour = date.getHours();
  if (hour > 20 || hour < 5) return 'dark';
  else return 'light';
}
