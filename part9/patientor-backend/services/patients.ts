import patientsData, { NewPatientEntry, NonSSNPatient, PatientEntry } from '../data/patients';
import { v4 as uuid } from "uuid";
const patients: PatientEntry[] = patientsData;

export const getPatients = (): PatientEntry[] => {
  return patients;
};

export const getPatient = (patientId: string): PatientEntry | undefined => {
  return patients.find(patient => patient.id === patientId);
};

export const getNonSSNPatients = (): NonSSNPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

export const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry: PatientEntry = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};
