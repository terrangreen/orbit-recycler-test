// inventory.js

export function loadSpaceJunkInventoryContent() {
    const inventoryContent = document.getElementById('inventory-content');
  
    const inventoryHTML = `
      <section id="wholeItemsInventory">
        <div class="inventory">
          <div class="left-content"><i data-lucide="satellite" class="icon white"></i>Whole Items</div>
          <div class="right-content"><span id="wholeItemsValue">0 / 0</span></div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Owner</th>
              <th>Value (SPC)</th>
            </tr>
          </thead>
          <tbody id="wholeItems">
            <!-- Whole items will be displayed here -->
          </tbody>
        </table>
      </section>
  
      <section id="fragmentsInventory">
        <div class="inventory">
          <div class="left-content"><i data-lucide="puzzle" class="icon white"></i>Fragments</div>
          <div class="right-content"><span id="fragmentsValue">0 / 0</span></div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Quantity</th>
              <th>Material</th>
            </tr>
          </thead>
          <tbody id="fragments">
            <!-- Fragments will be displayed here -->
          </tbody>
        </table>
      </section>
    `;
  
    inventoryContent.innerHTML = inventoryHTML;
    lucide.createIcons();  // Initialize icons after content is inserted
  }  