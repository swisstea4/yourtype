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

let s = [[{x: 0.7193719765866874, y: 0.29891640866873065, color: '#1b1b1b', size: 4},{x: 0.7229102167182663, y: 0.2953781685371517, color: '#1b1b1b', size: 4},{x: 0.7264484568498453, y: 0.2953781685371517, color: '#1b1b1b', size: 4},{x: 0.7335250580495356, y: 0.2953781685371517, color: '#1b1b1b', size: 4},{x: 0.7441397784442725, y: 0.29183992840557277, color: '#1b1b1b', size: 4},{x: 0.7512162587074304, y: 0.29183992840557277, color: '#1b1b1b', size: 4},{x: 0.7547544988390094, y: 0.29183992840557277, color: '#1b1b1b', size: 4},{x: 0.7547544988390094, y: 0.2953781685371517, color: '#1b1b1b', size: 4},{x: 0.7547544988390094, y: 0.3024546488003096, color: '#1b1b1b', size: 4},{x: 0.7547544988390094, y: 0.30599288893188853, color: '#1b1b1b', size: 4},{x: 0.7547544988390094, y: 0.30953125, color: '#1b1b1b', size: 4},{x: 0.7547544988390094, y: 0.313069490131579, color: '#1b1b1b', size: 4},{x: 0.7547544988390094, y: 0.3166077302631579, color: '#1b1b1b', size: 4},{x: 0.7547544988390094, y: 0.32014597039473686, color: '#1b1b1b', size: 4},{x: 0.7547544988390094, y: 0.3236842105263158, color: '#1b1b1b', size: 4},{x: 0.7547544988390094, y: 0.32722245065789474, color: '#1b1b1b', size: 4},{x: 0.7512162587074304, y: 0.32722245065789474, color: '#1b1b1b', size: 4},{x: 0.7476780185758515, y: 0.32722245065789474, color: '#1b1b1b', size: 4},{x: 0.7406015383126935, y: 0.32722245065789474, color: '#1b1b1b', size: 4},{x: 0.7370632981811145, y: 0.32722245065789474, color: '#1b1b1b', size: 4},{x: 0.7335250580495356, y: 0.32722245065789474, color: '#1b1b1b', size: 4},{x: 0.7299866969814242, y: 0.32722245065789474, color: '#1b1b1b', size: 4}]];
drawvector(s);