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
var gMemeList;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']


var gKeywords = {
    'happy': 12,
    'funny': 1
}
var gImgs = [{
        id: 0,
        url: 'img/meme-imgs (square)/0.jpg',
        keywords: ['funny', 'outdoors']
    },
    {
        id: 1,
        url: 'img/meme-imgs (square)/1.jpg',
        keywords: ['funny', 'political', 'usa']
    },
    {
        id: 2,
        url: 'img/meme-imgs (square)/2.jpg',
        keywords: ['cute', 'outdoors', 'puppies', 'love', 'animals']
    },
    {
        id: 3,
        url: 'img/meme-imgs (square)/3.jpg',
        keywords: ['cute', 'puppies', 'baby', 'sleep', 'animal']
    },
    {
        id: 4,
        url: 'img/meme-imgs (square)/4.jpg',
        keywords: ['cute', 'cat', 'computer', 'sleeping']
    },
    {
        id: 5,
        url: 'img/meme-imgs (square)/5.jpg',
        keywords: ['inspiring', 'outdoors', 'beach', 'cute']
    },
    {
        id: 6,
        url: 'img/meme-imgs (square)/6.jpg',
        keywords: ['funny', 'old', 'stupid', 'funny']
    },
    {
        id: 7,
        url: 'img/meme-imgs (square)/7.jpg',
        keywords: ['baby', 'cute', 'funny', 'surprised']
    },
    {
        id: 8,
        url: 'img/meme-imgs (square)/8.jpg',
        keywords: ['old', 'movies']
    },
    {
        id: 9,
        url: 'img/meme-imgs (square)/9.jpg',
        keywords: ['funny', 'outdoors', 'baby']
    },
    {
        id: 10,
        url: 'img/meme-imgs (square)/10.jpg',
        keywords: ['funny', 'political']
    },
    {
        id: 11,
        url: 'img/meme-imgs (square)/11.jpg',
        keywords: ['funny', 'sports', 'basketball', 'gay', 'love']
    },
    {
        id: 12,
        url: 'img/meme-imgs (square)/12.jpg',
        keywords: ['israeli', 'pointing']
    },
    {
        id: 13,
        url: 'img/meme-imgs (square)/13.jpg',
        keywords: ['toast', 'pointing']
    },
    {
        id: 14,
        url: 'img/meme-imgs (square)/14.jpg',
        keywords: ['matrix', 'reflection', 'choice']
    },
    {
        id: 15,
        url: 'img/meme-imgs (square)/15.jpg',
        keywords: ['old']
    },
    {
        id: 16,
        url: 'img/meme-imgs (square)/16.jpg',
        keywords: ['funny', 'awkward']
    },
    {
        id: 17,
        url: 'img/meme-imgs (square)/17.jpg',
        keywords: ['political', 'pointing']
    },
    {
        id: 18,
        url: 'img/meme-imgs (square)/18.jpg',
        keywords: ['inspiring', 'outdoors']
    },


];
// function createImages(size) {
//     //1 cause we started with one image already set
//     //TODO: change this to manual so we can enter keywords
//     for (var i = 1; i < size + 1; i++) {
//         gImgs.push({
//             id: i,
//             url: `img/meme-imgs (square)/${i}.jpg`,
//             keywords: []
//         })
//     }
// }

function renderImgsToGallery(imgs) {
    var elImgGrid = document.querySelector('.image-grid')
    elImgGrid.innerHTML = ''
    imgs.map(img => {

        var strHTMLs = `<img id="${img.id}" class="meme" src="img/meme-imgs (square)/${img.id}.jpg">`
        elImgGrid.innerHTML += strHTMLs
    })
}
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: []
}

function renderCanvas() {
    loadImgToCanvas()
    gCtx.save()
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
        // if (gMeme.lines.length) renderText()
    gCtx.restore()
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
        } else {
            editText(input.value)
            gIsEditing = false;
        }
        input.value = '';
    }
}

function drawText(text, x = gCanvas.width / 2, y) {
    //TODO: add randomInt to the default between 50 - 350
    if (!y) {
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
    }
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.font = gSize + `px ${gFont}`
    gCtx.textAlign = gAlignment
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
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
        y: y,
        isDrag: false
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
    gMeme.selectedLineIdx = 0;

}

function showGallery() {
    var elEditor = document.querySelector('.editor-container');
    var elGallery = document.querySelector('.gallery-container');
    var elMemeTab = document.querySelector('.memes-container');
    elGallery.style.display = 'grid';
    elEditor.style.display = 'none';
    elMemeTab.style.display = 'none';
    gMeme.selectedLineIdx = 0;
}

