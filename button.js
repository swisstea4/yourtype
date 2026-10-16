const guidelines = document.getElementById("guidelines");
const undo = document.getElementById("undo");
const settings = document.getElementById("settings");
const decreasesz = document.getElementById("decrease");
const increasesz = document.getElementById("increase");

const previous = document.getElementById("previous");
const next = document.getElementById("next");
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
        drawTools.style.fontSize = canvasSize.toString() + "vmin";
    }
});
increasesz.addEventListener("click", ()=>{
    if (canvasSize < 70) {
        const drawTools = document.getElementById("drawTools");
        canvasSize += 10;
        drawTools.style.fontSize = canvasSize.toString() + "vmin";
    }
});

guidelines.addEventListener("mouseover", ()=>{
    const guidelinesimg = document.getElementById("guidelinesimg");
    guidelinesimg.style.filter = "brightness(80%)";
});
guidelines.addEventListener("mouseout", ()=>{
    const guidelinesimg = document.getElementById("guidelinesimg");
    guidelinesimg.style.filter = "brightness(100%)";
});

undo.addEventListener("mouseover", ()=>{
    const undoimg = document.getElementById("undoimg");
    undoimg.style.filter = "brightness(80%)";
});
undo.addEventListener("mouseout", ()=>{
    const undoimg = document.getElementById("undoimg");
    undoimg.style.filter = "brightness(100%)";
});

settings.addEventListener("mouseover", ()=>{
    const settingsimg = document.getElementById("settingsimg");
    settingsimg.style.filter = "brightness(80%)";
});
settings.addEventListener("mouseout", ()=>{
    const settingsimg = document.getElementById("settingsimg");
    settingsimg.style.filter = "brightness(100%)";
});

previous.addEventListener("mouseover", ()=>{
    const previousimg = document.getElementById("previousimg");
    previousimg.style.filter = "brightness(80%)";
});
previous.addEventListener("mouseout", ()=>{
    const previousimg = document.getElementById("previousimg");
    previousimg.style.filter = "brightness(100%)";
});

next.addEventListener("mouseover", ()=>{
    const nextimg = document.getElementById("nextimg");
    nextimg.style.filter = "brightness(80%)";
});
next.addEventListener("mouseout", ()=>{
    const nextimg = document.getElementById("nextimg");
    nextimg.style.filter = "brightness(100%)";
});