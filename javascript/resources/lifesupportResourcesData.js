// lifeSupportResourceData.js

// Oxygen: At a consumption rate of 1 unit per tick (12 minutes), each crew member will need:

// 3 months (roughly 90 days) translates to 180 ticks/day × 90 days = 16,200 ticks.
// Oxygen requirement = 1 × 16,200 = 16,200 units.
// Water: At a consumption rate of 0.5 units per tick, each crew member will need:
// Water requirement = 0.5 × 16,200 = 8,100 units.
// Food: With a rate of 0.25 units per tick, each crew member will need:
// Food requirement = 0.25 × 16,200 = 4,050 units.

export const lifeSupportData = [
    { 
      name: 'Power', 
      type: 'power',
      iconType: 'zap', 
      iconColor: 'white',
      current: 100, 
      storage: 0, 
      rate: 0 
    },
    { 
      name: 'Oxygen',
      type: 'oxygen',
      iconType: 'air-vent', 
      iconColor: 'white',
      current: 16200, 
      storage: 0, 
      rate: 0 
    },
    { 
      name: 'Food',
      type: 'food', 
      iconType: 'utensils', 
      iconColor: 'white',
      current: 4050, 
      storage: 0, 
      rate: 0 
    },
    { 
      name: 'Water', 
      type: 'water',
      iconType: 'droplet', 
      iconColor: 'blue',
      current: 8100, 
      storage: 0, 
      rate: 0 
    },
  ];