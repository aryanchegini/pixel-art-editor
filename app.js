const DEFAULTGRIDSIZE = 16;
const DEFAULTCOLOUR = '#000';
const DEFAULTMODE = 'color';


let currentSize = DEFAULTGRIDSIZE;
let currentColor = DEFAULTCOLOUR;
let currentMode = DEFAULTMODE;
let selectedColor;

const grid = document.getElementById('grid');
const colorPicker = document.getElementById('color-picker');
const color = document.getElementById('color');
const rainbow = document.getElementById('rainbow');
const eraser = document.getElementById('eraser');
const clear = document.getElementById('clear');
const sizeSlider = document.getElementById('size-slider');
const sizeDisplay = document.getElementById('size-display');


sizeSlider.onmousemove = (e) => changeSizeDisplay(e.target.value);
sizeSlider.onchange = (e) => update(e.target.value);
clear.onclick = () => clearGrid();
eraser.onclick = () => changeMode('eraser');
color.onclick = () => changeMode('color');
rainbow.onclick = () => changeMode('rainbow');
colorPicker.onchange = (e) => getColor(e.target.value);

function changeMode(mode) {
    if (mode === 'color') {
        currentMode = 'color';
        color.classList.add('active-button');
        rainbow.classList.remove('active-button');
        eraser.classList.remove('active-button');
    } else if (mode === 'rainbow') {
        currentMode = 'rainbow';
        color.classList.remove('active-button');
        rainbow.classList.add('active-button');
        eraser.classList.remove('active-button');
    } else if (mode === 'eraser') {
        currentMode = 'eraser';
        color.classList.remove('active-button');
        rainbow.classList.remove('active-button');
        eraser.classList.add('active-button');
    }
}   

function getColor(newColor) {
    selectedColor = newColor;
}
    
function changeBlockColor(e) {
    if (currentMode === 'color') {
        e.target.style.backgroundColor = selectedColor;
    } else if (currentMode === 'rainbow') {
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
    } else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = '#fff';
    }
}

function clearGrid() {
    for (let i = 0; i <= grid.childNodes.length; i++) {
        grid.childNodes[i].style.backgroundColor = '#fff';
    }
}
function changeSizeDisplay(size) {
    sizeDisplay.innerText = `${size} x ${size}`;
}

function loadGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for (let i = grid.childNodes.length - 1; i >= 0 ; i--) {
        grid.removeChild(grid.childNodes[i]);
    }
    for (let i = 0; i < (size*size); i++) {
        let block = document.createElement('div');
        block.style.backgroundColor = '#fff'
        block.addEventListener('mouseover', changeBlockColor);
        grid.appendChild(block);
    }
}

function update(size) {
    changeSizeDisplay(size);
    loadGrid(size);
}

window.onload = () => {
    update(DEFAULTGRIDSIZE);
    getColor(DEFAULTCOLOUR);
    changeMode(DEFAULTMODE);
}