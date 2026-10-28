let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '!', '"', '#', '\$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '\~'];
let drawnletters = JSON.parse(localStorage.getItem("drawnletters"));
let glyphs = [];
function createpath(strokes, letter) {
    const Path = new opentype.Path();
    return Path;
}
function createglyph(strokes, letter) {
    const Glyph = new opentype.Glyph({
        name: letter,
        unicode: letter.charCodeAt(0),
        advanceWidth: ,
        path: createpath(strokes, letter)
    });
    glyphs.push(Glyph);
}

for (const letter of letters) {
    if (drawnletters[letter] && drawnletters[letter].length > 0) {
        createglyph(drawnletters[letter], letter);
    }
}
const myFont = new opentype.Font({
    familyName: "myHandwriting",
    styleName: "regular",
    unitsPerEm: ,
    ascender: ,
    descender: ,
    glyphs: glyphs
});