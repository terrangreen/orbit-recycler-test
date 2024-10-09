// script.js

import { enableCollapsibleSections } from './app/collapsible.js';
import { initializeModules } from './modules/initModules.js';
import { updateDisplays } from './managers/displayManager.js';
import { loadStateFromLocalStorage, resetGameState } from './app/gameState.js';


document.addEventListener('DOMContentLoaded', function() {

  // Load saved game state
  loadStateFromLocalStorage();

  // Load content
  enableCollapsibleSections();
  initializeModules();
  updateDisplays();

  // Handle reset button
  const resetButton = document.getElementById('reset-game');
  if (resetButton) {
      resetButton.addEventListener('click', function() {
          resetGameState();  // Call the resetGameState function
      });
  }

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

});