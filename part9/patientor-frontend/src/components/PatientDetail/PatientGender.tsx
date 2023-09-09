import { Gender } from '../../types';
import { Female, Male, Transgender } from '@mui/icons-material';

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
