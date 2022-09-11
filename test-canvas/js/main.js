'use strict'
window.init = init

import { canvasService } from './services/canvas.service.js'
var gElCanvas
var gCtx
var state
function init() {
  gElCanvas = document.querySelector('canvas')

  gCtx = gElCanvas.getContext('2d')
  setEvents()
  renderGrid()
  state = canvasService.getState()
  console.log('state:', state)

  renderSate()
}
function onTextChange({ target }) {
  canvasService.setTxt(target.value)
  renderLine()
}

function renderSate() {
  const { width, height, route } = state
  const props = {
    width,
    height,
    route,
  }

  let y = 20
  var lineIdx = 0
  for (var prop in props) {
    var txt = props[prop]
    y += 20
    lineIdx++
    canvasService.getNewLine(`${prop}: ${txt}`, y + 250, y + 200)
    renderLine()
  }
}

function renderLine() {
  // clearTxt()
  let lines = canvasService.geLinesForDisplay()
  lines.forEach((line) => {
    const { x, y, textAlign, color, font, txt, fontSize } = line

    if (!txt) return
    gCtx.font = fontSize + ' ' + font
    gCtx.textAlign = textAlign
    gCtx.fillStyle = color
    // const { fontAscent, fontDecent, width } = getLineMeasures(txt)
    gCtx.fillText(txt, x, y)
    // setRectToTxt(x, y, fontAscent, fontDecent, width)
  })
}

function setEvents() {
  const elTxt = document.querySelector('[name=txt]')
  elTxt.addEventListener('input', onTextChange)
  gElCanvas.addEventListener('click', onCanvasClick)
  gElCanvas.addEventListener('contextmenu', onCanvasClick)
}

function getLineMeasures(txt) {
  const {
    fontBoundingBoxAscent: fontAscent,
    fontBoundingBoxDescent: fontDecent,
    width,
  } = gCtx.measureText(txt)

  return {
    fontAscent,
    fontDecent,
    width,
  }
}

function onCanvasClick(ev) {
  const { offsetX, offsetY } = ev
  console.log(offsetX, offsetY)
  const { rightClickColor, leftClickColor } = canvasService.getClickProps()
  gCtx.strokeStyle = leftClickColor
  if (ev.type === 'contextmenu') {
    ev.preventDefault()
    gCtx.strokeStyle = rightClickColor
  }
  gCtx.beginPath()
  gCtx.arc(offsetX, offsetY, 5, 0, 2 * Math.PI)
  gCtx.stroke()
}
function setRectToTxt(x, y, fontAscent, fontDecent, width) {
  const line = canvasService.getTextForDisplay()

  gCtx.beginPath()
  gCtx.strokeStyle = '#8edb7873'
  gCtx.strokeRect(x, y, width, fontAscent + fontDecent)
  gCtx.closePath()
}
function clearTxt() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function renderGrid() {
  let startFrom = 0

  for (let i = 0; i < gElCanvas.width / 100; i++) {
    startFrom = i * 100

    gCtx.beginPath()
    gCtx.strokeStyle = '#c0c0c0'
    gCtx.moveTo(startFrom, 0)
    gCtx.lineTo(startFrom, gElCanvas.height)
    gCtx.stroke()
  }
  startFrom = 0
  for (let i = 0; i < gElCanvas.height / 100; i++) {
    startFrom = i * 100

    gCtx.beginPath()
    gCtx.moveTo(0, startFrom)
    gCtx.lineTo(gElCanvas.width, startFrom)
    gCtx.stroke()
    gCtx.closePath()
  }
}
