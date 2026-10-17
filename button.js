const guidelines = document.getElementById("guidelines");
const undo = document.getElementById("undo");
const settings = document.getElementById("settings");
const decrease = document.getElementById("decrease");
const increase = document.getElementById("increase");

const previous = document.getElementById("previous");
const next = document.getElementById("next");

const black = document.getElementById("black");
const red = document.getElementById("red");
const green = document.getElementById("green");
const yellow = document.getElementById("yellow");
const white = document.getElementById("white");
const blue = document.getElementById("blue");
const pink = document.getElementById("pink");
const brown = document.getElementById("brown");

const size1 = document.getElementById("size1");
const size2 = document.getElementById("size2");
const size3 = document.getElementById("size3");
const size4 = document.getElementById("size4");
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

black.addEventListener("click", ()=>{
    strokeColor = "#1b1b1b";
});
red.addEventListener("click", ()=>{
    strokeColor = "#ff3131";
});
green.addEventListener("click", ()=>{
    strokeColor = "#00bf63";
});
yellow.addEventListener("click", ()=>{
    strokeColor = "#ffde59";
});
white.addEventListener("click", ()=>{
    strokeColor = "#ffffff";
});
blue.addEventListener("click", ()=>{
    strokeColor = "#38b6ff";
});
pink.addEventListener("click", ()=>{
    strokeColor = "#ff66c4";
});
brown.addEventListener("click", ()=>{
    strokeColor = "#9f5139";
});

size1.addEventListener("click", ()=>{
    strokeSize = 4;
});
size2.addEventListener("click", ()=>{
    strokeSize = 6;
});
size3.addEventListener("click", ()=>{
    strokeSize = 8;
});
size4.addEventListener("click", ()=>{
    strokeSize = 10;
});