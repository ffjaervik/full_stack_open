import express from 'express';
import cors from 'cors';
import diagnosesRoute from './routes/diagnoses';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use("/api/diagnoses", diagnosesRoute)

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
