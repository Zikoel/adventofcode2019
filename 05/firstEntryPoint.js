const fs = require('fs')
const computer = require('./computer')

const memory = fs.readFileSync('./input', {encoding: 'utf-8'})
  .split(",")
  .map( n => parseInt(n, 10) )

const { outputs } = computer.executeProgram(0, memory, [1], [])

console.log(outputs)