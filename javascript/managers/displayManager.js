import { collectSpacejunk } from '../modules/spacejunkCollectorModule.js';
import { loadStationResources } from '../modules/stationResourcesModule.js';
import { handleSalvageArea } from '../managers/salvageHandler.js';
import { updateSpacejunkInventory, updateStationInventory } from './updateInventory.js';


export function updateDisplays() {
    updateSpacejunkInventory();
    updateStationInventory();
    collectSpacejunk();
    loadStationResources();
    handleSalvageArea();
}