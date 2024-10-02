// spacejunkCollectorModule.js

import { getState, incrementState, setState } from '../app/gameState.js';
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
        console.log('collectSpacejunk, spacejunkItems.length (before):', spacejunkItems.length);

        if (spacejunkItems.length < rawJunkLimit) {
            const newItem = possibleSpacejunk();
            
            console.log('collectSpacejunk, spacejunkItems.length (before, 2):',spacejunkItems.length);
            const updatedSpacejunkItems = [...spacejunkItems, newItem];
            setState('spacejunkItems', updatedSpacejunkItems);

            spacejunkItems = getState('spacejunkItems');
            console.log('collectSpacejunk, spacejunkItems.length (after):',spacejunkItems.length);
            incrementState('money',newItem.value);
            
            updateSpacejunkInventory();
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