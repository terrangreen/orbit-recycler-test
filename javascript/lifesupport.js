export function loadLifeSupportModule() {
    const lifeSupportContent = document.getElementById('life-support-content');

    const lifeSupportHTML = `
        <div id="power-generation">
            <h4>Power Generation</h4>
            <div class="power-item">
                <i data-lucide="zap" class="icon white"></i>
                <span>Solar Panel (1 unit)</span>
            </div>
        </div>

        <div id="oxygen-management">
            <h4>Oxygen Management</h4>
            <div class="oxygen-item">
                <i data-lucide="air-vent" class="icon white"></i>
                <span>Oxygen Converter</span>
            </div>
        </div>

        <div id="food-management">
            <h4>Food Management</h4>
            <div class="food-item">
                <i data-lucide="utensils" class="icon white"></i>
                <span>Food Rations (30 Days)</span>
            </div>
        </div>

        <div id="water-management">
            <h4>Water Management</h4>
            <div class="water-item">
                <i data-lucide="droplet" class="icon white"></i>
                <span>Water Supply</span>
            </div>
        </div>
    `;

    lifeSupportContent.innerHTML = lifeSupportHTML;
    lucide.createIcons();  // Initialize icons
}