// Theme-switch
const themeToggleBtn = document.querySelector('#theme-toggle');
const themeIcon = document.querySelector('#theme-icon');


function setTheme(isLight) {
    if (isLight) {
        document.body.classList.add('light-mode');
        themeIcon.textContent = '🌙';
        localStorage.setItem('theme','light');
    } else {
        document.body.classList.remove('light-mode');
        themeIcon.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    }
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const isLight = savedTheme === 'light';
    setTheme(isLight);
}

initTheme();

if (themeToggleBtn) {
     themeToggleBtn.addEventListener('click', () => {
    const isCurrentlyLight = document.body.classList.contains('light-mode');
    setTheme(!isCurrentlyLight);
 });
 
}