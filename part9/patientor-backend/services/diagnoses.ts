import data from "../data/diagnoses";
import { Diagnosis } from "../types";

const diagnoses = data;

export const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};
