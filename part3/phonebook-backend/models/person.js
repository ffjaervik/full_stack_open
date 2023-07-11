import mongoose from 'mongoose'
import 'dotenv/config'

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: [true, 'name required'],
  },
  number: {
    type: String,
    minLength: 8,
    required: [true, 'phone number required'],
    validate: {
      validator: (v) => {
        return /^(?:\d{2}-\d{7}|\d{3}-\d{8})$/.test(v)
      },
      message: (props) => `${props.value} is not a valid phone number`,
    },
  },
})

//Changes the _id to id and removes the __v
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Person = mongoose.model('Person', personSchema)
// const Person = mongoose.model('Person', personSchema, 'persons');

export default Person
