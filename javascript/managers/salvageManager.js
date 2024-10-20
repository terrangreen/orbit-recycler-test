// salvageManager.js

import { getState, setState } from "../app/gameState.js";
import { updateSpacejunkDisplay, updateStationStorage } from "./displayManager.js";
import { handleDroppable } from "./dragManager.js";
import { calculateMaterialsStorage, gatherMaterial } from "./materialsManager.js";
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
        <i data-lucide="${item.iconType || defaultIcon}" class="icon ${item.iconColor}"></i>
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

    updateStationStorage();

    // Return the number of parts that can be moved, which is the minimum between available space and part quantity
    return Math.min(part.quantity, availableSpace);
}

export function moveSalvagePartToStation(target, part) {
    let salvageItems = getState('salvageItems');
    let stationItems = getState('stationItems') || [];
    let spacejunkItems = getState('spacejunkItems');

    // Get available space in the station inventory
    const availableSpace = getAvailableSpace(part);

    if (availableSpace > 0) {
        const moveQuantity = Math.min(part.quantity, availableSpace);

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

        gatherMaterial(part.material);

        spacejunkItems = spacejunkItems.map(spacejunkItem => {
            if (spacejunkItem.parts.some(p => p.id === part.id)) {
                spacejunkItem.parts = spacejunkItem.parts.map(p => {
                    if (p.id === part.id) {
                        p.quantity -= moveQuantity;  // Reduce the part quantity
                    }
                    return p.quantity > 0 ? p : null;  // Keep the part only if it has a positive quantity
                }).filter(p => p !== null);  // Remove parts with 0 quantity
            }
            return spacejunkItem;
        });

        // Update spacejunk, salvage, and station inventories in the state
        setState('spacejunkItems', spacejunkItems);
        setState('salvageItems', salvageItems);
        setState('stationItems', stationItems);

        if (salvageItems.length === 0) {
            const salvageDropArea = document.getElementById('salvage-drop-area');
            salvageDropArea.innerHTML = '';  // Clear the salvage drop area

            // Remove the space junk item from the spacejunk inventory if it has no parts left
            spacejunkItems = spacejunkItems.filter(spacejunkItem => spacejunkItem.parts.length > 0);
            setState('spacejunkItems', spacejunkItems);

            updateSpacejunkInventory();
            updateSpacejunkDisplay();
        }

        // Re-render the inventory grids
        updateSalvageInventory();
        updateStationInventory();
        calculateMaterialsStorage();
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