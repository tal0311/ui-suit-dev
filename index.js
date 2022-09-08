'use strict'

var state

var mouseEventList = ['click', 'resize', 'scroll', 'mousemove']
var inputEventList = ['input', 'change', 'blur', 'focus']
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
  if (ev.target.nodeName === 'INPUT') return

  // console.log(state.width, ev)
  if (
    ev.type === 'mousemove' &&
    ev.clientX > state.width - 10 &&
    ev.clientY > state.height - 100
  ) {
    _setEventToState(ev, 'leave')
    // let action = createMouseEvent(ev)
    // const type = 'leave'
    // let actions = state.userMouseActions[type] || []
    // userMouseActions[type] = [...actions.splice(-3), action]
    // state = { ...state, userMouseActions }
    return
  }

  if (ev.type === 'click') {
    _setEventToState(ev)
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