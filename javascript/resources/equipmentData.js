// equipmentData.js

export const possibleEquipment = [
    {
      name: 'Camping hammock',
      type: 'equipment',
      keyName: 'bed',
      material: 'bed',
      installable: true,
      section: 'interior',
      iconType: 'bed',
      iconColor: 'white',
      condition: 'New',
      description: 'Basic sleeping area.',
      stackSize: 1
    },
    {
      name: 'Basic Life Support System',
      type: 'equipment',
      keyName: 'basicLifeSupport',
      material: 'basic-life-support',
      installable: true,
      section: 'interior',
      iconType: 'life-buoy',
      iconColor: 'white',
      condition: 'Operational',
      storage: { oxygen: 16200, water: 8100 , power: 100 },
      utilityRate: { oxygen: 0.5, water: 0.25, power: -2 },
      description: 'Recycles air and water for basic life support.',
      stackSize: 1
    },
    {
      name: 'Solar Panels',
      type: 'equipment',
      keyName: 'solarPanel',
      material: 'solar-panel',
      installable: true,
      section: 'exterior',
      iconType: 'sun',
      iconColor: 'white',
      condition: 'New',
      utilityRate: { power: 5 },
      description: 'Generates solar power for the station.',
      stackSize: 1
    },
    {
      name: 'Food Storage',
      type: 'equipment',
      keyName: 'foodStorage',
      material: 'food-storage',
      installable: true,
      section: 'interior',
      iconType: 'utensils',
      iconColor: 'white',
      condition: 'New',
      storage: { food: 4050 },
      utilityRate: { power: -1 },
      description: 'Stores food rations for crew members.',
      stackSize: 1
    },
    {
      name: 'Airlock',
      type: 'equipment',
      keyName: 'airlock',
      material: 'airlock',
      installable: true,
      section: [ 'interior', 'exterior' ],
      iconType: 'door-closed',
      iconColor: 'white',
      condition: 'used',
      utilityRate: { power: -1 },
      description: 'Airlock',
      stackSize: 1
    }
    // Add more equipment as needed
  ];  