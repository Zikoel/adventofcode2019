const fs = require('fs')

const fuelForModule = mass => Math.floor(mass / 3) - 2

const requiredFuel = fs.readFileSync('./input', {encoding: 'utf-8'})
  .split('\n')
  .map( parseFloat )
  .reduce( (sum, mass) => {
    return sum + fuelForModule(mass)
  }, 0 )

console.log(requiredFuel)