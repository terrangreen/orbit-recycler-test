// spacejunkinventory.js

export function initializeSpacejunkInventoryTemplate() {
  const inventoryContent = document.getElementById('spacejunk-inventory-content');

  const inventoryHTML = `
    <section class="spacejunkItemsInventory">
      <div class="inventory">
        <div class="left-panel">
          <div class="header">
            <div class="left-content"><i data-lucide="settings" class="icon white"></i>Recovered Junk</div>
            <div class="right-content"><span id="spacejunkInventoryDisplay">0 / 0</span></div>
          </div>
          <div id="spacejunk-inventory-grid">
            <!-- Inventory squares will be added dynamically -->
          </div>
        </div>
        <div class="right-panel">
          <div id="spacejunk-item-details">
            <!-- Selected item details will appear here -->
          </div>
        </div>
      </div>
    </section>
  `;

  inventoryContent.innerHTML = inventoryHTML;
  lucide.createIcons();  // Initialize icons after content is inserted
}