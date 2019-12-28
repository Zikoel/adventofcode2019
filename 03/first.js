const fs = require('fs')
const _ = require('lodash')

const generatePointToDirection = ( startingPoint, direction, distance ) => {
  switch (direction) {
    case 'R':
      return new Array(distance).fill({...startingPoint}).map( (p, idx) => ({ ...p, x: p.x + (idx + 1) }) )
    case 'L':
      return new Array(distance).fill({...startingPoint}).map( (p, idx) => ({ ...p, x: p.x - (idx + 1) }) )
    case 'U':
      return new Array(distance).fill({...startingPoint}).map( (p, idx) => ({ ...p, y: p.y + (idx + 1) }) )
    case 'D':
      return new Array(distance).fill({...startingPoint}).map( (p, idx) => ({ ...p, y: p.y - (idx + 1) }) )
  }
}

const expadWirePoints = movements => movements
  .map( movement => ({
    direction: movement.charAt(0),
    distance: parseInt( movement.substr(1) , 10)
  }) )
  .reduce( (points, {direction, distance}) => {
    return [...points, ...generatePointToDirection(points[points.length - 1], direction, distance)]
  }, [{x: 0, y: 0}] )

const wire1 = fs.readFileSync('./input', {encoding: 'utf-8'})
  .split("\n")[0]
  .split(",")  

const wire2 = fs.readFileSync('./input', {encoding: 'utf-8'})
  .split("\n")[1]
  .split(",")

const wire1Points = expadWirePoints(wire1)
const wire2Points = expadWirePoints(wire2)
const allPoints = wire1Points.concat(wire2Points)

const xMax = _.max( allPoints.map( p => p.x ) )
const yMax = _.max( allPoints.map( p => p.y ) )

// const grid = allPoints
//   .reduce( (gridcount, point) => gridcount[point.x][point.y]++, [...Array(xMax)].map(x=>Array(yMax).fill(0)) )

console.log(JSON.stringify([...Array(xMax)].map(x=>Array(yMax).fill(0)), null, 2))

// console.log(grid)

// console.log(wire1Points.length)
// console.log(wire2Points.length)

// console.log( _.intersectionWith(wire1Points, wire2Points, _.isEqual) )