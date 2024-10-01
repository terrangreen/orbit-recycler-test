// stationinventory.js


export function initializeStationInventoryTemplate() {
    const inventoryContent = document.getElementById('station-inventory-content');
  
    const inventoryHTML = `
        <section id="stationInventory">
            <div class="inventory">
                <div class="left-panel">
                    <div class="header">
                        <div class="left-content"><i data-lucide="settings" class="icon white"></i>Station Inventory</div>
                        <div class="right-content"><span id="stationInventoryDisplay">0 / 0</span></div>
                    </div>
                    <div id="station-inventory-grid">
                        <!-- Inventory squares will be added dynamically -->
                    </div>
                </div>
                <div class="right-panel">
                    <div id="station-item-details">
                        <!-- Selected item details will appear here -->
                    </div>
                </div>
            </div>
        </section>
    `;
  
    inventoryContent.innerHTML = inventoryHTML;
    lucide.createIcons();  // Initialize icons after content is inserted
  }