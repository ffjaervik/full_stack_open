const Person = ({personsToShow}) => {
  return (
      <>
      {personsToShow.map((person) => (
            <p key={person.id}>
              {person.name} - {person.number}
            </p>
          ))}
          </>
  )
}

export default Person