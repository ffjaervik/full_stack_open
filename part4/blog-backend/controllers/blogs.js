// require('express-async-errors') // This package will take care of errors in async functions. Basically ut gets rid of the need for try-catch blocks in async functions.
const blogsRouter = require('express').Router()
const BlogModel = require('../models/blog.js')

blogsRouter.get('/', async (request, response) => {
  const blogs = await BlogModel.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const blog = new BlogModel({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  })

  try {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
    
  } catch (exception) {
    next(exception)
  }
  })

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const id = request.params.id
    await BlogModel.findByIdAndRemove(id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter
