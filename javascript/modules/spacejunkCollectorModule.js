// spacejunkCollectorModule.js

import { getState, incrementState } from '../app/gameState.js';
import { getRandomSalvageParts, getRandomSpacejunkItemOwner, getRandomSpacejunkItemType, getRandomSpacejunkItemValue } from '../app/randomGenerator.js';
import { updateSpacejunkInventory } from '../managers/updateInventory.js';

export function loadSpacejunkCollector() {
    const collectButton = document.getElementById('collectSpacejunkBtn');
    if (collectButton) {
        collectSpacejunk();
    }
}

export function collectSpacejunk() {
    const rawJunkLimit =  getState('rawJunkLimit');
    const spacejunkItems =  getState('spacejunkItems');

    const collectButton = document.getElementById('collectSpacejunkBtn');
 
    collectButton.addEventListener('click', () => {
        if (spacejunkItems.length < rawJunkLimit) {
            const newItem = {
                type: getRandomSpacejunkItemType(),
                iconType: 'satellite',
                owner: getRandomSpacejunkItemOwner(),
                value: getRandomSpacejunkItemValue(),
                parts: getRandomSalvageParts()
            };
            
            spacejunkItems.push(newItem);
            console.log('spacejunkItems.length:',spacejunkItems.length);
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