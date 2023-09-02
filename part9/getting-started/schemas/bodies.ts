import { array, coerce, number, object } from 'valibot';
import { isNotNaN } from '../utilities/valibotExtendedPipeline';

export const ExercisesSchema = object({
  daily_exercises: array(
    coerce(
      number([isNotNaN('data in daily_exercises must be an number')]),
      (value) => Number(value)
    ),
    'daily_exercises must be an array'
  ),
  target: number('target must be an number'),
});
