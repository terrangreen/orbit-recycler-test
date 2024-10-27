// equipmentData.js

export const possibleEquipment = [
    {
      name: 'Hammock',
      iconType: 'bed',
      iconColor: 'white',
      keyName: 'bed',
      section: 'interior',
      condition: 'New',
      description: 'Basic sleeping area.'
    },
    {
      name: 'Basic Life Support System',
      iconType: 'life-buoy',
      iconColor: 'white',
      keyName: 'basicLifeSupport',
      section: 'interior',
      condition: 'Operational',
      storage: { oxygen: 100, water: 100 , power: 100 },
      utilityRate: { oxygen: 2, water: 2, power: -2 },
      description: 'Recycles air and water for basic life support.'
    },
    {
      name: 'Solar Panels',
      iconType: 'sun',
      iconColor: 'white',
      keyName: 'solarPanel',
      section: 'exterior',
      condition: 'New',
      utilityRate: { power: 5 },
      description: 'Generates solar power for the station.'
    },
    {
      name: 'Food Storage',
      iconType: 'utensils',
      iconColor: 'white',
      keyName: 'foodStorage',
      section: 'interior',
      condition: 'New',
      storage: { food: 50 },
      utilityRate: { power: -1 },
      description: 'Stores food rations for crew members.'
    },
    {
      name: 'Airlock',
      iconType: 'door-closed',
      iconColor: 'white',
      keyName: 'airlock',
      section: [ 'interior', 'exterior' ],
      condition: 'used',
      utilityRate: { power: -1 },
      description: 'Airlock'
    }
    // Add more equipment as needed
  ];  