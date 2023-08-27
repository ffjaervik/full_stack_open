import patientEntries from '../data/patients';
import { Patient, PublicPatient, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';

function getPatients(): Array<Patient> {
  return patientEntries;
}

function getNonSensitivePatients(): Array<PublicPatient> {
  return patientEntries.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
}

function getPatiendById(id: string):Patient | undefined{
const result = patientEntries.find((patient) => patient.id === id)
return result
} 

function addPatient(entry: NewPatient): Patient {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };

  patientEntries.push(newPatientEntry);
  return newPatientEntry;
}

export default { getPatients, getNonSensitivePatients, addPatient, getPatiendById };


