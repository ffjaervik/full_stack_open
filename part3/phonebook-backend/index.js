import express from "express";
import { personsData, setPersonsData } from "./db.js";

const app = express();

app.use(express.json());

app.get("/api/persons", (req, res) => {
  res.json(personsData);
});

app.get("/info", (req, res) => {
  const info = {
    amount: personsData.length,
    date: new Date(),
  };
  res.send(
    `<p>Phonebook has info for ${info.amount} people</br>${info.date}</p>`
  );
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const reqPerson = personsData.find((person) => person.id === id);
  if (reqPerson) {
    res.json(reqPerson);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  setPersonsData(personsData.filter((person) => person.id !== id));
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const person = req.body;
  console.log("person", person)
  const generateId = () => {
    const maxId = personsData.length > 0 ? Math.floor(Math.random() * 1000) : 0;
    return maxId;
  };

  if (!person.name || !person.number) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  const newPerson = {
    id: generateId(),
    name: person.name,
    number: person.number,
  };

  console.log(newPerson);
  setPersonsData(personsData.concat(newPerson));
  res.json(newPerson);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// app.post('/api/persons', (req, res, next) => {
//       const person = req.body;

//       const errors = validatePerson(person);
//       if (errors.length !== 0) {
//         return res.status(400).json({ errors });
//       }

//       const personToAdd = new Person({ name: person.name, number: person.number });
//       personToAdd
//         .save()
//         .then((savedPerson) => res.status(201).json(savedPerson))
//         .catch((err) => next(err));
//     });

//     const generateId = () => {
//       const maxId = notes.length > 0
//         ? Math.max(...notes.map(n => n.id))
//         : 0
//       return maxId + 1
//     }

//     app.post('/api/notes', (request, response) => {
//       const body = request.body

//       if (!body.content) {
//         return response.status(400).json({
//           error: 'content missing'
//         })
//       }

//       const note = {
//         content: body.content,
//         important: body.important || false,
//         date: new Date(),
//         id: generateId(),
//       }

//       notes = notes.concat(note)

//       response.json(note)
//     })
