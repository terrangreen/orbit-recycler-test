// updateInventory.js

import { getState } from "../app/gameState.js";
import { loadStationResources } from "../modules/stationResourcesModule.js";
import { updateDisplays } from "./displayManager.js";
import { updateStaticInventoryGrid, displayItemDetails } from "./inventoryManager.js";

export function updateSpacejunkInventory() {
    const spacejunkInventoryGrid = document.getElementById('spacejunk-inventory-grid');
    const spacejunkItemDetails = document.getElementById('spacejunk-item-details');
    const spacejunkItems =  getState('spacejunkItems');
    const rawJunkLimit =  getState('rawJunkLimit');
    console.log('rawJunkLimit:', rawJunkLimit);

    updateStaticInventoryGrid(spacejunkInventoryGrid, spacejunkItems, (item) => displayItemDetails(spacejunkItemDetails, item, { 'Owner': item.owner }), rawJunkLimit);
    loadStationResources();
}

// Update Station Inventory Display
export function updateStationInventory() {
    const stationItems = getState('stationItems');

    // const stationInventory = getState('stationInventory');
    
    const stationInventoryGrid = document.getElementById('station-inventory-grid');
    const stationItemDetails = document.getElementById('station-item-details');
    const stationItemsLimit = getState('stationItemsLimit');

    updateStaticInventoryGrid(stationInventoryGrid, stationItems, (item) => displayItemDetails(stationItemDetails, item), stationItemsLimit);
}