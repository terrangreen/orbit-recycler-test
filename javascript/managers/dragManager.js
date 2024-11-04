// dragManager.js

import { getState, setState } from "../app/gameState.js";

export function handleDragStart(e, item, sourceInventoryId) {
    e.dataTransfer.setData('item', JSON.stringify({ ...item, sourceInventoryId }));
}
  
export function handleDroppable(target, nextFunction, additionalData = {}, allowedInventory = null) {
    if (!target.dragoverListenerAdded) {
        target.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        target.dragoverListenerAdded = true;
    }

    if (!target.dropListenerAdded) {
        target.addEventListener('drop', (e) => {
            e.preventDefault();

            const itemData = e.dataTransfer.getData('item');
            const item = JSON.parse(itemData);

            const sourceInventory = document.getElementById(item.sourceInventoryId);
            const isValidDrop = !sourceInventory.contains(target);

            if (target.id !== item.sourceInventory && isValidDrop) {
                nextFunction(target, item, additionalData);
            }
        });
        target.dropListenerAdded = true;
    }
}

export function moveToInventory(item, sourceInventory, targetInventory) {
    let sourceItems = getState(item.sourceInventory);
    let targetItems = getState(targetInventory);

    // Remove item from source inventory
    sourceItems = sourceItems.filter(sourceItem => sourceItem.id !== item.id);
    setState(item.sourceInventory, sourceItems);

    // Add item to the target inventory
    targetItems.push(item);
    setState(targetInventory, targetItems);

    // Update both inventories
    updateInventory(sourceItems, item.sourceInventory);
    updateInventory(targetItems, targetInventory);
}