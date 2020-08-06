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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}