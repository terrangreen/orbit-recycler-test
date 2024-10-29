// updateInventory.js

import { getState } from "../app/gameState.js";
import { loadStationResources } from "../modules/stationResourcesModule.js";
import { updateSpacejunkDisplay, updateStationDisplay } from "./displayManager.js";
import { updateStaticInventoryGrid, updateDynamicInventoryGrid } from "./inventoryManager.js";
import { updateLifeSupportResources } from "./lifeSupportManager.js";
import { handleSalvageToStation } from "./salvageManager.js";
import { createStationLayoutGrid, placeModulesInGrid } from "./stationManager.js";

export function updateSpacejunkInventory() {
    const spacejunkInventoryGrid = document.getElementById('spacejunk-inventory-grid');
    const spacejunkItems =  getState('spacejunkItems');
    const rawJunkLimit =  getState('rawJunkLimit');

    updateSpacejunkDisplay();

    const selectFields = spacejunkItems.map(item => ({
        'Item': item.name,
        'Owner': item.owner,
        'Value': item.value
    }));

    updateStaticInventoryGrid(spacejunkInventoryGrid, spacejunkItems, selectFields, rawJunkLimit, true);
    loadStationResources();
}

// Update Salvage Inventory Display
export function updateSalvageInventory() {
    const salvageItems = getState('salvageItems');

    const salvageInventoryGrid = document.getElementById('salvage-inventory-grid');

    const selectFields = (part) => ({
        'Item': part.name,
        'Quantity': part.quantity,
        'Condition': part.condition || 'Unknown'  // Add more fields if needed
    });
    

    updateDynamicInventoryGrid(salvageInventoryGrid, salvageItems, selectFields, true);
    
    handleSalvageToStation();
}

// Update Station Inventory Display
export function updateStationInventory() {
    const stationInventory = getState('stationInventory');
    const stationInventoryGrid = document.getElementById('station-inventory-grid');
    const stationInventoryLimit = getState('stationInventoryLimit');

    const selectFields = stationInventory.map(item => {
        let additionalInfo = {};

        switch(item.type) {
            case 'scrap':
                additionalInfo = {
                    'Use': 'Used in crafting or can be recycled'
                };
                break;
            case 'component':
                additionalInfo = {
                    'Use': 'Used in crafting'
                };
                break;
            case 'equipment':
                additionalInfo = {
                    'Use': 'Installable in the station',
                    'Equipment': item.section,
                    'Condition': item.condition
                };
                break;
        }

        return {
            'Item': item.name,
            'Description': item.description,
            'Quantity': item.quantity,
            ...additionalInfo
        }
    });

    updateStationDisplay();

    updateStaticInventoryGrid(stationInventoryGrid, stationInventory, selectFields, stationInventoryLimit, true);
    
}

export function updateStationLayout() {
    const stationModules = getState('stationModules') || [];

    const stationLayoutGrid = document.getElementById('station-layout-grid');
    const stationSize = Math.sqrt(getState('stationModulesLimit'));

    const selectFields = stationModules.map(module => ({
        'Module': module.name
    }));

    createStationLayoutGrid(stationLayoutGrid, stationSize);
    placeModulesInGrid(stationLayoutGrid, stationModules, selectFields);
    updateLifeSupportResources();
}