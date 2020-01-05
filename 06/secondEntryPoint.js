const _ = require('lodash')
const Graph = require('node-dijkstra')

const fs = require('fs')
const orbits = require('./orbits')

const decodedOrbits = fs.readFileSync('./input', {encoding: 'utf-8'})
  .split("\n")
  .map( orbits.decodeOrbitLine )
  
const a = orbits.orbitGraph('COM', decodedOrbits)

const distanceYOU = new Graph(a).path('COM', 'YOU', { trim: true })
const distanceSAN = new Graph(a).path('COM', 'SAN', { trim: true })

const intersection = _.intersection(distanceYOU, distanceSAN)
const path = [
  ..._.reverse(_.difference(distanceYOU, intersection)),
  ..._.last(intersection),
  ..._.difference(distanceSAN, intersection)
]

console.log(path.length - 1)