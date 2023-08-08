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
  const rating: number = average >= target ? 3 : average >= target / 2 ? 2 : 1
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

const parseExerciseArguments = (args: Array<string>): Array<number> => {
  if (args.length < 4) throw new Error('Not enough arguments')
  const target = Number(args[2])
  const hours = args.slice(3).map((h) => Number(h))
  if (!isNaN(target) && hours.every((h) => !isNaN(h))) {
    return [target, ...hours]
  } else {
    throw new Error('Provided values were not numbers!')
  }
}

try {
  const [target, ...hours] = parseExerciseArguments(process.argv)
  console.log(calculateExercises(hours, target))
} catch (e) {
  let errorMessage = 'Something went wrong'
  if (e instanceof Error) {
    errorMessage = e.message
  }
  console.log(errorMessage)
}


// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
