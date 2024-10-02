// salvageManager.js

import { getState, removeFromStateArray, setState } from "../app/gameState.js";
import { handleDroppable } from "./dragHandler.js";
import { updateSalvageInventory, updateSpacejunkInventory, updateStationInventory } from "./updateInventory.js";

export function handleSalvageArea() {
    const salvageDropArea = document.getElementById('salvage-drop-area');
    handleDroppable(salvageDropArea, moveToSalvage);
}

export function moveToSalvage(target, item) {
    const defaultIcon = getState('defaultIcon');
    const spacejunkItems = getState('spacejunkItems');
    const salvageItems = getState('salvageItems');
    const returnBtn = document.getElementById('salvageUndoBtn');
 
    // Mark item as on hold
    item.onHold = true;
 
    const updatedSpacejunkItems = spacejunkItems.map(spacejunk =>
        spacejunk.id === item.id ? { ...spacejunk, onHold: true } : spacejunk
    );
    setState('spacejunkItems', updatedSpacejunkItems);

    // Add salvage parts to the salvage inventory
    item.parts.forEach(part => salvageItems.push(part));
    setState('salvageItems', salvageItems);

    // Update the salvage drop area with the dropped item's icon and details
    target.innerHTML = `
        <i data-lucide="${item.iconType || defaultIcon}" class="icon white"></i>
    `;

    returnBtn.disabled = false;
    // Add event listener to return the item to spacejunkInventory
    returnBtn.addEventListener('click', () => {
        returnFromSalvageHold(item);
    });

    updateSalvageInventory();
    updateSpacejunkInventory();
    
    lucide.createIcons();
}

export function returnFromSalvageHold(item) {
    let spacejunkItems = getState('spacejunkItems');
    // let salvageItems = getState('salvageItems');
    const salvageDropArea = document.getElementById('salvage-drop-area');
    const salvageInventoryGrid = document.getElementById('salvage-inventory-grid');
    
    // Remove onHold status
    item.onHold = false;
    document.getElementById('salvageUndoBtn').disabled = true;

    spacejunkItems = spacejunkItems.map(spacejunkItem => 
        spacejunkItem.id === item.id ? { ...spacejunkItem, onHold: false } : spacejunkItem
    );
    setState('spacejunkItems', spacejunkItems);

    setState('salvageItems', []);

    // Update the displays to reflect the change
    salvageDropArea.innerHTML = '';

    updateSpacejunkInventory();
    updateSalvageInventory();
}

// Everything below doesn't matter bc the movetosalvage isn't working correctly!

// export function lootAllSalvageParts() {
//     const salvageItems = getState('salvageItems');
//     const stationItems = getState('stationItems') || [];

//     // Move all salvage parts to station inventory
//     salvageItems.forEach(part => { stationItems.push(part); });

//     // Update the state and the UI
//     setState('stationItems', stationItems);
//     setState('salvageItems', []);
//     // updateStationInventory();
//     updateDisplays();

//     // Remove the space junk item if all parts have been looted
//     finalizeSalvageItem();
// }

// // Function to render the "Return from Hold" button
// export function renderReturnFromHoldButton(item) {
//     const spacejunkItems = getState('spacejunkItems');
//     const itemIndex = spacejunkItems.indexOf(item);

//     if (itemIndex > -1) {
//         const itemElement = document.querySelector(`#spacejunk-inventory-grid .inventory-square:nth-child(${itemIndex + 1})`);
//         if (itemElement) {
//             const returnButton = document.createElement('button');
//             returnButton.textContent = 'Return';
//             returnButton.classList.add('return-button');

//             // Add event listener to return the item from hold
//             returnButton.addEventListener('click', () => {
//                 returnFromHold(item);
//             });

//             // Append the button to the item element
//             itemElement.appendChild(returnButton);
//         }
//     }
// }

// // Call this function when rendering the spacejunk inventory
// // Render a button only for items that are on hold
// function renderSpacejunkInventoryGrid() {
//     const spacejunkItems = getState('spacejunkItems');
//     spacejunkItems.forEach(item => {
//         if (holdItems.includes(item)) {
//             renderReturnFromHoldButton(item);  // Add return button if the item is on hold
//         }
//     });
// }

// export function finalizeSalvageItem() {
//     const spacejunkItems = getState('spacejunkItems');

//     spacejunkItems.forEach(item => {
//         if (item.onHold) {
//             removeFromStateArray('spacejunkItems', item);
//         }
//     });

//     updateDisplays();
// }