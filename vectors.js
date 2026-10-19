let width = 100, height = 100;
const scale = 1;
const baseline = 0.66;
function denormalize(pos) {
    let den = {...pos};
    den.x *= width;
    den.y *= height;
    den.x = Math.round(den.x*1000)/1000;
    den.y = Math.round(den.y*1000)/1000;
    return den;
}
function moveto(pos) {
    return "M" + pos.x.toString() + " " + pos.y.toString() + " ";
}
function lineto(pos) {
    return "L" + pos.x.toString() + " " + pos.y.toString() + " ";
}
function quadraticto(pos1, pos2) {
    return "Q" + pos1.x.toString() + " " + pos1.y.toString() + " " + pos2.x.toString() + " " + pos2.y.toString() + " ";
}
function vectorpath(strokes) {
    let d = "";
    for (const stroke of strokes) {
        if (stroke.length == 0) continue;
        let pos = denormalize(stroke[0]);
        if (stroke.length == 1) {
            // circle
            continue;
        }
        let mid = pos;
        for (let newPos of stroke) {
            newPos = denormalize(newPos);
            d += moveto(mid);
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
    return d;
}

function vectorstyle(strokes) {
    let strokeColor = strokes[0][0].color;
    let strokeSize = strokes[0][0].size;
    let style = "stroke:" + strokeColor + "; stroke-width:" + strokeSize.toString();
    return style;
}

function setsize(strokes) {
    let minx = 1, maxx = 0, miny = 1, maxy = 0;
    for (const stroke of strokes) {
        for (const point of stroke) {
            minx = Math.min(minx, point.x);
            maxx = Math.max(maxx, point.x);
            miny = Math.min(miny, point.y);
            maxy = Math.max(maxy, point.y);
        }
    }
    width = (maxx-minx)*scale;
    height = (maxy-miny)*scale;

    let origin = {
        x: minx,
        y: miny
    };
    for (const stroke of strokes) {
        for (let i = 0; i < stroke.length; i++) {
            stroke[i].x -= origin.x;
            stroke[i].y -= baseline;
        }
    }
}

function createvector(strokes, letter) {
    const newsvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    newsvg.setAttribute("id", "svg" + letter);
    setsize(strokes);
    newsvg.setAttribute("width", width);
    newsvg.setAttribute("height", height);
}