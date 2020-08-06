const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Testi1',
    author: 'Testaaja1',
    url: 'kuvitteellinen1',
    likes: 1
  },
  {
    title: 'Testi2',
    author: 'Testaaja2',
    url: 'kuvitteellinen2',
    likes: 3
  },
  {
    title: 'Testi3',
    author: 'Testaaja3',
    url: 'kuvitteellinen3',
    likes: 1
  }
]

const initialPersons = [
  {
    username: 'Testuser1',
    name: 'Keijo Testuser',
    password: 'salasana'
  },
  {
    username: 'User2',
    name: 'Keijo User',
    password: 'password'
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, initialPersons, blogsInDb
}