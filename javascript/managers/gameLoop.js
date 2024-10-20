// gameLoop.js

import { getState, setState } from '../app/gameState.js';
import { updateLifeSupportResourcesDisplay } from './displayManager.js';
import { updateSpacejunkStorage } from './displayManager.js';
import { calculateCurrentLifeSupportResource } from './lifeSupportManager.js';

let tickInterval;

export function startGameLoop() {
    // Update life support resources
    tickInterval = setInterval(() => {
        const lifeSupportResources = getState('lifeSupportResources');
        Object.keys(lifeSupportResources).forEach(key => {
            const resource = lifeSupportResources[key];
            // Update the current resource amount based on the rate
            resource.current += resource.rate; // Ensure this doesn't go below 0
            resource.current = Math.max(resource.current, 0);
        });

        calculateCurrentLifeSupportResource();
        setState('lifeSupportResources', lifeSupportResources);
        updateLifeSupportResourcesDisplay();
    
        // Update space junk storage as needed
        updateSpacejunkStorage();
    
        // Add more updates for automation here in the future
    }, 1000);
}

export function stopGameLoop() {
    clearInterval(tickInterval);
}