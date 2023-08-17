interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

function ratingToDescription(rating: number): string {
  if (rating < 1.5) return 'time get to the gym';
  if (rating < 2.0) return 'some done';
  if (rating < 2.5) return 'getting there';
  return 'excellent work';
}

function rate(hours: Array<number>, target: number): number {
  if (hours.length === 0) return 0;

  function clamp(x: number, min: number, max: number): number {
    if (x < min) return min;
    if (x > max) return max;
    return x;
  }

  function smoothstep(edge0: number, edge1: number, x: number): number {
    const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
    return t * t * (3 - 2 * t);
  }

  const normalized =  hours
    .map(h => smoothstep(0.0, target, h))
    .reduce((prev, curr) => prev + curr, 0) / hours.length;

  const min = 1;
  const max = 3;
  return Math.trunc((min + normalized * (max - min)) * 10) / 10;
}

function calculateExercises(hours: Array<number>, dailyTargetHours: number): Result {
  const periodLength = hours.length;
  const trainingDays = hours.filter(h => h > 0).length;
  const target = dailyTargetHours;
  const average = hours.length === 0 ? 0 : hours.reduce((prev, curr) => prev + curr, 0) / hours.length;
  const success = average >= dailyTargetHours;
  const rating = rate(hours, dailyTargetHours);
  const ratingDescription = ratingToDescription(rating);

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
}

export { calculateExercises };