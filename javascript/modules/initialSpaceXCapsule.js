// initialSpaceXCapsule.js

export function initializeSpaceXCapsule() {
    const container = document.getElementById('station-container');
    
    const img = document.createElement("img");
    img.src = "spacex-dragon1-diagram final.jpg";
    img.style.height = "350px";
    img.style.width = "auto";

    const imageContainer = document.createElement("div");
    imageContainer.style.position = "relative";
    imageContainer.style.display = "inline-block";
    imageContainer.style.height = "350px";
    imageContainer.appendChild(img);

    const equipLeftAlign = "60%"
    
    const textPoints = [
        { text: "[ CAPSULE ]", bottom: "60%", left: "10%" },
        { text: "[ TRUNK ]", bottom: "23%", left: "25%" },
        { text: "[ AIRLOCK ]", bottom: "80%", left: equipLeftAlign },
        { text: "[ FRONT DOOR ]", bottom: "70%", left: equipLeftAlign },
        { text: "[ SENSOR BAY ]", bottom: "60%", left: equipLeftAlign },
        { text: "[ DRACO (RCS) ]", bottom: "50%", left: equipLeftAlign },
        { text: "[ UMBILICAL ]", bottom: "40%", left: equipLeftAlign },
        { text: "[ BATTERIES ]", bottom: "30%", left: equipLeftAlign },
        { text: "[ SOLAR ARRAY ]", bottom: "0%", left: equipLeftAlign }
        // Add more as needed
    ]

    textPoints.forEach(point => {
        const textPoint = document.createElement("div");
        textPoint.className = "text-point";
        textPoint.style.position = "absolute";

        Object.keys(point).forEach(styleKey => {
            if (!styleKey.includes('text')) {
                textPoint.style[styleKey] = point[styleKey];
            }
        });
        
        textPoint.style.fontSize = "12px";
        textPoint.textContent = point.text;
        imageContainer.appendChild(textPoint);
    });
    
    container.appendChild(imageContainer);

    const line = document.createElement("div");
    line.className = "line";
    container.appendChild(line);
}

function drawLineToPoint(textElement, targetX, targetY, horizontalDistance) {
    const textRect = textElement.getBoundingClientRect();
    const startX = textRect.left + textRect.width / 2;
    const startY = textRect.top + textRect.height / 2;

    // Determine where the line should start bending horizontally
    const bendX = startX + horizontalDistance;

    // Create the path: horizontal line up to bendX, then diagonal line to target
    const linePath = `M${startX} ${startY} H${bendX} L${bendX} ${targetY} L${targetX} ${targetY}`;

    const line = document.getElementById("line");
    line.setAttribute("d", linePath);
}

// // Example usage
// const textElement = document.getElementById("crew-text");
// const targetX = 500;  // example target X on the image
// const targetY = 200;  // example target Y on the image
// const horizontalDistance = 100; // how far horizontally before the line starts bending

// drawLineToPoint(textElement, targetX, targetY, horizontalDistance);
