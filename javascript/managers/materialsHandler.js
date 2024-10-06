import { getState, setState } from "../app/gameState.js";
import { loadStationResources } from "../modules/stationResourcesModule.js";
import { possibleSalvage } from "../resources/salvageResourcesData.js";

export function gatherMaterial(materialType) {
    const knownMaterials = getState('knownMaterials') || [];
    console.log('materialType', materialType);
    
    // Initialize material count if not already present
    if (!knownMaterials.some(m => m.material === materialType)) {
        const materialDetails = possibleSalvage.find(salvage => salvage.material === materialType);
        console.log('materialDetails', materialDetails);
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
    console.log('stationItems', stationItems);
    console.log('knownMaterials', knownMaterials);

    // Iterate over all known materials and calculate the total quantity for each in stationItems
    // if (knownMaterials.length > 0) {
        knownMaterials.forEach(materialObj => {
            const material = materialObj.material;
            const totalMaterialCount = stationItems
                .filter(item => item.material === material)
                .reduce((total, item) => total + item.quantity, 0);

            // Store the result in the materialsStorage object
            // materialsStorage[material] = totalMaterialCount;
            console.log('materialObj:', materialObj);
            console.log('totalMaterialCount', totalMaterialCount);
            materialObj.quantity = totalMaterialCount;
        });
    // }

    // Update the state with the calculated materials storage
    setState('knownMaterials', knownMaterials);

    loadStationResources();
}


// Version 1
// export function calculateMaterialsStorage() {
//     const knownMaterials = getState('knownMaterials') || [];
//     const stationItems = getState('stationItems');
//     let materialsStorage = {};

//     // Iterate over all known materials and calculate the total quantity for each in stationItems
//     if (knownMaterials.length > 0) {
//         knownMaterials.forEach(material => {
//             const totalMaterialCount = stationItems
//                 .filter(item => item.material === material)
//                 .reduce((total, item) => total + item.quantity, 0);

//             // Store the result in the materialsStorage object
//             materialsStorage[material] = totalMaterialCount;
//         });
//     }

//     // Update the state with the calculated materials storage
//     setState('materialsStorage', materialsStorage);
// }