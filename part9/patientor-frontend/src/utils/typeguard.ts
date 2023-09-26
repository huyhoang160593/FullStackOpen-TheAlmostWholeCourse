import { HealthCheckRating } from "../types";

export function isString(text: unknown): text is string {
  return typeof text === 'string' || text instanceof String;
}

export function parseString(text: unknown, fieldName = 'text'): string {
  if (!text || !isString(text)) {
    throw new Error('Incorrect or missing ' + fieldName);
  }

  return text;
}

export function isNumber(number: number): number is number {
  const jsParseNumber = Number(number);
  return !isNaN(jsParseNumber);
}
export function parseHealthCheckRating(healthCheckRating: unknown): HealthCheckRating {
  const healthCheckRatingNumber = Number(healthCheckRating)
  if (!isNumber(healthCheckRatingNumber)) {
    throw new Error("healthCheckRating can't be parse into number ")
  }
  if (
    healthCheckRatingNumber < 0 ||
    healthCheckRatingNumber > 3
  ) {
    throw new Error(
      'Incorrect or missing healthCheckRating: ' + healthCheckRatingNumber
    );
  }
  return healthCheckRatingNumber as HealthCheckRating;
}