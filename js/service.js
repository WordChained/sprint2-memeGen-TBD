'use strict';

var gCurrUserText;
var gAlignment = 'center'
var gNumOfTextLines = 1;

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
    lines: [{
        txt: 'I never eat Falafel',
        size: 20,
        align: 'left',
        color: 'red'
    }]
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
    console.log(gMeme.selectedImgId)
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

function drawText(text) {
    // clearText()

    var x = gCanvas.width / 2;
    var y;
    switch (gNumOfTextLines) {
        case 1:
            y = gCanvas.height / 4;
            break;
        case 2:
            y = gCanvas.height / 0.4;
            break;
        case 3:
            y = gCanvas.height / 2;
            break;
    }
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.font = '40px Impact'
    gCtx.textAlign = gAlignment
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function setUserText(text) {
    gCurrUserText = text
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