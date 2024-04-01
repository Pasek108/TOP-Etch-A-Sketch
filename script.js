"use strict"

let color = "#000000"
let randomColor = false
let darkening = false
let drawingStarted = false
let gridSize = 16

const colorPicker = document.querySelector("#color")
colorPicker.addEventListener("change", changeColor)

const randomColorCheckbox = document.querySelector("#random")
randomColorCheckbox.addEventListener("change", switchRandomColor)

const darkeningCheckbox = document.querySelector("#darkening")
darkeningCheckbox.addEventListener("change", switchDarkening)

const changeSizeButton = document.querySelector(".change-size")
changeSizeButton.addEventListener("click", askForSize)

const gridContainer = document.querySelector(".grid")
gridContainer.addEventListener("mouseleave", stopDrawing)
document.addEventListener("mouseup", stopDrawing)

generateGrid(gridSize)

/* -------------- functions -------------- */

function changeColor(evt) {
    color = colorPicker.value
}

function switchRandomColor(evt) {
    randomColor = randomColorCheckbox.checked
}

function switchDarkening(evt) {
    darkening = darkeningCheckbox.checked
}

function generateGrid(size) {
    const gridFragment = document.createDocumentFragment()

    for (let i = 0; i < size; i++) {
        const row = document.createElement("div")
        row.className = "row"

        for (let j = 0; j < size; j++) {
            const cell = document.createElement("div")
            cell.className = "cell"
            cell.addEventListener("mousedown", startDrawing)
            cell.addEventListener("mouseover", draw)
            row.appendChild(cell)
        }

        gridFragment.appendChild(row)
    }

    gridContainer.innerHTML = ""
    gridContainer.appendChild(gridFragment)
}

function startDrawing(evt) {
    drawingStarted = true
    draw(evt)
}

function stopDrawing(evt) {
    drawingStarted = false
}

function draw(evt) {
    if (!drawingStarted) return

    if (randomColor) evt.target.style.backgroundColor = randomizeColor()
    else evt.target.style.backgroundColor = color

    if (darkening) {
        const opacity = evt.target.style.opacity
        if (opacity == null) evt.target.style.opacity = "0.1"
        else evt.target.style.opacity = `${Math.min(+opacity + 0.1, 1)}`
    } else evt.target.style.opacity = null
}

function askForSize() {
    const newSize = +prompt("Input the grid size (1 - 100)")

    if (Number.isNaN(newSize) || newSize < 1 || newSize > 100) {
        alert("Wrong grid size value")
        return
    }

    gridSize = newSize
    generateGrid(gridSize)
}

function randomizeColor() {
    const MAX_VALUE = 16 ** 6 - 1
    const newColor = Math.floor(Math.random() * MAX_VALUE).toString(16)
    return `#${newColor}`
}