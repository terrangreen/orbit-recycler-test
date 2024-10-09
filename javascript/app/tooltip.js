export function setupTooltip(element, item, selectFields = {}) {
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

// export function showTooltip(event, item, selectFields = {}) {
//     let tooltip = document.querySelector('.tooltip');

//     if (!tooltip) {
//         tooltip = document.createElement('div');
//         tooltip.classList.add('tooltip');
//         document.body.appendChild(tooltip);
//     }

//     let selectContent = '';
//     for (const [key, value] of Object.entries(selectFields)) {
//         selectContent += `<p><strong>${key}:</strong> ${value}</p>`;
//     }
//     // Set the content for the tooltip
//     tooltip.innerHTML = `
//         ${selectContent}
//     `;

//     // Position the tooltip based on the mouse position
//     tooltip.style.left = `${event.pageX + 10}px`; // Offset tooltip a bit from the cursor
//     tooltip.style.top = `${event.pageY + 10}px`;
//     tooltip.style.display = 'block'; // Show the tooltip
// }

// // Function to hide tooltip
// export function hideTooltip() {
//     const tooltip = document.querySelector('.tooltip');
//     if (tooltip) {
//         tooltip.style.display = 'none'; // Hide the tooltip
//     }
// }