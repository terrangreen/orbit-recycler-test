// gameLoop.js

import { saveStateToLocalStorage } from '../app/gameState.js';
import { showToastMessage } from '../app/toast.js';
import { updateLifeSupportResources } from './lifeSupportManager.js';
import { updateSpacejunkStorage } from './displayManager.js';

let tickInterval;

export function startGameLoop() {
    // Update life support resources
    tickInterval = setInterval(() => {

        updateLifeSupportResources();
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
      autoSave();
    }, 300000); // 300,000 milliseconds = 5 minutes
}

export function autoSave() {
    saveStateToLocalStorage();
    showToastMessage('Game auto-saved', "success");
}