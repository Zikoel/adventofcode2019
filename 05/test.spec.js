const computer = require('./computer')

test('should decode as 1002', () => {  
  expect( computer.decodeInstruction(1002) ).toStrictEqual({
    modeOf3stParameter: 0,
    modeOf2stParameter: 1,
    modeOf1stParameter: 0,
    optcode: 2
  })
})

test('the output of the program should be 999', () => {
  const program = "3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99"
  const memory = program
    .split(",")
    .map( n => parseInt(n, 10) )
  const { outputs } = computer.executeProgram(0, memory, [5], [])

  expect( outputs.length ).toBe(1)
  expect( outputs[0] ).toBe(999)
})
