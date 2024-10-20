// equipmentData.js

export const possibleEquipment = [
    {
      name: 'Hammock',
      iconType: 'bed',
      iconColor: 'white',
      type: 'interior',
      condition: 'New',
      description: 'Basic sleeping area.'
    },
    {
      name: 'Basic Life Support System',
      iconType: 'life-buoy',
      iconColor: 'white',
      type: 'interior',
      condition: 'Operational',
      storage: { oxygen: 100, water: 100 , power: 100 },
      utilityRate: { oxygen: 2, water: 2, power: -2 },
      description: 'Recycles air and water for basic life support.'
    },
    {
      name: 'Solar Panels',
      iconType: 'sun',
      iconColor: 'white',
      type: 'exterior',
      condition: 'New',
      utilityRate: { power: 5 },
      description: 'Generates solar power for the station.'
    },
    {
      name: 'Food Storage',
      iconType: 'utensils',
      iconColor: 'white',
      type: 'interior',
      condition: 'New',
      storage: { food: 50 },
      utilityRate: { power: -1 },
      description: 'Stores food rations for crew members.'
    },
    {
      name: 'Airlock',
      iconType: 'door-closed',
      iconColor: 'white',
      type: [ 'interior', 'exterior' ],
      condition: 'used',
      utilityRate: { power: 1 },
      description: 'Airlock'
    }
    // Add more equipment as needed
  ];  