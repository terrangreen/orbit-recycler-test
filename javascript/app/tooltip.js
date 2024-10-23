// tooltip.js

export function showTooltip(element, item, selectFields = {}) {
    // Format tooltip content based on selectFields
    let selectContent = '';
    for (const [key, value] of Object.entries(selectFields)) {
        selectContent += `<p><strong>${key}:</strong> ${value}</p>`;
    }

    // Set the data-tippy-content attribute
    element.setAttribute('data-tippy-content', selectContent);

    // Initialize Tippy on the element (this can be done once for all elements with .tooltip class if you prefer)
    tippy(element, {
        allowHTML: true,
        animation: 'shift-away',
        placement: 'top',
        theme: 'light', // Customize or add themes as needed
    });
}