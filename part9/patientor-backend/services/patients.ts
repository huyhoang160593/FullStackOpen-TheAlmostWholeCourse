import patientsData, { NonSSNPatient, Patient } from '../data/patients';

const patients: Patient[] = patientsData;

export const getPatients = (): Patient[] => {
  return patients;
};

export const getNonSSNPatients = (): NonSSNPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};
