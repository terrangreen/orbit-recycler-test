// adjustPadding.js

export function adjustGameScreenPadding() {
    const gameHeader = document.getElementById('fixed-header');
    const gameScreen = document.getElementById('game_screen');
  
    function adjustPadding() {
      const headerHeight = gameHeader.offsetHeight;
      document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
      gameScreen.style.paddingTop = `${headerHeight}px`;
  
      const availableHeight = window.innerHeight - headerHeight;
      // gameScreen.style.maxHeight = `${availableHeight}px`;
    }
  
    adjustPadding();
    window.addEventListener('resize', adjustPadding);
  }
  