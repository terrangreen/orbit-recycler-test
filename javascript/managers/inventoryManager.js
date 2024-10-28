// inventoryManager.js

import { getState, setState } from '../app/gameState.js';
import { showToastMessage } from '../app/toast.js';
import { showTooltip } from '../app/tooltip.js';
import { handleDragStart } from './dragManager.js';

export function updateStaticInventoryGrid(gridElement, items, selectFields = {}, limit, canDragAndDrop = false) {
    const defaultIcon = getState('defaultIcon');
    gridElement.innerHTML = '';

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
            square.innerHTML = '';
        }

        gridElement.appendChild(square);
    }

    lucide.createIcons();
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

export function addToStationInventory(item, quantity) {
    const stationInventory = getState('stationInventory');
    const stationInventoryLimit = getState('stationInventoryLimit');
    const currentItemCount = stationInventory.reduce((total, currentItem) => total + currentItem.quantity, 0);

    if (currentItemCount + quantity <= stationInventoryLimit) {
        const existingItem = stationInventory.find(stationItem => stationItem.name === item && stationItem.type === item.keyName);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            stationInventory.push({ ...item, quantity });
        }
        setState('stationInventory', stationInventory);
    } else {
        showToastMessage(`Not enough space in the station inventory to add ${quantity} of ${item.name}.`);
    }
}

// Remove items from the station inventory
export function removeFromStationInventory(item, quantity, keyName) {
    const stationInventory = getState('stationInventory');
    const itemIndex = stationInventory.findIndex(stationItem => stationItem.name === item && stationItem.type === keyName);

    if (itemIndex > -1) {
        if (stationInventory[itemIndex].quantity > quantity) {
            stationInventory[itemIndex].quantity -= quantity;
        } else {
            stationInventory.splice(itemIndex, 1);
        }
        setState('stationInventory', stationInventory);
    } else {
        console.error(`${item} (${keyName}) not found in station inventory.`);
    }
}

// Check available space
export function getAvailableStationSpace() {
    const stationInventory = getState('stationInventory');
    const stationInventoryLimit = getState('stationInventoryLimit');
    const currentItemCount = stationInventory.reduce((total, item) => total + item.quantity, 0);

    return stationInventoryLimit - currentItemCount;
}