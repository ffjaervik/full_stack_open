import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";

import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [personFilter, setpersonFilter] = useState("");
  const allNames = persons.map((person) => person.name);

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((res) => setPersons(res.data));
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

  const addToPhoneBook = () => {
    console.log("newName", newName);
    console.log("allNames", allNames);
    console.log(allNames.includes(newName));
    if (allNames.includes(newName)) {
      alert(`${newName} is already added to the phonebook`);
      setNewName("");
    } else {
      alert(`${newName} added to the phonebook`);
      const newPerson = {
        name: newName,
        number: newNumber,
        id: allNames.length + 1,
      };
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addToPhoneBook();
  };

  const personsToShow =
    personFilter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLocaleLowerCase().includes(personFilter.toLowerCase())
        );

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
      <Person personsToShow={personsToShow} />
    </div>
  );
};

export default App;
