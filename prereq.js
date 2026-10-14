const canvas = document.getElementById("canvasA");
const context = canvas.getContext('2d');
let rect = canvas.getBoundingClientRect();
let pos, mid;
let isDrawing = false;
let strokePoints = [];
let strokes = [];
let strokeSize = 4;
let strokeColor = "#1b1b1b";

let canvasSize = 50;

canvas.width = rect.width;
canvas.height = rect.height;
function getpos(original) {
    const r = canvas.getBoundingClientRect();
    return {
        x: original.clientX - r.left,
        y: original.clientY - r.top
    };
}
function normalize(original) {
    return {x: original.x/canvas.width, y : original.y/canvas.height};
}
function denormalize(original) {
    return {x: original.x*canvas.width, y : original.y*canvas.height};
}
function beginPath(prev) {
    context.beginPath();
    context.lineWidth = strokeSize;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = strokeColor;

    if (prev !== null) {
        context.moveTo(prev.x, prev.y);
    }
}
function redraw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    beginPath(null);
    for (const stroke of strokes) {
        if (stroke.length == 0) continue;
        let pos = denormalize(stroke[0]);
        let mid = pos;
        for (let newPos of stroke) {
            newPos = denormalize(newPos);
            context.moveTo(mid.x, mid.y);
            const newMid = {
                x : (pos.x + newPos.x)/2,
                y : (pos.y + newPos.y)/2
            }
            context.quadraticCurveTo(pos.x, pos.y, newMid.x, newMid.y);
            pos = newPos;
            mid = newMid;
        }
        context.lineTo(pos.x, pos.y);
    }
    context.stroke();
}