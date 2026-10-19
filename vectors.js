const vectorw = 400;
const vectorh = 400;
function denormalize(pos) {
    let den = {...pos};
    den.x *= vectorw;
    den.y *= vectorh;
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

function drawvector(strokes) {
    let d = vectorpath(strokes);
    d.slice(0, -1);
    const svgpath = document.getElementById("svgpath");
    svgpath.setAttribute("d", d);
    console.log(svgpath);
}

let s = [[{x: 0.3549314894543344, y: 0.18215387964396285, color: '#1b1b1b', size: 4} , {x: 0.3549314894543344, y: 0.18569224071207432, color: '#1b1b1b', size: 4} , {x: 0.3549314894543344, y: 0.1927687209752322, color: '#1b1b1b', size: 4} , {x: 0.3549314894543344, y: 0.20338344136996905, color: '#1b1b1b', size: 4} , {x: 0.3549314894543344, y: 0.21753652283281733, color: '#1b1b1b', size: 4} , {x: 0.3549314894543344, y: 0.22461300309597523, color: '#1b1b1b', size: 4} , {x: 0.3549314894543344, y: 0.23876608455882353, color: '#1b1b1b', size: 4} , {x: 0.3549314894543344, y: 0.24584256482198144, color: '#1b1b1b', size: 4} , {x: 0.3549314894543344, y: 0.2564572852167183, color: '#1b1b1b', size: 4} , {x: 0.3549314894543344, y: 0.27768684694272444, color: '#1b1b1b', size: 4} , {x: 0.35139318885448917, y: 0.29183992840557277, color: '#1b1b1b', size: 4} , {x: 0.35139318885448917, y: 0.30599288893188853, color: '#1b1b1b', size: 4} , {x: 0.35139318885448917, y: 0.313069490131579, color: '#1b1b1b', size: 4} , {x: 0.35139318885448917, y: 0.3236842105263158, color: '#1b1b1b', size: 4} , {x: 0.35139318885448917, y: 0.32722245065789474, color: '#1b1b1b', size: 4} , {x: 0.35139318885448917, y: 0.33076069078947373, color: '#1b1b1b', size: 4} , {x: 0.35139318885448917, y: 0.33429905185758513, color: '#1b1b1b', size: 4} , {x: 0.35139318885448917, y: 0.33783729198916407, color: '#1b1b1b', size: 4} , {x: 0.34785494872291023, y: 0.33783729198916407, color: '#1b1b1b', size: 4}]];
drawvector(s);