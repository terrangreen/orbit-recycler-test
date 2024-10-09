// gameState.js

import { craftingRecipes } from "../resources/craftingRecipes.js";
import { possibleSalvage } from "../resources/salvageResourcesData.js";

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
    knownRecipes: initialRecipes()
}

let state = { ...initialState };

// function initialMaterials() {
//   let initialMaterialTypes = ['kevlar', 'steel'];
//   return possibleSalvage
//   .filter(item => initialMaterialTypes.includes(item.material))
//   .map(item => ({ ...item, quantity: 0}));
// }

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