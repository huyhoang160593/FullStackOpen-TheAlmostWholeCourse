import data from "../data/diagnoses";
import { Diagnose } from "../types";

const diagnoses = data;

export const getDiagnoses = (): Diagnose[] => {
  return diagnoses;
};
