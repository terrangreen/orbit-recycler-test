export const craftingRecipes = [
    {
        name: 'Storage Bag',
        type: 'equipment',
        keyName: "storageBag",
        material: 'storage-bag',
        installable: true,
        section: 'exterior',
        iconType: 'box',
        iconColor: 'white',
        condition: 'McGuyvered',
        materials: {
            kevlar: 5,
            steel: 6
        },
        description: 'McGuyvered storage bag made from kevlar and steel',
        stackSize: 1,
        unlocked: true  // This recipe is available at the start
    },
    {
        name: 'Steel Box',
        type: 'equipment',
        keyName: "steelBox",
        material: 'steel-box',
        installable: true,
        section: 'exterior',
        iconType: 'box',
        iconColor: 'white',
        condition: 'McGuyvered',
        materials: {
            steel: 10,
        },
        storage: { inventory: 25 },
        description: 'McGuyvered box from steel scrap',
        stackSize: 1,
        unlocked: false  // This recipe will be unlocked later
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
// condition: 'McGuyvered',
// materials: { },
// storage: { oxygen: 100, water: 100 , power: 100 }, (only if relevant)
// utilityRate: { oxygen: 2, water: 2, power: -2 }, (only if relevant)
// description: '',
// stackSize: 1,
// unlocked: true | false