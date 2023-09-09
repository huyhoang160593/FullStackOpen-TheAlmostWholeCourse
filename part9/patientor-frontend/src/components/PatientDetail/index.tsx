import { Box, Typography } from '@mui/material';
import { Gender, Patient } from '../../types';
import { useEffect, useState } from 'react';
import patientServices from '../../services/patients';
import { Female, Male, Transgender } from '@mui/icons-material';
import { useParams } from 'react-router-dom';

interface PatientGenderProps {
  gender: Gender;
}
export function PatientGender({ gender }: PatientGenderProps) {
  switch (gender) {
    case Gender.Male:
      return <Male />;
    case Gender.Female:
      return <Female />;
    default:
      return <Transgender />;
  }
}

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
    </Box>
  );
}
