// equipmentModuleTemplate.js

import { disableEquipmentTabs } from "../managers/equipmentManager.js";

export function initializeEquipmentLayoutTemplate() {
    // Create the grids for both interior and exterior
    generateEquipmentGrid('equipment-interior');
    generateEquipmentGrid('equipment-exterior');

    // Add event listeners for tab buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.equipment-tab-content');

    disableEquipmentTabs();

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedTab = this.getAttribute('data-tab');

            // Toggle active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Show the corresponding tab content and hide others
            tabContents.forEach(content => {
                if (content.id === `equipment-${selectedTab}`) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });
}

// Generate the grid for a given equipment section (interior/exterior)
function generateEquipmentGrid(containerId) {
    const container = document.getElementById(containerId);
    
    // Create a wrapper div for the grid
    const layout = document.createElement('div');
    layout.classList.add('equipment-layout');
    
    // Define the faces in the correct grid order
    const faces = [
        { id: 'top', name: 'Top' },
        { id: 'left', name: 'Left' },
        { id: 'front', name: 'Front' },
        { id: 'right', name: 'Right' },
        { id: 'bottom', name: 'Bottom' },
        { id: 'back', name: 'Back' }
    ];

    // Loop through and create grid items for each face
    faces.forEach(face => {
        const faceSquare = document.createElement('div');
        faceSquare.classList.add('inventory-square');
        faceSquare.id = face.id;
        faceSquare.textContent = face.name;
        
        layout.appendChild(faceSquare);
    });

    // Append the created layout to the equipment container (interior or exterior)
    container.appendChild(layout);
}