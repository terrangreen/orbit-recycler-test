// inventoryManager.js

import { getState } from '../app/gameState.js';
import { handleDragStart } from './dragHandler.js';

export function updateStaticInventoryGrid(gridElement, items, displayFunction, limit) {
    const defaultIcon = getState('defaultIcon');

    gridElement.innerHTML = ''; // Clear current grid

    for (let i = 0; i < limit; i++) {
        const square = document.createElement('div');
        square.classList.add('inventory-square');

        if (items[i]) {
            // If there's an item at this index, populate the square
            const item = items[i];
            square.innerHTML = `<i data-lucide="${item.iconType || defaultIcon}" class="icon white"></i>`;
            square.title = `Type: ${item.type}\nOwner: ${item.owner}\nValue: ${item.value}`;
            square.setAttribute('draggable', true);
            square.addEventListener('dragstart', (e) => handleDragStart(e, item, i));

            // Add click event to show item details when clicked
            square.addEventListener('click', () => {
                displayFunction(item);
            });
        } else {
            // If no item and showEmptySlots is true, create an empty square
            square.innerHTML = ''; // Leave the square empty
        }

        gridElement.appendChild(square);
    }

    lucide.createIcons();  // Re-create icons after updating the grid
}

export function updateDynamicInventoryGrid(gridElement, items, displayFunction) {
    gridElement.innerHTML = '';
    console.log("items:", items)

    items.forEach(part => {
        const square = document.createElement('div');
        square.classList.add('inventory-square');
        square.innerHTML = `<i data-lucide="${part.iconType || defaultIcon}" class="icon white"></i>`;
        square.title = `Type: ${part.type}`; // Assuming part has a type property

        square.addEventListener('click', () => {
            console.log('part:', part);
            displayFunction(part);
        });

        gridElement.appendChild(square);
    });

    lucide.createIcons();
}

export function displayItemDetails(targetDiv, item, extraFields = {}) {
    if (targetDiv) {
        let extraContent = '';
        for (const [key, value] of Object.entries(extraFields)) {
            extraContent += `<p><strong>${key}:</strong> ${value}</p>`;
        }

        targetDiv.innerHTML = `
            <h3>Details</h3>
            <p><strong>Type:</strong> ${item.type}</p>
            <p><strong>Value:</strong> ${item.value}</p>
            <p><strong>Quantity:</strong> ${item.quantity}</p>
            ${extraContent}
        `;
        
        lucide.createIcons();
    } else {
        console.error('Target div not found in the DOM.');
    }
}