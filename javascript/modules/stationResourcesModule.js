// stationResourcesModule.js

import { stationResourcesData } from '../resources/stationResourcesData.js';
import { getState } from '../app/gameState.js';
import { showTooltip } from '../app/tooltip.js';

// Utility function to extract the dynamic keys from the template and fetch values from the game state
function gatherTemplateValues(template) {
  // Regular expression to find all placeholders (e.g., ${wholeItems.length}, ${money})
  const placeholderRegex = /\$\{(\w+(\.\w+)*)\}/g;
  let match;
  const values = {};

  // Loop through all matches (e.g., wholeItems.length, money, fuel)
  while ((match = placeholderRegex.exec(template)) !== null) {
    const key = match[1];  // Extract the key without the ${} braces, e.g., 'wholeItems.length'

    // Split the key in case it has nested properties (like wholeItems.length)
    const keyParts = key.split('.');
    let stateValue = getState(keyParts[0]);  // Fetch the base value from the game state

    // Traverse nested properties if any (e.g., wholeItems.length)
    for (let i = 1; i < keyParts.length; i++) {
      stateValue = stateValue[keyParts[i]];
    }

    // Store the final value in the values object
    values[key] = stateValue;
  }

  return values;
}

// Utility function to replace placeholders in the template string using dynamic values
function replacePlaceholders(template, values) {
  return template.replace(/\$\{(\w+(\.\w+)*)\}/g, (_, key) => {
    return values[key] !== undefined ? values[key] : '';
  });
}

// This function dynamically adds or updates the resources in the UI
export function loadStationResources() {
  const moduleContainerTopRow = document.getElementById('station-resources-content-1');
  const moduleContainerBottomRow = document.getElementById('station-resources-content-2');
  const knownMaterials = getState('knownMaterials');

  // Clear the module container for re-render
  moduleContainerTopRow.innerHTML = ''; 
  moduleContainerBottomRow.innerHTML = '';

  // First line: Load the existing resources from stationResourcesData
  stationResourcesData.forEach(resource => {
    const spanElement = document.getElementById(resource.valueId);
    const values = gatherTemplateValues(resource.template);
    const newValue = replacePlaceholders(resource.template, values);

    const selectFields = {
      "Resource Type": resource.name || "Unknown Resource",
      "Inventory": newValue,
      // "Storage": resource.storage || "N/A"
    };

    // If the resource hasn't been created yet, create it
    if (!spanElement) {
      const newResource = document.createElement('div');
      newResource.classList.add('resource');

      const icon = document.createElement('i');
      icon.setAttribute('data-lucide', resource.iconType);
      icon.classList.add('icon', resource.color);

      const span = document.createElement('span');
      span.id = resource.valueId;
      span.textContent = newValue;

      newResource.appendChild(icon);
      newResource.appendChild(span);
      moduleContainerTopRow.appendChild(newResource);

      showTooltip(newResource, resource, selectFields);
    } else {
      // If the element exists, just update the value
      spanElement.textContent = newValue;
    }
  });
  
  // Second line: Load the discovered materials, applying the same formatting
  if (knownMaterials.length > 0) {
    knownMaterials.forEach(material => {
      ('material:', material);
      const spanElement = document.getElementById(material.valueId);

      const selectFields = {
        "Material Type": material.name,
        "Inventory": material.quantity
      };

      if (!spanElement) {
        const materialElement = document.createElement('div');
        materialElement.classList.add('resource');

        // Add material icon (optional, or customize if needed)
        const icon = document.createElement('i');
        icon.setAttribute('data-lucide', material.iconType);
        icon.classList.add('icon', material.color);

        const span = document.createElement('span');
        span.id = material.valueId;
        span.textContent = `${material.quantity}`;

        materialElement.appendChild(icon);
        materialElement.appendChild(span);
        moduleContainerBottomRow.appendChild(materialElement);

        showTooltip(materialElement, material, selectFields);
      }
    })
  }

  lucide.createIcons();
}