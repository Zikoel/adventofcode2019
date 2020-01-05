const decodeOrbitLine = line => ({
  inner: line.split(")")[0],
  outer: line.split(")")[1]
})

const checkOrbitMap = ( currentObject, indirectCount, list ) => {
  
  const outers = list.filter( ({inner}) => inner === currentObject )
    .map( ({outer}) => outer )

  if (outers.length === 0) {
    return indirectCount
  }

  return outers.reduce( (sum, outer) => {
    return sum + count(outer, indirectCount + 1, list)
  }, indirectCount)

}

const orbitGraph = (start, list) => {
  const outers = list.filter( ({inner}) => inner === start )
    .map( ({outer}) => outer )

  const outersAndWeight = outers
    .reduce( (obj, outer) => {
      return {
        ...obj,
        [outer]: 1
      }
    }, {} )

  const outerNodes = outers
    .reduce( ( childrens, outer ) => {
      return {
        ...childrens,
        ...orbitGraph(outer, list)
      }
    }, {} )

  const nodeHasLeafs = outers.length !== 0

  return nodeHasLeafs ? {
      [start]: outersAndWeight,
      ...outerNodes
    } : undefined

}

module.exports = {
  decodeOrbitLine,
  checkOrbitMap,
  orbitGraph
}