// dragHandler.js

import { getState, setState } from "../app/gameState.js";

export function handleDragStart(e, item) {
    e.dataTransfer.setData('item', JSON.stringify(item));
    // e.dataTransfer.effectAllowed = 'move';
}
  
export function handleDroppable(target, nextFunction) {
    target.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
    target.addEventListener('drop', (e) => {
        e.preventDefault();

        const itemData = e.dataTransfer.getData('item');
        const item = JSON.parse(itemData);

        nextFunction(target, item);
    })
}


export function handleDroppableNew(sourceInventory, targetInventory) {
    dropArea.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    targetInventory.addEventListener('drop', (e) => {
        e.preventDefault();
        // const draggedItem = e.dataTransfer.getData('item');
        const itemData = e.dataTransfer.getData('item');
        const item = JSON.parse(itemData);
        moveToInventory(item, sourceInventory, targetInventory);
    });
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

export function handleDroppableNew2(sourceItems, targetItems) {
    dropArea.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    targetInventory.addEventListener('drop', (e) => {
        e.preventDefault();
        // const draggedItem = e.dataTransfer.getData('item');
        const itemData = e.dataTransfer.getData('item');
        const item = JSON.parse(itemData);
        moveToInventory(item, sourceItems, targetItems);
    });
}

export function moveToInventory2(item, sourceItems, targetInventory, putOnHold = false) {
    const defaultIcon = getState('defaultIcon');
    // let sourceItems = getState(item.sourceInventory);
    // let targetItems = getState(targetInventory);

    if (item.putOnHold = true) {
        item.onHold = true;
    };

    const updatedItems = sourceItems.map(sourceItem =>
        sourceItem.id  === item.id ? { ...sourceItem, onHold: true } : sourceItem
    );
    setState(sourceItems, updatedItems);

    // Add 

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