function createvector(strokes, letter) {
    let width = 100, height = 100;
    const scale = 500;
    let baseline = 0.69491525423;
    let padding = 0;
    function denormalize(pos) {
        let den = {...pos};
        den.x *= (width-2*padding);
        den.y *= (height-2*padding);
        den.x += padding;
        den.y += padding;
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
    function vectorpath(stroke) {
        let d = "";
        if (stroke.length == 0) return d;
        let pos = denormalize(stroke[0]);
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
        return d;
    }

    function vectorcircle(stroke) {
        let circle = "r=\"" + (stroke[0].size/2).toString() + "\" ";
        let den = denormalize(stroke[0]);
        circle += "cx=\"" + den.x.toString() + "\" ";
        circle += "cy=\"" + den.y.toString() + "\" ";
        circle += "fill=\"" + stroke[0].color + "\" ";
        return circle;
    }

    function vectorstyle(stroke) {
        let strokeColor = stroke[0].color;
        let strokeSize = stroke[0].size;
        let style = "stroke:" + strokeColor + "; stroke-width:" + strokeSize.toString() + "; stroke-linecap: round; stroke-linejoin: round";
        return style;
    }

    function setsize(strokes) {
        let minx = 1, maxx = 0, miny = 1, maxy = 0;
        padding = 0;
        for (const stroke of strokes) {
            for (const point of stroke) {
                minx = Math.min(minx, point.x);
                maxx = Math.max(maxx, point.x);
                miny = Math.min(miny, point.y);
                maxy = Math.max(maxy, point.y);
                padding = Math.max(padding, point.size/2);
            }
        }
        width = (maxx-minx)*scale + 2*padding;
        height = (maxy-miny)*scale + 2*padding;

        let origin = {
            x: minx,
            y: miny
        };
        for (const stroke of strokes) {
            for (let i = 0; i < stroke.length; i++) {
                stroke[i].x -= origin.x;
                stroke[i].y -= origin.y;
                stroke[i].x /= (maxx-minx);
                stroke[i].y /= (maxy-miny);
            }
        }
        baseline = (baseline-origin.y)/(maxy-miny);
    }

    setsize(strokes);
    const svgcontainer = document.getElementById("svgcontainer");
    let newsvg = "<svg ";
    newsvg += "id=\"svg"+letter+"\" ";
    newsvg += "width=\""+width+"\" ";
    newsvg += "height=\""+height+"\"";
    newsvg += ">";
    
    for (let i = 0; i < strokes.length; i++) {
        let stroke = strokes[i];
        if (stroke.length == 1) {
            let newcircle = "<circle id=\"svgpath" + letter + i.toString() + "\" ";
            newcircle += vectorcircle(stroke);
            newcircle += "/>";
            
            newsvg += newcircle;
        }
        else {
            let newpath = "<path id=\"svgpath" + letter + i.toString() + "\"";
            newpath += "d=\""+vectorpath(stroke)+"\"";
            newpath += "style=\"" + vectorstyle(stroke) + "\"";
            newpath += "/>";

            newsvg += newpath;
        }
    }

    newsvg += "</svg>";
    svgcontainer.innerHTML += newsvg;
}
let drawnletters = JSON.parse(localStorage.getItem("drawnletters"));
for (const letter in drawnletters) {
    if (drawnletters[letter].length > 0) {
        createvector(drawnletters[letter], letter);
    }
}