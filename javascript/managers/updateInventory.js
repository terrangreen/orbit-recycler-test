// updateInventory.js

import { getState } from "../app/gameState.js";
import { loadStationResources } from "../modules/stationResourcesModule.js";
import { updateSpacejunkDisplay, updateStationDisplay } from "./displayManager.js";
// import { handleDragStart, handleDroppable } from "./dragHandler.js";
import { updateStaticInventoryGrid, updateDynamicInventoryGrid, displayItemDetails } from "./inventoryManager.js";
import { handleSalveToStation, moveSalvagePartToStation } from "./salvageHandler.js";

export function updateSpacejunkInventory() {
    const spacejunkInventoryGrid = document.getElementById('spacejunk-inventory-grid');
    const spacejunkItemDetails = document.getElementById('spacejunk-item-details');
    const spacejunkItems =  getState('spacejunkItems');
    const rawJunkLimit =  getState('rawJunkLimit');

    updateSpacejunkDisplay();

    // Updated to check if an item is in the holdItems array and apply the 'on-hold' class
    updateStaticInventoryGrid(spacejunkInventoryGrid, spacejunkItems, (item) => {
        displayItemDetails(spacejunkItemDetails, item, { 'Owner': item.owner });
    }, rawJunkLimit, true);
    loadStationResources();
}

// Update Salvage Inventory Display
export function updateSalvageInventory() {
    const salvageItems = getState('salvageItems');

    const salvageInventoryGrid = document.getElementById('salvage-inventory-grid');
    const salvageItemDetails = document.getElementById('salvage-item-details');
    const stationInventoryGrid = document.getElementById('station-inventory-grid');

    updateDynamicInventoryGrid(salvageInventoryGrid, salvageItems, (part) => displayItemDetails(salvageItemDetails, part, { 'Quantity': part.quantity }), true);
    
    handleSalveToStation();
}

// Update Station Inventory Display
export function updateStationInventory() {
    const stationItems = getState('stationItems');
    
    const stationInventoryGrid = document.getElementById('station-inventory-grid');
    const stationItemDetails = document.getElementById('station-item-details');
    const stationItemsLimit = getState('stationItemsLimit');

    updateStationDisplay();

    updateStaticInventoryGrid(stationInventoryGrid, stationItems, (item) => displayItemDetails(stationItemDetails, item, { 'Quantity': item.quantity }), stationItemsLimit, true);
    
}