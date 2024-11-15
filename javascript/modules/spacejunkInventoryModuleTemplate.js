// spacejunkInventoryModuleTemplate.js

export function initializeSpacejunkInventoryTemplate() {
    const inventoryContent = document.getElementById('spacejunk-inventory-content');
  
    inventoryContent.classList.add('inventory-content');

    const inventoryHTML = `
      <div class="content-header">
        <i data-lucide="settings" class="icon white"></i> 
        Recovered Junk 
        <span id="spacejunkInventoryDisplay" class="spanValueDisplay">0 / 0</span>
      </div>
      <div id="spacejunk-inventory-grid">
        <!-- Inventory squares will be added dynamically -->
      </div>
     `;
  
    inventoryContent.innerHTML = inventoryHTML;
    lucide.createIcons();  // Initialize icons after content is inserted
  }