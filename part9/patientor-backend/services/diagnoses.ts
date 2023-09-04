import data, { Diagnose } from "../data/diagnoses";

const diagnoses = data;

export const getDiagnoses = (): Diagnose[] => {
  return diagnoses;
};
