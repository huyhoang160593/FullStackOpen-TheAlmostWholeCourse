import { useEffect, useState } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import phonebookServices from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
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

  const onPhoneFormSubmitHandle = (event) => {
    event.preventDefault();
    const existedNameIndex = persons.findIndex(
      (person) => person.name === newName
    );
    if (existedNameIndex > -1) {
      if (
        window.confirm(
          `${persons[existedNameIndex].name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        phonebookServices
          .updateItem(persons[existedNameIndex].id, {
            number: newPhoneNumber,
          })
          .then((result) => {
            setPersons(
              persons.map((person) =>
                person.id === result.data.id ? result.data : person
              )
            );
          });
      }
      return;
    }
    phonebookServices
      .addNewPhoneNumber(newName, newPhoneNumber)
      .then((result) => {
        setPersons([...persons, result.data]);
        setNewName("");
        setNewPhoneNumber("");
      })
      .catch((err) => {
        alert("Error when tried to add new phone book !");
      });
  };

  const customDeleteClickHandle = (person) => {
    if (window.confirm(`Delete ${person.name} ?`))
      phonebookServices
        .deleteItem(person.id)
        .then(() => {
          setPersons(
            persons.filter((currentPerson) => currentPerson.id !== person.id)
          );
        })
        .catch(() => {
          alert(`Error when tried to delete phonebook name ${person.name}`);
        });
  };

  useEffect(() => {
    phonebookServices.getAll().then((result) => {
      setPersons(result.data);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onFilterChangeHandle={onFilterChangeHandle} />
      <h2>Add a new</h2>
      <PersonForm
        onPhoneFormSubmitHandle={onPhoneFormSubmitHandle}
        onNameChangeHandle={onNameChangeHandle}
        newName={newName}
        onPhoneNumberChangeHandle={onPhoneNumberChangeHandle}
        newPhoneNumber={newPhoneNumber}
      />
      <h2>Numbers</h2>
      <Persons
        filterPersons={filterPersons}
        customDeleteClickHandle={customDeleteClickHandle}
      />
    </div>
  );
};

export default App;
