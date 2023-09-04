import { Router } from "express";
import { getNonSSNPatients } from "../services/patients";

const patientsRouter = Router();

patientsRouter.get('/patients', (_req, res) => {
  return res.json(getNonSSNPatients());
});

export default patientsRouter;