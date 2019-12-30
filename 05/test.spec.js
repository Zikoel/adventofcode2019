const computer = require('./computer')

test('should decode as 1002', () => {  
  expect( computer.decodeInstruction(1002) ).toStrictEqual({
    modeOf3stParameter: 0,
    modeOf2stParameter: 1,
    modeOf1stParameter: 0,
    optcode: 2
  })
})
