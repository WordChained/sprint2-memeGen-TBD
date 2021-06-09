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
//needs to move to service!!
//when we hit enter

function onSubmitText(ev, input) {
    submitText(ev, input)
}

function onSizeChange(elSize) {
    changeSize(elSize)
}

function onImgClick(elImg) {
    getImg(elImg)
    resizeCanvas()
    renderCanvas();
    showEditor();
}

function onClearCanvas() {
    clearCanvas()
    renderCanvas()
}

function onSwitchLine(elPosition) {
    switchLine(elPosition)
}

function onMoveText(value) {
    moveText(value)
}