// inventoryManager.js

import { getState, setState } from '../app/gameState.js';
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
    const stationItems = getState('stationItems');
    const stationItemsLimit = getState('stationItemsLimit');
    const currentItemCount = stationItems.reduce((total, currentItem) => total + currentItem.quantity, 0);

    if (currentItemCount + quantity <= stationItemsLimit) {
        const existingItem = stationItems.find(stationItem => stationItem.name === item && stationItem.type === item.keyName);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            stationItems.push({ ...item, quantity });
        }
        setState('stationItems', stationItems);
    } else {
        console.error(`Not enough space in the station inventory to add ${quantity} of ${item}.`);
    }
}

// Add items to the station inventory
export function addToStationInventory2(item, quantity, keyName) {
    const stationItems = getState('stationItems');
    const stationItemsLimit = getState('stationItemsLimit');
    const currentItemCount = stationItems.reduce((total, currentItem) => total + currentItem.quantity, 0);

    if (currentItemCount + quantity <= stationItemsLimit) {
        const existingItem = stationItems.find(stationItem => stationItem.name === item && stationItem.type === keyName);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            stationItems.push({ name: item, quantity, keyName: keyName });
        }
        setState('stationItems', stationItems);
    } else {
        console.error(`Not enough space in the station inventory to add ${quantity} of ${item}.`);
    }
}

// Remove items from the station inventory
export function removeFromStationInventory(item, quantity, keyName) {
    const stationItems = getState('stationItems');
    const itemIndex = stationItems.findIndex(stationItem => stationItem.name === item && stationItem.type === keyName);

    if (itemIndex > -1) {
        if (stationItems[itemIndex].quantity > quantity) {
            stationItems[itemIndex].quantity -= quantity;
        } else {
            stationItems.splice(itemIndex, 1);
        }
        setState('stationItems', stationItems);
    } else {
        console.error(`${item} (${keyName}) not found in station inventory.`);
    }
}

// Check available space
export function getAvailableStationSpace() {
    const stationItems = getState('stationItems');
    const stationItemsLimit = getState('stationItemsLimit');
    const currentItemCount = stationItems.reduce((total, item) => total + item.quantity, 0);

    return stationItemsLimit - currentItemCount;
}