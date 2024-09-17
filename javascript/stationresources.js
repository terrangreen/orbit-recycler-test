import { resourcesData } from './stationresourcesdata'; // Import resourcesData

export function addStationResource(resourcesData) {
    resourcesData.forEach(resource => {
        const resourcesModule = document.getElementById('resources-content');
        
        const newResource = document.createElement('div');
        newResource.classList.add('resource-item');
        
        const icon = document.createElement('i');
        icon.setAttribute('data-lucide', resource.iconType);
        icon.classList.add('icon', resource.color);
        
        const span = document.createElement('span');
        span.id = resource.valueId;
        
        // Check if the resource has a limit (like space junk)
        if (resource.limit !== undefined) {
            span.textContent = `${resource.current} / ${resource.limit}`;
        } else {
            span.textContent = `${resource.current}`;
        }

        newResource.appendChild(icon);
        newResource.appendChild(span);
        resourcesModule.appendChild(newResource);

        lucide.createIcons(); // Ensure icons are reloaded
    });
}
