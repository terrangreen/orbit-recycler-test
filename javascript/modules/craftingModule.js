// craftingModule.js

import { getState } from "../app/gameState.js";
import { showTooltip } from '../app/tooltip.js';
import { craftItem } from "../managers/craftingManager.js";

export function loadCraftingSection() {
    const craftingContainer = document.getElementById('crafting-content');
    craftingContainer.innerHTML = '';

    const knownRecipes = getState('knownRecipes') || [];
    const knownMaterials = getState('knownMaterials') || [];

    // Iterate over knownRecipes directly
    knownRecipes.forEach(recipe => {
        const recipeElement = document.createElement('div');
        recipeElement.classList.add('crafting-recipe');

        // Add preview icon
        const icon = document.createElement('i');
        icon.setAttribute('data-lucide', recipe.iconType);
        icon.classList.add('icon');
        recipeElement.appendChild(icon);

        // Add recipe name
        const name = document.createElement('span');
        name.textContent = recipe.name;
        recipeElement.appendChild(name);

        // Prepare tooltip content based on materials requirements
        let selectFields = {};
        let canCraft = true;

        Object.entries(recipe.materials).forEach(([material, required]) => {
            const materialData = knownMaterials.find(m => m.material === material);
            const materialName = materialData ? materialData.name : '';
            const currentAmount = materialData ? materialData.quantity : 0;

            selectFields[materialName] = `${currentAmount} / ${required}`;

            if (currentAmount < required) {
                canCraft = false;
            }
        });

        // Set tooltip content and initialize Tippy
        showTooltip(recipeElement, recipe, selectFields);

        // Add craft button
        const craftButton = document.createElement('button');
        craftButton.textContent = 'Craft';
        craftButton.disabled = !canCraft;
        craftButton.addEventListener('click', () => craftItem(recipe));
        recipeElement.appendChild(craftButton);

        craftingContainer.appendChild(recipeElement);
    });

    lucide.createIcons();
}