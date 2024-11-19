// initialSpaceXCapsule.js

export function initializeSpaceXCapsule() {
    const container = document.getElementById('station-container');
    
    const img = document.createElement("img");
    img.src = "spacex-dragon1-diagram final.jpg";
    img.style.height = "auto";
    img.style.width = "460px";

    const imageContainer = document.createElement("div");
    imageContainer.id = "spacex-capsule";
    imageContainer.style.position = "relative";
    imageContainer.style.display = "inline-block";
    imageContainer.appendChild(img);

    const equipLeftAlign = "60%";
    
    const textPoints = [
        { text: "[ CAPSULE ]", bottom: "70%", left: "10%", targetX: 100, targetY: 200 },
        { text: "[ TRUNK ]", bottom: "30%", left: "25%", targetX: 100, targetY: 200 },
        { text: "[ AIRLOCK ]", bottom: "80%", left: equipLeftAlign, targetX: 100, targetY: 200 },
        { text: "[ FRONT DOOR ]", bottom: "70%", left: equipLeftAlign, targetX: 100, targetY: 200 },
        { text: "[ SENSOR BAY ]", bottom: "60%", left: equipLeftAlign, targetX: 100, targetY: 200 },
        { text: "[ DRACO (RCS) ]", bottom: "50%", left: equipLeftAlign, targetX: 100, targetY: 200 },
        { text: "[ UMBILICAL ]", bottom: "40%", left: equipLeftAlign, targetX: 100, targetY: 200 },
        { text: "[ BATTERIES ]", bottom: "30%", left: equipLeftAlign, targetX: 100, targetY: 200 },
        { text: "[ SOLAR ARRAY ]", bottom: "0", left: equipLeftAlign, targetX: 100, targetY: 200 }
    ];

    // Add text points not aligned with equipLeftAlign to the image
    textPoints.filter(point => point.left !== equipLeftAlign).forEach(point => {
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

    // Create the canvas for drawing lines
    const canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.style.left = "0";
    canvas.style.top = "0";
    canvas.width = img.offsetWidth;  // Set canvas width to image width
    canvas.height = img.offsetHeight;  // Set canvas height to image height
    container.appendChild(canvas);

    const ctx = canvas.getContext("2d");  // Get the canvas 2D context

    // Create the SVG container for lines
    // const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    // svg.style.position = "absolute";
    // svg.style.left = "0";
    // svg.style.top = "0";
    // svg.style.width = "100%";
    // svg.style.height = "100%";
    // container.appendChild(svg);

    // Add left-aligned points to a separate container
    const leftAlignContainer = document.createElement("div");
    leftAlignContainer.id = "left-align-container";
    leftAlignContainer.style.position = "absolute";
    leftAlignContainer.style.left = equipLeftAlign;
    leftAlignContainer.style.top = "10%";

    textPoints.filter(point => point.left === equipLeftAlign).forEach(point => {
        const leftAlignItem = document.createElement("div");
        leftAlignItem.className = "left-align-item";
        leftAlignItem.textContent = point.text;
        leftAlignContainer.appendChild(leftAlignItem);

        const textElement = leftAlignItem;
        const horizontalDistance = 100;
        const lineElement = drawLineToPoint(container, textElement, point.targetX, point.targetY, horizontalDistance, ctx);
        imageContainer.appendChild(lineElement);
        // drawLineToPoint(container, textElement, point.targetX, point.targetY, horizontalDistance, svg);
    });

    imageContainer.appendChild(leftAlignContainer);

    // const line = document.createElement("div");
    // line.className = "line";
    // container.appendChild(line);
}

function drawLineToPoint(container, textElement, targetX, targetY, horizontalDistance, ctx) {
    const textRect = textElement.getBoundingClientRect();
    const startX = textRect.left + textRect.width / 2;
    const startY = textRect.top + textRect.height / 2;

    const containerRect = container.getBoundingClientRect();
    
    const adjustedStartX = startX - containerRect.left;
    const adjustedStartY = startY - containerRect.top;

    // Determine where the line should start bending horizontally
    const bendX = adjustedStartX + horizontalDistance;

     // Begin drawing the path on the canvas
     ctx.beginPath();
     ctx.moveTo(adjustedStartX, adjustedStartY);  // Start at the middle of the text
     ctx.lineTo(bendX, adjustedStartY);  // Draw horizontally
     ctx.lineTo(bendX, targetY);  // Bend the line vertically
     ctx.lineTo(targetX, targetY);  // Final target position
 
     // Apply styling to the path
     ctx.strokeStyle = "black";
     ctx.lineWidth = 2;
     ctx.stroke();  // Draw the path
 
     // Create and return a new DOM element representing the line
     const lineElement = document.createElement("div");
     lineElement.className = "line-element";  // You can style this as needed
     lineElement.style.position = "absolute";
     lineElement.style.left = `${adjustedStartX}px`;
     lineElement.style.top = `${adjustedStartY}px`;
     lineElement.style.width = `${horizontalDistance}px`;
     lineElement.style.height = `${targetY - adjustedStartY}px`;
     lineElement.style.borderLeft = "2px solid black"; // You can modify this to reflect line style
     lineElement.style.transform = `rotate(${Math.atan2(targetY - adjustedStartY, targetX - bendX)}rad)`;
    //  lineElement.id = lineId;  // Give the line a unique id based on its text point
 
     return lineElement;

    // Create the path: horizontal line up to bendX, then diagonal line to target
    // const linePath = `M${startX} ${startY} H${bendX} L${bendX} ${targetY} L${targetX} ${targetY}`;

    // const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    // path.setAttribute("d", linePath);
    // path.setAttribute("stroke", "black");  // Line color
    // path.setAttribute("stroke-width", "2");
    // path.setAttribute("fill", "transparent");
    
    // svg.appendChild(path); // Append the path to the SVG
}

// // Example usage
// const textElement = document.getElementById("crew-text");
// const targetX = 500;  // example target X on the image
// const targetY = 200;  // example target Y on the image
// const horizontalDistance = 100; // how far horizontally before the line starts bending

// drawLineToPoint(textElement, targetX, targetY, horizontalDistance);
