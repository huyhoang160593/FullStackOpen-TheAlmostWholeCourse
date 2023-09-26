import { Box, Button, Typography } from '@mui/material';
import { Diagnosis, Patient } from '../../types';
import { useEffect, useState } from 'react';
import patientServices from '../../services/patients';
import { useParams } from 'react-router-dom';
import { PatientGender } from './PatientGender';
import diagnosisServices from '../../services/diagnosis';
import { EntryDetails } from './EntryDetails';
import { NewEntryDialogForm } from './NewEntryDialogForm';

interface Props {}
export function PatientDetail(_props: Props) {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnosisCodeList, setDiagnosisCodeList] = useState<Diagnosis[]>([]);
  const [message, setMessage] = useState<string>('Loading...');
  const [isDisplayNewDialog, setIsDisplayNewDialog] = useState<boolean>(false);

  const handleOpenDialog = () => setIsDisplayNewDialog(true);
  const handleCloseDialog = () => setIsDisplayNewDialog(false);

  let { patientId } = useParams();

  useEffect(() => {
    const getDiagnosisCodeList = () =>
      diagnosisServices
        .getAll()
        .then((diagnosisList) => setDiagnosisCodeList(diagnosisList));
    void getDiagnosisCodeList();
  }, []);
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
      <Typography variant="h3" component={'h2'}>
        {patient.name} <PatientGender gender={patient.gender} />
      </Typography>
      <Typography variant="body1">ssh: {patient.ssn}</Typography>
      <Typography variant="body1">occupation: {patient.occupation}</Typography>

      <Typography variant="h4" component={'h3'}>
        entries
      </Typography>
      {patient.entries.map((entry) => (
        <EntryDetails
          key={entry.id}
          entry={entry}
          diagnosisCodeList={diagnosisCodeList}
        />
      ))}
      <Button
        sx={{ marginTop: '1em' }}
        variant="contained"
        onClick={handleOpenDialog}
      >
        ADD NEW ENTRY
      </Button>
      <NewEntryDialogForm
        handleCloseDialog={handleCloseDialog}
        isDisplayNewDialog={isDisplayNewDialog}
        diagnosisCodeList={diagnosisCodeList}
        setPatient={setPatient}
      />
    </Box>
  );
}
