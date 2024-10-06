// spacejunkResourcesData.js

import { getRandomSalvageParts, getRandomSpacejunkItemOwner, getRandomSpacejunkItemType, getRandomSpacejunkItemValue } from '../app/randomGenerator.js';

let currentId = 0;

export function possibleSpacejunk() {
    return {
        name: getRandomSpacejunkItemType(),
        iconType: 'satellite',
        owner: getRandomSpacejunkItemOwner(),
        value: getRandomSpacejunkItemValue(),
        parts: getRandomSalvageParts(),
        onHold: false,
        id: ++currentId
    };
}