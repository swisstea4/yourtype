canvas.addEventListener("pointerdown", (event)=> {
    if (!event.button === 0) return;
    canvas.setPointerCapture(event.pointerId);
    pos = getpos(event);
    pos.size = strokeSize;
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
    newPos.size = strokeSize;
    strokePoints.push(normalize(newPos));
    strokes[strokes.length-1].push(normalize(newPos));
    const newMid = {
        x : (pos.x + newPos.x)/2,
        y : (pos.y + newPos.y)/2,
        size: newPos.size
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
    if (strokes[strokes.length-1].length == 1) {
        beginPath(pos);
        context.arc(pos.x, pos.y, strokeSize/2, 0, 2*Math.PI);
        context.fill();
    }
    beginPath(mid);
    context.lineTo(pos.x, pos.y);
    context.stroke();
});
canvas.addEventListener("pointercancel", ()=>{
    isDrawing = false;
});