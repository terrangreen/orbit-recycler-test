export function showToastMessage(message, type = 'info') {
    let backgroundColor;
    
    switch(type) {
        case 'success':
            backgroundColor = "#4CAF50";
            break;
        case 'error':
            backgroundColor = "#f44336";
            break;
        case 'warning':
            backgroundColor = "#ff9800";
            break;
        default:
            backgroundColor = "#333";
    }

    Toastify({
        text: message,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
            background: backgroundColor,
          },
        close: true
    }).showToast();
}