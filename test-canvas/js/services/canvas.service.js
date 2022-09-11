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
}

function getTextForDisplay() {
  return model.lines[0]
}

function setTxt(value) {
  model.lines[0].txt = value
  console.log('value:', model.lines[0].txt)
}

function getClickProps() {
  return model.pointerMarker
}
function _getEmptyLine(text, x, y, textAlign, color, font) {
  return {
    text,
    x,
    y,
    textAlign,
    color,
    font,
  }
}

export const canvasService = {
  setTxt,
  getTextForDisplay,
  getClickProps,
}
