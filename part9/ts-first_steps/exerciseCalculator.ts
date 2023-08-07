interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const calculateExercises = (hours: Array<number>, target: number): Result => {
  const periodLength: number = hours.length
  const trainingDays: number = hours.filter((h) => h > 0).length
  const average: number = hours.reduce((a, b) => a + b) / periodLength
  const success: boolean = average >= target
  const rating: number = average > target ? 3 : average === target ? 2 : 1
  const ratingDescription: string =
    rating === 3
      ? '3 out of 3: great'
      : rating === 2
      ? '2 out of 3: not too bad but could be better'
      : '1 out of 3: you can do better'

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  }
}

console.log(calculateExercises([4, 3, 3, 3, 3, 3, 3], 3))
