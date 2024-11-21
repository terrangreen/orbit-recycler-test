// gameState.js

import { craftingRecipes } from "../resources/craftingRecipes.js";
import { initialCrewMembers } from "../resources/crewMembersData.js";
import { possibleEquipment } from "../resources/equipmentData.js";
import { lifeSupportData } from "../resources/lifeSupportResourcesData.js";
import { purchasableItems } from "../resources/purchasableItems.js";
import { possibleSalvage } from "../resources/salvageResourcesData.js";
import { possibleModules } from "../resources/stationModulesData.js";
import { applyScheme, colorSchemes } from "./colorSchemes.js";

let initialState = {
  tickCount: 0,
  gameTime: new Date(Date.UTC(2025, 10, 16, 12, 0)),
  money: 0,
  rawJunkLimit: 10,
  spacejunkItems: [],
  spacejunkItemsStorage: 0,
  holdItems: [],
  salvageLimit: 10,
  salvageItems: [],
  salvageContents: {},
  stationInventory: [],
  // stationInventory: initialInventory(),
  stationInventoryStorage: 0,
  stationInventoryLimit: 20,
  knownMaterials: initialMaterials(),
  materialsStorage: {},
  defaultIcon: 'box',
  configurableIcon: 'cog',
  junkValuePerUnit: 100,
  privateSatelliteFee: 10000,
  governmentSatelliteFee: 15000,
  fragmentsRequiredForBag: 5,
  additionalRawJunkPerBag: 5,
  knownRecipes: initialRecipes(),
  stationModules: initialModules(),
  existingEquipmentCounts: {},
  stationModulesLimit: 9,
  lifeSupportResources: initialLifeSupportResources(),
  crewMembers: initialCrewMembers,
  sharedStatus: {
    airlock: true,
    hatch: true,
  },
  colorScheme: initialColorScheme()
}

let state = { ...initialState };

// Set up knownMaterials with specified quantities
function initialInventory() {
  let initialInventoryItems = [ 
    { name: 'Oxygen Canister', quantity: 3 },
    { name: 'Food', quantity: 405 }
  ];

  return purchasableItems
    .filter(item => initialInventoryItems.some(initial => initial.name === item.name)) // Match by name
    .map(item => {
      const initialItem = initialInventoryItems.find(initial => initial.name === item.name); // Find the matching item
      return {
        ...item,
        quantity: initialItem ? initialItem.quantity : 0 // Set the quantity
      };
  });
}

function initialMaterials() {
  // Define initial quantities for testing purposes
  const initialMaterialQuantities = {
    kevlar: 10,
    steel: 20,
    copper: 15,
  };

  // Set up knownMaterials with specified quantities
  return possibleSalvage
    .filter(item => Object.keys(initialMaterialQuantities).includes(item.material))
    .map(item => ({
      ...item,
      quantity: initialMaterialQuantities[item.material] || 0
    }));
}

function initialRecipes() {
  let initialRecipeNames = ['Storage Bag'];
  return craftingRecipes
  .filter(recipe => initialRecipeNames.includes(recipe.name));
}

function initialModules() {
  const gridSize = 3;
  const centerLocation = { x: 0, y: 0, z: 0 };
  let initialModuleName = ['Used SpaceX Dragon Capsule'];

  return possibleModules
  .filter(module => initialModuleName.includes(module.name))
  .map((module, index) => ({
    ...module,
    id: generateUniqueId(module),
    location: centerLocation,
    equipment: {
      interior: initialEquipment('interior'),
      exterior: initialEquipment('exterior')
    }
  }));
}

function initialEquipment(section) {
  const initialEquipmentItems = {
    interior: [
      { name: 'Hammock', location: 'back' },
      { name: 'ECLSS', location: 'bottom' },
      { name: 'Food Storage', location: 'right' },
      { name: 'Airlock', location: 'top' },
      { name: 'Hatch', location: 'front' }
    ],
    exterior: [
      { name: 'Solar Panels', location: 'left' },
      { name: 'Solar Panels', location: 'right' },
      { name: 'Airlock', location: 'top' },
      { name: 'Draco (RCS)', location: 'back' },
      { name: 'Hatch', location: 'front' },
      { name: 'Lithium-Ion Battery Pack', location: 'bottom' }
    ]
  };

  // Select the correct array based on the section
  const itemsForSection = initialEquipmentItems[section];

  return itemsForSection.map(item => {
    // Find the equipment data based on name and section
    const equipment = possibleEquipment.find(e => e.name === item.name && e.section.includes(section));

    if (!equipment) return null; // Skip if equipment not found in possibleEquipment

    return {
      ...equipment,
      id: generateUniqueId(equipment),
      location: item.location
    };
  }).filter(Boolean); // Filter out any null values
}

function initialLifeSupportResources() {
  // Create an object from lifeSupportData
  return lifeSupportData.reduce((acc, resource) => {
      acc[resource.name] = {
        type: resource.type,
        storage: resource.storage,
        rate: resource.rate,
        current: resource.current,
        iconType: resource.iconType,
        iconColor: resource.iconColor,
        valueId: `${resource.type}Value`,
        rateId: `${resource.type}Rate`
      };
      return acc;
  }, {});
}

export function initialColorScheme() {
  applyScheme(colorSchemes.default);
}

function generateUniqueId(target, itemList = {}) {
  const itemsArray = Object.values(itemList);
  const currentTypeCount = itemsArray.filter(
    item => item.keyName === target.keyName
  ).length;

  return `${target.keyName}-${currentTypeCount + 1}`;
}

// Utility function to save the state to localStorage
export function saveStateToLocalStorage() {
  localStorage.setItem('gameState', JSON.stringify(state));
}

// Utility function to load the state from localStorage
export function loadStateFromLocalStorage() {
  const savedState = localStorage.getItem('gameState');
  if (savedState) {
    state = JSON.parse(savedState);
  }
}

export function resetGameState() {
  const userConfirmed = confirm("Are you sure you want to reset the game? This will erase your progress.");

  if (userConfirmed) {
    localStorage.removeItem('gameState');
    state = { ...initialState };
    saveStateToLocalStorage();
    location.reload();
  }
}

// Getter and setter functions
export function getState(key) {
    return state[key];
}
  
export function setState(key, value) {
  if (state.hasOwnProperty(key)) {
    state[key] = value;
  } else {
    console.error(`State key "${key}" does not exist.`);
  }
}

export function incrementState(key, amount) {
  if (typeof state[key] === 'number') {
    state[key] += amount;
  } else {
    console.error(`State key "${key}" is not a number.`);
  }
}

export function removeFromStateArray(key, value) {
  const stateArray = state[key];
  const index = stateArray.indexOf(value);
  if (index > -1) {
    stateArray.splice(index, 1)
  }
}