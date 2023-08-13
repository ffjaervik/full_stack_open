import express from 'express';
import calculateBmi from './bmiCalculator.ts';
import calculateExercises  from './exerciseCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  try {
    const result: string = calculateBmi(height, weight);
    res.send(result);
  } catch (e) {
    let errorMessage = 'malformatted parameters';
    if (e instanceof Error) {
      errorMessage = e.message;
    }
    res.send(errorMessage);
  }
});


app.post('/exercises', (req:any, res:any) => {
  const { dailyExercises, target } = req.body;
  console.log(dailyExercises, target);
  if (!dailyExercises || !target) {
    return res.status(400).json({
      error: 'parameters missing',
    });
  }

  if (!Array.isArray(dailyExercises) || isNaN(Number(target))) {
    return res.status(400).json({
      error: 'malformatted parameters',
    });
  }

  const result = calculateExercises(dailyExercises, target);
  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
