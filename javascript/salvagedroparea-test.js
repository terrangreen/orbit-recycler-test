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
                Display stuff here
            </div>
        </div>
      </section>
    `;
  
    inventoryContent.innerHTML = inventoryHTML;
    lucide.createIcons();  // Initialize icons after content is inserted
  }