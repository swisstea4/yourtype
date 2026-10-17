const guidelines = document.getElementById("guidelines");
const undo = document.getElementById("undo");
const settings = document.getElementById("settings");
const decrease = document.getElementById("decrease");
const increase = document.getElementById("increase");

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
decrease.addEventListener("click", ()=>{
    console.log("e");
    if (canvasSize > 30) {
        const drawTools = document.getElementById("drawTools");
        canvasSize -= 10;
        drawTools.style.fontSize = canvasSize.toString() + "vmin";
    }
});
increase.addEventListener("click", ()=>{
    if (canvasSize < 70) {
        const drawTools = document.getElementById("drawTools");
        canvasSize += 10;
        drawTools.style.fontSize = canvasSize.toString() + "vmin";
    }
});

guidelines.addEventListener("pointerenter", ()=>{
    const guidelinesimg = document.getElementById("guidelinesimg");
    guidelinesimg.style.filter = "brightness(85%)";
});
guidelines.addEventListener("pointerleave", ()=>{
    const guidelinesimg = document.getElementById("guidelinesimg");
    guidelinesimg.style.filter = "brightness(100%)";
});

undo.addEventListener("pointerenter", ()=>{
    const undoimg = document.getElementById("undoimg");
    undoimg.style.filter = "brightness(85%)";
});
undo.addEventListener("pointerleave", ()=>{
    const undoimg = document.getElementById("undoimg");
    undoimg.style.filter = "brightness(100%)";
});

settings.addEventListener("pointerenter", ()=>{
    const settingsimg = document.getElementById("settingsimg");
    settingsimg.style.filter = "brightness(85%)";
});
settings.addEventListener("pointerleave", ()=>{
    const settingsimg = document.getElementById("settingsimg");
    settingsimg.style.filter = "brightness(100%)";
});

decrease.addEventListener("pointerenter", ()=>{
    const decreaseimg = document.getElementById("decreaseimg");
    decreaseimg.style.filter = "brightness(70%)";
});
decrease.addEventListener("pointerleave", ()=>{
    const decreaseimg = document.getElementById("decreaseimg");
    decreaseimg.style.filter = "brightness(100%)";
});

increase.addEventListener("pointerenter", ()=>{
    const increaseimg = document.getElementById("increaseimg");
    increaseimg.style.filter = "brightness(70%)";
});
increase.addEventListener("pointerleave", ()=>{
    const increaseimg = document.getElementById("increaseimg");
    increaseimg.style.filter = "brightness(100%)";
});

previous.addEventListener("pointerenter", ()=>{
    const previousimg = document.getElementById("previousimg");
    previousimg.style.filter = "brightness(70%)";
});
previous.addEventListener("pointerleave", ()=>{
    const previousimg = document.getElementById("previousimg");
    previousimg.style.filter = "brightness(100%)";
});

next.addEventListener("pointerenter", ()=>{
    const nextimg = document.getElementById("nextimg");
    nextimg.style.filter = "brightness(85%)";
});
next.addEventListener("pointerleave", ()=>{
    const nextimg = document.getElementById("nextimg");
    nextimg.style.filter = "brightness(100%)";
});