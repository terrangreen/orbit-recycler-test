// displayManager.js

import { collectSpacejunk } from '../modules/spacejunkCollectorModule.js';
import { loadStationResources } from '../modules/stationResourcesModule.js';
import { handleSalvageArea } from './salvageManager.js';
import { updateSpacejunkInventory, updateStationInventory } from './updateInventory.js';
import { getState, setState } from '../app/gameState.js';
import { loadCraftingSection } from '../modules/craftingModule.js';
import { loadLifeSupportContent } from '../modules/lifeSupportModuleTemplate.js';
import { loadStationLayoutSection } from '../modules/stationLayout.js';
import { formatRate, updateLifeSupportResources } from './lifeSupportManager.js';
import { showTooltip } from '../app/tooltip.js';

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
    updateLifeSupportResources();
    // handleEquipmentArea();
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
    const stationInventoryLimit = getState('stationInventoryLimit');
    const stationStorage = getState('stationInventoryStorage');
    const stationInventoryDisplay = document.getElementById('stationInventoryDisplay');

    stationInventoryDisplay.textContent = `${stationStorage} / ${stationInventoryLimit}`;
}

export function updateSpacejunkStorage() {
    const spacejunkItems = getState('spacejunkItems');
    const spacejunkItemsStorage = spacejunkItems.reduce((total, item) => total + (item.quantity || 1), 0);
    setState('spacejunkItemsStorage', spacejunkItemsStorage);
}

export function updateStationStorage() {
    const stationInventory = getState('stationInventory');
    const stationInventoryStorage = stationInventory.reduce((total, item) => total + (item.quantity || 1), 0);
    setState('stationInventoryStorage', stationInventoryStorage);  // Save the calculated value to the game state
}

export function updateStationModuleCount() {
    const stationModules = getState('stationModules');
    const stationModulesCount = stationModules.length;
    const stationModulesLimit = getState('stationModulesLimit');
    const stationModulesDisplay = document.getElementById('stationModulesDisplay');

    stationModulesDisplay.textContent = `${stationModulesCount} / ${stationModulesLimit}`;
}

export function updateLifeSupportResourcesDisplay() {
    const lifeSupportResources = getState('lifeSupportResources');
    
    Object.entries(lifeSupportResources).forEach(([key, resource]) => {
        const resourceValueDisplayElement = document.getElementById(resource.valueId);
        if (resourceValueDisplayElement) {
            resourceValueDisplayElement.textContent = `${resource.current} / ${resource.storage}`;
        }

        const { rateClass, formattedRate } = formatRate(resource.rate);
        // const rateClass = item.rate > 0 ? 'positive' : item.rate < 0 ? 'negative' : 'neutral';
        // const formattedRate = item.rate > 0 ? `+${item.rate}` : `${item.rate}`;

        const resourceRateDisplayElement = document.getElementById(resource.rateId);
        if (resourceRateDisplayElement) {
            resourceRateDisplayElement.textContent = `${formattedRate}`;
            resourceRateDisplayElement.className = `rate ${rateClass}`;
        }

        const resourceDisplayElement = document.getElementById(`resource-${key.toLowerCase()}`);
        if (resourceDisplayElement) {
            const selectFields = {
                "Resource": key,
                "Current": resource.current,
                "Storage": resource.storage,
                "Rate": resource.rate
            };

            showTooltip(resourceDisplayElement, null, selectFields);
        }
    });
}