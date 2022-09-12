'use strict'
window.init = init

import { canvasService } from './services/canvas.service.js'
var gElCanvas
var gCtx
var state
function init() {
  gElCanvas = document.querySelector('canvas')

  gCtx = gElCanvas.getContext('2d')
  // setEvents()
  // renderGrid()
  state = canvasService.getState()
  console.log('state:', state)

  renderSate()
}
function onTextChange({ target }) {
  canvasService.setTxt(target.value)
  // renderLine()
}

function renderSate() {
  renderLines()
  renderInputEvents()
  renderMouseEvents()
  renderGrid()
}

function renderLines() {
  // clearTxt()
  const { width, height, route, qParams } = state
  const props = {
    width,
    height,
    route,
    qParams,
  }

  var pos = { x: 100, y: 100 }
  for (const key in props) {
    gCtx.font = '24px ariel'
    gCtx.textAlign = 'center'
    gCtx.fillStyle = '#c0c0c0'
    gCtx.fillText(`${key}: ${props[key]}`, pos.x, pos.y)
    pos.y += 50
    pos.x += 50
  }
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

function renderInputEvents() {
  const { userInputActions } = state
  const props = userInputActions
  const pos = { x: 100, y: gElCanvas.height - 50 }
  for (const key in props) {
    gCtx.font = '24px ariel'
    gCtx.textAlign = 'center'
    gCtx.fillStyle = '#c0c0c0'
    gCtx.fillText(`${key}: ${props[key]}`, pos.x, pos.y)
    pos.x += 200
  }
}

function renderMouseEvents() {
  const { userMouseActions } = state
  for (const event in userMouseActions) {
    const events = userMouseActions[event]
    const color = setColor(event)

    console.log(events)
    events.forEach((event) => {
      console.log(event)
      const { clientX, clientY } = event
      renderLabel(event)
      gCtx.beginPath()
      gCtx.strokeStyle = color
      gCtx.arc(clientX, clientY, 5, 0, 2 * Math.PI)

      gCtx.stroke()
    })
  }
}

function renderLabel({ target, timeStamp, clientX, clientY }) {
  console.log(target, timeStamp, clientX, clientY)
  gCtx.beginPath()
  gCtx.font = '10px ariel'
  gCtx.textAlign = 'center'
  gCtx.fillStyle = '#c0c0c0'
  gCtx.fillText(
    `${target} ${new Date(timeStamp).toLocaleTimeString()}`,
    clientX,
    clientY - 20
  )
}

function setColor(event) {
  const colorOpt = {
    click: 'red' || '#db93f7',
    contextmenu: '#93f7e0',
    leave: '#f793f5',
    default: '#f7e593',
  }
  return colorOpt[event] || colorOpt.default
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
