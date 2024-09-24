// script.js

import { enableCollapsibleSections } from './collapsible.js';
import { loadCraftingContent } from './crafting.js';
import { loadSpaceJunkInventoryContent } from './spacejunkinventory.js';
import { loadStationInventoryContent } from './stationinventory.js';
import { loadLifeSupportModule } from './lifesupport.js';
import { loadSalvageDropAreaContent } from './salvagedroparea.js'


document.addEventListener('DOMContentLoaded', function() {

  // Load content
  enableCollapsibleSections();
  loadCraftingContent();
  loadSpaceJunkInventoryContent();
  loadStationInventoryContent();
  loadLifeSupportModule();
  loadSalvageDropAreaContent();

  // Game State Variables
  let money = 0;
  let rawJunkLimit = 10;
  let wholeItems = []; // Array to store whole items
  let craftedBags = 0;
  
  let salvageLimit = 10;
  let salvageItems = [];
  let salvageContents = {};

  // Constants
  const defaultIcon = 'box';
  const junkValuePerUnit = 100; // money per processed junk unit
  const privateSatelliteFee = 10000; // money for removing a private satellite
  const governmentSatelliteFee = 15000; // money for removing a government satellite
  const fragmentsRequiredForBag = 5; // Kevlar fragments needed to craft a bag
  const additionalRawJunkPerBag = 5; // Raw junk limit increase per crafted bag

  // Possible Salvage Types
  const possibleSalvage = [
    { type: 'Kevlar Fiber', material: 'Kevlar', iconType: 'layers-3', color: 'white' },
    { type: 'Aluminum Parts', material: 'Aluminum', iconType: 'atom', color: 'silver' },
    { type: 'Silicon Processor', material: 'Silicon', iconType: 'circuit-board', color: 'white' },
    { type: 'Steel Parts', material: 'Steel', iconType: 'atom', color: 'gray' },
    { type: 'Copper Parts', material: 'Copper', iconType: 'atom', color: 'copper' },
    { type: 'Solar panels', iconType: 'sun', color: 'white'}
  ];

  // Adding new resources dynamically
  addResource('trash-2', 'white', 'spaceJunkCount', `${wholeItems.length} / ${rawJunkLimit}`, 'resources-content');
  addResource('banknote', 'green', 'moneyValue', `${money}`, 'resources-content');


  // DOM Elements
  const moneyDisplayValue = document.getElementById('moneyValue');
  
  const collectButton = document.getElementById('collectSpaceJunkBtn');
  const wholeItemsTable = document.getElementById('wholeItems');

  // The inventory modules aren't working because I started to implement these and didn't finish. Review what ChatGPT said to do with this.
  const inventoryGrid = document.getElementById('inventory-grid');
  const itemDetailsDiv = document.getElementById('item-details');
  const salvageItemDetailsDiv = document.getElementById('salvage-item-details');
  const salvageInventoryGrid = document.getElementById('salvage-inventory-grid');
  const salvageDropArea = document.getElementById('salvage-drop-area');


  updateInventoryGrid();
  updateSalvageInventoryGrid();

  // This code adds the resources dynamically
  function addResource(iconType, color, valueId, valueText, targetModule) {
    if (document.getElementById(valueId)) {
      return;
    }

    const moduleContainer = document.getElementById(targetModule);
    
    const newResource = document.createElement('div');
    newResource.classList.add('resource');
    
    const icon = document.createElement('i');
    icon.setAttribute('data-lucide', iconType);
    icon.classList.add('icon', color);
    
    const span = document.createElement('span');
    span.id = valueId;
    span.textContent = valueText;
    
    newResource.appendChild(icon);
    newResource.appendChild(span);
    
    moduleContainer.appendChild(newResource);

    lucide.createIcons();
  }

  function updateInventoryGrid() {
    inventoryGrid.innerHTML = ''; // Clear current grid

    for (let i = 0; i < rawJunkLimit; i++) {
      const square = document.createElement('div');
      square.classList.add('inventory-square');

      if (wholeItems[i]) {
        square.innerHTML = `<i data-lucide="${wholeItems[i].iconType || defaultIcon}" class="icon white"></i>`;
        square.title = `Type: ${wholeItems[i].type}\nOwner: ${wholeItems[i].owner}\nValue: ${wholeItems[i].value}`;
        square.setAttribute('draggable', true);
        square.addEventListener('dragstart', (e) => handleDragStart(e, wholeItems[i]));
      } else {
        square.innerHTML = '';
      }

      if (wholeItems[i]) {
        square.addEventListener('click', () => {
          displayItemDetails(wholeItems[i]);
        });
      }

      inventoryGrid.appendChild(square);
    }

    lucide.createIcons();
  }

  // Function to display the salvage parts of the dropped item
  function updateSalvageInventoryGrid() {
    salvageInventoryGrid.innerHTML = ''; // Clear current grid

    salvageItems.forEach(part => {
      const square = document.createElement('div');
      square.classList.add('inventory-square');
      square.innerHTML = `<i data-lucide="${part.iconType || defaultIcon}" class="icon white"></i>`;
      square.title = `Type: ${part.type}`; // Assuming part has a type property

      square.addEventListener('click', () => {
        displaySalvageItemDetails(part);
      });

      salvageInventoryGrid.appendChild(square);
  });

    lucide.createIcons();
  }

  // Function to display item details and salvage contents
  function displayItemDetails(item) {
    if (itemDetailsDiv) {  
      itemDetailsDiv.innerHTML = `
        <h3>Item Details</h3>
        <p><strong>Type:</strong> ${item.type}</p>
        <p><strong>Owner:</strong> ${item.owner}</p>
        <p><strong>Value:</strong> ${item.value}</p>
      `;
      lucide.createIcons();
    } else {
      console.error('itemDetailsDiv not found in the DOM.');
    } 
  }

  function displaySalvageItemDetails(item) {
    if (salvageItemDetailsDiv) {  
      salvageItemDetailsDiv.innerHTML = `
        <h3>Salvage Contents:</h3>
        <p><strong>Type:</strong> ${item.type} x${item.quantity}</p>
        <p><strong>Value:</strong> ${item.value}</p>
      `;
      lucide.createIcons();
    } else {
      console.error('itemDetailsDiv not found in the DOM.');
    } 
  }

  



  // Generate salvage icons for the selected item
  function getSalvageIcons(item) {
    // `item.salvageParts` contains the random parts for this specific whole item
    const salvageParts = item.salvageParts || [];

    return salvageParts.map(part => `
    <i data-lucide="${part.iconType || defaultIcon}" class="icon white" title="${part.type}"></i>
    `).join('');
  }

  // Update UI Display
  function updateDisplay() {
    moneyDisplayValue.textContent = `${money}`;
    const spaceJunkCountText = `${wholeItems.length} / ${rawJunkLimit}`;
    // rawSpaceJunkDisplay.textContent = `${wholeItems.length} / ${rawJunkLimit}`;
    document.getElementById('spaceJunkCount').textContent = spaceJunkCountText;
    document.getElementById('spaceJunkInventoryDisplay').textContent = spaceJunkCountText;
    

    // Update Whole Items Table
    if (wholeItemsTable) {
      wholeItemsTable.innerHTML = '';
      wholeItems.forEach(item => {
        wholeItemsTable.innerHTML += `
          <tr>
            <td>${item.type}</td>
            <td>${item.owner}</td>
            <td>${item.value}</td>
          </tr>
        `;
      });
    }
  }

  // Collect Space Junk
  collectButton.addEventListener('click', () => {
    if (wholeItems.length < rawJunkLimit) {
      collectButton.disabled = false;
      const newItem = {
        type: getRandomWholeItemType(),
        iconType: 'satellite',
        owner: getRandomOwner(),
        value: getRandomWholeItemValue(),
        parts: getRandomSalvageParts()
      };
      wholeItems.push(newItem);
      money += newItem.value;
      updateInventoryGrid();
      lucide.createIcons();
    } else {
      collectButton.disabled = true;
    }

    updateDisplay();
  });

  // Craft Bag
  // craftButton.addEventListener('click', () => {
  //   if (fragments['Kevlar Fiber'] && fragments['Kevlar Fiber'].quantity >= fragmentsRequiredForBag) {
  //     // Deduct required fragments
  //     fragments['Kevlar Fiber'].quantity -= fragmentsRequiredForBag;

  //     // Increase raw junk storage limit
  //     rawJunkLimit += additionalRawJunkPerBag;
  //     craftedBags += 1;

  //     updateDisplay();
  //   } else {
  //     alert('Not enough Kevlar Fiber to craft a bag!');
  //   }
  // });

  // Helper Functions to Generate Random Data
  function getRandomWholeItemType() {
    const types = [
      'Communication Satellite',
      'Defunct Satellite',
      'GPS Module',
      'Weather Satellite',
      'Research Module'
    ];
    return types[Math.floor(Math.random() * types.length)];
  }

  function getRandomOwner() {
    const owners = [
      'Company XYZ',
      'Government ABC',
      'Agency DEF',
      'Private Enterprise GHI'
    ];
    return owners[Math.floor(Math.random() * owners.length)];
  }

  // Function to calculate the value of a satellite based on its type and 5 years of FCC fees
  function getRandomWholeItemValue() {
    // FCC annual regulatory fees
    const gsoFee = 168000;  // Annual fee for GSO satellite
    const ngsoFee = 35600;  // Annual fee for NGSO satellite

    // Get the satellite probabilities from the other function
    const { gsoProbability } = calculateSatelliteProbabilities();

    // Determine if the satellite is GSO or NGSO
    const isGso = Math.random() < gsoProbability;

    // Calculate value based on 5 years of fees
    const satelliteValue = isGso ? gsoFee * 5 : ngsoFee * 5;

    return satelliteValue;
  }


  // Function to calculate the probabilities of GSO and NGSO satellites
  function calculateSatelliteProbabilities() {
    const numGsoSatellites = 550;  // Approximate number of GSO satellites
    const numNgsoSatellites = 5500; // Approximate number of NGSO satellites
    
    const totalSatellites = numGsoSatellites + numNgsoSatellites;
    const gsoProbability = numGsoSatellites / totalSatellites;
    const ngsoProbability = numNgsoSatellites / totalSatellites;

    return {
      gsoProbability,
      ngsoProbability
    };
  }

  function getRandomSalvageParts() {
    const foundParts = [];

    possibleSalvage.forEach(part => {
      const isFound = Math.random() < 0.5;

      if (isFound) {
        const quantity = Math.floor(Math.random() * 5) + 1;
        foundParts.push({...part, quantity});
      }
    })

    return foundParts;
  }

  function handleDragStart(e, item) {
    console.log('Dragging item:', item);
    e.dataTransfer.setData('item',JSON.stringify(item));
  }

  // Allow the drop event on the salvage area
  salvageDropArea.addEventListener('dragover', (e) => {
    e.preventDefault(); // Allow drop by preventing default behavior
  });

  salvageDropArea.addEventListener('drop', (e) => {
    e.preventDefault();

    const itemData = e.dataTransfer.getData('item'); // Retrieve dropped item data
    const item = JSON.parse(itemData);  // Parse the dropped item data

    // Move the item to the salvage inventory or process it
    moveToSalvage(item);
  });

  // Function to move item to salvage inventory
  function moveToSalvage(item) {
    // Update the salvage drop area with the dropped item's icon and details
    salvageDropArea.innerHTML = `
      <i data-lucide="${item.iconType || defaultIcon}" class="icon white"></i>
    `;

    // Logic to handle the item once it's dropped into the salvage area
    item.parts.forEach(part => {
      salvageItems.push(part); // Add each part to salvage items array
    });
    
    updateSalvageInventoryGrid(); // Update the salvage grid

    lucide.createIcons();
  }

  // Initial Display Update
  updateDisplay();
});