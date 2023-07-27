const express = require('express')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs.js')
const logger = require('./utils/logger.js')
const mongoose = require('mongoose')
const config = require('./utils/config.js')
const usersRouter = require('./controllers/users.js')
const morgan = require('morgan')

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


module.exports = app
