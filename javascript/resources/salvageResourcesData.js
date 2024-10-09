// Possible Salvage Types
export const possibleSalvage = [

  // First the scrap parts
    { 
      name: 'Kevlar Fiber', 
      type: 'scrap',
      material: 'kevlar',
      id: 1,
      valueId: 'kevlarValue', 
      iconType: 'layers-3', 
      iconColor: 'white'
    },
    { 
      name: 'Aluminum Parts', 
      type: 'scrap',
      material: 'aluminum', 
      id: 2, 
      valueId: 'aluminumValue', 
      iconType: 'atom', 
      iconColor: 'silver' 
    },
    { 
      name: 'Steel Parts', 
      type: 'scrap',
      material: 'steel', 
      id: 3, 
      valueId: 'steelValue', 
      iconType: 'atom', 
      iconColor: 'gray' 
    },
    { 
      name: 'Copper Parts', 
      type: 'scrap',
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
      material: 'silicon-processor', 
      id: 10, 
      valueId: 'siliconValue', 
      iconType: 'circuit-board', 
      iconColor: 'white' 
    },
    { 
      name: 'Solar panels', 
      type: 'component',
      material: 'solar-panel',
      id: 11, 
      iconType: 'sun', 
      iconColor: 'white'
    }
  ];