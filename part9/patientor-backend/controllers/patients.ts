import { Router } from "express";
import { addPatient, getNonSSNPatients } from "../services/patients";
import { toNewPatientEntry } from "../utils/typeguard";

const patientsRouter = Router();

patientsRouter.get('/patients', (_req, res) => {
  return res.json(getNonSSNPatients());
});

patientsRouter.post('/patient', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }

});

export default patientsRouter;