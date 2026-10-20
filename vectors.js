let width = 100, height = 100;
const scale = 2000;
const baseline = 0.69491525423;
let padding = 0;
function denormalize(pos) {
    let den = {...pos};
    den.x *= width;
    den.y *= height;
    den.x += padding;
    den.y += padding;
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
    padding = strokes[0][0].size/2;
    console.log(padding);
    for (const stroke of strokes) {
        for (const point of stroke) {
            minx = Math.min(minx, point.x);
            maxx = Math.max(maxx, point.x);
            miny = Math.min(miny, point.y);
            maxy = Math.max(maxy, point.y);
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
            if (stroke[i].x < 0 || stroke[i].y < 0) {
                console.log(stroke[i]);
            }
        }
    }
}

function createvector(strokes, letter) {
    setsize(strokes);
    console.log(strokes);
    const svgcontainer = document.getElementById("svgcontainer");
    let newsvg = "<svg ";
    newsvg += "id=\"svg"+letter+"\" ";
    newsvg += "width=\""+width+"\" ";
    newsvg += "height=\""+height+"\"";
    newsvg += ">";
    
    let newpath = "<path id=\"svgpath" + letter + "\"";
    newpath += "d=\""+vectorpath(strokes)+"\"";
    newpath += "style=\"" + vectorstyle(strokes) + "\"";
    newpath += "/>";

    newsvg += newpath;
    newsvg += "</svg>";
    svgcontainer.innerHTML += newsvg;
}

let strokes = [
    [
        {
            "x": 0.22669010487518956,
            "y": 0.6016786754608333,
            "color": "#1b1b1b",
            "size": 4
        },
        {
            "x": 0.23031985115273632,
            "y": 0.6016786754608333,
            "color": "#1b1b1b",
            "size": 4
        },
        {
            "x": 0.23394959743028307,
            "y": 0.6053085458025794,
            "color": "#1b1b1b",
            "size": 4
        },
        {
            "x": 0.2484686445725697,
            "y": 0.6125680383576729,
            "color": "#1b1b1b",
            "size": 4
        },
        {
            "x": 0.27024724630204944,
            "y": 0.6161976605710204,
            "color": "#1b1b1b",
            "size": 4
        },
        {
            "x": 0.284766293444336,
            "y": 0.6161976605710204,
            "color": "#1b1b1b",
            "size": 4
        },
        {
            "x": 0.29928534058662265,
            "y": 0.6161976605710204,
            "color": "#1b1b1b",
            "size": 4
        },
        {
            "x": 0.30654489517381583,
            "y": 0.6161976605710204,
            "color": "#1b1b1b",
            "size": 4
        },
        {
            "x": 0.3283234969032956,
            "y": 0.6125680383576729,
            "color": "#1b1b1b",
            "size": 4
        },
        {
            "x": 0.3501020366006757,
            "y": 0.5980489291832866,
            "color": "#1b1b1b",
            "size": 4
        },
        {
            "x": 0.3682508920526087,
            "y": 0.5799001977955529,
            "color": "#1b1b1b",
            "size": 4
        },
        {
            "x": 0.3791401929173486,
            "y": 0.5690108348987134,
            "color": "#1b1b1b",
            "size": 4
        },
        {
            "x": 0.39002949378208845,
            "y": 0.5581215960660731,
            "color": "#1b1b1b",
            "size": 4
        },
        {
            "x": 0.39728898633718196,
            "y": 0.5363429943365934,
            "color": "#1b1b1b",
            "size": 4
        },
        {
            "x": 0.4009187326147287,
            "y": 0.5145643926071136,
            "color": "#1b1b1b",
            "size": 4
        },
        {
            "x": 0.4009187326147287,
            "y": 0.4855262983225404,
            "color": "#1b1b1b",
            "size": 4
        },
        {
            "x": 0.4009187326147287,
            "y": 0.46737744287060734,
            "color": "#1b1b1b",
            "size": 4
        },
        {
            "x": 0.39728898633718196,
            "y": 0.46011795031551384,
            "color": "#1b1b1b",
            "size": 4
        },
        {
            "x": 0.39002949378208845,
            "y": 0.46011795031551384,
            "color": "#1b1b1b",
            "size": 4
        },
        {
            "x": 0.3863996854724421,
            "y": 0.46011795031551384,
            "color": "#1b1b1b",
            "size": 4
        },
        {
            "x": 0.3791401929173486,
            "y": 0.46011795031551384,
            "color": "#1b1b1b",
            "size": 4
        },
        {
            "x": 0.37551038460770214,
            "y": 0.46011795031551384,
            "color": "#1b1b1b",
            "size": 4
        },
        {
            "x": 0.37188063833015544,
            "y": 0.46374769659306064,
            "color": "#1b1b1b",
            "size": 4
        },
        {
            "x": 0.36099133746541556,
            "y": 0.4710071891481541,
            "color": "#1b1b1b",
            "size": 4
        },
        {
            "x": 0.3501020366006757,
            "y": 0.48915604460008716,
            "color": "#1b1b1b",
            "size": 4
        },
        {
            "x": 0.3392127977680354,
            "y": 0.5145643926071136,
            "color": "#1b1b1b",
            "size": 4
        },
        {
            "x": 0.3283234969032956,
            "y": 0.5508619794467804,
            "color": "#1b1b1b",
            "size": 4
        },
        {
            "x": 0.3210639423161024,
            "y": 0.5799001977955529,
            "color": "#1b1b1b",
            "size": 4
        },
        {
            "x": 0.3210639423161024,
            "y": 0.6270870234678598,
            "color": "#1b1b1b",
            "size": 4
        },
        {
            "x": 0.31743419603855566,
            "y": 0.6633847343717258,
            "color": "#1b1b1b",
            "size": 4
        },
        {
            "x": 0.31743419603855566,
            "y": 0.6996823212113926,
            "color": "#1b1b1b",
            "size": 4
        },
        {
            "x": 0.31743419603855566,
            "y": 0.7396097783928054,
            "color": "#1b1b1b",
            "size": 4
        },
        {
            "x": 0.3138044497610089,
            "y": 0.7650181263998319,
            "color": "#1b1b1b",
            "size": 4
        },
        {
            "x": 0.3138044497610089,
            "y": 0.7795371115100188,
            "color": "#1b1b1b",
            "size": 4
        },
        {
            "x": 0.3138044497610089,
            "y": 0.7867966040651124,
            "color": "#1b1b1b",
            "size": 4
        },
        {
            "x": 0.3138044497610089,
            "y": 0.7904264744068584,
            "color": "#1b1b1b",
            "size": 4
        }
    ]
];
createvector(strokes, 'A');