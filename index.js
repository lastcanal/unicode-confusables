const CONFUSABLES = require('./data/confusables.json')

const ZERO_WIDTH = ''
const zeroWidthPoints = new Set([
  '\u200b', // zero width space
  '\u200c', // zero width non-joiner
  '\u200d', // zero width joiner
  '\ufeff', // zero width no-break space
  '\u2028', // line separator
  '\u2029', // paragraph separator,
])

function makeSkeleton (string) {
  return [...string].reduce((acc, point) => {
    if (zeroWidthPoints.has(point)) return acc
    acc.push(CONFUSABLES[point] || point)
    return acc
  }, [])
}

function isConfusing (string) {
  const skeleton = makeSkeleton(string)
  const original = [...string]
  for (var i = 0, l = skeleton.length; i < l; i++) {
    if (skeleton[i] !== original[i]) return true
  }

  return false
}

function confusables (string) {
  const skeleton = makeSkeleton(string)
  const original = [...string]
  let offset = 0

  return original.reduce((acc, point, index) => {
    const target = skeleton[index - offset]
    if (target === point || !target) {
      acc.push({point: point})
    } else if (zeroWidthPoints.has(point)) {
      acc.push({ point, similarTo: ZERO_WIDTH })
      offset = offset + 1
    } else {
      acc.push({ point, similarTo: target })
    }

    return acc
  }, [])
}

function rectifyConfusion (string) {
  return confusables(string).map(({ point, similarTo }) => (
    similarTo == null ? point : similarTo
  )).join('')
}

module.exports = {
  isConfusing,
  confusables,
  rectifyConfusion,
}
