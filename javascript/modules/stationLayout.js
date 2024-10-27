// stationLayout.js

import { getState } from "../app/gameState.js";
import { renderModule } from "../managers/stationManager.js";
import { updateStationLayout } from "../managers/updateInventory.js";

export function loadStationLayoutSection() {
    updateStationLayout();

    const modules = getState('stationModules');

    modules.forEach(module => {
        renderModule(module);
    });
}

export function loadStationLayoutContent() {
    const stationLayoutGrid = document.getElementById('station-layout-grid');

    // Example function to add a module to the grid
    function addModule(name, equipment) {
        const module = document.createElement('div');
        module.classList.add('grid-square', 'module');

        equipment.forEach(item => {
            const equipmentDiv = document.createElement('div');
            equipmentDiv.classList.add('equipment');
            equipmentDiv.textContent = item;
            module.appendChild(equipmentDiv);
        });

        stationLayoutGrid.appendChild(module);
    }

    // Add the initial module
    addModule('Starter Module', ['Hammock', 'Life Support', 'Solar Panel', 'Food Storage']);
}

// Update CSS variables for grid layout
function updateGridCSS(rows, cols) {
    document.documentElement.style.setProperty('--grid-rows', rows);
    document.documentElement.style.setProperty('--grid-columns', cols);
}

// Create the grid and place equipment
function initializeGrid(gridConfig) {
    updateGridCSS(gridConfig.rows, gridConfig.cols);
    createGrid(gridConfig.rows, gridConfig.cols);
    placeEquipment(gridConfig.equipment);
}

// Create dynamic grid squares
function createGrid(rows, cols) {
    const gridContainer = document.getElementById('dynamic-grid');
    gridContainer.innerHTML = '';

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const gridSquare = document.createElement('div');
            gridSquare.classList.add('grid-square');
            gridSquare.dataset.row = row;
            gridSquare.dataset.col = col;
            gridContainer.appendChild(gridSquare);
        }
    }
}

// Place equipment items within the grid based on specified positions
function placeEquipment(equipmentList) {
    equipmentList.forEach(equipment => {
        const { row, col } = equipment.position;
        const gridSquare = document.querySelector(`.grid-square[data-row="${row}"][data-col="${col}"]`);

        if (gridSquare) {
            const equipmentElement = document.createElement('div');
            equipmentElement.classList.add('equipment-item');
            equipmentElement.textContent = equipment.name;
            gridSquare.appendChild(equipmentElement);
        }
    });
}