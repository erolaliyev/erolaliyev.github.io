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

const checkbox = document.querySelector('input[type=checkbox]');
const body = document.getElementsByTagName('body')[0];
const hr = document.getElementsByTagName('hr');

const saveToLocalStorage = (key, value) => {
  let now = new Date();
  now = now.getTime();
  localStorage.setItem(key, value);
  localStorage.setItem(key + '-last-change', now);
};

checkbox.addEventListener('change', function() {
  if (body.classList[0] === 'dark-theme') {
    enableTheme('light');
    saveToLocalStorage('preference-theme', 'light');
  } else {
    enableTheme('dark');
    saveToLocalStorage('preference-theme', 'dark');
  }
  console.log('change');
});

const enableTheme = color => {
  if (color === 'light' && body.classList[0] !== 'light-theme') {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    hr[0].classList.remove('hr-dark');
    hr[0].classList.add('hr-light');
    hr[1].classList.remove('hr-dark');
    hr[1].classList.add('hr-light');
  } else if (color === 'dark' && body.classList[0] !== 'dark-theme') {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    hr[0].classList.remove('hr-light');
    hr[0].classList.add('hr-dark');
    hr[1].classList.remove('hr-light');
    hr[1].classList.add('hr-dark');
  }
  console.log(color);
};

const listenToOSChanges = () => {
  let mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQueryList.addListener(m => {
    if (m.matches === true) {
      enableTheme('dark');
    } else {
      enableTheme('light');
    }
  });
};

const returnThemeBasedOnLocalStorage = () => {
  const pref = localStorage.getItem('preference-theme');
  const lastChanged = localStorage.getItem('preference-theme-last-change');
  let now = new Date();
  now = now.getTime();
  const minutesPassed = (now - lastChanged) / (1000 * 60);

  if (minutesPassed < 120 && pref === 'light') return 'light';
  else if (minutesPassed < 120 && pref === 'dark') return 'dark';
  else return undefined;
};

const returnThemeBasedOnOS = () => {
  let pref = window.matchMedia('(prefers-color-scheme: light)');
  if (pref.matches) return 'light';
};

const returnThemeBasedOnTime = () => {
  let date = new Date();
  const hour = date.getHours();
  if (hour > 19 || hour < 5) return 'dark';
};

(function initializeTheme() {
  listenToOSChanges();
  enableTheme(
    returnThemeBasedOnLocalStorage() ||
      returnThemeBasedOnOS() ||
      returnThemeBasedOnTime()
  );
})();
