const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let total = 0
  for (let i = 0; i < blogs.length; i++) {
    total += blogs[i].likes
  }
  return total
}

const favoriteBlog = (blogs) => {
  let maxl = 0
  let blog = ''
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > maxl) {
      blog = blogs[i]
    }
  }
  return blog
}

const mostBlogs = (blogs) => {
  const maxAuthor = _
    .chain(blogs)
    .map('author')
    .countBy()
    .entries()
    .maxBy()
    .value()

  return (
    {
      "author": maxAuthor[0],
      "blogs": maxAuthor[1]
    }
  )
}

const mostLikes = (blogs) => {
  const favouriteAuthor = _
    .chain(blogs)
    .groupBy('author')
    .map((objects, key) => ({
      'author': key,
      'likes': _.sumBy(objects, 'likes')
    }))
    .maxBy('likes')
    .value()

  
    
  return favouriteAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}