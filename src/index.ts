import CONFUSABLES_DATA from '../data/confusables.json'

const CONFUSABLES: Record<string, string> = CONFUSABLES_DATA

export interface ConfusablePoint {
  point: string
  similarTo?: string
}

const ZERO_WIDTH = ''
const zeroWidthPoints = new Set([
  '\u200b', // zero width space
  '\u200c', // zero width non-joiner
  '\u200d', // zero width joiner
  '\ufeff', // zero width no-break space
  '\u2028', // line separator
  '\u2029', // paragraph separator,
])

const makeSkeleton = (input: string): string[] => {
  return [...input].reduce((acc: string[], point: string): string[] => {
    if (zeroWidthPoints.has(point)) return acc
    acc.push(CONFUSABLES[point] || point)
    return acc
  }, [])
}

export const isConfusing = (input: string): boolean => {
  const skeleton = makeSkeleton(input)
  const original = [...input]

  for (var i = 0, l = skeleton.length; i < l; i++) {
    if (skeleton[i] !== original[i]) return true
  }

  return false
}

export const confusables = (input: string): ConfusablePoint[] => {
  const skeleton = makeSkeleton(input)
  const original = [...input]
  let offset = 0

  return original.reduce((acc: ConfusablePoint[], point, index): ConfusablePoint[] => {
    const target = skeleton[index - offset]
    if (target === point || !target) {
      acc.push({ point: point })
    } else if (zeroWidthPoints.has(point)) {
      acc.push({ point, similarTo: ZERO_WIDTH })
      offset = offset + 1
    } else {
      acc.push({ point, similarTo: target })
    }

    return acc
  }, [])
}

export const rectifyConfusion = (input: string): string => {
  return confusables(input).map(({ point, similarTo }) => (
    similarTo == null ? point : similarTo
  )).join('')
}
