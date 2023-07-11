import mongoose from "mongoose";
import "dotenv/config";


const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: Number,
});



//Changes the _id to id and removes the __v
personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = mongoose.model("Person", personSchema);
// const Person = mongoose.model('Person', personSchema, 'persons');


export default Person;
