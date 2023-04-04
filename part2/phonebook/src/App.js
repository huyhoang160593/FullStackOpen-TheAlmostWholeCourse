import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const onNameChangeHandle = (event) => {
    event.preventDefault();
    setNewName(event.target.value);
  };

  const onNameSubmitHandle = (event) => {
    event.preventDefault();
    const existedNameIndex = persons.findIndex(person => person.name === newName)
    if(existedNameIndex > -1) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons([...persons, { name: newName }]);
    setNewName("");
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onNameSubmitHandle}>
        <div>
          name: <input onChange={onNameChangeHandle} value={newName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>{person.name}</p>
      ))}
    </div>
  );
};

export default App;
