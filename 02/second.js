const fs = require('fs')
const _ = require('lodash')

const setAt = (array, idx, value) => {
  const left = _.take(array, idx)
  const right = _.takeRight(array, array.length - idx - 1)
  return [ ...left, value, ...right ]
}

const executeProgram = (ip, memory) => {

  const [optCode, idx1, idx2, idxr] = memory.slice(ip)

  let result
  switch(optCode) {
    case 1:
      result = memory[idx1] + memory[idx2]
      break
    case 2:
      result = memory[idx1] * memory[idx2]
      break
    case 99:
      return memory
    }
    
    const updatedMemory = setAt(memory, idxr, result)

    return executeProgram(ip + 4, updatedMemory)
}

const executeAndExtractResult = (memory, noun, verb) =>  _.chain(memory)
  .thru( (memory) => setAt(memory, 1, noun) )
  .thru( (memory) => setAt(memory, 2, verb) )
  .thru( (memory) => executeProgram(0, memory) )
  .first()
  .commit()
  .value()

const memory = fs.readFileSync('./input', {encoding: 'utf-8'})
  .split(",")
  .map( n => parseInt(n, 10) )

console.log(executeAndExtractResult(memory.slice(), 12, 2))

for ( noun = 0; noun <= 99; noun ++ ) {
  for ( verb = 0; verb <= 99; verb ++ ) {
    const executionResult = executeAndExtractResult(memory.slice(), noun, verb)
    if ( executionResult === 19690720 ) {
      console.log(100 * noun + verb)
      process.exit(0)
    }
  }
}

console.log('Not found')
