import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");

  const filterPersons = persons.filter((person) => {
    if(!filter) return person
    return person.name.includes(filter)
  })

  const onNameChangeHandle = (event) => {
    event.preventDefault();
    setNewName(event.target.value);
  };

  const onFilterChangeHandle = (event) => {
    event.preventDefault();
    setFilter(event.target.value);
  };

  const onPhoneNumberChangeHandle = (event) => {
    event.preventDefault();
    setNewPhoneNumber(event.target.value);
  };

  const onNameSubmitHandle = (event) => {
    event.preventDefault();
    const existedNameIndex = persons.findIndex(
      (person) => person.name === newName
    );
    if (existedNameIndex > -1) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons([...persons, { name: newName, number: newPhoneNumber }]);
    setNewName("");
    setNewPhoneNumber("");
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with{" "}
        <input onChange={onFilterChangeHandle} value={filter} />
      </div>
      <h2>Add a new</h2>
      <form onSubmit={onNameSubmitHandle}>
        <div>
          name: <input onChange={onNameChangeHandle} value={newName} />
        </div>
        <div>
          number:
          <input onChange={onPhoneNumberChangeHandle} value={newPhoneNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filterPersons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;
