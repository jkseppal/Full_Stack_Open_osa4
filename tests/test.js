const listHelper = require('../utils/list_helper')
const { testEnvironment } = require('../jest.config')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

test('number of total likes', () => {
  const blogs = [
    {
      title: "eka",
      author: "ekak",
      url: ".",
      likes: 77
    },
    {
      title: "toka",
      author: "tokak",
      url: "ejkrfh",
      likes: 22
    }
  ]

  const result = listHelper.totalLikes(blogs)
  expect(result).toBe(99)
})

test('favorite blog', () => {
  const blogs = [
    {
      title: "eka",
      author: "ekak",
      url: ".",
      likes: 17
    },
    {
      title: "toka",
      author: "tokak",
      url: "ejkrfh",
      likes: 22
    }
  ]

  const result = listHelper.favoriteBlog(blogs)
  expect(result).toEqual(
    {
      title: "toka",
      author: "tokak",
      url: "ejkrfh",
      likes: 22
    }
  )
})

test('author with most blogs', () => {
  const blogs = [
    {
      title: "eka",
      author: "ekak",
      url: ".",
      likes: 17
    },
    {
      title: "toka",
      author: "tokak",
      url: "ejkrfh",
      likes: 22
    },
    {
      title: "kolmas",
      author: "tokak",
      url: "orhfew",
      likes: 1
    },
    {
      title: "neljäs",
      author: "kolmak",
      url: "jeheo",
      likes: 100
    }
  ]

  const result = listHelper.mostBlogs(blogs)
  expect(result).toEqual(
    {
      author: "tokak",
      blogs: 2
    }
  )
})

test('author with most likes', () => {
  const blogs = [
    {
      title: "eka",
      author: "ekak",
      url: ".",
      likes: 17
    },
    {
      title: "toka",
      author: "tokak",
      url: "ejkrfh",
      likes: 22
    },
    {
      title: "kolmas",
      author: "tokak",
      url: "orhfew",
      likes: 1
    },
    {
      title: "neljäs",
      author: "kolmak",
      url: "jeheo",
      likes: 100
    }
  ]

  const result = listHelper.mostLikes(blogs)
  expect(result).toEqual(
    {
      author: "kolmak",
      likes: 100
    }
  )
})