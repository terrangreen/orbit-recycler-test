// randomGenerator.js
// Math to determine item probabilities

import { possibleSalvage } from "../resources/salvageResourcesData.js";

export function getRandomSpacejunkItemType() {
    const names = [
      'Communication Satellite',
      'Defunct Satellite',
      'GPS Satellite',
      'Weather Satellite',
      'Research Satellite'
    ];
    return names[Math.floor(Math.random() * names.length)];
  }
  
  export function getRandomSpacejunkItemOwner() {
    const owners = [
      'Company XYZ',
      'Government ABC',
      'Agency DEF', 
      'Private Enterprise GHI'
    ];
    return owners[Math.floor(Math.random() * owners.length)];
  }
  
  export function getRandomSpacejunkItemValue() {
    const gsoFee = 168000;
    const ngsoFee = 35600;
    const { gsoProbability } = calculateSatelliteProbabilities();
    const isGso = Math.random() < gsoProbability;
    return isGso ? gsoFee * 5 : ngsoFee * 5;
  }
  
  export function getRandomSalvageParts() {  
    return possibleSalvage.filter(() => Math.random() < 0.5).map(part => ({
      ...part,
      quantity: Math.floor(Math.random() * 5) + 1
    }));
  }
  
  function calculateSatelliteProbabilities() {
    const numGsoSatellites = 550;
    const numNgsoSatellites = 5500;
    const totalSatellites = numGsoSatellites + numNgsoSatellites;
    return { gsoProbability: numGsoSatellites / totalSatellites };
  }  