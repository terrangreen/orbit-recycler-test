// lifeSupportModuleTemplate.js

import { getState } from '../app/gameState.js';

export function loadLifeSupportContent() {
    const lifeSupportContent = document.getElementById('life-support-content');
    const lifeSupportResources = getState('lifeSupportResources');

    lifeSupportContent.innerHTML = '';
    Object.entries(lifeSupportResources).forEach(([key, item]) => {
        const rateClass = item.rate > 0 ? 'positive' : item.rate < 0 ? 'negative' : 'neutral';
        const formattedRate = item.rate > 0 ? `+${item.rate}` : `${item.rate}`;

        // Create a unique id for each life-support-item
        const resourceId = `resource-${key.toLowerCase()}`;
        
        // Use valueId for displaying value in a separate span or similar
        lifeSupportContent.innerHTML += `
            <div class="life-support-item" id="${resourceId}">
                <i data-lucide="${item.iconType}" class="icon ${item.iconColor}"></i>
                <span class="capacity" id="${item.valueId}">${item.current} / ${item.storage}</span>
                <span class="rate ${rateClass}">${formattedRate}/s</span>
            </div>
        `;
    });
    
    lucide.createIcons();
}