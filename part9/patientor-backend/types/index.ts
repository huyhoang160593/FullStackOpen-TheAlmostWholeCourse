export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other"
}

export interface Diagnose {
    code:   string;
    name:   string;
    latin?: string;
}

export interface Entry {}
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