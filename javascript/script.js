// script.js

import { enableCollapsibleSections } from './app/collapsible.js';
import { initializeModules } from './modules/initModules.js';
import { updateDisplays } from './managers/displayManager.js';
import { loadStateFromLocalStorage, resetGameState } from './app/gameState.js';
import { initializeEquipmentTabs } from './app/equipmentTabs.js';
import { adjustGameScreenPadding } from './app/adjustPadding.js';


document.addEventListener('DOMContentLoaded', function() {

  // Load saved game state
  loadStateFromLocalStorage();

  // Load content
  enableCollapsibleSections();
  initializeModules();
  initializeEquipmentTabs();
  updateDisplays();

  // Handle reset button
  const resetButton = document.getElementById('reset-game');
  if (resetButton) {
      resetButton.addEventListener('click', function() {
          resetGameState();  // Call the resetGameState function
      });
  }

  adjustGameScreenPadding();

});