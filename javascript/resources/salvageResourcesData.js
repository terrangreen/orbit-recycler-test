// Possible Salvage Types
export const possibleSalvage = [

  // First the scrap parts
    { 
      name: 'Kevlar Fiber', 
      type: 'scrap',
      keyName: 'scrap-kevlar',
      material: 'kevlar',
      valueId: 'kevlarValue', 
      iconType: 'layers-3', 
      iconColor: 'white',
      id: 'scrap-kevlar',
      stackSize: 20
    },
    { 
      name: 'Aluminum Parts', 
      type: 'scrap',
      keyName: 'scrap-aluminum',
      material: 'aluminum',
      valueId: 'aluminumValue', 
      iconType: 'atom', 
      iconColor: 'silver',
      id: 'scrap-aluminum',
      stackSize: 20
    },
    { 
      name: 'Steel Parts', 
      type: 'scrap',
      keyName: 'scrap-steel',
      material: 'steel',
      valueId: 'steelValue', 
      iconType: 'atom', 
      iconColor: 'gray' ,
      id: 'scrap-steel',
      stackSize: 20
    },
    { 
      name: 'Copper Parts', 
      type: 'scrap',
      keyName: 'scrap-copper',
      material: 'copper',
      valueId: 'copperValue', 
      iconType: 'atom', 
      iconColor: 'copper' ,
      id: 'scrap-copper',
      stackSize: 20
    },
    {
      name: 'Titanium Parts', 
      type: 'scrap',
      keyName: 'scrap-titanium',
      material: 'titanium',
      valueId: 'titaniumValue', 
      iconType: 'atom', 
      iconColor: 'silver',
      id: 'scrap-titanium',
      stackSize: 15
    },
    {
      name: 'Thermal Insulation', 
      type: 'scrap',
      keyName: 'scrap-insulation',
      material: 'insulation',
      valueId: 'insulationValue', 
      iconType: 'layers', 
      iconColor: 'blue',
      id: 'scrap-insulation',
      stackSize: 30
    },
    {
      name: 'Wiring Scrap', 
      type: 'scrap',
      keyName: 'scrap-wiring',
      material: 'wiring',
      valueId: 'wiringValue', 
      iconType: 'cable', 
      iconColor: 'blue',
      id: 'scrap-wiring',
      stackSize: 30
    },
    // These are the possible whole components
    {
      name: 'Circuit Board', 
      type: 'component',
      keyName: 'circuit-board',
      material: 'circuit-board',
      valueId: 'circuitBoardValue', 
      iconType: 'circuit-board', 
      iconColor: 'green',
      id: 'scrap-circuit-board',
      stackSize: 25
    },    
    { 
      name: 'Silicon Processor', 
      type: 'component',
      keyName: 'siliconProcessor',
      material: 'silicon-processor',
      valueId: 'siliconValue', 
      iconType: 'cpu', 
      iconColor: 'white',
      id: 'siliconProcessor',
      stackSize: 20
    },
    { 
      name: 'Solar panels', 
      type: 'equipment',
      keyName: 'solarPanel',
      material: 'solar-panel',
      installable: true,
      section: 'exterior',
      iconType: 'sun', 
      iconColor: 'white',
      condition: 'Operational',
      utilityRate: { power: 2 },
      description: 'Generates solar power for the station.',
      stackSize: 1
    },
    {
      name: 'Communication Antenna', 
      type: 'equipment',
      keyName: 'communicationAntenna',
      material: 'communication-antenna',
      installable: true,
      section: 'exterior',
      iconType: 'radio', 
      iconColor: 'gray',
      condition: '',
      valueId: 'antennaValue',
      description: '',
      stackSize: 1
    }    
  ];

// Template:
// name: '',
// type: 'equipment | component | parts',
// keyName: '',
// material: '',
// installable: true, (only if relevant)
// section: '',
// iconType: '',
// iconColor: 'white',
// condition: '',
// storage: { oxygen: 100, water: 100 , power: 100 }, (only if relevant)
// utilityRate: { oxygen: 2, water: 2, power: -2 }, (only if relevant)
// description: '',
// stackSize: 1