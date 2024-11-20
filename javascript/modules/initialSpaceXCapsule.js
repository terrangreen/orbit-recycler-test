// initialSpaceXCapsule.js

export function initializeSpaceXCapsule() {
    const container = document.getElementById('station-container');
    
    const img = document.createElement("img");
    img.src = "spacex-dragon1-diagram final.jpg";
    img.style.width = "460px";

    const imageContainer = document.createElement("div");
    imageContainer.id = "spacex-capsule";
    imageContainer.style.position = "relative";
    imageContainer.appendChild(img);

    container.appendChild(imageContainer);

    // Create the canvas for drawing lines
    const canvas = document.createElement("canvas");
    canvas.id = "capsule-diagram-canvas";
    canvas.style.position = "absolute";
    canvas.style.left = "0";
    canvas.style.top = "0";
    canvas.style.zIndex = "10";
    canvas.style.width = '460px';
    canvas.style.height = '274.27px';
    canvas.width = 460;
    canvas.height = 274.27;
    imageContainer.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    const equipLeftAlign = "60%";
    const equipLeftLine = "146.5";
    
    const textPoints = [
        { text: "[ CAPSULE ]", bottom: "70%", left: "10%" },
        { text: "[ TRUNK ]", bottom: "30%", left: "25%" },
        { text: "[ AIRLOCK ]", top: "20%", left: equipLeftAlign, target: { targetX: equipLeftLine, targetY: 34.77, bendAt: 240 } },
        { text: "[ FRONT DOOR ]", top: "30%", left: equipLeftAlign, target: { targetX: equipLeftLine, targetY: 85, bendAt: 240 } },
        { text: "[ SENSOR BAY ]", top: "40%", left: equipLeftAlign, target: { targetX: equipLeftLine, targetY: 110, bendAt: 240 } },
        { text: "[ DRACO (RCS) ]", top: "50%", left: equipLeftAlign, target: { targetX: 176, targetY: 124, bendAt: 240 } },
        { text: "[ BATTERIES ]", top: "70%", left: equipLeftAlign, target: { targetX: equipLeftLine, targetY: 165, bendAt: 240 } },
        { text: "[ SOLAR ARRAY ]", top: "90%", left: equipLeftAlign, target: { targetX: 220, targetY: 165, bendAt: 240 } }
    ];

    const segmentContainer = document.createElement('div');
    segmentContainer.id = "segment-container";

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
        segmentContainer.appendChild(textPoint);
    });

    imageContainer.appendChild(segmentContainer);

    // Add equipment items to a separate container
    const equipmentContainer = document.createElement("div");
    equipmentContainer.id = "equipment-container";
    equipmentContainer.style.position = "absolute";
    equipmentContainer.style.left = equipLeftAlign;
    equipmentContainer.style.top = "10%";

    textPoints.filter(point => point.left === equipLeftAlign).forEach(point => {
        const equipmentItem = document.createElement("div");
        equipmentItem.className = "equipment-item";
        equipmentItem.textContent = point.text;

        equipmentContainer.appendChild(equipmentItem);
    });

    imageContainer.appendChild(equipmentContainer);

    window.requestAnimationFrame(() => {
        textPoints.filter(point => point.left === equipLeftAlign).forEach((point, index) => {
            const equipmentItem = equipmentContainer.children[index];
            const horizontalDistance = 50;
            drawLineToPoint(canvas, equipmentItem, point.target, ctx);
        });

    })
}

function drawLineToPoint(canvas, textElement, target, ctx) {
    console.log('calling drawLineToPoint');
    
    const textRect = textElement.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();
    const startX = textRect.left - 5;
    const startY = textRect.top + textRect.height / 2;
    // const startX = textRect.left + textRect.width / 2;
    // const startY = textRect.top + textRect.height / 2;
    
    // console.log('textRect:', textRect);
    // console.log('Start:', { startX: startX, startY: startY });
    const adjustedStartX = startX - canvasRect.left;
    const adjustedStartY = startY - canvasRect.top;
    
    // Determine where the line should start bending horizontally
    const bendX = adjustedStartX - target.bendAt;
    
    console.log("Start:", { adjustedStartX: adjustedStartX, adjustedStartY: adjustedStartY });
    // console.log("Bend:", { bendX, adjustedStartY });
    // console.log("Target:", { targetX, targetY });
    // Begin drawing the path on the canvas
    ctx.beginPath();
    ctx.moveTo(adjustedStartX, adjustedStartY);
    ctx.lineTo(target.bendAt, adjustedStartY);
    // ctx.lineTo(bendX, targetY);
    ctx.lineTo(target.targetX, target.targetY);

    // Apply styling to the path
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.stroke();
}