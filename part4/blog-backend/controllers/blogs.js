const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')


blogsRouter.get('/', (request, response) => {
console.log('get request')
  Blog.find({}).then((blogs) => {
      console.log('blogs', blogs)
    response.json(blogs)
  })
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then((result) => {
      response.status(201).json(result)
    })
    .catch((error) => {
      response.status(400).json(error)
    })
})

module.exports = blogsRouter