function moveToMemePage() {
    var elGallery = document.querySelector('.gallery-container');
    var elMemeTab = document.querySelector('.memes-container');
    var elEditor = document.querySelector('.editor-container');
    elGallery.style.display = 'none';
    elMemeTab.style.display = 'grid';
    elEditor.style.display = 'none';
    gMeme.selectedLineIdx = 0;
}

//---------------------------------------------------------------------


function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    gMeme.lines = []
    gCurrText = {}
}

function deleteLine() {
    gMeme.lines.splice((gMeme.lines.length - 1), 1)
    console.log(gMeme.lines);
    gMeme.selectedLineIdx -= 1;
    if (gMeme.selectedLineIdx < 0) gMeme.selectedLineIdx = 3
    renderCanvas()
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
        // when i render again delete current line and rewrite it with new text (done on the drawText function)
    renderCanvas()
}

function moveText(value) {
    //BUG:this deletes previous lines if we moved a line before
    console.log(gMeme.lines)
    deleteLine()
    setTimeout(() => {
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
    gMeme.lines[gCurrText.id].txt = text

    gMeme.selectedLineIdx++;
    console.log(gMeme.lines)
    renderCanvas()
}


function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = Date.now() + '-meme'
}

function setFont(elFont) {
    gFont = elFont;
    renderCanvas()
    resizeCanvas()
}

function getMemeList() {
    // console.log(gCanvas.toDataURL());
    if (!loadFromStorage('memeList')) return gMemeList = []
    gMemeList = loadFromStorage('memeList')
    gMemeList.push(gCanvas.toDataURL())
    console.log(gMemeList)
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
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchend', onUp)
}



function isTextClicked(clickedPos) {
    var textWidth = gCtx.measureText(gCurrText.txt).width
    const { x, y } = gCurrText
    if (clickedPos.x >= x - textWidth / 2 && clickedPos.x <= x + textWidth / 2 && clickedPos.y >= y - gSize && clickedPos.y <= y) {
        return true
    }
}


function setTextDrag(isDrag) {
    gCurrText.isDrag = isDrag
}

function moveTextWithGrab(dx, dy) {
    gCurrText.x += dx
    gCurrText.y += dy
}

function renderText() {
    console.log(gCurrText)
    if (!gCurrText.txt) return;
    const { x, y, txt } = gCurrText
    drawText(txt, x, y)
}

function searchKeywords(keyword) {
    var filteredImgs = gImgs.filter(img => {
        for (var i = 0; i < img.keywords.length; i++) {
            if (img.keywords[i] === keyword) inflateKeyword(keyword);
            if (img.keywords[i].includes(keyword)) return true
        }
    })
    renderImgsToGallery(filteredImgs)
    addAttributeToImgs()
}

function getDirection(elDirection) {
    gAlignment = elDirection
    renderCanvas()
}

function loadImageFromInput(ev, onImageReady) {
    var reader = new FileReader()
    reader.onload = function(event) {
        var img = new Image()
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result
        gImg = img
    }
    reader.readAsDataURL(ev.target.files[0])
}

function renderKeywords() {
    var elKeywordsContainer = document.querySelector('.keywords-container')
    var sortedKeywords = []
    for (var j = 0; j < gImgs.length; j++) {
        var img = gImgs[j]
        for (var i = 0; i < img.keywords.length; i++) {
            sortedKeywords.push(img.keywords[i])
        }
    }
    var unique = [...new Set(sortedKeywords)];
    unique.map(keyword => {
        elKeywordsContainer.innerHTML += `<article class = "keyword ${keyword}" onclick="inflateKeyword(this.innerText)" style="font-size: ${getRandomInt(16, 32)}px"> ${keyword}</article>`
    })
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

//TODO: add 'more' button. make it expand the shown keywords

//set size of each keyword
function inflateKeyword(keyword) {
    var elKeyword = document.querySelector(`.keyword.${keyword}`)
    var style = window.getComputedStyle(elKeyword, null).getPropertyValue('font-size');
    var currentSize = parseFloat(style);
    elKeyword.style.fontSize = (currentSize + 1) + 'px';
    renderKeywords()

    //i can also use a global variable with the font size and then ++ it each time. both come with very slow performances
}

function toggleKeywords(elBtn) {
    var elKeywordsContainer = document.querySelector('.keywords-container');
    elKeywordsContainer.classList.toggle('overflow');
    if (elKeywordsContainer.classList.contains('overflow')) {
        elBtn.innerText = 'Less'
    } else {
        elBtn.innerText = 'More'
    }
}