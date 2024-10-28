// equipmentManager.js

import { getState, setState } from '../app/gameState.js';
import { showToastMessage } from '../app/toast.js';
import { showTooltip } from '../app/tooltip.js';
import { handleDroppable } from './dragManager.js';
import { updateStationInventory } from './updateInventory.js';

export function activateEquipmentModule(module) {
    const equipment = module.equipment;
    
        enableEquipmentTabs();

        // Optionally handle the tab switching between Interior and Exterior
        const interiorTab = document.getElementById('interior-tab');
        const exteriorTab = document.getElementById('exterior-tab');

        // Activate the Interior tab by default
        showEquipment(module, equipment.interior, 'interior');
        interiorTab.classList.add('active');
        exteriorTab.classList.remove('active');
        document.getElementById('equipment-interior').classList.add('active');
        document.getElementById('equipment-exterior').classList.remove('active');

        interiorTab.addEventListener('click', () => {
            showEquipment(module, equipment.interior, 'interior');
        });

        exteriorTab.addEventListener('click', () => {
            showEquipment(module, equipment.exterior, 'exterior');
        });
}

function createFaceSquares(module, section, equipmentContent) {
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

        let additionalData = { module, section };

        handleDroppable(square, moveStationToEquipment, additionalData);

        const tooltipFields = { "Position": face.name };
        showTooltip(square, null, tooltipFields);
    });

    equipmentContent.appendChild(layout);
}

function placeEquipmentInFaces(equipmentList, section) {
    const equipmentContent = document.getElementById(`equipment-${section}`);

    equipmentList.forEach((equipment, index) => {
        placeEquipmentItem(equipmentContent, equipment);
    })

    lucide.createIcons();
}

function placeEquipmentItem(equipmentContent, equipment) {
    const defaultIcon = getState('defaultIcon');
    const square = equipmentContent.querySelector(`#square-${equipment.location}`);
    square.classList.add('occupied');

    if (square) {
        square.innerHTML = `<i data-lucide="${equipment.iconType || defaultIcon}" class="icon ${equipment.iconColor}"></i>`;

        const tooltipFields = {
            Position: equipment.location.charAt(0).toUpperCase() + equipment.location.slice(1),
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
}

// Main function to show equipment
function showEquipment(module, equipmentList, section) {
    const equipmentContent = document.getElementById(`equipment-${section}`);

    createFaceSquares(module, section, equipmentContent);
    placeEquipmentInFaces(equipmentList, section);
}

function enableEquipmentTabs() {
    const tabButtons = document.querySelectorAll('.equipment-tab-button');

    tabButtons.forEach(button => {
        button.classList.remove('disabled');
        button.removeAttribute('disabled');
    });

    const interiorTab = document.getElementById('interior-tab');
    const exteriorTab = document.getElementById('exterior-tab');
  
    interiorTab.addEventListener('click', () => activateTab('interior', interiorTab, exteriorTab));
    exteriorTab.addEventListener('click', () => activateTab('exterior', exteriorTab, interiorTab));
}

function activateTab(section, activeTab, inactiveTab) {
    activeTab.classList.add('active');
    inactiveTab.classList.remove('active');
    document.getElementById(`equipment-${section}`).classList.add('active');
    document.getElementById(`equipment-${inactiveTab.id.replace('-tab', '')}`).classList.remove('active');
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

export function moveStationToEquipment(target, item, additionalData) {
    let stationModules = getState('stationModules');
    let stationInventory = getState('stationInventory') || [];
    const equipmentContent = document.getElementById(`equipment-${additionalData.section}`);

    const moduleId = additionalData.module.id;
    const module = stationModules.find(module => module.id === moduleId);

    let equipmentItems = module.equipment[additionalData.section];

    if (!target.classList.contains('occupied')) {
        // Update the item in station items
        stationInventory = stationInventory.map(i => {
            if (i.id === item.id ) {
                return null;
            }
            return i;
        }).filter(i => i != null);
        
        // Add the item to the equipment items
        const newItem = {
            ...item,
            location: target.id.replace('square-', '')
        }
        equipmentItems.push(newItem);

        module.equipment[additionalData.section] = equipmentItems;

        setState('stationModules', stationModules);
        setState('stationInventory', stationInventory);
        
        placeEquipmentItem(equipmentContent, newItem);
        updateStationInventory();

        showToastMessage(`${newItem.name} installed successfully`, "success");

        lucide.createIcons();
    } else {
        showToastMessage('This slot is already occupied', "error");
    }
}