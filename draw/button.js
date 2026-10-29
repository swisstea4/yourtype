const guidelines = document.getElementById("guidelines");
const undo = document.getElementById("undo");
const settings = document.getElementById("settings");
const decrease = document.getElementById("decrease");
const increase = document.getElementById("increase");
const drawTools = document.getElementById("drawTools");

const previous = document.getElementById("previous");
const next = document.getElementById("next");

const close = document.getElementById("close");

const size1 = document.getElementById("size1");
const size2 = document.getElementById("size2");
const size3 = document.getElementById("size3");
const size4 = document.getElementById("size4");
let canvasc = 0;
drawTools.classList.toggle("size50");

guidelines.addEventListener("click", ()=>{
    const canvasbg = document.getElementById("canvasBG");
    const canvasbgtl = document.getElementById("canvasbgtl");
    const canvasbgtr = document.getElementById("canvasbgtr");
    canvasc = (canvasc+1)%3;
    canvasbg.src = "images/canvasbg" + canvasc.toString() + ".png";
    canvasbgtl.src = "images/canvasbgtl" + canvasc.toString() + ".png";
    canvasbgtr.src = "images/canvasbgtr" + canvasc.toString() + ".png";
});
undo.addEventListener("click",()=>{
    if (strokes.length === 0) return;
    strokes.pop();
    drawnletters[letters[currentLetter]] = [...strokes];
    localStorage.setItem("drawnletters", JSON.stringify(drawnletters));
    redraw();
});
settings.addEventListener("click", ()=>{
    const settingspage = document.getElementById("settingspage");
    settingspage.classList.toggle("show");
});
decrease.addEventListener("click", ()=>{
    if (canvasSize == 30) return;
    canvasSize -= 10;
    if (canvasSize == 30) {
        drawTools.classList.toggle("size40");
        drawTools.classList.toggle("size30");
    }
    if (canvasSize == 40) {
        drawTools.classList.toggle("size50");
        drawTools.classList.toggle("size40");
    }
    if (canvasSize == 50) {
        drawTools.classList.toggle("size60");
        drawTools.classList.toggle("size50");
    }
    if (canvasSize == 60) {
        drawTools.classList.toggle("size70");
        drawTools.classList.toggle("size60");
    }
});
increase.addEventListener("click", ()=>{
    if (canvasSize == 70) return;
    canvasSize += 10;
    if (canvasSize == 40) {
        drawTools.classList.toggle("size30");
        drawTools.classList.toggle("size40");
    }
    if (canvasSize == 50) {
        drawTools.classList.toggle("size40");
        drawTools.classList.toggle("size50");
    }
    if (canvasSize == 60) {
        drawTools.classList.toggle("size50");
        drawTools.classList.toggle("size60");
    }
    if (canvasSize == 70) {
        drawTools.classList.toggle("size60");
        drawTools.classList.toggle("size70");
    }
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

function goLeft() {
    if (currentLetter == 0) return;
    const canvasbg = document.getElementById("canvasBG");
    const canvasbgtl = document.getElementById("canvasbgtl");
    const previouscoverup = document.getElementById("previouscoverup");
    context.clearRect(0, 0, canvas.width, canvas.height);
    canvasbg.style.objectPosition = "left";
    canvasbg.style.right = "0%";
    previouscoverup.classList.toggle("show");
    canvasbg.classList.toggle("wipe");
    canvasbgtl.classList.toggle("wipe");
    setTimeout(()=>{
        canvasbg.classList.add("no-transition");
        canvasbg.classList.remove("wipe");
        canvasbg.offsetWidth;
        canvasbg.classList.remove("no-transition");

        canvasbgtl.classList.add("no-transition");
        canvasbgtl.classList.remove("wipe");
        canvasbgtl.offsetWidth;
        canvasbgtl.classList.remove("no-transition");
        previouscoverup.classList.toggle("show");
    }, 550);
    const lettershow = document.getElementById("letter");
    drawnletters[letters[currentLetter]] = [...strokes];
    localStorage.setItem("drawnletters", JSON.stringify(drawnletters));
    currentLetter--;
    if (!(letters[currentLetter] in drawnletters)) {
        drawnletters[letters[currentLetter]] = [];
    }
    lettershow.textContent = letters[currentLetter];
    strokes = drawnletters[letters[currentLetter]];
    setTimeout(()=>{
        redraw();
    }, 500);
};
function goRight() {
    drawnletters[letters[currentLetter]] = [...strokes];
    localStorage.setItem("drawnletters", JSON.stringify(drawnletters));
    if (currentLetter == letters.length-1) {
        window.location = "../preview";
        return;
    }
    const canvasbg = document.getElementById("canvasBG");
    const canvasbgtr = document.getElementById("canvasbgtr");
    const nextcoverup = document.getElementById("nextcoverup");
    context.clearRect(0, 0, canvas.width, canvas.height);
    canvasbg.style.objectPosition = "right";
    canvasbg.style.removeProperty("right");
    nextcoverup.classList.toggle("show");
    canvasbg.classList.toggle("wipe");
    canvasbgtr.classList.toggle("wipe");
    setTimeout(()=>{
        canvasbg.classList.add("no-transition");
        canvasbg.classList.remove("wipe");
        canvasbg.offsetWidth;
        canvasbg.classList.remove("no-transition");

        canvasbgtr.classList.add("no-transition");
        canvasbgtr.classList.remove("wipe");
        canvasbgtr.offsetWidth;
        canvasbgtr.classList.remove("no-transition");
        nextcoverup.classList.toggle("show");
    }, 550);
    const lettershow = document.getElementById("letter");
    currentLetter++;
    if (!(letters[currentLetter] in drawnletters)) {
        drawnletters[letters[currentLetter]] = [];
    }
    lettershow.textContent = letters[currentLetter];
    strokes = drawnletters[letters[currentLetter]];
    setTimeout(()=>{
        redraw();
    }, 500);
}
previous.addEventListener("click", goLeft);
document.addEventListener("keydown", (event)=>{
    if (event.key == "ArrowLeft") {
        goLeft();
    }
});
next.addEventListener("click", goRight);
document.addEventListener("keydown", (event)=>{
    if (event.key == "ArrowRight") {
        goRight();
    }
});
document.addEventListener("keydown", (event)=>{
    if (event.key == "Enter") {
        goRight();
    }
});

close.addEventListener("click", ()=>{
    const baseArrow = document.getElementById("baseArrow");
    const baseGuide = document.getElementById("baseGuide");
    baseArrow.classList.toggle("hide");
    baseGuide.classList.toggle("hide");
    close.classList.toggle("hide");
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
    nextimg.style.filter = "brightness(70%)";
});
next.addEventListener("pointerleave", ()=>{
    const nextimg = document.getElementById("nextimg");
    nextimg.style.filter = "brightness(100%)";
});

size1.addEventListener("pointerenter", ()=>{
    size1.style.background = "rgba(255, 255, 255, 0.1)";
});
size1.addEventListener("pointerleave", ()=>{
    size1.style.background = "none";
});
size2.addEventListener("pointerenter", ()=>{
    size2.style.background = "rgba(255, 255, 255, 0.1)";
});
size2.addEventListener("pointerleave", ()=>{
    size2.style.background = "none";
});
size3.addEventListener("pointerenter", ()=>{
    size3.style.background = "rgba(255, 255, 255, 0.1)";
});
size3.addEventListener("pointerleave", ()=>{
    size3.style.background = "none";
});
size4.addEventListener("pointerenter", ()=>{
    size4.style.background = "rgba(255, 255, 255, 0.1)";
});
size4.addEventListener("pointerleave", ()=>{
    size4.style.background = "none";
});

guidelines.addEventListener("pointerdown", ()=>{
    const guidelinesimg = document.getElementById("guidelinesimg");
    guidelinesimg.style.filter = "brightness(80%)";
});
guidelines.addEventListener("pointerup", ()=>{
    const guidelinesimg = document.getElementById("guidelinesimg");
    guidelinesimg.style.filter = "brightness(85%)";
});
undo.addEventListener("pointerdown", ()=>{
    const undoimg = document.getElementById("undoimg");
    undoimg.style.filter = "brightness(80%)";
});
undo.addEventListener("pointerup", ()=>{
    const undoimg = document.getElementById("undoimg");
    undoimg.style.filter = "brightness(85%)";
});
settings.addEventListener("pointerdown", ()=>{
    const settingsimg = document.getElementById("settingsimg");
    settingsimg.style.filter = "brightness(80%)";
});
settings.addEventListener("pointerup", ()=>{
    const settingsimg = document.getElementById("settingsimg");
    settingsimg.style.filter = "brightness(85%)";
});
decrease.addEventListener("pointerdown", ()=>{
    const decreaseimg = document.getElementById("decreaseimg");
    decreaseimg.style.filter = "brightness(50%)";
});
decrease.addEventListener("pointerup", ()=>{
    const decreaseimg = document.getElementById("decreaseimg");
    decreaseimg.style.filter = "brightness(70%)";
});
increase.addEventListener("pointerdown", ()=>{
    const increaseimg = document.getElementById("increaseimg");
    increaseimg.style.filter = "brightness(50%)";
});
increase.addEventListener("pointerup", ()=>{
    const increaseimg = document.getElementById("increaseimg");
    increaseimg.style.filter = "brightness(70%)";
});
previous.addEventListener("pointerdown", ()=>{
    const previousimg = document.getElementById("previousimg");
    previousimg.style.filter = "brightness(50%)";
});
previous.addEventListener("pointerup", ()=>{
    const previousimg = document.getElementById("previousimg");
    previousimg.style.filter = "brightness(70%)";
});
next.addEventListener("pointerdown", ()=>{
    const nextimg = document.getElementById("nextimg");
    nextimg.style.filter = "brightness(50%)";
});
next.addEventListener("pointerup", ()=>{
    const nextimg = document.getElementById("nextimg");
    nextimg.style.filter = "brightness(70%)";
});
size1.addEventListener("pointerdown", ()=>{
    size1.style.background = "rgba(255, 255, 255, 0.2)";
});
size1.addEventListener("pointerup", ()=>{
    size1.style.background = "rgba(255, 255, 255, 0.1)";
});
size2.addEventListener("pointerdown", ()=>{
    size2.style.background = "rgba(255, 255, 255, 0.2)";
});
size2.addEventListener("pointerup", ()=>{
    size2.style.background = "rgba(255, 255, 255, 0.1)";
});
size3.addEventListener("pointerdown", ()=>{
    size3.style.background = "rgba(255, 255, 255, 0.2)";
});
size3.addEventListener("pointerup", ()=>{
    size3.style.background = "rgba(255, 255, 255, 0.1)";
});
size4.addEventListener("pointerdown", ()=>{
    size4.style.background = "rgba(255, 255, 255, 0.2)";
});
size4.addEventListener("pointerup", ()=>{
    size4.style.background = "rgba(255, 255, 255, 0.1)";
});