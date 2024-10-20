// gameState.js

import { craftingRecipes } from "../resources/craftingRecipes.js";
import { possibleEquipment } from "../resources/equipmentData.js";
import { lifeSupportData } from "../resources/lifeSupportResourcesData.js";
import { possibleSalvage } from "../resources/salvageResourcesData.js";
import { possibleModules } from "../resources/stationModulesData.js";

let initialState = {
  money: 0,
  rawJunkLimit: 10,
  spacejunkItems: [],
  spacejunkItemsStorage: 0,
  holdItems: [],
  salvageLimit: 10,
  salvageItems: [],
  salvageContents: {},
  stationItems: [],
  stationItemsStorage: 0,
  stationItemsLimit: 20,
  knownMaterials: initialMaterials(),
  materialsStorage: {},
  defaultIcon: 'box',
  junkValuePerUnit: 100,
  privateSatelliteFee: 10000,
  governmentSatelliteFee: 15000,
  fragmentsRequiredForBag: 5,
  additionalRawJunkPerBag: 5,
  knownRecipes: initialRecipes(),
  stationModules: initialModules(),
  stationModulesLimit: 9,
  lifeSupportResources: initialLifeSupportResources()
}

let state = { ...initialState };

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
    id: 1,
    location: centerLocation,
    equipment: {
      interior: initialEquipment('interior'),
      exterior: initialEquipment('exterior')
    }
  }));
}

function initialEquipment(type) {
  const initialEquipmentNames = {
    interior: ['Hammock', 'Basic Life Support System', 'Food Storage', 'Airlock'],
    exterior: ['Solar Panels', 'Airlock']
  };

  // Specify the locations for the initial module in sequence
  const interiorLocations = ['back', 'left', 'right', 'front'];
  const exteriorLocations = ['left', 'front'];

  const locations = type === 'interior' ? interiorLocations : exteriorLocations;

  return possibleEquipment
    .filter(equipment => initialEquipmentNames[type].includes(equipment.name) && equipment.type.includes(type))
    .map((equipment, index) => ({
       ...equipment,
       location: locations[index % locations.length]
  }));
}

function initialLifeSupportResources() {
  // Create an object from lifeSupportData
  return lifeSupportData.reduce((acc, resource) => {
      acc[resource.type] = {
          storage: resource.storage,
          rate: resource.rate,
          current: resource.storage,
          iconType: resource.iconType,
          iconColor: resource.iconColor,
          valueId: `${resource.type.toLocaleLowerCase()}Value`
      };
      return acc;
  }, {});
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