export const craftingRecipes = [
    {
        name: 'Storage Bag',
        icon: 'box',  // The preview icon
        category: 'Storage',
        materials: {
            Kevlar: 5,
            Steel: 6
        },
        unlocked: true  // This recipe is available at the start
    },
    {
        name: 'Steel Box',
        icon: 'box',
        category: 'Storage',
        materials: {
            Steel: 10,
        },
        unlocked: false  // This recipe will be unlocked later
    }
];
