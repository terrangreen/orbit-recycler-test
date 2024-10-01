// salvageManager.js

import { getState, removeFromStateArray, setState } from "../app/gameState.js";
import { updateDisplays } from "./displayManager.js";
import { handleDroppable } from "./dragHandler.js";
import { updateDynamicInventoryGrid, updateStaticInventoryGrid, displayItemDetails } from "./inventoryManager.js";
import { updateStationInventory } from "./updateInventory.js";

export function handleSalvageArea() {
    
    const salvageDropArea = document.getElementById('salvage-drop-area');
    handleDroppable(salvageDropArea, moveToSalvage);
}

export function moveToSalvage(target, item, itemIndex) {
    const defaultIcon = getState('defaultIcon');
    const spacejunkItems = getState('spacejunkItems');
    const salvageItems = getState('salvageItems');
    const holdItems = getState('holdItems');

    const salvageInventoryGrid = document.getElementById('salvage-inventory-grid');
    const salvageItemDetails = document.getElementById('salvage-item-details');

    // Add item ton the holdItems array
    holdItems.push(item);

    setState('holdItems', holdItems); // Save holdItems in the state

    // Add salvage parts to the salvage inventory
    item.parts.forEach(part => salvageItems.push(part));
    console.log('target:', target);
    console.log('item:', item);
    console.log('spacejunkItems.indexOf(item):', spacejunkItems.indexOf(item));
    console.log('salvageItems:', salvageItems);
    setState('salvageItems', salvageItems); // Save salvageItems in the state

    // Now use the passed itemIndex to directly reference the item in spacejunkItems
    const itemElement = document.querySelector(`#spacejunk-inventory-grid .inventory-square:nth-child(${itemIndex + 1})`);
    if (itemElement) {
        itemElement.classList.add('on-hold');
    }

    // Update the salvage drop area with the dropped item's icon and details
    target.innerHTML = `
        <i data-lucide="${item.iconType || defaultIcon}" class="icon white"></i>
    `;

    updateDynamicInventoryGrid(salvageInventoryGrid, salvageItems, (part) => displayItemDetails(salvageItemDetails, part)); // Update the salvage grid

    lucide.createIcons();
}

export function lootAllSalvageParts() {
    const salvageItems = getState('salvageItems');
    const stationItems = getState('stationItems') || [];

    // Move all salvage parts to station inventory
    salvageItems.forEach(part => { stationItems.push(part); });

    // Update the state and the UI
    setState('stationItems', stationItems);
    setState('salvageItems', []);
    updateStationInventory();

    // Remove the space junk item if all parts have been looted
    finalizeSalvageItem();
}

export function returnFromSalvageHold(item) {
    const spacejunkItems = getState('spacejunkItems');
    const holdItems = getState('holdItems');

    // Remove the "on-hold" class from the corresponding inventory square
    const itemIndex = spacejunkItems.indexOf(item);
    if (itemIndex > -1) {
        const itemElement = document.querySelector(`#spacejunk-inventory-grid .inventory-square:nth-child(${itemIndex + 1})`);
        if (itemElement) {
            itemElement.classList.remove('on-hold');  // Remove dimming class
        }
    }

    // Remove the item from holdItems
    removeFromStateArray('holdItems', item);

    // Update the displays to reflect the change
    updateDisplays();
}

// Function to render the "Return from Hold" button
export function renderReturnFromHoldButton(item) {
    const spacejunkItems = getState('spacejunkItems');
    const itemIndex = spacejunkItems.indexOf(item);

    if (itemIndex > -1) {
        const itemElement = document.querySelector(`#spacejunk-inventory-grid .inventory-square:nth-child(${itemIndex + 1})`);
        if (itemElement) {
            const returnButton = document.createElement('button');
            returnButton.textContent = 'Return';
            returnButton.classList.add('return-button');

            // Add event listener to return the item from hold
            returnButton.addEventListener('click', () => {
                returnFromHold(item);
            });

            // Append the button to the item element
            itemElement.appendChild(returnButton);
        }
    }
}

// Call this function when rendering the spacejunk inventory
// Render a button only for items that are on hold
function renderSpacejunkInventoryGrid() {
    const spacejunkItems = getState('spacejunkItems');
    spacejunkItems.forEach(item => {
        if (holdItems.includes(item)) {
            renderReturnFromHoldButton(item);  // Add return button if the item is on hold
        }
    });
}

// Function to remove an item from hold and restore it
export function returnFromHold(item) {
    const spacejunkItems = getState('spacejunkItems');
    const holdItems = getState('holdItems');

    // Remove the "on-hold" class from the corresponding inventory square
    const itemIndex = spacejunkItems.indexOf(item);
    if (itemIndex > -1) {
        const itemElement = document.querySelector(`#spacejunk-inventory-grid .inventory-square:nth-child(${itemIndex + 1})`);
        if (itemElement) {
            itemElement.classList.remove('on-hold');  // Remove dimming class
        }
    }

    // Remove the item from holdItems
    removeFromStateArray('holdItems', item);

    // Update the displays to reflect the change
    updateDisplays();
}

export function finalizeSalvageItem() {
    const holdItems = getState('holdItems');
    const spacejunkItems = getState('spacejunkItems');

    holdItems.forEach(item => {
        removeFromStateArray('spacejunkItems', item);
    });

    setState('holdItems', []);
    updateDisplays();
}