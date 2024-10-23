// salvageModuleTemplate.js

export function initializeSalvageAreaTemplate() {
    const inventoryContent = document.getElementById('salvage-area-content');

    inventoryContent.classList.add('inventory-content');
  
    const inventoryHTML = `
        <div class="content-header">
            <i data-lucide="settings" class="icon white"></i>
            Process Salvage
        </div>
        <div class="salvage-display-area">
            <div class="top-row-container">
                <div id="salvage-drop-area">
                    <!-- Inventory square to drop item to be salvaged -->
                </div>
                <div id="salvage-drop-undo">
                    <button id="salvageUndoBtn" disabled=true>
                        <i data-lucide="undo-2" class="icon white"></i>
                    </button>
                </div>
            </div>
            <div id="salvage-inventory-grid">
                <!-- Salvage parts will be displayed here -->
            </div>
            <div class="salvage-loot-all">
                <button id="salvageLootAllBtn" disabled="true">
                    <i data-lucide="package-check" class="icon white"></i>
                    Loot All
                </button>
            </div>
        </div>
    `;
  
    inventoryContent.innerHTML = inventoryHTML;
    lucide.createIcons();  // Initialize icons after content is inserted
  }

export function initializeSalvageAreaTemplate2() {
    const inventoryContent = document.getElementById('salvage-area-content');

    inventoryContent.classList.add('inventory-content');
  
    const inventoryHTML = `
        <div class="content-header">
            <i data-lucide="settings" class="icon white"></i>
            Process Salvage
        </div>
        <div class="salvage-display-area">
            <div id="salvage-drop-area">
                <!-- Inventory square to drop item to be salvaged -->
            </div>
            <div id="salvage-drop-undo">
                <button id="salvageUndoBtn" disabled=true><i data-lucide="undo-2" class="icon white"></i></button>
            </div>
            <div class="salvage-divider">|</div>
            <div id="salvage-inventory-grid">
                <!-- Salvage parts will be displayed here -->
            </div>
        </div>
    `;
  
    inventoryContent.innerHTML = inventoryHTML;
    lucide.createIcons();  // Initialize icons after content is inserted
  }