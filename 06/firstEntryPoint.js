const fs = require('fs')
const orbits = require('./orbits')

const decodedOrbits = fs.readFileSync('./input', {encoding: 'utf-8'})
  .split("\n")
  .map( orbits.decodeOrbitLine )
  
const count = orbits.checkOrbitMap('COM', 0, decodedOrbits)

console.log(count)