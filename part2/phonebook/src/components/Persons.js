export default function Persons({ filterPersons }) {
  return filterPersons.map((person) => (
    <p key={person.name}>
      {person.name} {person.number}
    </p>
  ));
}