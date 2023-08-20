import express from 'express';
import getDiagnoses from '../services/diagnosesService';

const router = express.Router();

router.get('/', (_req, res) => {
  const result = getDiagnoses();
  console.log('someone requested diagnoses');
  res.send(result);
});

export default router;
