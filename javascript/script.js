// script.js

import { enableCollapsibleSections } from './app/collapsible.js';
import { initializeModules } from './modules/initModules.js';
import { updateDisplays } from './managers/displayManager.js';


document.addEventListener('DOMContentLoaded', function() {

  // Load content
  enableCollapsibleSections();
  initializeModules();
  updateDisplays();

});