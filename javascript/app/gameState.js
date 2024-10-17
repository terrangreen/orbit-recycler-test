// gameState.js

import { craftingRecipes } from "../resources/craftingRecipes.js";
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
  stationModulesLimit: 9
  // exteriorComponents: initialExteriorComponents()
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
  // const centerLocation = { row: Math.floor(gridSize / 2), col: Math.floor(gridSize / 2) };
  const centerLocation = { x: 0, y: 0, z: 0 };
  let initialModuleName = ['Used SpaceX Dragon Capsule'];

  return possibleModules
  .filter(module => initialModuleName.includes(module.name))
  .map((module, index) => ({
    ...module,
    id: 1,
    location: centerLocation
  }));
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
  state = { ...initialState };
  saveStateToLocalStorage();
  location.reload();
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