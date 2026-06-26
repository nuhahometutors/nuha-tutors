(function () {
  'use strict';

  var theme = {
    primary: '#2d4a6e',
    primaryLight: '#4a6fa5',
    accent: '#e07a5f',
    accentHover: '#c96850',
    borderBlue: '#9bb8d9',
    bgLight: '#eef4fa',
    textDark: '#1a2332',
    textBody: '#3d4f5f',
    footerBg: '#1a2332',
    starActive: '#e07a5f',
    starMuted: '#d0d8e0'
  };

  var root = document.documentElement;
  root.style.setProperty('--primary', theme.primary);
  root.style.setProperty('--primary-light', theme.primaryLight);
  root.style.setProperty('--accent', theme.accent);
  root.style.setProperty('--accent-hover', theme.accentHover);
  root.style.setProperty('--border-blue', theme.borderBlue);
  root.style.setProperty('--bg-light', theme.bgLight);
  root.style.setProperty('--text-dark', theme.textDark);
  root.style.setProperty('--text-body', theme.textBody);
  root.style.setProperty('--footer-bg', theme.footerBg);

  window.NuhaTheme = theme;
})();
