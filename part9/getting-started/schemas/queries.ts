import { coerce, nonNullish, number, object } from "valibot";
import { isNotNaN } from "../utilities/valibotExtendedPipeline";

export const BMISchema = object({
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