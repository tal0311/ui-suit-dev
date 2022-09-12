'use strict'

var state

var mouseEventList = ['click', 'resize', 'scroll', 'mousemove', 'contextmenu']
var inputEventList = ['input', 'change', 'blur', 'focus', 'onsearch']
onInit()
function onInit() {
  state = getState()
  createCanvas()
  addEvents(mouseEventList)
  console.log('state:', state)
}

function getState() {
  return {
    height: document.activeElement.clientHeight,
    width: document.activeElement.clientWidth,
    route: window.location.pathname,
    visitUrlTimeStamp: Date.now(),
    qParams: window.location.search,
    userMouseActions: {},
    userInputActions: {},
  }
}

function createCanvas() {
  var canvasContainer = document.querySelector('#canvas-container')
  canvasContainer.innerHTML = `<canvas class="doc" 
  height="${state.height}" width="${state.width}"></canvas>`
}

function addEvents() {
  mouseEventList.forEach((event) => {
    document.addEventListener(event, onMouseEvent)
  })
  const elInputs = Array.from(document.querySelectorAll('input'))
  elInputs.forEach((input) => {
    inputEventList.forEach((event) => {
      input.addEventListener(event, onInputEvent)
    })
  })
}

function onMouseEvent(ev) {
  if (ev?.target?.nodeName === 'INPUT') return
  if (
    ev.type === 'mousemove' &&
    ev.clientX > state.width - 50 &&
    ev.clientY < 100
  ) {
    console.log('leave')
    _setEventToState(ev, 'leave')
    return
  }

  if (ev.type === 'click') {
    _setEventToState(ev)
    return
  }
  if (ev.type === 'contextmenu') {
    _setEventToState(ev, ev.type)
    console.log(state)
    return
  }
}

function _setEventToState(ev, type = ev.type) {
  let { userMouseActions } = state
  let actions = state.userMouseActions[type] || []
  let action = createMouseEvent(ev)

  switch (type) {
    case 'click':
      userMouseActions[type] = [...actions, action]
      break
    case 'contextmenu':
      userMouseActions[type] = [...actions, action]
      break
    case 'leave':
      userMouseActions[type] = [...actions.splice(-3), action]
      break
    default:
      break
  }
  state = { ...state, userMouseActions }
}

function onInputEvent(ev) {
  console.log(ev)
  let { userInputActions } = state
  userInputActions[ev.target.name] = ev.target.value
  state = { ...state, userInputActions }
}

function createMouseEvent(ev) {
  return {
    target: ev.target,
    timeStamp: ev.timeStamp,
    clientX: ev.clientX,
    clientY: ev.clientY,
  }
}
// function clickMe(ev) {
//   ev.preventDefault()
//   console.log('click me')
// }
