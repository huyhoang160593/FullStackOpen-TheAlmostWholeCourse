import express from 'express';
import cors from 'cors';
import rootRouter from './controllers/root';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', rootRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});