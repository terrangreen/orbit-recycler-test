export const craftingRecipes = [
    {
        name: 'Storage Bag',
        iconType: 'box',
        iconColor: 'white',
        category: 'storage',
        keyName: "storageBag",
        materials: {
            kevlar: 5,
            steel: 6
        },
        unlocked: true  // This recipe is available at the start
    },
    {
        name: 'Steel Box',
        iconType: 'box',
        iconColor: 'white',
        category: 'storage',
        keyName: "steelBox",
        materials: {
            steel: 10,
        },
        unlocked: false  // This recipe will be unlocked later
    }
];