// lifeSupportModuleTemplate.js

import { lifeSupportData } from '../resources/lifesupportResourcesData.js'; // Import lifeSupportData

export function loadLifeSupportContent() {
    const lifeSupportContent = document.getElementById('life-support-content');

    let lifeSupportHTML = '';
    lifeSupportData.forEach(item => {
        const rateClass = item.rate > 0 ? 'positive' : item.rate < 0 ? 'negative' : 'neutral';
        lifeSupportHTML += `
            <div class="life-support-item">
                <i data-lucide="${item.icon}" class="icon ${item.iconColor}"></i>
                <span class="rate ${rateClass}">${item.rate}/s</span>
                <span class="capacity">${item.current} / ${item.limit}</span>
            </div>
        `;
    });

    lifeSupportContent.innerHTML = lifeSupportHTML;
    lucide.createIcons();  // Initialize icons
}