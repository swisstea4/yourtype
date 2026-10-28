const previewinput = document.getElementById("previewinput");
const previewbutton = document.getElementById("previewbutton");
previewbutton.addEventListener("pointerenter", ()=>{
   previewbutton.style.filter = "brightness(85%)";
});
previewbutton.addEventListener("pointerleave", ()=>{
   previewbutton.style.filter = "brightness(100%)";
});
previewbutton.addEventListener("pointerdown", ()=>{
    previewbutton.style.filter = "brightness(80%)";
});
previewbutton.addEventListener("pointerup", ()=>{
    previewbutton.style.filter = "brightness(100%)";
});
previewbutton.addEventListener("click", ()=>{
    const previewtext = document.getElementById("previewtext");
    previewtext.innerHTML = "";
    const input = previewinput.value;
    for (let letter of input) {
        const svg = document.getElementById("svg" + letter);
        if (svg == null) continue;
        previewtext.innerHTML += svg.outerHTML;
    }
});