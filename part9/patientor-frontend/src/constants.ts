export const apiBaseUrl = 'http://localhost:3001/api';
export const EntryTypes = [
  'Hospital',
  'OccupationalHealthcare',
  'HealthCheck',
] as const;
export const FormEntryNames = {
  TYPE: 'type',
  DESCRIPTION: 'description',
  DATE: 'date',
  SPECIALIST: 'specialist',
  DIAGNOSIS_CODES: 'diagnosisCodes',
  DISCARD_CRITERIA: 'discard.criteria',
  DISCARD_DATE: 'discard.date',
  HEALTH_CHECK_RATING: 'healthCheckRating',
  EMPLOYER_NAME: 'employerName',
  SICKLEAVE_START: 'sickleave.startDate',
  SICKLEAVE_END: 'sickleave.endDate',
} as const;
