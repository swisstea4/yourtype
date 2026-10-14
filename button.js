const guidelines = document.getElementById("guidelines");
const undo = document.getElementById("undo");
const settings = document.getElementById("settings");
const decreasesz = document.getElementById("decrease");
const increasesz = document.getElementById("increase");
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