import mongoose from "mongoose"
import supertest from "supertest"
import app from "../app"

const api = supertest(app)



test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async(req,res) =>{
      await api.get('/api/blogs').expect(res.blogs).toHaveLength(1)
      
      
})

afterAll(async () => {
  await mongoose.connection.close()
})