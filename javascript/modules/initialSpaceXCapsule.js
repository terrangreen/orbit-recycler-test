// initialSpaceXCapsule.js

import { showTooltip } from "../app/tooltip.js";
import { possibleEquipment } from "../resources/equipmentData.js";

export function initializeSpaceXCapsule() {
    const container = document.getElementById('station-container');
    
    const img = document.createElement("img");
    img.src = "spacex-dragon1-diagram final.jpg";
    img.className = "spacex-capsule-img";

    const imageContainer = document.createElement("div");
    imageContainer.id = "spacex-capsule";
    imageContainer.className = "spacex-image-container";
    imageContainer.appendChild(img);

    container.appendChild(imageContainer);

    // Create the canvas for drawing lines
    const canvas = document.createElement("canvas");
    canvas.id = "capsule-diagram-canvas";
    canvas.className = "diagram-canvas";
    canvas.width = 460;
    canvas.height = 274.27;
    imageContainer.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    const equipLeftAlign = "60%";
    const equipLeftLine = "157";
    const bendAtLine = "250";
    
    const textPoints = [
        { text: "[ CAPSULE ]", bottom: "70%", left: "10%" },
        { text: "[ TRUNK ]", bottom: "30%", left: "25%" },
        { text: "[ AIRLOCK ]", top: "20%", keyName: "airlock", left: equipLeftAlign, target: { targetX: 190, targetY: 34.77, bendAt: bendAtLine } },
        { text: "[ FRONT DOOR ]", top: "30%", keyName: "front-door", left: equipLeftAlign, target: { targetX: equipLeftLine, targetY: 80, bendAt: bendAtLine } },
        { text: "[ SENSOR BAY ]", top: "40%", keyName: "sensorBay", left: equipLeftAlign, target: { targetX: equipLeftLine, targetY: 110, bendAt: bendAtLine } },
        { text: "[ DRACO (RCS) ]", top: "50%", keyName: "rcsSystem", left: equipLeftAlign, target: { targetX: 200, targetY: 115, bendAt: bendAtLine } },
        { text: "[ BATTERIES ]", top: "70%", keyName: "liIonBattery", left: equipLeftAlign, target: { targetX: equipLeftLine, targetY: 165, bendAt: bendAtLine } },
        { text: "[ SOLAR ARRAY ]", top: "90%", keyName: "solarArray", left: equipLeftAlign, target: { targetX: 220, targetY: 165, bendAt: bendAtLine } }
    ];

    const segmentContainer = document.createElement('div');
    segmentContainer.id = "segment-container";

    // Add text points not aligned with equipLeftAlign to the image
    textPoints.filter(point => point.left !== equipLeftAlign).forEach(point => {
        const textPoint = document.createElement("div");
        textPoint.className = "text-point";

        Object.keys(point).forEach(styleKey => {
            if (!["text", "keyName", "target"].includes(styleKey)) {
                textPoint.style[styleKey] = point[styleKey];
            }
        });

        textPoint.textContent = point.text;
        segmentContainer.appendChild(textPoint);
    });

    imageContainer.appendChild(segmentContainer);

    // Add equipment items to a separate container
    const equipmentContainer = document.createElement("div");
    equipmentContainer.id = "equipment-container";
    equipmentContainer.style.left = equipLeftAlign;
    equipmentContainer.style.top = "10%";

    textPoints.filter(point => point.left === equipLeftAlign).forEach(point => {
        const equipmentItem = document.createElement("div");
        equipmentItem.className = "equipment-item";
        equipmentItem.textContent = point.text;

        const equipment = possibleEquipment.find(e => e.keyName === point.keyName);
        if (equipment) {
            equipmentItem.classList.add("interactive");

            const tooltipFields = {
                'Item': equipment.name,
                'Condition': equipment.condition,
                'Section': equipment.section,
                'Description': equipment.description
            }

            // Add utility rates to tooltip
            if (equipment.utilityRate) {
                Object.entries(equipment.utilityRate).forEach(([key, value]) => {
                    if (value != null) {
                        const rateClass = value > 0 ? 'positive' : value < 0 ? 'negative' : 'neutral';
                        const formattedRate = value > 0 ? `+${value}` : `${value}`;
                        tooltipFields[`${key.charAt(0).toUpperCase() + key.slice(1)} Rate`] = `<span class="rate ${rateClass}">${formattedRate} / tick</span>`;
                    }
                });
            }

            // Add utility storage to tooltip
            if (equipment.storage) {
                Object.entries(equipment.storage).forEach(([key, value]) => {
                    if (value != null) {
                        tooltipFields[`${key.charAt(0).toUpperCase() + key.slice(1)} Storage`] = `<span class="storage}">${value}</span>`;
                    }
                });
            }

            equipmentItem.addEventListener("mouseover", () => {
                equipmentItem.classList.add("highlight");
                showTooltip(equipmentItem, equipment, tooltipFields);
            });
            equipmentItem.addEventListener("mouseout", () => equipmentItem.classList.remove("highlight"));
            equipmentItem.addEventListener("click", () => {
                alert(`Description: ${equipment.description}`);
            });
        }

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
    const textRect = textElement.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();
    const startX = textRect.left - 5;
    const startY = textRect.top + textRect.height / 2;
    const adjustedStartX = startX - canvasRect.left;
    const adjustedStartY = startY - canvasRect.top;
    const bendX = adjustedStartX - target.bendAt;
    
    ctx.beginPath();
    ctx.moveTo(adjustedStartX, adjustedStartY);
    ctx.lineTo(target.bendAt, adjustedStartY);
    ctx.lineTo(target.targetX, target.targetY);

    // Apply styling to the path
    ctx.strokeStyle = "#005f99";
    ctx.lineWidth = 2;
    ctx.stroke();
}