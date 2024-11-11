// purchasableItems.js

export const purchasableItems = [
    {
      name: 'Oxygen Canister',
      type: 'consumable',
      keyName: 'oxygen-canister',
      material: 'oxygen',
      installable: false,
      section: 'storage',
      iconType: 'milk',
      iconColor: 'blue',
      condition: 'Full',
      storage: { oxygen: 20 },  // Amount of oxygen in the canister
      description: 'Contains oxygen for breathing. Consumable resource.',
      stackSize: 10,
      price: 50  // Example price for the oxygen canister
    },
    {
      name: 'Empty Canister',
      type: 'scrap',
      keyName: 'empty-canister',
      material: 'canister',
      installable: false,
      section: 'storage',
      iconType: 'milk-off',
      iconColor: 'gray',
      condition: 'Empty',
      description: 'An empty canister that can be refilled.',
      stackSize: 10,
      price: 10  // Example price for the empty canister
    },
    {
        name: 'Food',
        type: 'consumable',
        keyName: 'food-package',
        material: 'food',
        installable: false,
        section: 'storage',
        iconType: 'package',
        iconColor: 'gray',
        condition: 'Full',
        description: 'One space-ready ration meal. Yum.',
        stackSize: 10,
        price: 1000
    },
    {
        name: 'Empty food package',
        type: 'scrap',
        keyName: 'food-package-empty',
        material: 'packaging',
        installable: false,
        section: 'storage',
        iconType: 'package-open',
        iconColor: 'gray',
        condition: 'Full',
        description: 'One space-ready meal ration. Yum.',
        stackSize: 10,
        price: 1000
    }
    // Add more purchasable items here as the game progresses
  ];

// Template
// name: '',
// type: 'consumable',
// keyName: '',
// material: '',
// installable: true | false,
// section: 'storage',
// iconType: '',
// iconColor: '',
// condition: '',
// description: '',
// stackSize: 10,
// price: $$$