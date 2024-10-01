// stationResourcesModule.js

import { stationResourcesData } from '../resources/stationResourcesData.js';
import { getState } from '../app/gameState.js';

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
  const moduleContainer = document.getElementById('resources-content');

  stationResourcesData.forEach(resource => {
    const spanElement = document.getElementById(resource.valueId);

    // Gather the dynamic values required by this resource's template
    const values = gatherTemplateValues(resource.template);

    // Replace the placeholders with actual values
    const newValue = replacePlaceholders(resource.template, values);

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
      moduleContainer.appendChild(newResource);
    } else {
      // If the element exists, just update the value
      spanElement.textContent = newValue;
    }
  });

  lucide.createIcons();  // Initialize icons after content is inserted
}