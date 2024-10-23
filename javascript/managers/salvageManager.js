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

    const lootBtn = document.getElementById('salvageLootAllBtn');
    lootBtn.addEventListener('click', lootAllSalvageParts);
    lootBtn.disabled = "false";
}

export function moveToSalvage(target, item) {
    const defaultIcon = getState('defaultIcon');
    const spacejunkItems = getState('spacejunkItems');
    const salvageItems = getState('salvageItems');
    const returnBtn = document.getElementById('salvageUndoBtn');
    const lootAllBtn = document.getElementById('salvageLootAllBtn');
 
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
    updateLootAllButtonState();
    
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
    updateLootAllButtonState();
}

export function getAvailableSpace(part) {
    const maxStationCapacity = getState('stationItemsLimit');
    const stationItems = getState('stationItems');
    const currentItemCount = stationItems.reduce((count, item) => count + item.quantity, 0);
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
                salvagePart.quantity -= moveQuantity;
                if (salvagePart.quantity <= 0) {
                    return null;
                }
            }
            return salvagePart;
        }).filter(salvagePart => salvagePart !== null);

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
                        p.quantity -= moveQuantity;
                    }
                    return p.quantity > 0 ? p : null;
                }).filter(p => p !== null);
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

export function lootAllSalvageParts() {
    const salvageItems = getState('salvageItems');
    const salvageDropArea = document.getElementById('salvage-drop-area');
    const stationInventoryGrid = document.getElementById('station-inventory-grid');
    

    salvageItems.forEach(part => {
        let availableSpace = getAvailableSpace(part);

        if (availableSpace > 0) {
            const partQuantity = Math.min(part.quantity, availableSpace);

            // Create a temporary part object with the adjusted quantity
            const tempPart = { ...part, quantity: partQuantity };

            // Move the part to the station
            moveSalvagePartToStation(stationInventoryGrid, tempPart);

            // Adjust the available space
            availableSpace -= partQuantity;
        }
    });

    // If all parts are moved, clear the salvage drop area and salvage items state
    if (salvageItems.length === 0) {
        salvageDropArea.innerHTML = '';
        setState('salvageItems', []);
    }

    // Update the relevant displays after all parts are moved
    updateStationInventory();
    updateSalvageInventory();
    updateSpacejunkInventory();
    updateLootAllButtonState();
}

export function updateLootAllButtonState() {
    const salvageItems = getState('salvageItems');
    const lootAllBtn = document.getElementById('salvageLootAllBtn');

    console.log('salvageItems:', salvageItems);

    // Check if there are salvage items and if the station has available space
    const hasAvailableSpace = salvageItems.some(part => getAvailableSpace(part) > 0);

    // Enable or disable the button based on the conditions
    lootAllBtn.disabled = !(hasAvailableSpace);
}
