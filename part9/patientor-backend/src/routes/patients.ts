import express from 'express';
import { getNonSensitivePatients } from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
  const result = getNonSensitivePatients();
  console.log('someone requested patient data');
  res.send(result);
});

router.post('/', (req, res) => {
  const newPatient: = req.body
  res.send('Saving a patient!');
});

export default router;
