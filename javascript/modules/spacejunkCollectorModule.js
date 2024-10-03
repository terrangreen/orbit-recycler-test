// spacejunkCollectorModule.js

import { getState, incrementState, setState } from '../app/gameState.js';
import { updateSpacejunkDisplay } from '../managers/displayManager.js';
import { updateSpacejunkInventory } from '../managers/updateInventory.js';
import { possibleSpacejunk } from '../resources/spacejunkResourcesData.js';

export function loadSpacejunkCollector() {
    const collectButton = document.getElementById('collectSpacejunkBtn');
    if (collectButton) {
        collectSpacejunk();
    }
}

export function collectSpacejunk() {
    const rawJunkLimit =  getState('rawJunkLimit');
    const collectButton = document.getElementById('collectSpacejunkBtn');
 
    collectButton.addEventListener('click', () => {
        let spacejunkItems = getState('spacejunkItems');
        
        if (spacejunkItems.length < rawJunkLimit) {
            const newItem = possibleSpacejunk();
            
            const updatedSpacejunkItems = [...spacejunkItems, newItem];
            setState('spacejunkItems', updatedSpacejunkItems);

            spacejunkItems = getState('spacejunkItems');
            incrementState('money',newItem.value);
            
            updateSpacejunkInventory();
            updateSpacejunkDisplay();
        };
        updateCollectButtonState();
    });
}

export function updateCollectButtonState() {
    const collectButton = document.getElementById('collectSpacejunkBtn');
    const spacejunkItems = getState('spacejunkItems');
    const rawJunkLimit = getState('rawJunkLimit');
    const holdItems = getState('holdItems');

    const activeItemsCount = spacejunkItems.length - holdItems.length;  // Exclude items on hold

    if (activeItemsCount < rawJunkLimit) {
        collectButton.disabled = false;  // Re-enable the button if under the limit
    } else {
        collectButton.disabled = true;   // Disable the button if the limit is reached
    }
}