const _ = require('lodash')
const geometry = require('./geometry')

const generateLine = ( startingPoint, direction, distance ) => {
  switch (direction) {
    case 'R':
      return { 
        p1: startingPoint,
        p2: { ...startingPoint, x: startingPoint.x + distance },
        d: 'h'
      }
    case 'L':
      return {  
        p1: startingPoint,
        p2: { ...startingPoint, x: startingPoint.x - distance },
        d: 'h'
      }
    case 'U':
      return {
        p1: startingPoint,
        p2: { ...startingPoint, y: startingPoint.y + distance },
        d: 'v'
      }
    case 'D':
      return {
        p1: startingPoint,
        p2: { ...startingPoint, y: startingPoint.y - distance },
        d: 'v'
      }
  }
}

const wireLines = movements => movements
  .map( movement => ({
    direction: movement.charAt(0),
    distance: parseInt( movement.substr(1) , 10)
  }) )
  .reduce( (lines, {direction, distance}) => {
    return lines.length === 0 
      ? [generateLine({x: 0, y: 0}, direction, distance)]
      : [...lines, generateLine(lines[lines.length-1].p2, direction, distance)]
  }, [] )

const intersectionsPointsWithGroup = ( line, otherLines ) => {
  return otherLines.reduce( (points, l) =>
    [...points, ...geometry.simplifiedIntersectionPoint(line, l)], []
  )
}

const stepToIntersection = (intersection, wireLines) => {
  const lastValuableLineIdx = wireLines.reduce( (intersectionIdx, line, currentIdx) => {
    if (line.d === 'v') {
      return line.p1.x === intersection.x && geometry.valueIncludedInRange(intersection.y, line.p1.y, line.p2.y) ? currentIdx : intersectionIdx
    } else {
      return line.p1.y === intersection.y && geometry.valueIncludedInRange(intersection.x, line.p1.x, line.p2.x) ? currentIdx : intersectionIdx
    }
  }, -1)

  const lastValualeLine = wireLines[lastValuableLineIdx]
  const lastLineSteps = lastValualeLine.d === 'h'
    ? Math.abs(lastValualeLine.p1.x - intersection.x)
    : Math.abs(lastValualeLine.p1.y - intersection.y)
  const countableWire = wireLines.slice(0, lastValuableLineIdx) // Steps for last line already counted
  const steps = countableWire.reduce( (steps, line) => {
    return steps + geometry.lineLenght(line)
  }, lastLineSteps )
  return steps
}

module.exports = {
  generateLine,
  wireLines,
  intersectionsPointsWithGroup,
  stepToIntersection
}
