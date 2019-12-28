const fs = require('fs')

const secondUtils = require('./second')

const wire1Commands = fs.readFileSync('./input', {encoding: 'utf-8'})
  .split("\n")[0]
  .split(",")

const wire2Commands = fs.readFileSync('./input', {encoding: 'utf-8'})
  .split("\n")[1]
  .split(",")

const wire1 = secondUtils.wireLines(wire1Commands)
const wire2 = secondUtils.wireLines(wire2Commands)
// console.log('wire1')
// console.log(wire1)
// console.log('wire2')
// console.log(wire2)

const steps = wire1
  .reduce( (intersections, wire1Line) =>
    [...intersections, ...secondUtils.intersectionsPointsWithGroup(wire1Line, wire2)], []
  )
  .filter( p => { return  p.x !== 0 && p.y !== 0 } )
  .map( intersection => {
    const wire1Steps = secondUtils.stepToIntersection(intersection, wire1)
    const wire2Steps = secondUtils.stepToIntersection(intersection, wire2)
    // console.log(`${JSON.stringify(intersection)} => wire1: ${wire1Steps}, wire2: ${wire2Steps}`)
    return wire1Steps + wire2Steps
  })

console.log(Math.min(...steps))