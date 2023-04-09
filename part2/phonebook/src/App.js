import { useEffect, useState } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Notification, { ERROR, SUCCESS } from "./components/Notification";
import phonebookServices from "./services/phonebook";

const defaultNotificationState = {
  type: null,
  message: null,
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [notification, setNotification] = useState({
    ...defaultNotificationState,
  });

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

  const displayNotification = (message, type = SUCCESS, timeout = 3000) => {
    setNotification({
      message,
      type,
    });
    setTimeout(() => {
      setNotification({
        ...defaultNotificationState,
      });
    }, timeout);
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
            setNewName("");
            setNewPhoneNumber("");
            displayNotification(`Number of ${result.data.name} changed`);
          })
          .catch((err) => {
            displayNotification(err.response.data.error, ERROR);
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
        displayNotification(`Added ${result.data.name}`);
      })
      .catch((err) => {
        displayNotification(err.response.data.error, ERROR);
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
          displayNotification(
            `Information of ${person.name} has already been removed from server`,
            ERROR
          );
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
      <Notification message={notification.message} type={notification.type} />
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
