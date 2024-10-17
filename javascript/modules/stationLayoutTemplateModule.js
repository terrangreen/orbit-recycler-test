// stationLayoutTemplateModule.js

import { getState } from "../app/gameState.js";
import { createStationLayoutGrid } from "../managers/stationManager.js";

export function initializeStationLayoutTemplate() {
    const inventoryContent = document.getElementById('station-layout-content');
  
    inventoryContent.classList.add('inventory-content');

    const inventoryHTML = `
      <div class="content-header">
        <i data-lucide="settings" class="icon white"></i> 
        Station Layout
        <span id="stationModulesDisplay" class="spanValueDisplay">0 / 0</span>
      </div>
      <div id="station-layout-grid">
        <!-- Inventory squares will be added dynamically -->
      </div>
    `;
  
    inventoryContent.innerHTML = inventoryHTML;

    const stationLayoutGrid = document.getElementById('station-layout-grid');
    const stationGridSize = Math.sqrt(getState('stationModulesLimit'));

    createStationLayoutGrid(stationLayoutGrid, stationGridSize);
    lucide.createIcons();
  }

  // stationLayoutTemplateModule.js
