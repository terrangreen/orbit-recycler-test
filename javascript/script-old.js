import { enableCollapsibleSections } from './collapsible.js';
import { loadCraftingContent } from './crafting.js';
import { loadInventoryContent } from './spacejunkinventory.js';
import { loadLifeSupportModule } from './lifesupport.js';
// import { lifeSupportData } from './lifesupportresources.js';
// import { resourcesData } from './stationresources.js';
// import { loadModuleData } from './modules.js';


document.addEventListener('DOMContentLoaded', function() {

  // Load content
  enableCollapsibleSections();
  loadCraftingContent();
  loadInventoryContent();
  loadLifeSupportModule();
  // Load resources and life support data
  // loadModuleData('resources-content', resourcesData);
  // loadModuleData('life-support-content', lifeSupportData);

  // Game State Variables
  let spaceCoin = 0;
  let rawJunkStorage = 0;
  let rawJunkLimit = 10;
  let wholeItems = []; // Array to store whole items
  let wholeItemsLimit = 5;
  let fragments = {}; // Object to store fragments by type
  let fragmentsLimit = 50;
  let craftedBags = 0;
  let craftedBagsLimit = 5;

  // Constants
  const junkValuePerUnit = 100; // SPC per processed junk unit
  const privateSatelliteFee = 10000; // SPC for removing a private satellite
  const governmentSatelliteFee = 15000; // SPC for removing a government satellite
  const chanceForBoth = 0.1; // 10% chance to collect both whole items and fragments
  const chanceForWholeItemOnProcess = 0.2; // 20% chance to generate a whole item on processing
  const fragmentsRequiredForBag = 5; // Kevlar fragments needed to craft a bag
  const additionalRawJunkPerBag = 5; // Raw junk limit increase per crafted bag

  // Possible Fragment Types
  const possibleFragments = [
    { type: 'Kevlar Fiber', material: 'Kevlar' },
    { type: 'Aluminum Shard', material: 'Aluminum' },
    { type: 'Silicon Shard', material: 'Silicon' },
    { type: 'Steel Scrap', material: 'Steel' },
    { type: 'Copper Nugget', material: 'Copper' }
  ];

  // Adding new resources dynamically
  addResource('trash-2', 'white', 'rawSpaceJunkValue', `${rawJunkStorage} / ${rawJunkLimit}`, 'resources-content');
  addResource('banknote', 'green', 'spcValue', `SPC ${spaceCoin}`, 'resources-content');


  // DOM Elements
  const spcDisplayValue = document.getElementById('spcValue');
  const rawSpaceJunkDisplay = document.getElementById('rawSpaceJunkValue');
  const processedStorageDisplay = document.getElementById('processed-storage-display');
  const craftedBagsDisplay = document.getElementById('crafted-bags-display');
  const collectButton = document.getElementById('collectSpaceJunkBtn');
  const processButton = document.getElementById('processSpaceJunkBtn');
  const craftButton = document.getElementById('craftBtn');
  const wholeItemsTable = document.getElementById('wholeItems');
  const fragmentsTable = document.getElementById('fragments');
  const wholteItemsDisplayValue = document.getElementById('wholeItemsValue');
  const fragmentsDisplayValue = document.getElementById('fragmentsValue');

  // Initialize Fragments
  possibleFragments.forEach(fragment => {
    fragments[fragment.type] = { quantity: 0, material: fragment.material };
  });

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

  // Update UI Display
  function updateDisplay() {
    spcDisplayValue.textContent = `${spaceCoin}`;
    rawSpaceJunkDisplay.textContent = `${rawJunkStorage} / ${rawJunkLimit}`;
    // craftedBagsDisplay.textContent = `Bags Crafted: ${craftedBags}`;

    wholteItemsDisplayValue.textContent = `${wholeItems.length} / ${wholeItemsLimit}`;

    // let totalFragments = Object.values(fragments).reduce((sum, fragment) => sum + fragment.quantity, 0);
    // fragmentsDisplayValue.textContent = `${totalFragments} / ${fragmentsLimit}`;

    // Update Whole Items Table
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

    // Update Fragments Table
    // fragmentsTable.innerHTML = '';
    // for (const [type, info] of Object.entries(fragments)) {
    //   if (info.quantity > 0) {
    //     fragmentsTable.innerHTML += `
    //       <tr>
    //         <td>${type}</td>
    //         <td>${info.quantity}</td>
    //         <td>${info.material}</td>
    //       </tr>
    //     `;
    //   }
    // }

    // Update Craft Button State
    if (fragments['Kevlar Fiber'] && fragments['Kevlar Fiber'].quantity >= fragmentsRequiredForBag) {
      craftButton.disabled = false;
    } else {
      craftButton.disabled = true;
    }
  }

  // Function to add fragments
  // function addFragments(newFragments) {
  //   let totalFragments = Object.values(fragments).reduce((sum, fragment) => sum + fragment.quantity, 0);

  //   newFragments.forEach(fragment => {
  //       const remainingCapacity = fragmentsLimit - totalFragments;
  //       if (remainingCapacity > 0) {
  //           const quantityToAdd = Math.min(fragment.quantity, remainingCapacity); // Only add up to remaining capacity
  //           if (fragments[fragment.type]) {
  //               fragments[fragment.type].quantity += quantityToAdd;
  //           } else {
  //               fragments[fragment.type] = { quantity: quantityToAdd, material: fragment.material };
  //           }
  //           totalFragments += quantityToAdd; // Update the total count
  //           console.log(`Added ${quantityToAdd} ${fragment.type}`);
  //       } else {
  //           console.log("No fragment capacity left.");
  //       }
  //   });
  // }

  // function addFragments(newFragments) {
  //   newFragments.forEach(fragment => {
  //     if (fragments[fragment.type]) {
  //       fragments[fragment.type].quantity += fragment.quantity;
  //     } else {
  //       fragments[fragment.type] = { quantity: fragment.quantity, material: fragment.material };
  //     }
  //   });
  // }

  // Collect Space Junk
  collectButton.addEventListener('click', () => {
    if (rawJunkStorage < rawJunkLimit) {
      collectButton.disabled = false;
      rawJunkStorage += 1;

      if (wholeItems.length < rawJunkLimit) {
        const newItem = {
          type: getRandomWholeItemType(),
          owner: getRandomOwner(),
          value: getRandomWholeItemValue()
        };
        wholeItems.push(newItem);

      }

      // 10% chance to also collect a whole item and fragments
      // if (Math.random() < chanceForBoth) {
      //   // Add Whole Item if there's space
      //   if (wholeItems.length < wholeItemsLimit) {
      //     const newItem = {
      //       type: getRandomWholeItemType(),
      //       owner: getRandomOwner(),
      //       value: getRandomWholeItemValue()
      //     };
      //     wholeItems.push(newItem);
      //     spaceCoin += newItem.value; // Earn SPC immediately upon collection
      //   }

      //   // Add Fragments
      //   const collectedFragments = generateRandomFragments();
      //   addFragments(collectedFragments);
      // }
    }
    
    if (rawJunkStorage >= rawJunkLimit) {
      rawJunkStorage = rawJunkLimit;
      collectButton.disabled = true;
    }

    updateDisplay();
  });

  // Process Junk
  // processButton.addEventListener('click', () => {
  //   if (rawJunkStorage > 0) {
  //       rawJunkStorage -= 1;
  //       collectButton.disabled = false;

  //       // Determine outcome based on random chance
  //       const outcome = Math.random();
        
  //       if (outcome < 0.2) {
  //           // 20% chance for whole item
  //           if (wholeItems.length < wholeItemsLimit) {
  //               const newItem = {
  //                   type: getRandomWholeItemType(),
  //                   owner: getRandomOwner(),
  //                   value: getRandomWholeItemValue()
  //               };
  //               wholeItems.push(newItem);
  //               spaceCoin += newItem.value; // Earn SPC
  //               console.log("Whole item created:", newItem);
  //           }
  //       } else if (outcome < 0.7) {
  //           // 50% chance for a single fragment type
  //           const fragmentsGenerated = generateRandomFragments(1);  // Generate 1 type of fragment
  //           addFragments(fragmentsGenerated);
  //           console.log("Single fragment created:", fragmentsGenerated);
  //       } else {
  //           // 30% chance for two types of fragments
  //           const fragmentsGenerated = generateRandomFragments(2);  // Generate 2 types of fragments
  //           addFragments(fragmentsGenerated);
  //           console.log("Two fragments created:", fragmentsGenerated);
  //       }
  //   }

  //   updateDisplay();
  // });

  // processButton.addEventListener('click', () => {
  //   if (rawJunkStorage > 0) {
  //     rawJunkStorage -= 1;
  //     collectButton.disabled = false;

  //     if (Math.random() < chanceForWholeItemOnProcess) {
  //       // Attempt to add a whole item
  //       if (wholeItems.length < wholeItemsLimit) {
  //         const newItem = {
  //           type: getRandomWholeItemType(),
  //           owner: getRandomOwner(),
  //           value: getRandomWholeItemValue()
  //         };
  //         wholeItems.push(newItem);
  //         spaceCoin += newItem.value; // Earn SPC upon processing
  //       } else {
  //         // If no space, try to convert to fragments instead
  //         let totalFragments = Object.values(fragments).reduce((sum, fragment) => sum + fragment.quantity, 0);
  //         if (totalFragments < fragmentsLimit) {
  //           const fragmentsGenerated = generateRandomFragments();
  //           addFragments(fragmentsGenerated);
  //         }
  //       }
  //     }
  //   } else {
  //     // Generate Fragments
  //     let totalFragments = Object.values(fragments).reduce((sum, fragment) => sum + fragment.quantity, 0);
  //     if (totalFragments < fragmentsLimit) {
  //       const fragmentsGenerated = generateRandomFragments();
  //       addFragments(fragmentsGenerated);
  //     }
  //   }

  //   updateDisplay();
  // });

  // Craft Bag
  craftButton.addEventListener('click', () => {
    if (fragments['Kevlar Fiber'] && fragments['Kevlar Fiber'].quantity >= fragmentsRequiredForBag) {
      // Deduct required fragments
      fragments['Kevlar Fiber'].quantity -= fragmentsRequiredForBag;

      // Increase raw junk storage limit
      rawJunkLimit += additionalRawJunkPerBag;
      craftedBags += 1;

      updateDisplay();
    } else {
      alert('Not enough Kevlar Fiber to craft a bag!');
    }
  });

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

  function getRandomWholeItemValue() {
    // Assign values based on type
    // For simplicity, random between 10,000 and 15,000 money -- FIX THIS
    return Math.floor(Math.random() * 5000) + 10000;
  }

  // function generateRandomFragments(fragmentCount = 1) {
  //   const collectedFragments = [];
    
  //   for (let i = 0; i < fragmentCount; i++) {
  //       const fragment = possibleFragments[Math.floor(Math.random() * possibleFragments.length)];
  //       const quantity = Math.floor(Math.random() * 5) + 1; // 1 to 5 units
  //       collectedFragments.push({
  //           type: fragment.type,
  //           quantity: quantity,
  //           material: fragment.material
  //       });
  //   }

  //   return collectedFragments;
  // }


  // function generateRandomFragments() {
  //   const numberOfFragments = Math.floor(Math.random() * 3) + 1; // 1 to 3 fragment types
  //   const collectedFragments = [];

  //   for (let i = 0; i < numberOfFragments; i++) {
  //     const fragment = possibleFragments[Math.floor(Math.random() * possibleFragments.length)];
  //     const quantity = Math.floor(Math.random() * 5) + 1; // 1 to 5 units
  //     collectedFragments.push({
  //       type: fragment.type,
  //       quantity: quantity,
  //       material: fragment.material
  //     });
  //   }

  //   return collectedFragments;
  // }

  // Initial Display Update
  updateDisplay();
});