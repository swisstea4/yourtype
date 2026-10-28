const seepreview = document.getElementById("previewbutton");
seepreview.addEventListener("pointerenter", ()=>{
   seepreview.style.filter = "brightness(85%)";
});
seepreview.addEventListener("pointerleave", ()=>{
   seepreview.style.filter = "brightness(100%)";
});
seepreview.addEventListener("pointerdown", ()=>{
    seepreview.style.filter = "brightness(80%)";
});
seepreview.addEventListener("pointerup", ()=>{
    seepreview.style.filter = "brightness(100%)";
});