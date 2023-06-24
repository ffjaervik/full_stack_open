import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const allNames = persons.map((person) => person.name);

  const handleChange = (e) => {
    setNewName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (allNames.find((name) => name !== newName)) {
      alert(`${newName} added to the phonebook`);
      const newPerson = { name: newName };
      setPersons(persons.concat(newPerson));
      setNewName("");
    } else alert(`${newName} is already added to the phonebook`);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <input value={newName} onChange={handleChange} />

        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={person.name}>
          <p>{person.name}</p>
        </div>
      ))}
      <div>debug: {newName}</div>
    </div>
  );
};

export default App;
