let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '!', '"', '#', '\$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '\~'];
let drawnletters = JSON.parse(localStorage.getItem("drawnletters"));
let glyphs = [];

let ascent = 0, descent = 0, height = 0, scale = 80, padding = 0;
const baseline = 0.69491525423;
function precalc() {
    for (const letter of letters) {
        if (drawnletters[letter] && drawnletters[letter].length > 0) {
            for (const stroke of drawnletters[letter]) {
                for (const point of stroke) {
                    ascent = Math.max(ascent, baseline-point.y);
                    descent = Math.max(descent, point.y-baseline);
                    padding = Math.max(padding, point.size/2);
                }
            }
        }
    }
    ascent = (ascent + padding)*scale;
    descent = (descent + padding)*scale;
    height = ascent+descent;
    descent = -descent;
}
precalc();

function denormalize(point, minx) {
    let den = {...point};
    den.x = (point.x-minx+padding)*scale;
    den.y = (baseline-point.y)*scale - descent;
    den.size = point.size*scale;
    return den;
}

function createpath(strokes) {
    let minx = 1;
    for (const stroke of strokes) {
        for (const point of stroke) {
            minx = Math.min(minx, point.x);
        }
    }
    const Path = new opentype.Path();

    function createcircle(pointl, pointr) {
        let dx = pointl.x - pointr.x;
        let dy = pointl.y - pointr.y;
        let r = Math.sqrt(dx*dx + dy*dy)/2;
        let center = {x: (pointl.x + pointr.x)/2, y: (pointl.y + pointr.y)/2};

        Path.moveTo(center.x + r, center.y);
        Path.quadraticCurveTo(center.x + r, center.y + r, center.x, center.y + r);
        Path.quadraticCurveTo(center.x - r, center.y + r, center.x - r, center.y);
        Path.quadraticCurveTo(center.x - r, center.y - r, center.x, center.y - r);
        Path.quadraticCurveTo(center.x + r, center.y - r, center.x + r, center.y);
        Path.closePath();
    }

    let left = [], right = [];
    for (const stroke of strokes) {
        if (stroke.length == 0) continue;
        left.push([]);
        right.push([]);
        for (let i = 0; i < stroke.length; i++) {
            let point1, point2;
            if (i > 0) {
                point1 = denormalize(stroke[i-1], minx);
            }
            else {
                point1 = denormalize(stroke[i], minx);
            }
            if (i < stroke.length-1) {
                point2 = denormalize(stroke[i+1], minx);
            }
            else {
                point2 = denormalize(stroke[i], minx);
            }
            let d = {x: point2.x-point1.x, y: point2.y-point1.y};
            let dlength = Math.sqrt(d.x*d.x + d.y*d.y);
            if (dlength == 0) {
                let point = denormalize(stroke[i], minx);
                let pointl = {x: point.x + point.size/2, y: point.y};
                let pointr = {x: point.x - point.size/2, y: point.y};
                left[left.length-1].push(pointl);
                right[right.length-1].push(pointr);
            }
            else {
                let n = {x: (-d.y)/dlength, y: d.x/dlength};
                let point = denormalize(stroke[i], minx);
                let pointl = {x: point.x + point.size/2 * n.x, y: point.y + point.size/2 * n.y};
                let pointr = {x: point.x - point.size/2 * n.x, y: point.y - point.size/2 * n.y};
                left[left.length-1].push(pointl);
                right[right.length-1].push(pointr);
            }
        }
        right[right.length-1].reverse();
    }
    for (let i = 0; i < left.length; i++) {
        const lstroke = left[i];
        const rstroke = right[i];
        let pos = lstroke[0];

        if (lstroke.length == 1) {
            let pointl = lstroke[0];
            let pointr = rstroke[0];
            createcircle(pointl, pointr);
            continue;
        }

        let mid = pos;
        Path.moveTo(mid.x, mid.y);
        for (let i = 1; i < lstroke.length; i++) {
            const newPos = lstroke[i];
            const newMid = {
                x: (pos.x + newPos.x)/2,
                y: (pos.y + newPos.y)/2
            }
            Path.quadraticCurveTo(pos.x, pos.y, newMid.x, newMid.y);
            pos = newPos;
            mid = newMid;
        }
        Path.lineTo(pos.x, pos.y);

        pos = rstroke[0];
        mid = pos;
        for (let i = 1; i < rstroke.length; i++) {
            const newPos = rstroke[i];
            const newMid = {
                x: (pos.x + newPos.x)/2,
                y: (pos.y + newPos.y)/2,
            }
            Path.quadraticCurveTo(pos.x, pos.y, newMid.x, newMid.y);
            pos = newPos;
            mid = newMid;
        }
        Path.lineTo(pos.x, pos.y);
        Path.closePath();

        createcircle(lstroke[lstroke.length-1], rstroke[0]);
        createcircle(rstroke[rstroke.length-1], lstroke[0]);
    }
    return Path;
}

function findWidth(strokes) {
    let maxx = 0, minx = 1;
    for (const stroke of strokes) {
        for (const point of stroke) {
            maxx = Math.max(point.x, maxx);
            minx = Math.min(point.x, minx);
        }
    }
    const Width = (maxx - minx + 2*padding)*scale;
    return Width;
}
function createglyph(strokes, letter) {
    const Glyph = new opentype.Glyph({
        name: letter,
        unicode: letter.charCodeAt(0),
        advanceWidth: findWidth(strokes),
        path: createpath(strokes)
    });
    glyphs.push(Glyph);
}

for (const letter of letters) {
    if (drawnletters[letter] && drawnletters[letter].length > 0) {
        createglyph(drawnletters[letter], letter);
    }
}
const notdef = new opentype.Glyph({
    name: ".notdef",
    advanceWidth: findWidth(drawnletters[".notdef"]),
    path: createpath(drawnletters[".notdef"])
});
const myFont = new opentype.Font({
    familyName: "myHandwriting",
    styleName: "regular",
    unitsPerEm: 1000,
    ascender: ascent,
    descender: descent,
    glyphs: [notdef, ...glyphs]
});