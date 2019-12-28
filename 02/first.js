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
    // console.log(`opt: ${optCode} -> ${updatedMemory}`)

    return executeProgram(ip + 4, updatedMemory)
}

const memory = fs.readFileSync('./input', {encoding: 'utf-8'})
  .split(",")
  .map( n => parseInt(n, 10) )

const result = _.chain(memory)
  .thru( (memory) => setAt(memory, 1, 12) )
  .thru( (memory) => setAt(memory, 2, 2) )
  .thru( (memory) => executeProgram(0, memory) )
  .take(1)
  .commit()
  .value()
  
console.log(result)
