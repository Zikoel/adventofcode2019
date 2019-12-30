const _ = require('lodash')

const setAt = (array, idx, value) => {
  const left = _.take(array, idx)
  const right = _.takeRight(array, array.length - idx - 1)
  return [ ...left, value, ...right ]
}

const decodeInstruction = instruction => {

  const instructionStr = instruction.toString()

  const completeInstruction = instructionStr.length === 5
    ? instructionStr
    : [...new Array(5 - instructionStr.length).fill('0')].join("") + instructionStr

  const data = completeInstruction.split("")
  return {
    modeOf3stParameter: parseInt(data[0], 10),
    modeOf2stParameter: parseInt(data[1], 10),
    modeOf1stParameter: parseInt(data[2], 10),
    optcode: parseInt(data[3] + data[4], 10)
  }
}

const executeProgram = (ip, memory, inputs, outputs) => {

  const {
    modeOf3stParameter,
    modeOf2stParameter,
    modeOf1stParameter,
    optcode,
  } = decodeInstruction(memory[ip])

  switch(optcode) {
    case 1:
      {
        const parameter1 = memory[ip + 1]
        const parameter2 = memory[ip + 2]
        const parameter3 = memory[ip + 3]
        const value1 = modeOf1stParameter === 1 ? parameter1 : memory[parameter1]
        const value2 = modeOf2stParameter === 1 ? parameter2 : memory[parameter2]
        const result = value1 + value2
        const updatedMemory = modeOf3stParameter === 1
          ? setAt(memory, ip + 3, result)
          : setAt(memory, parameter3, result)
        const newIp = ip + 4
        return executeProgram(newIp, updatedMemory, inputs, outputs)
      }
    case 2:
      {
        const parameter1 = memory[ip + 1]
        const parameter2 = memory[ip + 2]
        const parameter3 = memory[ip + 3]
        const value1 = modeOf1stParameter === 1 ? parameter1 : memory[parameter1]
        const value2 = modeOf2stParameter === 1 ? parameter2 : memory[parameter2]
        const result = value1 * value2
        const updatedMemory = modeOf3stParameter === 1
          ? setAt(memory, ip + 3, result)
          : setAt(memory, parameter3, result)
        const newIp = ip + 4
        return executeProgram(newIp, updatedMemory, inputs, outputs)
      }
    case 3:
      {
        const value = _.head(inputs)
        const parameter1 = memory[ip + 1]
        const updatedMemory = setAt(memory, parameter1, value)
        const newIp = ip + 2
        return executeProgram(newIp, updatedMemory, _.tail(inputs), outputs)
      }
    case 4:
      {
        const parameter1 = memory[ip + 1]
        const value1 = modeOf1stParameter === 1 ? parameter1 : memory[parameter1]
        const newIp = ip + 2
        return executeProgram(newIp, memory, inputs, [...outputs, value1])
      }
    case 5:
      {
        const parameter1 = memory[ip + 1]
        const parameter2 = memory[ip + 2]
        const value1 = modeOf1stParameter === 1 ? parameter1 : memory[parameter1]
        const value2 = modeOf2stParameter === 1 ? parameter2 : memory[parameter2]
        const newIp = value1 !== 0
          ? value2
          : ip + 3
        return executeProgram(newIp, memory, inputs, outputs)
      }
    case 6:
      {
        const parameter1 = memory[ip + 1]
        const parameter2 = memory[ip + 2]
        const value1 = modeOf1stParameter === 1 ? parameter1 : memory[parameter1]
        const value2 = modeOf2stParameter === 1 ? parameter2 : memory[parameter2]
        const newIp = value1 === 0
          ? value2
          : ip + 3
        return executeProgram(newIp, memory, inputs, outputs)
      }
    case 7:
      {
        const parameter1 = memory[ip + 1]
        const parameter2 = memory[ip + 2]
        const parameter3 = memory[ip + 3]
        const value1 = modeOf1stParameter === 1 ? parameter1 : memory[parameter1]
        const value2 = modeOf2stParameter === 1 ? parameter2 : memory[parameter2]
        const updatedMemory = value1 < value2
          ? setAt(memory, parameter3, 1)
          : setAt(memory, parameter3, 0)
        const newIp = ip + 4
        return executeProgram(newIp, updatedMemory, inputs, outputs)
      }
    case 8:
      {
        const parameter1 = memory[ip + 1]
        const parameter2 = memory[ip + 2]
        const parameter3 = memory[ip + 3]
        const value1 = modeOf1stParameter === 1 ? parameter1 : memory[parameter1]
        const value2 = modeOf2stParameter === 1 ? parameter2 : memory[parameter2]
        const updatedMemory = value1 === value2
          ? setAt(memory, parameter3, 1)
          : setAt(memory, parameter3, 0)
        const newIp = ip + 4
        return executeProgram(newIp, updatedMemory, inputs, outputs)
      }
    case 99:
      return {memory, outputs}
    }

    throw Error('To be here is an error')
}

module.exports = {
  decodeInstruction,
  executeProgram
}