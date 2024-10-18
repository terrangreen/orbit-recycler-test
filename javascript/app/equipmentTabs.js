// equipmentTabs.js

export function initializeEquipmentTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.equipment-tab-content');
  
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const selectedTab = button.getAttribute('data-tab');
  
        // Remove active class from all buttons and content
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
  
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        document.getElementById(`equipment-${selectedTab}`).classList.add('active');
      });
    });
  }  