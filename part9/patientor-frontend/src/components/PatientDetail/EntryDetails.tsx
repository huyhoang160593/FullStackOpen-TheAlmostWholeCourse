import { Card, CardContent, Typography } from '@mui/material';
import { match } from 'ts-pattern';
import {
  Diagnosis,
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from '../../types';
import { HealthCheckRatingIcon } from './HealthCheckRatingIcon';
import { LocalHospital, MedicalServices, Work } from '@mui/icons-material';

export const EntryDetails: React.FC<{
  entry: Entry;
  diagnosisCodeList: Diagnosis[];
}> = ({ entry, diagnosisCodeList }) => {
  return match(entry)
    .with({ type: 'HealthCheck' }, (value) => (
      <HealthCheckDetail entry={value} />
    ))
    .with({ type: 'Hospital' }, (value) => <HospitalDetail entry={value} />)
    .with({ type: 'OccupationalHealthcare' }, (value) => (
      <OccupationalHealthcareDetail entry={value} />
    ))
    .exhaustive();
};
const HealthCheckDetail: React.FC<{ entry: HealthCheckEntry }> = ({
  entry,
}) => {
  return (
    <Card variant="elevation">
      <CardContent>
        <Typography variant="body1">
          {entry.date} <MedicalServices />{' '}
        </Typography>
        <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
          {entry.description}
        </Typography>
        <HealthCheckRatingIcon healthCheckRating={entry.healthCheckRating} />
        <Typography>diagnose by {entry.specialist}</Typography>
      </CardContent>
    </Card>
  );
};
const HospitalDetail: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <Card variant="elevation">
      <CardContent>
        <Typography variant="body1">
          {entry.date} <LocalHospital />
        </Typography>
        <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
          {entry.description}
        </Typography>
        <Typography>
          discharge {entry.discharge.date}:{entry.discharge.criteria}
        </Typography>
        <Typography>diagnose by {entry.specialist}</Typography>
      </CardContent>
    </Card>
  );
};
const OccupationalHealthcareDetail: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  return (
    <Card variant="elevation">
      <CardContent>
        <Typography variant="body1">
          {entry.date} <Work />
          {entry.employerName}
        </Typography>
        <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
          {entry.description}
        </Typography>
        <Typography>diagnose by {entry.specialist}</Typography>
      </CardContent>
    </Card>
  );
};
