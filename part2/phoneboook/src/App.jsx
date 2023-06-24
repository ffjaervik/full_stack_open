import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const allNames = persons.map((person) => person.name);

  const handleNameChange = (e) => setNewName(e.target.value);
  const handleNumberChange = (e) => setNewNumber(e.target.value);

  const addToPhoneBook = () => {
    if (allNames.find((name) => name !== newName)) {
      alert(`${newName} added to the phonebook`);
      const newPerson = { name: newName, number: newNumber };
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    } else alert(`${newName} is already added to the phonebook`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addToPhoneBook();
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>

        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={person.name}>
          <p>
            {person.name} - {person.number}
          </p>
        </div>
      ))}
      <div>debug: {newNumber}</div>
    </div>
  );
};

export default App;
