const funcs = require('./second')

test('should count 13', () => {
  const line1 = { p1: {x: 0, y: 0}, p2: {x: 10, y: 0}, d: 'h' }
  const line2 = { p1: {x: 10, y: 0}, p2: {x: 10, y: 5}, d: 'v' }
  const intersection = {x: 10, y: 3}

  const steps = funcs.stepToIntersection(intersection, [line1, line2])
  
  expect( steps ).toBe(13)
})

test('should count 20', () => {
  const line1 = { p1: {x: 0, y: 0}, p2: {x: 10, y: 0}, d: 'h' }
  const line2 = { p1: {x: 10, y: 0}, p2: {x: 10, y: 5}, d: 'v' }
  const line3 = { p1: {x: 10, y: 5}, p2: {x: 0, y: 5}, d: 'h' }
  const intersection = {x: 5, y: 5}

  const steps = funcs.stepToIntersection(intersection, [line1, line2, line3])
  
  expect( steps ).toBe(20)
})