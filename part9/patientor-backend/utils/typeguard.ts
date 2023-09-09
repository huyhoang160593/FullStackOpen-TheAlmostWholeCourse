import { Gender, NewPatientEntry } from "../types";

function isString(text: unknown): text is string {
  return typeof text === 'string' || text instanceof String;
}
function parseString(text: unknown, fieldName = 'text'): string {
  if (!text || !isString(text)) {
    throw new Error('Incorrect or missing ' + fieldName);
  }

  return text;
}

function isGender(str: string): str is Gender {
  return Object.values(Gender)
    .map((value) => value.toString())
    .includes(str);
}
function parseGender(gender: unknown): Gender {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
}

function isDate(date: string): boolean {
  return Boolean(Date.parse(date));
}
function parseDate(date: unknown, fieldName = 'date'): string {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing ${fieldName}: ${date}`);
  }
  return date;
}

export function toNewPatientEntry(object: unknown): NewPatientEntry {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'gender' in object &&
    'dateOfBirth' in object &&
    'occupation' in object &&
    'ssn' in object
  ) {
    const newPatientEntry: NewPatientEntry = {
      name: parseString(object.name, 'name'),
      gender: parseGender(object.gender),
      dateOfBirth: parseDate(object.dateOfBirth),
      occupation: parseString(object.occupation, 'occupation'),
      ssn: parseString(object.ssn, 'ssn'),
      entries: []
    };
    return newPatientEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
}
