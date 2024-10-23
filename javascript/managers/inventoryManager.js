// inventoryManager.js

import { getState, setState } from '../app/gameState.js';
import { showTooltip } from '../app/tooltip.js';
import { handleDragStart } from './dragManager.js';

export function updateStaticInventoryGrid(gridElement, items, selectFields = {}, limit, canDragAndDrop = false) {
    const defaultIcon = getState('defaultIcon');
    gridElement.innerHTML = ''; // Clear current grid

    for (let i = 0; i < limit; i++) {
        const square = document.createElement('div');
        square.classList.add('inventory-square');

        const item = items[i];
        const squareId = item ? `inventory-square-${item.id}` : `inventory-square-empty-${i}`;
        square.id = squareId;
    
        if (item) {
            const fields = selectFields[i] || {};
            square.innerHTML = `<i data-lucide="${item.iconType || defaultIcon}" class="icon ${item.iconColor}"></i>`;

            showTooltip(square, item, fields);
            
            if (canDragAndDrop && !square.dragListenerAdded) {
                square.setAttribute('draggable', true);
                square.addEventListener('dragstart', (e) => handleDragStart(e, item));
                square.dragListenerAdded = true;
            }

            if (item.onHold) {
                square.classList.add('on-hold');
            }
        } else {
            square.innerHTML = ''; // Leave the square empty
        }

        gridElement.appendChild(square);
    }

    lucide.createIcons();  // Re-create icons after updating the grid
}

export function updateDynamicInventoryGrid(gridElement, items, selectFields = null, canDragAndDrop = false) {
    gridElement.innerHTML = '';

    items.forEach((part, index) => {
        const square = document.createElement('div');
        square.classList.add('inventory-square');
        square.innerHTML = `<i data-lucide="${part.iconType || defaultIcon}" class="icon ${part.iconColor}"></i>`;
        
        const fields = selectFields ? selectFields(part, index) : {};

        showTooltip(square, part, fields);

        if (canDragAndDrop) {
            square.setAttribute('draggable', true);
            square.addEventListener('dragstart', (e) => handleDragStart(e, part));
        }

        gridElement.appendChild(square);
    });

    lucide.createIcons();
}

// Add items to the station inventory
export function addToStationInventory(item, quantity, itemType) {
    const stationItems = getState('stationItems');
    const stationItemsLimit = getState('stationItemsLimit');
    const currentItemCount = stationItems.reduce((total, currentItem) => total + currentItem.quantity, 0);

    if (currentItemCount + quantity <= stationItemsLimit) {
        const existingItem = stationItems.find(stationItem => stationItem.name === item && stationItem.type === itemType);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            stationItems.push({ name: item, quantity, type: itemType });
        }
        setState('stationItems', stationItems);
    } else {
        console.error(`Not enough space in the station inventory to add ${quantity} of ${item}.`);
    }
}

export function addToStationInventoryNew(item, quantity, itemType) {
    const stationItems = getState('stationItems');
    const stationItemsLimit = getState('stationItemsLimit');
    const currentItemCount = stationItems.reduce((total, currentItem) => total + currentItem.quantity, 0);

    if (currentItemCount + quantity <= stationItemsLimit) {
        const existingItem = stationItems.find(stationItem => stationItem.name === item && stationItem.type === itemType);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            stationItems.push({ name: item, quantity, type: itemType });
        }
        setState('stationItems', stationItems);
    } else {
        console.error(`Not enough space in the station inventory to add ${quantity} of ${item}.`);
    }
}

// Remove items from the station inventory
export function removeFromStationInventory(item, quantity, itemType) {
    const stationItems = getState('stationItems');
    const itemIndex = stationItems.findIndex(stationItem => stationItem.name === item && stationItem.type === itemType);

    if (itemIndex > -1) {
        if (stationItems[itemIndex].quantity > quantity) {
            stationItems[itemIndex].quantity -= quantity;
        } else {
            stationItems.splice(itemIndex, 1);
        }
        setState('stationItems', stationItems);
    } else {
        console.error(`${item} (${itemType}) not found in station inventory.`);
    }
}

// Check available space
export function getAvailableStationSpace() {
    const stationItems = getState('stationItems');
    const stationItemsLimit = getState('stationItemsLimit');
    const currentItemCount = stationItems.reduce((total, item) => total + item.quantity, 0);

    return stationItemsLimit - currentItemCount;
}