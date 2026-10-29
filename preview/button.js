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

function showpreview() {
    const previewtext = document.getElementById("previewtext");
    const input = previewinput.value;
    previewtext.innerHTML = input;
}
previewbutton.addEventListener("click", ()=>{
    showpreview();
});
document.addEventListener("keydown", (event)=>{
    if (event.key == "Enter") {
        showpreview();
    }
});