import { getState } from "../app/gameState.js";
import { craftItem } from "../managers/craftingManager.js";

export function loadCraftingSection() {
    const craftingContainer = document.getElementById('crafting-content');
    craftingContainer.innerHTML = '';  // Clear previous content

    const craftingRecipes = getState('craftingRecipes');

    craftingRecipes.forEach(recipe => {
        if (recipe.unlocked) {
            const recipeElement = document.createElement('div');
            recipeElement.classList.add('crafting-recipe');

            // Add preview icon
            const icon = document.createElement('i');
            icon.setAttribute('data-lucide', recipe.icon);
            recipeElement.appendChild(icon);

            // Add recipe name
            const name = document.createElement('span');
            name.textContent = recipe.name;
            recipeElement.appendChild(name);

            // Add material requirements
            const materials = document.createElement('div');
            materials.classList.add('materials');
            for (const [material, required] of Object.entries(recipe.materials)) {
                const materialElement = document.createElement('span');
                const currentAmount = getState(material) || 0;  // Get current material count from game state
                materialElement.textContent = `${material}: ${currentAmount} / ${required}`;
                if (currentAmount < required) {
                    materialElement.classList.add('insufficient');  // Grayed out if insufficient
                }
                materials.appendChild(materialElement);
            }
            recipeElement.appendChild(materials);

            // Add craft button
            const craftButton = document.createElement('button');
            craftButton.textContent = 'Craft';
            craftButton.addEventListener('click', () => craftItem(recipe));
            recipeElement.appendChild(craftButton);

            craftingContainer.appendChild(recipeElement);
        }
    });

    lucide.createIcons();  // Initialize icons
}