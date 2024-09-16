export function loadCraftingContent() {
    const craftingContent = document.getElementById('crafting-content');
  
    const craftingHTML = `
      <div class="craft-item">
        <button id="craftBagBtn" disabled>Craft Kevlar Bag</button>
        <span class="craft-requirements">Requires: 5 Kevlar</span>
      </div>
      <div class="craft-item">
        <button id="craftSteelPlatingBtn" disabled>Craft Steel Plating</button>
        <span class="craft-requirements">Requires: 4 Steel</span>
      </div>
      <div class="craft-item">
        <button id="craftEngineModuleBtn" disabled>Craft Engine Module</button>
        <span class="craft-requirements">Requires: 10 Titanium</span>
      </div>
    `;
  
    craftingContent.innerHTML = craftingHTML;
    lucide.createIcons(); // Initialize icons after content is inserted
  }  