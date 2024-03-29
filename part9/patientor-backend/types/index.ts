// Define special omit for unions
export type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other"
}
export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface Diagnosis {
    code:   string;
    name:   string;
    latin?: string;
}

export interface Discharge {
  date: string
  criteria: string
}

export interface SickLeave {
  startDate: string
  endDate: string
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}
interface HospitalEntry extends BaseEntry {
  type: "Hospital",
  discharge: Discharge
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare"
  employerName: string,
  sickLeave?: SickLeave
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patient {
    id:          string;
    name:        string;
    dateOfBirth: string;
    ssn:         string;
    gender:      Gender;
    occupation:  string;
    entries:     Entry[];
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type NonSSNPatient = Omit<Patient, 'ssn'>;

export type NewPatientEntry = Omit<Patient, 'id'>;

export type NewEntry = UnionOmit<Entry, 'id'>;