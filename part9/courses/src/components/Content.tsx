import { CoursePart } from '../data/CoursePart';
import { Part } from './Part';

interface ContentProps {
  courseParts: CoursePart[];
}

export function Content({ courseParts }: ContentProps) {
  return (
    <>
      {courseParts.map((coursePart) => (
        <Part key={coursePart.name} coursePart={coursePart} />
      ))}
    </>
  );
}
