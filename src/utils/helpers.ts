export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min)
}

export function calculateVectorLength(vector: { x: number, y: number }) {
  const x = vector.x
  const y = vector.y
  
  const length = Math.sqrt(x * x + y * y)
  
  return length
}
