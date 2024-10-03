// salvageManager.js

import { getState, removeFromStateArray, setState } from "../app/gameState.js";
import { handleDroppable } from "./dragHandler.js";
import { updateSalvageInventory, updateSpacejunkInventory, updateStationInventory } from "./updateInventory.js";

export function handleSalvageArea() {
    const salvageDropArea = document.getElementById('salvage-drop-area');
    handleDroppable(salvageDropArea, moveToSalvage);
}

export function handleSalveToStation() {
    const stationInventoryGrid = document.getElementById('station-inventory-grid');
    handleDroppable(stationInventoryGrid, moveSalvagePartToStation);
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

export function getAvailableSpace(part) {
    const maxStationCapacity = getState('stationItemsLimit');  // Maximum capacity of the station
    const stationItems = getState('stationItems');
    const currentItemCount = stationItems.reduce((count, item) => count + item.quantity, 0);  // Total items in station
    const availableSpace = maxStationCapacity - currentItemCount;

    // Return the number of parts that can be moved, which is the minimum between available space and part quantity
    return Math.min(part.quantity, availableSpace);
}

export function moveSalvagePartToStation(target, part) {
    let salvageItems = getState('salvageItems');
    let stationItems = getState('stationItems') || [];

    // Get available space in the station inventory
    const availableSpace = getAvailableSpace(part);

    if (availableSpace > 0) {
        const moveQuantity = Math.min(part.quantity, availableSpace);
        // If space is available, reduce the part quantity in salvage and add to station

        // Update the quantity in the salvage inventory
        salvageItems = salvageItems.map(salvagePart => {
            if (salvagePart.id === part.id) {
                salvagePart.quantity -= moveQuantity;  // Reduce the quantity
                if (salvagePart.quantity <= 0) {
                    return null;  // Remove part if quantity is 0
                }
            }
            return salvagePart;
        }).filter(salvagePart => salvagePart !== null);  // Remove parts with 0 quantity

        // Add the part (or increase the quantity) in the station inventory
        const existingStationPart = stationItems.find(item => item.id === part.id);
        if (existingStationPart) {
            existingStationPart.quantity += moveQuantity;
        } else {
            // If it's a new part for the station, add it
            stationItems.push({ ...part, quantity: moveQuantity });
        }

        // Update both salvage and station inventories in the state
        setState('salvageItems', salvageItems);
        setState('stationItems', stationItems);

        // Re-render the inventory grids
        updateSalvageInventory();
        updateStationInventory();
    } else {
        alert('Inventory full');
    }
}


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
//

// export function finalizeSalvageItem() {
//     const spacejunkItems = getState('spacejunkItems');

//     spacejunkItems.forEach(item => {
//         if (item.onHold) {
//             removeFromStateArray('spacejunkItems', item);
//         }
//     });

//     updateDisplays();
// }