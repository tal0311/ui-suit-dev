var model = {
  pointerMarker: {
    rightClickColor: '#8edb7873',
    leftClickColor: '#f7a8a8',
  },

  state: {
    height: 100,
    width: 732,
    route: '/index.html',
    visitUrlTimeSta: 1663009076833,
    qParams: '1234',
    userMouseActions: {
      contextmenu: [
        {
          target: 'p',
          timeStamp: 18357.700000047684,
          clientX: 469,
          clientY: 71,
        },
        {
          target: 'html',
          timeStamp: 18357.700000047684,
          clientX: 469,
          clientY: 71,
        },
        {
          target: 'canvas',
          timeStamp: 19197.600000023842,
          clientX: 384,
          clientY: 148,
        },
        {
          target: 'html',
          timeStamp: 19197.600000023842,
          clientX: 384,
          clientY: 148,
        },
      ],
      click: [
        {
          target: 'p',
          timeStamp: 19898,
          clientX: 624,
          clientY: 139,
        },
        {
          target: 'html',
          timeStamp: 20545.300000071526,
          clientX: 427,
          clientY: 310,
        },
      ],

      leave: [
        { target: 'p', timeStamp: 22096, clientX: 477, clientY: 46 },
        {
          target: 'p',
          timeStamp: 22104.299999952316,
          clientX: 477,
          clientY: 48,
        },
        {
          target: 'p',
          timeStamp: 22104.799999952316,
          clientX: 487,
          clientY: 67,
        },
        {
          target: 'p',
          timeStamp: 22114.199999928474,
          clientX: 493,
          clientY: 73,
        },
      ],
    },
    userInputActions: {
      color1: '#d25b5b',
      search1: 'lalal',
      txt1: 'say somthing',
    },
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
  color = '#c0c0c0',
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
