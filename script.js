function openImage(img) {
    document.getElementById("preview").style.display = "flex";
    document.getElementById("previewImg").src = img.src;
}

function closeImage() {
    document.getElementById("preview").style.display = "none";
}