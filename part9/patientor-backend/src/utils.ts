import { NewPatient } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect date: ' + date);
  }
  return date;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};
const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect or missing name');
  }
  return occupation;
};
const parseGender = (gender: unknown): string => {
  if (!isString(gender)) {
    throw new Error('Incorrect or missing name');
  }
  return gender;
};
const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error('Incorrect or missing name');
  }
  return ssn;
};
const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth)) {
    throw new Error('Incorrect or missing name');
  }
  return dateOfBirth;
};

// import { NewDiaryEntry, Weather, Visibility } from './types';

// const isString = (text: unknown): text is string => {
//   return typeof text === 'string' || text instanceof String;
// };

// const isDate = (date: string): boolean => {
//   return Boolean(Date.parse(date));
// };

// const parseDate = (date: unknown): string => {
//   if (!isString(date) || !isDate(date)) {
//       throw new Error('Incorrect date: ' + date);
//   }
//   return date;
// };

// const isWeather = (param: string): param is Weather => {
//   return Object.values(Weather).map(v => v.toString()).includes(param);
// };

// const parseWeather = (weather: unknown): Weather => {
//   if (!isString(weather) || !isWeather(weather)) {
//     throw new Error('Incorrect weather: ' + weather);
//   }
//   return weather;
// };

// const isVisibility = (param: string): param is Visibility => {
//   return Object.values(Visibility).map(v => v.toString()).includes(param);
// };

// const parseVisibility = (visibility: unknown): Visibility => {
//   if (!isString(visibility) || !isVisibility(visibility)) {
//       throw new Error('Incorrect visibility: ' + visibility);
//   }
//   return visibility;
// };

// const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
//   if ( !object || typeof object !== 'object' ) {
//     throw new Error('Incorrect or missing data');
//   }

//   if ('comment' in object && 'date' in object && 'weather' in object && 'visibility' in object)  {
//     const newEntry: NewDiaryEntry = {
//       weather: parseWeather(object.weather),
//       visibility: parseVisibility(object.visibility),
//       date: parseDate(object.date),
//       comment: parseComment(object.comment)
//     };

//     return newEntry;
//   }

//   throw new Error('Incorrect data: a field missing');
// };

// export default toNewDiaryEntry;
