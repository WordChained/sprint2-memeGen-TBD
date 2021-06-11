'use strict';
var gCanvas;
var gCtx;

function onInit() {
    createImages(18);
    addAttributeToImgs()
    gCanvas = document.querySelector('.canvas');
    gCtx = gCanvas.getContext('2d');
    resizeCanvas()
    window.addEventListener('resize', function() {
        gCanvas.width = window.innerWidth
        gCanvas.height = window.innerHeight
        resizeCanvas()
        loadImgToCanvas();
    })
    loadImgToCanvas();
    resizeCanvas()
}

function OnTextPick(ev) {
    var x = ev.offsetX
    var y = ev.offsetY
    console.log('x:', x, 'y:', y)
}

// when we type
function onTextInput(text) {
    setUserText(text)
}

//when we hit enter
function onSubmitText(ev, input) {
    submitText(ev, input)
}

function onSizeChange(elSize) {
    changeSize(elSize)
}

function onImgClick(elImg) {
    getImg(elImg)
    renderCanvas();
    showEditor();
    resizeCanvas()
}

function onClearCanvas() {
    if (!confirm('are you sure you want to delete everything?')) return
    clearCanvas()
    loadImgToCanvas()
    gMeme.selectedLineIdx = 0;
}

function onSwitchLine(elMove) {
    switchLine(elMove)
}

function onMoveText(value) {
    moveText(value)
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
    document.querySelector('.btn-menu').classList.toggle('close')
}

function onGalleryClick() {
    //reseting the lines
    gMeme.lines = []
        // clearing the canvas
    clearCanvas()
        // showing gallery
    showGallery()
}

function onFontSelect(elFont) {
    console.log('elFont', elFont)
    setFont(elFont)
}

function onColorChange(elColor) {

}

function onAlign(elDirection) {

}

function onDelete() {

}

function onStickerPick() {

}

function onShare() {

}

function onDownloadCanvas(elFile) {
    saveToStorage('memeList', getMemeList())
    downloadCanvas(elFile)
}

function onMemeTabClick() {
    loadMemes()
    moveToMemePage()
}