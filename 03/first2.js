const fs = require('fs')
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

const wire1 = fs.readFileSync('./input', {encoding: 'utf-8'})
  .split("\n")[0]
  .split(",")

const wire2 = fs.readFileSync('./input', {encoding: 'utf-8'})
  .split("\n")[1]
  .split(",")

const wire1HorizontalLines = wireLines(wire1)
  .filter( l => l.d === 'h' )

const wire2VerticalLines = wireLines(wire2)
  .filter( l => l.d === 'v' )

const manhattanDistances = wire1HorizontalLines
  .reduce( (intersections, wire1HLine) =>
    [...intersections, ...intersectionsPointsWithGroup(wire1HLine, wire2VerticalLines)], []
  )
  .filter( p => { return  p.x !== 0 && p.y !== 0 } )
  .map( point => geometry.manhattanDistance({ x: 0, y: 0 }, point) )

const minManhattanDistance = Math.min(...manhattanDistances)

console.log(minManhattanDistance)
