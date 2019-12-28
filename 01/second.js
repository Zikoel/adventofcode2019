const fs = require('fs')

const fuelForMass = mass => {
  const fuel = Math.floor(mass / 3) - 2
  
  if ( mass <=0 || fuel <= 0 ) {
    return 0
  }

  return fuel + fuelForMass(fuel) 
}

const requiredFuel = fs.readFileSync('./input', {encoding: 'utf-8'})
  .split('\n')
  .map( parseFloat )
  .reduce( (sum, mass) => {
    return sum + fuelForMass(mass)
  }, 0 )

console.log(requiredFuel)