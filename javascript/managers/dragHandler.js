// dragHandler.js

import { getState } from "../app/gameState.js";

export function handleDragStart(e, item, index) {
    console.log('Dragging item:', item);
    e.dataTransfer.setData('text/plain', JSON.stringify({ itemIndex: index, item }));
    e.dataTransfer.effectAllowed = 'move';
}
  
export function handleDroppable(target, nextFunction) {
    target.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
    target.addEventListener('drop', (e) => {
        e.preventDefault();


        const itemData = JSON.parse(e.dataTransfer.getData('text/plain'));
        const { itemIndex, item } = itemData;

        console.log('Item:', item);
        console.log('Item Index:', itemIndex);

        nextFunction(target, item, itemIndex);
    })
}