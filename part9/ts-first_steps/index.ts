import express from 'express';
import { bmi, categorize } from './bmiCalculator';
import  {calculateExercises}  from './exerciseCalculator';

const app = express();
app.disable('x-powered-by');
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    return res.status(400).json({error: 'malformed parameters'});
  }

  const response = {
    weight: weight,
    height: height,
    bmi: categorize(bmi(height, weight)),
  };

  return res.json(response);
});

app.post('/exercises', (req, res) => {
  interface Request {
    daily_exercises: Array<number>
    target: number
  }

  const body = req.body as Request;

  if (!body || !body.daily_exercises || !body.target) {
    return res.status(400).json({error: 'parameters missing'});
  }
  if (!Array.isArray(body.daily_exercises)) {
    return res.status(400).json({error: 'malformed parameters'});
  }

  body.daily_exercises = body.daily_exercises.map(x => Number(x));
  body.target = Number(body.target);

  if (isNaN(body.target) || body.daily_exercises.some(x => isNaN(x))) {
    return res.status(400).json({error: 'malformed parameters'});
  }

  const result = calculateExercises(body.daily_exercises, body.target);
  return res.json(result);
});

app.use((_req, res) => res.status(404).end());

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});