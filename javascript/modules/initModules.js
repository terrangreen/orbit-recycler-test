// initModules.js

import { initializeSpacejunkInventoryTemplate } from '././spacejunkInventoryModuleTemplate.js';
import { initializeSalvageAreaTemplate } from '././salvageModuleTemplate.js';
import { initializeStationInventoryTemplate } from './stationInventoryModuleTemplate.js';
import { initializeStationLayoutTemplate } from './stationLayoutModuleTemplate.js';

export function initializeModules() {
  initializeStationInventoryTemplate();
  initializeSpacejunkInventoryTemplate();
  initializeSalvageAreaTemplate();
  initializeStationLayoutTemplate();
}
