import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { EntryTypes, FormEntryNames } from '../../constants';
import {
  Diagnosis,
  EntryTypesUnion,
  HealthCheckRating,
  NewEntry,
  Patient,
} from '../../types';
import { Fragment, useState } from 'react';
import { parseHealthCheckRating, parseString } from '../../utils/typeguard';
import patientServices from '../../services/patients';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';

const {
  TYPE,
  DESCRIPTION,
  DATE,
  SPECIALIST,
  DIAGNOSIS_CODES,
  DISCARD_CRITERIA,
  DISCARD_DATE,
  EMPLOYER_NAME,
  HEALTH_CHECK_RATING,
  SICKLEAVE_START,
  SICKLEAVE_END,
} = FormEntryNames;

export const NewEntryDialogForm: React.FC<{
  diagnosisCodeList: Diagnosis[];
  handleCloseDialog: () => void;
  isDisplayNewDialog: boolean;
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
}> = ({
  diagnosisCodeList,
  handleCloseDialog,
  isDisplayNewDialog,
  setPatient,
}) => {
  let { patientId } = useParams();

  const [entryType, setEntryType] = useState<EntryTypesUnion>('HealthCheck');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [error, setError] = useState('');

  const displayError = (errorMessage: string, timeout = 5000) => {
    setError(errorMessage)
    setTimeout(() => setError(''), timeout)
  }

  const handleSetDiagnosisCodes = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const rawFormDataObject = Object.fromEntries(formData.entries());
    try {
      const baseEntry = {
        [DESCRIPTION]: parseString(rawFormDataObject[DESCRIPTION], DESCRIPTION),
        [DATE]: parseString(rawFormDataObject[DATE], DATE),
        [SPECIALIST]: parseString(rawFormDataObject[SPECIALIST], SPECIALIST),
        [DIAGNOSIS_CODES]: diagnosisCodes,
      };
      const entryType = parseString(rawFormDataObject[TYPE], TYPE);

      let requestBody: NewEntry | undefined = undefined;
      switch (entryType) {
        case EntryTypes[0]: {
          requestBody = {
            type: entryType,
            ...baseEntry,
            discharge: {
              criteria: parseString(
                rawFormDataObject[DISCARD_CRITERIA],
                DISCARD_CRITERIA
              ),
              date: parseString(rawFormDataObject[DISCARD_DATE], DISCARD_DATE),
            },
          } satisfies NewEntry;
          break;
        }
        case EntryTypes[1]: {
          const haveSickLeave =
            rawFormDataObject[SICKLEAVE_START] &&
            rawFormDataObject[SICKLEAVE_END];
          requestBody = {
            type: entryType,
            ...baseEntry,
            employerName: parseString(
              rawFormDataObject[EMPLOYER_NAME],
              EMPLOYER_NAME
            ),
            ...(haveSickLeave && {
              sickLeave: {
                startDate: parseString(
                  rawFormDataObject[SICKLEAVE_START],
                  SICKLEAVE_START
                ),
                endDate: parseString(
                  rawFormDataObject[SICKLEAVE_END],
                  SICKLEAVE_END
                ),
              },
            }),
          } satisfies NewEntry;
          break;
        }
        case EntryTypes[2]: {
          requestBody = {
            type: entryType,
            ...baseEntry,
            healthCheckRating: parseHealthCheckRating(
              rawFormDataObject[HEALTH_CHECK_RATING]
            ),
          };
          break;
        }
        default:
          throw new Error(
            'There is somethings wrong with the entryType: ' + entryType
          );
      }
      if (typeof requestBody === 'undefined') {
        throw new Error('request is not building properly');
      }
      const addedEntries = await patientServices.createNewEntry(
        parseString(patientId),
        requestBody
      );
      setPatient((patient) => {
        patient?.entries.push(addedEntries);
        return patient;
      });
      handleCloseDialog();
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        displayError(error.message)
        return
      }
      if (error instanceof AxiosError) {
        displayError(error.response?.data)
        return
      }
      displayError('Unknown error, please check console for more detail')
    }
  };
  const enumKeys = Object.values(HealthCheckRating);
  return (
    <Dialog
      open={isDisplayNewDialog}
      onClose={handleCloseDialog}
      fullWidth={true}
      maxWidth="md"
    >
      <DialogTitle>New Entry</DialogTitle>
      <DialogContentText>
        {Boolean(error) && <Alert severity="error">{error}</Alert>}
      </DialogContentText>
      <DialogContent>
        <Box
          id="entryForm"
          component={'form'}
          paddingTop={'0.5em'}
          display={'flex'}
          gap={'1em'}
          flexDirection={'column'}
          onSubmit={handleFormSubmit}
        >
          <FormControl fullWidth>
            <InputLabel id="form-entry-types">Entry type</InputLabel>
            <Select
              id="entry-types-select"
              labelId="form-entry-types"
              name={TYPE}
              label="Entry type"
              value={entryType}
              onChange={(event) =>
                setEntryType(event.target.value as EntryTypesUnion)
              }
            >
              {EntryTypes.map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField label="Description" name={DESCRIPTION} />
          <TextField
            InputLabelProps={{ shrink: true }}
            label="Date"
            name={DATE}
            type="date"
          />
          <TextField label="Specialist" name={SPECIALIST} />
          <FormControl fullWidth>
            <InputLabel id="form-diagnosis-codes">Diagnosis codes</InputLabel>
            <Select
              id="diagnosis-code-select"
              labelId="form-diagnosis-codes"
              name={DIAGNOSIS_CODES}
              label="Diagnosis codes"
              multiple
              value={diagnosisCodes}
              onChange={handleSetDiagnosisCodes}
              input={
                <OutlinedInput
                  id="select-multiple-chip"
                  label="Diagnosis codes"
                />
              }
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {diagnosisCodeList.map((diagnosisCode) => (
                <MenuItem key={diagnosisCode.name} value={diagnosisCode.code}>
                  {diagnosisCode.code}: {diagnosisCode.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {entryType === 'Hospital' && (
            <Fragment>
              <TextField label={'Discard Criteria'} name={DISCARD_CRITERIA} />
              <TextField
                label={'Discard Date'}
                name={DISCARD_DATE}
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Fragment>
          )}
          {entryType === 'HealthCheck' && (
            <Fragment>
              <FormControl>
                <FormLabel id="radio-group-health-check-rating">
                  Health Check Rating
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="radio-group-health-check-rating"
                  name={HEALTH_CHECK_RATING}
                >
                  {enumKeys
                    .slice(0, enumKeys.length / 2)
                    .map((label, index) => (
                      <FormControlLabel
                        key={label}
                        control={<Radio />}
                        value={enumKeys[index + enumKeys.length / 2]}
                        label={label}
                      />
                    ))}
                </RadioGroup>
              </FormControl>
            </Fragment>
          )}
          {entryType === 'OccupationalHealthcare' && (
            <Fragment>
              <TextField label={'Employer Name'} name={EMPLOYER_NAME} />

              <Box
                component={'fieldset'}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  position: 'relative',
                  paddingTop: '2rem',
                  border: 'none',
                }}
              >
                <Typography
                  component={'legend'}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                >
                  Sickleave
                </Typography>
                <TextField
                  label={'Start Date'}
                  name={SICKLEAVE_START}
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label={'End Date'}
                  name={SICKLEAVE_END}
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
            </Fragment>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} variant="outlined">
          Cancel
        </Button>
        <Button
          component="button"
          form="entryForm"
          variant="contained"
          type="submit"
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};
