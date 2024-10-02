// dragHandler.js

export function handleDragStart(e, item, index) {
    console.log('Dragging item:', item);
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