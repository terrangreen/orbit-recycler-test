// equipmentManager.js

import { getState, setState } from '../app/gameState.js';
import { showToastMessage } from '../app/toast.js';
import { showTooltip } from '../app/tooltip.js';
import { handleDroppable } from './dragManager.js';
import { autoSave } from './gameLoop.js';
import { markRecalculationNeeded } from './lifeSupportManager.js';
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

        handleDroppable(square, moveStationToEquipment, additionalData, );

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

    let selectedModule = null;

    if (square) {
        square.innerHTML = `<i data-lucide="${equipment.iconType || defaultIcon}" class="icon ${equipment.iconColor}"></i>`;

        if (equipment.configurable) {
            const configurableIcon = getState('configurableIcon')
            const configIcon = `<i data-lucide="${configurableIcon}" class="configurable-icon"></i>`;
            square.innerHTML += configIcon;

            square.addEventListener('click', () => {
                const equipmentLayout = document.querySelector('equipment-layout');

                if (selectedModule === square) {
                    selectedModule.classList.remove('selected-module');
                    selectedModule = null;

                    const existingConfigDiv = equipmentLayout.querySelector('.equipment-config-options');
                    if (existingConfigDiv) {
                        existingConfigDiv.remove();
                    }
                } else {
                    if (selectedModule) {
                        selectedModule.classList.remove('selected-module');

                        const existingConfigDiv = equipmentLayout.querySelector('.equipment-config-options');
                        if (existingConfigDiv) {
                            existingConfigDiv.remove();
                        }
                    }
                    square.classList.add('selected-module');
                    selectedModule = square;

                    showConfigOptions(equipment);
                }
            });
        }

        const tooltipFields = {
            Position: `${equipment.location.charAt(0).toUpperCase() + equipment.location.slice(1)} (${equipment.detachable ? 'detachable' : 'fixed'})`,
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

function showConfigOptions(equipment) {
    const sharedStatus = getState('sharedStatus');
    const activeTab = document.querySelector('.equipment-tab-content.active .equipment-layout');
    if (!activeTab) return;
    // const equipmentLayout = document.querySelector('.equipment-layout');

    removeConfigOptions();

    const configDiv = document.createElement('div');
    configDiv.classList.add('equipment-config-options');

    if (equipment.status !== undefined) {
        const statusToggle = document.createElement('div')
        statusToggle.className = "status-toggle";

        const label = document.createElement("label");
        label.className = "switch";

        const input = document.createElement("input");
        input.type = "checkbox";

        console.log('equipment:', equipment);
        console.log('equipment.sharedStatus:', equipment.sharedStatus);
        console.log('sharedStatus:', sharedStatus);

        if (equipment.sharedStatus !== undefined) {
            equipment.status = sharedStatus[equipment.sharedStatus];
        }
        input.checked = equipment.status;

        // Event listener to update equipment.status when the checkbox is toggled
        input.addEventListener('change', () => {
            equipment.status = input.checked;

            if (equipment.sharedStatus !== undefined) {
                sharedStatus[equipment.sharedStatus] = equipment.status;
            }

            // Optionally update class or styling based on the new status
            label.classList.toggle('status-on', equipment.status);
            label.classList.toggle('status-off', !equipment.status);
        });
        
        if (equipment.statusLock) {
            input.disabled = true;
        }

        const slider = document.createElement("span");
        slider.className = "slider";

        label.appendChild(input);
        label.appendChild(slider);
        label.classList.add(`status-${equipment.status ? 'on' : 'off'}`);

        statusToggle.appendChild(label);
        configDiv.appendChild(statusToggle);
        
        activeTab.appendChild(configDiv);
    }

    if (equipment.storage) {
        const toggleDiv = document.createElement('div');
        toggleDiv.id = 'toggle-container';

        const storageLabel = document.createElement('label');
        storageLabel.textContent = 'Storage:';

        const dropdown = document.createElement('select');
        const spacejunkOption = document.createElement('option');
        spacejunkOption.value = 'spacejunk';
        spacejunkOption.textContent = 'Spacejunk';

        const stationOption = document.createElement('option');
        stationOption.value = 'station';
        stationOption.textContent = 'Station';

        dropdown.appendChild(spacejunkOption);
        dropdown.appendChild(stationOption);

        // Set the dropdown default value based on the equipment storage type
        dropdown.value = equipment.storageType || 'spacejunk'; // Defaults to 'spacejunk'

        // Disable dropdown if storage limit condition is met
        const stationInventoryLimit = getState('stationInventoryLimit');
        const stationInventory = getState('stationInventory');
        let canMove = (stationInventoryLimit - stationInventory.length) >= equipment.storage.inventory;
        if (canMove) {
            dropdown.disabled = true;
        } else {
            dropdown.disabled = false;
        }

        // Handle change in storage type
        dropdown.addEventListener('change', function() {
            equipment.storageType = dropdown.value; // Update the storage type
        });

        // Add the label and dropdown to the toggle container
        toggleDiv.appendChild(storageLabel);
        toggleDiv.appendChild(dropdown);

        configDiv.appendChild(toggleDiv); // Add the storage options to the config div
    }

    // Append the entire config div to the equipment tab content or the desired container
    activeTab.appendChild(configDiv);
}

// Utility function to remove existing config options
function removeConfigOptions() {
    const existingConfigDiv = document.querySelector('.equipment-config-options');
    if (existingConfigDiv) {
        existingConfigDiv.remove();
    }
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

    removeConfigOptions();
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

    if (target.id === 'station-inventory-grid') {
        return;
    }
    
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

        delete newItem.sourceInventoryId;
        equipmentItems.push(newItem);
        module.equipment[additionalData.section] = equipmentItems;

        setState('stationModules', stationModules);
        setState('stationInventory', stationInventory);
        
        placeEquipmentItem(equipmentContent, newItem);
        updateStationInventory();
        markRecalculationNeeded();

        autoSave();

        showToastMessage(`${newItem.name} installed successfully`, "success");

        lucide.createIcons();
    } else {
        showToastMessage('This slot is already occupied', "error");
    }
}