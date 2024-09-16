export function loadModuleData(moduleId, data) {
    const moduleContent = document.getElementById(moduleId);
    
    data.forEach(item => {
      const itemHTML = `
        <div class="resource-item">
          <i data-lucide="${item.icon}" class="icon"></i>
          <span>${item.type}: ${item.current} / ${item.limit} (${item.rate >= 0 ? '+' : ''}${item.rate})</span>
        </div>
      `;
      moduleContent.innerHTML += itemHTML;
    });
  }
  