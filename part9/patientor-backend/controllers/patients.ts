import { Router } from "express";
import { addPatient, getNonSSNPatients, getPatient } from "../services/patients";
import { toNewPatientEntry } from "../utils/typeguard";

const patientsRouter = Router();

patientsRouter.get('/patients', (_req, res) => {
  return res.json(getNonSSNPatients());
});

patientsRouter.get('/patients/:id', (req, res) => {
  const patientId = req.params.id;
  const foundPatient = getPatient(patientId);
  if (!foundPatient) {
    return res.status(404).send(`The patient with ID '${patientId}' is not being found`);
  }
  return res.json(foundPatient);
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