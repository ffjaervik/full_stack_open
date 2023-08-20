import express from 'express';
import {getNonSensitivePatients} from '../services/patientsService';

const router = express.Router()

router.get("/", (_req, res) =>{
      const result = getNonSensitivePatients()
      console.log('someone requested patient data')
      res.send(result)
})

export default router;