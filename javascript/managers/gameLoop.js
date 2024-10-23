// gameLoop.js

import { getState, setState } from '../app/gameState.js';
import { updateLifeSupportResourcesDisplay } from './displayManager.js';
import { updateSpacejunkStorage } from './displayManager.js';
import { calculateCurrentLifeSupportResource, updateLifeSupportResources } from './lifeSupportManager.js';

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