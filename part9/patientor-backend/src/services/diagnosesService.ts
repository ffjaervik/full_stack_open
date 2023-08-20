import diagnosesData from '../data/diagnoses';
import { Diagnosis } from '../types';

const fetchDiagnoses = (): Diagnosis[] => {
  return diagnosesData;
};

export default fetchDiagnoses;
