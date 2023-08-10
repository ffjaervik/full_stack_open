import express from 'express';
import calculateBmi from './bmiCalculator.ts';

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
