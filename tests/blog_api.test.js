const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
//const { testEnvironment } = require('../jest.config')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const User = require('../models/user')
const { post } = require('../app')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  let userObject = new User(helper.initialPersons[0])
  await userObject.save()

  userObject = new User(helper.initialPersons[1])
  await userObject.save()

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[2])
  await blogObject.save()
})

test('right number of blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(3)
})

test('blog has an id', async () => {
  const response = await api.get('/api/blogs')
  //const blogs = await helper.blogsInDb()
  const ids = response.body.map(r => r.id)
  expect(ids).toBeDefined()
})

test('blog can be added only with token', async () => {
  const newUser = {
    username: "Testimies",
    name: "Keijo Testimies",
    password: "salasana"
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(200)

  const response = await api
    .post('/api/login')
    .send(newUser)
    .expect(200)

  const token = response.body.token
  
  const newBlog = {
    title: 'new Blog',
    author: 'new',
    url: 'hhhhh',
    likes: 1,
    user: newUser
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
})

test('if no likes = 0 if no likes defined', async () => {
  const newUser = {
    username: "Testimies",
    name: "Keijo Testimies",
    password: "salasana"
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(200)

  const response = await api
    .post('/api/login')
    .send(newUser)
    .expect(200)

  const token = response.body.token
  
  const newBlog = {
    title: 'name',
    author: 'name',
    url: 'none'
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response2 = await api.get('/api/blogs')
  const likes = response2.body.map(r => r.likes)
  expect(likes[likes.length - 1]).toBe(0)
})

test('title must be defined', async () => {
  const newUser = {
    username: "Testimies",
    name: "Keijo Testimies",
    password: "salasana"
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(200)

  const response = await api
    .post('/api/login')
    .send(newUser)
    .expect(200)

  const token = response.body.token
  
  const newBlog = {
    author: 'Keijo',
    url: 'jotain',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(400)
})

test('url must be defined', async () => {
  const newUser = {
    username: "Testimies",
    name: "Keijo Testimies",
    password: "salasana"
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(200)

  const response = await api
    .post('/api/login')
    .send(newUser)
    .expect(200)

  const token = response.body.token
  
  const newBlog = {
    title: 'Keijoilut',
    author: 'Keijo',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(400)
})

test('blog can be deleted', async () => {
  const newUser = {
    username: "Testimies",
    name: "Keijo Testimies",
    password: "salasana"
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(200)

  const response = await api
    .post('/api/login')
    .send(newUser)
    .expect(200)

  const token = response.body.token
  
  const newBlog = {
    title: 'new Blog',
    author: 'new',
    url: 'hhhhh',
    likes: 1,
    user: newUser
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response2 = await api.get('/api/blogs')
  const ids = response2.body.map(r => r.id)
  const idToBeRemoved = ids[ids.length - 1]

  await api
    .delete(`/api/blogs/${idToBeRemoved}`)
    .set('Authorization', `bearer ${token}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('blog can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const newBlog = {
    title: 'Uppopumput kautta aikain',
    author: 'SPG',
    url: 'eiole',
    likes: 99
  }
  const blogToUpdate = blogsAtStart[0]

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlog)
    .expect(200)
})

test('user can be created', async () => {
  const newUser = {
    username: 'Marko',
    name: 'Iso Marko',
    password: 'salainen'
  }

  await api
    .post('/api/users/')
    .send(newUser)
    .expect(200)
})

test('password min length = 3', async () => {
  const newUser = {
    username: 'käyttöäijä',
    name: 'äijä',
    password: 'f'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
})

test('username must be unique', async () => {
  const newUser = {
    username: 'Testuser1',
    name: 'Ei pitäisi näkyä',
    password: 'qwerty'
  }

  await api
    .post('/api/users/')
    .send(newUser)
    .expect(500)
})

/*test('blog cannot be added without a token', async () => {
  const newUser = {
    username: "Testimies",
    name: "Keijo Testimies",
    password: "salasana"
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(200)

  const response = await api
    .post('/api/login')
    .send(newUser)
    .expect(200)

  //const token = response.body.token
  
  const newBlog = {
    title: 'new Blog',
    author: 'new',
    url: 'hhhhh',
    likes: 1,
    user: newUser
  }

  await api
    .post('/api/blogs')
    //.set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(401)
    

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})*/

afterAll(() => {
  mongoose.connection.close()
})