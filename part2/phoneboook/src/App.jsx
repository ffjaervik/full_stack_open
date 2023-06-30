import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";

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

  useEffect(() => {
    getAllPersons().then((initialPersons) => setPersons(initialPersons));
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

  const checkForUpdate = () => {
    const updateId = persons.findIndex((person) => person.name == newName);

    if (
      persons.some(
        (person) =>
          person.name.toLocaleLowerCase() === newName.toLocaleLowerCase() &&
          person.number !== newNumber
      )
    ) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with the new one`
        )
      ) {
        const personObjToChange = persons[updateId];
        const updatedPerson = { ...personObjToChange, number: newNumber };
        updatePerson(updateId + 1, updatedPerson).then(
          setPersons(
            persons.map((person) =>
              person.id !== updateId + 1 ? person : updatedPerson
            )
          )
        );
        return true;
      }
    }
    return false;
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
      alert(`${newName} added to the phonebook`);

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
    checkForUpdate() ? null : addToPhoneBook();
  };

  const personsToShow =
    personFilter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLocaleLowerCase().includes(personFilter.toLowerCase())
        );

  const handleDelete = (id) => {
    const personName = persons[id - 1].name;
    if (window.confirm(`Sure you want to delete ${personName}`)) {
      deletePerson(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
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
