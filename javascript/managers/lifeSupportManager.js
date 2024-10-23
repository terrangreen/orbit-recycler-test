// lifeSupportManager.js

import { getState, setState } from "../app/gameState.js";
import { updateLifeSupportResourcesDisplay } from "./displayManager.js";

export function updateLifeSupportResources() {
    const lifeSupportResources = getState('lifeSupportResources') || {};
    const stationModules = getState('stationModules') || {};

    // Reset rates for each resource before recalculating
    Object.keys(lifeSupportResources).forEach(key => {
        lifeSupportResources[key].rate = 0;
        lifeSupportResources[key].storage = 0;
        // lifeSupportResources[key].current = lifeSupportResources[key].storage;
    });

    stationModules.forEach(module => {
        ['interior', 'exterior'].forEach(section => {
            const equipmentSection = module.equipment[section] || [];
            
            equipmentSection.forEach(item => {
                if (item.utilityRate) {
                    Object.keys(item.utilityRate).forEach(rateKey => {
                        const resourceKey = rateKey.charAt(0).toUpperCase() + rateKey.slice(1);
                        if (lifeSupportResources[resourceKey]) {
                            lifeSupportResources[resourceKey].rate += item.utilityRate[rateKey] || 0;
                        }
                    });
                }
    
                if (item.storage) {
                    Object.keys(item.storage).forEach(storageKey => {
                        const resourceKey = storageKey.charAt(0).toUpperCase() + storageKey.slice(1);
                        if (lifeSupportResources[resourceKey]) {
                            lifeSupportResources[resourceKey].storage += item.storage[storageKey] || 0;
                        }
                    });
                }
            });
        })
    });

    calculateCurrentLifeSupportResource();

    setState('lifeSupportResources', lifeSupportResources);
    updateLifeSupportResourcesDisplay();
}

export function calculateCurrentLifeSupportResource() {
    const lifeSupportResources = getState('lifeSupportResources') || {};

    // Update the current value based on the rates
    Object.keys(lifeSupportResources).forEach(key => {
        lifeSupportResources[key].current += lifeSupportResources[key].rate;
        // Ensure current value does not exceed limits
        if (lifeSupportResources[key].current > lifeSupportResources[key].storage) {
            lifeSupportResources[key].current = lifeSupportResources[key].storage;
        } else if (lifeSupportResources[key].current < 0) {
            lifeSupportResources[key].current = 0;
        }
    });
}