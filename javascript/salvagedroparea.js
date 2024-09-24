// salvagedroparea.js

export function loadSalvageDropAreaContent() {
    const inventoryContent = document.getElementById('salvage-area-content');
  
    const inventoryHTML = `
      <section class="salvageInventoryContainer">
        <div class="salvage-inventory">
            <div class="salvage-header">
                <div class="left-content"><i data-lucide="settings" class="icon white"></i>Process Salvage</div>
            </div>
            <div class="salvage-display-area">
                <div id="salvage-drop-area">
                    <!-- Inventory square to drop item to be salvaged -->
                </div>
                <div class="salvage-divider">|</div>
                <div id="salvage-inventory-grid">
                    <!-- Salvage parts will be displayed here -->
                </div>
                <div id="salvage-item-details">
                    <!-- Selected item details will appear here -->
                </div>
            </div>
        </div>
      </section>
    `;
  
    inventoryContent.innerHTML = inventoryHTML;
    lucide.createIcons();  // Initialize icons after content is inserted
  }