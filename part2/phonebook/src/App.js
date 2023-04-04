import { useEffect, useState } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([
  ]);
  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");

  const filterPersons = persons.filter((person) => {
    if (!filter) return person;
    return person.name.includes(filter);
  });

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

  useEffect(()=> {
    axios.get('http://localhost:3001/persons').then((result) => {
      setPersons(result.data)
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onFilterChangeHandle={onFilterChangeHandle} />
      <h2>Add a new</h2>
      <PersonForm
        onNameSubmitHandle={onNameSubmitHandle}
        onNameChangeHandle={onNameChangeHandle}
        newName={newName}
        onPhoneNumberChangeHandle={onPhoneNumberChangeHandle}
        newPhoneNumber={newPhoneNumber}
      />
      <h2>Numbers</h2>
      <Persons filterPersons={filterPersons} />
    </div>
  );
};

export default App;
