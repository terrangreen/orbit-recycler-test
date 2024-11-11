// stationManager.js

import { getState, setState, saveStateToLocalStorage } from '../app/gameState.js';
import { showTooltip } from '../app/tooltip.js';
import { possibleModules } from '../resources/stationModulesData.js';
import { activateEquipmentModule, resetEquipmentModule } from './equipmentManager.js';

export function createStationLayoutGrid(gridElement, gridSize) {
    gridElement.innerHTML = '';
  
    for (let y = -Math.floor(gridSize / 2); y <= Math.floor(gridSize / 2); y++) {
        for (let x = -Math.floor(gridSize / 2); x <= Math.floor(gridSize / 2); x++) {
            const square = document.createElement('div');
            square.classList.add('inventory-square');
            square.id = `square-${x}-${y}`;
            gridElement.appendChild(square);
        }
    }
}

export function placeModulesInGrid(gridElement, modules, selectFields = {}) {
    const defaultIcon = getState('defaultIcon');

    let selectedModule = null;

    modules.forEach((module, index) => {
        const { x, y } = module.location;
        const square = gridElement.querySelector(`#square-${x}-${y}`);

        if (square) {
            square.innerHTML = `<i data-lucide="${module.iconType || defaultIcon}" class="icon ${module.iconColor}"></i>`;

            const configurableIcon = getState('configurableIcon')
            const configIcon = `<i data-lucide="${configurableIcon}" class="configurable-icon"></i>`;
            square.innerHTML += configIcon;
        
            const fields = selectFields[index] || {};

            showTooltip(square, module, fields);

            // Event listener to activate module
            square.addEventListener('click', () => {
                if (selectedModule === square) {
                    selectedModule.classList.remove('selected-module');
                    selectedModule = null;
                    resetEquipmentModule();
                } else {
                    if (selectedModule) {
                        selectedModule.classList.remove('selected-module');
                    }
                    square.classList.add('selected-module');
                    selectedModule = square;
                    
                    activateEquipmentModule(module);
                }
            });

        } else {
            console.error(`Grid square with ID square-${x}-${y} not found within the specified gridElement.`);
        }
    });

    lucide.createIcons();
}

export function addNewModule(moduleName, location) {
  const stationModules = getState('stationModules');
  const moduleTemplate = possibleModules.find(module => module.name === moduleName);

  if (moduleTemplate) {
    const newModule = {
      ...moduleTemplate,
      id: stationModules.length + 1,
      location: location || { row: 0, col: 0 }
    };

    stationModules.push(newModule);
    setState('stationModules', stationModules);
    saveStateToLocalStorage();
  } else {
    console.error(`Module with name ${moduleName} not found in possibleModules.`);
  }
}

export function renderModule(module) {
    const { x, y } = module.location;
    const stationModulesLimit = getState('stationModulesLimit');
    let gridSize = Math.sqrt(stationModulesLimit);

    // Assuming x, y maps directly to grid rows and columns:
    const gridRow = Math.floor(gridSize / 2) + y;
    const gridCol = Math.floor(gridSize / 2) + x;
    
    const gridSquare = document.querySelector(`.grid-square[data-row="${gridRow}"][data-col="${gridCol}"]`);
    if (gridSquare) {
      gridSquare.innerHTML = `<div class="module">${module.name}</div>`;
    }
}

export function calculateResourceTotals() {
    
}