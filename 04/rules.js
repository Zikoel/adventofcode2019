const _ = require('lodash')

const length = psw => psw.length === 6

const adiacentCouples = str => {

  const { couples } = str
  .split("")
  .reduce( ( {couples, lastDigit}, digit) => {
    
    if (lastDigit === null) {
      return { couples, lastDigit: digit }
    }

    return {
      couples: [ ...couples, [lastDigit, digit] ],
      lastDigit: digit
    }
  }, {
    lastDigit: null,
    couples: []
  })

  return couples

}

const twoAdiacentDigits = psw => {
  if (psw.length < 2) return false

  const couples = adiacentCouples(psw)

  return _.some( couples, couple => couple[0] === couple[1] )
  }

const neverDecreaseDigits = psw => {
  if (psw.length < 2) return false
  
  const couples = adiacentCouples(psw)

  return _.every( couples, couple => couple[0] <= couple[1] )
}

module.exports = {
  length,
  twoAdiacentDigits,
  neverDecreaseDigits
}