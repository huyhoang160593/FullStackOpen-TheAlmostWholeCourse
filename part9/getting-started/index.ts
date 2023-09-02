import express from 'express';
import {
  coerce,
  nonNullish,
  number,
  object,
  safeParse,
} from 'valibot';
import { isNotNaN } from './utilities/valibotExtendedPipeline';
import { calculateBmi } from './bmiCalculator';

const app = express();
const BMIQuerySchema = object({
  height: coerce(
    nonNullish(
      number('The height must be a number', [
        isNotNaN('The height must be a number'),
      ])
    ),
    (value) => Number(value)
  ),
  weight: coerce(
    nonNullish(
      number('The weight must be a number', [
        isNotNaN('The weight must be a number'),
      ])
    ),
    (value) => Number(value)
  ),
});

app.get('/bmi', (req, res) => {
  const parseResult = safeParse(BMIQuerySchema, req.query);
  if (!parseResult.success) {
    // return res.status(400).json(flatten(parseResult.issues));
    return res.status(400).json({
      error: 'malformatted parameters',
    });
  }
  const { height, weight } = parseResult.output;
  return res.json(calculateBmi(height, weight));
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
