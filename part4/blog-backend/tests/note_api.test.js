const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const BlogModel = require('../models/blog')
const initialBlogs = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await BlogModel.deleteMany({})
  await BlogModel.insertMany(initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})
test('the unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

afterAll(async () => {
  await mongoose.connection.close()
})
