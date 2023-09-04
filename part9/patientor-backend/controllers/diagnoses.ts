import { Router } from "express";
import { getDiagnoses } from "../services/diagnoses";

const diagnosesRouter = Router();

diagnosesRouter.get('/diagnoses', (_req, res) => {
  return res.json(getDiagnoses());
});

export default diagnosesRouter;