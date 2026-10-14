canvas.addEventListener("pointerdown", (event)=> {
    if (!event.button === 0) return;
    canvas.setPointerCapture(event.pointerId);
    pos = getpos(event);
    mid = pos;
    strokePoints.push(normalize(pos));
    strokes.push([normalize(pos)]);
    isDrawing = true;
    beginPath(pos);

});
canvas.addEventListener("pointermove", (event)=>{
    if (!isDrawing) return;
    beginPath(mid);
    const newPos = getpos(event);
    strokePoints.push(normalize(newPos));
    strokes[strokes.length-1].push(normalize(newPos));
    const newMid = {
        x : (pos.x + newPos.x)/2,
        y : (pos.y + newPos.y)/2
    };
    context.moveTo(mid.x, mid.y);
    context.quadraticCurveTo(pos.x, pos.y, newMid.x, newMid.y);
    context.stroke();
    pos = newPos;
    mid = newMid;
});
canvas.addEventListener("pointerup", ()=>{
    if (!isDrawing) return;
    isDrawing = false;
    beginPath(mid);
    context.lineTo(pos.x, pos.y);
    context.stroke();
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