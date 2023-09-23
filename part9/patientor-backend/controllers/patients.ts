import { Router } from "express";
import { addEntry, addPatient, getNonSSNPatients, getPatient } from "../services/patients";
import { toNewEntry, toNewPatientEntry } from "../utils/typeguard";

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

patientsRouter.post('/patients', (req, res) => {
  try {
    const newPatient = toNewPatientEntry(req.body);

    const addedPatient = addPatient(newPatient);
    res.json(addedPatient);
  } catch (error) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

patientsRouter.post('/patients/:id/entries', (req, res) => {
  try {
    const patientId = req.params.id;
    const newEntry = toNewEntry(req.body);
    const addedEntry = addEntry(patientId, newEntry);
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