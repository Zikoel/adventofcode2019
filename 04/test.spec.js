const rules = require('./rules')

test('psw should not pass the adiacent couple rule', () => {  
  expect( rules.twoAdiacentDigits("123456") ).toBe(false)
})

test('psw should pass the adiacent couple rule', () => {  
  expect( rules.twoAdiacentDigits("122456") ).toBe(true)
})

test('psw should pass the never decrease rule', () => {  
  expect( rules.neverDecreaseDigits("122456") ).toBe(true)
})

test('psw should not pass the never decrease rule', () => {  
  expect( rules.neverDecreaseDigits("122450") ).toBe(false)
})

test('psw should pass the twoAdiacentButNotOnBiggerGroup rule', () => {  
  expect( rules.twoAdiacentButNotOnBiggerGroup("122456") ).toBe(true)
  expect( rules.twoAdiacentButNotOnBiggerGroup("122446") ).toBe(true)
  expect( rules.twoAdiacentButNotOnBiggerGroup("111122") ).toBe(true)
})

test('psw should not pass the twoAdiacentButNotOnBiggerGroup rule', () => {  
  expect( rules.twoAdiacentButNotOnBiggerGroup("123444") ).toBe(false)
  expect( rules.twoAdiacentButNotOnBiggerGroup("222444") ).toBe(false)
})

test('psw pass all the rules', () => {  
  const psw = 344567

  const pswStr = psw.toString()

  expect(
    rules.length(pswStr)
    && rules.twoAdiacentDigits(pswStr)
    && rules.neverDecreaseDigits(pswStr)
  ).toBe(true)
})

