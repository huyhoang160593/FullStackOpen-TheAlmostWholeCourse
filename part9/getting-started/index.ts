import express from 'express';
import { safeParse } from 'valibot';
import { calculateBmi } from './bmiCalculator';
import { BMISchema } from './schemas/queries';
import { ExercisesSchema } from './schemas/bodies';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/bmi', (req, res) => {
  console.log(req.query);
  const parseResult = safeParse(BMISchema, req.query);
  if (!parseResult.success) {
    // return res.status(400).json(flatten(parseResult.issues));
    return res.status(400).json({
      error: 'malformatted parameters',
    });
  }
  const { height, weight } = parseResult.output;
  return res.json(calculateBmi(height, weight));
});

app.post('/exercises', (req, res) => {
  if (Object.keys(req.body as object).length < 2) {
    return res.status(400).json({
      error: 'parameters missing',
    });
  }
  const parseResult = safeParse(ExercisesSchema, req.body);
  if (!parseResult.success) {
    return res.status(400).json({
      error: 'malformatted parameters',
    });
  }
  const { target, daily_exercises } = parseResult.output;
  return res.json(calculateExercises(target, daily_exercises));
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
