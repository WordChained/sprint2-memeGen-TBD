'use strict';
var gCanvas;
var gCtx;
var gStartPos

function onInit() {
    // createImages(18);
    renderImgsToGallery(gImgs)
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
    addListeners()
    loadImgToCanvas();
    resizeCanvas()
}

function OnTextPick(ev) {
    var x = ev.offsetX
    var y = ev.offsetY
        // console.log('x:', x, 'y:', y)
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
    if (gIsEditing) return
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
    deleteLine()
}

function onStickerPick() {

}

function onDownloadCanvas(elFile) {
    saveToStorage('memeList', getMemeList())
    downloadCanvas(elFile)
}

function onMemeTabClick() {
    var memes = loadMemes()
    moveToMemePage()
    renderMemes(memes)
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderCanvas()
    })
}

function onDown(ev) {
    const pos = getEvPos(ev)
    if (!isTextClicked(pos)) return
    setTextDrag(true)
    gStartPos = pos
    document.querySelector('.canvas').style.cursor = 'grabbing';
}

function onMove(ev) {
    const text = gCurrText;
    if (text.isDrag) {
        const pos = getEvPos(ev)
        console.log(pos);
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        moveTextWithGrab(dx, dy)
        gStartPos = pos
    }
}

function onUp() {
    setTextDrag(false)
    document.querySelector('.canvas').style.cursor = 'grab'
    renderCanvas()
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

function onSearch(elKeyword) {
    console.log(elKeyword)
    searchKeywords(elKeyword)
}