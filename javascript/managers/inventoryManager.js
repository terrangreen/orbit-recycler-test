// inventoryManager.js

import { getState } from '../app/gameState.js';
import { handleDragStart } from './dragHandler.js';

export function updateStaticInventoryGrid(gridElement, items, extraFields = {}, limit, canDragAndDrop = false) {
    const defaultIcon = getState('defaultIcon');

    gridElement.innerHTML = ''; // Clear current grid

    for (let i = 0; i < limit; i++) {
        const square = document.createElement('div');
        square.classList.add('inventory-square');

        const item = items[i];
        const squareId = item ? `inventory-square-${item.id}` : `inventory-square-empty-${i}`;
        square.id = squareId; // Assign the id to the square div
    
        if (item) {
            const extraContent = extraFields[i];
            // If there's an item at this index, populate the square
            square.innerHTML = `<i data-lucide="${item.iconType || defaultIcon}" class="icon white"></i>`;
            square.title = `Type: ${item.type}\nOwner: ${item.owner}\nValue: ${item.value}`;
            
            if (canDragAndDrop && !square.dragListenerAdded) {
                square.setAttribute('draggable', true);
                square.addEventListener('dragstart', (e) => handleDragStart(e, item));
                square.dragListenerAdded = true;
            }

            if (item.onHold) {
                square.classList.add('on-hold');
            }

            square.addEventListener('mouseover', (e) => {
                showTooltip(e, item, extraContent);
            });

            square.addEventListener('mouseout', (e) => {
                hideTooltip();
            })

            // Add click event to show item details when clicked
            // if (!square.clickListenerAdded) {
            //     square.addEventListener('click', () => {
            //         displayFunction(item);
            //     });
            //     square.clickListenerAdded = true;
            // }
        } else {
            square.innerHTML = ''; // Leave the square empty
        }

        gridElement.appendChild(square);
    }

    lucide.createIcons();  // Re-create icons after updating the grid
}

export function updateDynamicInventoryGrid(gridElement, items, extraFields = null, canDragAndDrop = false) {
    gridElement.innerHTML = '';

    items.forEach(part => {
        const square = document.createElement('div');
        square.classList.add('inventory-square');
        square.innerHTML = `<i data-lucide="${part.iconType || defaultIcon}" class="icon white"></i>`;
        square.title = `Name: ${part.name}`;

        const fields = extraFields ? extraFields(part) : {};

        if (canDragAndDrop) {
            square.setAttribute('draggable', true);
            square.addEventListener('dragstart', (e) => handleDragStart(e, part));
        }

        square.addEventListener('mouseover', (e) => {
            showTooltip(e, part, fields);
        });

        square.addEventListener('mouseout', (e) => {
            hideTooltip();
        })

        gridElement.appendChild(square);
    });

    lucide.createIcons();
}

// export function displayItemDetails(targetDiv, item, extraFields = {}) {
//     if (targetDiv && item) {
//         let extraContent = '';
//         for (const [key, value] of Object.entries(extraFields)) {
//             extraContent += `<p><strong>${key}:</strong> ${value}</p>`;
//         }

//         targetDiv.innerHTML = `
//             <h3>Details</h3>
//             <p><strong>Type:</strong> ${item.name}</p>
//             <p><strong>Value:</strong> ${item.value}</p>
//             ${extraContent}
//         `;

//         targetDiv.style.display = 'block';
        
//         lucide.createIcons();
//     } else if (targetDiv) {
//         targetDiv.innerHTML = '';
//         targetDiv.style.display = 'block';
//     } else {
//         console.error('Target div not found in the DOM.');
//     }
// }

// Add items to the station inventory
export function addToStationInventory(item, quantity, itemType) {
    const stationItems = getState('stationItems');
    const stationItemsLimit = getState('stationItemsLimit');
    const currentItemCount = stationItems.reduce((total, currentItem) => total + currentItem.quantity, 0);

    if (currentItemCount + quantity <= stationItemsLimit) {
        const existingItem = stationItems.find(stationItem => stationItem.name === item && stationItem.type === itemType);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            stationItems.push({ name: item, quantity, type: itemType });
        }
        setState('stationItems', stationItems);
    } else {
        console.error(`Not enough space in the station inventory to add ${quantity} of ${item}.`);
    }
}

export function addToStationInventoryNew(item, quantity, itemType) {
    const stationItems = getState('stationItems');
    const stationItemsLimit = getState('stationItemsLimit');
    const currentItemCount = stationItems.reduce((total, currentItem) => total + currentItem.quantity, 0);

    if (currentItemCount + quantity <= stationItemsLimit) {
        const existingItem = stationItems.find(stationItem => stationItem.name === item && stationItem.type === itemType);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            stationItems.push({ name: item, quantity, type: itemType });
        }
        setState('stationItems', stationItems);
    } else {
        console.error(`Not enough space in the station inventory to add ${quantity} of ${item}.`);
    }
}

// Remove items from the station inventory
export function removeFromStationInventory(item, quantity, itemType) {
    const stationItems = getState('stationItems');
    const itemIndex = stationItems.findIndex(stationItem => stationItem.name === item && stationItem.type === itemType);

    if (itemIndex > -1) {
        if (stationItems[itemIndex].quantity > quantity) {
            stationItems[itemIndex].quantity -= quantity;
        } else {
            stationItems.splice(itemIndex, 1);
        }
        setState('stationItems', stationItems);
    } else {
        console.error(`${item} (${itemType}) not found in station inventory.`);
    }
}

// Check available space
export function getAvailableStationSpace() {
    const stationItems = getState('stationItems');
    const stationItemsLimit = getState('stationItemsLimit');
    const currentItemCount = stationItems.reduce((total, item) => total + item.quantity, 0);

    return stationItemsLimit - currentItemCount;
}

function showTooltip(event, item, extraFields = {}) {
    let tooltip = document.querySelector('.tooltip');

    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        document.body.appendChild(tooltip);
    }

    let extraContent = '';
    for (const [key, value] of Object.entries(extraFields)) {
        extraContent += `<p><strong>${key}:</strong> ${value}</p>`;
    }
    // Set the content for the tooltip
    tooltip.innerHTML = `
        <p><strong>Name:</strong> ${item.name}</p>
        <p><strong>Value:</strong> ${item.value}</p>
        ${extraContent}
    `;

    // Position the tooltip based on the mouse position
    tooltip.style.left = `${event.pageX + 10}px`; // Offset tooltip a bit from the cursor
    tooltip.style.top = `${event.pageY + 10}px`;
    tooltip.style.display = 'block'; // Show the tooltip
}

// Function to hide tooltip
function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        tooltip.style.display = 'none'; // Hide the tooltip
    }
}