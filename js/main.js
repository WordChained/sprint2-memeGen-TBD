'use strict';
var gCanvas;
var gCtx;

function onInit() {
    createImages(18);
    console.log(gImgs);
    addAttributeToImgs()
    gCanvas = document.querySelector('.canvas');
    gCtx = gCanvas.getContext('2d');
    resizeCanvas()
    console.log(gCtx)
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

function onTextInput(text) {
    setUserText(text)
}

function submitText(ev) {
    console.log(ev.keyCode)
    if (ev.keyCode === 13) {
        ev.preventDefault()
        drawText(gCurrUserText);
    }
}

function onImgClick(elImg) {
    getImg(elImg)
    loadImgToCanvas()
    showEditor();
    resizeCanvas()
}