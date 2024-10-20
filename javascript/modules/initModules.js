// initModules.js

import { initializeSpacejunkInventoryTemplate } from '././spacejunkInventoryModuleTemplate.js';
import { initializeSalvageAreaTemplate } from '././salvageModuleTemplate.js';
import { initializeStationInventoryTemplate } from './stationInventoryModuleTemplate.js';
import { initializeStationLayoutTemplate } from './stationLayoutModuleTemplate.js';
import { initializeEquipmentLayoutTemplate } from './equipmentModuleTemplate.js';
// import { disableEquipmentTabs } from '../managers/equipmentManager.js';

export function initializeModules() {
  initializeStationInventoryTemplate();
  initializeSpacejunkInventoryTemplate();
  initializeSalvageAreaTemplate();
  initializeStationLayoutTemplate();
  initializeEquipmentLayoutTemplate();
  // disableEquipmentTabs();
}
