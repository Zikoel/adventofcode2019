const simplifiedIntersectionPoint = ( line1, line2) => {
  if ( line1.d === line2.d ) return []
  
  const horizonatalLine = line1.d === 'h' ? line1 : line2
  const verticalLine    = line1.d === 'v' ? line1 : line2

  // Semplified resolution of two lines intersection
  const x1 = horizonatalLine.p1.x
  const x2 = horizonatalLine.p2.x
  const y1 = horizonatalLine.p1.y

  const x3 = verticalLine.p1.x
  const y3 = verticalLine.p1.y
  const y4 = verticalLine.p2.y
  
  if( valueIncludedInRange( y1, y3, y4 ) ) {
    if ( valueIncludedInRange( x3, x1, x2 ) ) {
      return [ {y: y1, x: x3} ]
    }
  }

  return []
}

const valueIncludedInRange = (value, start, end) => {
  const max = Math.max(start, end)
  const min = Math.min(start, end)
  const isIncluded = value >= min && value <= max 
  return isIncluded
}

const manhattanDistance = ( p1, p2 ) => {
  const x = Math.abs( p1.x - p2.x )
  const y = Math.abs( p1.y - p2.y )
  return x + y
}

const lineLenght = line => {
  if (line.d !== 'v' && line.d !== 'h') {
    return 0 // Unsupported
  }

  return line.d === 'h'
    ? Math.abs(line.p2.x - line.p1.x)
    : Math.abs(line.p2.y - line.p1.y)
}

module.exports = {
  simplifiedIntersectionPoint,
  manhattanDistance,
  valueIncludedInRange,
  lineLenght,
}