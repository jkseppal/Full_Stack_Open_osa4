const express = require('express')
const blogsRouter = express.Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
//const { tokenExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

/*const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}*/

blogsRouter.post('/',async (request, response) => {
  const body = request.body
  if (request.token === undefined) {
    return response.status(401).json({ error: 'token missing'})
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    url: body.url,
    title: body.title,
    author: body.author,
    user: user._id,
    likes: body.likes === undefined ? 0 : body.likes,
  })

  if (body.title === undefined) {
    response.status(400).end()
  } else if (body.url === undefined) {
    response.status(400).end()
  } else {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog.toJSON())
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const userid = await User.findById(decodedToken.id)
  if ( blog.user.toString() !== decodedToken.id.toString()) {
    response.status(403).end()
  } else {
  
    await blog.remove()
    response.status(204).end()
  }

  //response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const savedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(savedBlog.toJSON())
})

/*const blog = new Blog({
    title: 'Uppopumppu kautta aikain',
    author: 'SPG',
    url: 'http://kuvitteellinenwww.osoite.com',
    likes: 88,
})
blog.save().then(response => {
    console.log('lisätty!')
    mongoose.connection.close()
})*/

/*const blog2 = new Blog({
  title: 'Testi2',
  author: 'Testaaja2',
  url: 'http://kuvitteellinen.osoite2.com',
  likes: 9,
})
blog2.save().then(response => {
  console.log('lisätty!')
  mongoose.connection.close()
})*/

module.exports = blogsRouter