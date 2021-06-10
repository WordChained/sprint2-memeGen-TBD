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

function onFontSelect(elFont) {

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

function onDownload() {

}