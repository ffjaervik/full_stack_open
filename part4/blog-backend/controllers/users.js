
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const UserModel = require('../models/users.js')

usersRouter.get('/', async (req, res) => {
  const users = await UserModel.find({})
  res.json(users)
})

usersRouter.post('/', async (req, res, next) => {
  const { username, name, password } = req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new UserModel({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
})
module.exports = usersRouter
