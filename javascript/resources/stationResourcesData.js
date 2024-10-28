// stationResourcesData.js

export const stationResourcesData = [
    { 
      type: 'money', 
      iconType: 'banknote', 
      iconColor: 'green', 
      valueId: 'moneyValue',
      template: '${money}'
    },
    {
      type: 'spaceJunk',
      iconType: 'trash-2',
      iconColor: 'white',
      valueId: 'rawSpaceJunkValue',
      template: '${spacejunkItems.length} / ${rawJunkLimit}'
    },
    {
      type: 'stationInventory',
      iconType: 'boxes',
      iconColor: 'white',
      valueId: 'stationInventoryValue',
      template: '${stationInventory.length} / ${stationInventoryLimit}'
    }
  ];