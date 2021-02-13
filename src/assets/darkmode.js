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
