import { Box, Typography } from '@mui/material';
import { Patient } from '../../types';
import { Fragment, useEffect, useState } from 'react';
import patientServices from '../../services/patients';
import { useParams } from 'react-router-dom';
import { PatientGender } from './PatientGender';

interface Props {}
export function PatientDetail(_props: Props) {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [message, setMessage] = useState<string>('Loading...');

  let { patientId } = useParams();
  useEffect(() => {
    const fetchPatient = (id: string) =>
      patientServices
        .getOne(id)
        .then((patient) => setPatient(patient))
        .catch((error) => {
          alert(error);
          setMessage(`Can't find the patient with id "${id}"`);
        });
    if (!patientId) return;
    void fetchPatient(patientId);
  }, [patientId]);
  if (!patient || !patientId) {
    return (
      <Typography variant="body1" component={'div'}>
        {message}
      </Typography>
    );
  }
  return (
    <Box component={'main'}>
      <Typography variant="h2" component={'h2'}>
        {patient.name} <PatientGender gender={patient.gender} />
      </Typography>
      <Typography variant="body1">ssh: {patient.ssn}</Typography>
      <Typography variant="body1">occupation: {patient.occupation}</Typography>

      <Typography variant="h3" component={'h3'}>
        entries
      </Typography>
      {patient.entries.map((entry) => (
        <Fragment key={entry.id}>
          <Typography variant="body1">
            {entry.date}
            &nbsp;<em>{entry.description}</em>
          </Typography>
          <Box component={'ul'}>
            {Boolean(entry.diagnosisCodes) &&
              entry.diagnosisCodes?.map((diagnosisCode) => (
                <Box component={'li'} key={diagnosisCode}>
                  {diagnosisCode}
                </Box>
              ))}
          </Box>
        </Fragment>
      ))}
    </Box>
  );
}
