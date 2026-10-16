const canvas = document.getElementById("canvasA");
const context = canvas.getContext('2d');
const settingscanvas = document.getElementById("settingscanvas");
let rect = canvas.getBoundingClientRect();
let pos, mid;
let isDrawing = false;
let strokePoints = [];
let strokes = [];
let strokeSize = 4;
let strokeColor = "#1b1b1b";

let canvasSize = 50;

function getpos(original) {
    const r = canvas.getBoundingClientRect();
    return {
        x: (original.clientX - r.left)*(canvas.width/r.width),
        y: (original.clientY - r.top)*(canvas.height/r.height)
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

function drawStrokeSize() {
    const settingscanvas = document.getElementById("settingscanvas");
    const cxt = settingscanvas.getContext("2d");
    const w = settingscanvas.width;
    const h = settingscanvas.height;
    cxt.beginPath();
    cxt.lineWidth = 4;
    cxt.lineCap = "round";
    cxt.lineJoin = "round";
    cxt.strokeStyle = strokeColor;
    cxt.moveTo(0.26*w, 0.6*h);
    cxt.lineTo(0.74*w, 0.6*h);
    cxt.stroke();
    cxt.beginPath();
    cxt.lineWidth = 6;
    cxt.lineCap = "round";
    cxt.lineJoin = "round";
    cxt.strokeStyle = strokeColor;
    cxt.moveTo(0.26*w, 0.7*h);
    cxt.lineTo(0.74*w, 0.7*h);
    cxt.stroke();
    cxt.beginPath();
    cxt.lineWidth = 8;
    cxt.lineCap = "round";
    cxt.lineJoin = "round";
    cxt.strokeStyle = strokeColor;
    cxt.moveTo(0.26*w, 0.8*h);
    cxt.lineTo(0.74*w, 0.8*h);
    cxt.stroke();
    cxt.beginPath();
    cxt.lineWidth = 10;
    cxt.lineCap = "round";
    cxt.lineJoin = "round";
    cxt.strokeStyle = strokeColor;
    cxt.moveTo(0.26*w, 0.9*h);
    cxt.lineTo(0.74*w, 0.9*h);
    cxt.stroke();
}

const canvasobserver = new ResizeObserver(() =>{
    rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio;
    canvas.width = rect.width*dpr;
    canvas.height = rect.height*dpr;
    redraw();
});
canvasobserver.observe(canvas.parentElement);

const settingsobserver = new ResizeObserver(() =>{
    const settingscanvas = document.getElementById("settingscanvas");
    const r = settingscanvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio;
    settingscanvas.width = r.width*dpr;
    settingscanvas.height = r.height*dpr;
    drawStrokeSize();
});
settingsobserver.observe(settingscanvas.parentElement);