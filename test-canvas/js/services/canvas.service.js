var model = {
  lines: [
    {
      txt: '',
      x: 250,
      y: 200,
      textAlign: 'start',
      color: '#1a73e8',
      font: 'ariel',
      fontSize: '48px',
    },
  ],
  pointerMarker: {
    rightClickColor: '#8edb7873',
    leftClickColor: '#f7a8a8',
  },

  state: {
    height: document.activeElement.clientHeight,
    width: document.activeElement.clientWidth,
    route: window.location.pathname,
    visitUrlTimeStamp: Date.now(),
    qParams: window.location.search,
    userMouseActions: {},
    userInputActions: {},
  },
}

function getState() {
  return model.state
}

function geLinesForDisplay() {
  return model.lines
}

function setTxt(value) {
  model.lines[0].txt = value
  console.log('value:', model.lines[0].txt)
}

function getClickProps() {
  return model.pointerMarker
}

function getNewLine(txt, x, y, textAlign, color, font, fontSize) {
  const line = _getEmptyLine(txt, x, y, textAlign, color, font, fontSize)
  model.lines.push(line)
  console.log(model.lines)
}
function _getEmptyLine(
  txt,
  x,
  y,
  textAlign = 'center',
  color = 'clack',
  font = 'ariel',
  fontSize = '24px'
) {
  return {
    txt,
    x,
    y,
    textAlign,
    color,
    font,
    fontSize,
  }
}

export const canvasService = {
  setTxt,
  geLinesForDisplay,
  getClickProps,
  getState,
  getNewLine,
}
