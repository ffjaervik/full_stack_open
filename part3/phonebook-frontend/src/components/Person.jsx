const Person = ({ personsToShow, deletePerson }) => {

  if(personsToShow.length === 0) return (<p>No persons to show</p>
  )

  return (
    <>
      {personsToShow.map((person) => (
        <p key={person.id}>
          {person.name} - {person.number}{" "}
          <button onClick={() => deletePerson(person.name)}>delete</button>
        </p>
      ))}
    </>
  );
};

export default Person;
