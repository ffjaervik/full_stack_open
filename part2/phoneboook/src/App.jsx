import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleChange = (e) => {
    console.log(e)
    setNewName(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newPerson = {name: newName}
    setPersons(persons.concat(newPerson));
    setNewName("")
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <input value={newName} onChange={handleChange} />

        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, id) => (
        <div>
          <p key={person.name}>{person.name}</p>
        </div>
      ))}
      <div>debug: {newName}</div>
    </div>
  );
};

export default App;
