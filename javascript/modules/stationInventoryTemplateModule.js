// stationinventory.js


export function initializeStationInventoryTemplate() {
    const inventoryContent = document.getElementById('station-inventory-content');

    inventoryContent.classList.add('inventory-content');
  
    const inventoryHTML = `
        <div class="content-header">
            <i data-lucide="settings" class="icon white"></i>
            Station Inventory
            <span id="stationInventoryDisplay" class="spanValueDisplay">0 / 0</span>
        </div>
        <div id="station-inventory-grid">
            <!-- Inventory squares will be added dynamically -->
        </div>
    `;
  
    inventoryContent.innerHTML = inventoryHTML;
    lucide.createIcons();  // Initialize icons after content is inserted
  }