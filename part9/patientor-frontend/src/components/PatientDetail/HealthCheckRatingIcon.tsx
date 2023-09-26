import { match as patternMatch } from 'ts-pattern';
import { Favorite, HeartBroken } from '@mui/icons-material';

export const HealthCheckRatingIcon: React.FC<{ healthCheckRating: number; }> = ({ healthCheckRating }) => {
  return patternMatch(healthCheckRating)
    .with(0, () => <Favorite sx={{ color: 'green' }} />)
    .with(1, () => <Favorite sx={{ color: 'yellow' }} />)
    .with(2, () => <Favorite sx={{ color: 'red'}} />)
    .with(3, () => <HeartBroken sx={{ color: 'black' }}/>)
    .run();
};
