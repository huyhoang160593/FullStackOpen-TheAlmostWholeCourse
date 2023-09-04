import { Router } from "express";
import diagnosesRouter from "./diagnoses";
import patientsRouter from "./patients";

const apiRouter = Router();

apiRouter.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

apiRouter.use(diagnosesRouter);
apiRouter.use(patientsRouter);

export default apiRouter;