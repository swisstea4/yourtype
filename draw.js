canvas.addEventListener("pointerdown", (event)=> {
    pos = getpos(event);
    strokePoints.push(normalize(pos));
    strokes.push([normalize(pos)]);
    isDrawing = true;
    beginPath(pos);

});
canvas.addEventListener("pointermove", (event)=>{
    if (!isDrawing) return;
    beginPath(pos);
    pos = getpos(event);
    strokePoints.push(normalize(pos));
    strokes[strokes.length-1].push(normalize(pos));
    context.lineTo(pos.x, pos.y);
    context.stroke();
});
canvas.addEventListener("pointerup", ()=>{
    isDrawing = false;
});
canvas.addEventListener("pointercancel", ()=>{
    isDrawing = false;
});
const observer = new ResizeObserver(() =>{
    rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    redraw();
});
observer.observe(canvas.parentElement);