// collapsible.js

export function enableCollapsibleSections() {
  const collapsibleHeaders = document.querySelectorAll('.collapsible');
  
  collapsibleHeaders.forEach(header => {
    const toggleIcon = header.querySelector('.toggle-icon');
    const content = header.nextElementSibling;

    // Set initial chevron direction based on data-expanded
    const isExpanded = header.getAttribute('data-expanded') === 'true';
    toggleIcon.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
    content.style.display = isExpanded ? 'block' : 'none';

    header.addEventListener('click', function () {
      const expanded = header.getAttribute('data-expanded') === 'true';
      const newExpandedState = !expanded;
      
      // Toggle the collapsed class on the header itself
      header.classList.toggle('collapsed');
      header.setAttribute('data-expanded', newExpandedState);

      content.style.display = newExpandedState ? 'block' : 'none';
      toggleIcon.style.transform = newExpandedState ? 'rotate(0deg)' : 'rotate(180deg)';

      // Toggle content visibility
      // if (content.style.display === "none" || !content.style.display) {
      //   content.style.display = "block";
      // } else {
      //   content.style.display = "none";
      // }
    });
  });      
}  