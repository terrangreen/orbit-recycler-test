// stationResourcesData.js

export const stationResourcesData = [
    { 
      name: "USD",
      type: 'money', 
      iconType: 'banknote', 
      iconColor: 'green', 
      valueId: 'moneyValue',
      template: '${money}'
    },
    {
      name: "Space junk inventory",
      type: 'spaceJunk',
      iconType: 'trash-2',
      iconColor: 'white',
      valueId: 'rawSpaceJunkValue',
      template: '${spacejunkItems.length} / ${rawJunkLimit}'
    },
    {
      name: "Station Inventory",
      type: 'stationInventory',
      iconType: 'boxes',
      iconColor: 'white',
      valueId: 'stationInventoryValue',
      template: '${stationInventory.length} / ${stationInventoryLimit}'
    }
  ];