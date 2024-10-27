// Possible Salvage Types
export const possibleSalvage = [

  // First the scrap parts
    { 
      name: 'Kevlar Fiber', 
      type: 'scrap',
      keyName: 'scrap-kevlar',
      material: 'kevlar',
      id: 1,
      valueId: 'kevlarValue', 
      iconType: 'layers-3', 
      iconColor: 'white'
    },
    { 
      name: 'Aluminum Parts', 
      type: 'scrap',
      keyName: 'scrap-aluminum',
      material: 'aluminum', 
      id: 2, 
      valueId: 'aluminumValue', 
      iconType: 'atom', 
      iconColor: 'silver' 
    },
    { 
      name: 'Steel Parts', 
      type: 'scrap',
      keyName: 'scrap-steel',
      material: 'steel', 
      id: 3, 
      valueId: 'steelValue', 
      iconType: 'atom', 
      iconColor: 'gray' 
    },
    { 
      name: 'Copper Parts', 
      type: 'scrap',
      keyName: 'scrap-copper',
      material: 'copper', 
      id: 4, 
      valueId: 'copperValue', 
      iconType: 'atom', 
      iconColor: 'copper' 
    },
    // These are the possible whole components
    { 
      name: 'Silicon Processor', 
      type: 'component',
      keyName: 'siliconProcessor',
      material: 'silicon-processor', 
      id: 10, 
      valueId: 'siliconValue', 
      iconType: 'circuit-board', 
      iconColor: 'white' 
    },
    { 
      name: 'Solar panels', 
      type: 'installable',
      keyName: 'solarPanel',
      installable: 'true',
      section: 'exterior',
      material: 'solar-panel',
      id: 11, 
      iconType: 'sun', 
      iconColor: 'white'
    }
  ];