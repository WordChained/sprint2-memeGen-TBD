'use strict';

var gCurrText = {};

var gAlignment = 'center'
var gSize = 40;

var gKeywords = {
    'happy': 12,
    'funny': 1
}
var gImgs = [{
        id: 0,
        url: 'img/meme-imgs (square)/0.jpg',
        keywords: ['happy']
    },

];
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: []
        // txt: 'I never eat Falafel',
        //     size: gSize,
        //     align: 'left',
        //     color: 'red',
        //pos: {x:x,y:y}
}

function renderCanvas() {
    loadImgToCanvas()
}

function createImages(size) {
    //2 cause we started with one image already set
    //TODO: figure out when to push keywords to memes
    for (var i = 1; i < size + 1; i++) {
        gImgs.push({
            id: i,
            url: `img/meme-imgs (square)/${i}.jpg`,
            keywords: []
        })
    }
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    // Note: changing the canvas dimension this way clears the canvas
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}

function loadImgToCanvas() {
    var image = _findImgById(gMeme.selectedImgId);
    drawImg(image.url);
}

function _findImgById(id) {
    return gImgs.find(image => image.id === id)
}

function drawImg(meme) {
    var img = new Image()
    img.src = meme;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    }
}

function submitText(ev, input) {
    if (ev.keyCode === 13) {
        ev.preventDefault();
        drawText(input.value);
        gMeme.selectedLineIdx++;
        console.log(gMeme.selectedLineIdx);
        input.value = '';
    }
}

function drawText(text) {
    //TODO: set user offsetX
    //TODO: add randomInt to the default between 50 - 350
    var x = gCanvas.width / 2;
    var y;

    switch (gMeme.selectedLineIdx) {
        case 0:
            y = gCanvas.height / 4;
            break;
        case 1:
            y = gCanvas.height - 50;
            break;
        case 2:
            y = gCanvas.height / 2;
            break;
        default:
            y = gCanvas.height - 100;
            break;
    }
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.font = gSize + 'px Impact'
    gCtx.textAlign = gAlignment
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
        //this needs to be set up by gMeme.pos(x and y), to cover the sentence
        // gCtx.strokeRect(x - 175, y - 50, 350, 70);
    gMeme.lines.push({
        txt: text,
        size: gSize,
        align: 'left',
        color: 'red',
        pos: { x: x, y: y }
    })
    gCurrText = {
        txt: text,
        x: x,
        y: y
    }
}

function setUserText(text) {
    gCurrText.txt = text
}

function addAttributeToImgs() {
    var elMemes = [...document.querySelectorAll('.meme')]
    return elMemes.map(meme => meme.setAttribute('onclick', 'onImgClick(this)'))
}

function getImg(elImg) {
    var memeId = gImgs.find(img => img.id === +elImg.id)
    console.log(memeId.id);
    gMeme.selectedImgId = memeId.id;
}

function showEditor() {
    var elEditor = document.querySelector('.editor-container');
    var elGallery = document.querySelector('.gallery-container');
    elGallery.style.display = 'none';
    elEditor.style.display = 'grid'
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

function changeSize(elSize) {
    if (elSize > 0) {
        if (gSize > 70) return
        gSize += 5;
    } else {
        if (gSize <= 30) return
        gSize -= 5
    }
    gMeme = gSize;
}

function switchLine(position) {
    console.log(position)
    console.log(gMeme.lines);
    var textIdx = gMeme.lines.findIndex((meme, idx) => {
        if (idx + position === meme.selectedLineIdx);
        console.log(meme.txt)
        return meme.txt
    })
    gMeme.selectedLineIdx = textIdx;

}

function moveText(value) {
    clearCanvas()
    renderCanvas()
    setTimeout(() => {

        console.log((+gCurrText.y) + (+value))

        gCtx.lineWidth = 2
        gCtx.strokeStyle = 'black'
        gCtx.fillStyle = 'white'
        gCtx.font = gSize + 'px Impact'
        gCtx.textAlign = gAlignment
        gCtx.fillText(gCurrText.txt, gCurrText.x, +gCurrText.y + +value)
        gCtx.strokeText(gCurrText.txt, gCurrText.x, +gCurrText.y + +value)

        gCurrText.y = +gCurrText.y + +value;
    }, 100)
}