'use strict';
var gCurrText = {};
// id: gMeme.selectedLineIdx,
// txt: text,
// x: x,
// y: y
var gIsEditing = false;
var gAlignment = 'center'
var gSize = 40;
var gFont = 'Impact'
var gMemeList = []

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
    setTimeout(() => {
        gMeme.lines.map(meme => {

            gCtx.lineWidth = 2
            gCtx.strokeStyle = 'black'
            gCtx.fillStyle = 'white'
            gCtx.font = gSize + `px ${gFont}`
            gCtx.textAlign = gAlignment
            gCtx.fillText(meme.txt, meme.pos.x, meme.pos.y)
            gCtx.strokeText(meme.txt, meme.pos.x, meme.pos.y)
        })
    }, 1)
}

function createImages(size) {
    //1 cause we started with one image already set
    //TODO: change this to manual so we can enter keywords
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
    renderCanvas()
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
        if (!gIsEditing) {
            drawText(input.value);
            gMeme.selectedLineIdx++;
            console.log(gMeme.selectedLineIdx);
        } else {
            editText(input.value)
            gIsEditing = false;
        }
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
    gCtx.font = gSize + `px ${gFont}`
    gCtx.textAlign = gAlignment
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
        //this needs to be set up by gMeme.pos(x and y), to cover the sentence
        // gCtx.strokeRect(x - 175, y - 50, 350, 70);
    gMeme.lines.push({
        id: gMeme.selectedLineIdx,
        txt: text,
        size: gSize,
        align: 'left',
        color: 'red',
        pos: { x: x, y: y }
    })
    gCurrText = {
        id: gMeme.selectedLineIdx,
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

//navigation:--------------------------------------------------------
function showEditor() {
    var elEditor = document.querySelector('.editor-container');
    var elGallery = document.querySelector('.gallery-container');
    var elMemeTab = document.querySelector('.memes-container');
    elGallery.style.display = 'none';
    elEditor.style.display = 'grid'
    elMemeTab.style.display = 'none';

}

function showGallery() {
    var elEditor = document.querySelector('.editor-container');
    var elGallery = document.querySelector('.gallery-container');
    var elMemeTab = document.querySelector('.memes-container');
    elGallery.style.display = 'grid';
    elEditor.style.display = 'none';
    elMemeTab.style.display = 'none';
}

function moveToMemePage() {
    var elGallery = document.querySelector('.gallery-container');
    var elMemeTab = document.querySelector('.memes-container');
    var elEditor = document.querySelector('.editor-container');
    elGallery.style.display = 'none';
    elMemeTab.style.display = 'grid';
    elEditor.style.display = 'none';
}

//---------------------------------------------------------------------


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
    renderCanvas()
}
//move is +1
function switchLine(move) {
    if (!gMeme.lines.length) return
    gIsEditing = true;
    renderCanvas()
        //catch the pos of the relavent line and draw a rectangle
        // also, render whole canvas and add rectangle. dont save previous rectangles.
    var currLine = gMeme.lines.find(line => {
        return line.id === gMeme.selectedLineIdx - 1;
    })
    if (!currLine) currLine = gMeme.lines[gMeme.lines.length - 1];
    setTimeout(() => {
        var width = gCtx.measureText(currLine).width;
        console.log(width);
        console.log(gCanvas.width);
        gCtx.strokeRect(currLine.pos.x - 175, currLine.pos.y - 50, 350, 70);
    }, 1);
    gMeme.selectedLineIdx -= move;
    if (gMeme.selectedLineIdx - 1 < 0) gMeme.selectedLineIdx = gMeme.lines.length;
    //for the editing function:
    gCurrText = currLine;
    //---
    var input = document.querySelector('.meme-text');
    input.value = currLine.txt;
    console.log(gMeme.lines)
        // when i render again delete current line and rewrite it with new text (done on the draw text function)
    renderCanvas()
}

function moveText(value) {
    clearCanvas()
    loadImgToCanvas()
    setTimeout(() => {

        console.log((+gCurrText.y) + (+value))

        gCtx.lineWidth = 2
        gCtx.strokeStyle = 'black'
        gCtx.fillStyle = 'white'
        gCtx.font = gSize + `px ${gFont}`
        gCtx.textAlign = gAlignment
        gCtx.fillText(gCurrText.txt, gCurrText.x, +gCurrText.y + +value)
        gCtx.strokeText(gCurrText.txt, gCurrText.x, +gCurrText.y + +value)

        gCurrText.y = +gCurrText.y + +value;
    }, 1)
}

function editText(text) {
    // var editedText = gMeme.lines.find(line => line.txt === text)
    console.log(text)
    console.log(gCurrText.txt);
    console.log(gCurrText.id);
    gMeme.lines[gCurrText.id].txt = text

    gMeme.selectedLineIdx++;
    console.log(gMeme.lines)
    renderCanvas()
}


// function _makeId(length = 4) {
//     var txt = '';
//     var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     for (var i = 0; i < length; i++) {
//         txt += possible.charAt(Math.floor(Math.random() * possible.length));
//     }
//     return txt;
// }

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL()
        // console.log('DATA', data);
    elLink.href = data
        // var timeStamp = new Date().toLocaleTimeString()
        // console.log(timeStamp)
        // elLink.download = timeStamp + 'user-drawing'
    elLink.download = Date.now() + '-meme'
}

function setFont(elFont) {
    gFont = elFont;
    renderCanvas()
    resizeCanvas()
}

function getMemeList() {
    console.log(gCanvas.toDataURL());
    gMemeList.push(gCanvas.toDataURL())
    return gMemeList
}

function loadMemes() {
    var memes = []
    var memeList = loadFromStorage('memeList')
    if (!memeList) return;
    memeList.map(meme => {
        var img = new Image;
        img.src = meme;
        memes.push(img)
    })
    return memes
}

function renderMemes(memes) {
    if (!memes) return
    var elMemeContainer = document.querySelector('.memes-container')
    elMemeContainer.innerHTML = ''
    memes.map((meme, idx) => {

        var str = `<img class="saved-meme" src="${meme.src}" id="${idx}">`
        elMemeContainer.innerHTML += str;
    })
}


function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}