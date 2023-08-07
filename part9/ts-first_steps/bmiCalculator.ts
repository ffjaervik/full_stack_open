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

console.log(calculateBmi(180, 74))
