export default function Persons({ filterPersons, customDeleteClickHandle }) {
  return filterPersons.map((person) => (
    <p key={person.name}>
      {person.name} {person.number}
      <button
        type="button"
        onClick={() => {
          customDeleteClickHandle(person);
        }}
      >
        delete
      </button>
    </p>
  ));
}
