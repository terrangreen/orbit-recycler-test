// salvageManager.js

import { getState, setState } from "../app/gameState.js";
import { showToastMessage } from "../app/toast.js";
import { updateSpacejunkDisplay, updateStationStorage } from "./displayManager.js";
import { handleDroppable } from "./dragManager.js";
import { calculateMaterialsStorage, gatherMaterial } from "./materialsManager.js";
import { updateSalvageInventory, updateSpacejunkInventory, updateStationInventory } from "./updateInventory.js";

export function handleSalvageArea() {
    const salvageDropArea = document.getElementById('salvage-drop-area');
    handleDroppable(salvageDropArea, moveToSalvage);
}

export function handleSalvageToStation() {
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
    const maxStationCapacity = getState('stationInventoryLimit');
    const stationInventory = getState('stationInventory');
    const currentItemCount = stationInventory.reduce((count, item) => count + item.quantity, 0);
    const availableSpace = maxStationCapacity - currentItemCount;

    updateStationStorage();

    return Math.min(part.quantity, availableSpace);
}

export function moveSalvagePartToStation(target, part) {
    let salvageItems = getState('salvageItems');
    let stationInventory = getState('stationInventory') || [];
    let spacejunkItems = getState('spacejunkItems');
    let existingEquipmentCounts = getState('existingEquipmentCounts');

    // Get available space in the station inventory
    let availableSpace = getAvailableSpace(part);

    if (availableSpace > 0) {
        const moveQuantity = Math.min(part.quantity, availableSpace);
        let remainingQuantity = moveQuantity;

        // Find existing stacks in station inventory for this part type
        stationInventory = stationInventory.map(item => {
            if (item.id === part.id && item.quantity < item.stackSize && remainingQuantity > 0) {
                const spaceInStack = item.stackSize - item.quantity;
                const quantityToAdd = Math.min(spaceInStack, remainingQuantity);
                item.quantity += quantityToAdd;
                remainingQuantity -= quantityToAdd;
            }
            return item;
        });

        // Create new stack with leftover quantity
        while (remainingQuantity > 0) {
            const quantityForNewStack = Math.min(remainingQuantity, part.stackSize);
            if (part.type === 'equipment') {
                const currentCount = existingEquipmentCounts[part.keyName] || 0;
                const uniqueId = `${part.keyName}-${currentCount + 1}`;
                const newPart = { ...part, quantity: quantityForNewStack, id: uniqueId };
                stationInventory.push(newPart);
                existingEquipmentCounts[part.keyName]++;
            } else {
                stationInventory.push({ ...part, quantity: quantityForNewStack });
            }
            remainingQuantity -= quantityForNewStack;
        }

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
        setState('stationInventory', stationInventory);

        if (salvageItems.length === 0) {
            const salvageDropArea = document.getElementById('salvage-drop-area');
            salvageDropArea.innerHTML = '';

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
        showToastMessage('Stop that', "warning");
    }
}

export function lootAllSalvageParts() {
    const salvageItems = getState('salvageItems');
    const salvageDropArea = document.getElementById('salvage-drop-area');
    const stationInventoryGrid = document.getElementById('station-inventory-grid');
    
    salvageItems.forEach(part => {
        let availableSpace = getAvailableSpace(part);

        if (availableSpace > 0) {
            moveSalvagePartToStation(stationInventoryGrid, part);
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

    // Check if there are salvage items and if the station has available space
    const hasAvailableSpace = salvageItems.some(part => getAvailableSpace(part) > 0);

    // Enable or disable the button based on the conditions
    lootAllBtn.disabled = !(hasAvailableSpace);
}
