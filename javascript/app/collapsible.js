// collapsible.js
export function enableCollapsibleSections() {
  const collapsibleHeaders = document.querySelectorAll('.collapsible');
  
  collapsibleHeaders.forEach(header => {
    header.addEventListener('click', function () {
      const content = this.nextElementSibling;
      const toggleIcon = this.querySelector('.toggle-icon');
      
      // Toggle the collapsed class on the header itself
      header.classList.toggle('collapsed');
      
      // Toggle content visibility
      if (content.style.display === "none" || !content.style.display) {
        content.style.display = "block";
      } else {
        content.style.display = "none";
      }
    });
  });      

  // Initial state: hide content
  const contents = document.querySelectorAll('.module-content');
  // contents.forEach(content => content.style.display = 'none');
  contents.forEach(content => {
    const header = content.previousElementSibling; // Assuming the header is just before the content
    if (header.getAttribute('data-expanded') === 'true') {
        content.style.display = 'block'; // Start expanded
        header.classList.remove('collapsed'); // Ensure the header is not collapsed
    } else {
        content.style.display = 'none'; // Start collapsed by default
        header.classList.add('collapsed'); // Ensure the header has the collapsed class
    }
  });
}  