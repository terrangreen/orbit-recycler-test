// materialsHandler.js

import { getState, setState } from "../app/gameState.js";
import { loadCraftingSection } from "../modules/craftingModule.js";
import { loadStationResources } from "../modules/stationResourcesModule.js";
import { possibleSalvage } from "../resources/salvageResourcesData.js";

export function gatherMaterial(materialType) {
    const knownMaterials = getState('knownMaterials') || [];
    
    // Initialize material count if not already present
    if (!knownMaterials.some(m => m.material === materialType)) {
        const materialDetails = possibleSalvage.find(salvage => salvage.material === materialType);
        if (materialDetails) {
            knownMaterials.push(materialDetails);
            setState('knownMaterials', knownMaterials);
        }
    }

    // Update material quantity
    calculateMaterialsStorage();
}

export function calculateMaterialsStorage() {
    const knownMaterials = getState('knownMaterials') || [];
    const stationItems = getState('stationItems');

    knownMaterials.forEach(materialObj => {
        const material = materialObj.material;
        const stationMaterial = stationItems.find(item => item.material === material);
        if (stationMaterial) {
            const totalMaterialCount = stationItems
                .filter(item => item.material === material)
                .reduce((total, item) => total + item.quantity, 0);

            // Update the quantity only if material is present in stationItems
            materialObj.quantity = totalMaterialCount;
        }
    });

    // Update the state with the calculated materials storage
    setState('knownMaterials', knownMaterials);

    loadStationResources();
    loadCraftingSection();
}