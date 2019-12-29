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

const splitByAdiacentGroups = ( groups, digits ) => {
  // console.log(groups)
  // console.log(digits)
  // console.log('--')

  if ( _.isEmpty(digits) ) return groups

  const digit = _.head(digits)

  if(_.isEmpty(groups)) {
    return splitByAdiacentGroups( [[digit]], _.tail(digits) )
  }

  const lastGroup = _.last(groups)
  const lastGroupDigit = _.last(lastGroup)
  if( lastGroupDigit === digit ) {
    return splitByAdiacentGroups(
      [ ..._.take(groups, groups.length - 1), [...lastGroup, digit] ],
      _.tail(digits)
    )
  } else {
    return splitByAdiacentGroups(
      [ ...groups, [digit] ],
      _.tail(digits)
    )
  }
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

const twoAdiacentButNotOnBiggerGroup = psw => {
  if (psw.length < 2) return false
  
  const onlyTwoAdiacentElementsCount = splitByAdiacentGroups([], psw.split(""))
    .map( group => group.length )
    .filter( lenght => lenght === 2 )
    .length

  return onlyTwoAdiacentElementsCount > 0
}

module.exports = {
  length,
  twoAdiacentDigits,
  neverDecreaseDigits,
  splitByAdiacentGroups,
  twoAdiacentButNotOnBiggerGroup
}