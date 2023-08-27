import express from 'express';
import patientService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
  const result = patientService.getNonSensitivePatients();
  console.log('someone requested patient data');
  res.json(result);
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const requestedPatient = patientService.getPatiendById(id);
  if (requestedPatient) {
    res.send(requestedPatient);
  } else {
    res.sendStatus(404);
  }
});

// router.post('/', (req, res) => {
//   const { name, occupation, gender, ssn, dateOfBirth } = req.body;
//   const addedPatient = patientService.addPatient({
//     name,
//     occupation,
//     gender,
//     ssn,
//     dateOfBirth,
//   });
//   res.json(addedPatient);
// });

// router.post('/', (req, res) => {
//   const dto = req.body as NewPatient;

//   try {
//     const patientToAdd = toNewPatient(dto);
//     const patientAdded = service.addPatient(patientToAdd);
//     return res.status(201).json(patientAdded);
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       return res.status(400).json({ error: error.message });
//     } else {
//       return res.status(500).json({ error: 'server could not process the request' });
//     }
//   }
// });

export default router;
