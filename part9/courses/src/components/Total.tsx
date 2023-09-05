import { CoursePart } from '../models/CoursePart';

interface TotalProps {
  courseParts: CoursePart[];
}
export function Total({ courseParts }: TotalProps) {
  return (
    <p>
      Number of exercises{' '}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
}
