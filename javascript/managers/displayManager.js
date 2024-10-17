// displayManager.js

import { collectSpacejunk } from '../modules/spacejunkCollectorModule.js';
import { loadStationResources } from '../modules/stationResourcesModule.js';
import { handleSalvageArea } from '../managers/salvageHandler.js';
import { updateSpacejunkInventory, updateStationInventory } from './updateInventory.js';
import { getState, setState } from '../app/gameState.js';
import { loadCraftingSection } from '../modules/craftingModule.js';
import { loadLifeSupportContent } from '../modules/lifeSupportTemplateModule.js';
import { loadStationLayoutSection } from '../modules/stationLayout.js';

export function updateDisplays() {
    updateSpacejunkInventory();
    updateStationInventory();
    collectSpacejunk();
    loadStationResources();
    handleSalvageArea();
    loadCraftingSection();
    loadStationLayoutSection();
    loadLifeSupportContent();
    updateStationModuleCount();
}

export function updateSpacejunkDisplay() {
    updateSpacejunkStorage();
    const spacejunkSpanValue = document.getElementById('rawSpaceJunkValue');
    const spacejunkInventoryDisplay = document.getElementById('spacejunkInventoryDisplay');

    if (spacejunkInventoryDisplay && spacejunkSpanValue) {
        spacejunkInventoryDisplay.textContent = spacejunkSpanValue.textContent;
    }
}

export function updateStationDisplay() {    
    updateStationStorage();
    const stationItemsLimit = getState('stationItemsLimit');
    const stationStorage = getState('stationItemsStorage');
    const stationInventoryDisplay = document.getElementById('stationInventoryDisplay');

    stationInventoryDisplay.textContent = `${stationStorage} / ${stationItemsLimit}`;
}

export function updateSpacejunkStorage() {
    const spacejunkItems = getState('spacejunkItems');
    const spacejunkItemsStorage = spacejunkItems.reduce((total, item) => total + (item.quantity || 1), 0);
    setState('spacejunkItemsStorage', spacejunkItemsStorage);
}

export function updateStationStorage() {
    const stationItems = getState('stationItems');
    const stationItemsStorage = stationItems.reduce((total, item) => total + (item.quantity || 1), 0);
    setState('stationItemsStorage', stationItemsStorage);  // Save the calculated value to the game state
}

export function updateStationModuleCount() {
    const stationModules = getState('stationModules');
    const stationModulesInstalled = stationModules.length;
    const stationModulesLimit = getState('stationModulesLimit');
    const stationModulesDisplay = document.getElementById('stationModulesDisplay');

    stationModulesDisplay.textContent = `${stationModulesInstalled} / ${stationModulesLimit}`;
    
}