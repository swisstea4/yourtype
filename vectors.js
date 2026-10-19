function moveto(pos) {
    return "M" + pos.x.toString() + " " + pos.y.toString() + " ";
}
function lineto(pos) {
    return "L" + pos.x.toString() + " " << pos.y.toString() + " ";
}
function quadraticto(pos1, pos2) {
    return "Q" + pos1.x.toString() + " " + pos1.y.toString() + " " + pos2.x.toString() + " " + pos2.y.toString() + " ";
}
function vectorpath() {
    let d = "";
    for (const stroke of strokes) {
        if (stroke.length == 0) continue;
        let pos = stroke[0];
        if (stroke.length == 1) {
            // circle
            continue;
        }
        let mid = pos;
        for (let newPos of stroke) {
            d += moveTo(mid);
            const newMid = {
                x : (pos.x + newPos.x)/2,
                y : (pos.y + newPos.y)/2
            }
            d += quadraticto(pos, newMid);
            pos = newPos;
            mid = newMid;
        }
        d += moveto(mid);
        d += lineto(pos);
    }
}
