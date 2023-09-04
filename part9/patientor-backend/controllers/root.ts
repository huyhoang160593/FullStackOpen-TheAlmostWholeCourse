import { Router } from "express";

const rootRouter = Router();

rootRouter.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

export default rootRouter;