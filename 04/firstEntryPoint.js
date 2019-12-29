const rules = require('./rules')

const start = parseInt(process.argv[2], 10)
const end   = parseInt(process.argv[3], 10)

console.log(end - start)
const countOfValidPasswords = [...new Array(end-start + 1)]
  .map(  (_, idx) => idx + start )
  .map( value => {
    const strPsw = value.toString()

    return rules.length(strPsw)
      && rules.twoAdiacentDigits(strPsw)
      && rules.neverDecreaseDigits(strPsw)
  })
  .reduce( (acc, isValid) => isValid ? acc + 1 : acc, 0 )

console.log(countOfValidPasswords)