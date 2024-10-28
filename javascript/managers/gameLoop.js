// gameLoop.js

import { saveStateToLocalStorage } from '../app/gameState.js';
import { showToastMessage } from '../app/toast.js';
import { updateLifeSupportResourcesDisplay } from './displayManager.js';
import { updateSpacejunkStorage } from './displayManager.js';
import { updateLifeSupportResources } from './lifeSupportManager.js';

let tickInterval;

export function startGameLoop() {
    // Update life support resources
    tickInterval = setInterval(() => {
       

        updateLifeSupportResources();
        updateLifeSupportResourcesDisplay();
        updateSpacejunkStorage();
    
        // Add more updates for automation here in the future
    }, 1000);
}

export function stopGameLoop() {
    clearInterval(tickInterval);
}

// Call this when the game starts or when you want to initiate auto-saving
export function startAutoSave() {
    setInterval(() => {
      saveStateToLocalStorage();
      showToastMessage('Game auto-saved', "success");
    }, 300000); // 300,000 milliseconds = 5 minutes
  }