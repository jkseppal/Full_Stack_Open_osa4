const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

/*const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})*/

//const Blog = mongoose.model('Blog', blogSchema)

//const mongoUrl = process.env.MONGODB_URI
//mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true})

/*app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})*/

/*app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})*/

/*const blog = new Blog({
    title: 'Testi',
    author: 'Testaaja',
    url: 'http://kuvitteellinen.osoite.com',
    likes: 7,
})
blog.save().then(response => {
    console.log('lisätty!')
    mongoose.connection.close()
})*/

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})