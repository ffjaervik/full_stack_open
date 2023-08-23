import patientsData from '../data/patients';
import { Patient, PublicPatient, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';

function getPatients(): Array<Patient> {
  return patientsData;
}

function getNonSensitivePatients(): Array<PublicPatient> {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
}

function addPatient(entry: NewPatient): Patient {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };

  patientsData.push(newPatientEntry);
  return newPatientEntry;
}

export default { getPatients, getNonSensitivePatients, addPatient };


