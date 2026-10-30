const download = document.getElementById("download");
download.addEventListener("pointerenter", ()=>{
    download.style.filter = "brightness(85%)";
});
download.addEventListener("pointerleave", ()=>{
    download.style.filter = "brightness(100%)";
});
download.addEventListener("pointerdown", ()=>{
    download.style.filter = "brightness(80%)";
});
download.addEventListener("pointerup", ()=>{
    download.style.filter = "brightness(100%)";
});