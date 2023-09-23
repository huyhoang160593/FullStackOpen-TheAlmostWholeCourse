import { match as patternMatch } from 'ts-pattern';
import { Favorite } from '@mui/icons-material';

export const HealthCheckRatingIcon: React.FC<{ healthCheckRating: number; }> = ({ healthCheckRating }) => {
  return patternMatch(healthCheckRating)
    .with(0, () => <Favorite sx={{ color: 'green' }} />)
    .with(1, () => <Favorite sx={{ color: 'yellow' }} />)
    .run();
};
