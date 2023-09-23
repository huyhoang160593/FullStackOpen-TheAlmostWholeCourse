import patientsData from '../data/patients';
import { v4 as uuid } from 'uuid';
import {
  Patient,
  NonSSNPatient,
  NewPatientEntry,
  Entry,
  NewEntry,
} from '../types';
const patients: Patient[] = patientsData;

export const getPatients = (): Patient[] => {
  return patients;
};

export const getPatient = (patientId: string): Patient | undefined => {
  return patients.find((patient) => patient.id === patientId);
};

export const getNonSSNPatients = (): NonSSNPatient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

export const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry: Patient = {
    id: uuid(),
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export const addEntry = (patientId: string, entry: NewEntry): Entry => {
  const foundedPatientIndex = patients.findIndex(
    (patient) => patient.id === patientId
  );
  if (foundedPatientIndex < 0) {
    throw new Error(`patient with 'id' ${patientId} cannot be found`);
  }
  const newEntry: Entry = {
    id: uuid(),
    ...entry,
  };
  patients[foundedPatientIndex].entries.push(newEntry);
  return newEntry;
};
