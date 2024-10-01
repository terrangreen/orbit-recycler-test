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
    contents.forEach(content => content.style.display = 'none');
  }  