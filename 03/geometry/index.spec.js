const geometry = require('.')

test('Should find an intersection on x=1, y=2', () => {
  const line1 = { p1: {x: -2, y: 2}, p2: {x: 5, y: 2}, d: 'h' }
  const line2 = { p1: {x: 1, y: -4}, p2: {x: 1, y: 4}, d: 'v' }

  const intersections = geometry.simplifiedIntersectionPoint(line1, line2)
  
  expect( intersections.length ).toBe(1)
  expect( intersections[0]).toStrictEqual( {x: 1, y: 2} )
})

test('Should find an intersection on x=15, y=6', () => {
  const line1 = { p1: {x: 1, y: 6}, p2: {x: 30, y: 6}, d: 'h' }
  const line2 = { p1: {x: 15, y: 3}, p2: {x: 15, y: 45}, d: 'v' }

  const intersections = geometry.simplifiedIntersectionPoint(line1, line2)
  
  expect( intersections.length ).toBe(1)
  expect( intersections[0]).toStrictEqual( {x: 15, y: 6} )
})

test('Should find an intersection on x=-7, y=-10', () => {
  const line1 = { p1: {x: -10, y: -10}, p2: {x: 15, y: -10}, d: 'h' }
  const line2 = { p1: {x: -7, y: -16}, p2: {x: -7, y: -6}, d: 'v' }

  const intersections = geometry.simplifiedIntersectionPoint(line1, line2)
  
  expect( intersections.length ).toBe(1)
  expect( intersections[0]).toStrictEqual( {x: -7, y: -10} )
})

test('Should find an intersection on x=155, y=4', () => {
  const line1 = { p1: { x: 146, y: 4 }, p2: { x: 217, y: 4 }, d: 'h' }
  const line2 = { p1: { x: 155, y: 46 }, p2: { x: 155, y: -12 }, d: 'v' }

  const intersections = geometry.simplifiedIntersectionPoint(line1, line2)
  
  expect( intersections.length ).toBe(1)
  expect( intersections[0]).toStrictEqual( {x: 155, y: 4} )
})

test('should be included', () => {
  expect( geometry.valueIncludedInRange(100, 90, 101) ).toBe(true)
  expect( geometry.valueIncludedInRange(100, 101, 90) ).toBe(true)
  expect( geometry.valueIncludedInRange(100, -101, 101) ).toBe(true)
  expect( geometry.valueIncludedInRange(-105, -101, -110) ).toBe(true)
})

test('should not be included', () => {
  expect( geometry.valueIncludedInRange(80, 90, 101) ).toBe(false)
  expect( geometry.valueIncludedInRange(80, 101, 90) ).toBe(false)
  expect( geometry.valueIncludedInRange(200, 101, 90) ).toBe(false)
})

test('line lenght should be 10', () => {
  const line = { p1: { x: -5, y: 1 }, p2: { x: 5, y: 1 }, d: 'h' }
  expect( geometry.lineLenght(line) ).toBe(10)
})

test('line lenght should be 10', () => {
  const line = { p1: { x: 0, y: -8 }, p2: { x: 0, y: 2 }, d: 'v' }
  expect( geometry.lineLenght(line) ).toBe(10)
})

test('Manhattan distance should be 6', () => {
  const distance = geometry.manhattanDistance({x: 0, y: 0}, {x: 3, y: 3})
  expect( distance ).toBe(6)
})