const guidelines = document.getElementById("guidelines");
const undo = document.getElementById("undo");
const settings = document.getElementById("settings");
const decreasesz = document.getElementById("decrease");
const increasesz = document.getElementById("increase");

let canvasc = 0;
guidelines.addEventListener("click", ()=>{
    const canvasbg = document.getElementById("canvasBG");
    if (canvasc === 0) canvasbg.src = "images/canvasbg1.png";
    if (canvasc === 1) canvasbg.src = "images/canvasbg2.png";
    if (canvasc === 2) canvasbg.src = "images/canvasbg0.png";
    canvasc = (canvasc+1)%3;
});
undo.addEventListener("click",()=>{
    if (strokes.length === 0) return;
    strokes.pop();
    redraw();
});
decreasesz.addEventListener("click", ()=>{
    if (canvasSize > 30) {
        const drawTools = document.getElementById("drawTools");
        canvasSize -= 10;
        drawTools.style.fontSize = canvasSize.toString() + "vh";
    }
});
increasesz.addEventListener("click", ()=>{
    if (canvasSize < 70) {
        const drawTools = document.getElementById("drawTools");
        canvasSize += 10;
        drawTools.style.fontSize = canvasSize.toString() + "vh";
    }
});