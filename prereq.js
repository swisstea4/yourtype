const canvas = document.getElementById("canvasA");
const context = canvas.getContext('2d');
let rect = canvas.getBoundingClientRect();
let pos;
let isDrawing = false;
let strokePoints = [];
let strokes = [];
let strokeSize = 4;

canvas.width = rect.width;
canvas.height = rect.height;
function getpos(original) {
    return {
        x: Math.max(0, Math.min(rect.width, original.clientX - rect.left)),
        y: Math.max(0, Math.min(rect.height, original.clientY - rect.top))
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

    if (prev !== null) {
        context.moveTo(prev.x, prev.y);
    }
}
function redraw() {
    for (const stroke of strokes) {
        if (stroke.length == 0) continue;
        beginPath(null);
        let point = denormalize(stroke[0]);
        context.moveTo(point.x, point.y);
        for (let point of stroke) {
            point = denormalize(point);
            context.lineTo(point.x, point.y);
        }
        context.stroke();
    }
}