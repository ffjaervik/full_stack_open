import express from "express";
// import { personsData, setPersonsData } from "./db.js";
import morgan from "morgan";
import cors from "cors";
import Person from "./models/person.js";
import mongoose from "mongoose";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("build"));

//Body logger for Post request
morgan.token("body", function (req, res) {
  return req.method === "POST" ? JSON.stringify(req.body) : undefined;
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
//End of body logger

//CONNECT TO MONGODB
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

//GET ALL PERSONS FROM MONGODB
app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((persons) => {
      console.log("persons", persons);
      res.json(persons);
    })
    .catch((err) => next(err));
});

//POST NEW PERSON TO MONGODB
app.post("/api/persons", (req, res, next) => {
  const person = req.body;
  const newPerson = new Person({
    name: person.name,
    number: person.number,
  });
  newPerson.save().then((result) => {
    res.json(newPerson);
    console.log("person saved", newPerson);
  });
});

// app.get("/api/persons", (req, res) => {
//   res.json(personsData);
// });

// app.get("/info", (req, res) => {
//   const info = {
//     amount: personsData.length,
//     date: new Date(),
//   };
//   res.send(
//     `<p>Phonebook has info for ${info.amount} people</br>${info.date}</p>`
//   );
// });

// app.get("/api/persons/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const reqPerson = personsData.find((person) => person.id === id);
//   if (reqPerson) {
//     res.json(reqPerson);
//   } else {
//     res.status(404).end();
//   }
// });

// app.delete("/api/persons/:id", (req, res) => {
//   const id = Number(req.params.id);
//   setPersonsData(personsData.filter((person) => person.id !== id));
//   res.status(204).end();
// });

// app.post("/api/persons", (req, res) => {
//   const person = req.body;
//   const generateId = () => {
//     const maxId = personsData.length > 0 ? Math.floor(Math.random() * 1000) : 0;
//     return maxId;
//   };
//   if (
//     personsData.find((p) => p.name.toLowerCase() === person.name.toLowerCase())
//   ) {
//     return res.status(400).json({
//       error: "name must be unique",
//     });
//   }
//   if (personsData.find((p) => p.number === person.number)) {
//     return res.status(400).json({
//       error: "number must be unique",
//     });
//   }

//   if (!person.name || !person.number) {
//     return res.status(400).json({
//       error: "name or number missing",
//     });
//   }

//   const newPerson = {
//     id: generateId(),
//     name: person.name,
//     number: person.number,
//   };

//   setPersonsData(personsData.concat(newPerson));

//   res.json(newPerson);
// });

const PORT = process.env.PORT || 3001;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port ${PORT}`)
);

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);
