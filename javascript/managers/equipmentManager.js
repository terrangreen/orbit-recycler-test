// equipmentManager.js

import { getState } from '../app/gameState.js';
import { showTooltip } from '../app/tooltip.js';

export function activateEquipmentModule(module) {
    const equipment = module.equipment;
    
        enableEquipmentTabs();

        // Optionally handle the tab switching between Interior and Exterior
        const interiorTab = document.getElementById('interior-tab');
        const exteriorTab = document.getElementById('exterior-tab');

        // Activate the Interior tab by default
        showEquipment(equipment.interior, 'interior');
        interiorTab.classList.add('active');
        exteriorTab.classList.remove('active');
        document.getElementById('equipment-interior').classList.add('active');
        document.getElementById('equipment-exterior').classList.remove('active');

        interiorTab.addEventListener('click', () => {
            showEquipment(equipment.interior, 'interior');
        });

        exteriorTab.addEventListener('click', () => {
            showEquipment(equipment.exterior, 'exterior');
        });
}

function createFaceSquares(equipmentContent) {
    // Clear existing content
    equipmentContent.innerHTML = '';

    const layout = document.createElement('div');
    layout.classList.add('equipment-layout');

    // Define the grid faces
    const faces = [
        { id: 'top', name: 'Top' },
        { id: 'left', name: 'Left' },
        { id: 'front', name: 'Front' },
        { id: 'right', name: 'Right' },
        { id: 'bottom', name: 'Bottom' },
        { id: 'back', name: 'Back' }
    ];

    // Create a square for each face
    faces.forEach(face => {
        const square = document.createElement('div');
        square.classList.add('inventory-square');
        square.id = `square-${face.id}`;
        layout.appendChild(square);
    });

    equipmentContent.appendChild(layout);
}

function placeEquipmentInFaces(equipmentList, section) {
    const defaultIcon = getState('defaultIcon');
    const equipmentContent = document.getElementById(`equipment-${section}`);

    equipmentList.forEach((equipment, index) => {
        const square = equipmentContent.querySelector(`#square-${equipment.location}`);
        
        if (square) {
            square.innerHTML = `<i data-lucide="${equipment.iconType || defaultIcon}" class="icon ${equipment.iconColor}"></i>`;

            const tooltipFields = {
                Name: equipment.name,
                Description: equipment.description || 'No description available.'
            };

            // Add utility rates to tooltip
            if (equipment.utilityRate) {
                Object.entries(equipment.utilityRate).forEach(([key, value]) => {
                    if (value != null) {
                        const rateClass = value > 0 ? 'positive' : value < 0 ? 'negative' : 'neutral';
                        const formattedRate = value > 0 ? `+${value}` : `${value}`;
                        tooltipFields[`${key.charAt(0).toUpperCase() + key.slice(1)} Rate`] = `<span class="rate ${rateClass}">${formattedRate}/s</span>`;
                    }
                });
            }

            showTooltip(square, equipment, tooltipFields);
        }
    })

    lucide.createIcons();
}

// Main function to show equipment
function showEquipment(equipmentList, section) {
    const equipmentContent = document.getElementById(`equipment-${section}`);

    createFaceSquares(equipmentContent); // Step 1: Create face squares
    placeEquipmentInFaces(equipmentList, section); // Step 2: Place equipment in the squares
}

function enableEquipmentTabs() {
    const tabButtons = document.querySelectorAll('.equipment-tab-button');

    tabButtons.forEach(button => {
        button.classList.remove('disabled');
        button.removeAttribute('disabled');
    });

    const interiorTab = document.getElementById('interior-tab');
    const exteriorTab = document.getElementById('exterior-tab');
    const tabContents = document.querySelectorAll('.equipment-tab-contents');
  
    interiorTab.addEventListener('click', () => {
        interiorTab.classList.add('active');
        exteriorTab.classList.remove('active');
        document.getElementById('equipment-interior').classList.add('active');
        document.getElementById('equipment-exterior').classList.remove('active');
    });

    // Event listeners for Exterior tab
    exteriorTab.addEventListener('click', () => {
        exteriorTab.classList.add('active');
        interiorTab.classList.remove('active');
        document.getElementById('equipment-exterior').classList.add('active');
        document.getElementById('equipment-interior').classList.remove('active');
    });
}

// Function to disable tabs
export function disableEquipmentTabs() {
    const tabButtons = document.querySelectorAll('.equipment-tab-button');
    tabButtons.forEach(button => {
        button.classList.add('disabled');
        button.setAttribute('disabled', 'true');
    });
}

export function resetEquipmentModule() {
    // Clear the content of the interior and exterior equipment sections
    const interiorContent = document.getElementById('equipment-interior');
    const exteriorContent = document.getElementById('equipment-exterior');

    interiorContent.innerHTML = '';
    exteriorContent.innerHTML = '';

    // Optionally disable the equipment tabs again
    const tabButtons = document.querySelectorAll('.equipment-tab-button');
    disableEquipmentTabs();

    // Reset active classes
    tabButtons.forEach(button => button.classList.remove('active'));
    document.querySelectorAll('.equipment-tab-content').forEach(content => content.classList.remove('active'));
}