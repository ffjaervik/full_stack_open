import express from "express";

const app = express();

app.use(express.json());

const personsData = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.json(personsData);
});

app.get("/info", (req, res) => {
  const info = {
    amount: personsData.length,
    date: new Date(),
  };
  console.log(info);
  res.send(
    `<p>Phonebook has info for ${info.amount} people</br>${info.date}</p>`
  );
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const reqPerson = personsData.find((person) => person.id === id);
  if(reqPerson) {
      res.json(reqPerson)
  } else{
      res.status(404).end()
  }

});


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

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


//     app.delete('/api/notes/:id', (request, response) => {
//       const id = Number(request.params.id)
//       notes = notes.filter(note => note.id !== id)

//       response.status(204).end()
//     })

//     const PORT = 3001
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`)
//     })
