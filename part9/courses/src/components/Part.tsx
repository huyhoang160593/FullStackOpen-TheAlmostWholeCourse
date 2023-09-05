import { CoursePart } from '../data/CoursePart';

interface PartProps {
  coursePart: CoursePart;
}
export function Part({ coursePart }: PartProps) {
  switch (coursePart.kind) {
    case 'basic':
      return (
        <p>
          <div>
            <strong>
              {coursePart.name} {coursePart.exerciseCount}
            </strong>
          </div>
          <div>
            <em>{coursePart.description}</em>
          </div>
        </p>
      );
    case 'group':
      return (
        <p>
          <div>
            <strong>
              {coursePart.name} {coursePart.exerciseCount}
            </strong>
          </div>
          <div>project exercises {coursePart.groupProjectCount}</div>
        </p>
      );
    case 'special':
      return (
        <p>
          <div>
            <strong>
              {coursePart.name} {coursePart.exerciseCount}
            </strong>
          </div>
          <div>
            <em>{coursePart.description}</em>
          </div>
          <div>required skills: {coursePart.requirements.join(',')}</div>
        </p>
      );
    default:
      return (
        <p>
          <div>
            <strong>
              {coursePart.name} {coursePart.exerciseCount}
            </strong>
          </div>
          <div>
            <em>{coursePart.description}</em>
          </div>
          <div>submit to {coursePart.backgroundMaterial}</div>
        </p>
      );
  }
}
