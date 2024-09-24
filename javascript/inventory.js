export function loadInventoryContent() {
    const inventoryContent = document.getElementById('inventory-content');

    const inventoryHTML = `
      <section id="wholeItemsInventory">
        <h3>Space Junk Inventory</h3>
        <div id="inventory-grid">
          <!-- Inventory squares will be added dynamically -->
        </div>
        <div id="item-details" class="item-details">
          <!-- Selected item details and salvage contents will appear here -->
        </div>
      </section>
    `;
  
    inventoryContent.innerHTML = inventoryHTML;
    lucide.createIcons();  // Initialize icons after content is inserted
}