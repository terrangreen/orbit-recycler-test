// collapsible.js

export function enableCollapsibleSections() {
  const collapsibleHeaders = document.querySelectorAll('.collapsible');
  
  collapsibleHeaders.forEach(header => {
    const toggleIcon = header.querySelector('.toggle-icon');
    const content = header.nextElementSibling;

    // Set initial chevron direction based on data-expanded
    const isExpanded = header.getAttribute('data-expanded') === 'true';
    content.style.display = isExpanded ? 'block' : 'none';

    header.addEventListener('click', function () {
      const expanded = header.getAttribute('data-expanded') === 'true';
      const newExpandedState = expanded ? 'false' : 'true';
      
      // Toggle the collapsed class on the header itself
      header.classList.toggle('collapsed');
      header.setAttribute('data-expanded', newExpandedState);

      content.style.display = newExpandedState === 'true' ? 'block' : 'none';

      lucide.createIcons();
    });
  });      
}  