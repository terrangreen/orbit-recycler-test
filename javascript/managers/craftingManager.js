import { loadCraftingSection } from "../modules/craftingModule.js";
import { calculateMaterialsStorage } from "./materialsHandler.js";

export function craftItem(recipe) {
    const materialsAvailable = Object.entries(recipe.materials).every(([material, required]) => {
        const currentAmount = getState(material) || 0;
        return currentAmount >= required;
    });

    if (materialsAvailable) {
        // Deduct the required materials
        Object.entries(recipe.materials).forEach(([material, required]) => {
            const currentAmount = getState(material);
            setState(material, currentAmount - required);
        });

        // Add the crafted item to the inventory (e.g., storage bags)
        addToInventory(recipe.name);

        // Recalculate materials after crafting, if necessary
        calculateMaterialsStorage();

        alert(`${recipe.name} crafted successfully!`);
    } else {
        alert('Not enough materials to craft this item.');
    }

    loadCraftingSection();
}


// Version 2
// export function craftItem(recipe) {
//     // Get the list of collected salvage parts (this could be 'stationItems' or 'salvageItems' depending on your setup)
//     const collectedSalvageParts = getState('stationItems') || [];

//     // Check if all required materials are available by matching with the collected salvage parts
//     const materialsAvailable = Object.entries(recipe.materials).every(([material, required]) => {
//         const currentPart = collectedSalvageParts.find(part => part.material === material);
//         const currentAmount = currentPart ? currentPart.quantity : 0;
//         return currentAmount >= required;
//     });

//     if (materialsAvailable) {
//         // Deduct the required materials
//         Object.entries(recipe.materials).forEach(([material, required]) => {
//             const currentPart = collectedSalvageParts.find(part => part.material === material);
//             if (currentPart) {
//                 currentPart.quantity -= required;
//             }
//         });

//         // Save the updated stationItems with the reduced quantities back to the game state
//         setState('stationItems', collectedSalvageParts);

//         // Add the crafted item to the inventory
//         addToInventory(recipe.name);

//         alert(`${recipe.name} crafted successfully!`);
//     } else {
//         alert('Not enough materials to craft this item.');
//     }

//     // Update the crafting UI
//     loadCraftingSection();
// }


// Version 1
// export function craftItem(recipe) {
//     const materialsAvailable = Object.entries(recipe.materials).every(([material, required]) => {
//         const currentAmount = getState(material) || 0;
//         return currentAmount >= required;
//     });

//     if (materialsAvailable) {
//         // Deduct the required materials
//         Object.entries(recipe.materials).forEach(([material, required]) => {
//             const currentAmount = getState(material);
//             setState(material, currentAmount - required);
//         });

//         // Add the crafted item to the inventory (e.g., storage bags)
//         // You can define how the crafted items should be stored
//         addToInventory(recipe.name);

//         alert(`${recipe.name} crafted successfully!`);
//     } else {
//         alert('Not enough materials to craft this item.');
//     }

//     // Update the crafting UI
//     loadCraftingSection();
// }
