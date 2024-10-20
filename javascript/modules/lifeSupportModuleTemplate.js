// lifeSupportModuleTemplate.js

import { getState } from '../app/gameState.js';

export function loadLifeSupportContent() {
    const lifeSupportContent = document.getElementById('life-support-content');
    const lifeSupportResources = getState('lifeSupportResources');

    let lifeSupportHTML = '';
    Object.values(lifeSupportResources).forEach(item => {
        const rateClass = item.rate > 0 ? 'positive' : item.rate < 0 ? 'negative' : 'neutral';
        const formattedRate = item.rate > 0 ? `+${item.rate}` : `${item.rate}`;
        
        // Use valueId for displaying value in a separate span or similar
        lifeSupportHTML += `
            <div class="life-support-item">
                <i data-lucide="${item.iconType}" class="icon ${item.iconColor}"></i>
                <span class="capacity" id="${item.valueId}">${item.current} / ${item.storage}</span>
                <span class="rate ${rateClass}">${formattedRate}/s</span>
            </div>
        `;
    });

    lifeSupportContent.innerHTML = lifeSupportHTML;
    lucide.createIcons();
}