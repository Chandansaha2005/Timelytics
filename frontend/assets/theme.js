// Theme toggler: sets CSS variables for light/dark and persists choice in localStorage
(function(){
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const stored = localStorage.getItem('timelytics:theme');
  const defaultTheme = stored || (prefersDark ? 'dark' : 'light');

  const themes = {
    light: {
      '--primary': '#1A73E8',
      '--accent-red': '#EA4335',
      '--accent-yellow': '#FBBC05',
      '--accent-green': '#34A853',
      '--surface': '#F1F3F4',
      '--text': '#202124',
      '--bg-gradient': 'linear-gradient(180deg,#EFF8FF 0%, #FFFFFF 40%, #F6FFF2 100%)',
      '--glass-bg': 'rgba(255,255,255,0.7)'
    },
    dark: {
      '--primary': '#8AB4F8',
      '--accent-red': '#FF8A80',
      '--accent-yellow': '#FFD166',
      '--accent-green': '#7EE787',
      '--surface': '#0F1724',
      '--text': '#E6EEF3',
      '--bg-gradient': 'linear-gradient(180deg,#071033 0%, #07111a 60%, #02120a 100%)',
      '--glass-bg': 'rgba(9,12,20,0.6)'
    }
  };

  function applyTheme(name){
    const root = document.documentElement;
    const map = themes[name] || themes.light;
    Object.keys(map).forEach(k => root.style.setProperty(k, map[k]));
    if(name === 'dark') root.classList.add('theme-dark'); else root.classList.remove('theme-dark');
    localStorage.setItem('timelytics:theme', name);
    // update toggle button icon if present
    const btn = document.getElementById('themeToggle');
    if(btn){
      btn.setAttribute('aria-pressed', name==='dark');
      const iconSun = btn.querySelector('.icon-sun');
      const iconMoon = btn.querySelector('.icon-moon');
      if(iconSun) iconSun.style.display = name==='light' ? 'inline-block' : 'none';
      if(iconMoon) iconMoon.style.display = name==='dark' ? 'inline-block' : 'none';
    }
  }

  function toggleTheme(){
    const cur = localStorage.getItem('timelytics:theme') || (prefersDark ? 'dark' : 'light');
    applyTheme(cur === 'dark' ? 'light' : 'dark');
  }

  // expose to window for manual toggling
  window.TimelyticsTheme = { applyTheme, toggleTheme };

  // apply default on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', ()=> applyTheme(defaultTheme));
})();
