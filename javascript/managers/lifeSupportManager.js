// lifeSupportManager.js

import { getState, setState } from "../app/gameState.js";
import { updateLifeSupportResourcesDisplay } from "./displayManager.js";

let needsRecalculation = true;

export function updateLifeSupportResources() {
    const lifeSupportResources = getState('lifeSupportResources') || {};

    // Only recalculate rates and storage if needed
    if (needsRecalculation) {
        recalculateRatesAndStorage(lifeSupportResources);
        needsRecalculation = false;
    }

    // Update current values based on rate every tick
    updateCurrentValues(lifeSupportResources);

    setState('lifeSupportResources', lifeSupportResources);
    updateLifeSupportResourcesDisplay();
}

export function markRecalculationNeeded() {
    needsRecalculation = true;
}

function recalculateRatesAndStorage(lifeSupportResources) {
    const stationModules = getState('stationModules') || {};
    const crewMembers = getState('crewMembers');

    // Reset rates and storage for recalculating
    Object.keys(lifeSupportResources).forEach(key => {
        const lowKey = key.toLowerCase();
        if (crewMembers.consumptionRates[lowKey]) {
            lifeSupportResources[key].rate = crewMembers.count * crewMembers.consumptionRates[lowKey];
        } else {
            lifeSupportResources[key].rate = 0;
        }
        lifeSupportResources[key].storage = 0;
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

                if (item.efficiencyRate) {
                    Object.keys(item.efficiencyRate).forEach(efficiencyKey => {
                        if (lifeSupportResources[efficiencyKey]) {
                            const crewRate = crewMembers.consumptionRates[efficiencyKey.toLowerCase()] || 0;
                            const regenerationRate = item.efficiencyRate[efficiencyKey] || 0;

                            // Calculate the effective rate, which combines consumption and regeneration
                            const effectiveRate = crewRate - regenerationRate;
                            lifeSupportResources[efficiencyKey].rate += effectiveRate * crewMembers.count;
                        }
                    });
                }
            });
        });
    });
}

function updateCurrentValues(lifeSupportResources) {
    Object.keys(lifeSupportResources).forEach(key => {
        let current = lifeSupportResources[key].current + lifeSupportResources[key].rate;
        lifeSupportResources[key].current = parseFloat(current.toFixed(1));
        if (lifeSupportResources[key].current > lifeSupportResources[key].storage) {
            lifeSupportResources[key].current = lifeSupportResources[key].storage;
        } else if (lifeSupportResources[key].current < 0) {
            lifeSupportResources[key].current = 0;
        }
    });
}

export function formatRate(rate) {
    const rateClass = rate > 0 ? 'positive' : rate < 0 ? 'negative' : 'neutral';
    const formattedRate = rate > 0 ? `+${formatNumber(rate)}` : `${formatNumber(rate)}`;
    return { rateClass, formattedRate };
}

export function formatNumber(value) {
    if (value >= 1) {
        return value.toFixed(1);
    } else if (value >= 0.1) {
        return value.toFixed(2);
    } else {
        return value.toFixed(3);
    }
}