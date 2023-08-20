import express from 'express';
import fetchDiagnoses from '../services/diagnosesService';

const router = express.Router();

router.get('/', (_req, res) => {
  const result = fetchDiagnoses();
  console.log('someone requested diagnoses');
  res.send(result);
});

export default router;
