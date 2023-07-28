const express = require('express')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs.js')
const logger = require('./utils/logger.js')
const mongoose = require('mongoose')
const config = require('./utils/config.js')
const usersRouter = require('./controllers/users.js')
const loginRouter = require('./controllers/login')
const morgan = require('morgan')
const middleware = require('./utils/middleware.js')

const app = express()

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
