let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '!', '"', '#', '\$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '\~'];
let drawnletters = JSON.parse(localStorage.getItem("drawnletters"));
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
    ascent = ascent*scale + padding;
    descent = descent*scale + padding;
    height = ascent+descent;
}
precalc();
function denormalize(point, minx) {
    let den = {...point};
    den.x = (point.x-minx)*scale + padding;
    den.y = (point.y-baseline)*scale + ascent;
    return den;
}

function createvector(strokes, letter) {
    let minx = 1, maxx = 0;
    for (const stroke of strokes) {
        for (const point of stroke) {
            minx = Math.min(minx, point.x);
            maxx = Math.max(maxx, point.x);
        }
    }
    let width = (maxx-minx)*scale + 2*padding;

    function moveto(pos) {
        return "M" + pos.x.toString() + " " + pos.y.toString() + " ";
    }
    function lineto(pos) {
        return "L" + pos.x.toString() + " " + pos.y.toString() + " ";
    }
    function quadraticto(pos1, pos2) {
        return "Q" + pos1.x.toString() + " " + pos1.y.toString() + " " + pos2.x.toString() + " " + pos2.y.toString() + " ";
    }
    function vectorpath(stroke) {
        let d = "";
        if (stroke.length == 0) return d;
        let pos = denormalize(stroke[0], minx);
        let mid = pos;
        for (let newPos of stroke) {
            newPos = denormalize(newPos, minx);
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
        return d;
    }
    function vectorcircle(stroke) {
        let circle = "r=\"" + (stroke[0].size/2).toString() + "\" ";
        let den = denormalize(stroke[0], minx);
        circle += "cx=\"" + den.x.toString() + "\" ";
        circle += "cy=\"" + den.y.toString() + "\" ";
        circle += "fill=\"" + stroke[0].color + "\" ";
        return circle;
    }
    function vectorstyle(stroke) {
        let strokeColor = stroke[0].color;
        let strokeSize = stroke[0].size;
        let style = "fill:none; stroke:" + strokeColor + "; stroke-width:" + strokeSize.toString() + "; stroke-linecap: round; stroke-linejoin: round";
        return style;
    }
    
    const svgcontainer = document.getElementById("svgcontainer");
    let newsvg = "<svg ";
    newsvg += "id=\"svg"+letter.charCodeAt(0)+"\" ";
    newsvg += "width=\""+width+"\" ";
    newsvg += "height=\""+height+"\"";
    newsvg += ">";

    for (let i = 0; i < strokes.length; i++) {
        let stroke = strokes[i];
        if (stroke.length == 1) {
            let newcircle = "<circle id=\"svgpath" + letter.charCodeAt(0) + "_" + i.toString() + "\" ";
            newcircle += vectorcircle(stroke);
            newcircle += "/>";
            
            newsvg += newcircle;
        }
        else {
            let newpath = "<path id=\"svgpath" + letter.charCodeAt(0) + "_" + i.toString() + "\" ";
            newpath += "d=\""+vectorpath(stroke)+"\" ";
            newpath += "style=\"" + vectorstyle(stroke) + "\"";
            newpath += "/>";

            newsvg += newpath;
        }
    }
    newsvg += "</svg>";
    svgcontainer.innerHTML += newsvg;
}

for (const letter of letters) {
    if (drawnletters[letter] && drawnletters[letter].length > 0) {
        createvector(drawnletters[letter], letter);
    }
}