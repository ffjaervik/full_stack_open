const Person = ({ personsToShow, deletePerson }) => {
  return (
    <>
      {personsToShow.map((person) => (
        <p key={person.id}>
          {person.name} - {person.number}{" "}
          <button onClick={() => deletePerson(person.id)}>delete</button>
        </p>
      ))}
    </>
  );
};

export default Person;
