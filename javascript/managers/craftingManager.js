// craftingManager.js

import { getState, setState } from "../app/gameState.js";
import { showToastMessage } from "../app/toast.js";
import { loadCraftingSection } from "../modules/craftingModule.js";
import { addToStationInventory } from "./inventoryManager.js";
import { calculateMaterialsStorage } from "./materialsManager.js";
import { updateStationInventory } from "./updateInventory.js";

export function craftItem(recipe) {
    const knownMaterials = getState('knownMaterials') || [];
    let materialsAvailable = true;

    // Check if all required materials are available in knownMaterials
    Object.entries(recipe.materials).forEach(([material, required]) => {
        const materialData = knownMaterials.find(m => m.material === material);
        const currentAmount = materialData ? materialData.quantity : 0;

        if (currentAmount < required) {
            materialsAvailable = false;
        }
    });

    if (materialsAvailable) {
        // Deduct the required materials
        Object.entries(recipe.materials).forEach(([material, required]) => {
            const materialIndex = knownMaterials.findIndex(m => m.material === material);
            if (materialIndex !== -1) {
                knownMaterials[materialIndex].quantity -= required;
            }
        });

        // Save the updated knownMaterials state
        setState('knownMaterials', knownMaterials);

        // Add the crafted item to the station inventory
        addToStationInventory(recipe.name, 1, recipe.category);

        // Recalculate materials after crafting
        calculateMaterialsStorage();
        updateStationInventory();

        showToastMessage(`${recipe.name} crafted successfully!`, "success");
    } else {
        showToastMessage('Not enough materials.', "failure");
    }

    loadCraftingSection();  // Refresh the crafting section
}