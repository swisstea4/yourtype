const guidelines = document.getElementById("guidelines");
const undo = document.getElementById("undo");
const settings = document.getElementById("settings");
const decreasesz = document.getElementById("decrease");
const increasesz = document.getElementById("increase");

let canvasc = 0;
let settingsv = 0;
guidelines.addEventListener("click", ()=>{
    const canvasbg = document.getElementById("canvasBG");
    canvasc = (canvasc+1)%3;
    canvasbg.src = "images/canvasbg" + canvasc.toString() + ".png";
});
undo.addEventListener("click",()=>{
    if (strokes.length === 0) return;
    strokes.pop();
    redraw();
});
settings.addEventListener("click", ()=>{
    const settingspage = document.getElementById("settingspage");
    if (settingsv === 0) {
        settingspage.style.visibility = "visible";
        settingsv = 1;
    }
    else {
        settingspage.style.visibility = "hidden";
        settingsv = 0;
    }
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