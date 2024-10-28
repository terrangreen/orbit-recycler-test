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
      iconType: 'chip', 
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
      iconType: 'circuit-board', 
      iconColor: 'white',
      id: 'siliconProcessor',
      stackSize: 20
    },
    { 
      name: 'Solar panels', 
      type: 'installable',
      keyName: 'solarPanel',
      material: 'solar-panel',
      installable: 'true',
      section: 'exterior',
      iconType: 'sun', 
      iconColor: 'white',
      stackSize: 1
    },
    {
      name: 'Communication Antenna', 
      type: 'installable',
      keyName: 'communicationAntenna',
      material: 'communication-antenna',
      installable: 'true',
      valueId: 'antennaValue', 
      iconType: 'radio', 
      iconColor: 'gray',
      id: 'satelliteAntenna',
      stackSize: 5
    }    
  ];