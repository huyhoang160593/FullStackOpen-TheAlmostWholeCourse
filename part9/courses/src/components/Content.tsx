import { CoursePart } from '../models/CoursePart';

interface ContentProps {
  courseParts: CoursePart[];
}
export function Content({ courseParts }: ContentProps) {
  return (
    <>
      {courseParts.map((coursePart) => (
        <p key={coursePart.name}>
          {coursePart.name} {coursePart.exerciseCount}
        </p>
      ))}
    </>
  );
}
