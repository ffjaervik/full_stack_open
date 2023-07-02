import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";
import Notification from "./components/Notification";

import { useState, useEffect } from "react";

import {
  getAllPersons,
  createPerson,
  updatePerson,
  deletePerson,
} from "./services/persons.js";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [personFilter, setpersonFilter] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    getAllPersons().then((initialPersons) => setPersons(initialPersons))
    .catch(error => console.error("Failed to fetch persons", error));
  }, []);
  // EXAMPLE OF DATA FETCHING WITHOUT AXIOS
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const res = await fetch("http://localhost:3001/persons");
  //       const data = await res.json();
  //       setPersons(data);
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   }
  //   fetchData();
  // }, []);

  const handleNameChange = (e) => setNewName(e.target.value);
  const handleNumberChange = (e) => setNewNumber(e.target.value);
  const handlePersonFilterChange = (e) => setpersonFilter(e.target.value);

  const checkForUpdate = (personToUpdate) => {
    const personToUpdateId = personToUpdate.id;
    if (
      window.confirm(
        `${newName} is already added to the phonebook, replace the old number with the new one`
      )
    ) {
      setMessage(`${newName}'s number was updated`);
      setTimeout(() => setMessage(null), 5000);
      const updatedPerson = { ...personToUpdate, number: newNumber };

      updatePerson(personToUpdateId, updatedPerson).then((returnedPerson) =>
        setPersons(
          persons.map((person) =>
            person.id !== returnedPerson.id ? person : returnedPerson
          )
        )
      ).catch(error => {
        setMessage(
          `${error}Information of '${newName}' has already been removed from server`
        );
        setTimeout(() => {
          setMessage(null);
        }, 5000);
        setPersons(persons.filter((person) => person.id !== personToUpdateId));
      })
    }
  };

  const addToPhoneBook = () => {
    if (
      persons.some(
        (person) =>
          person.name.toLowerCase() === newName.toLowerCase() &&
          person.number === newNumber
      )
    ) {
      alert(`${newName} nr.:${newNumber} is already added to the phonebook`);
    } else {
      setMessage(`${newName}' was added to the phonebook`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);

      const newPerson = {
        name: newName,
        number: newNumber,
      };

      createPerson(newPerson).then((returnedPerson) =>
        setPersons(persons.concat(returnedPerson))
      );
    }
    setNewName("");
    setNewNumber("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newName === "") {
      alert("name can't be empty");
      return;
    }

    if (newNumber === "") {
      alert("number can't be empty");
      return;
    }

    if (
      persons.some(
        (person) =>
          person.name.toLocaleLowerCase() === newName.toLocaleLowerCase() &&
          person.number !== newNumber
      )
    ) {
      const personToUpdate = persons.find((person) => person.name == newName);
      checkForUpdate(personToUpdate);
    } else {
      addToPhoneBook();
    }
  };

  const personsToShow =
    personFilter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLocaleLowerCase().includes(personFilter.toLowerCase())
        );

  const handleDelete = (name) => {
    const personToDelete = persons.find((person) => person.name === name);
    if (window.confirm(`Sure you want to delete ${personToDelete.name}`)) {
      setMessage(`${personToDelete.name} was deleted`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      deletePerson(personToDelete.id).then(() => {
        setPersons(persons.filter((person) => person.id !== personToDelete.id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter value={personFilter} onChange={handlePersonFilterChange} />

      <h2>add a new</h2>

      <PersonForm
        handleSubmit={handleSubmit}
        name={newName}
        number={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Person personsToShow={personsToShow} deletePerson={handleDelete} />
    </div>
  );
};

export default App;
