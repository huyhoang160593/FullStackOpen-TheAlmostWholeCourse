import {
  Diagnosis,
  Discharge,
  Gender,
  HealthCheckRating,
  NewEntry,
  NewPatientEntry,
  SickLeave,
} from '../types';

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

function isNumber(number: unknown): number is number {
  const jsParseNumber = Number(number);
  number = jsParseNumber;
  return !isNaN(jsParseNumber);
}
function parseHealthCheckRating(healthCheckRating: unknown): HealthCheckRating {
  if (
    !healthCheckRating ||
    !isNumber(healthCheckRating) ||
    !Number.isInteger(healthCheckRating) ||
    healthCheckRating < 0 ||
    healthCheckRating > 3
  ) {
    throw new Error(
      'Incorrect or missing healthCheckRating: ' + healthCheckRating
    );
  }
  return healthCheckRating as HealthCheckRating;
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
      entries: [],
    };
    return newPatientEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
}

export const parseDiagnosisCodes = (
  object: unknown
): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseDischarge = (object: unknown): Discharge => {
  if (
    !object ||
    typeof object !== 'object' ||
    !('date' in object) ||
    !('criteria' in object)
  ) {
    throw new Error('Incorrect data: discharge is not a object');
  }
  return object as Discharge;
};

const parseSickLeave = (object: unknown) => {
  if (
    !object ||
    typeof object !== 'object' ||
    !('startDate' in object) ||
    !('endDate' in object)
  ) {
    throw new Error('Incorrect data: SickLeave is not a object');
  }
  const sickLeave: SickLeave = {
    startDate: parseDate(object.startDate),
    endDate: parseDate(object.endDate),
  };
  return sickLeave;
};

export const toNewEntry = (object: unknown): NewEntry => {
  if (
    !object ||
    typeof object !== 'object' ||
    !('type' in object) ||
    !('description' in object) ||
    !('date' in object) ||
    !('specialist' in object)
  ) {
    throw new Error('Incorrect or missing data');
  }
  const baseEntry = {
    description: parseString(object.description),
    date: parseDate(object.date),
    specialist: parseString(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object),
  };
  if (object.type === 'Hospital' && 'discharge' in object) {
    const newHospitalEntry: NewEntry = {
      ...baseEntry,
      type: object.type,
      discharge: parseDischarge(object.discharge),
    };
    return newHospitalEntry;
  }
  if (object.type === 'HealthCheck' && 'healthCheckRating' in object) {
    const newHospitalEntry: NewEntry = {
      ...baseEntry,
      type: object.type,
      healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
    };
    return newHospitalEntry;
  }
  if (object.type === 'OccupationalHealthcare' && 'employerName' in object) {
    const newOccupationalHealthcareEntry: NewEntry = {
      ...baseEntry,
      type: object.type,
      employerName: parseString(object.employerName),
    };
    if ('sickLeave' in object) {
      newOccupationalHealthcareEntry.sickLeave = parseSickLeave(
        object.sickLeave
      );
    }
    return newOccupationalHealthcareEntry;
  }
  throw new Error('Incorrect data: some fields are missing');
};
