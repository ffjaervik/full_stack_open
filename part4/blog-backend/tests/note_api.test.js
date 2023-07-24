const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const BlogModel = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await BlogModel.deleteMany({})
  await BlogModel.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})
test('the unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})
//////////////////////////
test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'test blog',
    author: 'test author',
    url: 'test url',
    likes: 2,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map((blog) => blog.title)
  expect(contents).toContain('test blog')
})

afterAll(async () => {
  await mongoose.connection.close()
})
