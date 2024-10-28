// script.js

import { enableCollapsibleSections } from './app/collapsible.js';
import { initializeModules } from './modules/initModules.js';
import { updateDisplays } from './managers/displayManager.js';
import { loadStateFromLocalStorage, resetGameState } from './app/gameState.js';
import { adjustGameScreenPadding } from './app/adjustPadding.js';
import { startAutoSave, startGameLoop } from './managers/gameLoop.js';
import { setupButtonHandlers } from './managers/timeManager.js';


document.addEventListener('DOMContentLoaded', function() {

  // Load saved game state
  loadStateFromLocalStorage();
  startAutoSave();

  // Load content
  enableCollapsibleSections();
  initializeModules();
  updateDisplays();

  // Start the game loop tick
  startGameLoop();
  setupButtonHandlers();
  

  adjustGameScreenPadding();

});