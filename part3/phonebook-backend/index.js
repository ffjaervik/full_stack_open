import express from "express";
// import { personsData, setPersonsData } from "./db.js";
import morgan from "morgan";
import cors from "cors";
import Person from "./models/person.js";
import mongoose from "mongoose";

const app = express();

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

//Body logger for Post request
morgan.token("body", function (req, res) {
  return req.method === "POST" ? JSON.stringify(req.body) : undefined;
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

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

//ERROR HANDLER FUNCTION
const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  next(error);
};

//UNKNOWN ENDPOINT FUNCTION
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

//GET ALL PERSONS FROM MONGODB
app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((persons) => {
      console.log("persons", persons);
      res.json(persons);
    })
    .catch((err) => next(err));
});

//GET BY ID
app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findById(id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
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

//DELETE PERSON FROM MONGODB
app.delete("/api/PERSONS/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

//UPDATE PERSON IN MONGODB
app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;
  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updatedPerson) => {
      if (updatedPerson) {
        res.json(updatedPerson);
      } else {
        res.status(404).json({ errors: "not found" });
      }
    })
    .catch((err) => next(err));
});

app.get("/info", (req, res) => {
  Person.find({}).then((persons) => {
    console.log("persons", persons);
    res.send(
      `<p>Phonebook has info for ${persons.length} people</br>${new Date()}</p>`
    );
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port ${PORT}`)
);

app.use(unknownEndpoint);
app.use(errorHandler);
