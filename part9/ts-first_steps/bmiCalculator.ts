 const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = weight / (height / 100) ** 2
  if (bmi < 18.5) {
    return 'Underweight'
  } else if (bmi >= 18.5 && bmi < 25) {
    return 'Normal (healthy weight)'
  } else if (bmi >= 25 && bmi < 30) {
    return 'Overweight'
  } else if (bmi >= 30) {
    return 'Obese'
  } else {
    return 'Invalid input'
  }
}

const parseBmiArguments = (args: Array<string>): Array<number> => {
  if (args.length < 4) throw new Error('Not enough arguments')
  if (args.length > 4) throw new Error('Too many arguments')

  const height = Number(args[2])
  const weight = Number(args[3])

  if (!isNaN(height) && !isNaN(weight)) {
    return [height, weight]
  } else {
    throw new Error('Provided values were not numbers!')
  }
}

try {
  const [height, weight] = parseBmiArguments(process.argv)
  console.log(calculateBmi(height, weight))
} catch (e) {
  let errorMessage = 'Something went wrong'
  if (e instanceof Error) {
    errorMessage = e.message
  }
  console.log(errorMessage)
}

// console.log(calculateBmi(180, 74))
export default calculateBmi