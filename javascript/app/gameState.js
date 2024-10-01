// gameState.js

let state = {
    money: 0,
    rawJunkLimit: 10,
    spacejunkItems: [],
    holdItems: [],
    salvageLimit: 10,
    salvageItems: [],
    salvageContents: {},
    stationItems: [],
    stationItemsLimit: 10,
    defaultIcon: 'box',
    junkValuePerUnit: 100,
    privateSatelliteFee: 10000,
    governmentSatelliteFee: 15000,
    fragmentsRequiredForBag: 5,
    additionalRawJunkPerBag: 5
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