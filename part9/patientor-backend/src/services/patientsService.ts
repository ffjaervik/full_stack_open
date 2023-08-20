import patientsData from '../data/patients';
import { Patient, PublicPatient } from '../types';

function getPatients(): Array<Patient> {
      return patientsData;
    }

function getNonSensitivePatients(): Array<PublicPatient> {
      return patientsData.map(({id, name, dateOfBirth, gender, occupation}) =>({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
      }));
    }

export  {getPatients, getNonSensitivePatients};