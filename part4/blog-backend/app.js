import express from 'express'
import cors from 'cors'
import blogsRouter from './controllers/blogs.js'
import logger from './utils/logger.js'
import mongoose from 'mongoose'
import config from './utils/config.js'

const app = express()

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)


app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)


export default app
