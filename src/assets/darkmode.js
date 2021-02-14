function applyDarkmode() {
  const theme = localStorage.getItem('theme');
  const html = document.getElementsByTagName('html')[0];

  if(theme == 'dark') {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
}

function toggleDarkmode() {
  const theme = localStorage.getItem('theme');

  if(theme == 'dark') {
    localStorage.removeItem('theme');
  } else {
    localStorage.setItem('theme', 'dark');
  }

  applyDarkmode();
}

applyDarkmode();

const toggleButtons = document.querySelectorAll('button.toggle-darkmode')
for(const toggleButton of toggleButtons) {
  toggleButton.onclick = toggleDarkmode;
}
