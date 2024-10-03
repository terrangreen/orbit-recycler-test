import { collectSpacejunk } from '../modules/spacejunkCollectorModule.js';
import { loadStationResources } from '../modules/stationResourcesModule.js';
import { handleSalvageArea } from '../managers/salvageHandler.js';
import { updateSpacejunkInventory, updateStationInventory } from './updateInventory.js';
import { getState } from '../app/gameState.js';


export function updateDisplays() {
    updateSpacejunkInventory();
    updateStationInventory();
    collectSpacejunk();
    loadStationResources();
    handleSalvageArea();
}

export function updateSpacejunkDisplay() {
    const spacejunkSpanValue = document.getElementById('rawSpaceJunkValue');
    const spacejunkInventoryDisplay = document.getElementById('spacejunkInventoryDisplay');

    if (spacejunkInventoryDisplay && spacejunkSpanValue) {
        spacejunkInventoryDisplay.textContent = spacejunkSpanValue.textContent;
    }
}

export function updateStationDisplay() {
    const stationItems = getState('stationItems');
    const stationItemsLimit = getState('stationItemsLimit');

    const stationInventoryDisplay = document.getElementById('stationInventoryDisplay');
    console.log('stationItems:', stationItems);
    console.log('stationItems.length:', stationItems.length);
    console.log('stationItemsLimit', stationItemsLimit)
    stationInventoryDisplay.textContent = `${stationItems.length} / ${stationItemsLimit}`;
}